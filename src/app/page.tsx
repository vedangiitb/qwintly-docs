"use client";

import {
  Activity,
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  ChevronRight,
  Code2,
  Coins,
  Eye,
  Infinity as InfinityIcon,
  Key,
  Monitor,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="content-wrapper space-y-16">
      {/* Hero Welcome banner */}
      <header className="space-y-4 border-b border-border pb-8 select-none">
        <div className="flex items-center gap-2 text-[12px] font-medium tracking-tight text-neutral-500 dark:text-neutral-400">
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
            Documentation
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" /> Specifications v1.0.1
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Qwintly Ecosystem
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          Qwintly is an AI-powered, high-speed website generation platform
          designed for maximum developer autonomy and absolute cost efficiency.
          By pairing a serverless code-compiling pipeline with custom LLM
          configurations, Qwintly lets you ship high-fidelity web experiences at
          zero baseline cost.
        </p>
      </header>

      {/* Grid of Platform pillars (BYOK, Open Source, Cost Efficiency) */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <h2 className="text-[15px] font-bold tracking-tight text-foreground uppercase dark:text-neutral-500">
            Core Philosophy & Highlights
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: BYOK */}
          <div className="border border-border bg-neutral-50/50 dark:bg-neutral-900/10 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 hover:border-neutral-300 dark:hover:border-neutral-800 p-6 rounded-lg transition-all duration-200 hover:-translate-y-0.5 flex flex-col gap-3 group">
            <div className="w-8 h-8 rounded bg-amber-500/10 text-amber-500 flex items-center justify-center transition-transform group-hover:scale-105">
              <Key className="w-4 h-4" />
            </div>
            <h3 className="text-[15px] font-bold text-foreground">
              Bring Your Own Key (BYOK)
            </h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Plug in your own API keys (OpenAI, Gemini) directly. Bypass
              platform markups, control your spending, and bypass standard
              code-generation limits with your own provider tier.
            </p>
          </div>

          {/* Pillar 2: Open Source */}
          <div className="border border-border bg-neutral-50/50 dark:bg-neutral-900/10 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 hover:border-neutral-300 dark:hover:border-neutral-800 p-6 rounded-lg transition-all duration-200 hover:-translate-y-0.5 flex flex-col gap-3 group">
            <div className="w-8 h-8 rounded bg-cyan-500/10 text-cyan-500 flex items-center justify-center transition-transform group-hover:scale-105">
              <Code2 className="w-4 h-4" />
            </div>
            <h3 className="text-[15px] font-bold text-foreground">
              100% Open Source Codebase
            </h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Complete architectural transparency. Inspect, modify, or self-host
              our event routers, builder jobs, gateway proxies, database
              schemas, and Next.js canvas preview systems.
            </p>
          </div>

          {/* Pillar 3: Cost Efficiency */}
          <div className="border border-border bg-neutral-50/50 dark:bg-neutral-900/10 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 hover:border-neutral-300 dark:hover:border-neutral-800 p-6 rounded-lg transition-all duration-200 hover:-translate-y-0.5 flex flex-col gap-3 group">
            <div className="w-8 h-8 rounded bg-emerald-500/10 text-emerald-500 flex items-center justify-center transition-transform group-hover:scale-105">
              <Coins className="w-4 h-4" />
            </div>
            <h3 className="text-[15px] font-bold text-foreground">
              Serverless Cost Efficiency
            </h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Zero active server costs. Our asynchronous compiler runs on
              ephemeral GCP Cloud Run Jobs that run in seconds and immediately
              scale down to absolute zero when completed.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Rate limits in free tier vs BYOK */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <h2 className="text-[15px] font-bold tracking-tight text-foreground uppercase dark:text-neutral-500">
            Usage Limits & Tiers Comparison
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Tier Card */}
          <div className="border border-border bg-neutral-50/30 dark:bg-[#0c0d10]/20 p-6 rounded-xl space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[16px] font-bold text-foreground">
                  Free Tier
                </h3>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  Quick evaluation and basic staging builds
                </p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-neutral-200 dark:bg-neutral-800 text-muted-foreground">
                Default
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <span className="text-[13px] text-muted-foreground">
                  AI Generations
                </span>
                <span className="text-[14px] font-semibold text-foreground flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-900 border border-border rounded text-[12px] font-bold text-amber-600 dark:text-amber-400">
                    1
                  </span>{" "}
                  free / week
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <span className="text-[13px] text-muted-foreground">
                  Cloud Deployments
                </span>
                <span className="text-[14px] font-semibold text-foreground flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-900 border border-border rounded text-[12px] font-bold text-amber-600 dark:text-amber-400">
                    2
                  </span>{" "}
                  free / week
                </span>
              </div>
            </div>

            <ul className="space-y-2.5 text-[12.5px] text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>Standard low cost Gemini flash models</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>Baseline scaling limits and resources</span>
              </li>
            </ul>
          </div>

          {/* BYOK Tier Card */}
          <div className="border border-emerald-500/25 dark:border-emerald-500/15 bg-emerald-500/2 dark:bg-emerald-500/1 p-6 rounded-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-emerald-500/10 rounded-bl-full pointer-events-none flex items-center justify-center pl-4 pb-4">
              <Key className="w-4 h-4 text-emerald-500/60" />
            </div>

            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[16px] font-bold text-emerald-600 dark:text-emerald-400">
                  Bring Your Own Key (BYOK)
                </h3>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  Unlimited execution using personal credentials
                </p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                Recommended
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-500/10 pb-3">
                <span className="text-[13px] text-muted-foreground">
                  AI Generations
                </span>
                <span className="text-[14px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <InfinityIcon className="w-4 h-4" /> Unlimited
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-emerald-500/10 pb-3">
                <span className="text-[13px] text-muted-foreground">
                  Cloud Deployments
                </span>
                <span className="text-[14px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <InfinityIcon className="w-4 h-4" /> Unlimited
                </span>
              </div>
            </div>

            <ul className="space-y-2.5 text-[12.5px] text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500/70 shrink-0" />
                <span>
                  Wider Range of supported models (OpenAI and Gemini models)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500/70 shrink-0" />
                <span>No rate limits</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500/70 shrink-0" />
                <span>Cost is limited only by your own provider quota</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section: System Architecture Flows */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <h2 className="text-[15px] font-bold tracking-tight text-foreground uppercase dark:text-neutral-500">
            System Architecture & Flows
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Flow 1: Generation & Deployment */}
          <Link
            href="/generation-flow"
            className="group block border border-border bg-neutral-50/20 dark:bg-neutral-900/5 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 p-5 rounded-lg transition-all duration-150 hover:border-neutral-300 dark:hover:border-neutral-800 flex-col justify-between h-36"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-semibold text-[14px]">
                <Activity className="w-4 h-4 text-emerald-500" />
                <span>Generation & Deployment Flow</span>
              </div>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                Trace how user requests flow from GCP Pub/Sub topics, trigger
                our router, launch compile jobs, and deploy serverless
                containers.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[12px] font-medium text-emerald-600 dark:text-emerald-400 mt-2 self-start">
              <span>View blueprints</span>
              <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* Flow 2: Preview Rendering */}
          <Link
            href="/preview-flow"
            className="group block border border-border bg-neutral-50/20 dark:bg-neutral-900/5 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 p-5 rounded-lg transition-all duration-150 hover:border-neutral-300 dark:hover:border-neutral-800 flex-col justify-between h-36"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-semibold text-[14px]">
                <Eye className="w-4 h-4 text-emerald-500" />
                <span>Preview Rendering Flow</span>
              </div>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                Explore the real-time Server-Side Rendering (SSR) pipeline,
                postMessage bridge, and runtime Tailwind JIT CSS compiler.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[12px] font-medium text-emerald-600 dark:text-emerald-400 mt-2 self-start">
              <span>View blueprints</span>
              <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* Flow 3: Planner Agent */}
          <Link
            href="/planner-flow"
            className="group block border border-border bg-neutral-50/20 dark:bg-neutral-900/5 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 p-5 rounded-lg transition-all duration-150 hover:border-neutral-300 dark:hover:border-neutral-800 flex-col justify-between h-36"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-semibold text-[14px]">
                <Brain className="w-4 h-4 text-emerald-500" />
                <span>Planner Agent Flow</span>
              </div>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                Discover the initial mapping loop, layout parsing
                configurations, codebase scanning, and comprehensive design
                proposal stages.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[12px] font-medium text-emerald-600 dark:text-emerald-400 mt-2 self-start">
              <span>View blueprints</span>
              <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* Flow 4: Editing Agent */}
          <Link
            href="/edit-flow"
            className="group block border border-border bg-neutral-50/20 dark:bg-neutral-900/5 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 p-5 rounded-lg transition-all duration-150 hover:border-neutral-300 dark:hover:border-neutral-800 flex-col justify-between h-36"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-semibold text-[14px]">
                <Monitor className="w-4 h-4 text-emerald-500" />
                <span>Editing Agent Flow</span>
              </div>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                Analyze the iterative self-healing cycles that execute test
                commands, inspect build errors, and perform automatic fixes.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[12px] font-medium text-emerald-600 dark:text-emerald-400 mt-2 self-start">
              <span>View blueprints</span>
              <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* Section: Services & Repositories Directory */}
      <section className="space-y-6 border-t border-border pt-12">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <h2 className="text-[15px] font-bold tracking-tight text-foreground uppercase dark:text-neutral-500">
            Ecosystem Services & Repositories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Service: wg-worker */}
          <Link
            href="/services/qwintly-wg-worker"
            className="group border border-border bg-neutral-50/30 dark:bg-[#0c0d10]/20 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 p-4 rounded-lg transition-all flex flex-col justify-between gap-3 h-32.5"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <h4 className="text-[13.5px] font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  wg worker
                </h4>
              </div>
              <p className="text-[12px] text-muted-foreground line-clamp-2 leading-relaxed">
                GCP Cloud Run push receiver. Decodes Pub/Sub notifications and
                routes container jobs.
              </p>
            </div>
            <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-foreground flex items-center gap-0.5 self-start">
              View specifications{" "}
              <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          {/* Service: builder */}
          <Link
            href="/services/qwintly-builder"
            className="group border border-border bg-neutral-50/30 dark:bg-[#0c0d10]/20 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 p-4 rounded-lg transition-all flex flex-col justify-between gap-3 h-32.5"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <h4 className="text-[13.5px] font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  builder job
                </h4>
              </div>
              <p className="text-[12px] text-muted-foreground line-clamp-2 leading-relaxed">
                AI-driven codebase compiler. Spawns planning stages and outputs
                zip templates to GCS buckets.
              </p>
            </div>
            <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-foreground flex items-center gap-0.5 self-start">
              View specifications{" "}
              <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          {/* Service: deployer */}
          <Link
            href="/services/qwintly-deployer-job"
            className="group border border-border bg-neutral-50/30 dark:bg-[#0c0d10]/20 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 p-4 rounded-lg transition-all flex flex-col justify-between gap-3 h-32.5"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <h4 className="text-[13.5px] font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  deployer job
                </h4>
              </div>
              <p className="text-[12px] text-muted-foreground line-clamp-2 leading-relaxed">
                Multi-tenant cloud publisher. Pulls zip archives from GCS and
                publishes active web servers.
              </p>
            </div>
            <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-foreground flex items-center gap-0.5 self-start">
              View specifications{" "}
              <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          {/* Service: gateway */}
          <Link
            href="/services/qwintly-gateway-service"
            className="group border border-border bg-neutral-50/30 dark:bg-[#0c0d10]/20 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 p-4 rounded-lg transition-all flex flex-col justify-between gap-3 h-32.5"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <h4 className="text-[13.5px] font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  gateway service
                </h4>
              </div>
              <p className="text-[12px] text-muted-foreground line-clamp-2 leading-relaxed">
                Subdomain-based dynamic reverse proxy and fast routing engine
                with caching and security checks.
              </p>
            </div>
            <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-foreground flex items-center gap-0.5 self-start">
              View specifications{" "}
              <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          {/* Service: preview-renderer */}
          <Link
            href="/services/qwintly-preview-renderer"
            className="group border border-border bg-neutral-50/30 dark:bg-[#0c0d10]/20 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 p-4 rounded-lg transition-all flex flex-col justify-between gap-3 h-32.5"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <h4 className="text-[13.5px] font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  preview renderer
                </h4>
              </div>
              <p className="text-[12px] text-muted-foreground line-clamp-2 leading-relaxed">
                Next.js server-side preview application compiling live CSS and
                hosting message bridges.
              </p>
            </div>
            <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-foreground flex items-center gap-0.5 self-start">
              View specifications{" "}
              <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          {/* Service: boilerplate */}
          <Link
            href="/services/qwintly-boilerplate"
            className="group border border-border bg-neutral-50/30 dark:bg-[#0c0d10]/20 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 p-4 rounded-lg transition-all flex flex-col justify-between gap-3 h-32.5"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <h4 className="text-[13.5px] font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  boilerplate site
                </h4>
              </div>
              <p className="text-[12px] text-muted-foreground line-clamp-2 leading-relaxed">
                Dynamic, JSON-driven Next.js marketing template using flexible
                OKLCH design variables.
              </p>
            </div>
            <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-foreground flex items-center gap-0.5 self-start">
              View specifications{" "}
              <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          {/* Service: infra */}
          <Link
            href="/services/qwintly-infra"
            className="group border border-border bg-neutral-50/30 dark:bg-[#0c0d10]/20 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 p-4 rounded-lg transition-all flex flex-col justify-between gap-3 h-32.5 sm:col-span-2 lg:col-span-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <h4 className="text-[13.5px] font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  infrastructure & DB
                </h4>
              </div>
              <p className="text-[12px] text-muted-foreground line-clamp-2 leading-relaxed">
                Centralized automation containing all Terraform definitions,
                Supabase schemas, and RLS database policies.
              </p>
            </div>
            <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-foreground flex items-center gap-0.5 self-start">
              View specifications{" "}
              <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
