"use client";

import { servicesConfig } from "@/config/services";
import { cn } from "@/lib/utils";
import {
  Activity,
  AlertCircle,
  Box,
  Brain,
  ChevronDown,
  Clock,
  Database,
  Eye,
  Home,
  Layers,
  Menu,
  Monitor,
  Radio,
  Server,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleServices = (e: React.MouseEvent) => {
    e.preventDefault();
    setServicesExpanded(!servicesExpanded);
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Toggle Trigger Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-background border border-border shadow-sm text-foreground lg:hidden hover:bg-muted transition-colors cursor-pointer"
        onClick={toggleSidebar}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Sidebar Wrapper */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 w-70 bg-neutral-50 dark:bg-[#0c0d10] border-r border-border flex flex-col transition-transform duration-250 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Sleek Brand Logo Area */}
        <div className="h-16 border-b border-border flex items-center px-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src="/qwintlylogo.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 shrink-0 transition-transform group-hover:scale-105"
              priority
            />
            <span className="font-semibold text-[16px] text-foreground tracking-tight">
              qwintly<span className="text-emerald-500 font-normal">.docs</span>
            </span>
          </Link>
        </div>

        {/* Navigation Link Lists */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {/* Overview Group */}
          <div>
            <div className="px-3 text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider uppercase mb-2">
              Overview
            </div>

            <div className="space-y-1">
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-2.5 px-3 py-1.5 text-[14px] font-medium rounded-md transition-colors cursor-pointer",
                  pathname === "/"
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900",
                )}
                onClick={() => setIsOpen(false)}
              >
                <Home className="w-4 h-4" />
                <span>Architecture Flow</span>
              </Link>

              <Link
                href="/generation-flow"
                className={cn(
                  "flex items-center gap-2.5 px-3 py-1.5 text-[14px] font-medium rounded-md transition-colors cursor-pointer",
                  isActive("/generation-flow")
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900",
                )}
                onClick={() => setIsOpen(false)}
              >
                <Activity className="w-4 h-4" />
                <span>Generation & Deployment</span>
              </Link>

              <Link
                href="/preview-flow"
                className={cn(
                  "flex items-center gap-2.5 px-3 py-1.5 text-[14px] font-medium rounded-md transition-colors cursor-pointer",
                  isActive("/preview-flow")
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900",
                )}
                onClick={() => setIsOpen(false)}
              >
                <Eye className="w-4 h-4" />
                <span>Preview Rendering Flow</span>
              </Link>

              <Link
                href="/planner-flow"
                className={cn(
                  "flex items-center gap-2.5 px-3 py-1.5 text-[14px] font-medium rounded-md transition-colors cursor-pointer",
                  isActive("/planner-flow")
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900",
                )}
                onClick={() => setIsOpen(false)}
              >
                <Brain className="w-4 h-4" />
                <span>Planner Agent Flow</span>
              </Link>

              <Link
                href="/edit-flow"
                className={cn(
                  "flex items-center gap-2.5 px-3 py-1.5 text-[14px] font-medium rounded-md transition-colors cursor-pointer",
                  isActive("/edit-flow")
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900",
                )}
                onClick={() => setIsOpen(false)}
              >
                <Monitor className="w-4 h-4" />
                <span>Editing Agent Flow</span>
              </Link>

              {/* Collapsible Services Sub-list */}
              <div>
                <button
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-1.5 text-[14px] font-medium rounded-md transition-colors cursor-pointer",
                    isActive("/services")
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900",
                  )}
                  onClick={toggleServices}
                >
                  <div className="flex items-center gap-2.5">
                    <Server className="w-4 h-4" />
                    <span>Services & Jobs</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform duration-200",
                      servicesExpanded ? "rotate-0" : "-rotate-90",
                    )}
                  />
                </button>

                {servicesExpanded && (
                  <div className="mt-1 ml-4 pl-3 border-l border-border space-y-1">
                    {servicesConfig.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1 text-[13px] rounded-md transition-colors cursor-pointer",
                          pathname === `/services/${service.slug}`
                            ? "text-foreground font-medium bg-neutral-100 dark:bg-neutral-900"
                            : "text-muted-foreground hover:text-foreground hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            service.type === "job"
                              ? "bg-amber-500"
                              : "bg-cyan-500",
                          )}
                        />
                        <span className="truncate">{service.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Resources Group */}
          <div>
            <div className="px-3 text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider uppercase mb-2">
              Resources
            </div>

            <div className="space-y-1">
              <Link
                href="/api-reference"
                className={cn(
                  "flex items-center gap-2.5 px-3 py-1.5 text-[14px] font-medium rounded-md transition-colors cursor-pointer",
                  isActive("/api-reference")
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900",
                )}
                onClick={() => setIsOpen(false)}
              >
                <Layers className="w-4 h-4" />
                <span>API Reference</span>
              </Link>

              <Link
                href="/qwintly-core"
                className={cn(
                  "flex items-center gap-2.5 px-3 py-1.5 text-[14px] font-medium rounded-md transition-colors cursor-pointer",
                  isActive("/qwintly-core")
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900",
                )}
                onClick={() => setIsOpen(false)}
              >
                <Box className="w-4 h-4" />
                <span>qwintly-core library</span>
              </Link>

              <Link
                href="/db-schema"
                className={cn(
                  "flex items-center gap-2.5 px-3 py-1.5 text-[14px] font-medium rounded-md transition-colors cursor-pointer",
                  isActive("/db-schema")
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900",
                )}
                onClick={() => setIsOpen(false)}
              >
                <Database className="w-4 h-4" />
                <span>DB Tables & Schema</span>
              </Link>

              <Link
                href="/changelog"
                className={cn(
                  "flex items-center gap-2.5 px-3 py-1.5 text-[14px] font-medium rounded-md transition-colors cursor-pointer",
                  isActive("/changelog")
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900",
                )}
                onClick={() => setIsOpen(false)}
              >
                <Clock className="w-4 h-4" />
                <span>Changelog</span>
              </Link>

              <Link
                href="/issues"
                className={cn(
                  "flex items-center gap-2.5 px-3 py-1.5 text-[14px] font-medium rounded-md transition-colors cursor-pointer",
                  isActive("/issues")
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900",
                )}
                onClick={() => setIsOpen(false)}
              >
                <AlertCircle className="w-4 h-4" />
                <span>Issues Board</span>
              </Link>
            </div>
          </div>

          {/* Other flows & details Group */}
          <div>
            <div className="px-3 text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider uppercase mb-2">
              Other flows & details
            </div>

            <div className="space-y-1">
              <Link
                href="/other-flows/generation-status-streaming"
                className={cn(
                  "flex items-center gap-2.5 px-3 py-1.5 text-[14px] font-medium rounded-md transition-colors cursor-pointer",
                  isActive("/other-flows/generation-status-streaming")
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900",
                )}
                onClick={() => setIsOpen(false)}
              >
                <Radio className="w-4 h-4" />
                <span>Generation Status Streaming</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Footer Area showing operational state */}
        <div className="p-4 border-t border-border bg-neutral-100/50 dark:bg-[#09090b]/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-mono text-muted-foreground">
              v1.0.1
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-border text-foreground">
              docs
            </span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-medium">
              All Systems Operational
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
