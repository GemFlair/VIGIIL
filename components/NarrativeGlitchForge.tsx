import React, { useState, useRef, useEffect } from 'react';
import { 
  Zap, Share2, Download, Film, Radio, 
  Target, Activity, Terminal, Eye, 
  AlertTriangle, RefreshCcw, Layers, 
  Settings2, Flame, Cpu, Box, ChevronRight
} from 'lucide-react';
import { TechLabel } from './docs/DocHelpers';

type DistractionLevel = 'TACTICAL' | 'CORRUPTED' | 'TOTAL_BREACH';

interface DailyDirective {
  day: number;
  word: string;
  subtext: string;
  code: string;
}

const DIRECTIVES: DailyDirective[] = [
  { day: 1, word: "Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90", subtext: "Looks right.", code: "VIG-01-CLARITY" },
  { day: 2, word: "TRUST", subtext: "A VULNERABILITY WRAPPED IN A PROMISE.", code: "VIG-02-GEN" },
  { day: 3, word: "CUSTODY", subtext: "THE EXIT IS A BUTTON. IT CAN BE DELETED.", code: "VIG-03-GEN" },
  { day: 4, word: "INFLUENCE", subtext: "THE CROWD IS A HUMAN-LAYER BOTNET.", code: "VIG-04-GEN" },
  { day: 5, word: "LOSS", subtext: "NINETEEN PARTS BELIEF. ONE PART REALITY.", code: "VIG-05-GEN" },
  { day: 10, word: "ENTROPY", subtext: "CHAOS IS THE ADVERSARY'S FUEL.", code: "VIG-10-INTEL" },
  { day: 15, word: "BETRAYAL", subtext: "INSTITUTIONS ARE MONOLITHS OF RISK.", code: "VIG-15-INTEL" },
  { day: 20, word: "MIMICRY", subtext: "THE POISON WEARS A FAMILIAR FACE.", code: "VIG-20-WAR" },
  { day: 25, word: "SACCADE", subtext: "THE BLIND SPOT IS WHERE THE THEFT LIVES.", code: "VIG-25-WAR" },
  { day: 30, word: "VIGIL", subtext: "VIGILANCE IS THE ONLY PERMANENT SHIELD.", code: "VIG-30-FINAL" },
];

