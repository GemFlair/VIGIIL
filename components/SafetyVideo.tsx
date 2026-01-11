
import React from 'react';
import { ShieldCheck, Info, Binary, Search, Lock, CheckCircle2, Fingerprint, Activity, MousePointer2, Shield, Layers, Copy, Triangle, Terminal } from 'lucide-react';
import { RegistryDoc } from './OperationalRegistry';

const ValidationSnapshot = ({ onOpenDoc }: { onOpenDoc?: (doc: RegistryDoc) => void }) => (
  <div className="relative w-full p-8 md:p-12 bg-[#080808] border border-zinc-900 rounded-[1.5rem] md:rounded-[28px] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden group">
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
    
    <div className="relative z-10 space-y-10">
      <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-cyan-500 font-black uppercase tracking-[0.4em] text-[10px]">
            <Binary className="w-4 h-4" /> System Reasoning
          </div>
          <h4 className="text-2xl font-black text-white italic uppercase tracking-tight">Intent Validation Snapshot</h4>
        </div>
        <div className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono text-zinc-500 uppercase">
          LOG_ID: 8821-X
        </div>
      </div>

      <div className="space-y-6">
        {[
          { label: "Source Context Identified", val: "Explorer / dApp / Clipboard", status: "COMPLETE" },
          { label: "Address Similarity Evaluated", val: "Heuristic Check: PASS", status: "COMPLETE" },
          { label: "Token Mint Verified", val: "Authenticity: VALID", status: "COMPLETE" },
          { label: "First-Time Destination Risk", val: "Exposure: LOW", status: "COMPLETE" },
          { label: "Known Poisoning Patterns", val: "Scanning Cluster...", status: "COMPLETE" }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between group/item">
            <div className="space-y-1">
              <span className="text-[11px] font-black text-zinc-600 uppercase tracking-widest block">{item.label}</span>
              <span className="text-base font-bold text-zinc-300 font-mono tracking-tight">{item.val}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{item.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-zinc-900 flex flex-col gap-6">
        <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
             <CheckCircle2 className="w-5 h-5 text-emerald-500" />
             <span className="text-[12px] font-black text-white uppercase tracking-widest">Result: Intent matches expected destination</span>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="flex items-center justify-between gap-3 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
           <div className="flex items-start gap-3">
             <Info className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
             <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
               All analysis runs locally in the browser. <br/>
               No transaction data leaves the device.
             </p>
           </div>
           <button 
             onClick={() => onOpenDoc?.('technical_spec')}
             className="text-[9px] font-black text-cyan-500 uppercase tracking-widest hover:underline whitespace-nowrap"
           >
             [REVIEW_SPEC]
           </button>
        </div>
      </div>
    </div>
  </div>
);

const ArchitecturalFlowCard = () => (
  <div className="w-full p-6 md:p-12 lg:p-16 bg-[#030712] border border-blue-900/30 rounded-[1.5rem] md:rounded-[28px] shadow-2xl relative overflow-hidden mb-12 group">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.05),transparent_70%)] pointer-events-none" />
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
    
    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
      <div className="lg:col-span-5 space-y-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-cyan-400 font-black uppercase tracking-[0.4em] text-[10px]">
            <span className="text-zinc-600">ARCH-VECTOR</span> Architectural Flow
          </div>
          <div className="space-y-3">
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter italic uppercase leading-[0.8]">
              The Security <br/> Primitive <br/> of 0.5.
            </h2>
            <div className="w-20 h-1.5 bg-cyan-500 rounded-full mt-6" />
          </div>
        </div>

        <div className="space-y-8">
          <div className="relative pl-8 border-l-4 border-cyan-500/50">
            <p className="text-xl md:text-2xl text-zinc-300 font-medium leading-relaxed italic">
              "Securing <span className="text-white underline decoration-cyan-500/40 decoration-2 underline-offset-4">Cognitive Intent</span> before the Cryptographic Finality."
            </p>
          </div>
          <p className="text-zinc-400 text-base md:text-xl leading-relaxed font-medium">
            Layer 0.5 operates inside the browser DOM, where the gap between what you see and what you sign is most vulnerable.
          </p>
        </div>

        <div className="p-8 bg-[#081126] border border-cyan-900/40 rounded-[1.5rem] md:rounded-[28px] flex items-start gap-5 shadow-lg group-hover:border-cyan-500/30 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="space-y-2">
            <h5 className="text-[11px] font-black text-cyan-400 uppercase tracking-[0.3em]">Intent Interception</h5>
            <p className="text-sm text-zinc-400 font-medium leading-relaxed">
              Detecting context loss before irreversible execution.
            </p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 flex justify-center">
        <div className="relative w-full max-w-sm flex flex-col items-center">
          
          {/* BACKGROUND RAIL */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 z-0" />
          
          {/* FLOWING PACKET WITH TRAIL */}
          <div className="packet-traveler absolute left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <div className="relative">
              {/* Core Packet */}
              <div className="w-3 h-3 rounded-sm shadow-[0_0_15px_currentColor] animate-packet-glow relative z-10" />
              {/* Trail Elements */}
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-2 h-6 bg-gradient-to-t from-current to-transparent opacity-20 blur-sm" />
            </div>
          </div>

          {/* LAYER 0: INTENT ORIGINATION */}
          <div className="relative z-10 group/layer0 max-w-[16rem] w-full flex flex-col items-center">
             <div className="absolute -inset-2.5 border border-red-900/20 rounded-[1.5rem] md:rounded-[28px] pointer-events-none transition-all duration-500 group-hover/layer0:border-red-600/30" />
             <div className="relative w-full py-4 px-6 bg-[#0a0f1d] border border-zinc-800 rounded-2xl flex flex-col items-center gap-3 shadow-2xl transition-all duration-500 animate-receive-red">
                <div className="w-10 h-10 bg-zinc-900/50 rounded-2xl border border-zinc-800 flex items-center justify-center relative overflow-hidden">
                   <Copy className="w-4 h-4 text-zinc-600" />
                   <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover/layer0:opacity-100 transition-opacity" />
                </div>
                <div className="text-center space-y-1">
                   <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Layer 0</div>
                   <h4 className="text-xl font-black text-white italic uppercase tracking-tight">Intent Origination</h4>
                   <div className="flex items-center justify-center gap-2 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Protocol / Explorer UI</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="h-14 w-full" />

          {/* VIGIL (Layer 0.5) */}
          <div className="relative z-20 group/box_main">
            <div className="absolute -inset-3 border border-orange-500/10 rounded-[1.5rem] md:rounded-[28px] pointer-events-none group-hover/box_main:border-orange-500/40 transition-colors duration-500" />
            <div className="relative w-full max-w-[22rem] py-5 px-8 bg-[#020b18] border-2 border-orange-500 rounded-[1.5rem] md:rounded-[28px] flex flex-col items-center gap-4 shadow-[0_0_40px_rgba(249,115,22,0.1)] transition-all duration-300 hover:scale-[1.03] cursor-pointer animate-receive-orange">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_70%)] rounded-[1.5rem] md:rounded-[28px] pointer-events-none" />
               <div className="absolute top-4 left-5 w-7 h-7 border border-orange-500/30 rounded flex items-center justify-center pointer-events-none">
                 <div className="w-1.5 h-1.5 border border-orange-500/50 rounded-sm" />
               </div>
               <div className="absolute bottom-4 right-5 w-7 h-7 border border-orange-500/30 rounded flex items-center justify-center pointer-events-none rotate-45">
                 <div className="w-2 h-2 border border-orange-500/50 rounded-sm" />
               </div>
               
               <div className="relative z-10 w-16 h-10 flex items-center justify-center">
                 <Triangle className="w-8 h-8 text-orange-400 fill-orange-400/5 transition-transform duration-700 group-hover/box_main:rotate-180" />
               </div>

               <div className="relative z-10 text-center space-y-0">
                  <div className="text-[11px] font-black text-orange-500 uppercase tracking-[0.6em] mb-0.5">Layer 0.5</div>
                  <h4 className="text-4xl font-black text-white italic uppercase tracking-tighter">VIGIL</h4>
               </div>

               <div className="relative z-10 px-6 py-2.5 border border-orange-500/40 rounded-full bg-orange-950/20 hover:bg-orange-900/30 transition-colors group/pill cursor-default">
                  <span className="text-[12px] font-black text-white uppercase tracking-[0.4em] whitespace-nowrap">Intent Validation</span>
               </div>
            </div>
          </div>

          <div className="h-14 w-full" />

          {/* LAYER 1: EXECUTION SETTLEMENT */}
          <div className="relative z-10 group/layer1 max-w-[16rem] w-full flex flex-col items-center">
             <div className="absolute -inset-2.5 border border-emerald-900/20 rounded-[1.5rem] md:rounded-[28px] pointer-events-none transition-all duration-500 group-hover/layer1:border-emerald-600/30" />
             <div className="relative w-full py-4 px-6 bg-[#080808] border border-zinc-800 rounded-2xl flex flex-col items-center gap-3 transition-all duration-500 animate-receive-green">
                <div className="w-10 h-10 bg-zinc-950/50 rounded-2xl border border-zinc-800 flex items-center justify-center">
                   <Lock className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-center space-y-1">
                   <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Layer 1</div>
                   <h4 className="text-xl font-black text-white italic uppercase tracking-tight">Execution Settlement</h4>
                   <div className="flex items-center justify-center gap-2 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Wallet / Final Signature</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
    <style>{`
      @keyframes packet-journey {
        0% { top: 0%; opacity: 0; transform: translate(-50%, 0) scale(1.5); color: #ef4444; }
        5% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        
        /* Pause in Origin */
        10% { top: 10%; background-color: #ef4444; }
        20% { top: 10%; }

        /* Transit to Vigil */
        35% { background-color: #ef4444; }
        45% { top: 50%; transform: translate(-50%, -50%) scale(1.2); background-color: #f97316; color: #f97316; }
        55% { top: 50%; transform: translate(-50%, -50%) scale(1); }

        /* Transit to Settlement */
        70% { background-color: #f97316; }
        80% { top: 90%; transform: translate(-50%, -100%) scale(1.2); background-color: #10b981; color: #10b981; }
        90% { top: 90%; transform: translate(-50%, -100%) scale(1); }

        100% { top: 100%; opacity: 0; transform: translate(-50%, -100%) scale(0.5); }
      }
      
      @keyframes box-receive {
        0%, 100% { transform: scale(1); filter: brightness(1); border-color: rgba(255,255,255,0.1); }
        48% { transform: scale(1); filter: brightness(1); }
        50% { transform: scale(1.03); filter: brightness(1.4); border-color: currentColor; }
        52% { transform: scale(1); filter: brightness(1); }
      }

      .packet-traveler {
        animation: packet-journey 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }

      .animate-receive-red { animation: box-receive 5s infinite; animation-delay: 0.5s; color: #ef4444; }
      .animate-receive-orange { animation: box-receive 5s infinite; animation-delay: 2.5s; color: #f97316; }
      .animate-receive-green { animation: box-receive 5s infinite; animation-delay: 4.5s; color: #10b981; }
      
      .animate-packet-glow {
        box-shadow: 0 0 15px currentColor, 0 0 30px currentColor;
        background-color: currentColor;
      }
    `}</style>
  </div>
);

