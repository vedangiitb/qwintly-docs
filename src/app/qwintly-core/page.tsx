"use client";

import { cn } from "@/lib/utils";
import {
  Boxes,
  Check,
  Copy,
  Database,
  HelpCircle,
  Info,
  Layers,
  Workflow,
} from "lucide-react";
import { useState } from "react";

export default function QwintlyCore() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeToolTab, setActiveToolTab] = useState<string>("read_file");
  const [activeContextTab, setActiveContextTab] =
    useState<string>("compaction");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const codeSnippets = {
    install: "npm i @vedangiitb/qwintly-core",
    git: "https://github.com/vedangiitb/qwintly-core",
    usage: `import { AiPlanner, DbPool, SelfHealer } from "@vedangiitb/qwintly-core";

// 1. Initialize Postgres connection pool via qwintly-core
const db = DbPool.getInstance({
  connectionString: process.env.DATABASE_URL,
  maxConnections: 15
});

// 2. Instantiate AI Planner with custom context
const planner = new AiPlanner({
  provider: "google",
  model: "gemini-1.5-pro",
  temperature: 0.1
});

// 3. Run plan modifications check with Self-Repair loop
async function generateLayout(prompt: string) {
  const plan = await planner.createPlan(prompt);
  
  const healer = new SelfHealer();
  const validation = await healer.validateHtml(plan.code);
  
  if (!validation.valid) {
    console.warn("Syntax errors found. Triggering healing loop...");
    const healedCode = await healer.heal(plan.code, validation.errors);
    return healedCode;
  }
  
  return plan.code;
}`,
    memoryTrace: `MEMORY (tool trace summary):
- read_file app/styleConfig.json:1-120 (capped)
- update_global_styles success tokens=background,foreground version=2 changed=true`,
  };

  return (
    <div className="content-wrapper space-y-8">
      {/* Breadcrumbs and Header */}
      <header className="space-y-4 select-none border-b border-border pb-6">
        <div className="flex items-center gap-2 text-[12px] font-medium text-neutral-500 dark:text-neutral-400">
          <span>Resources</span>
          <span>/</span>
          <span className="text-foreground font-semibold">
            qwintly-core library
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            qwintly-core
          </h1>
          <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider">
            <span className="px-2 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              stable
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              v1.5.0
            </span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              npm package
            </span>
          </div>
        </div>
        <p className="text-[14px] text-muted-foreground max-w-187.5 leading-relaxed">
          The definitive architecture and technical reference documentation for{" "}
          <strong>Qwintly Core</strong>. Details the inner workings of the AI
          agent core engine driving the automated planner and codegen
          capabilities of the Qwintly website generator.
        </p>
      </header>

      {/* Package Information Stats Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        <div className="border border-border p-5 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col justify-between gap-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-500">
            Installation
          </span>
          <div className="flex items-center justify-between gap-2">
            <code className="font-mono text-[12px] text-foreground font-semibold truncate select-all">
              {codeSnippets.install}
            </code>
            <button
              className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-450 hover:text-foreground transition-colors cursor-pointer shrink-0"
              onClick={() => copyToClipboard(codeSnippets.install, "install")}
              title="Copy installation command"
            >
              {copiedText === "install" ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        <div className="border border-border p-5 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col justify-between gap-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-500">
            Git Repository
          </span>
          <div className="flex items-center justify-between gap-2">
            <a
              href={codeSnippets.git}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12.5px] font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="w-3.5 h-3.5"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>{" "}
              Source Code
            </a>
            <button
              className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-450 hover:text-foreground transition-colors cursor-pointer shrink-0"
              onClick={() => copyToClipboard(codeSnippets.git, "git")}
              title="Copy Git repository URL"
            >
              {copiedText === "git" ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        <div className="border border-border p-5 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col justify-between gap-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-500">
            Registry Type
          </span>
          <div className="text-[13px] font-medium text-foreground">
            <a
              href="https://www.npmjs.com/package/@vedangiitb/qwintly-core"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              NPM Packages
            </a>
          </div>
        </div>

        <div className="border border-border p-5 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col justify-between gap-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-500">
            Language Target
          </span>
          <div className="text-[13px] font-medium text-foreground">
            <span>TypeScript</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="space-y-12">
        {/* Section 1: High-Level System Architecture */}
        <section className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2 select-none">
            <Layers className="w-5 h-5 text-emerald-500" /> High-Level System
            Architecture
          </h2>
          <p className="text-[13.5px] text-muted-foreground leading-relaxed">
            Qwintly Core acts as the orchestrator connecting the Gemini Large
            Language Model (LLM), the client website workspace, and the
            persistence layers (Supabase database and Upstash Redis). It
            operates via a structured, multi-turn{" "}
            <strong className="text-foreground font-semibold">Tool Loop</strong>{" "}
            (<code className="text-foreground select-all">runToolLoop</code>)
            optimized for token efficiency, safety, and real-time execution
            visibility.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
            <div className="border border-border/60 bg-background p-5 rounded-lg flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <h3 className="text-[14px] font-bold text-foreground">
                  LLM Orchestrator
                </h3>
              </div>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                Brokers interaction with the Gemini Large Language Model,
                packing historical agent trace contexts and routing parameters
                efficiently.
              </p>
            </div>

            <div className="border border-border/60 bg-background p-5 rounded-lg flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-500" />
                <h3 className="text-[14px] font-bold text-foreground">
                  Workspace Link
                </h3>
              </div>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                Binds the active website repository dynamically, executing
                atomic layout adjustments on declarations such as{" "}
                <code>page.config.ts</code>.
              </p>
            </div>

            <div className="border border-border/60 bg-background p-5 rounded-lg flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h3 className="text-[14px] font-bold text-foreground">
                  Persistence Layers
                </h3>
              </div>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                Streams live progress via Redis and audits system costs directly
                inside Supabase tables.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: The Tool Ecosystem */}
        <section className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2 select-none">
            <Boxes className="w-5 h-5 text-emerald-500" /> The Tool Ecosystem
          </h2>
          <p className="text-[13.5px] text-muted-foreground leading-relaxed">
            Tools in Qwintly Core are designed with a strict separation of
            concerns, dividing declarations (Schemas) from the execution
            (Implementations).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
            <div className="border border-border/60 bg-background p-5 rounded-lg flex flex-col justify-between gap-3 h-full">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h3 className="text-[14px] font-bold text-foreground">
                    Schemas
                  </h3>
                </div>
                <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                  Define the JSON-Schema descriptions of function arguments,
                  parameters, and descriptions used by Gemini for tool
                  selection.
                </p>
              </div>
              <code className="text-[10px] font-mono bg-muted p-1 rounded text-neutral-450 border border-border/50 block text-center truncate">
                src/ai/tools/schemas/
              </code>
            </div>

            <div className="border border-border/60 bg-background p-5 rounded-lg flex flex-col justify-between gap-3 h-full">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-violet-500" />
                  <h3 className="text-[14px] font-bold text-foreground">
                    Implementations
                  </h3>
                </div>
                <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                  Houses workspace-level side-effects such as file reads/writes,
                  folder listings, element trees, CSS/styles manipulation, etc.
                </p>
              </div>
              <code className="text-[10px] font-mono bg-muted p-1 rounded text-neutral-450 border border-border/50 block text-center truncate">
                src/ai/tools/implementations/
              </code>
            </div>

            <div className="border border-border/60 bg-background p-5 rounded-lg flex flex-col justify-between gap-3 h-full">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  <h3 className="text-[14px] font-bold text-foreground">
                    Factories
                  </h3>
                </div>
                <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                  Binds workspace environments dynamically, passing parameters
                  like file systems, working folders, and active directories.
                </p>
              </div>
              <code className="text-[10px] font-mono bg-muted p-1 rounded text-neutral-450 border border-border/50 block text-center truncate">
                factories.ts
              </code>
            </div>
          </div>

          {/* Categorized Toolsets Table */}
          <div className="space-y-4 pt-4 border-t border-border/50">
            <h3 className="text-[15px] font-bold text-foreground select-none">
              Categorized Toolsets
            </h3>
            <p className="text-[13.5px] text-muted-foreground leading-relaxed">
              The engine divides execution into two discrete phases, restricting
              model permissions via customized{" "}
              <strong className="text-foreground font-semibold">
                toolsets
              </strong>{" "}
              to maintain focus and security.
            </p>

            <div className="overflow-x-auto border border-border rounded-lg bg-background">
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr className="border-b border-border bg-neutral-50/50 dark:bg-neutral-900/50 text-left select-none">
                    <th className="px-5 py-3 font-semibold text-foreground text-[11px] uppercase tracking-wider w-1/4">
                      Phase / Toolset
                    </th>
                    <th className="px-5 py-3 font-semibold text-foreground text-[11px] uppercase tracking-wider w-1/2">
                      Allowed Tools
                    </th>
                    <th className="px-5 py-3 font-semibold text-foreground text-[11px] uppercase tracking-wider">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-5 py-4 select-none">
                      <span className="font-bold text-cyan-600 dark:text-cyan-400 block mb-1">
                        Planner Phase
                      </span>
                      <code className="font-mono text-[10px] text-neutral-400">
                        plannerTools
                      </code>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5 font-mono text-[10.5px]">
                        {[
                          "read_file",
                          "search",
                          "list_dir",
                          "get_available_routes",
                          "submit_planner_tasks",
                        ].map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-450 border border-cyan-500/20 select-all"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground leading-relaxed text-[12.5px]">
                      Investigates project layouts, performs code/asset
                      research, and outputs a concrete implementation checklist.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 select-none">
                      <span className="font-bold text-violet-600 dark:text-violet-400 block mb-1">
                        Codegen Phase
                      </span>
                      <code className="font-mono text-[10px] text-neutral-400">
                        codegenTools
                      </code>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5 font-mono text-[10.5px]">
                        {[
                          "read_file",
                          "update_global_styles",
                          "create_new_route",
                          "insert_element",
                          "delete_element",
                          "update_classname",
                          "update_props",
                          "list_dir",
                          "get_available_routes",
                          "submit_codegen_done",
                        ].map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-450 border border-violet-500/20 select-all"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground leading-relaxed text-[12.5px]">
                      Executes structural modifications, manipulates UI
                      components/layouts, updates design tokens, and finalizes
                      edits.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Specialized Tool Implementation Highlights */}
          <div className="space-y-4 pt-4 border-t border-border/50">
            <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2 select-none">
              <Info className="w-4.5 h-4.5 text-neutral-500" /> Specialized Tool
              Implementation Highlights
            </h3>

            <div className="border-b border-border flex items-center gap-6 select-none text-[13.5px]">
              <button
                className={cn(
                  "pb-2.5 transition-colors cursor-pointer relative font-medium",
                  activeToolTab === "read_file"
                    ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => setActiveToolTab("read_file")}
              >
                1. read_file (Auto-Capped Reader)
                {activeToolTab === "read_file" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
                )}
              </button>
              <button
                className={cn(
                  "pb-2.5 transition-colors cursor-pointer relative font-medium",
                  activeToolTab === "styling_structural"
                    ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => setActiveToolTab("styling_structural")}
              >
                2. Styling & Structural Manipulation
                {activeToolTab === "styling_structural" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
                )}
              </button>
            </div>

            <div className="pt-1">
              {activeToolTab === "read_file" && (
                <div className="p-5 border border-border/80 bg-background rounded-lg space-y-3 leading-relaxed text-[13px] text-muted-foreground">
                  <p>
                    The primary file reader utilized across planner and codegen
                    tasks. Built with aggressive auto-capping heuristics to
                    protect model speed:
                  </p>
                  <div className="space-y-2.5 pl-3">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold select-none">
                        •
                      </span>
                      <span>
                        <strong className="text-foreground font-semibold">
                          Auto-Capped Reader:
                        </strong>{" "}
                        Supports reading a specific line range (
                        <code>start_line</code> to <code>end_line</code>).
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold select-none">
                        •
                      </span>
                      <span>
                        <strong className="text-foreground font-semibold">
                          Runaway Prevention:
                        </strong>{" "}
                        If no range is specified or if the requested range is
                        excessively large, it automatically applies context
                        capping (default:{" "}
                        <strong className="text-foreground">200 lines</strong>)
                        to prevent runaway token usage.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeToolTab === "styling_structural" && (
                <div className="p-5 border border-border/80 bg-background rounded-lg space-y-3 leading-relaxed text-[13px] text-muted-foreground">
                  <p>
                    Provides declarative design token modifiers and granular
                    schema updates, rather than raw code generation:
                  </p>
                  <div className="space-y-2.5 pl-3">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold select-none">
                        •
                      </span>
                      <span>
                        <strong className="text-foreground font-semibold">
                          update_global_styles:
                        </strong>{" "}
                        Flat-key styling modifier targeting global configuration
                        tokens (like background, foreground colors, borders,
                        font weights) stored in the workspace's styling file.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold select-none">
                        •
                      </span>
                      <span>
                        <strong className="text-foreground font-semibold">
                          Structural Mutators:
                        </strong>{" "}
                        <code>insert_element</code> /{" "}
                        <code>delete_element</code> / <code>update_props</code>{" "}
                        / <code>update_classname</code> declaratively manage
                        elements within page configurations, ensuring strict
                        structural changes without direct code rewriting.
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 3: The toolLoop Execution Flow */}
        <section className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2 select-none">
            <Workflow className="w-5 h-5 text-emerald-500" /> The toolLoop
            Execution Flow
          </h2>
          <p className="text-[13.5px] text-muted-foreground leading-relaxed select-none">
            The tool loop handles the turn-by-turn conversation lifecycle. A
            single turn consists of:
          </p>

          <div className="relative border-l border-border/85 ml-3 pl-6 space-y-8 select-none">
            <div className="relative">
              <div className="absolute -left-8.75 w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-cyan-600 dark:text-cyan-400">
                01
              </div>
              <div className="space-y-1">
                <h4 className="text-[14px] font-bold text-foreground">
                  Context Optimization
                </h4>
                <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                  The current conversational thread is analyzed and compacted
                  based on strict size and message constraints using{" "}
                  <code>compactForModel</code>.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8.75 w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-violet-600 dark:text-violet-400">
                02
              </div>
              <div className="space-y-1">
                <h4 className="text-[14px] font-bold text-foreground">
                  Model Turn
                </h4>
                <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                  The compacted history is transmitted to Gemini via{" "}
                  <code>aiCallWithRetry</code>, supporting up to{" "}
                  <strong className="text-foreground">
                    3 automatic retries
                  </strong>{" "}
                  with exponential backoff in case of transient API failures.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8.75 w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                03
              </div>
              <div className="space-y-1.5">
                <h4 className="text-[14px] font-bold text-foreground">
                  Function Processing
                </h4>
                <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                  Evaluates output from the Gemini LLM. If the model returns
                  text, execution terminates. If it calls a function, the loop
                  triggers:
                </p>
                <ul className="text-[12px] text-muted-foreground space-y-1.5 pl-3 list-disc">
                  <li>
                    <strong className="text-foreground font-semibold">
                      Normalization:
                    </strong>{" "}
                    Inputs are normalized (e.g. converting string line bounds
                    into real integers).
                  </li>
                  <li>
                    <strong className="text-foreground font-semibold">
                      Logging:
                    </strong>{" "}
                    A user-friendly message is constructed and broadcasted to
                    the frontend indicating the tool's immediate action.
                  </li>
                  <li>
                    <strong className="text-foreground font-semibold">
                      Execution:
                    </strong>{" "}
                    The appropriate workspace implementation handler runs.
                  </li>
                  <li>
                    <strong className="text-foreground font-semibold">
                      Event Summarization:
                    </strong>{" "}
                    The outcome is saved as a <code>ToolEvent</code> to compile
                    high-level summarization.
                  </li>
                  <li>
                    <strong className="text-foreground font-semibold">
                      DB Persistence:
                    </strong>{" "}
                    The tool parameters and outputs are logged to the database.
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8.75 w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-neutral-500">
                04
              </div>
              <div className="space-y-1">
                <h4 className="text-[14px] font-bold text-foreground">
                  Terminal Check
                </h4>
                <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                  If the executed tool matches the target stage's completion
                  trigger (e.g. <code>submit_codegen_done</code> or{" "}
                  <code>submit_planner_tasks</code>), the loop terminates.
                  Otherwise, it carries the modifications back to Step 1.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Smart Context Management */}
        <section className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2 select-none">
            <HelpCircle className="w-5 h-5 text-emerald-500" /> Smart Context
            Management
          </h2>
          <p className="text-[13.5px] text-muted-foreground leading-relaxed">
            A recurring challenge with complex agent loops is context-window
            bloat caused by reading multiple files. Qwintly Core addresses this
            with an aggressive compression policy:
          </p>

          <div className="space-y-4">
            <div className="border-b border-border flex items-center gap-6 select-none text-[13.5px]">
              <button
                className={cn(
                  "pb-2.5 transition-colors cursor-pointer relative font-medium",
                  activeContextTab === "compaction"
                    ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => setActiveContextTab("compaction")}
              >
                1. Conversational Compaction
                {activeContextTab === "compaction" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
                )}
              </button>
              <button
                className={cn(
                  "pb-2.5 transition-colors cursor-pointer relative font-medium",
                  activeContextTab === "pruning"
                    ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => setActiveContextTab("pruning")}
              >
                2. Older Message Pruning
                {activeContextTab === "pruning" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
                )}
              </button>
            </div>

            <div className="pt-1">
              {activeContextTab === "compaction" && (
                <div className="space-y-4 leading-relaxed text-[13px] text-muted-foreground">
                  <p>
                    The history compaction operates on a strict budget (
                    <code>maxModelChars</code>, default:{" "}
                    <strong className="text-foreground">
                      120,000 characters
                    </strong>
                    ):
                  </p>
                  <ul className="space-y-2 pl-3">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold select-none">
                        •
                      </span>
                      <span>
                        <strong className="text-foreground font-semibold">
                          Recent Conversation Window:
                        </strong>{" "}
                        It always preserves the most recent{" "}
                        <code>tailMessages</code> (default: 8 turns) verbatim to
                        ensure the model understands immediate instruction
                        changes.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold select-none">
                        •
                      </span>
                      <span>
                        <strong className="text-foreground font-semibold">
                          Memory Summarization:
                        </strong>{" "}
                        Older tool calls outside this window are completely
                        stripped. In their place, a single, highly compressed
                        context block is injected compiled dynamically from the{" "}
                        <code>ToolEvent</code> registry.
                      </span>
                    </li>
                  </ul>

                  <div className="border border-neutral-850 rounded-lg overflow-hidden flex flex-col bg-[#0c0d10] text-[#f4f4f5] max-w-2xl select-none mx-auto">
                    <div className="px-3 py-2 bg-neutral-900 border-b border-neutral-850 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                        <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                        <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                      </div>
                      <span className="font-mono text-[10px] text-neutral-500 font-semibold">
                        Compacted Memory Injected Block
                      </span>
                      <button
                        className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        onClick={() =>
                          copyToClipboard(
                            codeSnippets.memoryTrace,
                            "memoryTrace",
                          )
                        }
                      >
                        {copiedText === "memoryTrace" ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                    <pre className="p-4 font-mono text-[11px] text-neutral-400 whitespace-pre overflow-x-auto">
                      <code>{codeSnippets.memoryTrace}</code>
                    </pre>
                  </div>
                </div>
              )}

              {activeContextTab === "pruning" && (
                <div className="p-5 border border-border/80 bg-background rounded-lg space-y-3 leading-relaxed text-[13px] text-muted-foreground">
                  <p>
                    If the conversation size still exceeds safe character limits
                    after compaction:
                  </p>
                  <div className="space-y-2.5 pl-3">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold select-none">
                        •
                      </span>
                      <span>
                        <strong className="text-foreground font-semibold">
                          Iterative Pruning:
                        </strong>{" "}
                        The compactor recursively and iteratively cuts older
                        turns from the workspace's early initialization trace.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold select-none">
                        •
                      </span>
                      <span>
                        <strong className="text-foreground font-semibold">
                          Safety Guards:
                        </strong>{" "}
                        Guarantees the core context never overflows Gemini's
                        token limitations, preventing model crashes.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold select-none">
                        •
                      </span>
                      <span>
                        <strong className="text-foreground font-semibold">
                          Retains Vital System Prompts:
                        </strong>{" "}
                        Never prunes structural system declarations or the
                        active goal checklist.
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 5: Model Output & Tool Call Persistence */}
        <section className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2 select-none">
            <Database className="w-5 h-5 text-emerald-500" /> Model Output &
            Tool Call Persistence
          </h2>
          <p className="text-[13.5px] text-muted-foreground leading-relaxed select-none">
            To guarantee full traceability, auditability, and real-time
            observability, Qwintly Core persists every facet of model
            interactions:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
            <div className="border border-border/60 bg-background p-5 rounded-lg flex flex-col justify-between gap-3 h-full">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-500" />
                  <h4 className="text-[14px] font-bold text-foreground">
                    gen_tool_calls Logging
                  </h4>
                </div>
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  Tracks every single tool execution in the Supabase database
                  via the <code>GenToolCallsRepository</code>.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 text-[9px] font-mono text-neutral-450 dark:text-neutral-500 pt-2 border-t border-border/50">
                {["sessionId", "tool_name", "params", "final_output"].map(
                  (b) => (
                    <span
                      key={b}
                      className="px-1.5 py-0.5 rounded bg-muted border border-border/50 select-all"
                    >
                      {b}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="border border-border/60 bg-background p-5 rounded-lg flex flex-col justify-between gap-3 h-full">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  <h4 className="text-[14px] font-bold text-foreground">
                    gen_tokens Auditing
                  </h4>
                </div>
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  Monitors exact API execution expenses by accumulating input
                  and output tokens during each LLM call.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 text-[9px] font-mono text-neutral-450 dark:text-neutral-500 pt-2 border-t border-border/50">
                {[
                  "sessionId",
                  "model_name",
                  "input_tokens",
                  "output_tokens",
                ].map((b) => (
                  <span
                    key={b}
                    className="px-1.5 py-0.5 rounded bg-muted border border-border/50 select-all"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-border/60 bg-background p-5 rounded-lg flex flex-col justify-between gap-3 h-full">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h4 className="text-[14px] font-bold text-foreground">
                    status_messages Streaming
                  </h4>
                </div>
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  Streams real-time logs to PostgreSQL <code>gen_status</code>{" "}
                  table and publishes to Redis stream.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 text-[9px] font-mono text-neutral-450 dark:text-neutral-500 pt-2 border-t border-border/50">
                {["chatId", "eventType", "logOutput"].map((b) => (
                  <span
                    key={b}
                    className="px-1.5 py-0.5 rounded bg-muted border border-border/50 select-all"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
