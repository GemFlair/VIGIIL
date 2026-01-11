import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, Twitter, Share2, Terminal as TerminalIcon, 
  Layers, Copy, Check, Zap, Globe, Cpu, Layout, 
  Radio, Shield, Activity, List, MessageSquare, 
  ArrowRight, Hash, Settings2, Info, Box
} from 'lucide-react';

type ForgeEngine = 
  | 'ZINC' | 'INTEL' | 'THREAT' | 'TRUST' | 'CAUTION' 
  | 'STEALTH' | 'VOID' | 'PAPER' | 'BLUEPRINT' | 'ANALOG' 
  | 'MESH' | 'SHARD' | 'NEURAL' | 'ENTROPY' | 'COGNITIVE' 
  | 'SACCADIC' | 'BRIDGE' | 'PRISM' | 'HUD' | 'CARBON' 
  | 'VECTOR' | 'FINALITY' | 'FRAME' | 'GLOW' | 'MATRIX';

const ENGINES: { id: ForgeEngine; label: string; bg: string; accent: string; pattern?: string }[] = [
  { id: 'ZINC', label: 'Zinc Monolith', bg: 'bg-[#050505]', accent: 'text-white' },
  { id: 'INTEL', label: 'Intel Cyan', bg: 'bg-[#050505]', accent: 'text-cyan-500' },
  { id: 'THREAT', label: 'Threat Crimson', bg: 'bg-[#0a0000]', accent: 'text-red-600' },
  { id: 'TRUST', label: 'Trust Emerald', bg: 'bg-[#000502]', accent: 'text-emerald-500' },
  { id: 'CAUTION', label: 'Caution Amber', bg: 'bg-[#080500]', accent: 'text-amber-500' },
  { id: 'STEALTH', label: 'Stealth Slate', bg: 'bg-[#18181b]', accent: 'text-zinc-400' },
  { id: 'VOID', label: 'Void Absolute', bg: 'bg-black', accent: 'text-white' },
  { id: 'PAPER', label: 'Paper White', bg: 'bg-zinc-100', accent: 'text-black' },
  { id: 'BLUEPRINT', label: 'Blueprint Grid', bg: 'bg-[#020617]', accent: 'text-blue-500', pattern: 'grid' },
  { id: 'ANALOG', label: 'Scanline Analog', bg: 'bg-[#050505]', accent: 'text-zinc-300', pattern: 'scanline' },
  { id: 'MESH', label: 'Sentinel Mesh', bg: 'bg-[#050505]', accent: 'text-cyan-400', pattern: 'mesh' },
  { id: 'SHARD', label: 'Geometry Shard', bg: 'bg-[#050505]', accent: 'text-blue-400', pattern: 'shards' },
  { id: 'NEURAL', label: 'Neural Path', bg: 'bg-[#050505]', accent: 'text-purple-500', pattern: 'neural' },
  { id: 'ENTROPY', label: 'Entropy Particle', bg: 'bg-[#050505]', accent: 'text-red-500', pattern: 'dots' },
  { id: 'COGNITIVE', label: 'Distortion', bg: 'bg-[#050505]', accent: 'text-zinc-500', pattern: 'noise' },
  { id: 'SACCADIC', label: 'Saccadic Focus', bg: 'bg-[#050505]', accent: 'text-emerald-400', pattern: 'focus' },
  { id: 'BRIDGE', label: '0.5 Bridge', bg: 'bg-[#020202]', accent: 'text-blue-500', pattern: 'split' },
  { id: 'PRISM', label: 'Prism Refract', bg: 'bg-[#050505]', accent: 'text-white', pattern: 'prism' },
  { id: 'HUD', label: 'Hologram HUD', bg: 'bg-[#050505]', accent: 'text-cyan-500', pattern: 'hud' },
  { id: 'CARBON', label: 'Carbon Woven', bg: 'bg-[#0a0a0a]', accent: 'text-zinc-300', pattern: 'carbon' },
  { id: 'VECTOR', label: 'Vector Core', bg: 'bg-[#050505]', accent: 'text-zinc-600', pattern: 'vector' },
  { id: 'FINALITY', label: 'Finality Std', bg: 'bg-white', accent: 'text-black' },
  { id: 'FRAME', label: 'Sentinel Frame', bg: 'bg-[#050505]', accent: 'text-white', pattern: 'frame' },
  { id: 'GLOW', label: 'Radiant Glow', bg: 'bg-[#050505]', accent: 'text-blue-500', pattern: 'glow' },
  { id: 'MATRIX', label: 'Data Matrix', bg: 'bg-[#050505]', accent: 'text-emerald-500', pattern: 'matrix' },
];

