"use client";

import InteractiveCanvas from "@/components/InteractiveCanvas";
import { BadgeInfo, Box, ShieldCheck, Workflow } from "lucide-react";

export default function GenerationFlow() {
  return (
    <div className="content-wrapper space-y-8">
      {/* Breadcrumbs and Header */}
      <header className="space-y-4 border-b border-border pb-6 select-none">
        <div className="flex items-center gap-2 text-[12px] font-medium text-neutral-500 dark:text-neutral-400">
          <span>Overview</span>
          <span>/</span>
          <span className="text-foreground font-semibold">
            Generation & Deployment Flow
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Overall Generation & Deployment Flow
        </h1>
        <p className="text-[14px] text-muted-foreground leading-relaxed mt-1">
          Trace how requests navigate Pub/Sub topics, initiate Cloud Run
          workers, invoke self-healing code generators, and publish static
          websites.
        </p>
      </header>

      {/* Highlights checklist cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col gap-3">
          <div className="w-8 h-8 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-bold text-foreground">
            JWT signed token payload
          </h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            The token payload is a signed JWT token. The pub sub invocations are
            verified using OIDC tokens. GCP Pub/Sub triggers use a dedicated
            Service Account (<code>web-service-account</code>) to sign secure
            OIDC tokens for authenticated Cloud Run pushes.
          </p>
        </div>

        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col gap-3">
          <div className="w-8 h-8 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
            <Box className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-bold text-foreground">
            Shared AI Engine
          </h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            Both{" "}
            <strong className="text-foreground font-semibold">
              builder-job
            </strong>{" "}
            and{" "}
            <strong className="text-foreground font-semibold">
              deployer-job
            </strong>{" "}
            import a central library package named{" "}
            <code className="text-foreground">qwintly-core</code> which
            consolidates AI logic and schemas.
          </p>
        </div>

        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col gap-3">
          <div className="w-8 h-8 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <BadgeInfo className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-bold text-foreground">
            Status Streaming
          </h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            The user gets the live status stream of exact status, progress, and
            results. The status stream is a JSON stream of events, streamed with
            redis.
          </p>
        </div>
      </div>

      {/* Interactive Overall System Canvas Map */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 select-none">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <h2 className="text-[15px] font-bold text-foreground">
            System Orchestration Blueprint
          </h2>
        </div>

        <InteractiveCanvas title="qwintly - End-To-End Ingestion & Deployment Flow">
          <img
            src="/gen_dep_flow.png"
            alt="qwintly - End-To-End Ingestion & Deployment Flow"
            className="max-w-none pointer-events-none select-none rounded-md"
            style={{ width: "950px", height: "auto" }}
          />
        </InteractiveCanvas>
      </section>

      {/* Description of overall flow stages */}
      <section className="space-y-6 pt-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2 select-none">
          <Workflow className="w-5 h-5 text-emerald-500" /> Ecosystem
          Integration Pipeline
        </h2>

        <div className="relative border-l border-border/85 ml-3 pl-6 space-y-8 select-none">
          <div className="relative">
            <div className="absolute -left-8.75 w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              01
            </div>
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-foreground">
                GCP Pub/Sub Push Triggers
              </h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                External generation payloads arrive on the{" "}
                <code>webgen-topic</code> while deployment payloads hit the{" "}
                <code>webdeploy-topic</code>. They are validated via OIDC tokens
                signed by dedicated IAM service accounts and routed as HTTP push
                requests.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8.75 w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              02
            </div>
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-foreground">
                wg worker Router Dispatch
              </h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                The persistent <code>wg worker</code> receiver validates the
                push OIDC payloads, matches scopes using OAuth2 credentials, and
                programmatically launches an ephemeral Cloud Run Job (Builder or
                Deployer) using GCP <code>Jobsclient</code> (from cloud run sdk)
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8.75 w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              03
            </div>
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-foreground">
                Builder Job Code Compiler
              </h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                The <code>builder job</code> runs asynchronously. It decodes job
                credentials, queries database contexts, starts an AI
                planning/modification/validation check cycle (using{" "}
                <code>qwintly-core</code>), and uploads a zipped static project
                package to our GCS bucket.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8.75 w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              04
            </div>
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-foreground">
                Deployer Job Cloud Publisher
              </h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                The <code>deployer job</code> clones the zipped static snapshot
                from the GCS bucket, and builds and deploys the project using
                GCP cloudbuild. It then gets the project URL, and updates the
                <code>project_sites table</code> with the new project URL.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
