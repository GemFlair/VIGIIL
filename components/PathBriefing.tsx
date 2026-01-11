
import React from 'react';
import { Info, Target, AlertTriangle, ShieldCheck, ChevronRight } from 'lucide-react';

interface PathBriefingProps {
  pathNumber: string;
  title: string;
  objective: string;
  threatVector: string;
  rationale: string;
  colorClass?: string;
}

export const PathBriefing: React.FC<PathBriefingProps> = ({ 
  pathNumber, 
  title, 
  objective, 
  threatVector, 
  rationale, 
  colorClass = "text-blue-500" 
}) => {
  const accentBorder = colorClass.replace('text-', 'border-');
  const accentBg = colorClass.replace('text-', 'bg-');

  return (
    <div className="px-6 md:px-20 py-2 bg-[#020202] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`p-8 md:p-10 border-l-2 ${accentBorder} bg-zinc-950/30 rounded-r-2xl relative group transition-all duration-500 hover:bg-zinc-950/50`}>
          {/* Background Decorative ID */}
          <div className="absolute top-0 right-0 p-4 opacity-[0.02] select-none pointer-events-none">
             <span className="text-[10rem] font-black italic leading-none">{pathNumber}</span>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className={`px-2.5 py-1 ${accentBg} text-black text-[9px] font-black uppercase tracking-[0.2em] rounded`}>
                    PATH_{pathNumber}
                  </div>
                  <div className={`h-[1px] w-8 ${accentBg} opacity-30`} />
                </div>
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">{title}</h3>
              </div>
              
              <div className="flex items-center gap-4 group/btn cursor-default">
                 <div className={`w-10 h-10 rounded-xl border ${accentBorder}/30 flex items-center justify-center shrink-0 bg-zinc-900/50`}>
                    <Target className={`w-5 h-5 ${colorClass}`} />
                 </div>
                 <div className="space-y-0.5">
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] block">Objective</span>
                    <span className="text-[13px] font-bold text-zinc-200 uppercase tracking-tight leading-tight group-hover/btn:text-white transition-colors">{objective}</span>
                 </div>
              </div>
            </div>

            <div className="lg:col-span-1 hidden lg:flex items-center justify-center">
               <div className="h-20 w-[1px] bg-zinc-900/80" />
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
               <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                     <AlertTriangle className="w-4 h-4 text-red-900/80" />
                     <h4 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em]">Vector Analysis</h4>
                  </div>
                  <p className="text-sm md:text-[15px] text-zinc-300 font-medium italic leading-relaxed">
                    {threatVector}
                  </p>
               </div>
               <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                     <ShieldCheck className={`w-4 h-4 ${colorClass} opacity-80`} />
                     <h4 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em]">Operational Rationale</h4>
                  </div>
                  <p className="text-sm md:text-[15px] text-zinc-400 font-medium italic leading-relaxed">
                    {rationale}
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
