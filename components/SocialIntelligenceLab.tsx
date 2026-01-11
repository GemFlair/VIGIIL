import React, { useState, useRef, useEffect } from 'react';
import { 
  Share2, Zap, Shield, Download, Terminal as TerminalIcon, 
  Bookmark, Fingerprint, ShieldAlert, ShieldCheck, Type, 
  Settings2, Info, Globe, Cpu, Radio, Layout, EyeOff, 
  Lock, Activity, Target, Layers, Play, Video, X, 
  Timer, Film, CheckCircle2, Loader2, RotateCcw, Box,
  Glasses, Waves, Flame, Move
} from 'lucide-react';

type LayoutType = 'COMPARISON' | 'MANIFESTO' | 'ARCHITECTURE';
type EngineType = 'BRUTALIST' | 'ISOMETRIC' | 'REFRACTIVE' | 'MESH';

interface Preset {
  id: string;
  label: string;
  layout: LayoutType;
  title: string;
  sub: string;
  leftLabel: string;
  leftValue: string;
  rightLabel: string;
  rightValue: string;
  summary: string;
  statusCode: string;
  accent: 'RED' | 'BLUE' | 'EMERALD' | 'CYAN';
}

const PRESETS: Preset[] = [
  {
    id: 'BLIND_SPOT',
    label: 'TWEET 03: BLIND SPOT',
    layout: 'COMPARISON',
    title: 'THE 8-CHAR \n BLIND SPOT.',
    sub: 'COGNITIVE TRUNCATION RISK',
    leftLabel: 'USER_SCAN',
    leftValue: 'Edge Verification',
    rightLabel: 'ADVERSARY_MIMIC',
    rightValue: 'Entropy Collision',
    summary: '94% of users verify only the first and last four characters. This is the biological blind spot where address poisoning thrives. VIGIL intercepts this moment.',
    statusCode: 'RISK_DETECTED',
    accent: 'RED'
  },
  {
    id: 'ENTROPY_COLLISION',
    label: 'ENTROPY COLLISION',
    layout: 'ARCHITECTURE',
    title: 'ENTROPY \n COLLISION.',
    sub: 'VANITY CLUSTER SIGNATURE',
    leftLabel: 'STATIC_EDGES',
    leftValue: 'Familiar Mask',
    rightLabel: 'FORCED_ENTROPY',
    rightValue: 'Poison Node',
    summary: 'High-performance vanity clusters generate addresses with matching edges but different internal entropy. VIGIL cross-references these clusters in real-time.',
    statusCode: 'HEURISTIC_PARITY_CHECK',
    accent: 'BLUE'
  },
  {
    id: 'CLIPBOARD_HIJACK',
    label: 'CLIPBOARD HIJACK',
    layout: 'MANIFESTO',
    title: 'CLIPBOARD \n HIJACK.',
    sub: 'REAL-TIME SWAP DEFENSE',
    leftLabel: 'SYSTEM_COPY',
    leftValue: 'Original Intent',
    rightLabel: 'SHADOW_PASTE',
    rightValue: 'Hijacked Payload',
    summary: 'Scripts can swap clipboard data during the navigation gap. VIGIL protects the clipboard state from intent to settlement.',
    statusCode: 'BUFFER_LOCK_ACTIVE',
    accent: 'CYAN'
  },
  {
    id: 'UI_SPOOFING',
    label: 'UI SPOOFING',
    layout: 'COMPARISON',
    title: 'UI \n SPOOFING.',
    sub: 'DOM MUTATION DEFENSE',
    leftLabel: 'DAPP_INTERFACE',
    leftValue: 'Spoofed Label',
    rightLabel: 'VIGIL_SENTINEL',
    rightValue: 'Reality Anchor',
    summary: 'Deceptive CSS can hide address mutations within trusted dApp interfaces. VIGIL validates the raw DOM tree directly.',
    statusCode: 'PARITY_VERIFIED',
    accent: 'EMERALD'
  }
];

