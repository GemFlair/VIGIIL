
import React from 'react';

// Explicitly type components as React.FC to allow standard React props like 'key' and 'children'.
export const DocumentWatermark: React.FC<{ text: string }> = ({ text }) => (
  <div className="fixed inset-0 pointer-events-none flex items-center justify-center opacity-[0.012] overflow-hidden select-none z-0">
     <div className="text-[12vw] font-black uppercase tracking-tighter rotate-[-15deg] whitespace-nowrap">
       {text}
     </div>
  </div>
);

export const CornerMotif: React.FC<{ colorClass?: string }> = ({ colorClass = "text-blue-500/20" }) => (
  <div className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none">
    <div className={`w-full h-full border-r-[2px] border-b-[2px] rounded-br-2xl ${colorClass}`} />
  </div>
);

export const TechLabel: React.FC<{ text: string, color?: string }> = ({ text, color = "blue" }) => {
  const colors: Record<string, string> = {
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    red: "text-red-500 bg-red-500/10 border-red-500/20",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    cyan: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
    zinc: "text-zinc-500 bg-zinc-500/10 border-zinc-800",
  };
  return (
    <span className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-[0.2em] border ${colors[color] || colors.blue}`}>
      {text}
    </span>
  );
};

export const SectionHeader: React.FC<{ id: string, category: string, title: string, subtitle: string, colorClass?: string, bgGlow?: string }> = ({ id, category, title, subtitle, colorClass = "text-blue-500", bgGlow = "bg-blue-600/5" }) => (
  <header className="relative z-10 p-[1px] bg-gradient-to-br from-zinc-800 to-transparent rounded-[1.5rem] md:rounded-[28px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden mb-8 md:mb-20">
    <div className={`absolute top-0 right-0 w-[200px] md:w-[500px] h-[200px] md:h-[500px] ${bgGlow} blur-[80px] md:blur-[120px] rounded-full`} />
    <div className="bg-[#080808]/90 backdrop-blur-3xl rounded-[1.4rem] md:rounded-[27px] px-3 py-8 md:p-20 space-y-4 md:space-y-10 relative border border-white/[0.03]">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12">
        <div className="space-y-4 md:space-y-8">
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
             <div className="px-3 md:px-5 py-1 bg-white text-black text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] rounded-lg shadow-xl">{category}</div>
             <div className="px-3 md:px-5 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-[8px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{id}</div>
          </div>
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-2xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[1.0] md:leading-[0.85]">
              {title}
            </h1>
            <div className="flex items-center gap-3 md:gap-4">
              <div className={`h-[1px] md:h-[2px] w-8 md:w-16 ${colorClass.replace('text-', 'bg-')}`} />
              <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] text-[8px] md:text-xs">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export const DocCard: React.FC<{ children?: React.ReactNode, border?: string, glow?: boolean }> = ({ children, border = "zinc", glow = false }) => {
  const borders: Record<string, string> = {
    zinc: "border-zinc-800/50 group-hover:border-zinc-700",
    blue: "border-blue-900/30 group-hover:border-blue-600/30",
    red: "border-red-900/30 group-hover:border-red-600/30",
    emerald: "border-emerald-900/30 group-hover:border-emerald-600/30",
    cyan: "border-cyan-900/30 group-hover:border-cyan-600/30",
  };
  
  const glows: Record<string, string> = {
    blue: "bg-blue-600/5",
    red: "bg-red-600/5",
    emerald: "bg-emerald-600/5",
    cyan: "bg-cyan-600/5",
    zinc: "bg-white/5",
  };

  return (
    <div className={`group px-3 py-8 md:p-10 bg-[#0c0c0c]/60 backdrop-blur-xl border rounded-[1.5rem] md:rounded-[28px] shadow-xl relative overflow-hidden transition-all duration-500 ${borders[border]}`}>
      {glow && (
        <div className={`absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 ${glows[border] || glows.zinc} blur-[60px] md:blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      )}
      <div className="relative z-10">
        {children}
      </div>
      <CornerMotif colorClass={`opacity-0 group-hover:opacity-100 transition-opacity duration-700 text-${border === 'zinc' ? 'blue' : border}-500/20`} />
    </div>
  );
};

export const TechNote: React.FC<{ children?: React.ReactNode, title: string }> = ({ children, title }) => (
  <div className="px-4 py-6 md:p-8 bg-zinc-950/50 border border-zinc-900 rounded-[1.25rem] md:rounded-[28px] space-y-3">
    <div className="flex items-center gap-3">
       <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
       <h5 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{title}</h5>
    </div>
    <div className="text-sm text-zinc-500 font-medium leading-relaxed italic">
      {children}
    </div>
  </div>
);

export const ClauseFrame: React.FC<{ children?: React.ReactNode, id: string }> = ({ children, id }) => (
  <div className="relative pl-4 md:pl-12 border-l border-zinc-800 py-4 group">
    <div className="absolute left-0 top-6 w-3 md:w-8 h-[1px] bg-zinc-800 group-hover:bg-blue-600/50 transition-colors" />
    <div className="absolute left-[-0.65rem] md:left-[-1.5rem] top-5 px-1 md:px-1.5 py-0.5 bg-zinc-950 border border-zinc-900 rounded text-[6px] md:text-[8px] font-mono text-zinc-700 font-black group-hover:text-blue-500 group-hover:border-blue-900/50 transition-all">
      {id}
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);
