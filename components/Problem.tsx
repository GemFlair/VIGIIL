
import React, { useState, useEffect, useRef } from 'react';
import { Hash, Cpu, Activity, FileWarning } from 'lucide-react';
import { RegistryDoc } from './OperationalRegistry';

export const Problem: React.FC<{ onOpenDoc?: (doc: RegistryDoc) => void }> = ({ onOpenDoc }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const matrixCards = [
    { 
      icon: <Hash className="w-6 h-6 text-blue-500" />, 
      title: "Address Collision & Suffix Spoofing", 
      desc: "Adversaries utilize high-performance vanity address generators to craft malicious destinations that mimic your trusted history." 
    },
    { 
      icon: <Cpu className="w-6 h-6 text-purple-500" />, 
      title: "Cognitive Load & Hexadecimal Heuristics", 
      desc: "Human users rely on mental shortcuts such as prefix/suffix matching, reducing 44-character addresses into partial visual fingerprints." 
    },
    { 
      icon: <Activity className="w-6 h-6 text-green-500" />, 
      title: "Execution Finality & The Reversibility Gap", 
      desc: "Sub-second block finality removes the temporal safety window, making a single visual mistake permanently irreversible." 
    }
  ];

  return (
    <section id="the-threat" className="flex flex-col items-center justify-center p-6 md:p-12 py-12 relative overflow-hidden bg-[#020202]">
      <div ref={containerRef} className="w-full max-w-6xl space-y-16 relative z-10">
        <div className={`text-center space-y-6 max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
          <span className="text-red-500 mono text-[10px] font-black tracking-[0.3em] uppercase">Vulnerability Matrix</span>
          <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">Systematic Failure of Reactive Security Models</h2>
          <div className="space-y-4">
            <p className="text-zinc-400 text-lg leading-relaxed font-medium">Legacy wallet infrastructures operate on a reactive security paradigm.</p>
            <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest max-w-2xl mx-auto italic">
              Because these failures occur before a transaction reaches the wallet, no amount of on-chain or post-signature validation can fully mitigate them.
            </p>
            <button 
              onClick={() => onOpenDoc?.('threat_model')}
              className="mt-6 inline-flex items-center gap-2 text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-400 transition-colors"
            >
              <FileWarning className="w-3.5 h-3.5" /> [READ_INTEL_REPORT: VIG-TM-2026]
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {matrixCards.map((card, i) => (
            <div 
              key={i} 
              style={{ 
                transitionDelay: `${(i * 150) + 300}ms`,
                transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
              }}
              className={`p-10 bg-zinc-950/40 border border-zinc-900 rounded-[1.5rem] md:rounded-[28px] transition-all duration-1000 relative overflow-hidden will-change-transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } hover:border-blue-500/20 hover:-translate-y-1.5 group`}
            >
              <div className="w-14 h-14 bg-zinc-900/50 rounded-2xl flex items-center justify-center mb-8 border border-zinc-800 group-hover:scale-110 transition-transform duration-500">{card.icon}</div>
              <h3 className="text-xl font-black text-white mb-4 tracking-tight uppercase italic">{card.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium">{card.desc}</p>
              
              {/* Shine Effect */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent group-hover:animate-[shine_1.5s_ease-in-out]" />
            </div>
          ))}
        </div>

        <div className={`p-12 md:p-20 bg-blue-600/5 border border-blue-500/10 rounded-[1.5rem] md:rounded-[28px] text-center relative group overflow-hidden transition-all duration-1000 delay-[800ms] ${isVisible ? 'opacity-100' : 'opacity-0 scale-[0.98]'}`}>
          <p className="text-xl md:text-3xl font-bold text-white leading-relaxed italic relative z-10 max-w-4xl mx-auto tracking-tight">
            "The critical exploit surface is the cognitive gap between the visual representation of an intent and the cryptographic execution of a signature."
          </p>
        </div>
      </div>
    </section>
  );
};
