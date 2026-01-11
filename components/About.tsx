
import React from 'react';
import { Users, ShieldAlert, Target, Heart, Info, XCircle } from 'lucide-react';

export const About: React.FC = () => (
  <section id="about-us" className="px-6 md:px-20 py-12 relative z-10 bg-[#020202]">
    <div className="max-w-6xl mx-auto">
      <div className="text-center space-y-2 mb-6 md:mb-10">
        <span className="text-blue-500 mono text-[10px] font-black tracking-[0.4em] uppercase">Human Layer Origins</span>
        <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8] whitespace-nowrap">
          Our Story.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Side: Team & Boundaries */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 bg-[#0a0a0a] border border-zinc-900 rounded-3xl space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users className="w-24 h-24 text-blue-500" />
            </div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-xs font-black text-white uppercase tracking-widest">
                5 Specialists
              </div>
            </div>
            <p className="text-zinc-400 text-[14.5px] md:text-2xl leading-relaxed font-medium italic">
              "We aren’t building another security tool. We’re building the layer we needed when the attack wasn’t obvious."
            </p>
          </div>

          {/* Trust Element: System Boundaries / Limitations */}
          <div className="p-8 border border-zinc-900 rounded-3xl bg-zinc-950/50 space-y-6">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-zinc-600" />
              <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">System Boundaries</h4>
            </div>
            <div className="space-y-4">
              <p className="text-[16px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
                To maintain high-integrity protection, we are transparent about what VIGIL does not do:
              </p>
              <ul className="space-y-3">
                {[
                  "No Smart Contract Exploit Prevention",
                  "No Private Key Recovery",
                  "No Rug-Pull Detection",
                  "No Custody of Funds"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-600 text-[14.5px] font-black uppercase tracking-widest">
                    <XCircle className="w-3 h-3 text-red-900/40" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side: Narrative Content */}
        <div className="lg:col-span-7 space-y-12">
          <div className="space-y-8">
            <p className="text-2xl md:text-3xl text-zinc-300 leading-relaxed font-medium">
              VIGIL is a browser-level Web3 security project built by a five-member team spanning trading, development, and security engineering—individuals who have experienced firsthand how sophisticated crypto scams have become.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-red-600/5 border border-red-500/10 rounded-3xl space-y-4">
                <ShieldAlert className="w-8 h-8 text-red-500" />
                <h4 className="text-white font-black uppercase italic tracking-tight">Direct Victims</h4>
                <p className="text-zinc-500 text-[17px] leading-relaxed font-medium">
                  Two members of our team were direct victims of address poisoning attacks—incidents that occurred during routine transactions using trusted interfaces.
                </p>
              </div>
              <div className="p-8 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl space-y-4">
                <Target className="w-8 h-8 text-blue-500" />
                <h4 className="text-white font-black uppercase italic tracking-tight">Human-Centric</h4>
                <p className="text-zinc-500 text-[17px] leading-relaxed font-medium">
                  We focus on restoring awareness where deception begins: inside the browser, before irreversible actions occur.
                </p>
              </div>
            </div>

            <div className="space-y-6 text-zinc-400 text-xl leading-relaxed font-medium">
              <p>
                Those experiences made it clear that many of today’s crypto losses are not caused by broken systems, but by missing context at the human layer. VIGIL was created to address that gap.
              </p>
              <p>
                Rather than building wallets or custody systems, we focus on restoring awareness. Our goal is simple—reduce avoidable losses caused by human-targeted attacks, while respecting user autonomy, privacy, and transparency.
              </p>
              <p className="text-zinc-300 italic border-l-2 border-blue-500/30 pl-6">
                Our focus is not prediction or control, but restoring visibility at the moment decisions are made.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-900 flex items-center gap-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">
            <Heart className="w-4 h-4 text-red-500" />
            Built for the Solana community.
          </div>
        </div>
      </div>
    </div>
  </section>
);
