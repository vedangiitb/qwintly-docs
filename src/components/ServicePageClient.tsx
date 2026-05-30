"use client";

import { ServiceInfo } from "@/config/services";
import { cn } from "@/lib/utils";
import {
  Check,
  Copy,
  Cpu,
  FileText,
  GitBranch,
  Layers,
  Server,
  Terminal,
} from "lucide-react";
import { useState } from "react";

interface ServicePageClientProps {
  service: ServiceInfo;
}

type TabType = "git" | "description" | "deployment" | "flow";

export default function ServicePageClient({ service }: ServicePageClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("description");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "git":
        return (
          <div className="animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2 border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col justify-between">
                <div>
                  <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2 mb-4">
                    <GitBranch className="w-4.5 h-4.5 text-neutral-500" />
                    Repository Details
                  </h3>
                  <div className="space-y-3.5 text-[13px]">
                    <div className="flex items-center justify-between py-1 border-b border-border/50">
                      <span className="text-muted-foreground">Git Host:</span>
                      <span className="font-medium text-foreground">
                        GitHub{" "}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-border/50">
                      <span className="text-muted-foreground">
                        Primary Branch:
                      </span>
                      <span className="font-mono px-1.5 py-0.5 rounded bg-muted text-foreground flex items-center gap-1 text-[11px] font-bold">
                        {service.branch}
                      </span>
                    </div>
                    <div className="py-1">
                      <span className="text-muted-foreground block mb-1">
                        Repository URL:
                      </span>
                      <span className="font-mono text-neutral-600 dark:text-neutral-300 break-all select-all text-[12px] bg-neutral-100 dark:bg-neutral-850 p-1.5 rounded block border border-border/30">
                        {service.gitUrl}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    className="w-full flex items-center justify-center gap-1.5 px-4 py-2 border border-border text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 font-semibold text-[13px] rounded-md transition-colors cursor-pointer"
                    onClick={() => copyToClipboard(service.gitUrl, "url")}
                  >
                    {copiedText === "url" ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span>Copied Link!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Repo URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Terminal instructions */}
              <div className="lg:col-span-3 border border-border rounded-lg overflow-hidden flex flex-col h-full bg-[#0c0d10] text-[#f4f4f5]">
                <div className="px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                  </div>
                  <span className="font-mono text-[11px] text-neutral-500 font-semibold">
                    bash - clone instructions
                  </span>
                </div>
                <div className="p-5 font-mono text-[13px] space-y-2 flex-1 relative min-h-35">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 select-none">$</span>
                    <span className="text-emerald-400">
                      git clone{" "}
                      <span className="text-foreground">
                        {service.gitUrl}.git
                      </span>
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 select-none">$</span>
                    <span className="text-emerald-400">
                      cd <span className="text-foreground">{service.slug}</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 select-none">$</span>
                    <span className="text-emerald-400">
                      git checkout{" "}
                      <span className="text-foreground">{service.branch}</span>
                    </span>
                  </div>

                  <button
                    className="absolute top-4 right-4 p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-850 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    onClick={() =>
                      copyToClipboard(
                        `git clone ${service.gitUrl}.git \ncd ${service.slug}\ngit checkout ${service.branch}`,
                        "clone",
                      )
                    }
                    title="Copy CLI block"
                  >
                    {copiedText === "clone" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case "description":
        return (
          <div className="animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 space-y-6">
                <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
                  <FileText className="w-4.5 h-4.5 text-neutral-500" />
                  System Summary
                </h3>
                <p className="text-[13.5px] text-muted-foreground leading-relaxed">
                  {service.description.summary}
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="text-[13px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    Key Capabilities & Goals
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.description.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-[13px] text-muted-foreground leading-relaxed"
                      >
                        <span className="text-emerald-500 font-bold select-none">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30">
                  <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-neutral-500" />
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {service.description.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-semibold bg-neutral-200/50 dark:bg-neutral-800 text-foreground border border-border/30 select-none"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30">
                  <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2 mb-3">
                    <Terminal className="w-4 h-4 text-neutral-500" />
                    Architectural Layout
                  </h3>
                  <div className="space-y-3">
                    {service.description.architectureNotes.map((note, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-[12.5px] text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "deployment":
        return (
          <div className="animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* CI/CD Timeline list */}
              <div className="lg:col-span-2 border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col justify-between">
                <div>
                  <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2 mb-6">
                    <Server className="w-4.5 h-4.5 text-neutral-500" />
                    CI/CD Pipeline Flow
                  </h3>
                  <div className="relative border-l border-border/80 ml-2.5 pl-5 space-y-6">
                    {service.deployment.ciCdPipeline.map((step, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-7.5 w-5 h-5 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-muted-foreground select-none">
                          {idx + 1}
                        </div>
                        <p className="text-[13px] text-muted-foreground leading-relaxed pt-0.5">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="content-wrapper space-y-8">
      {/* Dynamic Page Header */}
      <header className="space-y-4 select-none">
        <div className="flex items-center gap-2 text-[12px] font-medium text-neutral-500 dark:text-neutral-400">
          <span>Services & Jobs</span>
          <span>/</span>
          <span className="text-foreground font-semibold">{service.title}</span>
        </div>

        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {service.title}
          </h1>
          <span
            className={cn(
              "px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider",
              service.type === "job"
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20",
            )}
          >
            {service.type}
          </span>
        </div>
        <p className="text-[14px] text-muted-foreground max-w-175 leading-relaxed">
          {service.tagline}
        </p>
      </header>

      {/* Tabs navigation panel */}
      <div className="border-b border-border flex items-center gap-6 select-none">
        <button
          className={cn(
            "flex items-center gap-2 text-[14px] font-medium pb-3 transition-colors cursor-pointer relative",
            activeTab === "description"
              ? "text-emerald-600 dark:text-emerald-400 font-semibold"
              : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setActiveTab("description")}
        >
          <FileText className="w-4 h-4" />
          <span>Description</span>
          {activeTab === "description" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
          )}
        </button>
        <button
          className={cn(
            "flex items-center gap-2 text-[14px] font-medium pb-3 transition-colors cursor-pointer relative",
            activeTab === "git"
              ? "text-emerald-600 dark:text-emerald-400 font-semibold"
              : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setActiveTab("git")}
        >
          <GitBranch className="w-4 h-4" />
          <span>Git Project</span>
          {activeTab === "git" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
          )}
        </button>
        <button
          className={cn(
            "flex items-center gap-2 text-[14px] font-medium pb-3 transition-colors cursor-pointer relative",
            activeTab === "deployment"
              ? "text-emerald-600 dark:text-emerald-400 font-semibold"
              : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setActiveTab("deployment")}
        >
          <Cpu className="w-4 h-4" />
          <span>Deployment Details</span>
          {activeTab === "deployment" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
          )}
        </button>
      </div>

      {/* Render the selected dynamic Tab */}
      <div className="pt-2">{renderTabContent()}</div>
    </div>
  );
}
