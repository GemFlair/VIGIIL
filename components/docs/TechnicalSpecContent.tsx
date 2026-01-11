import React from 'react';
import { Binary, Layers, Cpu, Database, Shield, Zap, Target } from 'lucide-react';
import { DocumentWatermark, SectionHeader, DocCard, TechLabel, TechNote, ClauseFrame } from './DocHelpers';

export const TechnicalSpecContent = () => (
  <div className="space-y-0 pb-40 max-w-6xl mx-auto selection:bg-cyan-500/20 relative">
    <DocumentWatermark text="VIGIL ARCHITECTURE SPEC" />
    
    <SectionHeader 
      id="SPEC: VIG-ARCH-2026.1"
      category="Systems Architecture Unit"
      title="Technical Spec."
      subtitle="Layer 0.5 Human-Protocol Interception Model"
      colorClass="text-cyan-500"
      bgGlow="bg-cyan-600/10"
    />

    <div className="space-y-16 px-6 md:px-12 relative z-10">
      
      <DocCard border="cyan" glow>
        <div className="flex items-center gap-4 mb-8">
           <Layers className="w-8 h-8 text-cyan-500" />
           <h3 className="text-3xl font-black text-white italic uppercase tracking-tight">Architecture Fundamentals</h3>
        </div>
        <div className="space-y-8">
          <ClauseFrame id="VIG-SPEC-01">
            <h4 className="text-lg font-black text-white uppercase italic tracking-tight underline decoration-cyan-500/20 underline-offset-8">Definition of the 0.5 Security Layer</h4>
            <p className="text-zinc-400 text-lg leading-relaxed font-medium">The 0.5 Security Layer is a pre-transaction, human-centric security layer that operates between user perception and cryptographic execution. It exists after information is presented but before irreversible actions are committed.</p>
          </ClauseFrame>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
             <div className="p-8 bg-zinc-950/50 border border-zinc-900 rounded-3xl space-y-4">
                <TechLabel text="PHASE: INTERCEPTION" color="cyan" />
                <p className="text-sm text-zinc-500 leading-relaxed italic">Capturing intent inside the browser DOM at the moment of destination interaction.</p>
             </div>
             <div className="p-8 bg-zinc-950/50 border border-zinc-900 rounded-3xl space-y-4">
                <TechLabel text="PHASE: VALIDATION" color="cyan" />
                <p className="text-sm text-zinc-500 leading-relaxed italic">Evaluating contextual consistency against trusted history and similarity heuristics.</p>
             </div>
          </div>
        </div>
      </DocCard>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <DocCard border="zinc">
            <h3 className="text-xl font-black text-white italic uppercase tracking-tight mb-8">System Overview & Components</h3>
            <div className="space-y-10">
               {[
                 { t: "DOM Contextual Observer", d: "Lightweight monitoring of address copy/paste events and navigational anchor points.", icon: <Target className="w-5 h-5 text-blue-500" /> },
                 { t: "Similarity Matrix Engine", d: "Real-time comparison of hexadecimal strings using Levenshtein distance and entropy checks.", icon: <Cpu className="w-5 h-5 text-purple-500" /> },
                 { t: "Heuristic Signature Unit", d: "Local database of known poisoning clusters and vanity generator entropy patterns.", icon: <Binary className="w-5 h-5 text-cyan-500" /> }
               ].map((item, i) => (
                 <div key={i} className="flex gap-6 group/item">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-transform group-hover/item:scale-110">
                       {item.icon}
                    </div>
                    <div className="space-y-2">
                       <h5 className="text-sm font-black text-white uppercase tracking-widest">{item.t}</h5>
                       <p className="text-sm text-zinc-500 font-medium leading-relaxed">{item.d}</p>
                    </div>
                 </div>
               ))}
            </div>
          </DocCard>

          <DocCard border="red">
            <h3 className="text-xl font-black text-white italic uppercase tracking-tight mb-6">Non-Goals & Exclusions</h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-8">To maintain precise operational boundaries, VIGIL is explicitly architected to avoid the following:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {["Custody of private keys", "Transaction modification", "Protocol-level consensus", "Smart contract auditing"].map(item => (
                 <div key={item} className="px-6 py-4 bg-red-950/10 border border-red-900/20 rounded-2xl flex items-center gap-4">
                    <TechLabel text="OUT-OF-SCOPE" color="red" />
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{item}</span>
                 </div>
               ))}
            </div>
          </DocCard>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <DocCard border="cyan">
              <h4 className="text-xs font-black text-cyan-500 uppercase tracking-[0.3em] mb-6">Operational Latency</h4>
              <div className="space-y-6">
                 <div className="text-center py-8 bg-zinc-950 rounded-3xl border border-zinc-900 shadow-inner">
                    <div className="text-4xl font-black text-white italic tracking-tighter">&lt; 12ms</div>
                    <div className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em] mt-2">Target Latency</div>
                 </div>
                 <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed">
                   Analysis is executed on the client-side event loop to ensure zero perceived friction.
                 </p>
              </div>
           </DocCard>

           <TechNote title="BROWSER SANDBOXING">
             VIGIL leverages standard Extension APIs to maintain strict isolation from the main browser thread and other extensions.
           </TechNote>
        </div>
      </div>

      <div className="pt-24 text-center space-y-8">
         <div className="h-[2px] w-24 bg-cyan-900/30 mx-auto" />
         <h3 className="text-3xl font-black text-white italic uppercase tracking-[0.3em]">Protocol Verified</h3>
         <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.5em]">Release Tag: VIG-ARCH-FINAL-2026</p>
      </div>
    </div>
  </div>
);