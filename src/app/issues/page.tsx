"use client";

import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  RefreshCw,
  Search,
  User,
  X,
} from "lucide-react";
import React, { useState, useEffect } from "react";

interface Label {
  name: string;
  color: string;
}

interface Issue {
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

interface ProjectInfo {
  title: string;
  url: string;
  type: string;
  number?: number;
}

export default function IssuesBoard() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);

  // Set default filter status to "open" and order open first, closed next, all last
  const [filterStatus, setFilterStatus] = useState<"all" | "open" | "closed">("open");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLabel, setSelectedLabel] = useState<string>("All");
  const [expandedIssue, setExpandedIssue] = useState<Issue | null>(null);

  // Load issues from server-side route
  const fetchIssues = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/issues");
      if (!res.ok) {
        throw new Error("HTTP connection failed while requesting live issues.");
      }
      const data = await res.json();
      setIssues(data.issues || []);
      setProjectInfo(data.projectInfo || null);
    } catch (err: any) {
      console.error(err);
      setIssues([]);
      setProjectInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Compile unique label choices dynamically based on fetched issues
  const uniqueLabels = Array.from(
    new Set(issues.flatMap((issue) => (issue.labels || []).map((l) => l.name)))
  );
  const labels = ["All", ...uniqueLabels];

  // Dynamic Hex style processor for label bubbles
  const getLabelStyle = (color: string) => {
    const isHex = /^[0-9A-Fa-f]{6}$/.test(color) || (color.startsWith("#") && /^[0-9A-Fa-f]{6}$/.test(color.slice(1)));
    if (!isHex) {
      // Fallback classes if it is not a valid hex string
      switch (color.toLowerCase()) {
        case "bug":
          return {
            backgroundColor: "rgba(244, 63, 94, 0.1)",
            color: "rgb(251, 113, 133)",
            borderColor: "rgba(244, 63, 94, 0.2)",
          };
        case "feature":
        case "enhancement":
          return {
            backgroundColor: "rgba(6, 182, 212, 0.1)",
            color: "rgb(34, 211, 238)",
            borderColor: "rgba(6, 182, 212, 0.2)",
          };
        case "docs":
        case "documentation":
          return {
            backgroundColor: "rgba(139, 92, 246, 0.1)",
            color: "rgb(167, 139, 250)",
            borderColor: "rgba(139, 92, 246, 0.2)",
          };
        default:
          return {
            backgroundColor: "rgba(115, 115, 115, 0.1)",
            color: "rgb(163, 163, 163)",
            borderColor: "rgba(115, 115, 115, 0.2)",
          };
      }
    }

    const hex = color.startsWith("#") ? color : `#${color}`;
    return {
      backgroundColor: `${hex}15`,
      color: hex,
      borderColor: `${hex}30`,
    };
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesStatus =
      filterStatus === "all" ||
      issue.status?.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.number.toString().includes(searchQuery);
    const matchesLabel =
      selectedLabel === "All" ||
      (issue.labels || []).some((l) => l.name === selectedLabel);

    return matchesStatus && matchesSearch && matchesLabel;
  });

  const openIssuesCount = issues.filter((i) => i.status === "open").length;
  const closedIssuesCount = issues.filter((i) => i.status === "closed").length;

  return (
    <div className="content-wrapper space-y-8">
      {/* Header Panel */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6 select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Platform Issues Board
          </h1>
          <p className="text-[14px] text-muted-foreground leading-relaxed mt-1">
            Track our official task tickets, bugs, PRs, and active software integrations.
          </p>
        </div>

        {/* Sync Status Badge & Action Button */}
        <div className="flex flex-wrap items-center gap-3">
          {projectInfo && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-[12px] font-medium animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>
                GitHub Live: {projectInfo.type === "Repository" ? "" : "Project #"}{projectInfo.title}
              </span>
            </div>
          )}

          <button
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 border border-border text-[12px] font-semibold text-foreground bg-neutral-50 dark:bg-neutral-900/30 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md cursor-pointer transition-colors shadow-sm disabled:opacity-60",
              isLoading && "cursor-not-allowed"
            )}
            onClick={fetchIssues}
            disabled={isLoading}
            title="Fetch latest issues from GitHub"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", isLoading && "animate-spin")} />
            <span>Sync Now</span>
          </button>
        </div>
      </header>

      {/* Metrics widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
        <div className="border border-border p-5 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col justify-between gap-1 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Total Issues & PRs
          </span>
          <span className="text-2xl font-bold text-foreground">
            {isLoading ? "..." : issues.length}
          </span>
        </div>
        <div className="border border-border p-5 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col justify-between gap-1 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500">
            Active Open
          </span>
          <span className="text-2xl font-bold text-foreground">
            {isLoading ? "..." : openIssuesCount}
          </span>
        </div>
        <div className="border border-border p-5 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col justify-between gap-1 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-500">
            Completed Closed
          </span>
          <span className="text-2xl font-bold text-foreground">
            {isLoading ? "..." : closedIssuesCount}
          </span>
        </div>
      </div>

      {/* Issues search and filter dashboards */}
      <div className="space-y-4 border border-border p-5 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 select-none shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search issues by keyword, title content, or ticket number..."
            className="w-full pl-9 pr-4 py-2 border border-border bg-background rounded-md text-[13.5px] outline-none focus:ring-1 focus:ring-emerald-500 text-foreground shadow-sm"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pt-1">
          {/* Status switchers reordered: Open first, Closed second, All last */}
          <div className="flex items-center gap-1.5 p-1 bg-background border border-border rounded-md w-fit shadow-sm">
            <button
              className={cn(
                "px-3 py-1 rounded text-[12.5px] font-medium transition-colors cursor-pointer",
                filterStatus === "open"
                  ? "bg-neutral-100 dark:bg-neutral-800 text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setFilterStatus("open")}
            >
              Open ({isLoading ? "..." : openIssuesCount})
            </button>
            <button
              className={cn(
                "px-3 py-1 rounded text-[12.5px] font-medium transition-colors cursor-pointer",
                filterStatus === "closed"
                  ? "bg-neutral-100 dark:bg-neutral-800 text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setFilterStatus("closed")}
            >
              Closed ({isLoading ? "..." : closedIssuesCount})
            </button>
            <button
              className={cn(
                "px-3 py-1 rounded text-[12.5px] font-medium transition-colors cursor-pointer",
                filterStatus === "all"
                  ? "bg-neutral-100 dark:bg-neutral-800 text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setFilterStatus("all")}
            >
              All ({isLoading ? "..." : issues.length})
            </button>
          </div>

          {/* Label selector */}
          <div className="flex flex-wrap items-center gap-1.5">
            {labels.map((labelName) => (
              <button
                key={labelName}
                className={cn(
                  "px-3 py-1 border rounded-md text-[12px] font-medium transition-colors cursor-pointer shadow-sm",
                  selectedLabel === labelName
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-semibold"
                    : "border-border text-muted-foreground hover:text-foreground bg-background"
                )}
                onClick={() => setSelectedLabel(labelName)}
              >
                {labelName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Issues Listing */}
      <div className="space-y-4">
        {isLoading ? (
          // Pulsing Premium Loading Skeletons
          <div className="space-y-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="border border-border p-5 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 animate-pulse flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-4.5 h-4.5 rounded-full bg-neutral-200 dark:bg-neutral-800 shrink-0 mt-0.5" />
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="h-4 w-12 bg-neutral-200 dark:bg-neutral-800 rounded" />
                      <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-28 bg-neutral-200 dark:bg-neutral-800 rounded" />
                      <div className="h-3 w-4 bg-neutral-200 dark:bg-neutral-800 rounded" />
                      <div className="h-3 w-20 bg-neutral-200 dark:bg-neutral-800 rounded" />
                    </div>
                  </div>
                </div>
                <div className="h-6 w-12 bg-neutral-200 dark:bg-neutral-800 rounded self-end md:self-center" />
              </div>
            ))}
          </div>
        ) : filteredIssues.length === 0 ? (
          <div className="border border-dashed border-border/80 p-12 text-center text-muted-foreground text-[14px] italic rounded-lg select-none shadow-sm animate-fade-in">
            No issue records found matching your active filters.
          </div>
        ) : (
          filteredIssues.map((issue) => (
            <div
              key={issue.number}
              className="border border-border p-5 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 hover:border-neutral-350 dark:hover:border-neutral-750 hover:bg-neutral-100/30 dark:hover:bg-neutral-900/50 hover:scale-[1.002] transition-all duration-150 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm group"
              onClick={() => setExpandedIssue(issue)}
            >
              <div className="flex items-start gap-3 flex-1 text-left min-w-0">
                {issue.status === "open" ? (
                  <span title="Status: Open">
                    <AlertCircle className="w-4.5 h-4.5 text-rose-500 mt-0.5 shrink-0" />
                  </span>
                ) : (
                  <span title="Status: Closed">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 mt-0.5 shrink-0" />
                  </span>
                )}

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-mono text-[13px] text-muted-foreground font-bold select-none shrink-0">
                      #{issue.number}
                    </span>
                    <h3 className="text-[14px] font-bold text-foreground leading-snug tracking-tight hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors truncate max-w-full">
                      {issue.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 select-none shrink-0">
                      {issue.type === "pullrequest" && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                          PR
                        </span>
                      )}
                      {(issue.labels || []).map((label) => {
                        const styleObj = getLabelStyle(label.color);
                        return (
                          <span
                            key={label.name}
                            className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border"
                            style={styleObj}
                          >
                            {label.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[12px] text-muted-foreground select-none">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-neutral-400" /> Opened by {issue.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />{" "}
                      {new Date(issue.openedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                {issue.commentsCount > 0 && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-muted text-muted-foreground text-[12px] font-medium border border-border/40 select-none">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{issue.commentsCount}</span>
                  </div>
                )}
                
                {/* External GitHub Icon Link */}
                <a
                  href={issue.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-transparent hover:border-border rounded transition-all md:opacity-0 group-hover:opacity-100 focus:opacity-100"
                  onClick={(e) => e.stopPropagation()} // Stop modal from triggering
                  title="Open issue directly on GitHub"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Expanded Issue Modal Detail View */}
      {expandedIssue && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 select-none"
          onClick={() => setExpandedIssue(null)}
        >
          <div
            className="border border-border max-w-lg w-full bg-background rounded-lg shadow-lg p-6 space-y-5 relative select-text text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer select-none"
              onClick={() => setExpandedIssue(null)}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2 border-b border-border pb-4 pr-6 select-none">
              <div className="flex items-center gap-2 text-[13px] text-muted-foreground font-mono">
                <span className="font-bold">#{expandedIssue.number}</span>
                <span>•</span>
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
                    expandedIssue.status === "open"
                      ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                      : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                  )}
                >
                  {expandedIssue.status}
                </span>
                {expandedIssue.type === "pullrequest" && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                    Pull Request
                  </span>
                )}
              </div>
              <h2 className="text-[17px] font-bold text-foreground leading-normal tracking-tight select-text">
                {expandedIssue.title}
              </h2>
              <div className="flex items-center gap-2 text-[12px] text-neutral-500 pt-1">
                <span>Opened by {expandedIssue.author}</span>
                <span>•</span>
                <span>on {new Date(expandedIssue.openedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 select-none">
                Details
              </h3>
              <p className="text-[13.5px] text-muted-foreground leading-relaxed bg-neutral-50 dark:bg-neutral-900/30 border border-border/60 p-4 rounded-md overflow-y-auto max-h-55 whitespace-pre-wrap">
                {expandedIssue.description}
              </p>
            </div>

            {expandedIssue.labels && expandedIssue.labels.length > 0 && (
              <div className="space-y-2 select-none">
                <h3 className="text-[12px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Labels
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {expandedIssue.labels.map((label) => {
                    const styleObj = getLabelStyle(label.color);
                    return (
                      <span
                        key={label.name}
                        className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
                        style={styleObj}
                      >
                        {label.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-border/50 select-none">
              {/* direct GitHub External Link */}
              <a
                href={expandedIssue.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-[#0f0f11] dark:bg-white text-white dark:text-neutral-950 font-semibold text-[12.5px] rounded-md hover:bg-[#1a1a20] dark:hover:bg-neutral-100 transition-colors shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open on GitHub</span>
              </a>

              <button
                className="px-4 py-2 border border-border text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 font-semibold text-[12.5px] rounded-md transition-colors cursor-pointer"
                onClick={() => setExpandedIssue(null)}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
