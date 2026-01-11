import React, { useState } from 'react';
import { Search, Loader2, Globe, Shield, ShieldAlert, ShieldCheck, Terminal, Cpu, Radio, Zap, ArrowRight, Fingerprint, Activity, History, Lock, User, FileText } from 'lucide-react';
import { synthesizeAddressReputation, ReputationSynthesisResponse } from '../services/geminiService';
import { AddressGlyph } from './AddressGlyph';
import { VigilScanner } from './VigilScanner';

export const ContextualReputationSearch: React.FC = () => {
  const [address, setAddress] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [result, setResult] = useState<ReputationSynthesisResponse | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 4));
  };

  const handleSynthesize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || address.length < 32) return;

    setIsSynthesizing(true);
    setResult(null);
    setLogs([]);
    
    addLog("Querying Sentinel Mesh...");
    setTimeout(() => addLog("Mapping cluster associations..."), 800);
    setTimeout(() => addLog("Calculating entropy variance..."), 1600);
    
    try {
      const res = await synthesizeAddressReputation(address);
      setResult(res);
      addLog("Synthesis complete.");
    } catch (err) {
      addLog("CRITICAL: Synthesis aborted.");
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-12 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* CONTROL SIDE */}
        <div className="lg:col-span-5 space-y-10 flex flex-col">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Cpu className="w-4 h-4 text-cyan-500 animate-pulse" />
              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.6em]">Protocol: Sentinel Search</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
              Reputation <br/> Synthesis.
            </h2>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium italic max-w-sm mt-6">
              "Cross-referencing address behavior against 1.2M+ global Sentinel nodes to establish structural trust."
            </p>
          </div>

          <form onSubmit={handleSynthesize} className="space-y-6">
            <div className="space-y-3">
               <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Target Identity</label>
               <div className="relative group">
                  <div className="absolute -inset-[2px] bg-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center bg-[#080808] border-2 border-zinc-900 rounded-2xl overflow-hidden focus-within:border-cyan-600 transition-all">
                    <div className="pl-6 text-zinc-700">
                      <Search className="w-5 h-5" />
                    </div>
                    <input 
                      type="text" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="SCAN ADDRESS..."
                      className="w-full bg-transparent py-6 px-4 text-sm font-mono text-white placeholder:text-zinc-800 focus:outline-none uppercase tracking-tight"
                    />
                  </div>
               </div>
            </div>

            <button 
              type="submit" 
              disabled={isSynthesizing || address.length < 32}
              className="w-full py-6 bg-white text-black text-[12px] font-black uppercase tracking-[0.5em] rounded-2xl hover:bg-cyan-600 hover:text-white transition-all shadow-2xl disabled:opacity-30 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isSynthesizing ? <Activity className="w-6 h-6 animate-pulse" /> : <><Globe className="w-6 h-6" /> SYNTHESIZE INTEL</>}
            </button>
          </form>

          {/* LOGS PANEL */}
          <div className="flex-1 bg-black/40 border border-zinc-900 rounded-[2rem] p-6 font-mono text-[9px] text-zinc-600 space-y-2 overflow-hidden min-h-[120px]">
             {logs.length === 0 && <div className="animate-pulse">Awaiting search parameters...</div>}
             {logs.map((log, i) => (
               <div key={i} className="flex gap-3 animate-in slide-in-from-left-2 duration-300">
                 <span className="text-cyan-900">[{new Date().toLocaleTimeString()}]</span>
                 <span className={i === 0 ? 'text-cyan-500' : ''}>{log}</span>
               </div>
             ))}
          </div>
        </div>

        {/* DISPLAY SIDE - UPGRADED TO BIOMETRIC PROFILE */}
        <div className="lg:col-span-7">
          <div className={`h-full min-h-[550px] bg-[#080808] border-2 rounded-[3.5rem] p-8 md:p-14 relative overflow-hidden transition-all duration-700 ${result ? 'border-cyan-600/40 shadow-[0_0_80px_rgba(6,182,212,0.1)]' : 'border-zinc-900 shadow-2xl'}`}>
            
            {/* Holographic Overlays */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>
            
            {result && (
              <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/20 blur-[2px] animate-[scan-vertical_4s_linear_infinite] pointer-events-none" />
            )}

            {!result && !isSynthesizing && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-1000">
                <div className="relative group">
                  <div className="absolute inset-0 bg-cyan-500/5 blur-3xl group-hover:bg-cyan-500/10 transition-colors" />
                  <Fingerprint className="w-24 h-24 text-zinc-700 relative z-10" strokeWidth={1} />
                  <div className="absolute inset-0 border border-zinc-900 rounded-full animate-ping" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-zinc-400 uppercase tracking-[0.4em]">Mesh Search Ready</h3>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest italic">AWAITING_BIOMETRIC_TARGET</p>
                </div>
              </div>
            )}

            {isSynthesizing && (
               <div className="h-full flex flex-col items-center justify-center text-center py-12">
                 <VigilScanner label="SYNCHRONIZING_SENTINEL_MESH" size="lg" />
               </div>
            )}

            {result && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 relative z-10">
                
                {/* IDENTITY HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-zinc-900 pb-8">
                   <div className="flex items-center gap-6">
                      <div className="relative">
                        <AddressGlyph address={address} size="lg" />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#080808] border border-zinc-800 rounded-lg flex items-center justify-center">
                           <User className="w-3 h-3 text-zinc-500" />
                        </div>
                      </div>
                      <div className="space-y-1">
                         <div className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em]">Mesh Identification</div>
                         <h3 className="text-4xl font-black text-white italic tracking-tighter leading-none">Identity Profile</h3>
                         <div className="font-mono text-[10px] text-zinc-600 mt-1">{address.slice(0, 16)}...{address.slice(-16)}</div>
                      </div>
                   </div>
                   
                   <div className="text-right">
                      <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Resilience Score</div>
                      <div className={`text-6xl font-black italic tracking-tighter ${result.reputationScore > 80 ? 'text-emerald-500' : result.reputationScore > 50 ? 'text-amber-500' : 'text-red-500'}`}>
                         {result.reputationScore}%
                      </div>
                   </div>
                </div>

                {/* FORENSIC FEEDBACK */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-6">
                      <div className="p-6 bg-zinc-950/50 border border-zinc-900 rounded-3xl space-y-4">
                         <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-cyan-500" />
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Sentinel Synthesis</span>
                         </div>
                         <p className="text-zinc-400 text-sm leading-relaxed font-medium italic">
                           "{result.synthesis}"
                         </p>
                      </div>

                      <div className={`p-6 rounded-3xl border-2 space-y-3 ${result.reputationScore > 50 ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                         <div className="flex items-center gap-3">
                            {result.reputationScore > 50 ? <ShieldCheck className="w-4 h-4 text-emerald-500" /> : <ShieldAlert className="w-4 h-4 text-red-500" />}
                            <span className={`text-[10px] font-black uppercase tracking-widest ${result.reputationScore > 50 ? 'text-emerald-500' : 'text-red-500'}`}>Current Verdict</span>
                         </div>
                         <p className="text-white text-lg font-black italic uppercase tracking-tight">{result.verdict}</p>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] mb-4">Telemetry Readouts</div>
                      {result.sentinelSignals.map((signal, i) => (
                        <div key={i} className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex items-center justify-between group hover:border-cyan-500/30 transition-all">
                           <div className="space-y-0.5">
                              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block">{signal.label}</span>
                              <span className="text-xs font-black text-white uppercase">{signal.value}</span>
                           </div>
                           <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${signal.state === 'POSITIVE' ? 'text-emerald-500' : signal.state === 'NEGATIVE' ? 'text-red-500' : 'text-blue-500'}`} />
                        </div>
                      ))}
                      
                      <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <History className="w-4 h-4 text-zinc-700" />
                            <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">History Check: PASS</span>
                         </div>
                         <div className="flex items-center gap-3">
                            <Lock className="w-4 h-4 text-zinc-700" />
                            <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Entropy: HIGH</span>
                         </div>
                      </div>
                   </div>
                </div>

                {/* ACTION FOOTER */}
                <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-900 flex items-center justify-center">
                         <Globe className="w-5 h-5 text-cyan-500 animate-spin-slow" />
                      </div>
                      <div className="space-y-0.5">
                         <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-none">Mesh Synchronization</p>
                         <p className="text-[10px] text-zinc-700 font-bold uppercase italic">VIG-NODE-8821 // LIVE</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <button className="px-6 py-3 bg-red-600/10 border border-red-500/30 text-red-500 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-red-600 hover:text-white transition-all">
                        REPORT IDENTITY CLASH
                      </button>
                      <button onClick={() => setResult(null)} className="px-6 py-3 border border-zinc-800 text-zinc-500 text-[9px] font-black uppercase tracking-widest rounded-xl hover:text-white hover:bg-zinc-900 transition-all">
                        NEW SCAN
                      </button>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scan-vertical {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};