import React, { useState, useEffect, useRef } from 'react';
import { Skull, RefreshCcw, Zap, HeartPulse, FlaskConical, ShieldCheck, ShieldX, Fingerprint, ChevronRight, Target, Activity, Scan, Binary, AlertCircle, Eye, Gauge, AlertTriangle, Terminal } from 'lucide-react';
import { generateCognitiveAutopsy, CognitiveAutopsyResponse } from '../services/geminiService';
import { AddressGlyph } from './AddressGlyph';
import { VigilScanner } from './VigilScanner';

const CHALLENGE_DURATION = 5.0;

const generatePoisonMimic = (real: string): string => {
  const prefix = real.slice(0, 4);
  const suffix = real.slice(-4);
  const charset = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let middle = "";
  for (let i = 0; i < real.length - 8; i++) {
    if (Math.random() > 0.65) {
      middle += real[i + 4];
    } else {
      middle += charset.charAt(Math.floor(Math.random() * charset.length));
    }
  }
  return prefix + middle + suffix;
};

export const AdversarialMimicryLab: React.FC = () => {
  const [realAddress, setRealAddress] = useState('');
  const [gameState, setGameState] = useState<'IDLE' | 'PREPARING' | 'CHALLENGE' | 'AUTOPSY'>('IDLE');
  const [options, setOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_DURATION);
  const [selected, setSelected] = useState<string | null>(null);
  const [autopsy, setAutopsy] = useState<CognitiveAutopsyResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentBri, setCurrentBri] = useState(100);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const savedBri = localStorage.getItem('vigil_user_bri');
    if (savedBri) setCurrentBri(parseInt(savedBri));
  }, []);

  const updateGlobalBri = (delta: number) => {
    const next = Math.max(0, Math.min(100, currentBri + delta));
    setCurrentBri(next);
    localStorage.setItem('vigil_user_bri', next.toString());
  };

  const initiateAttack = () => {
    if (realAddress.length < 32) return;
    setGameState('PREPARING');
    
    setTimeout(() => {
      const mimics = [
        generatePoisonMimic(realAddress),
        generatePoisonMimic(realAddress),
        generatePoisonMimic(realAddress),
        generatePoisonMimic(realAddress)
      ];
      const all = [...mimics, realAddress].sort(() => Math.random() - 0.5);
      setOptions(all);
      setGameState('CHALLENGE');
      setTimeLeft(CHALLENGE_DURATION);
      startTimer();
    }, 2800);
  };

  const startTimer = () => {
    const start = Date.now();
    timerRef.current = window.setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const remaining = Math.max(0, CHALLENGE_DURATION - elapsed);
      setTimeLeft(remaining);
      if (remaining === 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        handleSelection(null); 
      }
    }, 10);
  };

  const handleSelection = async (addr: string | null) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSelected(addr);
    setGameState('AUTOPSY');
    setIsAnalyzing(true);

    if (addr === realAddress) {
      updateGlobalBri(2);
    } else {
      updateGlobalBri(-8);
    }

    try {
      const report = await generateCognitiveAutopsy(realAddress, addr || options[0]);
      setAutopsy(report);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setGameState('IDLE');
    setOptions([]);
    setAutopsy(null);
    setSelected(null);
    setTimeLeft(CHALLENGE_DURATION);
  };

  const renderCollisionAddress = (addr: string, target: string) => {
    return (
      <div className="font-mono text-[9px] md:text-sm break-all leading-tight">
        {addr.split('').map((char, i) => {
          const isCollision = char === target[i];
          return (
            <span 
              key={i} 
              className={`transition-all duration-700 ${
                isCollision 
                  ? 'text-red-500 font-black drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] scale-110 inline-block' 
                  : 'text-white font-bold animate-pulse brightness-125'
              }`}
            >
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <section id="mimicry-lab" className="px-6 md:px-20 py-8 bg-[#020202] relative z-10 overflow-hidden border-t border-zinc-900/50 flex flex-col items-center">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05),transparent_70%)]" />
      </div>
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-stretch relative z-10">
        
        {/* LEFT FLANK: THE BRIEFING */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <FlaskConical className="w-4 h-4 text-red-600 animate-pulse" />
                <span className="text-[9px] font-black text-red-500 uppercase tracking-[0.6em]">Path 02 // Mimicry Lab</span>
              </div>
              <h2 className="text-3xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
                Trial <br/> by Fire.
              </h2>
            </div>

            {gameState === 'IDLE' && (
              <div className="space-y-6 animate-in fade-in duration-1000">
                <div className="relative pl-6 border-l-4 border-red-600/30">
                  <p className="text-base md:text-lg text-zinc-400 font-medium leading-relaxed italic">
                    "Testing the threshold of <span className="text-white">biological verification.</span> Can your brain detect a single character mutation in less than 5 seconds?"
                  </p>
                </div>
                
                <div className="p-6 bg-[#0a0a0a] border border-zinc-900 rounded-[2rem] space-y-4">
                   <div className="flex items-center gap-3">
                      <Terminal className="w-3.5 h-3.5 text-zinc-600" />
                      <h4 className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Technical Abstract</h4>
                   </div>
                   <p className="text-zinc-500 text-xs leading-relaxed font-medium italic">
                     VANITY_COLLISION_V3: Attackers utilize high-density GPU clusters to generate addresses sharing 4+4 character prefix/suffixes with your history.
                   </p>
                   <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                         <div className="text-[10px] font-black text-white italic">94.2%</div>
                         <div className="text-[8px] text-zinc-600 font-black uppercase tracking-widest">Failure Rate</div>
                      </div>
                      <div className="space-y-1">
                         <div className="text-[10px] font-black text-red-600 italic">CRITICAL</div>
                         <div className="text-[8px] text-zinc-600 font-black uppercase tracking-widest">Vector</div>
                      </div>
                   </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">SUBMIT REFERENCE PAYLOAD</label>
                    <Target className="w-3 h-3 text-zinc-800" />
                  </div>
                  <div className="flex gap-3">
                    <div className="hidden sm:block">{realAddress && <AddressGlyph address={realAddress} size="md" className="mt-1" />}</div>
                    <input 
                      type="text" 
                      value={realAddress}
                      onChange={(e) => setRealAddress(e.target.value)}
                      placeholder="PASTE TARGET ADDRESS..."
                      className="flex-1 bg-black border-2 border-zinc-900 rounded-xl py-4 px-6 text-xs font-mono text-white placeholder:text-zinc-900 focus:outline-none focus:border-red-600 transition-all uppercase shadow-inner"
                    />
                  </div>
                </div>
                <button 
                  onClick={initiateAttack}
                  disabled={realAddress.length < 32}
                  className="w-full py-5 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.5em] rounded-xl hover:bg-red-500 transition-all shadow-[0_0_40px_rgba(220,38,38,0.2)] disabled:opacity-30 flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  <Zap className="w-4 h-4 fill-white" /> COMMENCE COGNITIVE TRIAL
                </button>
              </div>
            )}

            {gameState === 'AUTOPSY' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className={`p-6 md:p-8 border-2 rounded-[2rem] space-y-6 relative overflow-hidden transition-all duration-700 bg-[#050505] ${selected === realAddress ? 'border-emerald-500/20' : 'border-red-500/20 shadow-[0_0_50px_rgba(220,38,38,0.1)]'}`}>
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-3">
                          <HeartPulse className={`w-6 h-6 ${selected === realAddress ? 'text-emerald-500' : 'text-red-500'}`} />
                          <span className={`text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] ${selected === realAddress ? 'text-emerald-500' : 'text-red-500'}`}>
                            Resilience Index: {selected === realAddress ? '+2%' : '-8%'}
                          </span>
                      </div>
                    </div>

                    <div className="space-y-4 relative z-10">
                      {!isAnalyzing && autopsy && (
                        <div className="space-y-4">
                            <p className="text-zinc-400 text-sm leading-relaxed font-medium italic">"{autopsy.autopsy}"</p>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
                                  <div className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">Bias</div>
                                  <div className="text-[9px] font-bold text-white uppercase italic">{autopsy.biologicalVulnerability}</div>
                              </div>
                              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
                                  <div className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">Anchor</div>
                                  <div className="text-[9px] font-bold text-white uppercase italic">{autopsy.visualAnchor}</div>
                              </div>
                            </div>
                        </div>
                      )}
                      {isAnalyzing && (
                          <div className="flex flex-col items-center py-6">
                            <VigilScanner label="GENERATING_COGNITIVE_AUTOPSY" />
                          </div>
                      )}
                    </div>
                </div>

                <button 
                  onClick={reset}
                  className="w-full py-4 border border-zinc-800 text-zinc-600 text-[9px] font-black uppercase tracking-[0.4em] rounded-xl hover:text-white hover:bg-zinc-900 transition-all flex items-center justify-center gap-3 group active:scale-95"
                >
                  <RefreshCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" /> RESET
                </button>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-zinc-900/50 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-zinc-700" />
                <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Subject Tracking: ACTIVE</span>
             </div>
             <div className="text-[8px] font-mono text-zinc-800 uppercase">Archive_ID: VIG-POI-X1</div>
          </div>
        </div>

        <div className="lg:col-span-7 h-full">
           <div className={`relative h-full min-h-[420px] md:min-h-[480px] bg-[#050505] border-2 rounded-[2.5rem] md:rounded-[3rem] flex flex-col items-center justify-center transition-all duration-700 overflow-hidden shadow-2xl ${
             gameState === 'CHALLENGE' ? 'border-red-600 scale-[1.01] shadow-[0_0_80px_rgba(220,38,38,0.1)]' : 'border-zinc-900'
           }`}>
             
             <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-white" />
                <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-white" />
                <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-white" />
                <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-white" />
             </div>

             {gameState === 'IDLE' && (
               <div className="flex flex-col items-center justify-center space-y-6 py-8 animate-in fade-in zoom-in duration-1000 px-6 scale-90 md:scale-100">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-red-600/5 blur-2xl group-hover:bg-red-600/10 transition-colors" />
                    <Fingerprint className="w-16 h-16 md:w-24 md:h-24 text-zinc-700 group-hover:text-zinc-600 transition-colors relative z-10" strokeWidth={1} />
                  </div>
                  <div className="text-center space-y-2 relative z-10">
                    <h3 className="text-base md:text-lg font-black text-zinc-400 uppercase tracking-[0.5em]">Awaiting Trial Identity</h3>
                    <div className="flex items-center justify-center gap-3">
                       <div className="h-[1px] w-4 bg-zinc-900" />
                       <p className="text-[8px] md:text-[9px] font-mono text-zinc-500 uppercase tracking-widest italic">CHAMBER_IDLE</p>
                       <div className="h-[1px] w-4 bg-zinc-900" />
                    </div>
                  </div>
               </div>
             )}

             {gameState === 'PREPARING' && (
                <div className="w-full h-full flex flex-col items-center justify-center gap-12 relative overflow-hidden px-6">
                   <div className="absolute top-0 left-0 w-full h-1 bg-red-600/60 blur-[2px] animate-[scan-horizontal_2s_linear_infinite]" />
                   <VigilScanner label="FORGING_ADVERSARIAL_MIMICS" status="critical" size="lg" />
                   <div className="text-center space-y-3">
                      <p className="text-[9px] font-mono text-red-500 uppercase tracking-[0.3em] bg-red-600/10 px-5 py-1.5 rounded-full border border-red-600/20">Entropy Injection: 88%</p>
                   </div>
                </div>
             )}

             {gameState === 'CHALLENGE' && (
               <div className="w-full h-full p-4 md:p-12 space-y-8 animate-in zoom-in duration-500 flex flex-col">
                  <div className="flex flex-col items-center gap-4">
                     <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                           <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-zinc-900 md:hidden" />
                           <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-zinc-900 hidden md:block" />
                           <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-red-600 transition-all duration-75 ease-linear md:hidden" strokeDasharray="213.6" strokeDashoffset={213.6 - (213.6 * (timeLeft / CHALLENGE_DURATION))} />
                           <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-red-600 transition-all duration-75 ease-linear hidden md:block" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * (timeLeft / CHALLENGE_DURATION))} />
                        </svg>
                        <span className="text-2xl md:text-4xl font-black italic text-white tracking-tighter tabular-nums">{timeLeft.toFixed(2)}</span>
                     </div>
                     <p className="text-[9px] md:text-[10px] font-black text-red-500 uppercase tracking-[0.4em] animate-pulse flex items-center gap-2">
                        <Scan className="w-4 h-4" /> IDENTIFY SOURCE
                     </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 max-w-xl mx-auto w-full flex-1 overflow-y-auto no-scrollbar">
                     {options.map((opt, i) => (
                       <button 
                        key={i} 
                        onClick={() => handleSelection(opt)}
                        className="group relative w-full overflow-hidden p-4 md:p-6 bg-black border border-zinc-900 rounded-2xl hover:border-red-600/60 transition-all flex items-center gap-4 md:gap-6 shadow-2xl active:scale-[0.98]"
                       >
                          <div className="absolute inset-0 bg-[#050505]/90 backdrop-blur-[20px] z-10 transition-all duration-700 group-hover:backdrop-blur-none group-hover:bg-transparent" />
                          
                          <div className="relative z-20 flex items-center gap-4 md:gap-6 w-full">
                             <div className="scale-75 md:scale-100 group-hover:scale-110 transition-transform duration-500">
                                <AddressGlyph address={opt} size="md" />
                             </div>
                             <div className="flex-1 text-left font-mono text-[9px] md:text-[14px] text-zinc-800 group-hover:text-zinc-100 break-all transition-all duration-500 italic blur-[3px] group-hover:blur-0 font-bold">
                                {opt.slice(0, 8)}...{opt.slice(-8)}
                             </div>
                             <div className="w-8 h-8 rounded-full border border-zinc-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-3 group-hover:translate-x-0">
                                <ChevronRight className="w-4 h-4 text-red-500" />
                             </div>
                          </div>
                       </button>
                     ))}
                  </div>
               </div>
             )}

             {gameState === 'AUTOPSY' && (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-12 animate-in fade-in duration-1000">
                   <div className="relative w-full max-w-2xl bg-black border-2 border-zinc-900 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 space-y-8 overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                        <AlertTriangle className="w-48 h-48 text-red-600" />
                      </div>

                      <div className="flex flex-col items-center gap-4 relative z-10">
                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border-2 ${selected === realAddress ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-red-600/10 border-red-600/40'} animate-in zoom-in duration-700`}>
                           {selected === realAddress ? <ShieldCheck className="w-10 h-10 text-emerald-500" /> : <ShieldX className="w-10 h-10 text-red-600" />}
                        </div>
                        <div className="text-center space-y-1">
                           <h3 className="text-2xl md:text-4xl font-black text-white italic uppercase tracking-tighter leading-none">Result.</h3>
                           <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] ${selected === realAddress ? 'text-emerald-500' : 'text-red-500'}`}>
                             {selected === realAddress ? 'VIGILANCE_CONFIRMED' : 'BYPASS_DETECTED'}
                           </p>
                        </div>
                      </div>

                      <div className="space-y-8 relative z-10">
                         <div className="space-y-3">
                           <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                              <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                 <div className="w-1 h-1 rounded-full bg-zinc-700" /> IDENTITY
                              </div>
                              <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">ORIGINAL</span>
                           </div>
                           <div className="flex items-center gap-4 p-4 bg-[#0a0a0a] border border-zinc-800 rounded-xl shadow-inner">
                              <div className="scale-75 md:scale-90"><AddressGlyph address={realAddress} size="md" /></div>
                              <div className="font-mono text-[9px] md:text-[14px] text-zinc-500 break-all leading-relaxed">
                                {realAddress}
                              </div>
                           </div>
                         </div>

                         <div className="space-y-3">
                           <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                              <div className={`text-[9px] font-black uppercase tracking-widest ${selected === realAddress ? 'text-emerald-500' : 'text-red-500'}`}>
                                {selected === realAddress ? 'VERIFIED' : 'CAPTURED'}
                              </div>
                              <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">SELECTION</span>
                           </div>
                           <div className={`flex items-center gap-4 p-4 bg-[#0a0a0a] border rounded-xl shadow-inner transition-colors duration-1000 ${selected === realAddress ? 'border-emerald-500/20' : 'border-red-500/30'}`}>
                              <div className="scale-75 md:scale-90"><AddressGlyph address={selected || options[0]} size="md" /></div>
                              {renderCollisionAddress(selected || options[0], realAddress)}
                           </div>
                         </div>
                      </div>
                   </div>
                </div>
             )}
           </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-horizontal {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};