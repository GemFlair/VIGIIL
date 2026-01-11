
import React from 'react';
import { Shield, Brain, Globe, CheckCircle2, Circle } from 'lucide-react';

interface RoadmapCardProps {
  version: string;
  status: 'ACTIVE' | 'DEVELOPMENT' | 'PLANNED';
  title: string;
  subtitle: string;
  points: string[];
  colorClass: string;
  accentColor: string;
  icon: React.ReactNode;
}

const RoadmapCard: React.FC<RoadmapCardProps> = ({ 
  version, status, title, subtitle, points, colorClass, accentColor, icon 
}) => {
  const isIndigo = accentColor === 'indigo';
  const isEmerald = accentColor === 'emerald';
  const isCyan = accentColor === 'cyan';

  return (
    <div className={`flex-1 min-w-[300px] p-10 bg-[#0B0E12] border border-zinc-900 rounded-[1.5rem] relative group transition-all duration-500 hover:border-${accentColor}-500/40 shadow-2xl flex flex-col`}>
      {/* Background Radial Glow */}
      <div className={`absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(var(--${accentColor}-rgb),0.08),transparent_70%)] pointer-events-none rounded-[1.5rem]`} />
      
      {/* Header Section */}
      <div className="relative z-10 space-y-6 mb-8">
        <div className="flex items-center justify-between">
          <div className={`text-[10px] font-black uppercase tracking-[0.4em] ${colorClass}`}>
            Milestone {version}
          </div>
          <div className={`px-2 py-0.5 rounded border ${isCyan ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-500' : isIndigo ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'} text-[8px] font-black uppercase tracking-widest`}>
            {status}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className={`w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-all duration-500 group-hover:border-${accentColor}-500/30 group-hover:bg-black ${colorClass}`}>
            {icon}
          </div>
          <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">{title}</h3>
        </div>

        <p className="text-zinc-500 text-sm leading-relaxed font-medium italic border-l border-zinc-800 pl-4">
          {subtitle}
        </p>
      </div>

      {/* Points Section */}
      <div className="relative z-10 flex-1">
        <ul className="space-y-4">
          {points.map((point, i) => (
            <li key={i} className="flex items-start gap-4 text-zinc-400 group/item">
              <div className={`mt-1.5 w-1.5 h-1.5 rounded-full border ${isCyan ? 'border-cyan-500' : isIndigo ? 'border-indigo-500' : 'border-emerald-500'} transition-all duration-300 group-hover:bg-${accentColor}-500 shrink-0`} />
              <span className="text-[11px] font-bold uppercase tracking-widest group-hover:text-zinc-200 transition-colors">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Decorative Corner Element */}
      <div className={`absolute bottom-6 right-6 w-8 h-8 opacity-5 group-hover:opacity-20 transition-opacity pointer-events-none ${colorClass}`}>
        <div className="w-full h-full border-r-2 border-b-2" />
      </div>

      <style>{`
        :root {
          --cyan-rgb: 6, 182, 212;
          --indigo-rgb: 99, 102, 241;
          --emerald-rgb: 16, 185, 129;
        }
      `}</style>
    </div>
  );
};

export const Roadmap: React.FC = () => {
  const roadmapData: RoadmapCardProps[] = [
    {
      version: "01",
      status: "ACTIVE",
      title: "Foundations",
      subtitle: "Baseline awareness for Solana retail users.",
      icon: <Shield className="w-6 h-6" />,
      accentColor: "cyan",
      colorClass: "text-cyan-500",
      points: [
        "Core PoisonING DETECTION",
        "FAKE TOKEN HEURISTICS",
        "VISUAL CHECKSUM MATCHING",
        "LOCAL PATTERN ANALYSIS"
      ]
    },
    {
      version: "02",
      status: "DEVELOPMENT",
      title: "Intelligence",
      subtitle: "Adaptive threat recognition & network effects.",
      icon: <Brain className="w-6 h-6" />,
      accentColor: "indigo",
      colorClass: "text-indigo-500",
      points: [
        "ADVANCED SIMILARITY LOGIC",
        "COMMUNITY THREAT SHARING",
        "MOBILE LAYER INTEGRATION",
        "CAMPAIGN MAPPING"
      ]
    },
    {
      version: "03",
      status: "PLANNED",
      title: "Ecosystem",
      subtitle: "Systemic risk containment & governance.",
      icon: <Globe className="w-6 h-6" />,
      accentColor: "emerald",
      colorClass: "text-emerald-500",
      points: [
        "WALLET SDK FRAMEWORKS",
        "CROSS-CHAIN INTEROP",
        "ENTERPRISE SAFETY REGISTRY",
        "AUTOMATED REPORTING"
      ]
    }
  ];

  return (
    <section id="roadmap" className="py-12 px-6 md:px-20 bg-[#020202] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-6 mb-20">
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-zinc-900" />
            <span className="text-zinc-500 font-black text-[10px] uppercase tracking-[0.5em]">System Evolution</span>
            <div className="h-[1px] w-12 bg-zinc-900" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">Security Expansion</h2>
          <p className="text-zinc-600 text-lg md:text-xl max-w-2xl mx-auto font-bold mt-8 leading-relaxed uppercase tracking-tight">
            Advancing the defense maturity of the <span className="text-white">human-layer security</span> protocol.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 relative">
          {roadmapData.map((phase, idx) => (
            <RoadmapCard key={idx} {...phase} />
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-zinc-900/50 flex justify-center">
           <div className="flex items-center gap-3 text-[9px] font-black text-zinc-700 uppercase tracking-widest italic">
              <div className="w-2 h-2 rounded-full bg-blue-600/20 border border-blue-600/40 animate-pulse" />
              Technical roadmap subject to emerging threat vector analysis.
           </div>
        </div>
      </div>
    </section>
  );
};
