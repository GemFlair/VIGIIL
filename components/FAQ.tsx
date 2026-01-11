import React, { useState } from 'react';
import { ChevronDown, MessageSquare, Lock, Cpu, ShieldAlert, Binary, Zap, Globe, HardDrive, Network, Layers, ShieldCheck, Microscope } from 'lucide-react';
import { RegistryDoc } from './OperationalRegistry';

interface FAQItemProps {
  id: string;
  index: string;
  category: string;
  question: string;
  answer: React.ReactNode;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, category, index, icon, isOpen, onToggle }) => (
  <div className={`group border-b border-zinc-900 transition-all duration-500 ${isOpen ? 'bg-zinc-900/20' : 'hover:bg-zinc-900/10'}`}>
    <button 
      onClick={onToggle}
      className="w-full py-5 px-4 flex items-center justify-between gap-6 text-left"
    >
      <div className="flex items-center gap-6">
        {/* Numbering and Icon Block */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-[10px] font-mono font-black text-zinc-800 uppercase tracking-tighter">#{index}</span>
          <div className={`w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-blue-600/10 border-blue-500/50 text-blue-500' : 'text-zinc-600 group-hover:text-zinc-400 group-hover:border-zinc-700'}`}>
            {/* Added explicit prop typing to React.cloneElement to satisfy TS requirements for Lucide icons */}
            {React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 18 })}
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[8px] font-black text-blue-500/60 uppercase tracking-[0.4em]">{category}</span>
          <h4 className={`text-sm md:text-lg font-black uppercase italic tracking-tight transition-colors ${isOpen ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
            {question}
          </h4>
        </div>
      </div>

      <div className={`w-8 h-8 rounded-lg border border-zinc-800 flex items-center justify-center transition-all duration-500 shrink-0 ${isOpen ? 'rotate-180 bg-zinc-800' : 'group-hover:border-zinc-700'}`}>
        <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-blue-500' : 'text-zinc-700'}`} />
      </div>
    </button>
    
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-8 px-20' : 'max-h-0 opacity-0'}`}>
      <div className="max-w-3xl">
        <div className="text-zinc-400 text-sm md:text-base leading-relaxed font-medium">
          {answer}
        </div>
      </div>
    </div>
  </div>
);

