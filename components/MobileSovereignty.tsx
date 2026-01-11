import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, Fingerprint, ShieldAlert, ShieldCheck, 
  Zap, Lock, Unlock, Keyboard, ZapOff, Activity, 
  CheckCircle2, AlertTriangle, Cpu, RefreshCcw,
  Wifi, Battery, Signal, Eye, Hand, Ghost
} from 'lucide-react';
import { TechLabel, TechNote } from './docs/DocHelpers';
import { AddressGlyph } from './AddressGlyph';

const POISON_ADDR = "Ab1C00000000000000000000000000Zz90";
const TRUSTED_ADDR = "Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90";

export const MobileSovereignty: React.FC = () => {
  const [input, setInput] = useState('');
  const [state, setState] = useState<'IDLE' | 'PASTED' | 'THREAT' | 'BIOMETRIC' | 'SECURE'>('IDLE');
  const [isVibrating, setIsVibrating] = useState(false);
  const [bioProgress, setBioProgress] = useState(0);

  const handlePaste = () => {
    setInput(POISON_ADDR);
    setState('PASTED');
    
    // Process Interception
    setTimeout(() => {
      setState('THREAT');
      triggerHaptic();
    }, 800);
  };

  const triggerHaptic = () => {
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 600);
  };

  const startBiometric = () => {
    setState('BIOMETRIC');
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setBioProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setState('SECURE'), 400);
      }
    }, 20);
  };

  const reset = () => {
    setInput('');
    setState('IDLE');
    setBioProgress(0);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-12 space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* LEFT: NARRATIVE */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.6em]">Path 06 // Mobile Sovereignty</span>
             </div>
             <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
               Secure <br/> Keyboard.
             </h2>
             <p className="text-zinc-500 text-lg md:text-xl font-medium italic leading-relaxed mt-6">
               "The Universal Interceptor. VIGIL operates at the system-input layer, identifying poison mimics before they reach your wallet app."
             </p>
          </div>

          <div className="space-y-6">
             {[
               { t: "Clipboard Sanitizer", d: "Intercepts copy-paste events across every app—Telegram, X, or WhatsApp.", i: <ZapOff size={16} /> },
               { t: "Physical Friction", d: "Uses device haptics to create a biological warning when a threat is identified.", i: <Activity size={16} /> },
               { t: "Biometric Handshake", d: "Mandatory FaceID/TouchID confirmation for high-risk destination overrides.", i: <Fingerprint size={16} /> }
             ].map((item, i) => (
               <div key={i} className="flex gap-6 group">
                  <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-900 flex items-center justify-center text-zinc-600 group-hover:text-emerald-500 transition-colors">
                     {item.i}
                  </div>
                  <div className="space-y-1">
                     <h4 className="text-[12px] font-black text-white uppercase tracking-widest">{item.t}</h4>
                     <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-tight italic">{item.d}</p>
                  </div>
               </div>
             ))}
          </div>

          <TechNote title="OPERATIONAL BOUNDARY">
            VIGIL Keyboard does not track keystrokes. It only analyzes strings that match the cryptographic entropy of a wallet address.
          </TechNote>
        </div>

        {/* RIGHT: THE SIMULATION (PHONE) */}
        <div className="lg:col-span-7 flex justify-center perspective-1000">
           <div className={`relative w-[340px] h-[680px] bg-[#050505] border-[8px] border-zinc-900 rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col transition-transform duration-300 ${isVibrating ? 'animate-haptic-shake' : ''}`}>
              
              {/* Phone Status Bar */}
              <div className="h-12 w-full flex items-center justify-between px-8 pt-4 shrink-0">
                 <span className="text-[10px] font-bold text-white">9:41</span>
                 <div className="flex items-center gap-2 text-white">
                    <Signal size={10} />
                    <Wifi size={10} />
                    <Battery size={10} className="rotate-90" />
                 </div>
              </div>

              {/* MOCK WALLET INTERFACE */}
              <div className="flex-1 p-6 space-y-8 animate-in fade-in duration-1000">
                 <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                       <ShieldCheck size={16} className="text-black" />
                    </div>
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Trust Wallet v2.1</span>
                 </div>

                 <div className="space-y-4">
                    <h3 className="text-xl font-black text-white uppercase italic">Send Assets</h3>
                    <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-2">
                       <label className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Recipient Address</label>
                       <div className="h-12 flex items-center">
                          {input ? (
                            <span className="text-xs font-mono text-zinc-300 break-all">{input}</span>
                          ) : (
                            <span className="text-xs font-mono text-zinc-800 italic animate-pulse">Paste or scan...</span>
                          )}
                       </div>
                    </div>
                 </div>

                 {state === 'THREAT' && (
                    <div className="p-5 bg-red-600/10 border border-red-500/40 rounded-2xl space-y-4 animate-in zoom-in duration-300">
                       <div className="flex items-center gap-3">
                          <ShieldAlert className="w-5 h-5 text-red-500" />
                          <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest">Threat Intercepted</h4>
                       </div>
                       <p className="text-[10px] text-zinc-400 font-bold leading-relaxed uppercase">
                          VIGIL Keyboard identifies this as a vanity mimic of your trusted history. 
                       </p>
                       <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl">
                          <AddressGlyph address={TRUSTED_ADDR} size="sm" />
                          <div className="space-y-0.5">
                             <span className="text-[7px] text-zinc-600 font-black uppercase">Should be:</span>
                             <span className="text-[10px] font-mono text-emerald-500">{TRUSTED_ADDR.slice(0,8)}...</span>
                          </div>
                       </div>
                    </div>
                 )}

                 {state === 'SECURE' && (
                    <div className="p-10 bg-emerald-600/10 border border-emerald-500/40 rounded-3xl text-center space-y-6 animate-in zoom-in duration-500">
                       <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                          <CheckCircle2 className="w-8 h-8 text-black" />
                       </div>
                       <div className="space-y-1">
                          <h4 className="text-lg font-black text-white italic uppercase">Verified.</h4>
                          <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Intent Symmetrically Matched</p>
                       </div>
                    </div>
                 )}
              </div>

              {/* VIGIL KEYBOARD AREA */}
              <div className={`mt-auto bg-[#0a0a0a] border-t-2 transition-all duration-500 ${state === 'THREAT' ? 'border-red-600' : 'border-zinc-900'} p-4 h-[280px] relative`}>
                 
                 {state === 'IDLE' && (
                   <div className="h-full flex flex-col items-center justify-center gap-6 animate-in fade-in duration-500">
                      <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl opacity-40">
                        <Keyboard className="w-12 h-12 text-zinc-600" />
                      </div>
                      <button 
                        onClick={handlePaste}
                        className="px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-xl"
                      >
                         SIMULATE PASTE
                      </button>
                   </div>
                 )}

                 {(state === 'PASTED' || state === 'THREAT') && (
                    <div className="h-full flex flex-col">
                       <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-900/50">
                          <div className="flex items-center gap-2">
                             <div className={`w-1.5 h-1.5 rounded-full ${state === 'THREAT' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                             <span className={`text-[8px] font-black uppercase tracking-widest ${state === 'THREAT' ? 'text-red-500' : 'text-emerald-500'}`}>
                               VIGIL_KEYBOARD: {state === 'THREAT' ? 'LOCKED' : 'SCANNING'}
                             </span>
                          </div>
                          <Ghost className="w-3 h-3 text-zinc-800" />
                       </div>

                       <div className="grid grid-cols-4 gap-2 flex-1">
                          {Array.from({length: 12}).map((_, i) => (
                            <div key={i} className="bg-zinc-950 border border-zinc-900 rounded-lg flex items-center justify-center opacity-20">
                               <div className="w-4 h-1 bg-zinc-800 rounded-full" />
                            </div>
                          ))}
                       </div>

                       {state === 'THREAT' && (
                          <div className="absolute inset-0 bg-red-600/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center space-y-6 animate-in fade-in duration-300">
                             <Lock className="w-10 h-10 text-white animate-bounce" />
                             <div className="space-y-1">
                                <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">Keyboard Hard-Locked.</h4>
                                <p className="text-[10px] text-red-100 font-bold uppercase tracking-widest">Poison Mimic Identified</p>
                             </div>
                             <button 
                               onClick={startBiometric}
                               className="w-full py-4 bg-black text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-xl border border-red-400/30 flex items-center justify-center gap-3"
                             >
                                <Fingerprint size={16} className="animate-pulse" /> OVERRIDE WITH BIOMETRICS
                             </button>
                          </div>
                       )}
                    </div>
                 )}

                 {state === 'BIOMETRIC' && (
                    <div className="h-full flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-300">
                       <div className="relative w-24 h-24 flex items-center justify-center">
                          <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                             <circle cx="48" cy="48" r="44" stroke="#111" strokeWidth="4" fill="transparent" />
                             <circle cx="48" cy="48" r="44" stroke="#10b981" strokeWidth="4" fill="transparent" strokeDasharray="276.3" strokeDashoffset={276.3 - (276.3 * bioProgress / 100)} className="transition-all duration-75" />
                          </svg>
                          <Fingerprint className="w-12 h-12 text-emerald-500" />
                       </div>
                       <div className="space-y-1 text-center">
                          <h4 className="text-sm font-black text-white uppercase tracking-widest">Verifying Identity</h4>
                          <p className="text-[8px] text-zinc-600 font-black uppercase tracking-[0.6em]">Biometric_Link_Active</p>
                       </div>
                    </div>
                 )}

                 {state === 'SECURE' && (
                    <div className="h-full flex flex-col items-center justify-center space-y-6 animate-in zoom-in duration-500">
                       <Unlock className="w-12 h-12 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]" />
                       <button onClick={reset} className="text-[9px] font-black text-zinc-700 uppercase tracking-widest hover:text-white transition-colors">RESET_ENVIRONMENT</button>
                    </div>
                 )}
              </div>

              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#050505] rounded-b-2xl z-[100]" />
           </div>
        </div>
      </div>
      <style>{`
        @keyframes haptic-shake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-2px, -2px) rotate(-0.5deg); }
          20% { transform: translate(2px, 0) rotate(0.5deg); }
          30% { transform: translate(-2px, 2px) rotate(0deg); }
          40% { transform: translate(2px, -2px) rotate(-0.5deg); }
          50% { transform: translate(-1px, 1px) rotate(0.5deg); }
        }
        .animate-haptic-shake {
          animation: haptic-shake 0.15s infinite linear;
          box-shadow: 0 0 50px rgba(239, 68, 68, 0.4) !important;
          border-color: #ef4444 !important;
        }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
};