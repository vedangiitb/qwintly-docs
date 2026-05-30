"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Minus, 
  Plus, 
  RefreshCw, 
  Expand, 
  Shrink, 
  Info 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveCanvasProps {
  title?: string;
  children: React.ReactNode;
}

export default function InteractiveCanvas({ title = "System Architecture", children }: InteractiveCanvasProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.15, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.15, 0.4));

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    if (canvasRef.current) {
      canvasRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    if (canvasRef.current) {
      canvasRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomFactor = 0.08;
    const direction = e.deltaY < 0 ? 1 : -1;
    setScale((prevScale) => Math.min(Math.max(prevScale + direction * zoomFactor, 0.3), 3.5));
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "relative select-none border border-border bg-neutral-50 dark:bg-neutral-900/40 rounded-lg overflow-hidden flex flex-col transition-all duration-200",
        isFullscreen ? "fixed inset-0 z-50 w-screen h-screen rounded-none" : "w-full h-[520px]"
      )}
    >
      {/* Top Banner Control Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 py-2.5 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-xs text-foreground tracking-tight">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={zoomOut} 
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] text-muted-foreground min-w-[36px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button 
            onClick={zoomIn} 
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Zoom In"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <div className="w-[1px] h-3.5 bg-border" />
          <button 
            onClick={resetView} 
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Recenter View"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={toggleFullscreen} 
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Shrink className="w-3.5 h-3.5" /> : <Expand className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Drag/Zoom Viewport Area */}
      <div 
        ref={canvasRef}
        className={cn(
          "w-full h-full overflow-hidden outline-none bg-grid-zinc-100 dark:bg-grid-zinc-900/10 cursor-grab active:cursor-grabbing flex items-center justify-center pt-10",
          isDragging && "cursor-grabbing"
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
      >
        <div 
          className="transition-transform duration-75 select-none"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          {children}
        </div>

        {/* Dynamic Watermark / Guide */}
        <div className="absolute bottom-4 left-4 pointer-events-none select-none">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-background/80 backdrop-blur border border-border text-[10px] text-muted-foreground">
            <Info className="w-3 h-3 text-neutral-400" />
            <span>Left Click + Drag to Pan • Scroll to Zoom</span>
          </div>
        </div>
      </div>
    </div>
  );
}
