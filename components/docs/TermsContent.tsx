
import React from 'react';
import { 
  Gavel, ShieldCheck, Scale, AlertTriangle, Lock, FileText, Globe, Info, 
  Zap, UserCheck, Book, Landmark, ShieldAlert, Cpu, Network, History,
  HardDrive, AlertOctagon, HelpCircle
} from 'lucide-react';
import { DocumentWatermark, SectionHeader, DocCard, TechLabel, TechNote, ClauseFrame } from './DocHelpers';

export const TermsContent = () => (
  <div className="space-y-0 pb-40 max-w-6xl mx-auto selection:bg-blue-500/20 relative">
    <DocumentWatermark text="VIGIL OPERATIONAL TERMS" />
    
    <SectionHeader 
      id="DOC: VIG-TOS-MASTER-2025.12"
      category="Strategic Compliance Unit"
      title="Terms of Service."
      subtitle="Enterprise-grade legal and operational framework v1.1"
      colorClass="text-blue-500"
      bgGlow="bg-blue-600/10"
    />

    <div className="space-y-24 px-6 md:px-12 relative z-10">
      
      {/* PREAMBLE */}
      <section className="space-y-8">
        <DocCard border="blue" glow>
          <div className="flex items-center gap-4 mb-8">
             <Gavel className="w-8 h-8 text-blue-500" />
             <h3 className="text-3xl font-black text-white italic uppercase tracking-tight">Preamble</h3>
          </div>
          <div className="space-y-6 text-zinc-400 text-lg leading-relaxed font-medium">
            <p>Last Updated: <b>31 December 2025</b></p>
            <p>These Terms and Conditions (“Terms”) constitute a legally binding agreement between you (“User”, “you”, or “your”) and <b>VIGIL</b> (“Company”, “VIGIL”, “we”, “us”, or “our”) governing your access to and use of our website, browser extension, software, applications, APIs, tools, documentation, and related services (collectively, the “Service”).</p>
            <p className="bg-blue-950/20 border border-blue-900/30 p-8 rounded-3xl text-blue-100 italic relative overflow-hidden">
               <span className="absolute top-0 right-0 p-4 opacity-10"><Scale className="w-20 h-20" /></span>
               "By accessing, installing, downloading, or using any part of the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must immediately discontinue use of the Service."
            </p>
          </div>
        </DocCard>
      </section>

      {/* SECTION 1: DEFINITIONS */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
          <TechLabel text="SECTION 01" color="blue" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-4xl font-black text-white uppercase italic tracking-tight leading-none">Definitions & <br/> Key Terminology</h3>
            <p className="text-zinc-500 text-lg leading-relaxed font-medium italic border-l-4 border-blue-500/30 pl-8">
               "Clarity in operational semantics is the foundation of our legal framework."
            </p>
            <div className="space-y-4">
              {[
                { t: "Layer 0.5", d: "The intermediate security protocol operating between the application layer and the cryptographic execution layer." },
                { t: "Intent Matching", d: "The probabilistic verification of a user's visual target against the technical payload destination." },
                { t: "Local Sandbox", d: "The isolated browser-level execution environment where all VIGIL processing occurs." },
                { t: "Heuristic Signal", d: "A probabilistic risk indicator derived from pattern analysis and historical continuity." }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-start gap-4 group hover:border-blue-500/30 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <div className="space-y-1">
                    <h5 className="text-[10px] font-black text-white uppercase tracking-widest">{item.t}</h5>
                    <p className="text-[11px] text-zinc-500 leading-relaxed font-medium italic">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
             <TechNote title="LEGAL SCOPE">
               Definitions provided herein are binding and govern the interpretation of all clauses in this agreement.
             </TechNote>
             <DocCard border="zinc">
                <div className="flex items-center gap-3 mb-4">
                  <Book className="w-5 h-5 text-blue-500" />
                  <h4 className="text-xs font-black text-white uppercase tracking-widest">Interpretive Rule</h4>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                  References to the singular include the plural and vice versa. Section headings are for convenience only and do not impact interpretation.
                </p>
             </DocCard>
          </div>
        </div>
      </section>

      {/* SECTION 2: PURPOSE AND NATURE */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
          <TechLabel text="SECTION 02" color="blue" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        
        <DocCard border="zinc">
          <div className="flex items-center gap-4 mb-10">
             <Info className="w-8 h-8 text-blue-500" />
             <h3 className="text-3xl font-black text-white italic uppercase tracking-tight">Purpose of Service</h3>
          </div>
          <div className="space-y-10">
            <ClauseFrame id="TOS-1.1">
               <h5 className="text-white font-black uppercase tracking-widest text-xs">Human-Layer Security</h5>
               <p className="text-zinc-500 text-base italic leading-relaxed font-medium">
                 VIGIL provides an awareness platform designed to identify potential risks associated with blockchain usage, including address poisoning, impersonation, visual deception, and phishing indicators.
               </p>
            </ClauseFrame>
            <ClauseFrame id="TOS-1.2">
               <h5 className="text-white font-black uppercase tracking-widest text-xs">Advisory Limitation</h5>
               <p className="text-zinc-500 text-base italic leading-relaxed font-medium text-red-500/80">
                 The Service operates as a decision-support tool only. It does not execute transactions, control wallets, store private keys, or alter blockchain behavior. All final authority resides with the human user.
               </p>
            </ClauseFrame>
          </div>
        </DocCard>
      </section>

      {/* SECTION 3: ELIGIBILITY */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
          <TechLabel text="SECTION 03" color="blue" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <DocCard border="zinc">
              <h3 className="text-xl font-black text-white italic uppercase tracking-tight mb-6 flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-emerald-500" /> User Representations
              </h3>
              <ul className="space-y-4 text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed italic">
                 <li>• You are at least 18 years of age</li>
                 <li>• You possess full legal capacity</li>
                 <li>• Your use complies with all applicable laws</li>
                 <li>• You are responsible for device security</li>
              </ul>
           </DocCard>

           <DocCard border="red">
              <h3 className="text-xl font-black text-white italic uppercase tracking-tight mb-6 flex items-center gap-3">
                <Landmark className="w-5 h-5 text-red-600" /> Restricted Use
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                The Company reserves the right to deny access to any user or entity at its sole discretion, including those on international sanctions lists or in prohibited regions.
              </p>
           </DocCard>
        </div>
      </section>

      {/* SECTION 4: ACCEPTANCE OF RISK */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
          <TechLabel text="SECTION 04" color="red" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        
        <DocCard border="red">
          <div className="flex items-center gap-4 mb-10">
             <ShieldAlert className="w-8 h-8 text-red-600" />
             <h3 className="text-3xl font-black text-white italic uppercase tracking-tight">4. Acceptance of Risk</h3>
          </div>
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <ClauseFrame id="TOS-4.1">
                  <h5 className="text-white font-black uppercase tracking-widest text-xs">4.1 Digital Asset Volatility</h5>
                  <p className="text-zinc-500 text-sm italic leading-relaxed">
                    Digital assets are highly volatile and involve substantial risk of loss. You acknowledge that blockchain transactions are irreversible and VIGIL cannot undo any mistakes.
                  </p>
               </ClauseFrame>
               <ClauseFrame id="TOS-4.2">
                  <h5 className="text-white font-black uppercase tracking-widest text-xs">4.2 Protocol Vulnerability</h5>
                  <p className="text-zinc-500 text-sm italic leading-relaxed">
                    The Service interacts with decentralized protocols that are subject to exploits, forks, and upgrades beyond Company control. VIGIL is not responsible for protocol-layer failures.
                  </p>
               </ClauseFrame>
            </div>
            <div className="p-8 bg-red-950/10 border border-red-900/20 rounded-3xl">
               <p className="text-zinc-400 text-sm italic leading-relaxed font-medium">
                 <b>User Responsibility:</b> All decisions, actions, and transactions performed after receiving information, alerts, or warnings from the Service are made solely at your discretion and risk. VIGIL makes no guarantees of asset safety or loss prevention.
               </p>
            </div>
          </div>
        </DocCard>
      </section>

      {/* SECTION 5: NO ADVICE */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
          <TechLabel text="SECTION 05" color="zinc" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {[
             { i: <Scale />, t: "No Financial Advice", d: "Service data is informational only and does not constitute investment recommendations." },
             { i: <Gavel />, t: "No Legal Advice", d: "Alerts do not represent legal findings or regulatory compliance assertions." },
             { i: <Landmark />, t: "No Tax Advice", d: "Transaction monitoring has no bearing on tax reporting or liability calculations." }
           ].map((item, i) => (
             <DocCard key={i} border="zinc">
                <div className="flex flex-col gap-4">
                   <div className="text-zinc-500">{item.i}</div>
                   <h5 className="text-white font-black uppercase tracking-widest text-xs">{item.t}</h5>
                   <p className="text-zinc-600 text-[10px] leading-relaxed font-bold uppercase">{item.d}</p>
                </div>
             </DocCard>
           ))}
        </div>
      </section>

      {/* SECTION 6: LIMITATION OF LIABILITY */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
          <TechLabel text="SECTION 06" color="red" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        
        <DocCard border="red">
          <div className="flex items-center gap-4 mb-10 border-b border-red-900/20 pb-6">
             <AlertOctagon className="w-8 h-8 text-red-600" />
             <h3 className="text-3xl font-black text-white italic uppercase tracking-tight">6. Limitation of Liability</h3>
          </div>
          <div className="space-y-8">
             <p className="text-xl text-zinc-300 font-bold uppercase tracking-tight leading-relaxed italic">
               To the maximum extent permitted by applicable law, VIGIL shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages.
             </p>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Loss of digital assets or funds",
                  "Loss of profits or potential revenue",
                  "Business interruption or operational delay",
                  "Data loss or corruption",
                  "Reputational damage",
                  "Hardware or software failure"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-zinc-950 border border-zinc-900 rounded-xl group/item">
                    <XCircleIcon className="w-3 h-3 text-red-900/40" />
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{item}</span>
                  </div>
                ))}
             </div>

             <TechNote title="TOTAL AGGREGATE LIABILITY">
               VIGIL’s total aggregate liability under this agreement shall not exceed the amount paid by you (if any) for the use of the Service during the 12 months preceding the claim.
             </TechNote>
          </div>
        </DocCard>
      </section>

      {/* SECTION 7: DISCLAIMER OF WARRANTIES */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
          <TechLabel text="SECTION 07" color="zinc" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        
        <DocCard border="zinc">
          <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-8">Disclaimer of Warranties</h3>
          <div className="space-y-6 text-zinc-500 text-sm leading-relaxed font-medium italic">
             <p>The Service is provided <b>“AS IS”</b> and <b>“AS AVAILABLE”</b>, without warranties of any kind, whether express or implied. VIGIL expressly disclaims all warranties, including but not limited to:</p>
             <ul className="space-y-4 pl-8 border-l border-zinc-800">
                <li>• <b>Accuracy:</b> No guarantee that alerts or risk assessments are correct or complete.</li>
                <li>• <b>Availability:</b> No guarantee that the Service will be uninterrupted or error-free.</li>
                <li>• <b>Reliability:</b> No guarantee that the Service will meet your security requirements.</li>
                <li>• <b>Non-infringement:</b> No guarantee of merchantability or fitness for a particular purpose.</li>
             </ul>
          </div>
        </DocCard>
      </section>

      {/* SECTION 8: THIRD-PARTY SERVICES */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
          <TechLabel text="SECTION 08" color="blue" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <h3 className="text-4xl font-black text-white uppercase italic tracking-tight leading-none">Third-Party Services <br/> and Content</h3>
            <p className="text-zinc-400 text-lg leading-relaxed font-medium">
              The Service may interact with or reference third-party platforms, blockchains, wallets, explorers, APIs, or websites (“Third-Party Services”).
            </p>
            <div className="p-8 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-6">
               <p className="text-zinc-500 text-sm italic font-bold uppercase tracking-widest leading-relaxed">
                 VIGIL does not control, endorse, or guarantee the security or accuracy of Third-Party Services. Your interaction with them is entirely at your own risk.
               </p>
            </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
             <TechNote title="NETWORK EXTERNALITIES">
               Company is not responsible for losses arising from Third-Party Service failures, including RPC downtime or chain congestion.
             </TechNote>
          </div>
        </div>
      </section>

      {/* SECTION 9: PROHIBITED USE */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
          <TechLabel text="SECTION 09" color="red" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        
        <DocCard border="red">
           <div className="flex items-center gap-4 mb-8">
              <ShieldAlert className="w-8 h-8 text-red-600" />
              <h3 className="text-3xl font-black text-white italic uppercase tracking-tight">Prohibited Use</h3>
           </div>
           <div className="space-y-6">
              <p className="text-zinc-400 font-medium">Violation of these obligations may result in immediate termination of access without prior notice.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   "Unlawful or fraudulent purposes",
                   "Reverse engineering or exploitation of logic",
                   "Interfering with security mechanisms",
                   "Facilitating malicious exploits or scams",
                   "Misrepresenting Service alerts as guarantees",
                   "Automated scraping of Service data"
                 ].map((rule, idx) => (
                   <div key={idx} className="flex items-center gap-3 p-4 bg-zinc-950 border border-zinc-900 rounded-xl">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-900/40" />
                      <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{rule}</span>
                   </div>
                 ))}
              </div>
           </div>
        </DocCard>
      </section>

      {/* SECTION 10: INTELLECTUAL PROPERTY */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
          <TechLabel text="SECTION 10" color="blue" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <DocCard border="blue">
              <h3 className="text-xl font-black text-white italic uppercase mb-6 flex items-center gap-3">
                <Lock className="w-5 h-5 text-blue-500" /> Ownership Rights
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium italic">
                All software, content, designs, trademarks, logos, documentation, and intellectual property associated with the Service are owned by or licensed to VIGIL. No ownership rights are transferred to the user.
              </p>
           </DocCard>

           <DocCard border="zinc">
              <h3 className="text-xl font-black text-white italic uppercase mb-6 flex items-center gap-3">
                <FileText className="w-5 h-5 text-zinc-500" /> Limited License
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium italic">
                You are granted a limited, non-exclusive, non-transferable, revocable license to use the Service solely for lawful personal or internal business purposes.
              </p>
           </DocCard>
        </div>
      </section>

      {/* SECTION 11: PRIVACY & DATA */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
          <TechLabel text="SECTION 11" color="emerald" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        
        <DocCard border="emerald">
          <div className="flex items-center gap-4 mb-10">
             <ShieldCheck className="w-8 h-8 text-emerald-500" />
             <h3 className="text-3xl font-black text-white italic uppercase tracking-tight">Data and Privacy</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="space-y-4">
                <h5 className="text-white font-black uppercase tracking-widest text-xs">Localized Processing</h5>
                <p className="text-zinc-500 text-sm italic leading-relaxed">
                  Use of the Service involves localized processing of interaction patterns. VIGIL does not access private keys or seed phrases.
                </p>
             </div>
             <div className="space-y-4">
                <h5 className="text-white font-black uppercase tracking-widest text-xs">Anonymized Telemetry</h5>
                <p className="text-zinc-500 text-sm italic leading-relaxed">
                  Limited technical data may be collected for security improvement and performance monitoring. No personally identifiable information is sold.
                </p>
             </div>
          </div>
        </DocCard>
      </section>

      {/* SECTION 12: MODIFICATIONS */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
          <TechLabel text="SECTION 12" color="zinc" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        
        <DocCard border="zinc">
          <h3 className="text-xl font-black text-white italic uppercase mb-6 flex items-center gap-3">
             <Zap className="w-5 h-5 text-zinc-500" /> Modification of Terms
          </h3>
          <p className="text-zinc-500 text-sm leading-relaxed font-medium italic">
             VIGIL reserves the right to update these Terms at any time. Revised Terms become effective upon publication. Continued use of the Service constitutes acceptance of the updated Terms.
          </p>
        </DocCard>
      </section>

      {/* SECTION 13: GOVERNING LAW */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
          <TechLabel text="SECTION 13" color="blue" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <DocCard border="zinc">
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Governing Law</h4>
              <p className="text-[10px] text-zinc-500 leading-relaxed font-medium italic">These Terms shall be governed by and construed in accordance with the laws of the applicable jurisdiction determined by VIGIL.</p>
           </DocCard>
           <DocCard border="zinc">
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Exclusive Jurisdiction</h4>
              <p className="text-[10px] text-zinc-500 leading-relaxed font-medium italic">You agree that any disputes shall be subject to the exclusive jurisdiction of the competent courts of that jurisdiction.</p>
           </DocCard>
        </div>
      </section>

      {/* SECTION 14: MISCELLANEOUS */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
          <TechLabel text="SECTION 14" color="zinc" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <DocCard border="zinc">
              <h5 className="text-[10px] font-black text-white uppercase tracking-widest mb-3">Severability</h5>
              <p className="text-[10px] text-zinc-600 font-medium">If any provision is held invalid, the remaining provisions remain in full force.</p>
           </DocCard>
           <DocCard border="zinc">
              <h5 className="text-[10px] font-black text-white uppercase tracking-widest mb-3">Entire Agreement</h5>
              <p className="text-[10px] text-zinc-600 font-medium">These Terms constitute the entire agreement regarding the Service.</p>
           </DocCard>
           <DocCard border="zinc">
              <h5 className="text-[10px] font-black text-white uppercase tracking-widest mb-3">No Waiver</h5>
              <p className="text-[10px] text-zinc-600 font-medium">Failure to enforce any right does not constitute a waiver of that right.</p>
           </DocCard>
        </div>
      </section>

      {/* FINAL NOTICE */}
      <section className="pt-24 space-y-12 text-center">
        <div className="h-[2px] w-48 bg-blue-900/30 mx-auto" />
        <div className="space-y-8">
           <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mx-auto">
              <HelpCircle className="w-8 h-8 text-zinc-600" />
           </div>
           <h3 className="text-5xl font-black text-white italic uppercase tracking-tighter">Legal Finality</h3>
           <div className="p-10 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] max-w-3xl mx-auto shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]" />
              <p className="text-zinc-500 text-lg font-bold italic leading-relaxed relative z-10 uppercase tracking-tight">
                "Security tools reduce risk — they do not eliminate it. Human judgment remains the final security primitive in decentralized systems."
              </p>
           </div>
           <div className="space-y-2">
              <p className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.6em]">VIGIL OPERATIONAL TERMS // REGISTRY ID: VIG-TOS-INST-A1</p>
              <p className="text-[8px] font-black text-zinc-900 uppercase tracking-[1em]">END OF DOCUMENT</p>
           </div>
        </div>
      </section>
    </div>
  </div>
);

const XCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
