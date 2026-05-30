export interface ServiceInfo {
  id: string;
  slug: string;
  title: string;
  type: "job" | "service" | "others";
  tagline: string;
  gitUrl: string;
  branch: string;
  description: {
    summary: string;
    features: string[];
    techStack: string[];
    architectureNotes: string[];
  };
  deployment: {
    environment: "production" | "staging" | "development";
    ciCdPipeline: string[];
  };
}

export const servicesConfig: ServiceInfo[] = [
  {
    id: "qwintly-wg-worker",
    slug: "qwintly-wg-worker",
    title: "wg worker",
    type: "service",
    tagline:
      "GCP Cloud Run push-event subscriber and asynchronous job initiation router",
    gitUrl: "https://github.com/vedangiitb/qwintly-wg-worker",
    branch: "main",
    description: {
      summary:
        "A persistent HTTP receiver service deployed on GCP Cloud Run. It validates and decodes push-event payloads received from GCP Pub/Sub topics, verifies OIDC identity tokens using OAuth2 client credentials, and programmatically initiates asynchronous build or deploy processes as Cloud Run Jobs.",
      features: [
        "Verifies Pub/Sub push jwt payloads using secret keys.",
        "Validates signature credentials against GCP OAuth2 client profiles.",
        "Initiates Cloud Run Jobs programmatically using GCP JobsClient (cloud run sdk).",
        "Handles secure execution with concurrency restricted to 1 for reliable sequential event flow.",
      ],
      techStack: ["Node.js", "TypeScript", "Express", "GCP Pub/Sub"],
      architectureNotes: [
        "Runs on an auto-scaling GCP Cloud Run Service with min/max instances set to 0/10.",
        "Processes triggers for both Generation Job (Builder) and Deployment Job (Deployer) workflows.",
      ],
    },
    deployment: {
      environment: "development",
      ciCdPipeline: [
        "Checkout source code via GitHub Actions on branch push.",
        "Authenticate to GCP using service account credentials stored in GitHub Secrets.",
        "Configure Docker authentication for Artifact Registry.",
        "Build and push Docker container image using Google Cloud Build.",
        "Deploy image to Google Cloud Run with tailored service account permissions, environment variables, Supabase secrets, auto-scaling, and CPU/memory specifications.",
      ],
    },
  },
  {
    id: "qwintly-builder",
    slug: "qwintly-builder",
    title: "builder job",
    type: "job",
    tagline: "AI-driven code generator",
    gitUrl: "https://github.com/vedangiitb/qwintly-builder",
    branch: "main",
    description: {
      summary:
        "An ephemeral AI code compilation engine triggered by wg-worker. It decodes JWT job tokens, queries chat metadata and codebase snapshots, executes an iterative plan-write-test-fix AI generation loop, compiles static project templates, and uploads zipped project packages to GCS bucket (gen-project-snapshots).",
      features: [
        "Validates and decodes incoming job tokens (extracts chatsId, seqId, provider, model).",
        "Executes a self-healing AI design flow: Plans changes, makes code changes, runs heuristic checks, and auto-corrects validation issues (up to 3 retries).",
        "Uploads zipped static site snapshots directly to GCS gen_project_snapshots bucket.",
        "Uses the common package 'qwintly-core' for core AI logic and database queries.",
      ],
      techStack: [
        "Node.js",
        "TypeScript",
        "qwintly-core",
        "PostgreSQL (Supabase)",
        "GCS (Object Storage)",
      ],
      architectureNotes: [
        "Runs ephemerally on GCP Cloud Run Jobs with a 600s execution timeout.",
        "Connects to Postgres to update generation_snapshots, project_context, and project_tasks.",
        "Leverages shared AI logic and database integrations inside the qwintly-core package.",
      ],
    },
    deployment: {
      environment: "development",
      ciCdPipeline: [
        "Checkout source code via GitHub Actions on branch push.",
        "Authenticate to GCP using service account credentials stored in GitHub Secrets.",
        "Configure Docker authentication for Artifact Registry.",
        "Build and push Docker container image using Google Cloud Build.",
        "Deploy image to Google Cloud Run with tailored service account permissions, environment variables, Supabase secrets, auto-scaling, and CPU/memory specifications.",
      ],
    },
  },
  {
    id: "deployer-job",
    slug: "qwintly-deployer-job",
    title: "deployer job",
    type: "job",
    tagline:
      "Multi-tenant static site cloud publisher and auto-repair deployer",
    gitUrl: "https://github.com/vedangiitb/qwintly-deployer",
    branch: "main",
    description: {
      summary:
        "An ephemeral server deployment coordinator triggered by wg-worker. It clones compiled project snapshots from GCS buckets, configures cloud build deployments, deploys statically hosted containers to Cloud Run, and executes self-repair cycles to auto-correct any build issues using ai codegen flow.",
      features: [
        "Validates incoming deployment job tokens and fetches corresponding parameters.",
        "Clones project static snapshot zip archives programmatically from GCS.",
        "Executes a self-repair deployment loop: Deploys using Cloud Run CLI, detects errors, runs automated fixes (up to 3 retries), and logs parameters.",
        "Uses the common package 'qwintly-core' for database metrics updates.",
      ],
      techStack: [
        "Node.js",
        "TypeScript",
        "qwintly-core",
        "PostgreSQL (Supabase)",
        "GCS",
        "GCP Cloud Run CLI",
      ],
      architectureNotes: [
        "Runs ephemerally on GCP Cloud Run Jobs with a 600s execution timeout.",
        "Deploys containerized static client portals and updates project_sites postgres tables.",
        "Leverages shared AI logic and database integrations inside the qwintly-core package.",
      ],
    },
    deployment: {
      environment: "development",
      ciCdPipeline: [
        "Checkout source code via GitHub Actions on branch push.",
        "Authenticate to GCP using service account credentials stored in GitHub Secrets.",
        "Configure Docker authentication for Artifact Registry.",
        "Build and push Docker container image using Google Cloud Build.",
        "Deploy image to Google Cloud Run with tailored service account permissions, environment variables, Supabase secrets, auto-scaling, and CPU/memory specifications.",
      ],
    },
  },
  {
    id: "qwintly-gateway-service",
    slug: "qwintly-gateway-service",
    title: "Qwintly Gateway Service",
    type: "service",
    tagline:
      "A lightweight, secure, and dynamic reverse proxy and request routing gateway.",
    gitUrl: "https://github.com/vedangiitb/qwintly-gateway-service",
    branch: "dev",
    description: {
      summary:
        "A high-performance reverse-proxy and routing service built with Node.js, Express, and http-proxy. It acts as the ingress gateway for Qwintly, dynamically routing incoming traffic to preview servers or active Cloud Run deployments based on the host subdomain. It utilizes Supabase for site routing lookups and handles dynamic caching, target domain security validation, structured JSON logging, and graceful shutdowns under load.",
      features: [
        "Dynamic subdomain-based routing supporting both active projects and development preview environments.",
        "Dynamic URL lookup from Supabase (project_sites database table) with configurable local TTL caching.",
        "Strict security validation of target URLs, allowing only secure HTTPS endpoints on designated domain suffixes (e.g., .run.app).",
        "Structured JSON logging capturing detailed request telemetry, performance latency, and system events.",
        "Graceful shutdown handler tracking in-flight requests and returning 503 during termination (SIGTERM/SIGINT) to ensure zero-downtime rolling deployments.",
        "Proxy timeout settings and connection configurations to avoid resource starvation.",
      ],
      techStack: [
        "TypeScript",
        "Node.js",
        "Express",
        "http-proxy",
        "@supabase/supabase-js",
        "dotenv",
        "Docker",
        "Google Cloud Run",
        "Google Cloud Build",
        "GitHub Actions",
      ],
      architectureNotes: [
        "The gateway leverages a single Express wildcard middleware to capture and inspect the incoming hostname.",
        "Subdomain parsing determines whether a request belongs to a direct project environment (-projects, -devprojects) or a preview renderer (-previews, -devpreviews).",
        "An in-memory TTL cache prevents excessive database queries to Supabase, optimizing routing performance.",
        "Designed specifically for Google Cloud Run, optimizing for cold start mitigations and concurrency management with single-processor scaling configurations.",
      ],
    },
    deployment: {
      environment: "development",
      ciCdPipeline: [
        "Checkout source code via GitHub Actions on branch push.",
        "Authenticate to GCP using service account credentials stored in GitHub Secrets.",
        "Configure Docker authentication for Artifact Registry.",
        "Build and push Docker container image using Google Cloud Build.",
        "Deploy image to Google Cloud Run with tailored service account permissions, environment variables, Supabase secrets, auto-scaling, and CPU/memory specifications.",
      ],
    },
  },
  {
    id: "qwintly-infra",
    slug: "qwintly-infra",
    title: "Qwintly Infrastructure",
    type: "others",
    tagline:
      "Cloud infrastructure automation and database migrations for Qwintly",
    gitUrl: "https://github.com/vedangiitb/qwintly-infra",
    branch: "dev",
    description: {
      summary:
        "Central repository for managing Qwintly's Google Cloud Platform (GCP) resources via Terraform and PostgreSQL database schema, migrations, RLS policies, and RPC functions via Supabase.",
      features: [
        "Infrastructure provisioning using Terraform (GCS, Pub/Sub, Secrets, Artifact Registry, IAM)",
        "Supabase migration scripts, database schemas, Row Level Security (RLS) policies, and RPC definitions",
        "GCP Pub/Sub push messaging configuration for automated web generation and deployment tasks",
        "Multi-project GCP setup separating core infrastructure from generated customer sites",
        "Automated CI/CD workflows using GitHub Actions for seamless database and infrastructure deployment",
      ],
      techStack: [
        "Terraform",
        "Google Cloud Platform (GCP)",
        "Supabase",
        "PostgreSQL",
        "GitHub Actions",
        "GCP Pub/Sub",
        "Google Cloud Storage (GCS)",
        "GCP Secret Manager",
      ],
      architectureNotes: [
        "Dual-project architecture isolates the core Qwintly app environment from the generated sites environment to ensure security and prevent resource limits contention.",
        "Uses Google Cloud Pub/Sub dead-letter queues (DLQs) for both webgen and webdeploy topics with OIDC push authentication.",
        "Enforces PostgreSQL Row Level Security (RLS) policies on Supabase tables to ensure safe, client-level data isolation.",
        "Dynamically configures resource names and labels using environment-based suffixes (e.g. -dev, -prod).",
      ],
    },
    deployment: {
      environment: "development",
      ciCdPipeline: [
        "GitHub Actions (Terraform Deploy): provisions GCP infra on pushes to dev or main",
        "GitHub Actions (Supabase Migrations): applies database migrations on pushes to dev or main",
      ],
    },
  },
  {
    id: "qwintly-preview-renderer",
    slug: "qwintly-preview-renderer",
    title: "Qwintly Preview Renderer",
    type: "service",
    tagline:
      "A high-performance server-side preview and interactive rendering service for dynamic canvas snapshots.",
    gitUrl: "https://github.com/vedangiitb/qwintly-preview-renderer",
    branch: "dev",
    description: {
      summary:
        "Qwintly Preview Renderer is a specialized Next.js application built to perform Server-Side Rendering (SSR), handle styling compilation, and support real-time interactive previews for live canvas snapshots inside an iframe. It dynamically fetches snapshot configurations from Supabase matching the session header, compiles minimal Tailwind CSS utility classes at runtime, and sets up a robust message bridge to communicate with the parent editor.",
      features: [
        "Server-Side Rendering (SSR) of dynamic builder element hierarchies",
        "Just-in-Time (JIT) Tailwind CSS compiler for dynamic runtime class-token generation",
        "PostMessage bidirectional communications bridge for real-time live preview updates",
        "Supabase client-side integration for instant preview configuration retrieval",
        "Extensible client component registry supporting forms, icons, buttons, links, and text fragments",
      ],
      techStack: [
        "Next.js 16.2.6 (App Router)",
        "React 19.2.4",
        "Tailwind CSS v4 (with PostCSS compiler)",
        "TypeScript",
        "@supabase/supabase-js v2",
        "Lucide React",
        "Node.js",
      ],
      architectureNotes: [
        "Dynamic Tailwind Compiler: Parses className tokens from all elements in the snapshot and feeds them to Tailwind's runtime compiler (`compile` from `tailwindcss`) to inject a minimal dynamically-built CSS payload.",
        "Catch-all Slugs Routing: Employs standard App Router catch-all route parameters (`[[...slug]]`) to map relative routing snapshots dynamically.",
        "Component Registry Pattern: Maps element node types (e.g., div, text, input, button, textarea, link, icon, fragment) to declarative functional UI renderers.",
        "Iframe Communications: Leverages a client-side wrapper (`qwintly-preview-editor.js`) to process standard message actions and update canvas nodes without page reloads.",
      ],
    },
    deployment: {
      environment: "development", // Dev branch environment
      ciCdPipeline: [
        "Checkout workspace code (actions/checkout@v4)",
        "Authenticate to Google Cloud Platform via Service Account keys (google-github-actions/auth@v2)",
        "Setup Google Cloud SDK (google-github-actions/setup-gcloud@v2)",
        "Configure GCP Artifact Registry authentication on Docker",
        "Docker build Next.js application injecting target build environment variables (PARENT_ORIGIN)",
        "Push Docker image to Google Artifact Registry",
        "Deploy service revision to Google Cloud Run (Asia South 1 region) with custom scaling limits and env vars",
      ],
    },
  },
  {
    id: "qwintly-boilerplate",
    slug: "qwintly-boilerplate",
    title: "Qwintly Boilerplate",
    type: "others",
    tagline:
      "UI-first Next.js boilerplate for quickly shipping polished marketing sites and front-end-only experiences.",
    gitUrl: "https://github.com/vedangiitb/qwintly-boilerplate",
    branch: "dev",
    description: {
      summary:
        "A highly optimized, UI-first Next.js boilerplate that enables rapid deployment of gorgeous, high-performance marketing pages and static experiences. Instead of hardcoding layouts, it relies on a JSON-driven page builder structure that renders standard layout components (such as text, images, inputs, and buttons) using custom OKLCH design system tokens, styled via modern Tailwind CSS v4.",
      features: [
        "JSON-driven dynamic UI rendering engine via a flexible React/TypeScript element registry.",
        "Modern, tailorable design system powered by OKLCH color spaces and style tokens.",
        "Interactive element support (custom client-side actions like internal routing, external links, history navigation, and reloads).",
        "Integrated with Tailwind CSS v4 and shadcn/ui primitives for robust, polished aesthetics.",
        "Ready-to-use Docker and GitHub Actions workflows for rapid multi-environment deployment.",
      ],
      techStack: [
        "Next.js 16 (App Router)",
        "React 19",
        "TypeScript 5",
        "Tailwind CSS v4",
        "shadcn/ui",
        "Lucide React",
        "Docker",
      ],
      architectureNotes: [
        "Uses a client-side Registry model that maps JSON element types directly to standard HTML and custom shadcn/ui components.",
        "Styles are injected dynamically using standard CSS variables resolved from styleConfig.json OKLCH tokens, enabling seamless branding customizations.",
        "Decouples layout definitions from route templates, allowing developers to change the page layout without writing code or redeploying.",
      ],
    },
    deployment: {
      environment: "development", // Dev branch is currently checked out; main maps to 'prod'
      ciCdPipeline: [
        "Checkout repository",
        "Authenticate to Google Cloud Platform (GCP) using service account keys/OIDC",
        "Configure and set up Google Cloud SDK (gcloud)",
        "Zip source template (excluding build, git metadata, and node modules)",
        "Upload zipped base template to Google Cloud Storage (GCS) bucket",
      ],
    },
  },
];
