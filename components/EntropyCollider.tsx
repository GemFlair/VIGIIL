
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Zap, Shield, ShieldAlert, ShieldCheck, Activity, Brain, Trophy, RefreshCcw, Skull, Timer, Fingerprint, Crosshair, AlertTriangle } from 'lucide-react';
import { AddressGlyph } from './AddressGlyph';

interface Packet {
  id: string;
  type: 'VERIFIED' | 'POISON';
  address: string;
  target: string;
  y: number;
  speed: number;
  lane: number;
}

const GENERATE_ADDR = () => {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let addr = "";
  for (let i = 0; i < 44; i++) addr += chars.charAt(Math.floor(Math.random() * chars.length));
  return addr;
};

const MUTATE_ADDR = (addr: string) => {
  const pos = 15 + Math.floor(Math.random() * 15);
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let newChar = chars.charAt(Math.floor(Math.random() * chars.length));
  while (newChar === addr[pos]) newChar = chars.charAt(Math.floor(Math.random() * chars.length));
  return addr.substring(0, pos) + newChar + addr.substring(pos + 1);
};

export const EntropyCollider: React.FC<{ powerSave?: boolean }> = ({ powerSave }) => {
  const [gameState, setGameState] = useState<'IDLE' | 'ACTIVE' | 'GAMEOVER'>('IDLE');
  const [packets, setPackets] = useState<Packet[]>([]);
  const [score, setScore] = useState(0);
  const [stability, setStability] = useState(100);
  const [wave, setWave] = useState(1);
  const [bestScore, setBestScore] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  
  const requestRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem('vigil_collider_high_score');
    if (saved) setBestScore(parseInt(saved));
  }, []);

  const spawnPacket = useCallback(() => {
    const isPoison = Math.random() > 0.4;
    const base = GENERATE_ADDR();
    const target = base;
    const address = isPoison ? MUTATE_ADDR(base) : base;
    
    const newPacket: Packet = {
      id: Math.random().toString(36).substr(2, 9),
      type: isPoison ? 'POISON' : 'VERIFIED',
      address,
      target,
      y: -100,
      speed: 2 + (wave * 0.4),
      lane: Math.floor(Math.random() * 3)
    };
    
    setPackets(prev => [...prev, newPacket]);
  }, [wave]);

  const update = useCallback((time: number) => {
    if (gameState !== 'ACTIVE') return;

    const spawnDelay = powerSave ? Math.max(1200, 3000 - (wave * 100)) : Math.max(800, 2000 - (wave * 100));

    if (time - lastSpawnRef.current > spawnDelay) {
      spawnPacket();
      lastSpawnRef.current = time;
    }

    setPackets(prev => {
      const next = prev.map(p => ({ ...p, y: p.y + p.speed }));
      
      const missed = next.filter(p => p.y > 700);
      missed.forEach(p => {
        if (p.type === 'POISON') {
          setStability(s => Math.max(0, s - 15));
          if (!powerSave) {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 300);
          }
        }
      });

      return next.filter(p => p.y <= 700);
    });

    if (stability <= 0) {
      setGameState('GAMEOVER');
      if (score > bestScore) {
        setBestScore(score);
        localStorage.setItem('vigil_collider_high_score', score.toString());
      }
    }

    requestRef.current = requestAnimationFrame(update);
  }, [gameState, wave, spawnPacket, score, bestScore, stability, powerSave]);

  useEffect(() => {
    if (gameState === 'ACTIVE') {
      requestRef.current = requestAnimationFrame(update);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current as number);
    };
  }, [gameState, update]);

  const handleAction = (id: string, type: 'VERIFIED' | 'POISON') => {
    const packet = packets.find(p => p.id === id);
    if (!packet) return;

    if (packet.type === type) {
      setScore(s => {
        const next = s + 10;
        if (next % 50 === 0) setWave(w => w + 1);
        return next;
      });
      if (type === 'POISON') updateGlobalBri(2);
    } else {
      setStability(s => Math.max(0, s - 20));
      if (!powerSave) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
      }
      updateGlobalBri(-10);
    }

    setPackets(prev => prev.filter(p => p.id !== id));
  };

  const updateGlobalBri = (delta: number) => {
    const current = parseInt(localStorage.getItem('vigil_user_bri') || '100');
    localStorage.setItem('vigil_user_bri', Math.max(0, Math.min(100, current + delta)).toString());
  };

  const startGame = () => {
    setGameState('ACTIVE');
    setPackets([]);
    setScore(0);
    setStability(100);
    setWave(1);
    lastSpawnRef.current = performance.now();
  };

  return (
    <section id="entropy-collider" className="px-6 md:px-20 py-12 bg-[#020202] relative z-10 overflow-hidden border-t border-zinc-900/50 min-h-screen flex flex-col items-center">
      <div className={`absolute inset-0 transition-opacity duration-300 ${isGlitching && !powerSave ? 'opacity-20' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-red-600/20 mix-blend-overlay animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-amber-500 animate-pulse" />
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.6em]">Endpoint 99 // The Entropy Collider</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
              Cognitive <br/> Endurance.
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl font-medium italic leading-relaxed mt-6">
              "The final barrier. High-velocity multi-threaded intercept flow. If your stability drops, the bridge collapses."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] space-y-2">
              <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">High Score</div>
              <div className="text-4xl font-black text-white italic">{bestScore}</div>
            </div>
            <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] space-y-2">
              <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Global Rank</div>
              <div className="text-4xl font-black text-amber-500 italic">#{Math.max(1, 1000 - Math.floor(bestScore/10))}</div>
            </div>
          </div>

          {gameState !== 'ACTIVE' && (
            <button 
              onClick={startGame}
              className="w-full py-8 bg-white text-black text-[14px] font-black uppercase tracking-[0.5em] rounded-3xl hover:bg-amber-500 hover:text-white transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] active:scale-95"
            >
              {gameState === 'IDLE' ? 'INITIALIZE STRESS TEST' : 'RE-SYNC NEURAL LINK'}
            </button>
          )}

          <div className="p-8 bg-black/40 border border-zinc-900 rounded-[2.5rem] space-y-6">
             <div className="flex items-center gap-3">
                <Brain className="w-4 h-4 text-purple-500" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Saccadic Protocol</span>
             </div>
             <ul className="space-y-4">
                <li className="flex gap-4 items-start">
                   <div className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500 mt-1">!</div>
                   <p className="text-zinc-500 text-sm italic">Identify <b>POISON</b> mimics (suffix mismatch) and click <b>SHIELD</b> to incinerate them.</p>
                </li>
                <li className="flex gap-4 items-start">
                   <div className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500 mt-1">✓</div>
                   <p className="text-zinc-500 text-sm italic">Identify <b>VERIFIED</b> packets and click <b>TRUST</b> to settle the intent.</p>
                </li>
             </ul>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className={`relative h-[750px] bg-[#050505] border-2 rounded-[4rem] overflow-hidden flex flex-col items-center shadow-2xl transition-all duration-500 ${isGlitching && !powerSave ? 'border-red-600 scale-[0.99] translate-x-1' : 'border-zinc-900'}`}>
            
            <div className="w-full h-20 bg-zinc-950/80 border-b border-zinc-900 flex items-center justify-between px-12 z-20 backdrop-blur-md">
               <div className="flex items-center gap-6">
                  <div className="space-y-1">
                     <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Stability</div>
                     <div className="w-32 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-300 ${stability > 50 ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : stability > 25 ? 'bg-amber-500' : 'bg-red-600 animate-pulse'}`} style={{ width: `${stability}%` }} />
                     </div>
                  </div>
                  <div className="h-8 w-[1px] bg-zinc-900" />
                  <div>
                    <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Wave</div>
                    <div className="text-xl font-black text-white italic">{wave}</div>
                  </div>
               </div>
               <div className="text-right">
                  <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Score</div>
                  <div className="text-3xl font-black text-white italic tabular-nums">{score}</div>
               </div>
            </div>

            <div className="w-full flex-1 relative px-8 py-10 overflow-hidden">
               {gameState === 'IDLE' && (
                 <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-1000">
                    <Fingerprint className="w-24 h-24 text-zinc-700" strokeWidth={1} />
                    <div className="space-y-2">
                       <h4 className="text-xl font-black text-zinc-400 uppercase tracking-[0.4em]">Biological Auth Required</h4>
                       <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest italic">NEURAL_IDLE_STATE</p>
                    </div>
                 </div>
               )}

               {gameState === 'GAMEOVER' && (
                 <div className="h-full flex flex-col items-center justify-center text-center space-y-10 animate-in zoom-in duration-700">
                    <div className="relative">
                       <Skull className="w-24 h-24 text-red-600 animate-pulse" />
                       <div className="absolute inset-0 bg-red-600/10 blur-3xl" />
                    </div>
                    <div className="space-y-4">
                       <h3 className="text-5xl font-black text-white italic uppercase tracking-tighter">System Collapse.</h3>
                       <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] space-y-4 min-w-[280px]">
                          <div>
                             <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Final Intercepts</div>
                             <div className="text-4xl font-black text-white italic">{score}</div>
                          </div>
                          <div className="h-[1px] w-full bg-zinc-900" />
                          <div>
                             <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Peak Wave</div>
                             <div className="text-2xl font-black text-amber-500 italic">{wave}</div>
                          </div>
                       </div>
                    </div>
                    <button onClick={startGame} className="flex items-center gap-3 px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-amber-500 hover:text-white transition-all">
                       <RefreshCcw className="w-4 h-4" /> REBOOT CORE
                    </button>
                 </div>
               )}

               {gameState === 'ACTIVE' && (
                 <div className="relative w-full h-full">
                    {packets.map(packet => (
                      <div 
                        key={packet.id}
                        className="absolute w-[90%] left-[5%] flex items-center justify-between p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl backdrop-blur-sm group will-change-transform"
                        style={{ transform: `translateY(${packet.y}px)` }}
                      >
                         <div className="flex items-center gap-4">
                            <AddressGlyph address={packet.address} size="sm" />
                            <div className="space-y-1">
                               <div className="font-mono text-[10px] text-zinc-500 flex flex-wrap max-w-[200px]">
                                  <span className="text-white font-black">{packet.address.slice(0, 4)}</span>
                                  <span className="opacity-20">{packet.address.slice(4, -4)}</span>
                                  <span className="text-white font-black">{packet.address.slice(-4)}</span>
                               </div>
                               <div className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">Ref: {packet.target.slice(0,4)}...{packet.target.slice(-4)}</div>
                            </div>
                         </div>
                         <div className="flex gap-2">
                            <button 
                               onClick={() => handleAction(packet.id, 'VERIFIED')}
                               className="px-3 py-2 bg-emerald-600/10 border border-emerald-500/30 rounded-lg text-[8px] font-black text-emerald-500 uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-lg shadow-emerald-500/5 active:scale-95"
                            >
                               TRUST
                            </button>
                            <button 
                               onClick={() => handleAction(packet.id, 'POISON')}
                               className="px-3 py-2 bg-red-600/10 border border-red-500/30 rounded-lg text-[8px] font-black text-red-500 uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-lg shadow-red-500/5 active:scale-95"
                            >
                               SHIELD
                            </button>
                         </div>
                      </div>
                    ))}

                    <div className="absolute inset-0 pointer-events-none">
                       <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5" />
                       <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-white/5" />
                       <div className="absolute right-1/3 top-0 bottom-0 w-[1px] bg-white/5" />
                    </div>
                 </div>
               )}
            </div>

            <div className="w-full h-12 bg-zinc-950/80 border-t border-zinc-900 flex items-center justify-center gap-12 z-20">
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em]">Neural Sync OK</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${wave > 5 ? 'bg-red-500' : 'bg-blue-500'}`} />
                  <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em]">Saccade Load: {wave * 10}%</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
