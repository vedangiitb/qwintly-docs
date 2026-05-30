"use client";

import React from "react";
import { 
  Brain, 
  Layers, 
  Workflow, 
  History, 
  Sliders, 
  CheckSquare, 
  ArrowRight,
  HelpCircle
} from "lucide-react";
import InteractiveCanvas from "@/components/InteractiveCanvas";

export default function PlannerFlow() {
  return (
    <div className="content-wrapper space-y-8">
      {/* Breadcrumbs and Header */}
      <header className="space-y-4 border-b border-border pb-6 select-none">
        <div className="flex items-center gap-2 text-[12px] font-medium text-neutral-500 dark:text-neutral-400">
          <span>Overview</span>
          <span>/</span>
          <span className="text-foreground font-semibold">Planner Agent Flow</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
          <Brain className="w-8 h-8 text-emerald-500 flex-shrink-0" />
          Planner Agent Flow
        </h1>
        <p className="text-[14px] text-muted-foreground leading-relaxed mt-1">
          Trace how the conversational AI planner gathers user requirements, compacts sliding context windows, audits plan histories, invokes interactive tools, and dispatches blueprints to orchestrate website creation.
        </p>
      </header>

      {/* Highlights checklist cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col gap-3">
          <div className="w-8 h-8 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Workflow className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-bold text-foreground">Dual Parallel Flows</h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            Every user request triggers two parallel threads: updating the project's collected context memory and generating the user plan proposal.
          </p>
        </div>

        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col gap-3">
          <div className="w-8 h-8 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Sliders className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-bold text-foreground">Sliding Context Limits</h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            Maintains token limits by sending only the last 3 user and 2 agent messages. Remaining context is managed via collected session memory.
          </p>
        </div>

        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col gap-3">
          <div className="w-8 h-8 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
            <History className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-bold text-foreground">Plan History Auditing</h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            Leverages previous implemented and failed plans to draft new checklists, ensuring prior runtime bugs and route failures are automatically resolved.
          </p>
        </div>

        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col gap-3">
          <div className="w-8 h-8 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <HelpCircle className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-bold text-foreground">Interactive Tools</h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            Uses tools like <code>ask_question</code> and <code>update_plan</code> to interact. Approving dispatches blueprints to GCP Pub/Sub <code>webgen-topic</code>.
          </p>
        </div>
      </div>

      {/* Interactive Overall System Canvas Map */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 select-none">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <h2 className="text-[15px] font-bold text-foreground">Planner Agent Execution Flow Blueprint</h2>
        </div>

        <InteractiveCanvas title="qwintly - Planner Agent Cognitive Loop">
          <img 
            src="/planner_agent_flow.png" 
            alt="qwintly - Planner Agent Dynamic Flow Diagram" 
            className="max-w-none pointer-events-none select-none rounded-md" 
            style={{ width: "950px", height: "auto" }}
          />
        </InteractiveCanvas>
      </section>

      {/* Description of overall flow stages */}
      <section className="space-y-6 pt-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2 select-none">
          <Workflow className="w-5 h-5 text-emerald-500" /> Conversational Cognitive Lifecycle
        </h2>
        
        <div className="relative border-l border-border/85 ml-3 pl-6 space-y-8 select-none">
          <div className="relative">
            <div className="absolute -left-[35px] w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              01
            </div>
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-foreground">Dual Parallel Processing Streams</h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                Every incoming user instruction initiates two parallel operations inside the agent coordinator:
              </p>
              <ul className="text-[12px] text-muted-foreground space-y-1.5 pl-3 list-disc pt-1">
                <li><strong className="text-foreground font-semibold">Collected Context Refinement:</strong> Updates session-based memories, requirement extractions, and project parameters.</li>
                <li><strong className="text-foreground font-semibold">User Output Compiler:</strong> Formulates plan responses, checklists, and route outlines based on inputs.</li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[35px] w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              02
            </div>
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-foreground">Sliding Window & Metadata Context Assembly</h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                To maximize conversational speed and prevent token bloat, the prompt compiler applies a strict budget:
              </p>
              <ul className="text-[12px] text-muted-foreground space-y-1.5 pl-3 list-disc pt-1">
                <li>Loads only the <strong className="text-foreground">last 3 user messages</strong> and <strong className="text-foreground">last 2 agent messages</strong> verbatim.</li>
                <li>Hydrates the prompt with project metadata summaries (active routes and sections).</li>
                <li>Injects plan histories (states of prior successful or failed generations) and collected context from session memory.</li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[35px] w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              03
            </div>
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-foreground">Interactive Tool Loop (ask_question / update_plan)</h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                The agent parses the requirement history. If ambiguities exist or specifications need update, the agent issues tool calls:
              </p>
              <ul className="text-[12px] text-muted-foreground space-y-1.5 pl-3 list-disc pt-1">
                <li><code className="text-foreground font-mono">ask_question</code>: Opens interactive questionnaires on the UI to clarify user choices (e.g. templates, colors).</li>
                <li><code className="text-foreground font-mono">update_plan</code>: Modifies the active development checklist dynamically in real time.</li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[35px] w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              04
            </div>
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-foreground">User Plan Approval & Pub/Sub Dispatch</h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                The user reviews the generated plan. If satisfied, the user clicks **Approve**, which posts an edge command event directly to the Google Cloud Pub/Sub <code className="text-foreground select-all">webgen-topic</code> (initiating the backend Builder Jobs). Alternatively, the user can request revision loops, which redirects the agent to Step 1.
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
