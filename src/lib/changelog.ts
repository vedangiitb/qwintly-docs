export type ChangeCategory = "Added" | "Fixed" | "Optimized" | "Security";

interface GitHubRelease {
  tag_name: string;
  name: string | null;
  body: string | null;
  published_at: string | null;
  created_at: string;
  html_url: string;
  prerelease: boolean;
  draft: boolean;
  author: {
    login: string;
  } | null;
}

export interface ChangelogItem {
  text: string;
  category: ChangeCategory;
}

export interface Release {
  version: string;
  codename: string;
  date: string;
  author: string;
  summary: string;
  url: string;
  prerelease: boolean;
  items: ChangelogItem[];
}

export interface ChangelogData {
  releases: Release[];
  sourceUrl: string;
  error?: string;
}

const GITHUB_RELEASES_URL =
  "https://api.github.com/repos/vedangiitb/qwintly/releases";

const SOURCE_URL = "https://github.com/vedangiitb/qwintly/releases";

function cleanMarkdown(value: string) {
  return value
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_~>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function inferCategory(text: string): ChangeCategory {
  const normalized = text.toLowerCase();

  if (
    /\b(security|secure|vulnerability|vulnerabilities|cve|auth|permission|secret)\b/.test(
      normalized,
    )
  ) {
    return "Security";
  }

  if (/\b(fix|fixed|bug|bugfix|resolve|resolved|patch|regression)\b/.test(normalized)) {
    return "Fixed";
  }

  if (
    /\b(optimize|optimized|optimization|performance|perf|speed|cache|faster|refactor)\b/.test(
      normalized,
    )
  ) {
    return "Optimized";
  }

  return "Added";
}

function categoryFromHeading(heading: string): ChangeCategory | null {
  const normalized = heading.toLowerCase();

  if (/\b(security|secure|vulnerability|vulnerabilities)\b/.test(normalized)) {
    return "Security";
  }

  if (/\b(fix|fixed|bug|bugfix|patch)\b/.test(normalized)) {
    return "Fixed";
  }

  if (/\b(optimize|optimized|optimization|performance|perf|refactor)\b/.test(normalized)) {
    return "Optimized";
  }

  if (/\b(add|added|new|feature|features|change|changed|improvement)\b/.test(normalized)) {
    return "Added";
  }

  return null;
}

function getSummary(body: string | null, fallback: string) {
  if (!body) return fallback;

  const paragraph = body
    .split(/\n\s*\n/)
    .map((block) => {
      const lines = block
        .split("\n")
        .filter((line) => !/^\s{0,3}#{1,6}\s+/.test(line))
        .filter((line) => !/full changelog/i.test(line));

      return cleanMarkdown(lines.join(" "));
    })
    .find(Boolean);

  return paragraph || fallback;
}

function parseReleaseItems(body: string | null): ChangelogItem[] {
  if (!body) {
    return [
      {
        category: "Added",
        text: "Release published on GitHub.",
      },
    ];
  }

  const items: ChangelogItem[] = [];
  let activeCategory: ChangeCategory | null = null;

  for (const line of body.split("\n")) {
    const headingMatch = line.match(/^\s{0,3}#{1,6}\s+(.+)$/);
    if (headingMatch) {
      activeCategory = categoryFromHeading(headingMatch[1]);
      continue;
    }

    const bulletMatch = line.match(
      /^\s*(?:[-*+]|\d+\.)\s+(?:\[[ xX]\]\s*)?(.+)$/,
    );
    if (!bulletMatch) continue;

    const text = cleanMarkdown(bulletMatch[1]);
    if (!text || /^full changelog:/i.test(text)) continue;

    items.push({
      category: activeCategory ?? inferCategory(text),
      text,
    });
  }

  if (items.length > 0) return items;

  const fallbackLines = body
    .split("\n")
    .filter((line) => !/^\s{0,3}#{1,6}\s+/.test(line))
    .filter((line) => !/full changelog/i.test(line))
    .map((line) => cleanMarkdown(line.replace(/^#+\s+/, "")))
    .filter(Boolean)
    .slice(0, 8);

  return fallbackLines.length > 0
    ? fallbackLines.map((text) => ({
        category: inferCategory(text),
        text,
      }))
    : [
        {
          category: "Added",
          text: "Release published on GitHub.",
        },
      ];
}

function mapRelease(release: GitHubRelease): Release {
  const name = cleanMarkdown(release.name || "");
  const version = release.tag_name || name || "untagged-release";
  const codename = name && name !== version ? name : "GitHub release";
  const publishedAt = release.published_at || release.created_at;

  return {
    version,
    codename,
    date: new Date(publishedAt).toISOString().slice(0, 10),
    author: release.author?.login || "GitHub",
    summary: getSummary(release.body, codename),
    url: release.html_url,
    prerelease: release.prerelease,
    items: parseReleaseItems(release.body),
  };
}

export async function getChangelog(): Promise<ChangelogData> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "qwintly-docs-server",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    if (process.env.GITHUB_PAT) {
      headers.Authorization = `Bearer ${process.env.GITHUB_PAT}`;
    }

    const response = await fetch(GITHUB_RELEASES_URL, {
      headers,
      next: {
        revalidate: 1800,
        tags: ["qwintly-releases"],
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub releases request failed: ${response.status} ${errorText}`);
    }

    const releases = (await response.json()) as GitHubRelease[];

    return {
      releases: releases.filter((release) => !release.draft).map(mapRelease),
      sourceUrl: SOURCE_URL,
    };
  } catch (error) {
    return {
      releases: [],
      sourceUrl: SOURCE_URL,
      error:
        error instanceof Error ? error.message : "Unable to load GitHub releases.",
    };
  }
}
