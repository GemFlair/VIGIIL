
import React, { useState, useEffect, useRef } from 'react';
import { Eye, ShieldAlert, ShieldCheck, Zap, Brain, Target, Search, Activity, Lock, AlertCircle, RefreshCcw, Fingerprint, Crosshair, Binary, Scan } from 'lucide-react';

const GENERATE_ADDRESS = () => {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let addr = "";
  for (let i = 0; i < 44; i++) addr += chars.charAt(Math.floor(Math.random() * chars.length));
  return addr;
};

const MUTATE_ADDRESS = (addr: string) => {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  const pos = 12 + Math.floor(Math.random() * 20); // Focus mutation in the "noise" center
  let newChar = chars.charAt(Math.floor(Math.random() * chars.length));
  while (newChar === addr[pos]) {
    newChar = chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const mutated = addr.substring(0, pos) + newChar + addr.substring(pos + 1);
  return { mutated, pos };
};

export const NeuralFirewall: React.FC = () => {
  const [gameState, setGameState] = useState<'IDLE' | 'ACTIVE' | 'RESULT'>('IDLE');
  const [origin, setOrigin] = useState('');
  const [mimic, setMimic] = useState('');
  const [mutationPos, setMutationPos] = useState(-1);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [startTime, setStartTime] = useState(0);
  const [score, setScore] = useState({ time: 0, accuracy: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);

  const startTraining = () => {
    const base = GENERATE_ADDRESS();
    const { mutated, pos } = MUTATE_ADDRESS(base);
    setOrigin(base);
    setMimic(mutated);
    setMutationPos(pos);
    setGameState('ACTIVE');
    setStartTime(Date.now());
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (gameState !== 'ACTIVE' || !containerRef.current) return;
    
    // Find which character pod the pointer is currently over (useful for touch)
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const pod = elements.find(el => el.classList.contains('char-interceptor-pod'));
    if (pod) {
      const index = parseInt(pod.getAttribute('data-index') || '-1');
      if (index !== -1) setHoverIndex(index);
    }
  };

  const handleIdentityCheck = (index: number) => {
    if (gameState !== 'ACTIVE') return;
    const duration = (Date.now() - startTime) / 1000;
    const isCorrect = index === mutationPos;
    
    setScore({
      time: duration,
      accuracy: isCorrect ? 100 : 0
    });
    setGameState('RESULT');
    
    const currentBri = parseInt(localStorage.getItem('vigil_user_bri') || '100');
    const delta = isCorrect ? (duration < 4 ? 5 : 2) : -12;
    localStorage.setItem('vigil_user_bri', Math.max(0, Math.min(100, currentBri + delta)).toString());
  };

  return (
    <section id="neural-firewall" className="px-6 md:px-20 py-12 bg-[#020202] relative z-10 overflow-hidden border-t border-zinc-900/50">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02]" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-purple-500 animate-pulse" />
              <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.6em]">Path 04 // Neural Firewall</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
              Saccadic <br/> Trainer.
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl font-medium italic leading-relaxed mt-6">
              "Training the biological eye to intercept visual entropy collisions before they bypass cognitive awareness."
            </p>
          </div>

          <div className="space-y-8">
            <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Scan className="w-5 h-5 text-purple-500" />
                </div>
                <h4 className="text-sm font-black text-white uppercase tracking-widest">Protocol Instructions</h4>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-black text-purple-500 shrink-0">1</div>
                  <p className="text-zinc-500 text-sm leading-relaxed italic">Sweep your {gameState === 'ACTIVE' ? 'finger/cursor' : 'cursor'} over the <span className="text-white font-bold">Mutated Payload</span> to unblur data.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-black text-purple-500 shrink-0">2</div>
                  <p className="text-zinc-500 text-sm leading-relaxed italic">Compare the highlighted character against the <span className="text-white font-bold">Reference Protocol</span>.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center text-[10px] font-black text-white shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.4)]">3</div>
                  <p className="text-white text-sm font-bold leading-relaxed uppercase tracking-tight">
                    <span className="text-purple-400">CLICK/TAP</span> the single anomaly to neutralize the breach.
                  </p>
                </li>
              </ul>
            </div>

            {gameState === 'IDLE' && (
              <button 
                onClick={startTraining}
                className="w-full py-6 bg-purple-600 text-white text-[12px] font-black uppercase tracking-[0.5em] rounded-2xl hover:bg-purple-500 transition-all shadow-[0_0_40px_rgba(168,85,247,0.2)] active:scale-95"
              >
                INITIALIZE SACCADIC SCAN
              </button>
            )}

            {gameState === 'RESULT' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className={`p-8 rounded-[2rem] border-2 flex items-center justify-between ${score.accuracy === 100 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                   <div>
                      <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Latency</div>
                      <div className="text-3xl font-black text-white italic">{score.time.toFixed(2)}s</div>
                   </div>
                   <div className="text-right">
                      <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Accuracy</div>
                      <div className={`text-3xl font-black italic ${score.accuracy === 100 ? 'text-emerald-500' : 'text-red-500'}`}>{score.accuracy}%</div>
                   </div>
                </div>
                <button 
                  onClick={startTraining}
                  className="w-full py-5 border border-zinc-800 text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl hover:text-white hover:bg-zinc-900 transition-all flex items-center justify-center gap-3"
                >
                  <RefreshCcw className="w-4 h-4" /> RETRY ASSESSMENT
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div 
            ref={containerRef}
            onPointerMove={handlePointerMove}
            className={`relative min-h-[500px] md:min-h-[600px] bg-[#050505] border-2 rounded-[3rem] md:rounded-[4rem] overflow-hidden flex flex-col items-center justify-center transition-all duration-700 touch-none ${
              gameState === 'ACTIVE' ? 'border-purple-600/40 cursor-crosshair' : 'border-zinc-900'
            }`}
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
            </div>

            {gameState === 'IDLE' && (
              <div className="text-center space-y-8 animate-in fade-in duration-1000">
                <div className="relative inline-block">
                   <Binary className="w-24 h-24 text-zinc-700" strokeWidth={1} />
                   <div className="absolute inset-0 bg-purple-500/5 blur-3xl rounded-full" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-zinc-400 uppercase tracking-[0.4em]">Awaiting Calibration</h4>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest italic">NEURAL_IDLE_STATE</p>
                </div>
              </div>
            )}

            {gameState === 'ACTIVE' && (
              <div className="w-full h-full relative flex flex-col justify-center px-6 md:px-12 select-none">
                <div className="absolute top-8 left-8 right-8 flex justify-between items-center pointer-events-none">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
                      <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Breach Active</span>
                   </div>
                   <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest hidden sm:block">Node: VIG-SACC-25</div>
                </div>

                <div className="space-y-12 md:space-y-20 pt-12 md:pt-0">
                  {/* Reference Display */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Reference Protocol</span>
                       <div className="h-[1px] w-8 bg-zinc-900" />
                    </div>
                    <div className="font-mono text-[10px] md:text-xl text-zinc-500 flex flex-wrap opacity-40 blur-[0.5px] max-w-full">
                      {origin.split('').map((c, i) => (
                        <div key={i} className={`w-[1.2ch] text-center transition-colors duration-300 ${hoverIndex === i ? 'text-white opacity-100 blur-0 scale-125 font-black' : ''}`}>
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interceptor Grid */}
                  <div className="space-y-4 relative">
                    <div className="flex items-center gap-3">
                       <span className="text-[9px] font-black text-purple-500 uppercase tracking-[0.3em]">Mutated Payload</span>
                       <div className="h-[1px] w-12 bg-purple-900/30" />
                    </div>
                    
                    <div className="relative grid grid-cols-11 md:grid-cols-22 gap-0 border border-zinc-900/50 bg-black/40 rounded-2xl overflow-hidden p-1">
                      {mimic.split('').map((char, i) => (
                        <button
                          key={i}
                          data-index={i}
                          onPointerEnter={() => setHoverIndex(i)}
                          onPointerLeave={() => setHoverIndex(-1)}
                          onClick={(e) => {
                            e.preventDefault();
                            handleIdentityCheck(i);
                          }}
                          className={`
                            char-interceptor-pod relative aspect-square flex items-center justify-center font-mono text-xs md:text-2xl transition-all duration-300
                            ${hoverIndex === i ? 'bg-purple-600 text-white z-10 scale-125 shadow-2xl rounded-lg' : 'text-zinc-800 blur-[4px] hover:blur-0'}
                          `}
                        >
                          {char}
                          {hoverIndex === i && (
                            <div className="absolute -top-16 left-1/2 -translate-x-1/2 pointer-events-none animate-in fade-in zoom-in duration-200">
                               <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl shadow-2xl whitespace-nowrap flex flex-col items-center gap-1">
                                  <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Expected</span>
                                  <span className="text-xl font-black text-emerald-500">{origin[i]}</span>
                                  <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-900 border-r border-b border-zinc-800 rotate-45" />
                               </div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
                  <div className="inline-flex items-center gap-4 px-6 py-2 bg-zinc-950 border border-zinc-900 rounded-full shadow-lg">
                     <Search className="w-3 h-3 text-purple-500" />
                     <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                        Sweep the grid to scan for mutations.
                     </p>
                  </div>
                </div>
              </div>
            )}

            {gameState === 'RESULT' && (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-12 space-y-12 animate-in zoom-in duration-700">
                <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center border-2 ${score.accuracy === 100 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-600/10 border-red-600/30'}`}>
                  {score.accuracy === 100 ? <ShieldCheck className="w-12 h-12 text-emerald-500" /> : <ShieldAlert className="w-12 h-12 text-red-600" />}
                </div>
                
                <div className="text-center space-y-4">
                  <h3 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter">
                    {score.accuracy === 100 ? 'Breach Neutralized.' : 'Protocol Failure.'}
                  </h3>
                  <div className="flex items-center justify-center gap-8">
                     <div className="text-center">
                        <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Index</div>
                        <div className="font-mono text-xl text-white">#{mutationPos}</div>
                     </div>
                     <div className="h-8 w-[1px] bg-zinc-800" />
                     <div className="text-center">
                        <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Mutation</div>
                        <div className="font-mono text-xl text-purple-500">{origin[mutationPos]} → {mimic[mutationPos]}</div>
                     </div>
                  </div>
                </div>

                <div className="w-full max-w-lg p-10 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] space-y-6 text-center relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                      <Fingerprint className="w-24 h-24 text-white" />
                   </div>
                   <p className="text-zinc-500 text-sm md:text-base leading-relaxed italic font-medium relative z-10">
                     {score.accuracy === 100 
                       ? "Saccadic Focus: OPTIMAL. You successfully identified the entropy node where visual mimicry was designed to succeed."
                       : "Cognitive Bypass: CONFIRMED. Your biological eye prioritized the familiar suffix anchors, allowing the mutation to pass."}
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
