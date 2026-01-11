
import React from 'react';
import { BarChart3, Users, TrendingUp, ShieldX, ExternalLink, AlertTriangle } from 'lucide-react';

interface StickyCardProps {
  icon: React.ReactNode;
  label: string;
  scopeLabel?: string;
  title: string;
  description: string;
  source: string;
  stat: string;
  statLabel: string;
  colorClass: string;
  borderClass?: string;
  index: number;
}

const StickyCard: React.FC<StickyCardProps> = ({ 
  icon, label, scopeLabel, title, description, source, stat, statLabel, colorClass, borderClass, index 
}) => {
  const activeBorderColor = borderClass || colorClass;
  const borderColor = activeBorderColor.replace('text-', 'border-');

  // Progressive stacking offsets
  const mobileTop = 80 + (index * 16);
  const desktopTop = 120 + (index * 32);

  return (
    <div 
      className="sticky w-full mb-2 md:mb-4 last:mb-0" 
      style={{ 
        top: `var(--stack-top)`,
        zIndex: 10 + index,
        '--stack-top': `${mobileTop}px`
      } as React.CSSProperties}
    >
      <style>{`
        @media (min-width: 768px) {
          .sticky-card-${index} { --stack-top: ${desktopTop}px; }
        }
      `}</style>
      
      <div className={`sticky-card-${index} bg-[#0c0c0c] border ${borderColor}/20 border-t-[4px] ${borderColor} rounded-[1.5rem] md:rounded-[28px] p-6 md:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] group overflow-hidden relative transition-transform duration-500 will-change-transform max-h-[75vh] md:max-h-none overflow-y-auto no-scrollbar`}>
        {/* Background Accent Gradient */}
        <div className={`absolute top-0 right-0 w-32 md:w-48 h-32 md:h-48 opacity-5 blur-[60px] md:blur-[80px] rounded-full transition-opacity group-hover:opacity-10 ${activeBorderColor.replace('text-', 'bg-')}`} />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-center">
          {/* Left Content */}
          <div className="lg:col-span-8 space-y-4 md:space-y-8">
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <div className={`p-1.5 md:p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/50 ${colorClass}`}>
                {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 16 }) : icon}
              </div>
              <div className={`px-2.5 md:px-4 py-0.5 md:py-1.5 rounded-full bg-opacity-10 border border-opacity-20 text-[8px] md:text-[10px] font-black tracking-widest uppercase ${activeBorderColor.replace('text-', 'bg-')} ${activeBorderColor.replace('text-', 'border-')} ${activeBorderColor}`}>
                {label}
              </div>
              {scopeLabel && (
                <div className="px-2.5 md:px-4 py-0.5 md:py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[8px] md:text-[10px] font-black tracking-widest uppercase text-zinc-500">
                  {scopeLabel}
                </div>
              )}
            </div>

            <div className="space-y-2 md:space-y-4">
              <h3 className="text-xl md:text-5xl font-black text-white tracking-tighter leading-tight italic uppercase">
                {title}
              </h3>
              <p className="text-zinc-400 text-[12.5px] md:text-[1.2rem] leading-relaxed font-medium max-w-2xl">
                {description}
              </p>
            </div>

            <div className="flex items-center gap-2.5 text-[9px] md:text-[11px] font-black text-zinc-600 uppercase tracking-widest pt-4 md:pt-6 border-t border-zinc-900/50">
              <ExternalLink className="w-2.5 md:w-3.5 h-2.5 md:h-3.5" />
              {source}
            </div>
          </div>

          {/* Right Content - The Big Stat */}
          <div className="lg:col-span-4 text-center lg:text-right flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-zinc-900/50 pt-5 md:pt-8 lg:pt-0 lg:pl-10">
            <div className={`text-4xl md:text-8xl font-black tracking-tighter italic leading-none mb-2 md:mb-3 ${colorClass}`}>
              {stat}
            </div>
            <div className="text-[8px] md:text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em]">
              {statLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ScamStats: React.FC = () => {
  const cards = [
    {
      icon: <BarChart3 />,
      label: "GLOBAL ECOSYSTEM IMPACT",
      scopeLabel: "SCOPE: UI-LEVEL ATTACKS",
      title: "Billions Lost to Visual Mimicry",
      description: "Address poisoning has evolved from a niche trick into a multi-billion dollar illicit industry. Total global losses attributed specifically to UI-based address deception exceeded $3.85B by 31st Dec 2025. These losses are driven by exploitation of human visual heuristics.",
      source: "SLOWMIST SECURITY AUDIT: GLOBAL CRYPTO CRIME REPORT",
      stat: "$3.85B",
      statLabel: "TOTAL LOSSES (2025)",
      colorClass: "text-red-500",
      borderClass: "text-red-500"
    },
    {
      icon: <Users />,
      label: "COGNITIVE SECURITY GAP",
      title: "The 8-Character Blind Spot",
      description: "Security audits updated for 2025 show that 94% of Web3 users only verify the first four and last four characters of an address. This human cognitive shortcut is exactly what vanity address generators exploit to create identical-looking scam destinations.",
      source: "SLOWMIST SECURITY AUDIT: UX SECURITY BENCHMARK 2025",
      stat: "94%",
      statLabel: "USER VERIFICATION GAP",
      colorClass: "text-blue-500"
    },
    {
      icon: <TrendingUp />,
      label: "SOLANA ACTIVITY 2025",
      title: "The Scale of Automated Deception",
      description: "As of early 2025, automated bots on Solana generate over 20,000 malicious 'zero-value' transfers per hour across the network. These bots effectively 'poison' transaction histories of active wallets.",
      source: "SLOWMIST SECURITY AUDIT: CHAIN HEURISTICS ANALYSIS",
      stat: "528k+",
      statLabel: "DAILY ATTACK ATTEMPTS",
      colorClass: "text-orange-500"
    },
    {
      icon: <ShieldX />,
      label: "MAJOR INCIDENT 2024",
      title: "The $71M 'Address Poisoning' Record",
      description: "In mid-2024, a high-value wallet lost 1,155 WBTC in a single transaction. The attacker used a vanity address that perfectly matched the victim's expected destination's first and last 6 characters.",
      source: "SLOWMIST SECURITY AUDIT: SLOWMIST SECURITY AUDIT",
      stat: "$71M+",
      statLabel: "SINGLE LOSS EVENT",
      colorClass: "text-red-500"
    },
    {
      icon: <AlertTriangle />,
      label: "LATEST MAJOR INCIDENT",
      title: "$50M USDT Poisoning Record",
      description: "In December 2025, a trader lost nearly $50M USDT in a single transaction. The attack utilized a look-alike address injected via zero-value 'dust' transfers. No malware or protocol exploit was used.",
      source: "ON-CHAIN FORENSICS: USDT EXPLOIT ANALYSIS (DEC 2025)",
      stat: "$50M",
      statLabel: "SINGLE LOSS EVENT (DEC 2025)",
      colorClass: "text-rose-600"
    }
  ];

  return (
    <section id="ecosystem-impact" className="px-6 md:px-20 pt-12 pb-0 relative z-10 bg-[#020202]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 md:space-y-6 max-w-4xl mx-auto mb-16 md:mb-32">
          <span className="text-red-500 mono text-[10px] font-black tracking-[0.4em] uppercase">The Cost of Silence</span>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter italic leading-[0.8] uppercase">Address Poisoning Scale.</h2>
          <p className="text-zinc-400 text-sm md:text-xl font-medium mt-8">Real-world data through 2025 reveals the devastating scale of attacks.</p>
        </div>

        <div className="relative pb-4 md:pb-8">
          {cards.map((card, idx) => (
            <StickyCard key={idx} index={idx} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};