export const NarrativeGlitchForge: React.FC = () => {
  const [day, setDay] = useState(1);
  const [level, setLevel] = useState<DistractionLevel>('CORRUPTED');
  const [isExporting, setIsExporting] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);
  
  const current = DIRECTIVES.find(d => d.day === day) || DIRECTIVES[0];

  const handleExport = async () => {
    if (!captureRef.current) return;
    setIsExporting(true);
    await new Promise(r => setTimeout(r, 400));
    try {
      // @ts-ignore
      const canvas = await window.html2canvas(captureRef.current, {
        backgroundColor: '#050505',
        scale: 2.5,
        logging: false,
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        width: 1080,
        height: 1080,
        onclone: (clonedDoc: Document) => {
          const element = clonedDoc.getElementById('daily-glitch-canvas');
          if (element) {
            element.style.transform = 'none';
            element.style.width = '1080px';
            element.style.height = '1080px';
            element.style.position = 'relative';
          }
        }
      });
      const link = document.createElement('a');
      link.download = `VIGIL_DAILY_DAY${day}_${level}_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (err) {
      console.error("Export failure:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-12 space-y-16 animate-in fade-in duration-700">
      
      <div className="flex flex-col lg:flex-row justify-between items-end gap-8 border-b border-zinc-900 pb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-zinc-900" />
            <span className="text-red-500 font-black text-[10px] uppercase tracking-[0.6em]">Daily Distraction // Brand Growth</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
            Narrative <br/> Forge.
          </h2>
          <p className="text-zinc-500 text-lg font-medium italic max-w-xl">
            "Generate high-impact daily glitches. Feed the community with sovereign tactical imagery."
          </p>
        </div>

        <div className="flex gap-4">
           <button 
             onClick={handleExport}
             disabled={isExporting}
             className="px-10 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-2xl active:scale-95 flex items-center gap-3 disabled:opacity-50"
           >
             {isExporting ? <Activity className="w-4 h-4 animate-spin" /> : <><Download className="w-5 h-5" /> EXPORT MASTER_FRAME</>}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* CONTROL SIDE */}
        <div className="lg:col-span-4 space-y-8">
           <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] space-y-10 shadow-2xl">
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <Layers className="w-4 h-4 text-blue-500" />
                   <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Select Narrative Node</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                   {[1, 2, 3, 4, 5, 10, 15, 20, 25, 30].map(d => (
                     <button 
                       key={d}
                       onClick={() => setDay(d)}
                       className={`aspect-square rounded-xl border text-[10px] font-black transition-all flex items-center justify-center ${day === d ? 'bg-blue-600 border-blue-500 text-white' : 'bg-black border-zinc-900 text-zinc-700 hover:text-zinc-300'}`}
                     >
                       {d < 10 ? `0${d}` : d}
                     </button>
                   ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <Flame className="w-4 h-4 text-red-500" />
                   <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Distraction Intensity</span>
                </div>
                <div className="space-y-2">
                   {(['TACTICAL', 'CORRUPTED', 'TOTAL_BREACH'] as DistractionLevel[]).map(l => (
                     <button 
                       key={l}
                       onClick={() => setLevel(l)}
                       className={`w-full p-4 rounded-xl border text-[9px] font-black uppercase tracking-[0.4em] text-left transition-all ${level === l ? 'bg-zinc-800 border-zinc-600 text-white' : 'bg-black border-zinc-900 text-zinc-600 hover:text-zinc-400'}`}
                     >
                       {l.replace('_', ' ')}
                     </button>
                   ))}
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-800 space-y-4">
                 <div className="flex items-center gap-3 text-[9px] font-black text-zinc-700 uppercase tracking-widest">
                    <Terminal className="w-3 h-3" /> System Logs
                 </div>
                 <div className="p-4 bg-black rounded-xl font-mono text-[9px] text-zinc-600 space-y-1">
                    <p>DAY_{day}_LOADED...</p>
                    <p>GLITCH_ENGINE: {level}</p>
                    <p>STATUS: READY_FOR_DEPOY</p>
                 </div>
              </div>
           </div>
        </div>

        {/* PREVIEW CANVAS */}
        <div className="lg:col-span-8">
           <div className="relative group w-full border-2 border-zinc-900 rounded-[3rem] bg-[#020202] p-4 md:p-8 shadow-inner overflow-hidden flex justify-center h-[500px] md:h-[600px] items-center">
              
              <div 
                id="daily-glitch-canvas"
                ref={captureRef}
                className="relative w-[1080px] h-[1080px] bg-[#050505] overflow-hidden flex flex-col items-center justify-center p-20 shrink-0"
                style={{ 
                  transform: 'scale(var(--canvas-scale))', 
                  transformOrigin: 'center' 
                }}
              >
                <style>{`
                  :root { --canvas-scale: 0.45; --accent-red: #ef4444; --accent-cyan: #22d3ee; }
                  @media (max-width: 1200px) { :root { --canvas-scale: 0.35; } }
                  @media (max-width: 768px) { :root { --canvas-scale: 0.28; } }
                  @media (max-width: 500px) { :root { --canvas-scale: 0.22; } }

                  @keyframes rgb-split {
                    0% { transform: translate(0); text-shadow: -2px 0 var(--accent-red), 2px 0 var(--accent-cyan); }
                    5% { transform: translate(-2px, 1px); text-shadow: -4px 0 var(--accent-red), 4px 0 var(--accent-cyan); }
                    10% { transform: translate(2px, -1px); text-shadow: -2px 0 var(--accent-red), 2px 0 var(--accent-cyan); }
                    15% { transform: translate(0); text-shadow: none; }
                    100% { transform: translate(0); }
                  }

                  @keyframes saccadic-pulse {
                    0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.4)); }
                    50% { opacity: 1; filter: drop-shadow(0 0 40px rgba(59, 130, 246, 0.7)); }
                  }

                  @keyframes micro-telemetry-scroll {
                    from { transform: translateY(0); }
                    to { transform: translateY(-50%); }
                  }

                  @keyframes chromatic-shift {
                    0%, 100% { filter: blur(0px); text-shadow: 1px 0 var(--accent-red), -1px 0 var(--accent-cyan); }
                    50% { filter: blur(0.5px); text-shadow: -1px 0 var(--accent-red), 1px 0 var(--accent-cyan); }
                  }

                  .glitch-text { position: relative; }
                  .lvl-CORRUPTED .glitch-text { animation: rgb-split 3s infinite linear alternate-reverse; }
                  .lvl-TOTAL_BREACH .glitch-text { animation: chromatic-shift 0.2s infinite linear; }
                `}</style>

                {/* Tactical Grid Background */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px]" />

                {/* Vertical Micro-Telemetry Sidebars */}
                <div className="absolute left-10 top-0 bottom-0 w-20 flex flex-col items-center overflow-hidden opacity-[0.05] font-mono text-[10px] text-white">
                  <div className="animate-[micro-telemetry_10s_linear_infinite] space-y-4 py-10">
                    {Array(20).fill("0x" + Math.random().toString(16).slice(2, 10).toUpperCase()).map((s, i) => <div key={i}>{s}</div>)}
                    {Array(20).fill("0x" + Math.random().toString(16).slice(2, 10).toUpperCase()).map((s, i) => <div key={i}>{s}</div>)}
                  </div>
                </div>
                <div className="absolute right-10 top-0 bottom-0 w-20 flex flex-col items-center overflow-hidden opacity-[0.05] font-mono text-[10px] text-white">
                  <div className="animate-[micro-telemetry_12s_linear_infinite_reverse] space-y-4 py-10">
                    {Array(20).fill("0x" + Math.random().toString(16).slice(2, 10).toUpperCase()).map((s, i) => <div key={i}>{s}</div>)}
                    {Array(20).fill("0x" + Math.random().toString(16).slice(2, 10).toUpperCase()).map((s, i) => <div key={i}>{s}</div>)}
                  </div>
                </div>

                <div className={`w-full h-full flex flex-col items-center justify-center text-center space-y-12 lvl-${level}`}>
                   
                   <div className="space-y-4 relative">
                      <div className="flex items-center justify-center gap-6 mb-12">
                         <div className="h-[2px] w-24 bg-zinc-900" />
                         <span className="text-[24px] font-black text-zinc-600 uppercase tracking-[1.2em]">DAY {day < 10 ? `0${day}` : day}</span>
                         <div className="h-[2px] w-24 bg-zinc-900" />
                      </div>
                      
                      {day === 1 ? (
                        <div className="relative font-mono tracking-tighter group">
                          {/* Saccadic Focus Brackets */}
                          <div className="absolute left-[-40px] top-[-40px] w-24 h-24 border-t-[4px] border-l-[4px] border-blue-500 animate-[saccadic-pulse_2s_infinite] rounded-tl-3xl" />
                          <div className="absolute right-[-40px] bottom-[-40px] w-24 h-24 border-b-[4px] border-r-[4px] border-blue-500 animate-[saccadic-pulse_2s_infinite] rounded-br-3xl opacity-60" />
                          
                          <div className="text-[7.5rem] font-black leading-none flex items-center">
                            <span className="text-white animate-[saccadic-pulse_3s_infinite] drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]">
                              {current.word.slice(0, 4)}
                            </span>
                            <span className="text-zinc-800 blur-[3.5px] opacity-40 px-6 scale-90">
                              {current.word.slice(4, -4)}
                            </span>
                            <span className="text-white animate-[saccadic-pulse_3s_infinite] drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]">
                              {current.word.slice(-4)}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <h1 
                          data-text={current.word}
                          className="text-[12rem] font-black text-white italic uppercase tracking-tighter leading-[0.75] glitch-text drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                        >
                          {current.word}
                        </h1>
                      )}
                   </div>

                   <div className="max-w-4xl pt-16 relative">
                      <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-1.5 h-16 bg-blue-600 rounded-full" />
                      <p className="text-5xl text-zinc-400 font-medium italic uppercase tracking-[0.2em] leading-relaxed">
                        "{current.subtext}"
                      </p>
                      {day === 1 && (
                        <div className="mt-8 flex items-center justify-center gap-4 text-blue-500/40">
                           <div className="h-[1px] w-12 bg-zinc-900" />
                           <span className="text-[14px] font-black uppercase tracking-[1em]">False_Confidence_Metric</span>
                           <div className="h-[1px] w-12 bg-zinc-900" />
                        </div>
                      )}
                   </div>

                   <div className="pt-24 opacity-30 flex items-center gap-16">
                      <div className="text-right">
                         <div className="text-2xl font-black uppercase tracking-widest text-zinc-500">Node_Ref</div>
                         <div className="text-sm font-mono text-zinc-700">{current.code}</div>
                      </div>
                      <div className="w-24 h-24 bg-white flex items-center justify-center rounded-[2rem] shadow-2xl">
                         <div className="w-12 h-12 bg-black rotate-45" />
                      </div>
                      <div className="text-left">
                         <div className="text-2xl font-black uppercase tracking-widest text-zinc-500">Auth_Layer</div>
                         <div className="text-sm font-mono text-zinc-700">HUMAN_PRIMITIVE</div>
                      </div>
                   </div>
                </div>

                {/* Final Kinetic Letterboxing / Vignette */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_400px_rgba(0,0,0,1)]" />
                <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.01)_3px,rgba(255,255,255,0.01)_4px)]" />
              </div>

           </div>
           <div className="mt-6 flex items-center justify-between opacity-40">
              <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">
                Output Format: 1080x1080 PNG [Optimized for Loop/Static]
              </p>
              <div className="flex items-center gap-4">
                 <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                 <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">RENDER_ENGINE: v1.0.6_TACTICAL</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
