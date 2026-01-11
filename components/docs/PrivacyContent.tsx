import React from 'react';
import { Lock, EyeOff, ShieldCheck, Database, History } from 'lucide-react';
import { DocumentWatermark, SectionHeader, DocCard, TechLabel, TechNote } from './DocHelpers';

export const PrivacyContent = () => (
  <div className="space-y-0 pb-40 max-w-6xl mx-auto selection:bg-emerald-500/20 relative">
    <DocumentWatermark text="VIGIL PRIVACY PROTOCOL" />
    
    <SectionHeader 
      id="DOC: VIG-PRV-2025.12"
      category="Data Governance Unit"
      title="Privacy Protocol."
      subtitle="Zero-knowledge localized processing standard"
      colorClass="text-emerald-500"
      bgGlow="bg-emerald-600/10"
    />

    <div className="space-y-12 px-6 md:px-12 relative z-10">
      
      <DocCard border="emerald" glow>
        <div className="flex items-center gap-4 border-b border-emerald-900/20 pb-6 mb-8">
           <div className="w-10 h-10 bg-emerald-950 border border-emerald-900/30 rounded-xl flex items-center justify-center">
             <Lock className="w-5 h-5 text-emerald-500" />
           </div>
           <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">Introduction & Scope</h3>
        </div>
        <div className="space-y-6 text-zinc-400 text-lg leading-relaxed font-medium">
          <p>This Privacy Policy explains in detail how <b>VIGIL</b>, including its affiliates, successors, and assigns (“the Company,” “we,” “us,” or “our”), collects, processes, uses, stores, discloses, and protects information obtained from individuals who access or use our Services.</p>
          <p className="bg-emerald-950/20 border border-emerald-900/30 p-6 rounded-2xl text-emerald-100 italic">By accessing, installing, or using any part of the Services, you acknowledge that you have read, understood, and agreed to the collection and use of information as described in this Privacy Policy. If you do not agree with the terms of this Policy, you should discontinue use of the Services.</p>
        </div>
      </DocCard>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         <div className="lg:col-span-7 space-y-12">
            <DocCard border="zinc">
               <div className="space-y-6">
                  <TechLabel text="DATA CLASSIFICATION" color="zinc" />
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Nature of Information Collected</h3>
                  <div className="space-y-4 text-zinc-500 text-base leading-relaxed">
                     <p>The Company may collect information that you voluntarily provide when you interact with the Services. <u>You are not required to provide personal information unless it is necessary to access specific features.</u></p>
                     <p>In addition to information you provide directly, the Company may automatically collect certain technical information (device type, browser, pattern interaction) to ensure proper functioning of the Services and maintain security.</p>
                  </div>
               </div>
            </DocCard>

            <DocCard border="emerald">
               <div className="space-y-6">
                  <TechLabel text="OPERATIONAL LOGIC" color="emerald" />
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Purpose of Processing</h3>
                  <p className="text-zinc-400 text-base leading-relaxed font-medium">The Company processes information for legitimate and necessary purposes related to the operation and improvement of the Services. Information is further processed to maintain security, prevent fraud, detect abuse, and protect the rights and safety of the Company and its users.</p>
               </div>
            </DocCard>
         </div>

         <div className="lg:col-span-5 space-y-8">
            <div className="p-10 bg-[#081126]/60 backdrop-blur-xl border border-cyan-500/20 rounded-[2.5rem] space-y-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(6,182,212,0.05),transparent_60%)] pointer-events-none" />
               <TechLabel text="AI PROTOCOL" color="cyan" />
               <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Automated Systems</h3>
               <p className="text-zinc-400 text-sm leading-relaxed italic">Certain features incorporate artificial intelligence mechanisms. User inputs processed by AI systems are not used to train public models unless explicitly disclosed and consented to.</p>
            </div>

            <TechNote title="RETENTION POLICY">
               Information is retained only for as long as necessary to fulfill the purposes described. subject to law, users may have the right to access, correct, or delete personal information.
            </TechNote>
         </div>
      </div>

      <DocCard border="zinc">
         <div className="flex items-center gap-12">
            <div className="flex-1 space-y-4">
               <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Security Measures</h3>
               <p className="text-zinc-500 text-sm leading-relaxed">We implement reasonable technical and organizational measures designed to protect information from unauthorized access. While we strive to protect information, no system can be guaranteed to be completely secure.</p>
            </div>
            <div className="hidden md:block w-[1px] h-24 bg-zinc-900" />
            <div className="flex-1 space-y-4">
               <h3 className="text-xl font-black text-white italic uppercase tracking-tight">No Sale of Data</h3>
               <p className="text-zinc-500 text-sm leading-relaxed font-bold uppercase tracking-tight">The Company does not sell personal information. Disclosure only occurs in limited circumstances necessary to operate the Services.</p>
            </div>
         </div>
      </DocCard>

      <div className="pt-32 text-center space-y-8">
         <div className="h-[2px] w-24 bg-emerald-900/30 mx-auto" />
         <h3 className="text-3xl font-black text-white italic uppercase tracking-[0.3em]">Privacy Absolute</h3>
         <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.5em]">Registry ID: VIG-PRV-INST-03</p>
      </div>
    </div>
  </div>
);