export const FAQ: React.FC<{ onOpenDoc?: (doc: RegistryDoc) => void }> = ({ onOpenDoc }) => {
  const [openId, setOpenId] = useState<string | null>('q1');

  const faqs = [
    {
      id: 'q1',
      index: '01',
      category: 'OPERATIONAL_LOGIC',
      icon: <Binary />,
      question: "How does VIGIL actually intercept a poisoning attempt?",
      answer: "VIGIL operates at Layer 0.5, monitoring the browser's Document Object Model (DOM) and clipboard events. When you copy an address or interact with a transaction UI, VIGIL's heuristic engine compares the destination against your local trust graph and known adversarial patterns. If a visual mimicry attempt (e.g., matching prefix/suffix but different middle entropy) is detected, an interception alert is triggered before you even open your wallet."
    },
    {
      id: 'q2',
      index: '02',
      category: 'PRIVACY_PROTOCOL',
      icon: <Lock />,
      question: "Does VIGIL store my transaction history or private keys?",
      answer: "No. VIGIL is non-custodial and privacy-first. It never requests or has access to your private keys or seed phrases. Your interaction history is indexed locally within your browser's IndexedDB and never transmitted to our servers. All analysis occurs on your device."
    },
    {
      id: 'q3',
      index: '03',
      category: 'THREAT_VECTORS',
      icon: <ShieldAlert />,
      question: "Can VIGIL protect me from smart contract exploits?",
      answer: "VIGIL is specifically engineered to neutralize human-layer deception, such as address poisoning and visual spoofing. It does not audit smart contract logic or prevent protocol-level hacks. We recommend using VIGIL alongside traditional security tools for full-spectrum protection."
    },
    {
      id: 'q4',
      index: '04',
      category: 'COMMERCIAL_REGISTRY',
      icon: <Zap />,
      question: "Why is there a fee for Pro Access?",
      answer: "The 0.5 SOL annual fee funds the continuous development of our Heuristic Matrix and the synchronization of global threat intelligence feeds. This ensures your local node is always protected against the newest vanity address clusters and poisoning campaigns deployed by sophisticated adversaries."
    },
    {
      id: 'q5',
      index: '05',
      category: 'SYSTEM_COMPATIBILITY',
      icon: <Globe />,
      question: "Which wallets and chains are supported?",
      answer: "VIGIL currently provides flagship support for the Solana ecosystem, integrating seamlessly with major browser-based wallets like Phantom, Solflare, and Backpack. We are currently developing expansion modules for EVM-compatible networks as part of our Phase 03 roadmap."
    },
    {
      id: 'q6',
      index: '06',
      category: 'NODE_ARCHITECTURE',
      icon: <HardDrive />,
      question: "Can institutions host their own VIGIL Sentinel nodes?",
      answer: "Yes. For institutional partners, VIGIL provides a standalone 'Sentinel Node' package that allows for local hosting of the Heuristic Matrix and custom threat intelligence feeds. This ensures maximum data sovereignty and sub-ms latency for high-frequency operations."
    },
    {
      id: 'q7',
      index: '07',
      category: 'PERFORMANCE_METRICS',
      icon: <Cpu />,
      question: "What is the computational overhead of the extension?",
      answer: "VIGIL is architected for maximum efficiency. The DOM contextual observer is optimized for sub-12ms execution times on the browser's background thread, utilizing less than 2% of standard CPU overhead and 15MB of RAM during active validation cycles."
    },
    {
      id: 'q8',
      index: '08',
      category: 'WORKFLOW_INTEGRATION',
      icon: <Layers />,
      question: "Is VIGIL compatible with Multisig workflows?",
      answer: "Absolutely. VIGIL is designed to protect the 'Intent Formation' phase. For multisig platforms like Squads, VIGIL validates the destination address at the moment the proposal is created in the UI, ensuring the initiator is not inadvertently proposing a transaction to a poison mimic."
    },
    {
      id: 'q9',
      index: '09',
      category: 'TRANSPARENCY_UNIT',
      icon: <Microscope />,
      question: "How can I verify the logic of the Heuristic Matrix?",
      answer: "The core heuristic modules governing visual collision detection are open-source and available for audit in the VIGIL Registry. We encourage security researchers to review our Levenshtein-based entropy analysis and character-matching algorithms."
    },
    {
      id: 'q10',
      index: '10',
      category: 'ROADMAP_GOVERNANCE',
      icon: <Network />,
      question: "Are there plans for mobile browser protection?",
      answer: "Mobile security is the primary objective of our Phase 02 roadmap. We are currently developing a 'Mobile Awareness Layer' that will integrate via mobile browser extensions or as a native SDK for mobile-first Solana wallets."
    }
  ];

  return (
    <section id="faq" className="px-6 md:px-20 py-12 bg-[#020202] relative z-10 scroll-mt-20">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4">
             <div className="h-[1px] w-12 bg-zinc-900" />
             <span className="text-blue-500 font-black text-[11px] uppercase tracking-[0.6em]">Inquiry Registry // Knowledge Node</span>
             <div className="h-[1px] w-12 bg-zinc-900" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
            Technical <br/> Inquiries.
          </h2>
        </div>

        <div className="border-t border-zinc-900">
          {faqs.map((faq) => (
            <FAQItem 
              key={faq.id}
              {...faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>

        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-zinc-900/50">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800">
                 <MessageSquare className="w-6 h-6 text-zinc-600" />
              </div>
              <div className="space-y-1">
                 <p className="text-sm font-black text-white uppercase tracking-widest">Still have questions?</p>
                 <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Access the full documentation in our registry.</p>
              </div>
           </div>
           <button 
             onClick={() => onOpenDoc?.('technical_doc')}
             className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:text-white hover:border-blue-500/50 transition-all active:scale-95"
           >
             VIEW REGISTRY DOCS
           </button>
        </div>
      </div>
    </section>
  );
};