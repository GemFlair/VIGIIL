import React, { useState, useEffect, useRef } from 'react';
import { 
  XCircle, Ghost, EyeOff, ZapOff, Database, 
  Trash2, ShieldX, Terminal, Activity, 
  Lock, Radio, Cpu, RefreshCcw, CheckCircle2,
  AlertTriangle, Crosshair, Flame, Clock, 
  Target, Zap, Microscope, Construction
} from 'lucide-react';
import { TechLabel, TechNote } from './docs/DocHelpers';

interface DiscardItem {
  id: string;
  label: string;
  description: string;
  category: string;
}

const BLOAT_ITEMS: DiscardItem[] = [
  { id: 'VAPORWARE', label: 'Narrative Vaporware', description: 'Talking for months before a single primitive is shipped to the registry.', category: 'EXECUTION_FAIL' },
  { id: 'FALSE_SAFE', label: '100% Safety Claims', description: 'Dishonest marketing claiming to stop every scam in existence.', category: 'DECEPTION' },
  { id: 'TELEMETRY', label: 'Cloud-Side Telemetry', description: 'Server-side logging of your clicks, navigation, and timing.', category: 'DATA_MINING' },
  { id: 'SHORT_TERM', label: 'Short-Term Pump Cycle', description: 'Building for the current hype cycle rather than multi-year utility.', category: 'INSTABILITY' },
  { id: 'MIDDLEMAN', label: 'RPC Interception', description: 'Acting as a middleman between your wallet and the blockchain.', category: 'CENTRALIZATION' },
  { id: 'CUSTODY', label: 'Escrow / Custody', description: 'Touching or holding private keys under the guise of safety.', category: 'COUNTER_PARTY_RISK' }
];

