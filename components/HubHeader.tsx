import React from 'react';

export const HubHeader = ({ title, subtitle, number }: { title: string; subtitle: string; number: string }) => (
  <div className="px-6 md:px-20 pt-8 pb-4 bg-transparent border-t border-zinc-900/50 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
       <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-6 mb-4">
        <div className="px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-sm shadow-xl">SECURITY HUB {number}</div>
        <div className="h-[1px] flex-1 bg-zinc-900" />
      </div>
      <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">{title}</h2>
      <p className="text-zinc-600 text-[10px] md:text-sm font-black uppercase tracking-[0.4em] mt-6">{subtitle}</p>
    </div>
  </div>
);