const BrandBlock = ({ color = 'white' }: { color?: string }) => (
  <div className="flex flex-col items-center gap-2 bg-[#050505] p-3 rounded-xl border border-zinc-800 shadow-2xl scale-[0.6] origin-top-right">
    <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm">
      <div className="w-5 h-5 bg-black rotate-45" />
    </div>
    <span className={`italic font-black text-sm tracking-tighter text-${color} uppercase`}>VIGIL</span>
  </div>
);

export const SovereignSocialForge: React.FC = () => {
  const [activeEngine, setActiveEngine] = useState<ForgeEngine>('ZINC');
  const [activeTab, setActiveTab] = useState<'BANNER' | 'THREADS'>('BANNER');
  const [threadText, setThreadText] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  const engine = ENGINES.find(e => e.id === activeEngine)!;

  const handleExport = async () => {
    if (!bannerRef.current) return;
    setIsExporting(true);
    await new Promise(r => setTimeout(r, 400));
    try {
      // @ts-ignore
      const canvas = await window.html2canvas(bannerRef.current, {
        backgroundColor: engine.bg.includes('white') ? '#ffffff' : '#050505',
        scale: 2, 
        logging: false,
        useCORS: true
      });
      const link = document.createElement('a');
      link.download = `VIGIL_BANNER_${activeEngine}_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Export failure:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const threadChunks = threadText.split('\n\n').filter(t => t.trim().length > 0);

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-700">
      
      <div className="flex flex-col lg:flex-row justify-between items-end gap-8 border-b border-zinc-900 pb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-zinc-900" />
            <span className="text-cyan-500 font-black text-[10px] uppercase tracking-[0.6em]">Sovereign Social Forge // Brand Manifesting</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
            Asset <br/> Forge.
          </h2>
          <p className="text-zinc-500 text-lg font-medium italic max-w-xl">
            "Construct high-impact visual narratives and numbered manifestos for digital deployment."
          </p>
        </div>

        <div className="p-1 bg-[#0a0a0a] border border-zinc-900 rounded-2xl flex">
          <button onClick={() => setActiveTab('BANNER')} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'BANNER' ? 'bg-white text-black shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}>
            <Layout className="w-3.5 h-3.5 inline mr-2" /> Banner Lab
          </button>
          <button onClick={() => setActiveTab('THREADS')} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'THREADS' ? 'bg-white text-black shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}>
            <Hash className="w-3.5 h-3.5 inline mr-2" /> Thread Architect
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* SIDEBAR */}
        <div className="lg:col-span-4 space-y-8">
           <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] space-y-10 shadow-2xl">
              
              {activeTab === 'BANNER' ? (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Cpu className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Visual Engine Library</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {ENGINES.map((eng) => (
                        <button 
                          key={eng.id}
                          onClick={() => setActiveEngine(eng.id)}
                          className={`p-3 rounded-xl border text-[8px] font-black uppercase transition-all flex items-center justify-between ${activeEngine === eng.id ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-black border-zinc-900 text-zinc-600 hover:border-zinc-700'}`}
                        >
                          {eng.label}
                          {activeEngine === eng.id && <Zap size={10} className="fill-current" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={handleExport}
                    disabled={isExporting}
                    className="w-full py-5 bg-white text-black text-[12px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
                  >
                    {isExporting ? <Activity className="w-5 h-5 animate-spin" /> : <><Download className="w-5 h-5" /> EXPORT BANNER-PNG</>}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Thread Input Terminal</span>
                    </div>
                    <textarea 
                      value={threadText}
                      onChange={(e) => setThreadText(e.target.value)}
                      placeholder="ENTER MANIFESTO TEXT... SEPARATE CHUNKS WITH DOUBLE LINE BREAK."
                      className="w-full h-[400px] bg-black border border-zinc-800 rounded-2xl p-6 text-xs font-mono text-zinc-400 focus:border-blue-600 outline-none resize-none uppercase leading-relaxed"
                    />
                  </div>
                  <div className="p-4 bg-blue-600/5 border border-blue-500/20 rounded-xl">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest italic">
                      Chunks detected: {threadChunks.length}
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-zinc-800">
                <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest flex items-center justify-center gap-2">
                  <Info className="w-3 h-3" /> DEFINITIVE ASSET PRODUCTION
                </p>
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className="lg:col-span-8 space-y-8">
           {activeTab === 'BANNER' ? (
             <div className="flex flex-col items-center gap-8">
               <div className="relative group w-full border border-zinc-900 rounded-[2.5rem] bg-[#020202] p-6 shadow-inner overflow-hidden flex justify-center">
                  <div 
                    ref={bannerRef}
                    className={`relative ${engine.bg} overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] shrink-0`}
                    style={{ 
                      width: '1500px', 
                      height: '500px', 
                      transform: 'scale(var(--banner-scale))', 
                      transformOrigin: 'center'
                    }}
                  >
                    <style>{`
                      :root { --banner-scale: 0.5; }
                      @media (max-width: 1300px) { :root { --banner-scale: 0.45; } }
                      @media (max-width: 1100px) { :root { --banner-scale: 0.35; } }
                      @media (max-width: 800px) { :root { --banner-scale: 0.25; } }
                      @media (max-width: 500px) { :root { --banner-scale: 0.18; } }

                      .pattern-grid { background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 50px 50px; }
                      .pattern-scanline { background: repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 3px); }
                      .pattern-mesh { background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0); background-size: 30px 30px; }
                      .pattern-dots { background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 0); background-size: 10px 10px; }
                      .pattern-frame { border: 40px solid rgba(255,255,255,0.03); }
                    `}</style>

                    {/* PATTERNS */}
                    {engine.pattern === 'grid' && <div className="absolute inset-0 pattern-grid" />}
                    {engine.pattern === 'scanline' && <div className="absolute inset-0 pattern-scanline" />}
                    {engine.pattern === 'mesh' && <div className="absolute inset-0 pattern-mesh" />}
                    {engine.pattern === 'dots' && <div className="absolute inset-0 pattern-dots" />}
                    {engine.pattern === 'frame' && <div className="absolute inset-0 pattern-frame" />}

                    {/* GLOWS */}
                    {(engine.id === 'INTEL' || engine.pattern === 'glow') && (
                      <div className="absolute top-[-250px] right-[-250px] w-[800px] h-[800px] bg-cyan-600/10 blur-[150px] rounded-full animate-pulse" />
                    )}
                    {engine.id === 'THREAT' && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-red-950/20 to-transparent" />
                    )}

                    {/* IDENTITY (TOP RIGHT) */}
                    <div className="absolute top-12 right-12">
                       <BrandBlock color={engine.id === 'PAPER' || engine.id === 'FINALITY' ? 'black' : 'white'} />
                    </div>

                    {/* CONTENT */}
                    <div className="absolute inset-0 flex flex-col justify-center px-24 space-y-6">
                       <div className="space-y-4">
                          <h1 className={`text-9xl font-black italic uppercase tracking-tighter leading-none ${engine.accent}`}>
                            VIGIL : The <br/> Intent Validator
                          </h1>
                          <div className={`h-2 w-32 ${engine.accent.replace('text-', 'bg-')} rounded-full`} />
                       </div>
                       <p className={`text-4xl font-mono font-black uppercase tracking-[0.6em] ${engine.accent} opacity-40`}>
                          VIGILANCE IS THE ONLY PERMANENT SHIELD.
                       </p>
                    </div>

                    {/* WATERMARK */}
                    <div className="absolute bottom-12 left-24 opacity-10 flex items-center gap-6">
                       <div className={`text-[12px] font-black uppercase tracking-[0.4em] ${engine.accent}`}>VIG-CORE-FORGE</div>
                       <div className={`h-4 w-[1px] ${engine.accent.replace('text-', 'bg-')}`} />
                       <div className={`text-[12px] font-black uppercase tracking-[0.4em] ${engine.accent}`}>REG: {Date.now().toString().slice(-6)}</div>
                    </div>
                  </div>
               </div>
               <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">Preview Scale: 0.5x // Output: 1500x500 PNG</p>
             </div>
           ) : (
             <div className="space-y-6">
                {threadChunks.length === 0 ? (
                  <div className="h-[600px] bg-[#080808] border-2 border-zinc-900 border-dashed rounded-[3rem] flex flex-col items-center justify-center text-center p-12 space-y-6">
                     <TerminalIcon className="w-16 h-16 text-zinc-800" strokeWidth={1} />
                     <div className="space-y-2">
                        <h4 className="text-xl font-black text-zinc-600 uppercase tracking-widest">Awaiting Narrative Input</h4>
                        <p className="text-zinc-700 text-[10px] font-bold uppercase tracking-widest italic">The architect is offline.</p>
                     </div>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                    {threadChunks.map((chunk, i) => (
                      <div key={i} className="bg-[#0a0a0a] border border-zinc-900 rounded-3xl p-10 space-y-6 group hover:border-blue-600/30 transition-all">
                        <div className="flex justify-between items-center border-b border-zinc-900 pb-6">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-zinc-500 font-black text-xs">{i + 1}</div>
                              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Segment {i + 1} / {threadChunks.length}</span>
                           </div>
                           <button 
                             onClick={() => {
                               navigator.clipboard.writeText(chunk);
                               alert(`Segment ${i+1} copied.`);
                             }}
                             className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500 hover:text-blue-500 hover:border-blue-600/40 transition-all"
                           >
                             <Copy size={14} />
                           </button>
                        </div>
                        <p className="text-xl text-zinc-300 font-medium leading-relaxed italic uppercase">
                          {chunk}
                        </p>
                        <div className="pt-4 flex items-center gap-3 text-blue-500 opacity-20 group-hover:opacity-100 transition-opacity">
                           <Twitter size={14} />
                           <span className="text-[9px] font-black uppercase tracking-[0.2em]">Ready for broadcast</span>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-12 text-center">
                       <button 
                         onClick={() => {
                           const full = threadChunks.map((c, i) => `${i+1}/${threadChunks.length}\n\n${c}`).join('\n\n---\n\n');
                           navigator.clipboard.writeText(full);
                           alert("Full sequence copied to clipboard.");
                         }}
                         className="px-10 py-5 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-blue-500 active:scale-95 transition-all"
                       >
                         COPY FULL SEQUENCE
                       </button>
                    </div>
                  </div>
                )}
             </div>
           )}
        </div>
      </div>

      {/* FOOTER METRICS */}
      <div className="pt-20 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Forge Engine: STABLE</span>
           </div>
           <div className="h-4 w-[1px] bg-zinc-800" />
           <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">ASSET_VERSION_V1.1_DEFINITIVE</span>
        </div>
        <div className="flex items-center gap-4">
           <Share2 size={14} className="text-zinc-700" />
           <span className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.4em]">Proprietary Sovereignty Protocols Active</span>
        </div>
      </div>
    </div>
  );
};
