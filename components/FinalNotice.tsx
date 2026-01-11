import React from 'react';
import { AlertCircle } from 'lucide-react';

export const FinalNotice: React.FC = () => {
  return (
    <section className="px-6 md:px-20 py-8 bg-[#020202] relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="p-[1.5px] bg-gradient-to-r from-red-600 via-[#333] to-blue-600 rounded-[1.5rem] md:rounded-[28px] shadow-[0_0_60px_rgba(0,0,0,0.8)]">
          <div className="bg-black rounded-[1.5rem] md:rounded-[28px] px-8 py-10 md:py-12 md:px-16 text-center space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#fff,transparent_70%)]" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex flex-col items-center gap-3">
                <AlertCircle className="w-5 h-5 text-zinc-600" strokeWidth={1.5} />
                <h5 className="text-[10px] md:text-[11px] font-black text-white italic uppercase tracking-[0.6em]">
                  Disclaimer
                </h5>
              </div>

              <div className="max-w-3xl mx-auto">
                <p className="text-lg md:text-2xl text-zinc-300 font-medium leading-[1.3] italic">
                  "By using VIGIL, you acknowledge that <span className="text-white border-b border-zinc-800 pb-0.5">security is probabilistic</span>, <span className="text-white border-b border-zinc-800 pb-0.5">not absolute</span>, and that human vigilance remains essential even with advanced tooling."
                </p>
              </div>

              <div className="h-[1px] w-12 bg-zinc-900 mx-auto" />
              
              <div className="max-w-xl mx-auto">
                <p className="text-zinc-600 text-[10px] md:text-[11px] font-bold uppercase tracking-widest leading-relaxed">
                  Vigil provides informational security warnings and does not control or sign transactions. 
                  <span className="text-zinc-500"> Use of Vigil does not eliminate blockchain risk.</span>
                </p>
              </div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-zinc-950 border border-zinc-900/80 rounded-full shadow-inner group cursor-default">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                  Acknowledgement Registered
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};