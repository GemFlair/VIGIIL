import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, Activity, Smartphone, ChevronRight, Fingerprint, 
  Terminal, Globe, ShieldCheck,
  Power, Scan, Target,
  FileCheck, Link, Folder,
  FileCode, Copy, Check, Download,
  Radar, Lock, CheckCircle2, ShieldX, Eye, AlertTriangle, AlertOctagon, XCircle,
  Filter, Trash2, DownloadCloud, Code2, ExternalLink, MousePointer2,
  Settings2, HelpCircle, Monitor, Shield, Radio
} from 'lucide-react';
import { analyzeAddressInterception, InterceptionSynthesisResponse } from '../services/geminiService';
import { calculateCompositeThreat, getAxesFromVerdict } from '../utils/threatIndex';
import { SILO_MANIFEST, ManifestFile } from '../registry/fieldUnitSilo';
import { VigilScanner } from './VigilScanner';
import { AddressGlyph } from './AddressGlyph';
import { SolscanMirror, SolscanTransaction } from './SolscanMirror';

type NodeState = 'UNAUTHORIZED' | 'HANDSHAKE' | 'PRO_ACTIVE';
type HubView = 'DESKTOP' | 'REGISTRY';

const NeuralParityHeader = ({ synced }: { synced: boolean }) => (
  <div className="flex items-center gap-6">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full animate-pulse ${synced ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-red-600 shadow-[0_0_10px_#ef4444]'}`} />
      <div className="flex flex-col">
        <span className={`text-[10px] font-black uppercase tracking-widest ${synced ? 'text-emerald-500' : 'text-red-500'}`}>
          NEURAL PARITY: {synced ? 'ACTIVE' : 'PENDING_UPDATE'}
        </span>
      </div>
    </div>
    <div className="h-6 w-[1px] bg-zinc-800" />
    <div className="hidden lg:flex items-center gap-6 overflow-hidden">
      {['VALIDATOR.JS', 'DIFF.JS', 'MANIFEST_v0.0.4.0'].map((file, i) => (
        <div key={i} className="flex items-center gap-2 shrink-0">
          <FileCheck size={11} className="text-zinc-600" />
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-tighter">{file}</span>
        </div>
      ))}
    </div>
  </div>
);

export const FieldUnitHub: React.FC = () => {
  const [nodeState, setNodeState] = useState<NodeState>(() => 
    localStorage.getItem('vigil_node_verified') === 'true' ? 'PRO_ACTIVE' : 'UNAUTHORIZED'
  );
  
  const [view, setView] = useState<HubView>('DESKTOP');
  const [activeFile, setActiveFile] = useState<ManifestFile>(SILO_MANIFEST[0]);
  const [bri, setBri] = useState(100);
  const [activeThreat, setActiveThreat] = useState<SolscanTransaction | null>(null);
  const [syncedFiles, setSyncedFiles] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [isHandshaking, setIsHandshaking] = useState(false);

  // Sync Logic
  const allFilesSynced = SILO_MANIFEST.every(file => syncedFiles[file.path] === true);
  const isSynced = nodeState === 'PRO_ACTIVE' && allFilesSynced;

  useEffect(() => {
    const savedBri = localStorage.getItem('vigil_user_bri');
    if (savedBri) setBri(parseInt(savedBri));
  }, []);

  const initiateHandshake = () => {
    setIsHandshaking(true);
    // Simulation: Scroll user to the pricing module to complete real handshake
    const pricingEl = document.getElementById('pricing');
    if (pricingEl) {
      pricingEl.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Virtual activation delay for demonstration
    setTimeout(() => {
      setNodeState('PRO_ACTIVE');
      localStorage.setItem('vigil_node_verified', 'true');
      setIsHandshaking(false);
    }, 2400);
  };

  const handleTerminate = () => {
    localStorage.removeItem('vigil_node_verified');
    setNodeState('UNAUTHORIZED');
    setView('DESKTOP');
  };

  const handleSolscanCopy = (tx: SolscanTransaction) => {
    setActiveThreat(tx);
  };

  const handleDismissThreat = (wasSuccess: boolean) => {
    if (wasSuccess) {
      setBri(prev => Math.min(100, prev + 2));
    } else {
      setBri(prev => Math.max(0, prev - 15));
    }
    setActiveThreat(null);
  };

  return (
    <section id="field-unit" className="px-4 md:px-20 py-12 md:py-24 bg-[#020202] relative z-10 overflow-hidden border-t border-zinc-900/50 min-h-screen flex flex-col items-center">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-[1600px] w-full space-y-16 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-600/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-emerald-500 animate-pulse" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Field Unit // Virtual Workspace</span>
              <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">Watch Tower.</h2>
            </div>
          </div>

          <div className="flex items-center gap-3 p-1 bg-[#0a0a0a] border border-zinc-900 rounded-2xl">
            <button onClick={() => setView('DESKTOP')} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'DESKTOP' ? 'bg-white text-black shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}>
              <Monitor className="w-3.5 h-3.5 inline mr-2" /> Live Environment
            </button>
            <button onClick={() => setView('REGISTRY')} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'REGISTRY' ? 'bg-white text-black shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}>
              <Folder className="w-3.5 h-3.5 inline mr-2" /> Source Silo
            </button>
          </div>
        </div>

        {/* Tactical Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-[800px]">
          
          {/* Main Display: Virtual Monitor */}
          <div className="lg:col-span-9 h-full relative">
            <div className="bg-[#050505] border-2 border-zinc-900 rounded-[3.5rem] overflow-hidden flex flex-col shadow-2xl h-full relative">
              <div className="h-12 bg-[#0a0a0a] border-b border-zinc-900 flex items-center px-8 justify-between shrink-0">
                <NeuralParityHeader synced={isSynced} />
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${nodeState === 'PRO_ACTIVE' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-red-600 animate-pulse'}`} />
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">SENTINEL_NODE: {nodeState}</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 relative overflow-hidden bg-[#020202]">
                {view === 'DESKTOP' ? (
                  <div className="h-full w-full p-12 flex flex-col items-center justify-center relative">
                    <div className="w-full h-full max-w-5xl relative">
                       {/* Solscan Mirror Component */}
                       <SolscanMirror onCopy={handleSolscanCopy} activeType={activeThreat?.type} />
                       
                       {/* Overlay Trigger for Simulation */}
                       {activeThreat && (
                         <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-12 animate-in fade-in duration-500">
                            <div className="relative w-full max-w-md bg-[#0a0a0a] border-2 border-red-500/30 rounded-[2.5rem] p-10 space-y-8 shadow-[0_50px_100px_rgba(0,0,0,1)] text-center">
                               <div className="w-20 h-20 bg-red-600/10 border-2 border-red-500/40 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                                  <ShieldX className="w-10 h-10 text-red-500" />
                               </div>
                               <div className="space-y-2">
                                  <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter">Threat Intercepted.</h4>
                                  <div className="px-3 py-1 bg-red-600/10 border border-red-600/20 rounded-lg inline-block text-[9px] font-black text-red-500 uppercase tracking-widest italic">{activeThreat.type}_VECTOR_ACTIVE</div>
                               </div>
                               <div className="p-4 bg-black border border-zinc-900 rounded-xl space-y-2">
                                  <div className="flex justify-between text-[7px] font-black text-zinc-600 uppercase tracking-widest">
                                     <span>Payload ID</span>
                                     <span>VIG-SCAN-8821</span>
                                  </div>
                                  <p className="font-mono text-[10px] text-red-500 break-all">{activeThreat.from}</p>
                               </div>
                               <div className="space-y-3 pt-4">
                                  <button onClick={() => handleDismissThreat(true)} className="w-full py-5 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-red-500 transition-all shadow-xl">NEUTRALIZE POISON</button>
                                  <button onClick={() => handleDismissThreat(false)} className="w-full py-4 border border-zinc-800 text-zinc-700 text-[9px] font-black uppercase tracking-[0.4em] hover:text-white transition-all">BYPASS SHIELD [HOLD]</button>
                               </div>
                            </div>
                         </div>
                       )}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col bg-[#050505] animate-in fade-in duration-500">
                    <div className="flex-1 grid grid-cols-12 overflow-hidden">
                       {/* Registry Side Rail */}
                       <div className="col-span-4 border-r border-zinc-900 flex flex-col bg-black/20 overflow-hidden">
                          <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
                             <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2"><Folder size={12} /> Registry Manifest</span>
                          </div>
                          <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-1.5">
                             {SILO_MANIFEST.map(file => (
                               <button 
                                key={file.path}
                                onClick={() => setActiveFile(file)}
                                className={`w-full p-4 rounded-xl border-2 text-left flex flex-col gap-2 transition-all ${activeFile.path === file.path ? 'bg-blue-600/10 border-blue-500/50' : 'bg-zinc-950 border-zinc-900 hover:border-zinc-800'}`}
                               >
                                  <div className="flex items-center justify-between">
                                     {/* Fix: explicit prop typing to specify size and className for cloneElement */}
                                     {React.cloneElement(file.icon as React.ReactElement<{ size?: number; className?: string }>, { size: 14, className: activeFile.path === file.path ? 'text-blue-500' : 'text-zinc-700' })}
                                     <div className={`w-1.5 h-1.5 rounded-full ${syncedFiles[file.path] ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-zinc-800'}`} />
                                  </div>
                                  <div className="font-mono text-[10px] text-zinc-400 uppercase truncate">{file.path}</div>
                               </button>
                             ))}
                          </div>
                       </div>
                       
                       {/* Registry Editor */}
                       <div className="col-span-8 flex flex-col bg-[#020202] overflow-hidden">
                          <div className="p-8 border-b border-zinc-900 flex items-center justify-between bg-zinc-950/20">
                             <div className="space-y-1">
                                <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest italic">Source Terminal</div>
                                <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">{activeFile.path}</h4>
                             </div>
                             <button className="px-6 py-2 bg-white text-black rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95">Download File</button>
                          </div>
                          <div className="flex-1 p-10 overflow-auto no-scrollbar bg-black/40">
                             <pre className="font-mono text-[12px] leading-relaxed text-zinc-500 selection:bg-blue-500/20 selection:text-blue-200">
                               <code>{activeFile.content}</code>
                             </pre>
                          </div>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Extension Sidebar: The "Sovereign Pod" */}
          <div className="lg:col-span-3 h-full flex flex-col gap-6">
            
            {/* The Extension Popup Mirror */}
            <div className="flex-[4] bg-[#0a0a0a] border-2 border-zinc-900 rounded-[3rem] p-8 flex flex-col shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-emerald-600 to-transparent opacity-20" />
               
               <header className="flex items-center justify-between mb-10 pb-4 border-b border-zinc-900/50">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-white flex items-center justify-center rounded shadow-lg">
                        <div className="w-4 h-4 bg-black rotate-45" />
                     </div>
                     <span className="text-[11px] font-black text-white italic uppercase tracking-widest leading-none">Vigil Dashboard</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
               </header>

               <div className="flex-1 space-y-10">
                  {/* BRI GAUGE */}
                  <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] flex flex-col items-center text-center space-y-6 shadow-inner relative overflow-hidden group/bri">
                     <div className="absolute inset-0 bg-emerald-500/[0.02] opacity-0 group-hover/bri:opacity-100 transition-opacity" />
                     <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                        <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                           <circle cx="64" cy="64" r="56" stroke="#050505" strokeWidth="8" fill="transparent" />
                           <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className={`transition-all duration-1000 ${bri > 80 ? 'text-emerald-500' : 'text-amber-500'}`} strokeDasharray="351.8" strokeDashoffset={351.8 - (351.8 * (bri / 100))} />
                        </svg>
                        <div className="text-center z-10">
                           <div className="text-4xl font-black text-white italic leading-none">{bri}%</div>
                        </div>
                     </div>
                     <div className="space-y-1">
                        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Resilience Index</div>
                        <div className="text-[14px] font-black text-emerald-500 italic uppercase">SENTINEL RANK</div>
                     </div>
                  </div>

                  {/* FEATURE MATRIX */}
                  <div className="space-y-3">
                     <div className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                        <Zap size={12} /> Defense Matrix
                     </div>
                     {[
                       { id: 'RS', label: 'Retinal Shield', active: true, pro: false },
                       { id: 'CG', label: 'Clipboard Guard', active: true, pro: false },
                       { id: 'MS', label: 'Global Mesh Sync', active: nodeState === 'PRO_ACTIVE', pro: true },
                       { id: 'VCI', label: 'Predictive VCI', active: nodeState === 'PRO_ACTIVE', pro: true }
                     ].map(feat => (
                       <div key={feat.id} className={`p-4 rounded-2xl border transition-all flex items-center justify-between relative overflow-hidden ${feat.pro && nodeState === 'UNAUTHORIZED' ? 'bg-zinc-950 border-zinc-900 grayscale blur-[0.5px] opacity-40' : 'bg-black border-zinc-800'}`}>
                          <div className="flex items-center gap-4">
                             <div className={`w-1.5 h-1.5 rounded-full ${feat.active ? 'bg-emerald-500' : 'bg-zinc-800'}`} />
                             <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">{feat.label}</span>
                          </div>
                          {feat.pro && nodeState === 'UNAUTHORIZED' ? (
                            <Lock size={10} className="text-zinc-700" />
                          ) : (
                            <div className={`w-8 h-4 rounded-full relative ${feat.active ? 'bg-emerald-600' : 'bg-zinc-900'}`}>
                               <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${feat.active ? 'right-0.5' : 'left-0.5'}`} />
                            </div>
                          )}
                       </div>
                     ))}
                  </div>
               </div>

               {nodeState === 'UNAUTHORIZED' && (
                  <button 
                    onClick={initiateHandshake}
                    disabled={isHandshaking}
                    className="mt-8 w-full py-5 bg-blue-600 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-blue-500 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                  >
                    {isHandshaking ? <Activity className="w-4 h-4 animate-spin" /> : <><Shield className="w-4 h-4" /> ACTIVATE PRO FEATURES</>}
                  </button>
               )}

               <footer className="mt-8 pt-6 border-t border-zinc-900 text-center opacity-30">
                  <div className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.4em]">V 0.0.4.0 // DEFINITIVE</div>
               </footer>
            </div>

            {/* Tactical Briefing / Logs */}
            <div className="flex-[2] bg-zinc-950/40 border-2 border-zinc-900 rounded-[3rem] p-8 flex flex-col space-y-6 overflow-hidden">
               <div className="flex items-center gap-3 pb-4 border-b border-zinc-900">
                  <Terminal size={14} className="text-blue-500" />
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Intercept Terminal</span>
               </div>
               <div className="flex-1 overflow-y-auto no-scrollbar space-y-3">
                  {activeThreat ? (
                    <div className="animate-in slide-in-from-left-2 duration-300 space-y-2">
                       <p className="text-[10px] font-mono text-emerald-500 uppercase tracking-tight">{'>'}{'>'} BUFFER_CAPTURED_IDENT</p>
                       <p className="text-[10px] font-mono text-zinc-600 leading-relaxed uppercase italic">Scanning for structural collision with history clusters...</p>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center opacity-20 text-center space-y-3">
                       <Radio size={24} className="text-zinc-600" />
                       <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed">LISTENING_FOR_DOM_MUTATIONS</p>
                    </div>
                  )}
               </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes scan-vertical {
          0% { top: -100%; }
          100% { top: 100%; }
        }
        .animate-draw-path {
          stroke-dasharray: 1000;
          animation: draw-path 3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};