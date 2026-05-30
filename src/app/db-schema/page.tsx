"use client";

import React, { useState } from "react";
import { tablesConfig, bucketsConfig, enumsConfig } from "@/config/dbSchema";
import { 
  Database, 
  FolderOpen, 
  Hash, 
  Key, 
  Link2, 
  Info 
} from "lucide-react";
import { cn } from "@/lib/utils";

type TabType = "tables" | "buckets" | "enums";

export default function DbSchema() {
  const [activeTab, setActiveTab] = useState<TabType>("tables");
  const [highlightedTable, setHighlightedTable] = useState<string | null>(null);

  const handleTableHover = (tableName: string | null) => {
    setHighlightedTable(tableName);
  };

  // Determine styling class for a table based on relations highlights!
  const getTableHighlightClass = (tableName: string) => {
    if (!highlightedTable) {
      return "border-border bg-neutral-50 dark:bg-neutral-900/10 hover:border-neutral-300 dark:hover:border-neutral-700";
    }

    if (highlightedTable === tableName) {
      return "border-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/5 shadow-sm scale-[1.01]";
    }

    const currentTable = tablesConfig.find((t) => t.name === highlightedTable);
    if (!currentTable) return "border-border bg-neutral-50 dark:bg-neutral-900/10";

    if (currentTable.relationships.parents.includes(tableName)) {
      return "border-amber-500 bg-amber-500/10 dark:bg-amber-500/5 scale-[1.005]";
    }
    if (currentTable.relationships.children.includes(tableName)) {
      return "border-cyan-500 bg-cyan-500/10 dark:bg-cyan-500/5 scale-[1.005]";
    }

    return "border-border/20 bg-neutral-50/30 dark:bg-neutral-900/5 opacity-40 scale-[0.99]";
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "tables":
        return (
          <div className="animate-in fade-in duration-200 space-y-6">
            {/* Relational guide bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-border p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 text-[13px] select-none">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Info className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Hover over a table card to trace its **Parent-Child relationships** in real time.</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[12px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500 border border-emerald-600" />
                  <span className="font-semibold text-foreground">Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-amber-500 border border-amber-600" />
                  <span className="font-semibold text-foreground">Parent Table</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-cyan-500 border border-cyan-600" />
                  <span className="font-semibold text-foreground">Child Table</span>
                </div>
              </div>
            </div>

            {/* Grid of Tables */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-2">
              {tablesConfig.map((table) => (
                <div
                  key={table.name}
                  className={cn(
                    "border p-6 rounded-lg transition-all duration-200 flex flex-col justify-between",
                    getTableHighlightClass(table.name)
                  )}
                  onMouseEnter={() => handleTableHover(table.name)}
                  onMouseLeave={() => handleTableHover(null)}
                >
                  {/* Table Header details */}
                  <div className="space-y-2 mb-4 select-none">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="w-4.5 h-4.5 text-neutral-500" />
                        <h3 className="text-[16px] font-bold text-foreground tracking-tight">{table.name}</h3>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-border text-foreground border border-border/30">
                        {table.engine}
                      </span>
                    </div>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{table.description}</p>
                  </div>

                  {/* Columns definitions */}
                  <div className="border-t border-border/50 pt-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2 select-none">
                      columns ({table.columns.length})
                    </div>
                    <div className="divide-y divide-border/40 max-h-[280px] overflow-y-auto pr-1">
                      {table.columns.map((col) => (
                        <div key={col.name} className="flex flex-col md:flex-row md:items-center justify-between py-2 gap-1 text-[13px] group/col">
                          <div className="flex items-center gap-1.5">
                            {col.isPk && (
                              <span title="Primary Key (PK)">
                                <Key className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                              </span>
                            )}
                            {col.isFk && (
                              <span title={`Foreign Key referencing ${col.fkRef}`}>
                                <Link2 className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />
                              </span>
                            )}
                            <span className={cn(
                              "font-mono font-medium text-foreground tracking-tight",
                              col.isPk && "text-amber-600 dark:text-amber-400 font-semibold"
                            )}>
                              {col.name}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2 md:text-right">
                            <span className="font-mono text-[11px] text-neutral-500">{col.type}</span>
                            <span className="text-[10px] uppercase font-bold tracking-wider px-1 rounded bg-muted text-neutral-400 select-none">
                              {col.nullable ? "null" : "not null"}
                            </span>
                            <span className="text-[12px] text-muted-foreground/80 font-normal border-l border-border/60 pl-2 max-w-[200px] truncate" title={col.description}>
                              {col.description}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "buckets":
        return (
          <div className="animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bucketsConfig.map((bucket) => (
                <div key={bucket.name} className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col justify-between h-full hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-150 select-none">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <FolderOpen className="w-4.5 h-4.5 text-neutral-500" />
                        <h3 className="text-[15px] font-bold text-foreground tracking-tight">{bucket.name}</h3>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 uppercase tracking-wider shrink-0">
                        {bucket.service.split(" ")[0]}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-[12.5px] mb-4">
                      <div className="flex justify-between py-1 border-b border-border/40">
                        <span className="text-muted-foreground">Storage Type:</span>
                        <span className="font-medium text-foreground">{bucket.type}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border/40">
                        <span className="text-muted-foreground">Cloud Engine:</span>
                        <span className="font-medium text-foreground">{bucket.service}</span>
                      </div>
                      <div className="py-1">
                        <span className="text-muted-foreground block mb-1">Namespace/Project:</span>
                        <span className="font-mono text-neutral-500 dark:text-neutral-400 text-[11px] block break-all p-1 bg-muted rounded">
                          {bucket.project}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[13px] text-muted-foreground border-t border-border/50 pt-3 mt-1 leading-relaxed">
                    {bucket.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "enums":
        return (
          <div className="animate-in fade-in duration-200">
            <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 space-y-4">
              <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2 select-none">
                <Hash className="w-4.5 h-4.5 text-neutral-500" />
                PostgreSQL Custom Domain Enum Types
              </h3>
              
              <div className="overflow-x-auto border border-border rounded-lg bg-background">
                <table className="w-full border-collapse text-[13.5px]">
                  <thead>
                    <tr className="border-b border-border bg-neutral-50/50 dark:bg-neutral-900/50 text-left select-none">
                      <th className="px-5 py-3 font-semibold text-foreground text-[12px] uppercase tracking-wider w-1/3">Enum Type Name</th>
                      <th className="px-5 py-3 font-semibold text-foreground text-[12px] uppercase tracking-wider">Permitted Allowed Values List</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {enumsConfig.map((enumItem) => (
                      <tr key={enumItem.name} className="hover:bg-neutral-50/35 dark:hover:bg-neutral-900/10 transition-colors">
                        <td className="px-5 py-4 font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-tight text-[12.5px]">
                          {enumItem.name}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex flex-wrap gap-1.5">
                            {enumItem.allowedValues.map((val) => (
                              <span key={val} className="px-2 py-0.5 rounded text-[11px] font-semibold bg-neutral-200/50 dark:bg-neutral-800 text-foreground border border-border/30 select-all font-mono">
                                {val}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="content-wrapper space-y-8">
      <header className="space-y-2 select-none border-b border-border pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Database Tables & Schemas
        </h1>
        <p className="text-[14px] text-muted-foreground leading-relaxed">
          Trace platform database models, storage buckets, enums, key structures, and relational mappings.
        </p>
      </header>

      {/* Sub-Tabs selection bar */}
      <div className="border-b border-border flex items-center gap-6 select-none">
        <button 
          className={cn(
            "flex items-center gap-2 text-[14px] font-medium pb-3 transition-colors cursor-pointer relative",
            activeTab === "tables" 
              ? "text-emerald-600 dark:text-emerald-400 font-semibold" 
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setActiveTab("tables")}
        >
          <Database className="w-4 h-4" />
          <span>Relational Tables ({tablesConfig.length})</span>
          {activeTab === "tables" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />}
        </button>
        <button 
          className={cn(
            "flex items-center gap-2 text-[14px] font-medium pb-3 transition-colors cursor-pointer relative",
            activeTab === "buckets" 
              ? "text-emerald-600 dark:text-emerald-400 font-semibold" 
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setActiveTab("buckets")}
        >
          <FolderOpen className="w-4 h-4" />
          <span>Object Storage Buckets ({bucketsConfig.length})</span>
          {activeTab === "buckets" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />}
        </button>
        <button 
          className={cn(
            "flex items-center gap-2 text-[14px] font-medium pb-3 transition-colors cursor-pointer relative",
            activeTab === "enums" 
              ? "text-emerald-600 dark:text-emerald-400 font-semibold" 
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setActiveTab("enums")}
        >
          <Hash className="w-4 h-4" />
          <span>Enum Types ({enumsConfig.length})</span>
          {activeTab === "enums" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />}
        </button>
      </div>

      {/* Render selected view */}
      <div className="pt-2">
        {renderTabContent()}
      </div>
    </div>
  );
}
