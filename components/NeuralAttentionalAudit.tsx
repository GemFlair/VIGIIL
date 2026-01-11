
import React, { useState, useEffect, useRef } from 'react';
import { BrainCircuit, Activity, Eye, ShieldAlert, ShieldCheck, Zap, Target, Wind, Lock, AlertCircle, RefreshCcw, Fingerprint, Crosshair, Binary, Scan, Search } from 'lucide-react';

const GENERATE_ADDRESS = () => {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let addr = "";
  for (let i = 0; i < 44; i++) addr += chars.charAt(Math.floor(Math.random() * chars.length));
  return addr;
};

const MUTATE_ADDRESS = (addr: string) => {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  const pos = 10 + Math.floor(Math.random() * 24);
  let newChar = chars.charAt(Math.floor(Math.random() * chars.length));
  while (newChar === addr[pos]) newChar = chars.charAt(Math.floor(Math.random() * chars.length));
  return { mutated: addr.substring(0, pos) + newChar + addr.substring(pos + 1), pos };
};

export const NeuralAttentionalAudit: React.FC = () => {
  const [gameState, setGameState] = useState<'IDLE' | 'SCANNING' | 'REPORT'>('IDLE');
  const [address, setAddress] = useState('');
  const [poisonPos, setPoisonPos] = useState(-1);
  const [coverage, setCoverage] = useState<number[]>(new Array(44).fill(0));
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPoisoned, setIsPoisoned] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [auditResult, setAuditResult] = useState<{ score: number; blindSpots: number; result: 'SAFE' | 'BREACHED' } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const startAudit = () => {
    const base = GENERATE_ADDRESS();
    const shouldPoison = Math.random() > 0.5;
    if (shouldPoison) {
      const { mutated, pos } = MUTATE_ADDRESS(base);
      setAddress(mutated);
      setPoisonPos(pos);
      setIsPoisoned(true);
    } else {
      setAddress(base);
      setIsPoisoned(false);
      setPoisonPos(-1);
    }
    setCoverage(new Array(44).fill(0));
    setGameState('SCANNING');
    setStartTime(Date.now());
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (gameState !== 'SCANNING' || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Update coverage based on proximity to character pods
    const pods = containerRef.current.querySelectorAll('.char-pod');
    const newCoverage = [...coverage];
    pods.forEach((pod, i) => {
      const pRect = pod.getBoundingClientRect();
      const pCenterX = pRect.left + pRect.width / 2 - rect.left;
      const pCenterY = pRect.top + pRect.height / 2 - rect.top;
      const dist = Math.sqrt(Math.pow(x - pCenterX, 2) + Math.pow(y - pCenterY, 2));
      
      if (dist < (window.innerWidth < 768 ? 40 : 60)) {
        newCoverage[i] = Math.min(100, newCoverage[i] + 5);
      }
    });
    setCoverage(newCoverage);
  };

  const finalizeAudit = (userDecidedPoison: boolean) => {
    const avgCoverage = coverage.reduce((a, b) => a + b, 0) / 44;
    const blindSpots = coverage.filter(c => c < 30).length;
    const isCorrect = userDecidedPoison === isPoisoned;

    setAuditResult({
      score: Math.round(avgCoverage),
      blindSpots,
      result: isCorrect ? 'SAFE' : 'BREACHED'
    });
    setGameState('REPORT');

    const currentBri = parseInt(localStorage.getItem('vigil_user_bri') || '100');
    const delta = isCorrect ? (blindSpots < 5 ? 8 : 2) : -20;
    localStorage.setItem('vigil_user_bri', Math.max(0, Math.min(100, currentBri + delta)).toString());
  };

  return (
    <section id="neural-audit" className="px-6 md:px-20 py-12 bg-[#020202] relative z-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ 
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BrainCircuit className="w-5 h-5 text-cyan-500 animate-pulse" />
              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.6em]">Path 05 // Cognitive Audit</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
              Saccadic <br/> Depth.
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl font-medium italic leading-relaxed mt-6">
              "Mapping the 'Attentional Blind Spots' where your brain hallucinates security while skipping over data."
            </p>
          </div>

          {gameState === 'IDLE' && (
            <div className="space-y-8 animate-in fade-in duration-700">
              <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] space-y-6">
                 <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
                   <Target className="w-4 h-4 text-cyan-500" /> Audit Protocol
                 </h4>
                 <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                   This diagnostic measures <span className="text-white">Attentional Velocity</span>. You must physically scan every character cluster to "Clear the Fog." If you guess based on memory, the audit will fail.
                 </p>
              </div>
              <button 
                onClick={startAudit}
                className="w-full py-6 bg-cyan-600 text-white text-[12px] font-black uppercase tracking-[0.5em] rounded-2xl hover:bg-cyan-500 transition-all shadow-[0_0_40px_rgba(6,182,212,0.2)] active:scale-95"
              >
                INITIATE DEPTH AUDIT
              </button>
            </div>
          )}

          {gameState === 'REPORT' && auditResult && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
               <div className={`p-10 rounded-[3rem] border-2 space-y-8 ${auditResult.result === 'SAFE' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                  <div className="flex items-center justify-between">
                     <div>
                        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Audit Outcome</div>
                        <div className={`text-4xl font-black italic uppercase ${auditResult.result === 'SAFE' ? 'text-emerald-500' : 'text-red-500'}`}>
                          {auditResult.result}
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Depth Score</div>
                        <div className="text-4xl font-black text-white italic">{auditResult.score}%</div>
                     </div>
                  </div>
                  <div className="h-[1px] w-full bg-zinc-800/50" />
                  <div className="flex items-center gap-6">
                     <div className="flex-1 space-y-2">
                        <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Attentional Gaps</div>
                        <div className="text-xl font-black text-white italic">{auditResult.blindSpots} Clusters</div>
                     </div>
                     <div className="flex-1 space-y-2 text-right">
                        <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Cognitive Load</div>
                        <div className="text-xl font-black text-cyan-500 italic">OPTIMAL</div>
                     </div>
                  </div>
               </div>
               <button 
                  onClick={startAudit}
                  className="w-full py-5 border border-zinc-800 text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl hover:text-white hover:bg-zinc-900 transition-all flex items-center justify-center gap-3"
                >
                  <RefreshCcw className="w-4 h-4" /> RE-CALIBRATE NEURAL PATH
                </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
          <div 
            ref={containerRef}
            onPointerMove={handlePointerMove}
            className={`relative min-h-[500px] md:min-h-[600px] bg-[#050505] border-2 rounded-[3rem] md:rounded-[4rem] overflow-hidden flex flex-col items-center justify-center transition-all duration-700 touch-none ${
              gameState === 'SCANNING' ? 'border-cyan-600/40 cursor-none' : 'border-zinc-900 shadow-2xl'
            }`}
          >
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500 opacity-30" />
              <div className="absolute left-1/2 top-0 h-full w-[1px] bg-cyan-500 opacity-30" />
            </div>

            {gameState === 'IDLE' && (
              <div className="text-center space-y-8 animate-in fade-in duration-1000">
                <div className="relative inline-block">
                   <Eye className="w-24 h-24 text-zinc-700" strokeWidth={1} />
                   <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-zinc-400 uppercase tracking-[0.4em]">Depth Sensor Offline</h4>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest italic">NEURAL_IDLE_STATE</p>
                </div>
              </div>
            )}

            {gameState === 'SCANNING' && (
              <div className="w-full h-full relative flex flex-col justify-center px-6 md:px-12 select-none">
                <div className="absolute top-12 left-12 right-12 flex justify-between items-center pointer-events-none">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                      <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Saccadic Mapping Active</span>
                   </div>
                   <div className="text-[9px] font-mono text-zinc-600 uppercase hidden sm:block">Subject: BIOMETRIC_01</div>
                </div>

                <div className="space-y-12 md:space-y-16 pt-12 md:pt-0">
                  <div className="space-y-4">
                     <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Biological Task: Clear the entropy fog to verify payload.</span>
                     
                     <div className="relative grid grid-cols-11 md:grid-cols-22 gap-0 border border-zinc-900/50 bg-black/40 rounded-2xl overflow-hidden p-1">
                        {address.split('').map((char, i) => (
                          <div
                            key={i}
                            className="char-pod relative aspect-square flex items-center justify-center font-mono text-xs md:text-2xl transition-all duration-300"
                          >
                             <div 
                                className="absolute inset-0 z-10 bg-zinc-950 transition-opacity duration-300 pointer-events-none" 
                                style={{ opacity: 1 - (coverage[i] / 100) }}
                             />
                             <span className={`${coverage[i] > 50 ? 'text-white' : 'text-zinc-600'} ${coverage[i] > 90 ? 'scale-110' : ''}`}>
                               {char}
                             </span>
                             <div 
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 shadow-[0_0_8px_#06b6d4] transition-all" 
                                style={{ width: `${coverage[i]}%`, opacity: coverage[i] / 100 }} 
                             />
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="flex justify-center gap-4 md:gap-6">
                     <button 
                       onClick={() => finalizeAudit(false)}
                       className="flex-1 max-w-[200px] py-4 bg-emerald-600/10 border border-emerald-500/30 rounded-xl text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-lg active:scale-95"
                     >
                       VERIFIED_TRUST
                     </button>
                     <button 
                       onClick={() => finalizeAudit(true)}
                       className="flex-1 max-w-[200px] py-4 bg-red-600/10 border border-red-500/30 rounded-xl text-[10px] font-black text-red-500 uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-lg active:scale-95"
                     >
                       POISON_DETECTED
                     </button>
                  </div>
                </div>

                {/* Attentional Aperture Visualizer (The Cursor/Touch Lens) */}
                <div 
                  className="absolute pointer-events-none z-30"
                  style={{ 
                    left: mousePos.x, 
                    top: mousePos.y,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                   <div className="w-24 h-24 md:w-40 md:h-40 border border-cyan-500/30 rounded-full flex items-center justify-center backdrop-blur-[1px]">
                      <div className="w-8 h-8 md:w-12 md:h-12 border-2 border-cyan-500 rounded-full animate-ping opacity-40" />
                      <div className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_15px_#fff]" />
                      <Crosshair className="w-5 h-5 md:w-6 md:h-6 text-cyan-400/60 absolute" strokeWidth={1} />
                   </div>
                </div>
              </div>
            )}

            {gameState === 'REPORT' && auditResult && (
               <div className="w-full h-full p-8 md:p-16 flex flex-col items-center justify-center space-y-12 animate-in zoom-in duration-700">
                  <div className="relative">
                     <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-zinc-900 flex items-center justify-center relative overflow-hidden">
                        <Activity className={`w-10 h-10 md:w-12 md:h-12 ${auditResult.result === 'SAFE' ? 'text-emerald-500' : 'text-red-500 animate-pulse'}`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40" />
                     </div>
                     <div className="absolute -top-2 -right-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                       REF: 8821-H
                     </div>
                  </div>

                  <div className="text-center space-y-4">
                     <h3 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">Attentional Heatmap.</h3>
                     <div className="flex gap-0.5 justify-center">
                        {coverage.map((c, i) => (
                           <div key={i} className={`h-6 md:h-8 w-1.5 md:w-2 rounded-sm ${c > 70 ? 'bg-cyan-500' : c > 30 ? 'bg-zinc-800' : 'bg-red-500/40 animate-pulse'}`} />
                        ))}
                     </div>
                     <p className="text-zinc-600 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] max-w-sm mx-auto leading-relaxed">
                        RED ZONES INDICATE SUBCONSCIOUS SKIPPING. YOUR BRAIN RELIED ON MEMORY TO FILL THESE GAPS.
                     </p>
                  </div>

                  <div className="w-full max-w-xl p-8 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] space-y-6">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500">
                           <Wind className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                           <h5 className="text-xs font-black text-white uppercase tracking-widest">Subject Integrity Analysis</h5>
                           <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-tight">VIGIL NEURAL ENGINE v0.5</p>
                        </div>
                     </div>
                     <p className="text-zinc-400 text-sm leading-relaxed italic font-medium">
                        {auditResult.result === 'SAFE' 
                          ? "Saccadic Depth: OPTIMAL. You successfully identified the entropy node where visual mimicry was designed to succeed."
                          : "Subject Vulnerable: HIGH. You confirmed the intent despite significant attentional gaps in the core payload. Hallucination verified."}
                     </p>
                  </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
