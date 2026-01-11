import React, { useRef, useState } from 'react';
import { Download, Twitter, Shield, Binary, Fingerprint, Globe, Lock, AlertTriangle, Cpu, Layout, FileText, ChevronRight } from 'lucide-react';
// Import TechLabel helper component
import { TechLabel } from './docs/DocHelpers';

interface InfographicProps {
  tweetText: string;
}

type BriefingMode = 'ALERT' | 'BLUEPRINT' | 'MASTER';

export const InfographicGenerator: React.FC<InfographicProps> = ({ tweetText }) => {
  const infographicRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [mode, setMode] = useState<BriefingMode>('ALERT');

  const downloadImage = async () => {
    if (!infographicRef.current) return;
    setIsCapturing(true);
    
    // Ensure all styles are settled
    await new Promise(r => setTimeout(r, 200));
    
    try {
      // @ts-ignore - html2canvas is loaded via script tag in index.html
      const canvas = await window.html2canvas(infographicRef.current, {
        backgroundColor: mode === 'MASTER' ? '#ffffff' : '#020202',
        scale: 2.5, // Ultra-high resolution for professional sharing
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      const link = document.createElement('a');
      link.download = `VIGIL-${mode}-BRIEFING-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to generate infographic:', err);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleTweet = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(url, '_blank');
  };

  const getModeStyles = () => {
    switch (mode) {
      case 'BLUEPRINT': return {
        bg: 'bg-[#020202]',
        accent: 'text-cyan-500',
        glow: 'bg-cyan-600/10',
        border: 'border-zinc-900',
        label: 'STRATEGIC ARCHITECTURE BLUEPRINT'
      };
      case 'MASTER': return {
        bg: 'bg-white',
        accent: 'text-blue-600',
        glow: 'bg-blue-600/5',
        border: 'border-zinc-200',
        label: 'MASTER RESEARCH SUMMARY'
      };
      default: return {
        bg: 'bg-[#020202]',
        accent: 'text-red-600',
        glow: 'bg-red-600/10',
        border: 'border-zinc-900',
        label: 'HIGH-PRIORITY STRATEGIC ALERT'
      };
    }
  };

  const styles = getModeStyles();

  return (
    <div className="space-y-8">
      {/* Template Selector & Export Controls */}
      <div className="flex flex-col lg:flex-row items-stretch gap-6">
        <div className="flex-1 p-6 bg-zinc-900/30 border border-zinc-800 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
             <div className="flex items-center gap-2">
               <Layout className="w-4 h-4 text-zinc-600" />
               <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Briefing Mode Selection</h4>
             </div>
             <div className="flex items-center gap-2">
                {[
                  { m: 'ALERT', l: 'Alert' },
                  { m: 'BLUEPRINT', l: 'Blueprint' },
                  { m: 'MASTER', l: 'Master' }
                ].map((item) => (
                  <button
                    key={item.m}
                    onClick={() => setMode(item.m as BriefingMode)}
                    className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg border transition-all ${
                      mode === item.m 
                        ? 'bg-white text-black border-white shadow-xl' 
                        : 'bg-zinc-950 text-zinc-600 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {item.l}
                  </button>
                ))}
             </div>
          </div>

          <div className="h-full w-[1px] bg-zinc-800 hidden md:block" />

          <div className="flex items-center gap-4">
            <button 
              onClick={handleTweet}
              className="px-6 py-4 bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 text-[#1DA1F2] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#1DA1F2] hover:text-white transition-all flex items-center gap-2"
            >
              <Twitter className="w-4 h-4" /> SHARE TWEET
            </button>
            <button 
              onClick={downloadImage}
              disabled={isCapturing}
              className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 shadow-xl disabled:opacity-50"
            >
              {isCapturing ? 'GENERATING...' : <><Download className="w-4 h-4" /> EXPORT INFOGRAPHIC</>}
            </button>
          </div>
        </div>
      </div>

      {/* High-Res Canvas */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-900 bg-zinc-950 group shadow-2xl">
        <div className="w-full aspect-[16/9] overflow-hidden">
          <div 
            ref={infographicRef}
            className={`${styles.bg} relative flex flex-col justify-between overflow-hidden`}
            style={{ 
              width: '1200px', 
              height: '675px', 
              transform: 'scale(var(--scale-factor))', 
              transformOrigin: 'top left',
              padding: '60px'
            }}
          >
            <style>{`
              :root { --scale-factor: 1; }
              @media (max-width: 1200px) { :root { --scale-factor: 0.8; } }
              @media (max-width: 900px) { :root { --scale-factor: 0.65; } }
              @media (max-width: 700px) { :root { --scale-factor: 0.45; } }
              @media (max-width: 500px) { :root { --scale-factor: 0.35; } }
            `}</style>
            
            {/* Background Texture */}
            <div className={`absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(90deg,${mode === 'MASTER' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}_1px,transparent_1px),linear-gradient(${mode === 'MASTER' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}_1px,transparent_1px)] bg-[size:60px_60px]`} />
            <div className={`absolute inset-0 ${styles.glow} blur-[120px] rounded-full pointer-events-none`} />

            {/* Template-Specific Elements */}
            {mode === 'ALERT' && (
              <div className="absolute top-0 left-0 w-full p-4 bg-red-600 flex items-center justify-center gap-12 overflow-hidden whitespace-nowrap opacity-20 rotate-[-1deg] translate-y-[-10px]">
                {Array(10).fill(0).map((_, i) => (
                  <span key={i} className="text-black font-black text-xs tracking-widest uppercase">STRATEGIC_THREAT_DETECTED // HUMAN_LAYER_VULNERABILITY</span>
                ))}
              </div>
            )}

            {/* Header Area */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="space-y-4">
                <div className={`flex items-center gap-3 ${mode === 'MASTER' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                   <FileText className="w-5 h-5" />
                   <div className="text-[11px] font-mono uppercase tracking-[0.4em]">{styles.label}</div>
                </div>
                <div className={`px-4 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-widest border ${
                   mode === 'MASTER' 
                    ? 'bg-zinc-100 border-zinc-200 text-zinc-600' 
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-400'
                }`}>
                  DOC_ID: VIG-STRAT-RP-{mode === 'ALERT' ? '01' : mode === 'BLUEPRINT' ? '02' : '03'}
                </div>
              </div>

              <div className="text-right space-y-3">
                <div className="flex items-center gap-4 justify-end">
                  <span className={`text-5xl font-black tracking-tighter uppercase italic ${mode === 'MASTER' ? 'text-black' : 'text-white'}`}>Vigil</span>
                  <div className={`${mode === 'MASTER' ? 'bg-blue-600' : 'bg-white'} rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl`}>
                    <div className={`${mode === 'MASTER' ? 'bg-white' : 'bg-black'} w-7 h-7 rotate-45`} />
                  </div>
                </div>
                <div className={`text-[12px] font-black uppercase tracking-[0.6em] ${styles.accent}`}>Human-Layer Security Standard</div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-10">
               {mode === 'ALERT' ? (
                 <div className="text-center space-y-12">
                    <div className="space-y-4">
                      <div className="text-red-600 font-black text-[12px] uppercase tracking-[0.8em]">UNMITIGATED RISK DETECTED</div>
                      <h2 className="text-[7rem] font-black text-white italic uppercase tracking-tighter leading-[0.75] drop-shadow-[0_20px_50px_rgba(239,68,68,0.3)]">
                        HACKING <br/> THE HUMAN.
                      </h2>
                    </div>
                    <div className="max-w-4xl p-10 border-l-[10px] border-red-600 bg-red-600/5 backdrop-blur-md rounded-r-3xl text-left">
                       <p className="text-4xl text-white font-medium italic leading-snug">
                         "Crypto protocols are harder to hack than ever—so attackers started hacking the humans."
                       </p>
                    </div>
                 </div>
               ) : mode === 'BLUEPRINT' ? (
                 <div className="w-full grid grid-cols-12 gap-12 items-center">
                    <div className="col-span-7 space-y-8 text-left">
                       <div className="space-y-2">
                          <h2 className="text-7xl font-black text-white uppercase italic tracking-tighter leading-none">THE GAP IN <br/> LAYER 0.5</h2>
                          <p className="text-cyan-500 font-black uppercase tracking-[0.4em] text-xs">Interception Primitive Architecture</p>
                       </div>
                       <p className="text-3xl text-zinc-300 font-medium italic leading-relaxed">
                         Validating cognitive intent *before* the cryptographic signature can reach finality.
                       </p>
                       <div className="grid grid-cols-2 gap-4 pt-4">
                          {['Pattern Analysis', 'DOM Awareness', 'Similarity Matrix', 'Heuristic Logic'].map(t => (
                            <div key={t} className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl">
                               <div className="w-2 h-2 rounded-full bg-cyan-500" />
                               <span className="text-[10px] font-black text-white uppercase tracking-widest">{t}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div className="col-span-5 relative">
                       <div className="aspect-square bg-cyan-500/10 border-2 border-cyan-500/20 rounded-[3rem] flex items-center justify-center relative overflow-hidden group">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent_70%)]" />
                          <div className="relative z-10 flex flex-col items-center gap-6">
                             <div className="w-24 h-24 bg-cyan-500 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.3)]">
                                <Shield className="w-12 h-12 text-black" />
                             </div>
                             <div className="text-center">
                                <div className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-1">INTENT_INTEGRITY</div>
                                <div className="text-2xl font-black text-white italic">SECURE</div>
                             </div>
                          </div>
                       </div>
                       <div className="absolute -top-4 -right-4 w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-600 font-mono text-[10px]">0.5</div>
                    </div>
                 </div>
               ) : (
                 <div className="w-full text-left space-y-16">
                    <div className="flex items-start justify-between border-b border-zinc-200 pb-12">
                       <div className="space-y-4">
                          <TechLabel text="ABSTRACT: RP-03" color="zinc" />
                          <h2 className="text-8xl font-black text-black uppercase tracking-tighter leading-none">Security <br/> Beyond.</h2>
                       </div>
                       <div className="max-w-sm text-right space-y-4">
                          <p className="text-zinc-500 text-lg font-bold uppercase tracking-widest">A strategic framework for intercepting cognitive deception.</p>
                          <div className="h-1.5 w-24 bg-blue-600 ml-auto" />
                       </div>
                    </div>
                    <div className="flex gap-16 items-center">
                       <p className="flex-1 text-4xl text-zinc-700 font-medium italic leading-tight">
                         "The next phase of security isn't stronger encryption—it's systems that understand how humans behave."
                       </p>
                       <div className="shrink-0 w-48 h-48 bg-zinc-50 border border-zinc-100 rounded-[2rem] p-8 flex flex-col justify-between">
                          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                             <Shield className="w-5 h-5" />
                          </div>
                          <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-relaxed">
                             VIGIL.LAYER <br/> RESEARCH UNIT <br/> H1_2026
                          </div>
                       </div>
                    </div>
                 </div>
               )}
            </div>

            {/* Footer Area */}
            <div className="relative z-10 flex justify-between items-end border-t border-zinc-900/50 pt-10">
              <div className="space-y-2">
                <div className={`text-[10px] font-black uppercase tracking-widest ${mode === 'MASTER' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                   OFFICIAL BROADCAST // SOLANA SECURITY STANDARD
                </div>
                <div className={`text-[16px] font-black uppercase tracking-widest italic ${mode === 'MASTER' ? 'text-black' : 'text-white'}`}>
                   VIGIL.LAYER / THE HUMAN LAYER
                </div>
              </div>
              
              <div className="flex items-center gap-12">
                <div className="text-right space-y-1">
                  <div className={`text-[11px] font-black uppercase tracking-widest italic flex items-center gap-3 justify-end ${mode === 'MASTER' ? 'text-blue-600' : 'text-emerald-500'}`}>
                    <div className={`w-2 h-2 rounded-full animate-pulse shadow-lg ${mode === 'MASTER' ? 'bg-blue-600 shadow-blue-500/50' : 'bg-emerald-500 shadow-emerald-500/50'}`} /> 
                    {mode === 'ALERT' ? 'THREAT_LOG: ACTIVE' : 'SYSTEM_STATUS: OK'}
                  </div>
                  <div className={`text-[11px] font-black uppercase tracking-widest ${mode === 'MASTER' ? 'text-zinc-300' : 'text-zinc-800'}`}>
                    © 2026 VIGIL SAFETY SYSTEMS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};