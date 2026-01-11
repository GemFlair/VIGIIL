
import React, { useEffect, useState } from 'react';
import { LogOut, Heart, Globe, RefreshCcw, Terminal, Activity, Shield, Zap } from 'lucide-react';

export type ExitType = 'BOTTOM_OUT' | 'AUDIT_COMPLETE' | 'IDLE_EXIT' | null;

interface ExitProtocolOverlayProps {
  exitType: ExitType;
  onClose: () => void;
}

const EXIT_CONTENT = {
  BOTTOM_OUT: {
    status: "COMMUNICATION_CHANNEL: [OPEN]",
    title: "YOUR EYES ARE THE FINAL PERIMETER.",
    sub: "OPERATOR_DIRECTIVE",
    body: "OPERATOR, BEFORE YOU DISENGAGE... VIGIL acknowledges your commitment to sovereignty. Remember: the gap between sight and signature is where the adversary lives.\n\n>> VIGIL_OBSERVED: Deep-layer registry audit confirmed.\n>> STATUS: You have synchronized with the 0.5 standard.\n>> DIRECTIVE: Carry this vigilance into the wild.",
    blessing: "VIGILANCE IS THE ONLY PERMANENT SHIELD.",
    cta: "DISENGAGE_SECURELY"
  },
  AUDIT_COMPLETE: {
    status: "NEURAL_SYNC: [VERIFIED]",
    title: "YOU ARE THE SHIELD.",
    sub: "CALIBRATION SUCCESSFUL",
    body: ">> UPDATE: Evolved from User to Sentinel Operator.\n>> ADVISORY: Visual filters now synchronized.\n>> PROTOCOL: Navigate with intent. Reject the noise.",
    blessing: "PERMANENT PERIMETERS // EXPONENTIAL GAINS",
    cta: "DEPLOY_TO_MAINNET"
  },
  IDLE_EXIT: {
    status: "LOG_OUT: [SAFE_DEPARTURE]",
    title: "THE LINK TERMINATES.",
    sub: "THE SHIELD REMAINS ACTIVE",
    body: ">> TELEMETRY: 180s+ integration stability confirmed.\n>> WARNING: Adversaries live in the gap between sight and signature.\n>> DIRECTIVE: Watch the gap. Stay sovereign.",
    blessing: "SAFE SHADOWS // PROSPEROUS LIGHT",
    cta: "TERMINATE_SESSION"
  }
};

export const ExitProtocolOverlay: React.FC<ExitProtocolOverlayProps> = ({ exitType, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (exitType) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }
  }, [exitType]);

  if (!exitType) return null;

  const content = EXIT_CONTENT[exitType];

  return (
    <div className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Heavy Blur Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-[40px]" onClick={onClose} />
      
      {/* Compact Tactical Pod */}
      <div className={`relative w-full max-w-lg bg-[#030303] border border-zinc-800/60 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden transition-all duration-1000 ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-12 scale-95'}`}>
        
        {/* Animated Scan Line Overlay */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-600/20 blur-[1px] animate-[scan-down_3s_linear_infinite] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
          
          {/* Status Header */}
          <div className="space-y-4 w-full">
             <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] flex-1 bg-zinc-900" />
                <span className="text-red-600 font-black text-[9px] font-mono uppercase tracking-[0.4em] animate-pulse">
                  [COMMUNICATION_ESTABLISHED]
                </span>
                <div className="h-[1px] flex-1 bg-zinc-900" />
             </div>
             <div className="px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full inline-flex items-center gap-3">
                <Activity className="w-3 h-3 text-blue-500" />
                <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{content.status}</span>
             </div>
          </div>

          {/* High-Impact Title */}
          <div className="space-y-2">
             <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-[0.8] drop-shadow-[0_10px_20px_rgba(0,0,0,1)]">
               {content.title}
             </h2>
             <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">{content.sub}</p>
          </div>

          {/* Terminal Pod */}
          <div className="w-full bg-black/60 border border-zinc-900 rounded-3xl p-6 text-left relative group">
             <div className="absolute top-3 right-4">
                <Terminal className="w-3 h-3 text-zinc-800" />
             </div>
             <div className="space-y-2 font-mono text-[11px] text-zinc-400 font-bold uppercase tracking-tight leading-relaxed">
                {content.body.split('\n').map((line, i) => (
                  <p key={i} className={line.includes('WARNING') || line.includes('DIRECTIVE') ? 'text-amber-500/90' : line.includes('SYNC') || line.includes('ACKNOWLEDGED') || line.includes('OBSERVED') ? 'text-emerald-500/90' : ''}>
                    {line}
                  </p>
                ))}
             </div>
          </div>

          {/* Blessing Callout */}
          <div className="space-y-6 pt-2 w-full">
             <div className="space-y-4">
                <p className="text-white text-base md:text-lg font-black italic uppercase tracking-[0.2em] shimmery-text">
                   {content.blessing}
                </p>
                
                {/* Tactical Signature */}
                <div className="flex flex-col items-center gap-1 opacity-40">
                   <div className="flex items-center gap-3 text-zinc-700">
                      <Zap className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span className="text-[8px] font-black uppercase tracking-[0.4em]">VIGIL_CORE_DEV_UNIT</span>
                   </div>
                   <svg width="120" height="24" viewBox="0 0 120 24" className="opacity-20">
                      <path d="M10 18 Q30 5 50 18 T110 18" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" className="animate-draw-path" />
                   </svg>
                </div>
             </div>

             <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                <button 
                  onClick={onClose}
                  className="w-full md:w-auto px-8 py-4 bg-zinc-950 border border-zinc-900 rounded-2xl text-[9px] font-black text-zinc-500 uppercase tracking-widest hover:text-white hover:border-zinc-700 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <RefreshCcw className="w-3 h-3" /> REMAIN ON WATCH
                </button>
                <button 
                  onClick={() => window.location.href = 'https://google.com'}
                  className="w-full md:w-auto px-10 py-4 bg-white text-black rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95 group"
                >
                  <LogOut className="w-3 h-3 group-hover:translate-x-1 transition-transform" /> {content.cta}
                </button>
             </div>
          </div>
        </div>

        {/* Global Footer Meta */}
        <div className="mt-8 pt-4 border-t border-zinc-900/50 flex items-center justify-between opacity-20">
           <div className="flex items-center gap-2 text-[7px] font-black text-zinc-700 uppercase tracking-widest">
              <Globe className="w-2 h-2" /> VIG-MASTER-REGISTRY
           </div>
           <div className="text-[7px] font-black text-zinc-700 uppercase tracking-[0.3em]">
              V 0.0.1.1 DEFINITIVE
           </div>
        </div>
      </div>

      <style>{`
        .shimmery-text {
          background: linear-gradient(90deg, #fff, #52525b, #fff);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmery 5s infinite linear;
        }
        @keyframes shimmery {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes scan-down {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes draw-path {
          from { stroke-dasharray: 0 1000; }
          to { stroke-dasharray: 1000 0; }
        }
        .animate-draw-path {
          stroke-dasharray: 1000;
          animation: draw-path 3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