export const SafetyVideo: React.FC<{ onOpenDoc?: (doc: RegistryDoc) => void }> = ({ onOpenDoc }) => (
  <section id="deep-dive" className="bg-[#020202] pt-4 md:pt-8 pb-24 px-6 md:px-20 relative z-20 text-white scroll-mt-20">
    <div className="max-w-7xl mx-auto">
      <div className="text-center space-y-6 mb-20 max-w-4xl mx-auto">
        <span className="text-cyan-500 mono text-[11px] font-black tracking-[0.5em] uppercase">Security Standard</span>
        <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">Operational Workflow</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-24">
        <div className="lg:col-span-6 space-y-16">
          <div className="space-y-6 max-w-xl mb-12">
            <p className="text-2xl md:text-3xl text-zinc-400 font-medium leading-relaxed italic border-l-8 border-cyan-500/50 pl-8">
              "Securing the <span className="text-white">human intent</span> before it reaches cryptographic finality."
            </p>
          </div>

          {[
            { 
              id: "01", 
              title: "Human-Layer Interception", 
              desc: "VIGIL observes address interactions at the browser layer, capturing intent at the moment it is formed.", 
              icon: <Fingerprint className="w-7 h-7 text-cyan-500" /> 
            },
            { 
              id: "02", 
              title: "Cognitive Validation", 
              desc: "Visual destination context is evaluated against trusted history and similarity heuristics.", 
              icon: <Search className="w-7 h-7 text-blue-500" /> 
            },
            { 
              id: "03", 
              title: "Execution Boundary", 
              desc: "VIGIL disengages prior to wallet signing. Cryptographic execution remains under user control.", 
              icon: <Lock className="w-7 h-7 text-emerald-500" /> 
            }
          ].map((step, i) => (
            <div key={i} className="flex gap-8 group relative">
              {i < 2 && (
                <div className="absolute left-8 top-16 bottom-[-4rem] w-[2px] bg-gradient-to-b from-zinc-800 to-transparent" />
              )}
              <div className="shrink-0 w-16 h-16 rounded-2xl bg-[#080808] border border-zinc-800 flex items-center justify-center group-hover:border-cyan-500/50 transition-all shadow-lg z-10">{step.icon}</div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black tracking-tight text-white italic uppercase flex items-center gap-4">
                  <span className="text-[12px] not-italic text-zinc-600 font-bold mono">Flow {step.id}</span> {step.title}
                </h3>
                <p className="text-zinc-500 text-lg leading-relaxed font-medium">{step.desc}</p>
              </div>
            </div>
          ))}

          <div className="p-8 bg-zinc-950 border border-zinc-900 rounded-[1.5rem] md:rounded-[28px] flex items-start gap-6">
            <Activity className="w-6 h-6 text-zinc-700 mt-1.5" />
            <div className="space-y-2">
              <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Technical Constraint</h5>
              <p className="text-base text-zinc-500 font-medium leading-relaxed uppercase tracking-tight">
                VIGIL is architecturally isolated from transaction signing.
              </p>
              <button 
                 onClick={() => onOpenDoc?.('technical_spec')}
                 className="mt-3 flex items-center gap-2 text-[9px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors"
              >
                <Terminal className="w-3 h-3" /> [READ_PROTOCOL_SPEC: VIG-ARCH-0.5]
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:sticky lg:top-24">
          <ValidationSnapshot onOpenDoc={onOpenDoc} />
          
          <div className="mt-10 grid grid-cols-2 gap-6">
            <div className="p-6 bg-[#0a0a0a] border border-zinc-900 rounded-[1.5rem] md:rounded-[28px] space-y-2 text-center">
              <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Latency Impact</div>
              <div className="text-2xl font-black text-white italic">{"<"}12ms</div>
            </div>
            <div className="p-6 bg-[#0a0a0a] border border-zinc-900 rounded-[1.5rem] md:rounded-[28px] space-y-2 text-center">
              <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Processing Layer</div>
              <div className="text-2xl font-black text-cyan-500 italic">Local DOM</div>
            </div>
          </div>
        </div>
      </div>

      <ArchitecturalFlowCard />
    </div>
  </section>
);
