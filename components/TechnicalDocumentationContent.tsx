import React from 'react';
import { Shield, FileText, Binary, Layers, Terminal, AlertCircle, Lock, Cpu, Target, ShieldAlert, Database, History } from 'lucide-react';
import { DocumentWatermark, SectionHeader, DocCard, TechLabel, TechNote, ClauseFrame } from './DocHelpers';

export const TechnicalDocumentationContent = () => (
  <div className="space-y-0 pb-40 max-w-6xl mx-auto selection:bg-blue-600/20 relative">
    <DocumentWatermark text="VIGIL MASTER SPEC" />
    
    <SectionHeader 
      id="DOC: VIG-TECH-ARCH-2026"
      category="Principal Architecture Unit"
      title="Technical Documentation."
      subtitle="Sovereign Technical Architecture Specification"
      colorClass="text-blue-500"
      bgGlow="bg-blue-600/10"
    />

    <div className="space-y-12 md:space-y-16 px-1 md:px-12 relative z-10">
      
      <DocCard border="blue" glow>
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
           <Layers className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
           <h3 className="text-xl md:text-3xl font-black text-white italic uppercase tracking-tight">Implementing the 0.5 Human–Protocol Security Layer</h3>
        </div>
        <div className="space-y-8 md:space-y-10">
          <ClauseFrame id="VIG-ARCH-01">
            <h4 className="text-base md:text-lg font-black text-white uppercase italic tracking-tight underline decoration-blue-500/20 underline-offset-8">1. Purpose of This Document</h4>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-medium">This document formally specifies the technical architecture, execution model, threat assumptions, and operational boundaries of the VIGIL Chrome Extension.</p>
          </ClauseFrame>

          <ClauseFrame id="VIG-ARCH-02">
            <h4 className="text-base md:text-lg font-black text-white uppercase italic tracking-tight underline decoration-blue-500/20 underline-offset-8">2. Data Provenance: Trusted Reference Indexing</h4>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-medium">To differentiate between legitimate history and poisoned entries, VIGIL utilizes a multi-factor indexing engine to establish 'Trusted Reference' addresses.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-widest">
                  <Database className="w-3 h-3" /> Historical Verification
                </div>
                <p className="text-zinc-500 text-xs">VIGIL queries public Solana RPC nodes to verify destination longevity. Addresses with multiple confirmed 'Outgoing' transactions from the user are whitelisted locally.</p>
              </div>
              <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-purple-500 text-[10px] font-black uppercase tracking-widest">
                  <Target className="w-3 h-3" /> DOM Source Analysis
                </div>
                <p className="text-zinc-500 text-xs">VIGIL captures the structural intent of a copy event. If an address is copied from a 'Settings' or 'Profile' sub-domain, it is assigned a higher trust score than an address copied from a 'Transaction History' feed.</p>
              </div>
            </div>
          </ClauseFrame>

          <ClauseFrame id="VIG-ARCH-03">
            <h4 className="text-base md:text-lg font-black text-white uppercase italic tracking-tight underline decoration-blue-500/20 underline-offset-8">3. Definition of the 0.5 Security Layer</h4>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-medium">The 0.5 Security Layer is a pre-transaction, human-centric security layer that operates between user perception and cryptographic execution.</p>
          </ClauseFrame>
        </div>
      </DocCard>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        <div className="lg:col-span-7 space-y-8 md:space-y-12">
          <DocCard border="red">
            <div className="flex items-center gap-3 mb-6">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              <h4 className="text-lg md:text-xl font-black text-white italic uppercase tracking-tight">4. Non-Goals and Explicit Exclusions</h4>
            </div>
            <div className="space-y-4">
              <p className="text-zinc-500 text-sm leading-relaxed font-bold uppercase tracking-tight">The VIGIL Chrome Extension is explicitly not designed to:</p>
              <ul className="space-y-3">
                {["Custody digital assets or private keys", "Intercept, alter, or block transactions", "Replace wallet software", "Detect or prevent protocol-level exploits", "Analyze smart contract code", "Guarantee transaction safety"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-400 text-[11px] font-black uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-900/40" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </DocCard>

          <DocCard border="zinc">
            <h4 className="text-lg font-black text-white uppercase italic tracking-tight mb-6">5. Rationale for Browser-Level Deployment</h4>
            <div className="space-y-4 text-zinc-400 text-sm leading-relaxed font-medium">
              <p>Human intent in Web3 systems is primarily formed within web browsers. Users discover addresses, tokens, and projects through websites, documentation portals, social platforms, and block explorers.</p>
            </div>
          </DocCard>

          <DocCard border="zinc">
            <h4 className="text-lg font-black text-white uppercase italic tracking-tight mb-6">6. System Overview</h4>
            <div className="space-y-4 text-zinc-400 text-sm leading-relaxed font-medium">
              <p>The VIGIL Chrome Extension is a browser-resident security system composed of logically isolated subsystems that collectively implement the 0.5 Layer model.</p>
              <ul className="space-y-3">
                {[
                  "Observes user-initiated interactions relevant to Web3 intent formation",
                  "Normalizes and validates observed data",
                  "Maintains local, time-aware contextual memory",
                  "Detects patterns consistent with known deception techniques",
                  "Assesses risk probabilistically",
                  "Communicates concerns to the user without enforcing outcomes"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-500 text-[11px] font-medium leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30 mt-1 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </DocCard>
        </div>

        <div className="lg:col-span-5 space-y-6 md:space-y-8">
           <DocCard border="blue">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-4 h-4 text-blue-500" />
                <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">7. Extension Execution Model</h4>
              </div>
              <div className="space-y-6 text-zinc-500 text-[11px] leading-relaxed font-medium">
                 <p>The extension operates entirely within the browser’s extension sandbox and adheres to platform-enforced permission boundaries.</p>
                 <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-3">
                    <p className="text-zinc-300 font-black uppercase tracking-widest text-[9px]">Execution Logic:</p>
                    <ul className="space-y-2">
                       <li>• Background execution context</li>
                       <li>• Page-scoped content execution</li>
                       <li>• Local persistence layer</li>
                       <li>• Presentation layer</li>
                    </ul>
                 </div>
              </div>
           </DocCard>

           <TechNote title="DATA INTEGRITY">
             8. Observation Model: The system observes only explicit, user-initiated actions. Raw observed data is treated as untrusted input and is never stored in its original form beyond immediate processing.
           </TechNote>
        </div>
      </div>

      <div className="pt-20 md:pt-24 text-center space-y-6 md:space-y-8">
         <div className="h-[2px] w-20 md:w-24 bg-blue-900/30 mx-auto" />
         <h3 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-[0.3em]">End of Specification</h3>
         <p className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.6em]">Registry ID: VIG-TECH-DEFINITIVE-2026</p>
      </div>
    </div>
  </div>
);