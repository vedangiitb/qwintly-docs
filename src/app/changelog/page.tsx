"use client";

import { cn } from "@/lib/utils";
import { Calendar, Filter, User } from "lucide-react";
import { useState } from "react";

interface ChangelogItem {
  text: string;
  category: "Added" | "Fixed" | "Optimized" | "Security";
}

interface Release {
  version: string;
  codename: string;
  date: string;
  author: string;
  summary: string;
  items: ChangelogItem[];
}

const changelogConfig: Release[] = [
  {
    version: "v1.0.0",
    codename: "Initial launch",
    date: "2026-05-30",
    author: "Vedang Bale",
    summary:
      "Official public v1 launch of the Qwintly website generation platform.",
    items: [
      {
        category: "Added",
        text: "Initial changes.",
      },
    ],
  },
];

export default function Changelog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Added", "Fixed", "Optimized", "Security"];

  const getBadgeStyles = (category: string) => {
    switch (category) {
      case "Added":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
      case "Fixed":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20";
      case "Optimized":
        return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20";
      case "Security":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
      default:
        return "bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20";
    }
  };

  const filteredReleases = changelogConfig
    .map((release) => {
      const matchedItems = release.items.filter((item) => {
        if (selectedCategory === "All") return true;
        return item.category === selectedCategory;
      });

      return {
        ...release,
        items: matchedItems,
      };
    })
    .filter((release) => release.items.length > 0);

  return (
    <div className="content-wrapper space-y-8">
      <header className="border-b border-border pb-6 select-none">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          System Changelog
        </h1>
        <p className="text-[14px] text-muted-foreground leading-relaxed mt-1">
          Trace platform versions, core integrations, deployments, and release
          notes history.
        </p>
      </header>

      {/* Interactive category filters */}
      <div className="flex flex-wrap items-center gap-3 border border-border p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 text-[13px] select-none w-fit">
        <span className="text-muted-foreground flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-neutral-450" /> Filter Changes:
        </span>
        <div className="flex items-center gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              className={cn(
                "px-3 py-1 rounded text-[12.5px] font-medium transition-colors cursor-pointer",
                selectedCategory === cat
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50",
              )}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Timeline Stream */}
      <div className="relative border-l border-border pl-8 space-y-12 ml-4 select-none">
        {filteredReleases.length === 0 ? (
          <div className="border border-dashed border-border/85 p-12 text-center text-muted-foreground text-[14px] italic rounded-lg">
            No changes matching the selected filter.
          </div>
        ) : (
          filteredReleases.map((release) => (
            <div key={release.version} className="relative">
              {/* Vertical timeline anchor indicator */}
              <div className="absolute -left-10.25 w-4.5 h-4.5 rounded-full border border-border bg-background flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              {/* Release Card info */}
              <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 space-y-4 hover:border-neutral-350 dark:hover:border-neutral-750 transition-colors duration-150">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-border/40 pb-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-[17px] font-bold text-foreground tracking-tight">
                      {release.version}
                    </h2>
                    <span className="font-mono text-[12px] text-muted-foreground">
                      “{release.codename}”
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {release.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> {release.author}
                    </span>
                  </div>
                </div>

                <p className="text-[13.5px] text-muted-foreground leading-relaxed font-normal">
                  {release.summary}
                </p>

                {/* Changes List */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-550 block mb-1">
                    details
                  </span>
                  <div className="space-y-2.5">
                    {release.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-[13px] text-muted-foreground leading-relaxed"
                      >
                        <span
                          className={cn(
                            "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0 mt-0.5",
                            getBadgeStyles(item.category),
                          )}
                        >
                          {item.category}
                        </span>
                        <span className="select-text">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
