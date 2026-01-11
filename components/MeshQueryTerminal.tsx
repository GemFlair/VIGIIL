
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, Zap, ShieldAlert, Cpu, Activity, RotateCcw, Loader2, Info } from 'lucide-react';
import { querySentinelMeshStream } from '../services/meshIntelService';
import { UsageData } from '../services/geminiService';

interface Message {
  role: 'USER' | 'MESH';
  text: string;
  status?: string;
}

interface MeshQueryTerminalProps {
  onUsageUpdate?: (usage: UsageData) => void;
  onScanningChange?: (isScanning: boolean) => void;
}

export const MeshQueryTerminal: React.FC<MeshQueryTerminalProps> = ({ onUsageUpdate, onScanningChange }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Message[]>([
    { role: 'MESH', text: "VIGIL_SENTINEL_MESH ONLINE. AWAITING OPERATOR QUERY. INPUT TECHNICAL TERM OR SYSTEM INQUIRY." }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fullTextRef = useRef("");
  const typingTimerRef = useRef<number | null>(null);
  const isStreamingRef = useRef(false);

  // Helper to format system responses (handling bold markers)
  const formatMessage = (text: string) => {
    // Split by **text** markers
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const content = part.slice(2, -2);
        return (
          <span 
            key={i} 
            className="inline-block px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-400 font-black uppercase tracking-wider text-[0.85em] mx-1 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
          >
            {content}
          </span>
        );
      }
      return part;
    });
  };

  // Auto-scroll when text changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isProcessing, isTyping]);

  // Tactical Typewriter Mechanism
  useEffect(() => {
    if (isTyping && !typingTimerRef.current) {
      typingTimerRef.current = window.setInterval(() => {
        setHistory(prev => {
          const newHistory = [...prev];
          const lastIndex = newHistory.length - 1;
          const lastMsg = newHistory[lastIndex];

          if (lastMsg && lastMsg.role === 'MESH') {
            if (lastMsg.text.length < fullTextRef.current.length) {
              const nextChar = fullTextRef.current[lastMsg.text.length];
              newHistory[lastIndex] = { ...lastMsg, text: lastMsg.text + nextChar };
              return newHistory;
            } else if (!isStreamingRef.current) {
              // Finished typing and streaming
              clearInterval(typingTimerRef.current!);
              typingTimerRef.current = null;
              setIsTyping(false);
              return prev;
            }
          }
          return prev;
        });
      }, 20); // tactical typing delay
    }

    return () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userQuery = input.trim();
    const startTime = Date.now();
    
    setInput('');
    setHistory(prev => [...prev, { role: 'USER', text: userQuery }]);
    setIsProcessing(true);
    onScanningChange?.(true);

    try {
      const responseStream = await querySentinelMeshStream(userQuery);
      
      // Setup UI for incoming mesh stream
      fullTextRef.current = "";
      isStreamingRef.current = true;
      setHistory(prev => [...prev, { role: 'MESH', text: '', status: 'SUCCESS' }]);
      setIsTyping(true);

      for await (const chunk of responseStream) {
        const textChunk = chunk.text;
        if (textChunk) {
          fullTextRef.current += textChunk;
        }

        // Check for final usage metadata to trigger system telemetry
        if (chunk.usageMetadata) {
          const latency = Date.now() - startTime;
          onUsageUpdate?.({
            promptTokens: chunk.usageMetadata.promptTokenCount || 0,
            candidatesTokens: chunk.usageMetadata.candidatesTokenCount || 0,
            totalTokens: chunk.usageMetadata.totalTokenCount || 0,
            latencyMs: latency
          });
        }
      }

      isStreamingRef.current = false;

      // Final status logic on full content once stream closes
      setHistory(prev => {
        const finalHistory = [...prev];
        const lastMsg = finalHistory[finalHistory.length - 1];
        if (lastMsg.role === 'MESH') {
          let finalStatus: 'SUCCESS' | 'RESTRICTED' | 'DENIED' | 'ERROR' = 'SUCCESS';
          const txt = fullTextRef.current;
          if (txt.includes('ACCESS_RESTRICTED')) finalStatus = 'RESTRICTED';
          if (txt.includes('ACCESS_DENIED') || txt.includes('FINANCIAL ADVISOR')) finalStatus = 'DENIED';
          if (txt.includes('ERROR')) finalStatus = 'ERROR';
          finalHistory[finalHistory.length - 1] = { ...lastMsg, status: finalStatus };
        }
        return finalHistory;
      });

    } catch (error) {
      console.error("Stream Error:", error);
      fullTextRef.current = "[!] CRITICAL_LINK_FAILURE: THE MESH IS UNREACHABLE.";
      isStreamingRef.current = false;
      setIsTyping(true);
    } finally {
      setIsProcessing(false);
      onScanningChange?.(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-2 md:space-y-4 h-full flex flex-col animate-in fade-in duration-700">
      <header className="space-y-1 shrink-0 px-2">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-[9px] font-black text-cyan-500 uppercase tracking-[0.4em]">
            Node: INTEL_FORGE_V1
          </div>
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
          Mesh <br/> Intelligence.
        </h2>
      </header>

      <div className="flex-1 relative p-[1px] bg-gradient-to-b from-zinc-800 to-transparent rounded-[2.5rem] shadow-2xl overflow-hidden group min-h-0 flex flex-col">
        <div className="bg-[#050505] rounded-[2.45rem] overflow-hidden flex flex-col h-full">
          
          {/* TERMINAL HEADER */}
          <div className="h-10 bg-zinc-950 border-b border-zinc-900 flex items-center px-8 justify-between shrink-0">
             <div className="flex items-center gap-3">
                <Terminal size={12} className="text-zinc-600" />
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">SENTINEL@VIGIL:~ >> QUERY_MODE</span>
             </div>
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">MESH_SYNC_STABLE</span>
                </div>
                <button onClick={() => setHistory([{ role: 'MESH', text: "VIGIL_SENTINEL_MESH RESET. AWAITING OPERATOR QUERY." }])} className="text-zinc-700 hover:text-zinc-400 transition-colors">
                   <RotateCcw size={10} />
                </button>
             </div>
          </div>

          {/* CHAT LOG - INTERNAL SCROLLING */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 custom-scrollbar scroll-smooth">
             {history.map((msg, i) => (
               <div key={i} className={`flex ${msg.role === 'USER' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                 <div className={`max-w-[90%] space-y-2 ${msg.role === 'USER' ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-3 mb-1">
                       <span className={`text-[7px] font-black uppercase tracking-[0.3em] ${msg.role === 'USER' ? 'text-zinc-600' : 'text-cyan-500'}`}>
                         {msg.role === 'USER' ? 'OPERATOR' : 'SENTINEL_MESH'}
                       </span>
                    </div>
                    <div className={`p-5 rounded-3xl border ${
                      msg.role === 'USER' 
                        ? 'bg-zinc-900/50 border-zinc-800 text-zinc-200 rounded-tr-none' 
                        : msg.status === 'RESTRICTED' || msg.status === 'DENIED'
                          ? 'bg-red-950/20 border-red-900/50 text-red-200 rounded-tl-none'
                          : 'bg-cyan-950/10 border-cyan-900/30 text-cyan-100 rounded-tl-none'
                    } shadow-xl`}>
                       <p className="text-sm md:text-base font-mono leading-relaxed whitespace-pre-wrap">
                          {formatMessage(msg.text)}
                          {(isTyping || isProcessing) && i === history.length - 1 && msg.role === 'MESH' && (
                            <span className="inline-block w-2 h-4 ml-1 bg-cyan-500 animate-pulse align-middle" />
                          )}
                       </p>
                    </div>
                 </div>
               </div>
             ))}
             {isProcessing && history[history.length - 1]?.role === 'USER' && (
               <div className="flex justify-start animate-in fade-in duration-300">
                  <div className="flex flex-col gap-2">
                     <span className="text-[7px] font-black text-cyan-500 uppercase tracking-[0.3em]">SENTINEL_MESH</span>
                     <div className="p-5 bg-cyan-950/10 border border-cyan-900/30 rounded-3xl rounded-tl-none flex items-center gap-4">
                        <Loader2 className="w-4 h-4 text-cyan-500 animate-spin" />
                        <span className="text-xs font-mono text-cyan-700 uppercase tracking-widest animate-pulse">Processing_Intel_Fetch...</span>
                     </div>
                  </div>
               </div>
             )}
          </div>

          {/* INPUT AREA - PINNED TO BOTTOM */}
          <div className="p-4 md:p-6 bg-zinc-950/50 border-t border-zinc-900 shrink-0">
             <form onSubmit={handleSubmit} className="flex gap-4">
                <div className="flex-1 relative group">
                   <div className="absolute inset-y-0 left-6 flex items-center text-zinc-700 group-focus-within:text-cyan-500 transition-colors">
                      <Terminal size={16} />
                   </div>
                   <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="QUERY THE MESH (e.g. 'What is Layer 0.5?')"
                      className="w-full bg-black border-2 border-zinc-900 rounded-2xl py-4 px-6 pl-14 text-sm font-mono text-white placeholder:text-zinc-800 focus:outline-none focus:border-cyan-600 transition-all uppercase"
                      disabled={isProcessing || isTyping}
                   />
                </div>
                <button 
                  type="submit" 
                  disabled={!input.trim() || isProcessing || isTyping}
                  className="px-8 md:px-10 bg-white text-black rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] hover:bg-cyan-500 hover:text-white transition-all shadow-xl disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 flex items-center gap-3"
                >
                   <Send size={14} /> FETCH
                </button>
             </form>
          </div>
        </div>

        {/* HUD ELEMENT: CRT OVERLAY */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#fff_3px,#fff_4px)]" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 opacity-40 pt-1 shrink-0 px-2 pb-2">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3">
              <Info className="w-3 h-3 text-zinc-600" />
              <p className="text-[8px] font-black text-zinc-700 uppercase tracking-widest max-w-sm">
                Mesh queries are processed via Layer 0.5 heuristics.
              </p>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-right">
              <div className="text-[8px] font-black text-zinc-800 uppercase tracking-[0.4em]">SYS_INTEGRITY_INDEX</div>
              <div className="text-xs font-black text-emerald-500 italic">SECURE_LINK</div>
           </div>
           <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center">
              <Cpu size={14} className="text-zinc-700" />
           </div>
        </div>
      </div>
    </div>
  );
};
