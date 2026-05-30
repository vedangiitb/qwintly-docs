"use client";

import React from "react";
import { 
  Workflow, 
  Database, 
  Layers, 
  Code, 
  ArrowRight,
  Eye,
  Lock,
  Cpu,
  Monitor
} from "lucide-react";
import InteractiveCanvas from "@/components/InteractiveCanvas";

export default function EditFlow() {
  return (
    <div className="content-wrapper space-y-8">
      {/* Breadcrumbs and Header */}
      <header className="space-y-4 border-b border-border pb-6 select-none">
        <div className="flex items-center gap-2 text-[12px] font-medium text-neutral-500 dark:text-neutral-400">
          <span>Overview</span>
          <span>/</span>
          <span className="text-foreground font-semibold">Editing Agent Flow</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
          <Monitor className="w-8 h-8 text-emerald-500 flex-shrink-0" />
          Editing Agent Flow
        </h1>
        <p className="text-[14px] text-muted-foreground leading-relaxed mt-1">
          Explore how users perform real-time visual modifications on preview sites inside their browser, communicating structural mutations and persisting edits securely via Supabase operations tables.
        </p>
      </header>

      {/* Highlights checklist cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col gap-3">
          <div className="w-8 h-8 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-bold text-foreground">Secure Edge Bridge</h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            Uses secure iframe-to-parent <code>postMessage</code> handshakes. Injection script verifies <code>data-parent-origin</code> before enabling DOM manipulation.
          </p>
        </div>

        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col gap-3">
          <div className="w-8 h-8 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-bold text-foreground">Visual Node Editors</h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            Pre-injects <code>qwintly-preview-editor.js</code>. Tracks hovers, makes elements editable, and serves custom floating node toolbars.
          </p>
        </div>

        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col gap-3">
          <div className="w-8 h-8 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
            <Database className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-bold text-foreground">Operations Auditing</h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            Filters operations against XSS and code injections. Safely logs records to Supabase <code>generation_operations</code> table.
          </p>
        </div>

        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col gap-3">
          <div className="w-8 h-8 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-bold text-foreground">GCS Serialization</h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            Cloud Run job reads operations table, applies transformations directly to GCS zip archive snapshots, and re-uploads builds.
          </p>
        </div>
      </div>

      {/* Interactive Overall System Canvas Map */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 select-none">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <h2 className="text-[15px] font-bold text-foreground">Interactive Editing & Persistence Blueprint</h2>
        </div>

        <InteractiveCanvas title="qwintly - Edge DOM Editor & Persistence Loop">
          <img 
            src="/edit_flow.png" 
            alt="qwintly - Visual Preview Editing Flow" 
            className="max-w-none pointer-events-none select-none rounded-md" 
            style={{ width: "950px", height: "auto" }}
          />
        </InteractiveCanvas>
      </section>

      {/* Description of overall flow stages */}
      <section className="space-y-6 pt-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2 select-none">
          <Workflow className="w-5 h-5 text-emerald-500" /> Visual Redlining & Operations Persistence
        </h2>
        
        <div className="relative border-l border-border/85 ml-3 pl-6 space-y-8 select-none">
          <div className="relative">
            <div className="absolute -left-[35px] w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              01
            </div>
            <div className="space-y-1.5">
              <h3 className="text-[14px] font-bold text-foreground">DOM Manipulation & Iframe Handshake</h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                When a user loads the visual workspace, the parent preview canvas mounts the renderer as an iframe. The iframe pre-injects a specialized lightweight script:
              </p>
              <div className="p-3 border border-border/60 bg-neutral-100/50 dark:bg-neutral-900/40 rounded-md font-mono text-[11.5px] text-muted-foreground">
                qwintly-preview-editor.js
              </div>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                The script parses `data-parent-origin` attributes, verifies that requests match the authorized host, and transmits a <code className="text-foreground">READY</code> ping back containing the active preview route.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[35px] w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              02
            </div>
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-foreground">Interactive Browser Visual Redlining</h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                When the user toggles Edit Mode on the parent workspace header:
              </p>
              <ul className="text-[12px] text-muted-foreground space-y-1.5 pl-3 list-disc pt-1">
                <li>The parent sends a <code className="text-foreground">SET_EDIT_MODE</code> payload to the iframe.</li>
                <li>The injected script listens to hovers, outlining target nodes with an elegant outline.</li>
                <li>Clicking on an eligible element activates inline editing. The script enables <code className="text-foreground font-mono">contentEditable = true</code> and displays a responsive visual toolbar (Confirm, Cancel, Delete).</li>
                <li><strong className="text-foreground font-semibold">Current State:</strong> Full support for text modifications and element deletions. Element position shifts, layouts restructuring, and styling token configurations are under progress.</li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[35px] w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              03
            </div>
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-foreground">Security Auditing Filters & Transactional Operations Ledger</h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                Confirming an operation triggers an checked <code>postMessage</code> packet. The parent service:
              </p>
              <ul className="text-[12px] text-muted-foreground space-y-1.5 pl-3 list-disc pt-1">
                <li>Validates operations payloads, checking for malicious XSS scripts or code injections.</li>
                <li>Writes approved transactional records (e.g. text updates, node deletion selectors) directly into the Supabase database <code className="text-foreground select-all">generation_operations</code> ledger table.</li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[35px] w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              04
            </div>
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-foreground">Supabase JSONB Merge & GCS Serialization</h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                Simultaneously, the editor updates the primary project snapshot inside the <code className="text-foreground">generation_snapshots</code> database table (modifying pageConfigs and styleConfigs columns). When future build/deployment jobs run, the runner syncs these logged operations directly to the project's static snapshot files in the Google Cloud Storage (GCS) bucket and re-uploads the bundle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Quick Links */}
      <footer className="border-t border-border pt-8 mt-4 select-none">
        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-[600px]">
            <h3 className="text-[15px] font-semibold text-foreground">Want to trace preview rendering flows?</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Explore how edge reverse proxies route preview requests and JIT compilers render templates dynamically on the Preview page.
            </p>
          </div>
          <a 
            href="/preview-flow" 
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0f0f11] dark:bg-white text-white dark:text-neutral-950 font-semibold text-[13px] rounded-md hover:bg-[#1a1a20] dark:hover:bg-neutral-100 transition-colors shadow-sm cursor-pointer"
          >
            <span>Preview Rendering Flow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </footer>
    </div>
  );
}
