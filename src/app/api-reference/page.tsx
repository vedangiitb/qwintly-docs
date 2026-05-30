"use client";

import React, { useState } from "react";
import { apiEndpointsConfig } from "@/config/apiEndpoints";
import { 
  Lock, 
  Layers, 
  Play, 
  RefreshCw, 
  Copy, 
  Check, 
  Globe, 
  ShieldAlert,
  Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ApiReference() {
  const [activeId, setActiveId] = useState<string>("account-daily-messages");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // Interactive "Try it out" simulator states
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatorResponse, setSimulatorResponse] = useState<string | null>(null);
  const [simDuration, setSimDuration] = useState<number | null>(null);
  const [formInputs, setFormInputs] = useState<Record<string, string>>({});

  const activeEndpoint = apiEndpointsConfig.find((e) => e.id === activeId) || apiEndpointsConfig[0];
  const groups = Array.from(new Set(apiEndpointsConfig.map((e) => e.group)));

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleInputChange = (paramName: string, val: string) => {
    setFormInputs((prev) => ({
      ...prev,
      [paramName]: val,
    }));
  };

  const handleExecuteSim = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulating(true);
    setSimulatorResponse(null);
    setSimDuration(null);

    const timing = Math.floor(Math.random() * 120) + 70; // random millisecond delay

    setTimeout(() => {
      setIsSimulating(false);
      setSimDuration(timing);
      
      if (activeEndpoint.id === "byok-create-key") {
        setSimulatorResponse(`{
  "success": true,
  "data": {
    "keyId": "key_uuid_${Math.random().toString(36).substr(2, 9)}",
    "provider": "${formInputs["provider"] || "openai"}",
    "createdAt": "${new Date().toISOString()}"
  },
  "error": null
}`);
      } else if (activeEndpoint.id === "chat-create-chat") {
        setSimulatorResponse(`{
  "success": true,
  "data": {
    "id": "chat_uuid_${Math.random().toString(36).substr(2, 9)}"
  },
  "error": null
}`);
      } else if (activeEndpoint.id === "pref-update-model") {
        setSimulatorResponse(`{
  "success": true,
  "data": {
    "preferredModel": "${formInputs["model"] || "gpt-4o"}"
  },
  "error": null
}`);
      } else {
        setSimulatorResponse(activeEndpoint.responseBody);
      }
    }, timing + 600); // add loader duration
  };

  const resetSimulator = () => {
    setSimulatorResponse(null);
    setSimDuration(null);
    setFormInputs({});
  };

  // Helper method styling badges
  const getMethodStyles = (method: string) => {
    switch (method) {
      case "GET": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
      case "POST": return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20";
      case "PUT": return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
      case "DELETE": return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20";
      default: return "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border border-neutral-500/20";
    }
  };

  return (
    <div className="content-wrapper space-y-8">
      <header className="border-b border-border pb-6 select-none">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Qwintly API Reference
        </h1>
        <p className="text-[14px] text-muted-foreground leading-relaxed mt-1">
          Comprehensive documentation for all active endpoints inside Qwintly backend routes.
        </p>
      </header>

      {/* Overview introduction panel */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 select-none">
        {/* Authentication Protocol Box */}
        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-500" /> Authentication & Security
            </h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              All protected endpoints require authentication using a valid <strong className="text-foreground font-semibold">Supabase JWT</strong>.
            </p>
            
            <div className="space-y-3 pt-2 text-[12.5px] text-muted-foreground leading-relaxed">
              <div className="space-y-1">
                <strong className="text-foreground font-medium">Header Format:</strong>
                <code className="block font-mono text-[11.5px] bg-neutral-200/50 dark:bg-neutral-800 text-foreground p-2 rounded border border-border/30">
                  Authorization: Bearer &lt;Supabase_JWT_Token&gt;
                </code>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold select-none">•</span>
                <span>Handled by <code className="text-foreground select-all">@/lib/verifyToken</code> which validates signatures and retrieves users.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold select-none">•</span>
                <span>Returns an <code className="text-rose-500 font-medium">HTTP 401 Unauthorized</code> error if token is expired, missing, or invalid.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Response wrappers & Headers */}
        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-500" /> Unified Response Formats
            </h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Most endpoints are wrapped using standard helper wrappers defined in <code className="text-foreground">@/lib/apiHandler.ts</code>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] font-mono select-none">
            <div className="border border-border/50 bg-background p-3 rounded-lg flex flex-col justify-between">
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider block mb-2 select-none">Success (200)</span>
              <pre className="text-neutral-500">
{`{
  "success": true,
  "data": { ... },
  "error": null
}`}
              </pre>
            </div>

            <div className="border border-border/50 bg-background p-3 rounded-lg flex flex-col justify-between">
              <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider block mb-2 select-none">Error (4xx/5xx)</span>
              <pre className="text-neutral-500">
{`{
  "success": false,
  "data": null,
  "error": "Error msg..."
}`}
              </pre>
            </div>
          </div>

          <div className="border-t border-border/50 pt-3 text-[11.5px] text-muted-foreground leading-relaxed select-none">
            <span className="font-semibold text-foreground block mb-1">⚡ Server-Sent Events (SSE) Stream Headers</span>
            <div className="grid grid-cols-2 gap-1 font-mono text-[10px] text-neutral-500">
              <span>• Content-Type: text/event-stream</span>
              <span>• Connection: keep-alive</span>
              <span>• Cache-Control: no-cache, no-transform</span>
              <span>• X-Accel-Buffering: no</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive API Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 pt-4">
        {/* Left Column Endpoint Index */}
        <aside className="lg:col-span-3 space-y-4 select-none">
          {groups.map((group) => (
            <div key={group} className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 px-3">
                {group}
              </div>
              <div className="space-y-0.5">
                {apiEndpointsConfig
                  .filter((e) => e.group === group)
                  .map((endpoint) => (
                    <button
                      key={endpoint.id}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3 py-2 text-[13px] rounded-md transition-colors text-left cursor-pointer",
                        activeId === endpoint.id 
                          ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold" 
                          : "text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900"
                      )}
                      onClick={() => {
                        setActiveId(endpoint.id);
                        resetSimulator();
                      }}
                    >
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[8px] font-extrabold w-12 text-center",
                        getMethodStyles(endpoint.method)
                      )}>
                        {endpoint.method}
                      </span>
                      <span className="font-mono text-[12px] truncate">{endpoint.path}</span>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </aside>

        {/* Right Column Details & Try-It-Out Simulator */}
        <main className="lg:col-span-7 space-y-6">
          <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 space-y-6">
            {/* Header info */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className={cn(
                  "px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider select-none",
                  getMethodStyles(activeEndpoint.method)
                )}>
                  {activeEndpoint.method}
                </span>
                <span className="font-mono font-bold text-foreground text-[14px] select-all tracking-tight">{activeEndpoint.path}</span>
                {activeEndpoint.isStreaming && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 select-none">
                    SSE Stream
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold tracking-tight text-foreground select-none">{activeEndpoint.title}</h2>
              <p className="text-[13.5px] text-muted-foreground leading-relaxed">{activeEndpoint.description}</p>
            </div>

            {/* Parameters listing */}
            <div className="space-y-3 border-t border-border/50 pt-5">
              <h3 className="text-[14px] font-bold text-foreground select-none">Parameters & Headers</h3>
              {activeEndpoint.parameters.length === 0 ? (
                <div className="text-[13px] text-muted-foreground italic py-2 select-none">No parameters required for this endpoint.</div>
              ) : (
                <div className="overflow-x-auto border border-border rounded-lg bg-background">
                  <table className="w-full border-collapse text-[13px]">
                    <thead>
                      <tr className="border-b border-border bg-neutral-50/50 dark:bg-neutral-900/50 text-left select-none">
                        <th className="px-4 py-2.5 font-semibold text-foreground text-[11px] uppercase tracking-wider">Parameter</th>
                        <th className="px-4 py-2.5 font-semibold text-foreground text-[11px] uppercase tracking-wider">Type</th>
                        <th className="px-4 py-2.5 font-semibold text-foreground text-[11px] uppercase tracking-wider">Location</th>
                        <th className="px-4 py-2.5 font-semibold text-foreground text-[11px] uppercase tracking-wider">Required</th>
                        <th className="px-4 py-2.5 font-semibold text-foreground text-[11px] uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {activeEndpoint.parameters.map((param) => (
                        <tr key={param.name}>
                          <td className="px-4 py-3 select-all">
                            <code className="font-mono font-semibold text-foreground text-[12px]">{param.name}</code>
                            {param.defaultVal && (
                              <div className="text-[10px] text-muted-foreground mt-0.5 select-none">Default: {param.defaultVal}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 font-mono text-[11px] text-neutral-500 select-none">{param.type}</td>
                          <td className="px-4 py-3 font-mono text-[11px] text-neutral-500 select-none">{param.location}</td>
                          <td className="px-4 py-3 select-none">
                            {param.required ? (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">required</span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-muted-foreground">optional</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground leading-relaxed text-[12.5px]">{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Request & Response sheets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeEndpoint.requestBody && (
                <div className="border border-neutral-850 rounded-lg overflow-hidden flex flex-col bg-[#0c0d10] text-[#f4f4f5]">
                  <div className="px-3.5 py-2.5 bg-neutral-900 border-b border-neutral-850 flex items-center justify-between select-none">
                    <span className="font-mono text-[10px] text-neutral-500 font-semibold">Request Body JSON</span>
                    <button 
                      className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors cursor-pointer" 
                      onClick={() => handleCopy(activeEndpoint.requestBody || "", "req")}
                    >
                      {copiedText === "req" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <pre className="p-4 font-mono text-[11.5px] overflow-x-auto text-[#a1a1aa] whitespace-pre min-h-[90px]">
                    <code>{activeEndpoint.requestBody}</code>
                  </pre>
                </div>
              )}

              <div 
                className={cn(
                  "border border-neutral-850 rounded-lg overflow-hidden flex flex-col bg-[#0c0d10] text-[#f4f4f5]",
                  activeEndpoint.requestBody ? "md:col-span-1" : "md:col-span-2"
                )}
              >
                <div className="px-3.5 py-2.5 bg-neutral-900 border-b border-neutral-850 flex items-center justify-between select-none">
                  <span className="font-mono text-[10px] text-neutral-500 font-semibold">
                    {activeEndpoint.isStreaming ? "Event Stream Payloads (SSE)" : "Response Schema (200 OK)"}
                  </span>
                  <button 
                    className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors cursor-pointer" 
                    onClick={() => handleCopy(activeEndpoint.responseBody, "res")}
                  >
                    {copiedText === "res" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <pre 
                  className={cn(
                    "p-4 font-mono text-[11.5px] overflow-x-auto whitespace-pre min-h-[90px]",
                    activeEndpoint.isStreaming ? "text-violet-400" : "text-emerald-400/90"
                  )}
                >
                  <code>{activeEndpoint.responseBody}</code>
                </pre>
              </div>
            </div>

            {/* Try it Out Sandbox */}
            <div className="space-y-4 border-t border-border/50 pt-5">
              <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2 select-none">
                <Play className="w-4 h-4 text-emerald-500" /> Try It Out Console
              </h3>
              
              <form onSubmit={handleExecuteSim} className="space-y-4 select-none">
                {activeEndpoint.parameters.filter(p => p.location !== "header").length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeEndpoint.parameters.map((param) => {
                      if (param.location === "header") return null;
                      return (
                        <div key={param.name} className="flex flex-col gap-1.5 text-[13px]">
                          <label className="font-medium text-foreground">
                            {param.name} {param.required && <span className="text-rose-500 font-bold select-none">*</span>}
                          </label>
                          <input
                            type={param.type === "number" ? "number" : "text"}
                            placeholder={param.defaultVal || `value for ${param.name}`}
                            className="border border-border bg-background px-3 py-2 rounded-md focus:ring-1 focus:ring-emerald-500 outline-none text-[13px] text-foreground"
                            value={formInputs[param.name] || ""}
                            onChange={(e) => handleInputChange(param.name, e.target.value)}
                            required={param.required}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <button 
                    type="submit" 
                    className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0f0f11] dark:bg-white text-white dark:text-neutral-950 font-semibold text-[13px] rounded-md hover:bg-[#1a1a20] dark:hover:bg-neutral-100 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                    disabled={isSimulating}
                  >
                    {isSimulating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Execute Call</span>
                      </>
                    )}
                  </button>
                  {(simulatorResponse || isSimulating) && (
                    <button 
                      type="button" 
                      className="px-4 py-2 border border-border text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 font-semibold text-[13px] rounded-md transition-colors cursor-pointer"
                      onClick={resetSimulator}
                    >
                      Reset Console
                    </button>
                  )}
                </div>
              </form>

              {/* Execution console output */}
              {(isSimulating || simulatorResponse) && (
                <div className="border border-neutral-850 rounded-lg overflow-hidden flex flex-col bg-[#0c0d10] text-[#f4f4f5] animate-in slide-in-from-bottom-2 duration-200">
                  <div className="px-3.5 py-2.5 bg-neutral-900 border-b border-neutral-850 flex items-center justify-between select-none">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-neutral-800" />
                      <span className="w-2 h-2 rounded-full bg-neutral-800" />
                      <span className="w-2 h-2 rounded-full bg-neutral-800" />
                    </div>
                    <span className="font-mono text-[10px] text-neutral-500 font-semibold">System Network Sandbox Console</span>
                    {simDuration && (
                      <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                        200 OK • {simDuration}ms
                      </span>
                    )}
                  </div>
                  
                  <div className="p-4 font-mono text-[11.5px] min-h-[100px] flex flex-col justify-center">
                    {isSimulating ? (
                      <div className="flex items-center gap-2 text-neutral-500 font-bold tracking-tight">
                        <span className="w-1.5 h-3.5 bg-neutral-500 animate-pulse" />
                        <span>{activeEndpoint.method} {activeEndpoint.path} ... processing network streams ...</span>
                      </div>
                    ) : (
                      <pre 
                        className={cn(
                          "overflow-x-auto whitespace-pre",
                          activeEndpoint.isStreaming ? "text-violet-400" : "text-emerald-450"
                        )}
                      >
                        <code>{simulatorResponse}</code>
                      </pre>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
