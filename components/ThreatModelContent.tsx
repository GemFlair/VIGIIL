import React from 'react';
import { 
  ShieldAlert, 
  Skull, 
  Zap, 
  Crosshair, 
  Activity, 
  Lock, 
  EyeOff, 
  AlertTriangle, 
  Database, 
  Cpu, 
  Binary, 
  Fingerprint, 
  History,
  Target,
  FileWarning
} from 'lucide-react';
import { DocumentWatermark, SectionHeader, DocCard, TechLabel, TechNote, ClauseFrame } from './DocHelpers';

export const ThreatModelContent = () => (
  <div className="space-y-0 pb-40 max-w-6xl mx-auto selection:bg-red-500/30 relative">
    <DocumentWatermark text="CLASSIFIED THREAT MODEL" />
    
    <SectionHeader 
      id="REF: VIG-TM-2026.09"
      category="Strategic Intelligence Unit"
      title="Threat Model."
      subtitle="Adversarial Analysis and Operational Constraints"
      colorClass="text-red-500"
      bgGlow="bg-red-600/10"
    />

    <div className="space-y-16 px-6 md:px-12 relative z-10">
      
      {/* 1. INTRODUCTION TO BOUNDARIES */}
      <section className="space-y-8">
        <TechLabel text="SECTION 01" color="red" />
        <DocCard border="red" glow>
          <div className="flex items-center gap-4 mb-8">
             <Skull className="w-8 h-8 text-red-600" />
             <h3 className="text-3xl font-black text-white italic uppercase tracking-tight underline decoration-red-600/40 underline-offset-8">Operational Risk Boundaries</h3>
          </div>
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-medium">
            This document outlines the <span className="text-red-500 font-bold uppercase">Adversarial Landscape</span> VIGIL is designed to monitor. It explicitly defines the boundaries where human intuition fails and where VIGIL’s detection logic operates. 
          </p>
          <p className="text-zinc-500 text-sm leading-relaxed mt-4 italic">
            Note: This is an active intelligence document. It assumes a high-threat environment where the user is targeted by sophisticated automated vanity clusters.
          </p>
        </DocCard>
      </section>

      {/* 2. THE ADVERSARY PROFILE */}
      <section className="space-y-8">
        <TechLabel text="SECTION 02" color="blue" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-black text-white uppercase italic">Adversary Profiles</h3>
            <p className="text-zinc-400 font-medium leading-relaxed">VIGIL models two primary threat actors:</p>
            <div className="space-y-4">
               <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-start gap-4">
                  <Cpu className="w-6 h-6 text-zinc-700 mt-1" />
                  <div>
                    <h5 className="text-white font-black uppercase tracking-widest text-xs">Automated Vanity Clusters</h5>
                    <p className="text-zinc-500 text-xs">Botnets generating 10k+ addresses per second to find collisions with high-value wallet history.</p>
                  </div>
               </div>
               <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-start gap-4">
                  <Target className="w-6 h-6 text-red-900/40 mt-1" />
                  <div>
                    <h5 className="text-white font-black uppercase tracking-widest text-xs">Context Injectors</h5>
                    <p className="text-zinc-500 text-xs">Human-led attacks that manually poison specific dApp documentation or community chats.</p>
                  </div>
               </div>
            </div>
          </div>
          <div className="lg:col-span-5">
             <TechNote title="INTEL SOURCE">
                Derived from the 2025 Solana Ecosystem Threat Audit. Adversaries are prioritized by the cost of execution vs. potential asset capture.
             </TechNote>
          </div>
        </div>
      </section>

      {/* 3. ATTACK SURFACE: THE BROWSER */}
      <section className="space-y-8">
        <TechLabel text="SECTION 03" color="cyan" />
        <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">Attack Surface Analysis</h3>
        <DocCard border="cyan">
           <p className="text-zinc-400 text-base leading-relaxed mb-8">VIGIL treats the <span className="text-cyan-500 font-black italic">Browser Window</span> as a hostile environment. Below is the primary capture vector:</p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Clipboard Events', 'DOM Mutations', 'Navigational Context'].map(item => (
                <div key={item} className="p-6 bg-zinc-900/50 border border-cyan-900/20 rounded-2xl text-center group/item hover:border-cyan-500 transition-colors">
                   <div className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-2">{item}</div>
                   <div className="h-[1px] w-8 bg-zinc-800 mx-auto" />
                </div>
              ))}
           </div>
        </DocCard>
      </section>

      {/* 4. ENTROPY COLLISION ATTACK */}
      <section className="space-y-8">
        <TechLabel text="SECTION 04" color="red" />
        <ClauseFrame id="VIG-TM-04">
          <h4 className="text-xl font-black text-white uppercase italic tracking-tight">Vanishing Entropy Attacks</h4>
          <p className="text-zinc-400 font-medium">Attackers exploit the "8-character blind spot" (4 prefix + 4 suffix). By mirroring these characters, they reduce the perceived entropy of a 44-character address to zero for the human eye.</p>
          <div className="mt-6 p-6 bg-red-950/10 border border-red-900/20 rounded-2xl">
             <div className="text-xs text-red-500 font-black tracking-[0.3em] mb-3">VISUAL EXAMPLE</div>
             <div className="font-mono text-[10px] space-y-2">
                <p className="text-zinc-500">REAL: <span className="text-emerald-500">Ab1C</span>...<span className="text-zinc-700">882199291120038</span>...<span className="text-emerald-500">Zz90</span></p>
                <p className="text-zinc-500">FAKE: <span className="text-red-500">Ab1C</span>...<span className="text-zinc-700">000000X99120817</span>...<span className="text-red-500">Zz90</span></p>
             </div>
          </div>
        </ClauseFrame>
      </section>

      {/* 5. TEMPORAL POISONING */}
      <section className="space-y-8">
        <TechLabel text="SECTION 05" color="blue" />
        <h3 className="text-3xl font-black text-white italic uppercase tracking-tight">Temporal Poisoning (The "Long Con")</h3>
        <p className="text-zinc-400 text-lg leading-relaxed font-medium">
          Attackers send a dust transfer 14–21 days before the intended theft. They wait for your legitimate transactions to be buried in history, ensuring their address is the first "Familiar" one you see when scrolling back.
        </p>
        <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2rem] flex items-center justify-between gap-12">
           <div className="space-y-2">
             <div className="text-blue-500 font-black text-[10px] uppercase tracking-widest">DETECTION VECTOR</div>
             <h5 className="text-white font-black italic">Time-Weighted History Mapping</h5>
           </div>
           <History className="w-12 h-12 text-blue-500 opacity-20" />
        </div>
      </section>

      {/* 6. UNICODE SPOOFING */}
      <section className="space-y-8">
        <TechLabel text="SECTION 06" color="red" />
        <DocCard border="zinc">
          <div className="flex items-center gap-4 mb-6">
            <ShieldAlert className="w-6 h-6 text-orange-500" />
            <h4 className="text-xl font-black text-white uppercase italic tracking-tight">Unicode / Character Mimicry</h4>
          </div>
          <p className="text-zinc-500 text-base font-medium">VIGIL monitors for dApp labels that use look-alike Unicode characters (e.g., 'ο' instead of 'o'). These spoofed labels create a "Safe Haven" illusion for malicious addresses.</p>
        </DocCard>
      </section>

      {/* 7. DUST CONTRACT DECEPTION */}
      <section className="space-y-8">
        <TechLabel text="SECTION 07" color="red" />
        <div className="p-10 bg-red-600/5 border border-red-900/20 rounded-[2.5rem] space-y-6">
           <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">Zero-Value Contract Deception</h3>
           <p className="text-zinc-400 leading-relaxed font-medium">Attackers trigger 0 SOL transfers from *within* a smart contract to bypass "Sender" verification logic in simple wallet interfaces.</p>
           <TechLabel text="CRITICAL RISK" color="red" />
        </div>
      </section>

      {/* 8. LIMITATIONS: PROTOCOL ISOLATION */}
      <section className="space-y-8">
        <TechLabel text="SECTION 08" color="zinc" />
        <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">System Limitations</h3>
        <ClauseFrame id="LIMIT-01">
           <h4 className="text-white font-black uppercase tracking-widest text-lg">Protocol-Layer Blindness</h4>
           <p className="text-zinc-500 text-sm leading-relaxed font-medium">
             VIGIL has zero visibility into Layer 1 protocol state transitions. If the Solana network itself is compromised or a validator cluster is malicious, VIGIL cannot detect it. <b>VIGIL assumes L1 integrity.</b>
           </p>
        </ClauseFrame>
      </section>

      {/* 9. LIMITATIONS: CONTRACT LOGIC */}
      <section className="space-y-8">
        <TechLabel text="SECTION 09" color="zinc" />
        <DocCard border="red">
          <div className="flex items-center gap-4 mb-6">
            <Binary className="w-6 h-6 text-red-500" />
            <h4 className="text-lg font-black text-white uppercase italic tracking-tight">Contract Logic Exploits</h4>
          </div>
          <p className="text-zinc-400 font-medium leading-relaxed italic">
            "VIGIL does not audit smart contracts." If you interact with a legitimate-looking dApp that has a hidden drainer function in its verified contract code, VIGIL will not flag it unless it detects visual impersonation in the UI.
          </p>
        </DocCard>
      </section>

      {/* 10. THE FIRST-TIME PARADOX */}
      <section className="space-y-8">
        <TechLabel text="SECTION 10" color="zinc" />
        <div className="p-8 bg-zinc-950 border border-zinc-900 rounded-[2rem] space-y-4 border-l-4 border-l-blue-600">
           <h4 className="text-white font-black italic uppercase text-lg">The "First-Time" Paradox</h4>
           <p className="text-zinc-500 text-sm leading-relaxed">VIGIL relies on historical context. When sending to a completely new address for the first time with zero prior interactions, VIGIL's "Similarity" logic has no baseline. Detection is limited to Global Threat Feeds in this state.</p>
        </div>
      </section>

      {/* 11. FALSE POSITIVE MANAGEMENT */}
      <section className="space-y-8">
        <TechLabel text="SECTION 11" color="blue" />
        <h3 className="text-3xl font-black text-white italic uppercase tracking-tight">Probabilistic False Positives</h3>
        <p className="text-zinc-400 font-medium leading-relaxed">To ensure high-precision protection, VIGIL may occasionally flag a legitimate address that shares high similarity with another trusted address in your history. These are "Advisory Flags" intended for human review.</p>
      </section>

      {/* 12. HARDWARE WALLET LAYER */}
      <section className="space-y-8">
        <TechLabel text="SECTION 12" color="cyan" />
        <DocCard border="cyan">
           <div className="flex items-center gap-4 mb-6">
             <Lock className="w-6 h-6 text-cyan-500" />
             <h4 className="text-lg font-black text-white italic uppercase">Hardware Isolation</h4>
           </div>
           <p className="text-zinc-500 text-sm font-medium leading-relaxed">
             VIGIL operates in the browser. It cannot see or protect the small screen on your Ledger or Trezor. Users must *always* verify the address on the physical hardware device before signing.
           </p>
        </DocCard>
      </section>

      {/* 13. ENVIRONMENT NOISE */}
      <section className="space-y-8">
        <TechLabel text="SECTION 13" color="blue" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {['Network Lag', 'Memory Caps', 'API Downtime', 'Browser State'].map(f => (
             <div key={f} className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl text-center">
                <div className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">{f}</div>
             </div>
           ))}
        </div>
        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.4em] text-center">Operational Reliability Factors</p>
      </section>

      {/* 14. CONTINUOUS EVOLUTION */}
      <section className="space-y-8">
        <TechLabel text="SECTION 14" color="blue" />
        <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">Threat Feed Latency</h3>
        <p className="text-zinc-400 text-lg leading-relaxed font-medium">New poisoning clusters appear daily. While VIGIL synchronizes threat feeds, there may be a temporal gap between an attacker deploying a new vanity cluster and its signature being registered by VIGIL.</p>
      </section>

      {/* 15. FINAL RISK ACCEPTANCE */}
      <section className="pt-24 space-y-12 text-center">
        <div className="h-[2px] w-48 bg-red-900/30 mx-auto" />
        <div className="space-y-6">
           <AlertTriangle className="w-16 h-16 text-red-600 mx-auto opacity-50" />
           <h3 className="text-5xl font-black text-white italic uppercase tracking-tighter">Final Risk Acceptance</h3>
           <p className="max-w-3xl mx-auto text-zinc-500 text-sm font-bold uppercase tracking-widest leading-relaxed">
             By deploying VIGIL, the user acknowledges that they remain the <span className="text-white">Sole Authority</span> over their cryptographic signatures. VIGIL is an Advisory Primitive. It does not replace human skepticism.
           </p>
        </div>
        <p className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.6em]">Registry Reference: VIG-TM-DEFINITIVE-A2</p>
      </section>

    </div>
  </div>
);