const BrandBlock = ({ color = 'white' }: { color?: string }) => (
  <div className="flex flex-col items-center gap-4 bg-[#050505] p-6 rounded-[1.5rem] border border-zinc-800 shadow-2xl relative group-hover:border-zinc-700 transition-all duration-500">
    <div className="w-16 h-16 bg-white flex items-center justify-center rounded-sm">
      <div className="w-8 h-8 bg-black rotate-45" />
    </div>
    <span className={`italic font-black text-2xl tracking-tighter text-${color} uppercase`}>VIGIL</span>
  </div>
);

interface TacticalContainerProps {
  children: React.ReactNode;
  className?: string;
  defaultHeight?: number;
}

const TacticalContainer: React.FC<TacticalContainerProps> = ({ children, className = "", defaultHeight }) => {
  const [height, setHeight] = useState(defaultHeight || 0);
  const [isResizing, setIsResizing] = useState(false);
  const startYRef = useRef(0);
  const startHRef = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    startYRef.current = e.clientY;
    startHRef.current = height || 0;
    e.preventDefault();
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const deltaY = e.clientY - startYRef.current;
      const newHeight = Math.max(100, startHRef.current + deltaY);
      setHeight(newHeight);
    };
    const onMouseUp = () => setIsResizing(false);
    if (isResizing) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isResizing]);

  return (
    <div 
      className={`relative group/tactical transition-all duration-300 ${className} ${isResizing ? 'border-blue-500/40 ring-1 ring-blue-500/20' : ''}`}
      style={{ height: height ? `${height}px` : 'auto' }}
    >
      <div className="h-full w-full overflow-hidden">
        {children}
      </div>
      
      {/* Resizer Handle */}
      <div 
        onMouseDown={onMouseDown}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-4 cursor-ns-resize flex flex-col items-center justify-center gap-0.5 opacity-0 group-hover/tactical:opacity-100 transition-opacity z-[100]"
      >
        <div className="w-8 h-[1px] bg-zinc-700" />
        <div className="w-8 h-[1px] bg-zinc-700" />
      </div>

      {/* Reticles */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/0 group-hover/tactical:border-blue-500/50 transition-colors" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-500/0 group-hover/tactical:border-blue-500/50 transition-colors" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-500/0 group-hover/tactical:border-blue-500/50 transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/0 group-hover/tactical:border-blue-500/50 transition-colors" />
    </div>
  );
};

