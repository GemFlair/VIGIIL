import React, { useState, useEffect } from 'react';
import { 
  Download, Twitter, Sparkles, Terminal, 
  Cpu, Activity, Layout, 
  Settings2, Loader2, RotateCcw, 
  ShieldAlert, Lock, Zap, Box, 
  Maximize, Layers, Ruler
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { TechLabel, TechNote } from './docs/DocHelpers';
import { VigilScanner } from './VigilScanner';

type ArchitectState = 'IDLE' | 'AUTH_REQUIRED' | 'FORGING' | 'COMPLETED' | 'ERROR' | 'QUOTA_EXHAUSTED';
type Resolution = '1K' | '2K' | '4K';

const SYSTEM_CONSTRAINTS = (res: string) => `
MASTER PROMPT — VIGIL TWITTER HEADER (1500×500):
Design a premium Twitter/X header (1500×500px) for the security standard VIGIL.

AESTHETIC RULES:
• Background: Absolute deep charcoal (hex #050505).
• Style: Pure flat design. ZERO gradients, ZERO bloom, ZERO glow, ZERO shadows.
• Weight: Technical 1px line weights only.

COMPOSITION:
• Horizontal Axis: Elements must be strictly locked to a single horizontal center-line.
• Order (Left to Right): [SCANNING LOGO] [WORDMARK] [TAGLINE]
• Layout: Elements are grouped together and centered as a single lockup. Heavy negative space to the left and right.

ELEMENT 1: THE LOGO (X-RAY SCANNING VL)
• A geometric "VL" shard constructed with 1px white lines.
• Overlaid with cyan (#22d3ee) "scanning" pass-lines, resembling a diagnostic x-ray or oscilloscope scan.
• Style: Engineered schematic.

ELEMENT 2: THE WORDMARK (VIGIL)
• Text: "VIGIL"
• Font: Monolithic, ultra-heavy geometric sans-serif (Italic).
• Color: Pure white (#FFFFFF).
• Spacing: Precise, mathematical letter-spacing.

ELEMENT 3: THE TAGLINE
• Text: "VIGILANCE WITHOUT SURVEILLANCE."
• Font: Technical high-precision Monospace.
• Color: Dimmed Zinc/Cyan-Grey (#71717a).
• Formatting: Extremely wide tracking (0.5em letter-spacing).

REFINEMENT DIRECTIVE:
Eliminate the 'AI-generated symmetry' look. It must feel like a definitive infrastructure diagram.

Resolution: ${res} standard.
`;

export const FlagshipHeaderArchitect: React.FC = () => {
  const [state, setState] = useState<ArchitectState>('IDLE');
  const [resolution, setResolution] = useState<Resolution>('2K');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progressMsg, setProgressMsg] = useState('CALIBRATING_GEOMETRIC_PRIMITIVES');
  const [apiKeySelected, setApiKeySelected] = useState(false);
  const [usage, setUsage] = useState<{ tokens: number; latency: number } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      // @ts-ignore
      const hasKey = await window.aistudio.hasSelectedApiKey();
      setApiKeySelected(hasKey);
      if (!hasKey) setState('AUTH_REQUIRED');
    };
    checkAuth();
  }, []);

  const handleSelectKey = async () => {
    try {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setApiKeySelected(true);
      setState('IDLE');
    } catch (err) {
      console.error("Auth Error:", err);
    }
  };

  const startForge = async () => {
    setState('FORGING');
    setError(null);
    setProgressMsg('CALIBRATING_GEOMETRIC_PRIMITIVES');
    const start = Date.now();

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: SYSTEM_CONSTRAINTS(resolution) }]
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9", 
            imageSize: resolution
          }
        }
      });

      const latency = Date.now() - start;
      
      let foundImage = false;
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          setImageUrl(`data:image/png;base64,${base64Data}`);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) throw new Error("Forge engine failed to output pixel data.");

      setUsage({
        tokens: response.usageMetadata?.totalTokenCount || 0,
        latency: latency
      });
      setState('COMPLETED');
    } catch (err: any) {
      console.error("Forge Error:", err);
      const rawMsg = err.message || "";
      let displayError = "Forge kernel exception.";
      
      try {
        const parsed = JSON.parse(rawMsg);
        displayError = parsed.error?.message || rawMsg;
      } catch {
        displayError = rawMsg;
      }

      if (rawMsg.includes("429") || rawMsg.includes("quota")) {
        setState('QUOTA_EXHAUSTED');
      } else if (rawMsg.includes("entity was not found")) {
        setApiKeySelected(false);
        setState('AUTH_REQUIRED');
      } else if (rawMsg.includes("503") || rawMsg.includes("expired") || rawMsg.includes("UNAVAILABLE")) {
        setError("ENGINE_CONGESTION: Deadline expired. Forge under heavy load.");
        setState('ERROR');
      } else {
        setError(displayError || "Forge kernel exception.");
        setState('ERROR');
      }
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `VIGIL_FLAGSHIP_${resolution}_${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-700 pb-32">
      
      <div className="flex flex-col lg:flex-row justify-between items-end gap-8 border-b border-zinc-900 pb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-zinc-900" />
            <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.6em]">Pro Identity Forge // High-Fidelity</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
            Brand <br/> Architect.
          </h2>
          <p className="text-zinc-500 text-lg font-medium italic max-w-xl">
            "Generate engineered Twitter headers. Flat design, zero bloom, 4K precision for the VIGIL standard."
          </p>
        </div>

        <div className="p-1 bg-[#0a0a0a] border border-zinc-900 rounded-2xl flex">
          {(['1K', '2K', '4K'] as Resolution[]).map(res => (
            <button 
              key={res} 
              onClick={() => setResolution(res)}
              disabled={state === 'FORGING'}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${resolution === res ? 'bg-white text-black shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              {res}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* CONTROL SIDEBAR */}
        <div className="lg:col-span-4 space-y-8">
           <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] space-y-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
                 <Ruler size={120} className="text-white" />
              </div>
              
              <div className="space-y-6 relative z-10">
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <Settings2 className="w-4 h-4 text-blue-500" />
                       <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Architectural Rules</span>
                    </div>
                    <div className="space-y-2">
                       {[
                         "Strict Flatness",
                         "1px Line Weights",
                         "Horizontal Lockup",
                         "X-Ray Scanning VL"
                       ].map(c => (
                         <div key={c} className="flex items-center gap-3 text-[9px] font-black text-zinc-600 uppercase tracking-widest p-3.5 bg-black border border-zinc-900 rounded-xl">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" /> {c}
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="p-5 bg-black border border-zinc-900 rounded-2xl space-y-3 shadow-inner">
                    <div className="flex items-center gap-2">
                       <Terminal size={12} className="text-zinc-500" />
                       <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Forge Status</span>
                    </div>
                    <div className="flex gap-2">
                       <span className="text-[10px] font-mono text-zinc-500 font-bold">{'>'}_</span>
                       <p className="text-[10px] font-mono text-zinc-600 leading-relaxed uppercase tracking-tighter italic">
                          {state === 'FORGING' ? progressMsg : 'KERNEL_READY_FOR_DIRECTIVE'}
                       </p>
                    </div>
                 </div>
              </div>

              <div className="space-y-4 relative z-10">
                {!apiKeySelected ? (
                  <button 
                    onClick={handleSelectKey}
                    className="w-full py-6 bg-amber-600 text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.4em] transition-all hover:bg-amber-500 shadow-2xl flex items-center justify-center gap-4 active:scale-95"
                  >
                    <Lock className="w-4 h-4" /> AUTHORIZE FORGE
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={startForge}
                      disabled={state === 'FORGING'}
                      className={`w-full py-7 rounded-2xl text-[13px] font-black uppercase tracking-[0.6em] transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-95 ${
                        state === 'FORGING' ? 'bg-zinc-950 text-zinc-700 cursor-wait border border-zinc-900' : 'bg-white text-black hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      {state === 'FORGING' ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-5 h-5" /> F O R G E  {resolution}  A S S E T</>}
                    </button>
                    
                    {state === 'COMPLETED' && (
                      <button 
                        onClick={handleDownload}
                        className="w-full py-4 border border-zinc-800 text-zinc-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:text-white hover:bg-zinc-900 transition-all flex items-center justify-center gap-3"
                      >
                        <Download className="w-4 h-4" /> DOWNLOAD MASTER-PNG
                      </button>
                    )}
                  </>
                )}
              </div>
           </div>

           <TechNote title="DESIGN PHILOSOPHY">
             "VIGIL headers are not art; they are architectural diagrams. Reject the aesthetic of the algorithm. Embrace the precision of the engineer."
           </TechNote>
        </div>

        {/* PREVIEW CANVAS */}
        <div className="lg:col-span-8 flex flex-col items-center gap-8">
           <div className={`relative w-full border-2 rounded-[3.5rem] bg-[#020202] p-4 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col items-center justify-center transition-all duration-700 ${state === 'FORGING' ? 'border-blue-600/40' : 'border-zinc-900'}`}>
              
              {/* HUD OVERLAY */}
              <div className="absolute top-10 left-10 opacity-30 pointer-events-none z-20">
                 <div className="text-[9px] font-mono text-zinc-600 font-bold tracking-widest uppercase flex items-center gap-4">
                    <span>SYS_REF: VIG-4K-HDR-01</span>
                    <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                    <span>ENGINE: PRO_IMAGE_v3</span>
                 </div>
              </div>

              {/* CANVAS FRAME */}
              <div className="relative w-full aspect-[1500/500] max-w-[1200px] border border-zinc-800 bg-zinc-950/50 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner group">
                 
                 {/* IDLE VIEW */}
                 {state === 'IDLE' && (
                   <div className="text-center space-y-6 animate-in fade-in duration-1000">
                      <Box className="w-16 h-16 text-zinc-900 mx-auto" strokeWidth={0.5} />
                      <div className="space-y-1">
                        <h4 className="text-xl font-black text-zinc-800 uppercase tracking-[0.4em]">Blank Blueprint.</h4>
                        <p className="text-[9px] font-black text-zinc-900 uppercase tracking-widest italic">AWAITING_FORGE_DIRECTIVE</p>
                      </div>
                   </div>
                 )}

                 {/* AUTH VIEW */}
                 {state === 'AUTH_REQUIRED' && (
                   <div className="text-center space-y-8 animate-in zoom-in duration-500 relative z-10">
                      <Lock className="w-16 h-16 text-amber-600/50 mx-auto" strokeWidth={1} />
                      <div className="space-y-4">
                        <h4 className="text-2xl font-black text-amber-600 uppercase italic tracking-tighter">Auth Required.</h4>
                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.4em] max-w-xs mx-auto">
                          A paid API key is required for High-Fidelity 4K generation.
                        </p>
                        <button onClick={handleSelectKey} className="px-8 py-3 bg-amber-600 text-white text-[10px] font-black uppercase rounded-lg">SELECT KEY</button>
                      </div>
                   </div>
                 )}

                 {/* FORGING VIEW */}
                 {state === 'FORGING' && (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                       <VigilScanner size="lg" label={progressMsg} />
                    </div>
                 )}

                 {/* RESULT VIEW */}
                 {state === 'COMPLETED' && imageUrl && (
                   <div className="w-full h-full relative group/img animate-in zoom-in duration-700">
                      <img src={imageUrl} alt="Forged VIGIL Header" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-6 backdrop-blur-sm">
                         <button onClick={handleDownload} className="p-5 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-2xl">
                            <Download size={24} />
                         </button>
                         <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=Elevating my security identity with @vigil_layer.`, '_blank')} className="p-5 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform shadow-2xl">
                            <Twitter size={24} />
                         </button>
                      </div>
                   </div>
                 )}

                 {/* QUOTA VIEW */}
                 {state === 'QUOTA_EXHAUSTED' && (
                    <div className="text-center space-y-6">
                       <ShieldAlert className="w-16 h-16 text-red-600 mx-auto" strokeWidth={1} />
                       <div className="space-y-2">
                         <h4 className="text-xl font-black text-red-600 uppercase italic">Quota Exhausted.</h4>
                         <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest max-w-xs mx-auto">Visit ai.google.dev/gemini-api/docs/billing</p>
                       </div>
                       <button onClick={handleSelectKey} className="px-6 py-2 bg-zinc-900 border border-zinc-800 text-zinc-500 text-[10px] font-black uppercase tracking-widest rounded-lg hover:text-white transition-all">SWITCH KEY</button>
                    </div>
                 )}

                 {/* ERROR VIEW */}
                 {state === 'ERROR' && (
                   <div className="text-center space-y-6">
                      <ShieldAlert className="w-16 h-16 text-red-600 mx-auto" strokeWidth={1} />
                      <div className="space-y-2">
                         <h4 className="text-xl font-black text-red-600 uppercase italic">Forge Breach.</h4>
                         <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest max-w-xs mx-auto">{error}</p>
                      </div>
                      <button onClick={startForge} className="px-6 py-2 bg-zinc-900 border border-zinc-800 text-zinc-500 text-[10px] font-black uppercase tracking-widest rounded-lg hover:text-white transition-all">RETRY</button>
                   </div>
                 )}
              </div>
           </div>

           {/* TELEMETRY FOOTER */}
           {usage && (
             <div className="grid grid-cols-3 gap-12 w-full max-w-2xl px-6 opacity-40 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="space-y-1">
                   <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Forge Engine</div>
                   <div className="text-xl font-black text-white italic tracking-tighter uppercase">Gemini 3 Pro</div>
                </div>
                <div className="space-y-1 border-x border-zinc-900 px-12">
                   <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Forge Time</div>
                   <div className="text-xl font-black text-blue-500 italic tracking-tighter">{(usage.latency / 1000).toFixed(2)}s</div>
                </div>
                <div className="text-right space-y-1">
                   <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Asset Fidelity</div>
                   <div className="text-xl font-black text-emerald-500 italic tracking-tighter uppercase">{resolution} ULTRA</div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};