export const DefinitiveNonGoals: React.FC = () => {
  const [discarded, setDiscarded] = useState<Set<string>>(new Set());
  const [simState, setSimState] = useState<'IDLE' | 'ACTIVE' | 'CALIBRATED'>('IDLE');
  const [logs, setLogs] = useState<string[]>([]);
  
  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5));
  };

  const handleDiscard = (id: string) => {
    if (discarded.has(id)) return;
    const item = BLOAT_ITEMS.find(i => i.id === id);
    addLog(`NEUTRALIZING: ${item?.label}... [DELETED]`);
    
    const next = new Set(discarded);
    next.add(id);
    setDiscarded(next);

    if (next.size === BLOAT_ITEMS.length) {
      setTimeout(() => {
        setSimState('CALIBRATED');
        addLog("SYSTEM_PURITY_VERIFIED: 100%");
      }, 800);
    }
  };

  const resetSim = () => {
    setDiscarded(new Set());
    setSimState('IDLE');
    setLogs([]);
  };

  return (
    <section id="non-goals" className="px-6 md:px-20 py-24 bg-[#020202] relative overflow-hidden">
      {/* Background Redaction Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,white_21px,white_22px)]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        
        {/* HEADER: WHAT WE ARE NOT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-4">
              <TechLabel text="STRATEGIC REFUSALS" color="red" />
              <div className="h-[1px] w-12 bg-zinc-900" />
            </div>
            <h2 className="text-4xl md:text-[8rem] font-black text-white italic uppercase tracking-tighter leading-[0.8]">
              DEFINITIVE <br/> NON-GOALS.
            </h2>
          </div>
          <div className="lg:col-span-5 pb-4">
            <p className="text-zinc-500 text-xl font-medium leading-relaxed italic border-l-4 border-red-950 pl-8">
              "We are defined as much by what we refuse to be as by what we build. VIGIL is a <span className="text-white">permanent security primitive,</span> built on honesty and execution."
            </p>
          </div>
        </div>

        {/* CORE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              t: "No Short-Term Horizon", 
              d: "VIGIL is not a tool for the current season. We are architecting a multi-year standard for human-layer security. We build for the terminal state of Web3 adoption.",
              i: <Clock className="text-red-500" />,
              tag: "PERSISTENCE"
            },
            { 
              t: "No False 100% Guarantees", 
              d: "Any system claiming 100% safety is a security risk. VIGIL is a probabilistic filter. We focus on neutralizing the 94% gap of human visual error, while respecting the users final authority.",
              i: <ShieldX className="text-red-500" />,
              tag: "ENGINEERING_TRUTH"
            },
            { 
              t: "No Narrative-First Culture", 
              d: "We do not talk first and deliver later. Our roadmaps are registries of completed primitives. Execution is our only manifesto. If it is in the UI, it is already in the registry.",
              i: <Construction className="text-red-500" />,
              tag: "PRIMITIVE_FIRST"
            },
            { 
              t: "No Behavioral Surveillance", 
              d: "We do not store or mirror your activity. We reject the standard industry model of harvesting user 'context' for secondary monetization.",
              i: <EyeOff className="text-red-500" />,
              tag: "SOVEREIGNTY"
            },
            { 
              t: "No Middleman Interference", 
              d: "VIGIL sits in the DOM, not the RPC. We do not act as a gateway or middleman for your transaction execution. You remain the sole signer.",
              i: <ZapOff className="text-red-500" />,
              tag: "NON_CUSTODIAL"
            },
            { 
              t: "No Mercenary Inducement", 
              d: "XP is a measure of forensic reputation and biological vigilance. It is not an invitation to financial speculation or volume-based farming.",
              i: <Target className="text-red-500" />,
              tag: "MERIT_LEDGER"
            }
          ].map((card, i) => (
            <div key={i} className="p-8 bg-[#080808] border border-zinc-900 rounded-[2rem] space-y-6 group hover:border-red-900/50 transition-all duration-500 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:rotate-12 transition-transform">
                  {card.i}
               </div>
               <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-900 flex items-center justify-center">
                     {/* Fix: explicit prop typing to specify size for cloneElement */}
                     {React.cloneElement(card.i as React.ReactElement<{ size?: number }>, { size: 18 })}
                  </div>
                  <span className="text-[8px] font-black text-red-900 uppercase tracking-widest border border-red-900/20 px-2 py-0.5 rounded">{card.tag}</span>
               </div>
               <div className="space-y-3">
                  <h4 className="text-[14px] font-black text-white uppercase tracking-widest leading-none italic">{card.t}</h4>
                  <p className="text-[11px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed italic">{card.d}</p>
               </div>
            </div>
          ))}
        </div>

        {/* SIMULATION: THE DISCARD PHASE */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.5em]">Interactive System Calibration</span>
            <h3 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">The Discard Phase.</h3>
          </div>

          <div className={`p-[1px] bg-gradient-to-br from-zinc-800 via-zinc-900 to-transparent rounded-[3.5rem] shadow-2xl overflow-hidden transition-all duration-700 ${simState === 'CALIBRATED' ? 'from-emerald-600/40 shadow-emerald-500/10' : ''}`}>
            <div className="bg-[#050505] rounded-[3.45rem] p-8 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[size:40px_40px] bg-[linear-gradient(90deg,white_1px,transparent_1px),linear-gradient(white_1px,transparent_1px)]" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch min-h-[500px]">
                
                {/* LEFT: TERMINAL */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <div className="p-8 bg-black border border-zinc-900 rounded-[2.5rem] flex-1 flex flex-col justify-between shadow-inner">
                    <div className="space-y-6">
                       <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                          <div className="flex items-center gap-3">
                             <Terminal className="text-zinc-600" size={14} />
                             <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Purity_Terminal</span>
                          </div>
                          <div className={`w-2 h-2 rounded-full animate-pulse ${simState === 'CALIBRATED' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                       </div>
                       
                       <div className="space-y-3 font-mono text-[10px] text-zinc-600 h-40 overflow-hidden">
                          {logs.map((log, i) => (
                            <div key={i} className="animate-in slide-in-from-left-2 duration-300">
                               <span className="text-zinc-800">{`>>`}</span> {log}
                            </div>
                          ))}
                          {logs.length === 0 && <p className="animate-pulse">Awaiting Neutralization sequence...</p>}
                       </div>
                    </div>

                    <div className="pt-6 border-t border-zinc-900 space-y-4">
                       <div className="flex justify-between items-center px-1">
                          <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Calibration Progress</span>
                          <span className="text-[10px] font-black text-white italic">{Math.round((discarded.size / BLOAT_ITEMS.length) * 100)}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                          <div className={`h-full transition-all duration-700 ${simState === 'CALIBRATED' ? 'bg-emerald-500' : 'bg-red-600'}`} style={{ width: `${(discarded.size / BLOAT_ITEMS.length) * 100}%` }} />
                       </div>
                    </div>
                  </div>
                  
                  {simState === 'CALIBRATED' && (
                    <button onClick={resetSim} className="w-full py-4 border border-zinc-900 text-zinc-600 text-[9px] font-black uppercase tracking-[0.4em] rounded-xl hover:text-white hover:bg-zinc-900 transition-all flex items-center justify-center gap-3 active:scale-95 animate-in slide-in-from-bottom-2">
                       <RefreshCcw size={12} /> RE-CALIBRATE ENVIRONMENT
                    </button>
                  )}
                </div>

                {/* RIGHT: INTERACTIVE ZONE */}
                <div className="lg:col-span-8 relative">
                   {simState === 'CALIBRATED' ? (
                     <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-1000">
                        <div className="relative">
                           <div className="w-32 h-32 rounded-[3rem] border-2 border-emerald-500/40 flex items-center justify-center bg-emerald-500/10 shadow-[0_0_80px_rgba(16,185,129,0.1)]">
                              <CheckCircle2 size={64} className="text-emerald-500" strokeWidth={1} />
                           </div>
                           <div className="absolute inset-0 border border-emerald-500/20 rounded-[3rem] animate-ping opacity-20" />
                        </div>
                        <div className="space-y-3">
                           <h4 className="text-4xl font-black text-white italic uppercase tracking-tighter">System Purified.</h4>
                           <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-[0.4em] leading-relaxed max-w-sm mx-auto">
                              "Falsehoods neutralized. You are now aligned with the <span className="text-emerald-500">True VIGIL Standard.</span> Multi-year horizon. Realistic security. Execution-first."
                           </p>
                        </div>
                     </div>
                   ) : (
                     <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-700">
                        {BLOAT_ITEMS.map((item) => (
                          <button 
                            key={item.id}
                            onClick={() => handleDiscard(item.id)}
                            className={`p-6 text-left rounded-[2rem] border transition-all duration-500 group relative overflow-hidden flex flex-col justify-between ${discarded.has(item.id) ? 'bg-black border-red-900/10 grayscale opacity-20 scale-95 pointer-events-none' : 'bg-zinc-900/20 border-zinc-800 hover:border-red-600/40 hover:bg-red-600/[0.02]'}`}
                          >
                             <div className="space-y-4 relative z-10">
                                <div className="flex items-center justify-between">
                                   <TechLabel text={item.category} color="zinc" />
                                   <div className={`p-2 rounded-lg bg-zinc-950 border border-zinc-800 group-hover:border-red-600/40 transition-colors ${discarded.has(item.id) ? '' : 'group-hover:text-red-600'}`}>
                                      <Trash2 size={12} />
                                   </div>
                                </div>
                                <div className="space-y-1">
                                   <h5 className="text-[14px] font-black text-white uppercase tracking-tight italic">{item.label}</h5>
                                   <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
                                      {item.description}
                                   </p>
                                </div>
                             </div>
                             
                             <div className="pt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Flame size={12} className="text-red-600" />
                                <span className="text-[8px] font-black text-red-600 uppercase tracking-widest">NEUTRALIZE COMPONENT</span>
                             </div>

                             {/* Red Glitch Sweep on Hover */}
                             <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-red-600/5 to-transparent skew-x-[-20deg] group-hover:animate-shimmer pointer-events-none" />
                          </button>
                        ))}
                     </div>
                   )}
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @keyframes shimmer {
          from { left: -100%; }
          to { left: 150%; }
        }
      `}</style>
    </section>
  );
};
