import React from 'react';
import { ShieldAlert, AlertTriangle, Lock, ShieldX, Hammer, Zap } from 'lucide-react';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityModal: React.FC<SecurityModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-700 overflow-y-auto">
      {/* Background Ambient Glows for the whole screen - Intensified Red */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-red-900/5 blur-[150px] pointer-events-none" />

      <div className="w-full max-w-2xl bg-zinc-950/70 border border-red-500/10 backdrop-blur-xl rounded-[2rem] p-5 sm:p-10 relative overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.8),inset_0_0_80px_rgba(239,68,68,0.05)] my-auto">
        
        {/* Internal Ambient Radial color feel - Intensified Red */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-red-600/20 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-900/10 blur-[100px] pointer-events-none rounded-full" />

        {/* Background Large Exclamation Mark */}
        <div className="absolute top-4 right-6 opacity-[0.02] pointer-events-none select-none hidden sm:block">
          <span className="text-[18rem] font-black italic leading-none text-white">!</span>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-4 sm:space-y-8">
          
          {/* Header Block */}
          <div className="space-y-2 sm:space-y-4">
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600/10 border border-red-500/20 rounded-lg sm:rounded-xl flex items-center justify-center text-red-500">
                <ShieldAlert size={18} className="sm:w-[22px] sm:h-[22px]" />
              </div>
              <div className="h-[1px] w-6 sm:w-8 bg-zinc-800" />
              <span className="text-[8px] sm:text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] sm:tracking-[0.5em]">VIG-MASTER-NOTICE-01</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl md:text-[3.75rem] font-black text-white italic uppercase tracking-tighter leading-[1.1] drop-shadow-2xl">
              SECURITY 
              <span className="block mt-2 sm:mt-4">PROTOCOL.</span>
            </h2>
          </div>

          {/* Critical Token Alert Block */}
          <div className="w-full p-4 sm:p-6 bg-red-600/[0.03] border border-red-500/10 rounded-xl sm:rounded-2xl text-left space-y-2 sm:space-y-3 shadow-inner">
             <div className="flex items-center gap-2">
                <AlertTriangle size={12} className="text-red-500 sm:w-3.5 sm:h-3.5" />
                <h4 className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-[0.2em]">CRITICAL: TOKEN STATUS</h4>
             </div>
             <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                VIGIL states that 
                <span className="inline-block mx-1 px-1.5 py-0.5 bg-red-600/10 border border-red-500/40 rounded text-[9px] sm:text-[11px] font-black text-white whitespace-nowrap">NO OFFICIAL TOKEN EXISTS</span>. 
                Any contract claiming association is a phishing attempt.
             </p>
          </div>

          {/* Grid of Disclaimers */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full">
            {[
              { 
                icon: <Zap size={10} />, 
                title: "ADVISORY ONLY", 
                body: "WE DO NOT CONTROL OR SIGN TRANSACTIONS." 
              },
              { 
                icon: <Hammer size={10} />, 
                title: "NO ADVICE", 
                body: "NOT FINANCIAL OR LEGAL INSTRUCTION." 
              },
              { 
                icon: <ShieldX size={10} />, 
                title: "RISK ACCEPTANCE", 
                body: "SECURITY IS PROBABILISTIC." 
              },
              { 
                icon: <Lock size={10} />, 
                title: "NON-CUSTODIAL", 
                body: "WE NEVER ACCESS YOUR PRIVATE KEYS." 
              }
            ].map((item, i) => (
              <div key={i} className="p-3 sm:p-5 bg-black/40 border border-red-500/5 rounded-xl sm:rounded-2xl text-left space-y-1 sm:space-y-2.5 group hover:bg-red-500/[0.02] hover:border-red-500/20 transition-all duration-300">
                 <div className="flex items-center gap-1.5 sm:gap-2.5 text-zinc-600 group-hover:text-red-400 transition-colors">
                    <span className="sm:scale-125">{item.icon}</span>
                    <h5 className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest truncate">{item.title}</h5>
                 </div>
                 <p className="text-[8px] sm:text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-tight italic group-hover:text-zinc-400 transition-colors">
                    {item.body}
                 </p>
              </div>
            ))}
          </div>

          {/* Footer & CTA */}
          <div className="w-full space-y-3 sm:space-y-6">
            <button 
              onClick={onClose}
              className="w-full py-4 sm:py-5 bg-zinc-900 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] rounded-xl border border-red-500/20 transition-all duration-500 hover:bg-emerald-600 active:bg-emerald-600 focus:bg-emerald-600 hover:border-emerald-500 shadow-[0_0_30px_rgba(239,68,68,0.1)] hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] active:scale-[0.98]"
            >
              ACKNOWLEDGE AND CONTINUE
            </button>
            <div className="flex items-center justify-center gap-2 sm:gap-4 text-[7px] sm:text-[8px] font-black text-zinc-800 uppercase tracking-[0.1em] sm:tracking-[0.2em] whitespace-nowrap overflow-hidden">
              REGISTRY SYNC ESTABLISHED // ACCESS GRANTED
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
