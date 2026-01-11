import React, { useState, useEffect, useRef } from 'react';
import { Film, Download, Play, ShieldCheck, Zap, AlertTriangle, Radio, Globe, Smartphone, ChevronRight, Sparkles, Terminal, Activity, RotateCcw, Share2, Eye, Layout, Clock, ExternalLink, CheckCircle2, BookOpen, History, Lock, MessageSquare, AlertOctagon, UserPlus, FileWarning } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { TechLabel } from './docs/DocHelpers';
import { CHRONICLES, ChronicleVideo, GIF_VAULT, TacticalGif } from './ChronicleNarrativeLibrary';
import { VigilScanner } from './VigilScanner';

type ProductionState = 'IDLE' | 'AUTH_REQUIRED' | 'RENDERING' | 'COMPLETED' | 'ERROR' | 'QUOTA_EXHAUSTED';
type StudioMode = 'TEMPLATES' | 'CHRONICLES' | 'GIFS';

const LOADING_MESSAGES = [
  "Initializing cognitive render engine...",
  "Syncing frame buffers with Sentinel mesh...",
  "Mapping visual entropy collisions...",
  "Encoding Layer 0.5 security graphics...",
  "Finalizing tactical export sequence...",
  "Applying refractive polish to master frames..."
];

export const VideoProductionStudio: React.FC = () => {
  const [state, setState] = useState<ProductionState>('IDLE');
  const [mode, setMode] = useState<StudioMode>('TEMPLATES');
  const [selectedChronicle, setSelectedChronicle] = useState<ChronicleVideo>(CHRONICLES[0]);
  const [selectedGif, setSelectedGif] = useState<TacticalGif>(GIF_VAULT[0]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [progressMsg, setProgressMsg] = useState(LOADING_MESSAGES[0]);
  const [error, setError] = useState<string | null>(null);
  const [apiKeySelected, setApiKeySelected] = useState(false);
  
  const blobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      // @ts-ignore
      const hasKey = await window.aistudio.hasSelectedApiKey();
      setApiKeySelected(hasKey);
      if (!hasKey) setState('AUTH_REQUIRED');
    };
    checkKey();

    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, []);

  const handleSelectKey = async () => {
    try {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setApiKeySelected(true);
      setState('IDLE');
    } catch (err) {
      console.error("Key selection failed", err);
    }
  };

  const handleDownload = () => {
    if (!videoUrl) return;
    const a = document.createElement('a');
    a.href = videoUrl;
    const name = mode === 'CHRONICLES' ? `DAY${selectedChronicle.day}` : mode === 'GIFS' ? selectedGif.id : 'TEMPLATE';
    a.download = `VIGIL_PRODUCTION_${name}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const startGeneration = async () => {
    setState('RENDERING');
    setError(null);
    
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
      setVideoUrl(null);
    }

    // @ts-ignore
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      setApiKeySelected(false);
      setState('AUTH_REQUIRED');
      return;
    }

    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % LOADING_MESSAGES.length;
      setProgressMsg(LOADING_MESSAGES[msgIdx]);
    }, 8000);

    const prompt = mode === 'CHRONICLES' ? selectedChronicle.visualPrompt : mode === 'GIFS' ? selectedGif.visualPrompt : "A high-fidelity tactical security visual loop.";

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        setProgressMsg("Finalizing tactical export sequence...");
        const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        if (!videoResponse.ok) throw new Error("Target resource fetch failed.");
        
        const blob = await videoResponse.blob();
        const localUrl = URL.createObjectURL(blob);
        blobUrlRef.current = localUrl;
        
        setVideoUrl(localUrl);
        setState('COMPLETED');
      } else {
        throw new Error("Target resource not returned by render engine.");
      }
    } catch (err: any) {
      console.error("Video Gen Error:", err);
      const msg = err.message || JSON.stringify(err);
      
      if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("quota")) {
        setState('QUOTA_EXHAUSTED');
      } else if (msg.includes("Requested entity was not found") || msg.includes("API key not valid")) {
        setApiKeySelected(false);
        setState('AUTH_REQUIRED');
      } else {
        setError(msg || "Cognitive render engine encountered an unhandled exception.");
        setState('ERROR');
      }
    } finally {
      clearInterval(msgInterval);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32 px-6">
      <header className="space-y-6">
        <div className="flex items-center gap-4">
          <TechLabel text="OWNER_PROD_SUITE" color="blue" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
          <div className="p-1 bg-[#0a0a0a] border border-zinc-900 rounded-xl flex">
             <button onClick={() => setMode('TEMPLATES')} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${mode === 'TEMPLATES' ? 'bg-zinc-800 text-white' : 'text-zinc-600'}`}>Standard Templates</button>
             <button onClick={() => setMode('CHRONICLES')} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${mode === 'CHRONICLES' ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-600'}`}>The Chronicles</button>
             <button onClick={() => setMode('GIFS')} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${mode === 'GIFS' ? 'bg-red-600 text-white shadow-lg' : 'text-zinc-600'}`}>Tactical GIFs</button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div className="space-y-4">
              <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
                {mode === 'GIFS' ? 'Tactical\nLoops.' : mode === 'CHRONICLES' ? 'Narrative\nForge.' : 'Broadcast\nStudio.'}
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl italic">
                {mode === 'GIFS' ? "High-impact looping evidence for social deployment." : mode === 'CHRONICLES' ? "Direct the definitive 30-day saga of VIGIL." : "Cinematic evidence for definitive tactical output."}
              </p>
           </div>
           
           {!apiKeySelected && (
             <button 
              onClick={handleSelectKey}
              className="px-10 py-5 bg-amber-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-amber-500 transition-all flex items-center gap-4 animate-in slide-in-from-right duration-500"
             >
                <Lock className="w-4 h-4" /> AUTHORIZE PRODUCTION [PRO_KEY]
             </button>
           )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4 space-y-8">
           <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] space-y-8 shadow-2xl relative overflow-hidden">
              <div className="space-y-6">
                 <div className="flex items-center gap-3">
                    <History className="w-4 h-4 text-blue-500" />
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Select Story Arc</span>
                 </div>
                 
                 <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {mode === 'CHRONICLES' && CHRONICLES.map((c) => (
                      <button 
                        key={c.day}
                        disabled={state === 'RENDERING'}
                        onClick={() => setSelectedChronicle(c)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all group relative overflow-hidden ${selectedChronicle.day === c.day ? 'bg-blue-600 border-blue-500 text-white' : 'bg-black border-zinc-900 text-zinc-700 hover:text-zinc-700'}`}
                      >
                         <div className="flex items-center gap-4 relative z-10">
                            <div className="text-[11px] font-black">DAY {c.day < 10 ? `0${c.day}` : c.day}</div>
                            <div className="space-y-0.5">
                               <div className="text-[10px] font-black uppercase tracking-widest truncate max-w-[150px]">{c.theme}</div>
                               <div className={`text-[7px] font-bold uppercase tracking-tight ${selectedChronicle.day === c.day ? 'text-blue-100' : 'text-zinc-700'}`}>{c.era}</div>
                            </div>
                         </div>
                      </button>
                    ))}
                    {mode === 'GIFS' && GIF_VAULT.map((g) => (
                      <button 
                        key={g.id}
                        disabled={state === 'RENDERING'}
                        onClick={() => setSelectedGif(g)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all group relative overflow-hidden ${selectedGif.id === g.id ? 'bg-red-600 border-red-500 text-white' : 'bg-black border-zinc-900 text-zinc-700 hover:text-zinc-700'}`}
                      >
                         <div className="flex items-center gap-4 relative z-10">
                            <div className="text-[11px] font-black">ID: {g.id}</div>
                            <div className="space-y-0.5">
                               <div className="text-[10px] font-black uppercase tracking-widest truncate max-w-[150px]">{g.theme}</div>
                               <div className={`text-[7px] font-bold uppercase tracking-tight ${selectedGif.id === g.id ? 'text-red-100' : 'text-zinc-700'}`}>{g.metadata.type}</div>
                            </div>
                         </div>
                      </button>
                    ))}
                    {mode === 'TEMPLATES' && <div className="p-4 text-[10px] text-zinc-600 font-bold uppercase italic">Standard Templates Loading...</div>}
                 </div>

                 <div className="p-5 bg-black/60 border border-zinc-900 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2">
                       <MessageSquare size={12} className="text-blue-500" />
                       <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Narrative Script</span>
                    </div>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase leading-relaxed italic">
                      "{mode === 'CHRONICLES' ? selectedChronicle.script : mode === 'GIFS' ? selectedGif.script : 'Default Template Script.'}"
                    </p>
                 </div>
              </div>

              <button 
                onClick={startGeneration}
                disabled={state === 'RENDERING' || !apiKeySelected}
                className={`w-full py-6 rounded-2xl text-[12px] font-black uppercase tracking-[0.5em] transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-[0.98] ${state === 'RENDERING' ? 'bg-zinc-900 text-zinc-700 cursor-wait' : 'bg-white text-black hover:bg-blue-600 hover:text-white'}`}
              >
                {state === 'RENDERING' ? <Activity className="w-5 h-5 animate-pulse" /> : <><Sparkles className="w-5 h-5" /> GENERATE CHRONICLE</>}
              </button>
           </div>
        </div>

        <div className="lg:col-span-8 h-full">
           <div className={`relative aspect-video bg-[#050505] border-2 rounded-[3.5rem] overflow-hidden flex flex-col items-center justify-center transition-all duration-700 shadow-[0_40px_100px_rgba(0,0,0,1)] ${state === 'RENDERING' ? 'border-blue-600/40' : 'border-zinc-900'}`}>
              
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                 <div className="absolute inset-0 bg-[linear-gradient(90deg,white_1px,transparent_1px),linear-gradient(white_1px,transparent_1px)] bg-[size:60px_60px]" />
              </div>

              {state === 'IDLE' && (
                <div className="text-center space-y-8 animate-in fade-in duration-1000 px-12">
                   <div className="relative inline-block">
                      <Film className="w-24 h-24 text-zinc-800" strokeWidth={0.5} />
                      <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
                   </div>
                   <div className="space-y-3">
                      <h4 className="text-2xl font-black text-zinc-500 uppercase tracking-[0.4em]">Story Engine Ready.</h4>
                      <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.6em] italic">AWAITING_CHRONICLE_DIRECTIVE</p>
                   </div>
                </div>
              )}

              {state === 'AUTH_REQUIRED' && (
                <div className="text-center space-y-8 animate-in fade-in duration-1000 px-12 relative z-10">
                   <div className="relative inline-block">
                      <Lock className="w-24 h-24 text-amber-600" strokeWidth={0.5} />
                      <div className="absolute inset-0 bg-amber-500/5 blur-3xl rounded-full" />
                   </div>
                   <div className="space-y-6">
                      <div className="space-y-3">
                        <h4 className="text-3xl font-black text-amber-600 uppercase tracking-[0.4em] italic">Handshake Required.</h4>
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.6em] italic leading-relaxed max-w-xs mx-auto">
                          AUTHORIZATION_TOKEN_MISSING_OR_INVALID <br/>
                          <span className="text-zinc-800 font-black not-italic">[CODE: 400_AUTH_REJECTED]</span>
                        </p>
                      </div>
                      <button 
                        onClick={handleSelectKey}
                        className="px-10 py-4 bg-amber-600 text-white rounded-xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-amber-500 transition-all shadow-2xl flex items-center justify-center gap-3 mx-auto"
                      >
                         <Zap size={14} className="fill-current" /> SELECT PRODUCTION KEY
                      </button>
                   </div>
                </div>
              )}

              {state === 'RENDERING' && (
                <div className="w-full h-full flex flex-col items-center justify-center p-12">
                   <VigilScanner label={progressMsg} size="lg" />
                </div>
              )}

              {state === 'QUOTA_EXHAUSTED' && (
                <div className="text-center space-y-10 p-12 animate-in zoom-in duration-500 relative z-10">
                   <div className="relative inline-block">
                      <AlertOctagon className="w-20 h-20 text-red-600" strokeWidth={1} />
                      <div className="absolute inset-0 bg-red-600/10 blur-3xl animate-pulse rounded-full" />
                   </div>
                   <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-4xl font-black text-red-600 uppercase italic tracking-tighter leading-none">Quota Breach.</h3>
                        <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-[0.4em] max-w-xs mx-auto leading-relaxed">
                          THE CURRENT IDENTITY TOKEN HAS EXHAUSTED ITS RENDER QUOTA. <br/>
                          <span className="text-zinc-700 italic">[ERROR_CODE: 429_LIMIT_EXCEEDED]</span>
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-center gap-4">
                        <button 
                          onClick={handleSelectKey}
                          className="px-10 py-4 bg-red-600 text-white rounded-xl text-[11px] font-black uppercase tracking-[0.4em] hover:bg-red-500 transition-all shadow-2xl flex items-center justify-center gap-3"
                        >
                           <UserPlus size={14} /> SWITCH PRODUCTION IDENTITY
                        </button>
                        <a 
                          href="https://ai.google.dev/gemini-api/docs/billing" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[9px] font-black text-blue-500 uppercase tracking-widest underline underline-offset-8 flex items-center gap-2"
                        >
                           <FileWarning size={12} /> Review Billing & Quota Standards
                        </a>
                      </div>
                   </div>
                </div>
              )}

              {state === 'COMPLETED' && videoUrl && (
                <div className="w-full h-full relative group">
                   <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
                   <div className="absolute top-10 left-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="px-5 py-2 bg-emerald-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-3">
                         <CheckCircle2 size={14} /> CHRONICLE_FILE_DECRYPTED
                      </div>
                   </div>
                   <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 flex justify-between items-end">
                      <div className="space-y-2">
                         <div className="text-[12px] font-black text-white uppercase tracking-[0.2em] italic">VIGIL-MASTER-PRODUCTION.MP4</div>
                         <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">ERA: {mode === 'CHRONICLES' ? selectedChronicle.era : 'PRODUCTION'}</div>
                      </div>
                      <button 
                        onClick={handleDownload}
                        className="px-8 py-4 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-2xl flex items-center gap-3"
                      >
                        <Download size={14} /> DOWNLOAD MASTER
                      </button>
                   </div>
                </div>
              )}

              {state === 'ERROR' && (
                <div className="text-center space-y-10 p-12 animate-in zoom-in duration-500">
                   <AlertTriangle className="w-16 h-16 text-red-600 mx-auto" />
                   <div className="space-y-4">
                      <h3 className="text-3xl font-black text-red-600 uppercase italic tracking-tighter leading-none">Render Failure.</h3>
                      <p className="text-[10px] text-zinc-600 uppercase font-bold max-w-xs mx-auto italic break-words">{error}</p>
                   </div>
                   <div className="flex flex-col items-center gap-4">
                      <button onClick={() => setState('IDLE')} className="px-8 py-4 bg-zinc-950 border border-zinc-900 rounded-xl text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-white transition-all">REBOOT SYSTEM</button>
                      <button onClick={handleSelectKey} className="text-[9px] font-black text-blue-500 uppercase tracking-widest underline underline-offset-8">Re-authorize production key</button>
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};
