import { NextRequest } from "next/server";

// Dynamic routing configuration so that Next.js doesn't cache this endpoint at build time
export const dynamic = "force-dynamic";

interface Label {
  name: string;
  color: string;
}

interface UnifiedIssue {
  number: number;
  title: string;
  status: "open" | "closed";
  labels: Label[];
  author: string;
  openedAt: string;
  description: string;
  commentsCount: number;
  url: string;
  type: "issue" | "pullrequest";
}

// GraphQL query for organization-owned Projects v2
const ORG_PROJECT_QUERY = `
  query($owner: String!, $number: Int!) {
    organization(login: $owner) {
      projectV2(number: $number) {
        title
        items(first: 100) {
          nodes {
            content {
              __typename
              ... on Issue {
                number
                title
                url
                state
                author {
                  login
                }
                createdAt
                body
                comments {
                  totalCount
                }
                labels(first: 10) {
                  nodes {
                    name
                    color
                  }
                }
              }
              ... on PullRequest {
                number
                title
                url
                state
                author {
                  login
                }
                createdAt
                body
                comments {
                  totalCount
                }
                labels(first: 10) {
                  nodes {
                    name
                    color
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// GraphQL query for user-owned Projects v2
const USER_PROJECT_QUERY = `
  query($owner: String!, $number: Int!) {
    user(login: $owner) {
      projectV2(number: $number) {
        title
        items(first: 100) {
          nodes {
            content {
              __typename
              ... on Issue {
                number
                title
                url
                state
                author {
                  login
                }
                createdAt
                body
                comments {
                  totalCount
                }
                labels(first: 10) {
                  nodes {
                    name
                    color
                  }
                }
              }
              ... on PullRequest {
                number
                title
                url
                state
                author {
                  login
                }
                createdAt
                body
                comments {
                  totalCount
                }
                labels(first: 10) {
                  nodes {
                    name
                    color
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// GraphQL query for repository issues & pull requests
const REPO_QUERY = `
  query($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      issues(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
        nodes {
          number
          title
          url
          state
          author {
            login
          }
          createdAt
          body
          comments {
            totalCount
          }
          labels(first: 10) {
            nodes {
              name
              color
            }
          }
        }
      }
      pullRequests(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
        nodes {
          number
          title
          url
          state
          author {
            login
          }
          createdAt
          body
          comments {
            totalCount
          }
          labels(first: 10) {
            nodes {
              name
              color
            }
          }
        }
      }
    }
  }
`;

export async function GET(request: NextRequest) {
  const pat = process.env.GITHUB_PAT;
  const projectUrl = process.env.GITHUB_PROJECT_URL;

  // 1. Fallback to empty issues list if credentials are not configured
  if (!pat || !projectUrl) {
    return Response.json({
      issues: [],
      projectInfo: null,
    });
  }

  try {
    // 2. Parse the target (either Project URL or Repository format)
    const isProject = projectUrl.includes("/projects/");
    
    if (isProject) {
      // Parse: https://github.com/orgs/vedangiitb/projects/1
      // Or: https://github.com/users/vedangiitb/projects/1
      const projectMatch = projectUrl.match(/github\.com\/(orgs|users)\/([^/]+)\/projects\/(\d+)/i);
      if (!projectMatch) {
        throw new Error("Invalid GITHUB_PROJECT_URL format for GitHub Project v2. Expected 'https://github.com/orgs|users/owner/projects/number'.");
      }

      const ownerType = projectMatch[1].toLowerCase(); // "orgs" or "users"
      const owner = projectMatch[2];
      const number = parseInt(projectMatch[3], 10);

      const query = ownerType === "orgs" ? ORG_PROJECT_QUERY : USER_PROJECT_QUERY;

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${pat}`,
          "Content-Type": "application/json",
          "User-Agent": "qwintly-docs-server",
        },
        body: JSON.stringify({
          query,
          variables: { owner, number },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`GitHub API HTTP error ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      
      if (result.errors) {
        throw new Error(`GitHub GraphQL Error: ${result.errors.map((e: any) => e.message).join(", ")}`);
      }

      const projectData = ownerType === "orgs" ? result.data?.organization?.projectV2 : result.data?.user?.projectV2;
      if (!projectData) {
        throw new Error(`Could not resolve project board #${number} under owner '${owner}'. Make sure your token has adequate permissions.`);
      }

      const items = projectData.items?.nodes || [];
      const issuesList: UnifiedIssue[] = items
        .filter((item: any) => item.content && (item.content.__typename === "Issue" || item.content.__typename === "PullRequest"))
        .map((item: any) => {
          const content = item.content;
          const rawState = (content.state || "").toLowerCase();
          const status = (rawState === "open" || rawState === "opened" ? "open" : "closed") as "open" | "closed";
          return {
            number: content.number,
            title: content.title,
            status,
            labels: (content.labels?.nodes || []).map((l: any) => ({ name: l.name, color: l.color })),
            author: content.author?.login || "anonymous",
            openedAt: content.createdAt,
            description: content.body || "No description provided.",
            commentsCount: content.comments?.totalCount || 0,
            url: content.url,
            type: content.__typename.toLowerCase() as "issue" | "pullrequest",
          };
        });

      return Response.json({
        issues: issuesList,
        projectInfo: {
          title: projectData.title,
          url: projectUrl,
          type: "Project Board",
          number,
        },
      });
    } else {
      // Fallback parser: treat as standard GitHub Repo
      // Parse: https://github.com/owner/repo or just owner/repo
      const repoMatch = projectUrl.match(/(?:github\.com\/)?([^/]+)\/([^/&#?]+)/i);
      if (!repoMatch) {
        throw new Error("Invalid GITHUB_PROJECT_URL format. Expected GitHub Repo 'owner/repo' or Project board URL.");
      }

      const owner = repoMatch[1];
      const name = repoMatch[2];

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${pat}`,
          "Content-Type": "application/json",
          "User-Agent": "qwintly-docs-server",
        },
        body: JSON.stringify({
          query: REPO_QUERY,
          variables: { owner, name },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`GitHub API HTTP error ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      
      if (result.errors) {
        throw new Error(`GitHub GraphQL Error: ${result.errors.map((e: any) => e.message).join(", ")}`);
      }

      const repository = result.data?.repository;
      if (!repository) {
        throw new Error(`Could not resolve repository '${owner}/${name}'. Make sure it exists and your token has access.`);
      }

      const rawIssues = repository.issues?.nodes || [];
      const rawPRs = repository.pullRequests?.nodes || [];

      const issuesList: UnifiedIssue[] = [
        ...rawIssues.map((item: any) => {
          const rawState = (item.state || "").toLowerCase();
          const status = (rawState === "open" ? "open" : "closed") as "open" | "closed";
          return {
            number: item.number,
            title: item.title,
            status,
            labels: (item.labels?.nodes || []).map((l: any) => ({ name: l.name, color: l.color })),
            author: item.author?.login || "anonymous",
            openedAt: item.createdAt,
            description: item.body || "No description provided.",
            commentsCount: item.comments?.totalCount || 0,
            url: item.url,
            type: "issue" as const,
          };
        }),
        ...rawPRs.map((item: any) => {
          const rawState = (item.state || "").toLowerCase();
          const status = (rawState === "open" ? "open" : "closed") as "open" | "closed";
          return {
            number: item.number,
            title: item.title,
            status,
            labels: (item.labels?.nodes || []).map((l: any) => ({ name: l.name, color: l.color })),
            author: item.author?.login || "anonymous",
            openedAt: item.createdAt,
            description: item.body || "No description provided.",
            commentsCount: item.comments?.totalCount || 0,
            url: item.url,
            type: "pullrequest" as const,
          };
        }),
      ];

      // Sort by creation date in descending order (newest first)
      issuesList.sort((a, b) => new Date(b.openedAt).getTime() - new Date(a.openedAt).getTime());

      return Response.json({
        issues: issuesList,
        projectInfo: {
          title: `${owner}/${name}`,
          url: `https://github.com/${owner}/${name}`,
          type: "Repository",
        },
      });
    }
  } catch (error: any) {
    console.error("Failed to fetch live GitHub issues:", error);
    return Response.json(
      {
        issues: [],
        projectInfo: null,
        error: error.message || "An unexpected error occurred while fetching issues.",
      },
      { status: 200 } // We still return 200 with empty data so the app displays gracefully, rather than crashing
    );
  }
}