export const SocialIntelligenceLab: React.FC = () => {
  const [activeEngine, setActiveEngine] = useState<EngineType>('BRUTALIST');
  const [activeLayout, setActiveLayout] = useState<LayoutType>(PRESETS[0].layout);
  const [title, setTitle] = useState(PRESETS[0].title);
  const [sub, setSub] = useState(PRESETS[0].sub);
  const [leftLabel, setLeftLabel] = useState(PRESETS[0].leftLabel);
  const [leftValue, setLeftValue] = useState(PRESETS[0].leftValue);
  const [rightLabel, setRightLabel] = useState(PRESETS[0].rightLabel);
  const [rightValue, setRightValue] = useState(PRESETS[0].rightValue);
  const [summary, setSummary] = useState(PRESETS[0].summary);
  const [statusCode, setStatusCode] = useState(PRESETS[0].statusCode);
  const [accentColor, setAccentColor] = useState(PRESETS[0].accent);
  const [isExporting, setIsExporting] = useState(false);
  const [isMotionFocus, setIsMotionFocus] = useState(false);
  const [motionIntensity, setMotionIntensity] = useState(1);
  const [analogJitter, setAnalogJitter] = useState(false);
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);

  const captureRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!captureRef.current) return;
    setIsExporting(true);
    await new Promise(r => setTimeout(r, 300));
    try {
      // @ts-ignore
      const canvas = await window.html2canvas(captureRef.current, {
        backgroundColor: '#050505',
        scale: 3, 
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      const link = document.createElement('a');
      link.download = `VIGIL_FORGE_${activeEngine}_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Export failure:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const startMasterRecord = async () => {
    if (!captureRef.current) return;
    
    setCountdown(3);
    const cdInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(cdInterval);
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);

    await new Promise(r => setTimeout(r, 3000));

    setIsRecording(true);
    setRecordingProgress(0);

    const recordCanvas = document.createElement('canvas');
    recordCanvas.width = 1920;
    recordCanvas.height = 1080;
    const ctx = recordCanvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, 1920, 1080);

    const stream = recordCanvas.captureStream(60);
    const recorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 25000000 
    });

    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `VIGIL_MASTER_${activeEngine}_${Date.now()}.webm`;
      link.click();
      setIsRecording(false);
      setRecordingProgress(0);
    };

    recorder.start();

    const duration = 4000;
    const startTime = performance.now();

    const captureFrame = async (now: number) => {
      if (!isRecording) return;
      const elapsed = now - startTime;
      const progress = elapsed / duration;
      setRecordingProgress(Math.min(100, Math.round(progress * 100)));

      if (elapsed < duration) {
        try {
          // @ts-ignore
          const frameCanvas = await window.html2canvas(captureRef.current, {
            backgroundColor: '#050505',
            scale: 1.6,
            logging: false,
            useCORS: true
          });
          
          ctx.fillStyle = '#050505';
          ctx.fillRect(0, 0, 1920, 1080);
          ctx.drawImage(frameCanvas, 0, 0, 1920, 1080);
          
          requestAnimationFrame(captureFrame);
        } catch (e) {
          console.error("Frame capture error", e);
          recorder.stop();
        }
      } else {
        recorder.stop();
      }
    };

    requestAnimationFrame(captureFrame);
  };

  const applyPreset = (p: Preset) => {
    setActiveLayout(p.layout);
    setTitle(p.title);
    setSub(p.sub);
    setLeftLabel(p.leftLabel);
    setLeftValue(p.leftValue);
    setRightLabel(p.rightLabel);
    setRightValue(p.rightValue);
    setSummary(p.summary);
    setStatusCode(p.statusCode);
    setAccentColor(p.accent);
  };

  const getAccentHex = () => {
    switch (accentColor) {
      case 'RED': return '#ef4444';
      case 'EMERALD': return '#10b981';
      case 'CYAN': return '#06b6d4';
      default: return '#3b82f6';
    }
  };

  const renderLayoutContent = () => {
    switch (activeLayout) {
      case 'MANIFESTO':
        return (
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center space-y-12 animate-in fade-in duration-700">
             <div className="space-y-4">
                <div className="flex items-center justify-center gap-6">
                   <div className="h-[1px] w-16 bg-zinc-800" />
                   <span className="text-[16px] font-black text-zinc-500 uppercase tracking-[1em]">{sub}</span>
                   <div className="h-[1px] w-16 bg-zinc-800" />
                </div>
                <h2 className="text-[8.5rem] font-black text-white italic uppercase tracking-tighter leading-[0.75] whitespace-pre-line drop-shadow-2xl">
                   {title}
                </h2>
             </div>
             
             <TacticalContainer className="max-w-4xl w-full p-12 bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[3.5rem] relative overflow-hidden group" defaultHeight={280}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                <p className="text-4xl text-zinc-300 font-medium italic leading-snug">
                   "{summary}"
                </p>
             </TacticalContainer>

             <div className="pt-8 flex items-center gap-10">
                <div className="flex items-center gap-4">
                   <Lock className="w-8 h-8 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
                   <span className="text-[14px] font-black text-zinc-600 uppercase tracking-[0.4em]">{statusCode}</span>
                </div>
             </div>
          </div>
        );
      case 'COMPARISON':
        return (
          <div className="relative z-10 flex flex-col h-full animate-in slide-in-from-left-4 duration-700">
             <div className="space-y-4 mb-16">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded bg-red-600 flex items-center justify-center text-black">
                      <Radio size={28} />
                   </div>
                   <span className="text-[16px] font-black text-zinc-500 uppercase tracking-[0.8em]">{sub}</span>
                </div>
                <h2 className="text-[7rem] font-black text-white italic uppercase tracking-tighter leading-[0.8] whitespace-pre-line">
                   {title}
                </h2>
             </div>

             <div className="grid grid-cols-2 gap-16 flex-1">
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="h-0.5 flex-1 bg-zinc-900" />
                      <span className="text-[14px] font-black text-zinc-600 uppercase tracking-[0.4em]">{leftLabel}</span>
                   </div>
                   <div className="p-12 bg-[#0a0a0a] border border-zinc-800 rounded-[3rem] shadow-inner relative group">
                      <p className="text-4xl font-black text-zinc-500 uppercase italic leading-none">{leftValue}</p>
                      <div className="absolute top-4 right-6 opacity-5 group-hover:opacity-20 transition-opacity">
                         <EyeOff size={40} />
                      </div>
                   </div>
                </div>
                
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                      <span className="text-[14px] font-black text-zinc-500 uppercase tracking-[0.4em]" style={{ color: getAccentHex() }}>{rightLabel}</span>
                      <div className="h-0.5 flex-1 bg-zinc-900" />
                   </div>
                   <div className="p-12 bg-[#0a0a0a] rounded-[3rem] shadow-2xl relative border-2" style={{ borderColor: `${getAccentHex()}44` }}>
                      <p className="text-4xl font-black italic leading-none" style={{ color: getAccentHex() }}>{rightValue}</p>
                      <div className="absolute top-4 right-6 opacity-10 animate-pulse">
                         <Zap size={40} fill={getAccentHex()} color={getAccentHex()} />
                      </div>
                   </div>
                </div>
             </div>

             <TacticalContainer className="pt-12 border-t border-zinc-900 flex items-end justify-between w-full" defaultHeight={160}>
                <div className="flex items-start gap-10 max-w-4xl">
                   <Fingerprint className="w-16 h-16 text-zinc-800" strokeWidth={0.5} />
                   <p className="text-[20px] text-zinc-500 font-bold tracking-tight leading-relaxed max-w-3xl italic">
                      {summary}
                   </p>
                </div>
                <div className="text-right shrink-0">
                   <div className="text-[11px] font-black text-zinc-800 uppercase tracking-[0.5em] mb-1">VIG_INTEL_SYSTEM</div>
                   <div className="text-[14px] font-black uppercase italic tracking-widest" style={{ color: getAccentHex() }}>{statusCode}</div>
                </div>
             </TacticalContainer>
          </div>
        );
      case 'ARCHITECTURE':
        return (
          <div className="relative z-10 flex flex-col h-full animate-in zoom-in duration-1000">
             <div className="flex justify-between items-start mb-20">
                <div className="space-y-4">
                   <div className="px-6 py-2 bg-zinc-900 border border-zinc-800 rounded-lg inline-block">
                      <span className="text-[14px] font-black text-zinc-500 uppercase tracking-widest">{sub}</span>
                   </div>
                   <h2 className="text-[8rem] font-black text-white italic uppercase tracking-tighter leading-[0.75] whitespace-pre-line">
                      {title}
                   </h2>
                </div>
             </div>

             <div className="grid grid-cols-12 gap-12 items-center flex-1">
                <TacticalContainer className="col-span-8 p-12 bg-white/[0.02] border border-white/10 rounded-[4rem] backdrop-blur-3xl space-y-10" defaultHeight={400}>
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                         <Cpu className="w-8 h-8 text-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]" />
                      </div>
                      <div className="space-y-1">
                         <div className="text-[14px] font-black text-cyan-500 uppercase tracking-[0.3em]">Module Specifications</div>
                         <div className="text-3xl font-black text-white italic">{statusCode}</div>
                      </div>
                   </div>
                   <p className="text-3xl text-zinc-400 font-medium italic leading-relaxed">
                      {summary}
                   </p>
                </TacticalContainer>
                
                <div className="col-span-4 space-y-4">
                   {[
                      { l: leftLabel, v: leftValue, i: <Layers size={24} /> },
                      { l: rightLabel, v: rightValue, i: <Database size={24} /> },
                      { l: 'VERDICT_STATE', v: 'ISOLATED', i: <ShieldCheck size={24} /> }
                   ].map((pod, i) => (
                     <div key={i} className="p-8 bg-black/40 border border-zinc-900 rounded-2xl space-y-2 flex flex-col items-center text-center group hover:border-zinc-700 transition-all">
                        <div className="text-zinc-600 mb-2 group-hover:text-cyan-500 transition-colors">{pod.i}</div>
                        <div className="text-[12px] font-black text-zinc-700 uppercase tracking-widest">{pod.l}</div>
                        <div className="text-2xl font-bold text-zinc-300 uppercase">{pod.v}</div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="mt-12 pt-12 border-t border-zinc-900 flex justify-between items-end">
                <div className="text-[14px] font-black text-zinc-800 uppercase tracking-[1em]">VIGIL_LAYER_BLUEPRINT</div>
                <div className="flex items-center gap-4 text-[14px] font-black text-zinc-700 uppercase tracking-widest">
                   <Activity size={18} className="text-emerald-500" /> SYSTEM_PARITY_VERIFIED
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div 
      className={`space-y-16 max-w-[1500px] mx-auto selection:bg-red-500/20 px-6 transition-all duration-700 ${isMotionFocus ? 'bg-black pt-10' : ''}`}
    >
      
      {!isMotionFocus && (
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 border-b border-zinc-900 pb-12 animate-in fade-in duration-700">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-zinc-900" />
              <span className="text-red-500 font-black text-[10px] uppercase tracking-[0.6em]">Visual Intelligence Unit // Asset Forge</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
              Comms <br/> Terminal.
            </h2>
            <p className="text-zinc-500 text-lg font-medium italic max-w-xl">
              "Construct evidence-based infographics for your narrative. Visual integrity is the ultimate validator."
            </p>
          </div>
        </div>
      )}

      <div className={`grid grid-cols-1 ${isMotionFocus ? 'xl:grid-cols-1' : 'xl:grid-cols-12'} gap-12 items-start`}>
        
        {/* EDITOR SIDEBAR */}
        {!isMotionFocus && (
          <div className="xl:col-span-4 space-y-8 h-full animate-in slide-in-from-left-4 duration-700">
             <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] space-y-10 shadow-2xl">
                
                {/* FORGE ENGINE SELECTOR */}
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <Cpu className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Infographic Engine</span>
                   </div>
                   <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'BRUTALIST', icon: <TerminalIcon size={12} />, label: 'Brutalist' },
                        { id: 'ISOMETRIC', icon: <Box size={12} />, label: 'Isometric' },
                        { id: 'REFRACTIVE', icon: <Glasses size={12} />, label: 'Refractive' },
                        { id: 'MESH', icon: <Waves size={12} />, label: 'Neural Mesh' }
                      ].map((eng) => (
                        <button 
                          key={eng.id}
                          onClick={() => setActiveEngine(eng.id as EngineType)}
                          className={`p-3 rounded-xl border text-[9px] font-black uppercase transition-all flex items-center gap-2 ${activeEngine === eng.id ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-black border-zinc-900 text-zinc-600 hover:border-zinc-700'}`}
                        >
                          {eng.icon} {eng.label}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <Bookmark className="w-3.5 h-3.5 text-zinc-600" />
                      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Narrative Presets</span>
                   </div>
                   <div className="grid grid-cols-1 gap-2">
                      {PRESETS.map((p) => (
                        <button 
                          key={p.id}
                          onClick={() => applyPreset(p)}
                          className={`p-4 text-left rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all flex justify-between items-center ${
                            title === p.title ? 'bg-red-600 border-red-500 text-white shadow-lg' : 'bg-black border-zinc-900 text-zinc-600 hover:border-zinc-700'
                          }`}
                        >
                          {p.label}
                          {title === p.title && <Zap size={12} className="fill-current" />}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <Settings2 className="w-4 h-4 text-zinc-600" />
                         <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Canvas Variables</span>
                      </div>
                      <div className="p-1 bg-black border border-zinc-900 rounded-lg flex gap-1">
                         {(['RED', 'BLUE', 'EMERALD', 'CYAN'] as const).map(c => (
                           <button 
                              key={c}
                              onClick={() => setAccentColor(c)}
                              className={`w-4 h-4 rounded-full transition-all ${
                                accentColor === c ? 'ring-2 ring-white scale-110' : 'opacity-40 hover:opacity-100'
                              } ${
                                c === 'RED' ? 'bg-red-500' : c === 'BLUE' ? 'bg-blue-500' : c === 'EMERALD' ? 'bg-emerald-500' : c === 'CYAN' ? 'bg-cyan-500' : ''
                              }`}
                           />
                         ))}
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="space-y-1.5">
                         <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">Layout</label>
                         <div className="grid grid-cols-3 gap-2">
                            {(['COMPARISON', 'MANIFESTO', 'ARCHITECTURE'] as LayoutType[]).map(l => (
                              <button 
                                key={l}
                                onClick={() => setActiveLayout(l)}
                                className={`py-2 px-1 rounded-lg border text-[8px] font-black uppercase transition-all ${activeLayout === l ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-black border-zinc-900 text-zinc-600'}`}
                              >
                                {l}
                              </button>
                            ))}
                         </div>
                      </div>

                      <div className="space-y-1.5">
                         <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">Post Title</label>
                         <textarea value={title} onChange={(e) => setTitle(e.target.value.toUpperCase())} className="w-full h-20 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-xs font-mono text-zinc-300 focus:border-red-600 outline-none resize-none uppercase" />
                      </div>

                      <div className="space-y-4 pt-4 border-t border-zinc-800/50">
                        <div className="flex items-center justify-between">
                           <label className="text-[9px] font-black text-blue-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                             <Play className="w-3 h-3" /> Motion Velocity
                           </label>
                           <input 
                              type="range" min="0.5" max="3" step="0.5" 
                              value={motionIntensity} 
                              onChange={(e) => setMotionIntensity(parseFloat(e.target.value))}
                              className="w-20 accent-blue-600"
                           />
                        </div>
                        <button 
                          onClick={() => setAnalogJitter(!analogJitter)}
                          className={`w-full py-2.5 rounded-lg border text-[9px] font-black uppercase transition-all flex items-center justify-center gap-2 ${analogJitter ? 'bg-red-600/10 border-red-500 text-red-500 shadow-lg shadow-red-600/10' : 'bg-black border-zinc-900 text-zinc-600'}`}
                        >
                          <Flame size={12} /> Analog Error Mode: {analogJitter ? 'ON' : 'OFF'}
                        </button>
                      </div>

                      <div className="space-y-1.5 pt-2">
                         <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">Forensic Summary</label>
                         <textarea value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full h-32 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-[10px] font-mono text-zinc-300 focus:border-blue-600 outline-none resize-none italic" />
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <button 
                     onClick={handleExport}
                     disabled={isExporting || isRecording}
                     className="w-full py-5 bg-white text-black text-[12px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-zinc-200 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
                   >
                     {isExporting ? <Activity className="w-5 h-5 animate-spin" /> : <><Download className="w-5 h-5" /> EXPORT DEF-PNG</>}
                   </button>
                   
                   <button 
                     onClick={() => setIsMotionFocus(true)}
                     disabled={isRecording}
                     className="w-full py-4 bg-zinc-950 border border-zinc-900 text-zinc-400 text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl hover:text-white hover:bg-zinc-900 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                   >
                     <Video className="w-4 h-4" /> MOTION CAPTURE MODE
                   </button>

                   <p className="text-center text-[9px] font-black text-zinc-700 uppercase tracking-widest flex items-center justify-center gap-2">
                      <Info className="w-3 h-3" /> PNG: 1200x675 // WEBM: Master Loop
                   </p>
                </div>
             </div>
          </div>
        )}

        {/* CANVAS PREVIEW AREA */}
        <div className={`${isMotionFocus ? 'col-span-full' : 'xl:col-span-8'} flex flex-col items-center animate-in fade-in zoom-in duration-700 relative`}>
           
           {/* RECORDING OVERLAY HUD */}
           {(isRecording || countdown !== null) && (
             <div className="fixed inset-0 z-[500] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-12 text-center space-y-12">
                {countdown !== null ? (
                  <div className="space-y-6 animate-in zoom-in duration-500">
                    <div className="w-32 h-32 rounded-full border-4 border-white/20 flex items-center justify-center relative">
                       <div className="absolute inset-0 border-4 border-red-600 rounded-full animate-ping opacity-20" />
                       <span className="text-6xl font-black text-white italic">{countdown}</span>
                    </div>
                    <div className="space-y-2">
                       <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Calibration Start.</h3>
                       <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.6em]">Clearing Frame Buffers...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-12 w-full max-w-xl">
                    <div className="flex flex-col items-center gap-8">
                       <div className="relative">
                          <Loader2 className="w-24 h-24 text-red-600 animate-spin" strokeWidth={1} />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <Film className="w-8 h-8 text-white animate-pulse" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">MASTER RECORD ACTIVE.</h3>
                          <div className="flex items-center justify-center gap-3">
                             <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                             <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">ENCODING_STREAM // {recordingProgress}%</span>
                          </div>
                       </div>
                    </div>
                    
                    <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                       <div className="h-full bg-red-600 transition-all duration-300 shadow-[0_0_15px_#ef4444]" style={{ width: `${recordingProgress}%` }} />
                    </div>

                    <p className="text-zinc-600 text-[11px] font-bold uppercase tracking-[0.2em] italic max-w-md mx-auto">
                      "Hold focus. The master loop captures 4 seconds of live operational telemetry. Do not minimize browser."
                    </p>
                  </div>
                )}
             </div>
           )}

           {isMotionFocus && !isRecording && countdown === null && (
             <div className="w-full max-w-[1200px] mb-8 flex flex-col md:flex-row items-center justify-between px-6 gap-6">
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]" />
                      <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">RECORD_BRIDGE_READY</span>
                   </div>
                   <div className="h-4 w-[1px] bg-zinc-800 hidden md:block" />
                   <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest italic max-sm">
                     {activeEngine} Engine. Ultra-High Fidelity Sync. 1:1 Browser Parity.
                   </p>
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <button 
                    onClick={startMasterRecord}
                    className="flex-1 md:flex-none px-10 py-3 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-xl hover:bg-red-500 transition-all shadow-[0_0_40px_rgba(239,68,68,0.2)] active:scale-95 flex items-center justify-center gap-3"
                  >
                    <Film className="w-4 h-4" /> START MASTER EXPORT
                  </button>
                  <button 
                    onClick={() => setIsMotionFocus(false)}
                    className="flex-1 md:flex-none px-6 py-3 border border-zinc-800 text-zinc-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:text-white hover:bg-zinc-900 transition-all"
                  >
                    DISENGAGE
                  </button>
                </div>
             </div>
           )}

           <div className={`relative group w-full flex justify-center border-2 ${isMotionFocus ? 'border-red-900/40' : 'border-zinc-900'} rounded-[3.5rem] bg-black p-4 md:p-12 overflow-hidden shadow-inner min-h-[500px]`}>
              <div 
                ref={captureRef}
                className={`bg-[#050505] rounded-[3.5rem] border border-zinc-900 relative overflow-hidden flex flex-col p-16 justify-between shadow-[0_40px_150px_rgba(0,0,0,1)] shrink-0 
                  ${analogJitter ? 'animate-analog-jitter' : ''}
                `}
                style={{ 
                  width: '1200px', 
                  height: '675px', 
                  transform: 'scale(var(--canvas-scale))', 
                  transformOrigin: 'center',
                  perspective: '1500px'
                }}
              >
                 <style>{`
                   /* Fix incorrect backslashes in template literals */
                   :root { --canvas-scale: 0.65; --motion-vel: ${4 / motionIntensity}s; }
                   @media (max-width: 1500px) { :root { --canvas-scale: 0.55; } }
                   @media (max-width: 1350px) { :root { --canvas-scale: 0.45; } }
                   @media (max-width: 1024px) { :root { --canvas-scale: 0.4; } }
                   @media (max-width: 768px) { :root { --canvas-scale: 0.28; } }
                   @media (max-width: 500px) { :root { --canvas-scale: 0.22; } }
                   
                   @keyframes scan-line {
                     0% { transform: translateY(-100%); }
                     100% { transform: translateY(1500%); }
                   }
                   @keyframes flare-pulse {
                     0%, 100% { opacity: 0.1; transform: scale(1); }
                     50% { opacity: 0.25; transform: scale(1.1); }
                   }
                   @keyframes analog-jitter {
                     0%, 100% { transform: scale(var(--canvas-scale)) translate(0, 0); filter: contrast(1); }
                     5% { transform: scale(var(--canvas-scale)) translate(-1px, 2px); filter: contrast(1.2) brightness(1.1); }
                     10% { transform: scale(var(--canvas-scale)) translate(2px, -1px); }
                     15% { transform: scale(var(--canvas-scale)) translate(-2px, 0); }
                   }
                   @keyframes mesh-drift {
                     0% { background-position: 0 0; }
                     100% { background-position: 100px 100px; }
                   }
                   @keyframes focus-rack {
                     0%, 100% { filter: blur(0px); }
                     50% { filter: blur(3px); }
                   }
                   .grain { opacity: 0.04; pointer-events: none; mix-blend-mode: overlay; }
                   .animate-scan-line { animation: scan-line var(--motion-vel) linear infinite; }
                   .animate-flare-pulse { animation: flare-pulse 2s ease-in-out infinite; }
                   .animate-analog-jitter { animation: analog-jitter 0.2s infinite; }
                   .engine-isometric { transform: rotateX(25deg) rotateY(-25deg) rotateZ(5deg); }
                   .engine-refractive { animation: focus-rack 4s ease-in-out infinite; }
                   .engine-mesh { background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0); background-size: 40px 40px; animation: mesh-drift 10s linear infinite; }
                   
                   .no-scrollbar::-webkit-scrollbar { display: none; }
                   .cursor-ns-resize { cursor: ns-resize; }
                 `}</style>

                 {/* BACKGROUND LAYERS */}
                 {/* Fix incorrect backslashes in template literals and unclosed template string */}
                 <div className={`absolute inset-0 opacity-[0.05] pointer-events-none bg-[size:50px_50px] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] ${activeEngine === 'MESH' ? 'animate-mesh-drift' : ''}`} />
                 <div className="absolute inset-0 grain bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />
                 
                 {/* ACCENT GLOWS */}
                 <div 
                   className="absolute -top-32 -right-32 w-96 h-96 blur-[120px] opacity-20 pointer-events-none transition-colors duration-1000 animate-flare-pulse"
                   style={{ backgroundColor: getAccentHex() }}
                 />
                 <div 
                   className="absolute -bottom-32 -left-32 w-96 h-96 blur-[120px] opacity-10 pointer-events-none transition-colors duration-1000"
                   style={{ backgroundColor: getAccentHex() }}
                 />

                 {/* TACTICAL IDENTITY (ALWAYS TOP RIGHT) */}
                 <div className="absolute top-16 right-16 z-50 scale-[0.8] origin-top-right">
                    <BrandBlock color="white" />
                 </div>

                 {/* SCANLINE EFFECT */}
                 <div className="absolute top-0 left-0 w-full h-[2px] bg-white opacity-10 shadow-[0_0_25px_white] pointer-events-none animate-scan-line" />

                 {/* ENGINE WRAPPER */}
                 {/* Fix incorrect backslashes in template literals */}
                 <div className={`h-full w-full transition-all duration-1000 
                   ${activeEngine === 'ISOMETRIC' ? 'engine-isometric' : ''}
                   ${activeEngine === 'REFRACTIVE' ? 'engine-refractive' : ''}
                   ${activeEngine === 'MESH' ? 'engine-mesh' : ''}
                 `}>
                    {/* Unique Engine Background Elements */}
                    {activeEngine === 'REFRACTIVE' && (
                      <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl mix-blend-color-dodge" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl mix-blend-color-dodge" />
                      </div>
                    )}

                    {activeEngine === 'ISOMETRIC' && (
                      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full border-[100px] border-white/[0.02] transform translate-z-[-200px]" />
                      </div>
                    )}

                    {renderLayoutContent()}
                 </div>

                 {/* FOOTER DATA LOG (GLOBAL) */}
                 <div className="absolute bottom-10 right-16 flex items-center gap-12 opacity-30 pointer-events-none">
                    <div className="text-right">
                       <div className="text-[12px] font-black uppercase tracking-widest">SYS_REF</div>
                       <div className="text-[10px] font-mono">VIG-COMMS-2026-X</div>
                    </div>
                    <div className="h-10 w-[1px] bg-zinc-800" />
                    <div className="text-right">
                       <div className="text-[12px] font-black uppercase tracking-widest">ENCRYPTION</div>
                       <div className="text-[10px] font-mono">AES-256-L0.5</div>
                    </div>
                 </div>
              </div>
           </div>
           
           {!isMotionFocus && (
             <div className="mt-8 flex items-center gap-4 opacity-40 animate-in fade-in duration-700">
               <Share2 className="w-4 h-4 text-zinc-600" />
               <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">Visual Asset ID: VIG-INTEL-{Date.now().toString().slice(-4)}</span>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const Database = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);
