
import React from 'react';
import { EyeOff, Zap, Shield, Fingerprint, Lock, Globe } from 'lucide-react';
import { TechLabel } from './docs/DocHelpers';

export const SovereignPrimitive: React.FC = () => {
  return (
    <section className="px-6 md:px-20 py-24 bg-[#020202] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-zinc-900" />
            <span className="text-zinc-500 font-black text-[10px] uppercase tracking-[0.6em]">VIGIL LAYER 0.5 STANDARD</span>
          </div>
          <h2 className="text-5xl md:text-[9rem] font-black text-white italic uppercase tracking-tighter leading-[0.8] drop-shadow-2xl">
            DATA <br/> SOVEREIGNTY.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* External Telemetry Block (Disabled State) */}
          <div className="p-12 bg-[#080808]/50 border border-zinc-900 rounded-[2.5rem] relative overflow-hidden group opacity-40">
             <div className="absolute top-8 right-10">
                <EyeOff className="text-zinc-800" size={32} />
             </div>
             <div className="space-y-6">
                <div className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] text-center">CLOUD_SECURITY</div>
                <h3 className="text-4xl font-black text-zinc-700 italic uppercase text-center tracking-tight">EXTERNAL TELEMETRY</h3>
             </div>
          </div>

          {/* Local Intent Block (Active State) */}
          <div className="p-12 bg-emerald-600/5 border-2 border-emerald-500/20 rounded-[2.5rem] relative overflow-hidden group shadow-[0_0_80px_rgba(16,185,129,0.05)] animate-sync-color-border">
             <div className="absolute top-8 right-10">
                <Zap className="text-emerald-500 animate-pulse" size={32} />
             </div>
             <div className="space-y-6">
                <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] text-center">LOCAL_INTENT</div>
                <h3 className="text-4xl font-black text-emerald-400 italic uppercase text-center tracking-tight drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">Zero-Knowledge Index</h3>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center pt-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex gap-8 items-start">
               <Fingerprint className="w-12 h-12 text-zinc-800 shrink-0 mt-2" strokeWidth={1} />
               <p className="text-xl md:text-3xl text-zinc-400 font-medium leading-relaxed italic">
                 "Privacy is not just a right; it is a <span className="text-white border-b-2 border-zinc-800 pb-1">security primitive.</span> VIGIL doesn't watch the network. It validates intent locally—inside your browser. Your history stays in your browser. Your keys stay in your wallet."
               </p>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-end gap-10">
             <div className="text-right space-y-2 opacity-60">
                <div className="text-[12px] font-black text-zinc-500 uppercase tracking-widest">VIG_INTEL_SYSTEM</div>
                <div className="flex items-center gap-3 justify-end">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                   <span className="text-[14px] font-black text-emerald-500 uppercase italic tracking-tighter">LOCAL_INTENT_SYNC_OK</span>
                </div>
                <div className="text-[9px] font-mono text-zinc-800 uppercase tracking-widest pt-1">AES-256-L0.5 // SYS_REF: VIG-COMMS-2026-X</div>
             </div>
             
             <div className="grid grid-cols-2 gap-3 w-full">
                <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-2 group hover:border-blue-500/20 transition-all">
                   <Lock size={16} className="text-zinc-700 group-hover:text-blue-500 transition-colors" />
                   <h5 className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">KEYS: LOCAL</h5>
                </div>
                <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-2 group hover:border-emerald-500/20 transition-all">
                   <Globe size={16} className="text-zinc-700 group-hover:text-emerald-500 transition-colors" />
                   <h5 className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">NET: ISOLATED</h5>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
