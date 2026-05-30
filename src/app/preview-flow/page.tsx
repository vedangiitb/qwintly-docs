"use client";

import InteractiveCanvas from "@/components/InteractiveCanvas";
import {
  ArrowRight,
  Code,
  Database,
  Eye,
  Layers,
  Workflow,
} from "lucide-react";

export default function PreviewFlow() {
  return (
    <div className="content-wrapper space-y-8">
      {/* Breadcrumbs and Header */}
      <header className="space-y-4 border-b border-border pb-6 select-none">
        <div className="flex items-center gap-2 text-[12px] font-medium text-neutral-500 dark:text-neutral-400">
          <span>Overview</span>
          <span>/</span>
          <span className="text-foreground font-semibold">
            Preview Rendering Flow
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
          <Eye className="w-8 h-8 text-emerald-500 shrink-0" />
          Preview Rendering Flow
        </h1>
        <p className="text-[14px] text-muted-foreground leading-relaxed mt-1">
          Trace how user requests navigate Cloudflare Edge routers, database
          snapshots are fetched, global style custom properties are injected,
          and Tailwind utility classes compile dynamically on-the-fly.
        </p>
      </header>

      {/* Highlights checklist cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col gap-3">
          <div className="w-8 h-8 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Workflow className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-bold text-foreground">
            Edge Router Dispatch
          </h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            A Cloudflare Worker intercept requests and forwards them to a
            reverse proxy service, routing either to the preview renderer or
            deployed Cloud Run URL.
          </p>
        </div>

        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col gap-3">
          <div className="w-8 h-8 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Database className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-bold text-foreground">
            Snapshot Lookup
          </h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            The preview renderer fetches the AI-generated snapshot from the
            database <code>generation_snapshots</code> table via the active{" "}
            <code>sessionId</code>.
          </p>
        </div>

        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col gap-3">
          <div className="w-8 h-8 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-bold text-foreground">
            Style Token Injection
          </h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            The wrapper <code>layout.tsx</code> reads `styleConfig` variables
            and injects them as global custom CSS variables directly inside the{" "}
            <code>:root</code> element.
          </p>
        </div>

        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col gap-3">
          <div className="w-8 h-8 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Code className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-bold text-foreground">
            Runtime JIT Compiler
          </h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            The page component compiles custom components dynamically, invoking
            Tailwind's runtime compiler to generate CSS on-the-fly.
          </p>
        </div>
      </div>

      {/* Interactive Overall System Canvas Map */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 select-none">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <h2 className="text-[15px] font-bold text-foreground">
            Preview Rendering Pipeline Blueprint
          </h2>
        </div>

        <InteractiveCanvas title="qwintly - Edge Routing & Live Preview Rendering Flow">
          <img
            src="/preview_flow.png"
            alt="qwintly - Live Preview Rendering Flow Diagram"
            className="max-w-none pointer-events-none select-none rounded-md"
            style={{ width: "950px", height: "auto" }}
          />
        </InteractiveCanvas>
      </section>

      {/* Description of overall flow stages */}
      <section className="space-y-6 pt-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2 select-none">
          <Workflow className="w-5 h-5 text-emerald-500" /> Edge-To-Runtime
          Pipeline Stages
        </h2>

        <div className="relative border-l border-border/85 ml-3 pl-6 space-y-8 select-none">
          <div className="relative">
            <div className="absolute -left-8.75 w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              01
            </div>
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-foreground">
                Cloudflare Edge & Reverse Proxy Routing
              </h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                Requests are intercepted at the edge by a{" "}
                <strong className="text-foreground font-semibold">
                  Cloudflare Worker
                </strong>{" "}
                and forwarded to a reverse proxy service. For deployed sites,
                requests are proxied directly to Cloud Run service URLs. For
                preview rendering request streams, the traffic is routed to the
                dedicated{" "}
                <strong className="text-foreground font-semibold">
                  Preview Renderer service
                </strong>
                .
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8.75 w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              02
            </div>
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-foreground">
                Database Snapshot Retrieval
              </h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                The Preview Renderer service retrieves the generated layout
                snapshot from the{" "}
                <code className="text-foreground">generation_snapshots</code>{" "}
                PostgreSQL database table using the request's{" "}
                <code className="text-foreground select-all">sessionId</code>.
                This snapshot encapsulates the original AI-generated JSON{" "}
                <code>pageConfig</code> layout tree and visual{" "}
                <code>styleConfig</code> guidelines.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8.75 w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              03
            </div>
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-foreground">
                Global Styling Injection (layout.tsx)
              </h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                The wrapper <code>layout.tsx</code> decodes the retrieved{" "}
                <code>styleConfig</code> JSON. It dynamically maps tokens (e.g.
                background colors, fonts, borders, primary accent weights) and
                injects them as global CSS custom properties inside the{" "}
                <code>:root</code> selector. This ensures that Tailwind utility
                classes can reference variables seamlessly.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8.75 w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              04
            </div>
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-foreground">
                Element Rendering & Tailwind JIT Compiler (page.tsx)
              </h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                The core page template <code>page.tsx</code> decodes the JSON
                layout <code>pageConfig</code> and renders components using
                predefined renderers mapped by element types (e.g.{" "}
                <code>div</code>, <code>text</code>, <code>img</code>).
                Simultaneously, the service parses the referenced classes,
                compiles exact CSS stylesheets on-the-fly using Tailwind's
                **runtime JIT compiler**, and injects the output style tags
                directly into the page HTML.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Quick Links */}
      <footer className="border-t border-border pt-8 mt-4 select-none">
        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-150">
            <h3 className="text-[15px] font-semibold text-foreground">
              Want to investigate the builder pipeline?
            </h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Explore how builders coordinate with self-repair loops and compile
              static outputs inside the Ingestion & Deployment flow page.
            </p>
          </div>
          <a
            href="/generation-flow"
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0f0f11] dark:bg-white text-white dark:text-neutral-950 font-semibold text-[13px] rounded-md hover:bg-[#1a1a20] dark:hover:bg-neutral-100 transition-colors shadow-sm cursor-pointer"
          >
            <span>Ingestion & Deployment Flow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </footer>
    </div>
  );
}
