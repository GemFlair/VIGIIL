
import React, { useState, useEffect, useRef } from 'react';
import { Search, ShieldCheck, AlertCircle, Database, CheckCircle2, Lock, Shield } from 'lucide-react';
import { RegistryDoc } from './OperationalRegistry';

interface FeatureCardProps {
  feature: {
    icon: React.ReactNode;
    title: string;
    description: string;
    isPrivacyFirst?: boolean;
    accentColor: string;
  };
  index: number;
  delayOffset: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index, delayOffset }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.2, 
        rootMargin: '0px 0px -15% 0px' 
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Professional Stagger: 100ms increments
  const cardDelay = (index * 100) + delayOffset;
  
  return (
    <div 
      ref={cardRef}
      style={{ 
        transitionDelay: isVisible ? `${cardDelay}ms` : '0ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' // Professional ease-out
      }}
      className={`group p-10 bg-[#080808] border border-zinc-900 rounded-[1.5rem] md:rounded-[28px] relative h-full transition-all duration-[600ms] will-change-transform overflow-hidden ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      } hover:border-zinc-700 hover:-translate-y-1 shadow-lg`}
    >
      <div className={`absolute -inset-2 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 pointer-events-none ${
        feature.accentColor === 'blue' ? 'bg-blue-600' :
        feature.accentColor === 'emerald' ? 'bg-emerald-600' :
        'bg-purple-600'
      }`} />

      {feature.isPrivacyFirst && (
        <div className={`absolute top-8 right-10 z-20 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${cardDelay + 300}ms` }}>
          <div className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
            <Shield className="w-2.5 h-2.5" /> PRIVACY-FIRST
          </div>
        </div>
      )}

      <div className={`relative z-10 space-y-6 ${isVisible ? 'animate-float' : ''}`} style={{ animationDelay: `${cardDelay}ms` }}>
        <div className={`w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:bg-zinc-900 ${
           feature.accentColor === 'blue' ? 'group-hover:border-blue-500/30' :
           feature.accentColor === 'emerald' ? 'group-hover:border-emerald-500/30' :
           'group-hover:border-purple-500/30'
        }`}>
          {feature.icon}
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-black text-white uppercase italic tracking-tight group-hover:text-white transition-colors">
            {feature.title}
          </h3>
          <p className="text-zinc-500 text-[13px] md:text-lg leading-relaxed font-medium transition-colors group-hover:text-zinc-400">
            {feature.description}
          </p>
        </div>
      </div>

      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent group-hover:animate-[shine_1.5s_ease-in-out]" />
    </div>
  );
};

export const Features: React.FC<{ onOpenDoc?: (doc: RegistryDoc) => void }> = ({ onOpenDoc }) => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const coreFeatures = [
    {
      icon: <Search className="w-5 h-5 text-blue-500" />,
      title: "ADDRESS SIMILARITY DETECTION",
      description: "VIGIL compares the destination address against your recent history and warns you when a visually similar address appears — stopping copy-paste scams and impersonation risks.",
      accentColor: "blue"
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-emerald-500" />,
      title: "DUST TRANSFER ALERTS",
      description: "Unexpected zero-value or tiny transfers can be a setup for address poisoning. VIGIL flags these patterns so you don’t accidentally copy a malicious sender.",
      accentColor: "emerald"
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-purple-400" />,
      title: "FIRST-TIME CONFIRMATION",
      description: "Sending funds to a new address deserves extra attention. VIGIL provides a gentle confirmation step to help you pause and verify before proceeding.",
      accentColor: "purple"
    }
  ];

  const advancedFeatures = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-purple-500" />,
      title: "FAKE TOKEN VERIFICATION",
      description: "Scammers often use fake USDT or USDC tokens to poison transaction history. VIGIL verifies token mint authenticity to distinguish real assets from impersonations.",
      accentColor: "purple"
    },
    {
      icon: <Database className="w-5 h-5 text-blue-400" />,
      title: "POISON SENDER MEMORY",
      description: "Addresses previously involved in poisoning attempts are remembered locally in your browser, allowing VIGIL to warn you if they appear again.",
      accentColor: "blue"
    },
    {
      icon: <Lock className="w-5 h-5 text-emerald-400" />,
      title: "LOCAL-FIRST ANALYSIS",
      description: "All safety checks run directly in your browser. VIGIL never requests private keys, wallet access, or session data.",
      isPrivacyFirst: true,
      accentColor: "emerald"
    }
  ];

  return (
    <div ref={sectionRef} className="space-y-12 md:space-y-16 py-12 overflow-x-hidden">
      <section id="features" className="px-6 md:px-20 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center space-y-6 mb-16 md:mb-20">
          <span className={`text-purple-500 font-black text-[10px] uppercase tracking-[0.5em] block transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            The Solution
          </span>
          <h2 className={`text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none transition-all duration-700 delay-[100ms] ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            Your Wallet Safety Co-pilot
          </h2>
          <div className={`space-y-8 max-w-3xl mx-auto transition-all duration-700 delay-[200ms] ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed">
              VIGIL adds a quiet awareness layer that reviews addresses and transaction context before you sign, helping you catch copy-paste scams and impersonation risks.
            </p>
            <div className="flex items-center justify-center gap-4">
               <div className={`h-[1px] bg-zinc-900 transition-all duration-700 delay-[300ms] ${headerVisible ? 'w-8' : 'w-0'}`} />
               <p className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em] italic">
                 VIGIL runs silently in the background and only intervenes when a pattern looks risky.
               </p>
               <div className={`h-[1px] bg-zinc-900 transition-all duration-700 delay-[300ms] ${headerVisible ? 'w-8' : 'w-0'}`} />
            </div>
          </div>
        </div>

        {/* CORE PROTECTION HEADER */}
        <div className="mb-12 relative">
           <div className={`absolute -inset-x-12 -top-12 h-64 bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,0.08),transparent_60%)] pointer-events-none transition-opacity duration-1000 ${headerVisible ? 'opacity-100' : 'opacity-0'}`} />
           <div className={`text-[10px] font-black uppercase tracking-[0.4em] mb-8 flex items-center gap-4 transition-all duration-700 delay-[400ms] ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
             <div className="px-4 py-2.5 glass bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-emerald-500">CORE PROTECTION</span>
             </div>
             <div className={`h-[1px] bg-gradient-to-r from-emerald-500/30 to-transparent transition-all duration-700 delay-[500ms] ${headerVisible ? 'flex-1' : 'w-0'}`} />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {coreFeatures.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} delayOffset={100} />
            ))}
          </div>
        </div>

        {/* ADVANCED SAFETY HEADER */}
        <div className="relative">
           <div className={`absolute -inset-x-12 -top-12 h-64 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.08),transparent_60%)] pointer-events-none transition-opacity duration-1000 ${headerVisible ? 'opacity-100' : 'opacity-0'}`} />
           <div className={`text-[10px] font-black uppercase tracking-[0.4em] mb-8 flex items-center gap-4 transition-all duration-700 delay-[600ms] ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
             <div className="px-4 py-2.5 glass bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center gap-3 relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                <span className="text-blue-500">ADVANCED SAFETY</span>
             </div>
             <div className={`h-[1px] bg-gradient-to-r from-blue-500/30 to-transparent transition-all duration-700 delay-[700ms] ${headerVisible ? 'flex-1' : 'w-0'}`} />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {advancedFeatures.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} delayOffset={100} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
