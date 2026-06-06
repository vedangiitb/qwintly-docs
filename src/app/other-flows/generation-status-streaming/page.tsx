"use client";

import React from "react";
import { 
  Workflow, 
  Database, 
  Clock, 
  Code, 
  ArrowRight,
  Radio,
  Server,
  Cpu,
  AlertCircle
} from "lucide-react";
import InteractiveCanvas from "@/components/InteractiveCanvas";

export default function GenerationStatusStreaming() {
  return (
    <div className="content-wrapper space-y-8">
      {/* Breadcrumbs and Header */}
      <header className="space-y-4 border-b border-border pb-6 select-none">
        <div className="flex items-center gap-2 text-[12px] font-medium text-neutral-500 dark:text-neutral-400">
          <span>Other flows & details</span>
          <span>/</span>
          <span className="text-foreground font-semibold">Generation Status Streaming</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
          <Radio className="w-8 h-8 text-emerald-500 flex-shrink-0 animate-pulse" />
          Generation Status Streaming
        </h1>
        <p className="text-[14px] text-muted-foreground leading-relaxed mt-1">
          Examine the real-time status streaming pipeline powered by Redis Streams, Next.js Server-Sent Events (SSE), and a custom client-side binary chunk parser ensuring reliable, low-overhead event delivery.
        </p>
      </header>

      {/* Highlights checklist cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col gap-3">
          <div className="w-8 h-8 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Database className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-bold text-foreground">Pure Redis Strategy</h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            Eliminates database read locks. Uses fast <code>xrange</code> queries against memory to bootstrap session logs instantly with zero SQL overhead.
          </p>
        </div>

        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col gap-3">
          <div className="w-8 h-8 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
            <Server className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-bold text-foreground">Node.js SSE Runtime</h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            Maintains long-lived streaming connections with headers like <code>X-Accel-Buffering: no</code> to prevent reverse-proxies from buffering chunks.
          </p>
        </div>

        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col gap-3">
          <div className="w-8 h-8 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-bold text-foreground">Keep-Alives & Priming</h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            Flushes client buffers immediately by writing a 1KB spacer comment upon connection, and sends periodic 15-second heartbeat packets.
          </p>
        </div>

        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col gap-3">
          <div className="w-8 h-8 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Code className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-bold text-foreground">Frag-Safe Decoding</h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            Maintains stream chunks via raw fetch readers. Resolves character splitting issues by using streaming decoders and double-newline frame splitters.
          </p>
        </div>
      </div>

      {/* Interactive Overall System Canvas Map */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 select-none">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <h2 className="text-[15px] font-bold text-foreground">Status Streaming Orchestration Blueprint</h2>
        </div>

        <InteractiveCanvas title="qwintly - Status Streaming Architecture & Lifecycle">
          <img 
            src="/statusFlow.png" 
            alt="qwintly - Status Streaming Architecture Flow" 
            className="max-w-none pointer-events-none select-none rounded-md" 
            style={{ width: "950px", height: "auto" }}
          />
        </InteractiveCanvas>
      </section>

      {/* Description of overall flow stages */}
      <section className="space-y-6 pt-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2 select-none">
          <Workflow className="w-5 h-5 text-emerald-500" /> Status Streaming Architecture & Lifecycle
        </h2>
        
        <div className="relative border-l border-border/85 ml-3 pl-6 space-y-8 select-none">
          {/* Stage 1 */}
          <div className="relative">
            <div className="absolute -left-[35px] w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              01
            </div>
            <div className="space-y-1.5">
              <h3 className="text-[14px] font-bold text-foreground">Server-Side Next.js SSE Route Handler</h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                The streaming endpoint (located at <code className="text-foreground">route.ts</code>) processes incoming HTTP requests and initiates the Server-Sent Events (SSE) connection:
              </p>
              <ul className="text-[12px] text-muted-foreground space-y-1.5 pl-3 list-disc pt-0.5">
                <li><strong className="text-foreground">Runtime:</strong> Explicitly runs on Node.js (<code className="text-foreground font-mono">export const runtime = "nodejs"</code>) to support persistent, long-lived streaming sockets.</li>
                <li><strong className="text-foreground">CDNs & Proxy Optimization:</strong> Downstream delays are eliminated by returning headers that instruct middle layers to avoid cache transform and buffering:</li>
              </ul>
              
              <div className="p-4 border border-border bg-neutral-100/50 dark:bg-neutral-900/40 rounded-md font-mono text-[11.5px] text-muted-foreground space-y-1 select-all">
                <div>Content-Type: text/event-stream</div>
                <div>Cache-Control: no-cache, no-transform</div>
                <div>Connection: keep-alive</div>
                <div>X-Accel-Buffering: no</div>
              </div>
              
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                The <code className="text-foreground font-mono">no-transform</code> header prevents intermediate compression by CDNs (such as Cloudflare) that would delay chunk delivery. The <code className="text-foreground font-mono">X-Accel-Buffering: no</code> header instructs reverse proxies like Nginx to disable response buffering so events reach the client instantly.
              </p>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="relative">
            <div className="absolute -left-[35px] w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              02
            </div>
            <div className="space-y-2">
              <h3 className="text-[14px] font-bold text-foreground">Readable Stream Controller & Redis Bootstrapping</h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                The server-side streaming controller logic (located at <code className="text-foreground">generationStatus.service.ts</code>) handles connection lifecycle management, keep-alives, and Redis interactions:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="border border-border/80 p-4 rounded-md bg-neutral-100/30 dark:bg-neutral-900/20 space-y-1">
                  <h4 className="text-[13px] font-bold text-foreground">Connection Priming & Keep-Alives</h4>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">
                    Upon initial connection, the stream immediately pushes a 1KB comment (<code className="text-foreground">:</code> followed by 1024 spaces and <code className="text-foreground">\r\n\r\n</code>). This forces buffering proxies to flush their buffers. This helps in preventing premature drop of connection in case of no instant activity. A 15-second background timer pushes keep-alive comments (<code className="text-foreground">: keep-alive\r\n\r\n</code>) to prevent server/network connection timeouts.
                  </p>
                </div>
                
                <div className="border border-border/80 p-4 rounded-md bg-neutral-100/30 dark:bg-neutral-900/20 space-y-1">
                  <h4 className="text-[13px] font-bold text-foreground">Active Lifecycle & Abort Management</h4>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">
                    The streaming controller listens to the request's <code className="text-foreground font-mono">AbortSignal</code>. If the client disconnects, closes the tab, or aborts the stream, the server aborts the Redis polling loop immediately to prevent thread leaks and memory overhead.
                  </p>
                </div>
              </div>
              
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                <strong>Log Retrieval & Deduplication Polling:</strong> When a client connects, the service bootstraps historical log states directly from Redis Stream by querying all records starting from the beginning (<code className="text-foreground font-mono">0-0</code>) via <code className="text-foreground">xrange</code>. The stream controller then polls for new events using <code className="text-foreground">xrange</code> starting from the last fetched ID. To avoid duplicating messages, it filters out events with a sequence number (<code className="text-foreground font-mono">seq_num</code>) lower than or equal to <code className="text-foreground font-mono">lastSeqSeen</code>. Polling stops and resources are cleaned up once a terminal event (<code className="text-foreground font-mono">generation_completed</code> or <code className="text-foreground font-mono">generation_failed</code>) is encountered.
              </p>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="relative">
            <div className="absolute -left-[35px] w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              03
            </div>
            <div className="space-y-1.5">
              <h3 className="text-[14px] font-bold text-foreground">Server-Sent Events (SSE) Protocol Format</h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                SSE packets are structured as UTF-8 encoded text streams delimited by a double newline (<code className="text-foreground">\r\n\r\n</code>). The server creates this format using a <code className="text-foreground">TextEncoder</code>:
              </p>

              <div className="p-4 border border-border bg-neutral-100/50 dark:bg-neutral-900/40 rounded-md font-mono text-[11.5px] text-muted-foreground space-y-1 select-all">
                <div>event: &lt;eventType&gt;</div>
                <div>id: &lt;eventId&gt;</div>
                <div>data: &#123;"type": "&lt;eventType&gt;", "payload": &lt;JSONPayload&gt;&#125;</div>
              </div>

              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                The stream issues five distinct event types to represent status updates:
              </p>

              <div className="overflow-x-auto border border-border rounded-lg mt-3">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-neutral-100 dark:bg-neutral-900/50 border-b border-border text-[12px] font-bold text-foreground">
                      <th className="p-3">Event Type</th>
                      <th className="p-3">Sent When</th>
                      <th className="p-3">Payload Content</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-[12.5px] text-muted-foreground bg-white dark:bg-transparent">
                    <tr>
                      <td className="p-3 font-semibold text-foreground font-mono text-xs">connection</td>
                      <td className="p-3">Stream is first opened or updated</td>
                      <td className="p-3">Current connection status (initializing, ready), and identifiers</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-foreground font-mono text-xs">history</td>
                      <td className="p-3">Immediately after connection handshake</td>
                      <td className="p-3">Array of all past generation events retrieved from the Redis Stream</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-foreground font-mono text-xs">current</td>
                      <td className="p-3">Immediate state checkpoint</td>
                      <td className="p-3">The active generation step details from Redis Hash state</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-foreground font-mono text-xs">event</td>
                      <td className="p-3">Live progress updates are registered</td>
                      <td className="p-3">Step name, log description, sequence number, and timestamp</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-foreground font-mono text-xs">error</td>
                      <td className="p-3">System failure or exception occurs</td>
                      <td className="p-3">Error message and failure details</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Stage 4 */}
          <div className="relative">
            <div className="absolute -left-[35px] w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              04
            </div>
            <div className="space-y-3">
              <h3 className="text-[14px] font-bold text-foreground">Client-Side (Frontend) Stream Parsing</h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                Rather than using the standard browser <code className="text-foreground font-mono">EventSource</code> API (which lacks support for custom HTTP request headers, such as user authorization tokens), the client consumes streams using standard fetch readers in <code className="text-foreground">generate.client.ts</code>:
              </p>
              
              <div className="p-4 border border-border bg-neutral-100/50 dark:bg-neutral-900/40 rounded-md font-mono text-[11.5px] text-muted-foreground select-all">
                const reader = await this.httpClient.getStream(url, params.signal);
              </div>

              <div className="space-y-2">
                <h4 className="text-[13px] font-bold text-foreground">Decoding & Chunk Buffer Assembly</h4>
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  Incoming chunks arrive in unpredictable packet sizes over TCP. The client decodes these fragments using a streaming decoder and joins incomplete bytes back to a buffer:
                </p>
                <ul className="text-[12px] text-muted-foreground space-y-1.5 pl-3 list-disc">
                  <li><strong className="text-foreground">Character Splitting Protection:</strong> Using <code className="text-foreground">TextDecoder</code> with <code className="text-foreground font-mono">&#123; stream: true &#125;</code> ensures that if a multi-byte character (like an emoji) is split across packet borders, the decoder buffers the incomplete bytes and joins them with the next packet instead of outputting corrupted text.</li>
                  <li><strong className="text-foreground">Double-Newline Splitting:</strong> The buffer collects decoded characters, splitting packets only on valid double-newline boundaries:</li>
                </ul>
                
                <pre className="p-4 border border-border bg-neutral-100/50 dark:bg-neutral-900/40 rounded-md font-mono text-[11.5px] text-muted-foreground overflow-x-auto select-all">
{`buffer += decoder.decode(value, { stream: true });
const frames = buffer.split(/\\r?\\n\\r?\\n/);
buffer = frames.pop() ?? ""; // Save incomplete trailing frame back to buffer`}
                </pre>
                
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  This guarantees that only complete, fully-received SSE packets are passed to <code className="text-foreground font-mono">JSON.parse()</code>.
                </p>
              </div>

              <div className="space-y-1 pt-1">
                <h4 className="text-[13px] font-bold text-foreground">State Integration Hook</h4>
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  The state hook (located at <code className="text-foreground">useGenerate.ts</code>) connects the incoming structured events directly to the React application state:
                </p>
                <ul className="text-[12px] text-muted-foreground space-y-1.5 pl-3 list-disc">
                  <li><code className="text-foreground font-mono">history</code> events replace the logs list (<code className="text-foreground font-mono">statusLogs</code>) with all historical items on connection.</li>
                  <li><code className="text-foreground font-mono">current</code> events update the primary title, subtitle, and overall execution status.</li>
                  <li><code className="text-foreground font-mono">event</code> events are appended sequentially as new rows.</li>
                  <li>Terminal events (completed or failed status) reset the processing state by setting <code className="text-foreground font-mono">isGenerating</code> to false, completing the UI pipeline.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Encoding & Decoding Mechanics Section */}
      <section className="space-y-4 pt-4 border-t border-border">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2 select-none">
          <Code className="w-5 h-5 text-emerald-500" /> Stream Encoding & Decoding Mechanics
        </h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed">
          Detailed breakdown of the serialization boundaries and buffer reconstruction required to transfer the status stream over HTTP.
        </p>

        <div className="space-y-6 pt-2 select-none">
          {/* Subsection 1 */}
          <div className="space-y-2">
            <h4 className="text-[13.5px] font-bold text-foreground">Why is Encoding & Decoding Necessary?</h4>
            <p className="text-[12.5px] text-muted-foreground leading-relaxed">
              HTTP/TCP networks and the browser/server <code className="text-foreground">ReadableStream</code> interface communicate using raw binary buffers (represented as <code className="text-foreground">Uint8Array</code> in JavaScript). Since JavaScript engines store strings in memory as UTF-16, a serialization bridge is required:
            </p>
            <ul className="text-[12px] text-muted-foreground space-y-1.5 pl-3 list-disc">
              <li><strong className="text-foreground">TextEncoder:</strong> Serializes UTF-16 character variables into raw UTF-8 binary bytes on the server.</li>
              <li><strong className="text-foreground">TextDecoder:</strong> Deserializes raw incoming binary packets back into strings on the client.</li>
            </ul>
          </div>

          {/* Subsection 2 */}
          <div className="space-y-2">
            <h4 className="text-[13.5px] font-bold text-foreground">1. Server-Side Encoding (TextEncoder)</h4>
            <p className="text-[12.5px] text-muted-foreground leading-relaxed">
              Located in <code className="text-foreground font-mono">generationStatus.service.ts</code>, the stream controller encodes SSE text chunks before enqueuing them:
            </p>
            <pre className="p-4 border border-border bg-neutral-100/50 dark:bg-neutral-900/40 rounded-md font-mono text-[11.5px] text-muted-foreground overflow-x-auto select-all">
{`const encoder = new TextEncoder(); // Defaults to UTF-8

// Formatted string to send
const sseString = "event: connection\\r\\ndata: {\\"status\\":\\"ready\\"}\\r\\n\\r\\n";

// Encodes to Uint8Array [101, 118, 101, 110, 116, 58, 32, ...]
const byteChunk = encoder.encode(sseString); 

// Enqueued into the browser stream controller
controller.enqueue(byteChunk);`}
            </pre>
          </div>

          {/* Subsection 3 */}
          <div className="space-y-2">
            <h4 className="text-[13.5px] font-bold text-foreground">2. Client-Side Decoding (TextDecoder)</h4>
            <p className="text-[12.5px] text-muted-foreground leading-relaxed">
              Located in <code className="text-foreground font-mono">generate.client.ts</code>, the client processes stream reads dynamically:
            </p>
            <pre className="p-4 border border-border bg-neutral-100/50 dark:bg-neutral-900/40 rounded-md font-mono text-[11.5px] text-muted-foreground overflow-x-auto select-all">
{`const decoder = new TextDecoder();
let buffer = "";

// ... inside the read loop:
const { value, done } = await reader.read(); // value is a Uint8Array
if (done) break;

buffer += decoder.decode(value, { stream: true });`}
            </pre>
            
            <div className="p-4 border border-amber-500/25 bg-amber-500/5 rounded-lg text-[12.5px] text-muted-foreground leading-relaxed">
              <span className="font-bold text-foreground block mb-1">⚠️ The stream: true Option (Critical Detail)</span>
              When reading from a network stream, there is no guarantee that a chunk boundary aligns perfectly with character boundaries. Since UTF-8 is a variable-width encoding (characters can range from 1 to 4 bytes), a multi-byte character could be split across packets:
              <ul className="text-[12px] text-muted-foreground space-y-1 pl-3 list-disc mt-1.5">
                <li>Chunk 1 contains the first 2 bytes.</li>
                <li>Chunk 2 contains the remaining 2 bytes.</li>
              </ul>
              If you call <code className="text-foreground font-mono">decoder.decode(value)</code> without <code className="text-foreground font-mono">&#123; stream: true &#125;</code>, the decoder treats Chunk 1 as an invalid, incomplete UTF-8 sequence and outputs a replacement character (<code></code>), corrupting the string payload. With the <code className="text-foreground font-mono">&#123; stream: true &#125;</code> configuration, the <code className="text-foreground">TextDecoder</code> maintains an internal buffer, holding back trailing partial bytes until the remainder arrives in the subsequent chunk.
            </div>
          </div>

          {/* Subsection 4 */}
          <div className="space-y-2">
            <h4 className="text-[13.5px] font-bold text-foreground">3. Reconstructing Logical SSE Packets</h4>
            <p className="text-[12.5px] text-muted-foreground leading-relaxed">
              Once bytes are decoded into a string, they are appended to the persistent string variable <code className="text-foreground font-mono">buffer</code>. The client then splits the buffer into discrete events:
            </p>
            <pre className="p-4 border border-border bg-neutral-100/50 dark:bg-neutral-900/40 rounded-md font-mono text-[11.5px] text-muted-foreground overflow-x-auto select-all">
{`// 1. Append new decoded text
buffer += decoder.decode(value, { stream: true });

// 2. Split buffer by double newline (the SSE package delimiter)
const frames = buffer.split(/\\r?\\n\\r?\\n/);

// 3. Keep the last (possibly incomplete) frame in the buffer for next chunk
buffer = frames.pop() ?? "";`}
            </pre>
            <p className="text-[12.5px] text-muted-foreground leading-relaxed">
              By running <code className="text-foreground font-mono">buffer = frames.pop()</code>, we handle fragmented packages. For example, if the server transmits <code className="text-foreground select-all">"event: step1\r\ndata: hello\r\n\r\nevent: step2\r\ndata: wo"</code>, the split produces <code className="text-foreground">frames[0]</code> (complete step 1 frame) and <code className="text-foreground">frames[1] = "event: step2\r\ndata: wo"</code> (incomplete step 2 frame). Popping the last item stores it back in the buffer. When the next chunk (containing <code className="text-foreground select-all">"rld\r\n\r\n"</code>) is processed, the buffer merges it to <code className="text-foreground select-all">"event: step2\r\ndata: world\r\n\r\n"</code> and splits it cleanly. This guarantees that only complete, fully-formed JSON payloads are ever dispatched to <code className="text-foreground font-mono">JSON.parse()</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Redis Expiration / Storage Strategy Section */}
      <section className="space-y-4 pt-4 border-t border-border">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2 select-none">
          <Database className="w-5 h-5 text-emerald-500" /> Redis & Postgres Storage Strategy
        </h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed">
          Log metadata is stored and served within a memory-backed Redis store to achieve optimal response speeds and a Postgres table for persistence:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
          <div className="border border-border p-5 rounded-lg bg-neutral-50 dark:bg-neutral-900/30">
            <h4 className="text-[13.5px] font-bold text-foreground mb-2">Fast Connection Handshakes</h4>
            <p className="text-[12.5px] text-muted-foreground leading-relaxed">
              Bypassing relational databases and disk indexes completely avoids read contention during heavy concurrent deployments. Querying history directly from memory streams guarantees instant loading.
            </p>
          </div>
          <div className="border border-border p-5 rounded-lg bg-neutral-50 dark:bg-neutral-900/30">
            <h4 className="text-[13.5px] font-bold text-foreground mb-2">Time-To-Live (TTL) Evictions</h4>
            <p className="text-[12.5px] text-muted-foreground leading-relaxed">
              To avoid memory bloat, active Redis streams are configured with an expiration window (typically 24 to 48 hours). Keys automatically expire and clear from RAM once the generation session is long completed.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Quick Links */}
      <footer className="border-t border-border pt-8 mt-4 select-none">
        <div className="border border-border p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-[600px]">
            <h3 className="text-[15px] font-semibold text-foreground">Want to trace overall generation workflows?</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Explore how requests navigate Pub/Sub topics, initiate Cloud Run workers, invoke self-healing code generators, and publish static websites.
            </p>
          </div>
          <a 
            href="/generation-flow" 
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0f0f11] dark:bg-white text-white dark:text-neutral-950 font-semibold text-[13px] rounded-md hover:bg-[#1a1a20] dark:hover:bg-neutral-100 transition-colors shadow-sm cursor-pointer"
          >
            <span>Generation & Deployment Flow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </footer>
    </div>
  );
}
