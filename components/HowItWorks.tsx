
import React from 'react';
import { Database, Search, ShieldCheck, History, MousePointer2, Clipboard, BookOpen } from 'lucide-react';
import { RegistryDoc } from './OperationalRegistry';

export const HowItWorks: React.FC<{ onOpenDoc?: (doc: RegistryDoc) => void }> = ({ onOpenDoc }) => (
  <section id="flow" className="flex items-center justify-center p-6 md:p-12 py-12 bg-[#020202]">
    <div className="w-full max-w-6xl bg-[#080808] border border-zinc-900 rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,0.03),transparent_50%)] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-blue-500 mono text-[10px] font-black tracking-[0.4em] uppercase">System Logic / Operational Flow</span>
            <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">Real-time <br/> Context Mapping.</h2>
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-zinc-200 text-lg leading-relaxed font-semibold italic border-l-4 border-blue-500 pl-6">
                VIGIL indexes your interaction history to differentiate between a "Safe Friend" and a "Poison Mimic."
              </p>
              <p className="text-[11px] font-black text-blue-500 uppercase tracking-[0.3em] pl-6">
                HOW DOES VIGIL KNOW?
              </p>
            </div>
            <p className="text-zinc-400 text-lg leading-relaxed">
              VIGIL builds a local <b>'Trust Graph'</b> by silently observing which addresses you successfully interact with on verified explorers and dApps.
            </p>
          </div>
          
          <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                   <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-white uppercase tracking-widest">Privacy Absolute</p>
                   <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed">Your history never leaves your browser's local IndexedDB.</p>
                </div>
             </div>
             <button 
               onClick={() => onOpenDoc?.('technical_doc')}
               className="flex items-center gap-2 text-[10px] font-black text-zinc-700 uppercase tracking-widest hover:text-blue-500 transition-colors border border-zinc-800 px-4 py-2 rounded-xl"
             >
               <BookOpen className="w-3.5 h-3.5" /> [ACCESS_DOC: VIG-TECH-2026]
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { 
              t: "History Indexer", 
              d: "Automated scanning of your on-chain history via public RPCs to identify safe transaction destinations from your past.",
              icon: <History className="w-4 h-4" />
            },
            { 
              t: "Source Attribution", 
              d: "VIGIL tracks the origin of every copy-event. Addresses from 'Settings' are trusted more than those from 'Recent Transfers'.",
              icon: <MousePointer2 className="w-4 h-4" />
            },
            { 
              t: "Heuristic Matrix", 
              d: "Deep-layer analysis to detect non-random address collisions—catching vanity addresses that mimic your contacts.",
              icon: <Search className="w-4 h-4" />
            },
            { 
              t: "Clipboard Shield", 
              d: "Intercepts the exact moment a malicious script attempts to swap your copied address with a poison mimic.",
              icon: <Clipboard className="w-4 h-4" />
            }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-[1.5rem] bg-zinc-900/40 border border-zinc-800/50 hover:border-blue-500/40 transition-all duration-500 group/card flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 mb-6 flex items-center justify-center text-blue-500 group-hover/card:scale-110 transition-transform shadow-inner">
                {item.icon}
              </div>
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-3">{item.t}</h4>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-medium italic">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
