import React, { useState, useEffect, useRef } from 'react';
import { ShieldX, Chrome, Check, FileText } from 'lucide-react';
import { RegistryDoc } from './OperationalRegistry';

const TechnicalScanGrid = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
    <div className="absolute inset-[-100px] opacity-[0.07] bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px] animate-grid-drift" />
    <div className="absolute inset-[-100px] opacity-[0.04] bg-[radial-gradient(circle_at:2px_2px,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:128px_128px] animate-grid-drift-reverse" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#020202_85%)]" />
  </div>
);

const TypingHeadline = ({ text, delay = 500, startTrigger = true }: { text: string; delay?: number; startTrigger?: boolean }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!startTrigger) return;
    const timer = setTimeout(() => setIsTyping(true), delay);
    return () => clearTimeout(timer);
  }, [delay, startTrigger]);

  useEffect(() => {
    if (!isTyping) return;
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, isTyping, text]);

  return (
    <h1 className="text-[3.75rem] md:text-[7.5rem] font-black tracking-tighter leading-[0.8] uppercase italic select-none min-h-[1em] relative">
      {/* Ghost Outline Layer */}
      <span 
        className="absolute inset-0 text-transparent pointer-events-none" 
        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}
      >
        {text}
      </span>
      {/* Solid Fill Layer */}
      <span className="relative text-white">
        {displayedText}
      </span>
    </h1>
  );
};

const InstallButton = () => {
  const [state, setState] = useState<'idle' | 'verifying' | 'ready'>('idle');

  const handleClick = () => {
    if (state !== 'idle') return;
    setState('verifying');
    setTimeout(() => setState('ready'), 2400);
  };

  return (
    <div className="flex flex-col items-start gap-1.5 md:gap-3 w-full sm:w-auto">
      <button 
        onClick={handleClick}
        disabled={state !== 'idle'}
        className={`relative overflow-hidden px-10 py-3.5 md:py-5 text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-500 active:scale-95 flex items-center gap-3 min-w-[280px] justify-center ${
          state === 'idle' ? 'bg-white text-black hover:bg-[#10b981] hover:text-white hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]' :
          state === 'verifying' ? 'bg-zinc-900 text-zinc-400 cursor-wait' :
          'bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)]'
        }`}
      >
        {state === 'idle' && (
          <>
            <Chrome className="w-4 h-4" />
            INSTALL VIGIL EXTENSION
          </>
        )}
        {state === 'verifying' && (
          <>
            <span className="animate-pulse">VERIFYING INTENT...</span>
            <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 animate-progress-line" />
          </>
        )}
        {state === 'ready' && (
          <>
            <Check className="w-4 h-4" />
            READY FOR DEPLOYMENT
          </>
        )}
      </button>
      <span className="text-[8px] md:text-[9px] font-bold text-zinc-600 uppercase tracking-widest pl-2">
        Canonical Primitive · No keys required
      </span>
    </div>
  );
};

interface HeroProps {
  scrollToSection: (id: string) => void;
  onOpenDoc: (doc: RegistryDoc) => void;
  powerSave?: boolean;
  isReady?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ scrollToSection, onOpenDoc, powerSave, isReady = true }) => {
  const boundaryRef = useRef<HTMLDivElement>(null);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasDrawn(true);
      }
    }, { threshold: 0.1 });

    if (boundaryRef.current) observer.observe(boundaryRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="min-h-[85vh] md:min-h-[95vh] flex flex-col justify-center px-6 md:px-20 pt-2 md:pt-0 pb-12 md:pb-0 relative overflow-hidden bg-[#020202]">
      {!powerSave && <TechnicalScanGrid />}
      
      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-12 lg:gap-20 items-center py-2 md:py-12">
        <div className="lg:col-span-7 space-y-4 md:space-y-10">
          <div className="space-y-1.5 md:space-y-6">
            <div className="flex items-center space-x-4 mb-10 md:mb-0">
              <span className="px-3 md:px-4 py-1 md:py-1.5 bg-[#0a162e] border-[0.5px] border-blue-900/50 rounded text-[9px] md:text-[10px] font-black tracking-[0.2em] text-blue-500 uppercase">
                Operational Alpha v 0.0.0.1
              </span>
              
              {/* Enhanced Bridge Line with Data Flow Animation */}
              <div className="h-[1px] w-12 md:w-24 bg-blue-900/30 relative overflow-visible">
                <div className="absolute inset-0 bg-blue-500/10 blur-[1px]" />
                <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee] animate-data-flow-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent animate-data-trail-flow" />
              </div>

              <div className="relative overflow-hidden px-2 block">
                <span className="text-[8px] md:text-[10px] mono text-cyan-500 font-bold uppercase tracking-[0.3em] block">
                  Interception Layer Established
                </span>
              </div>
            </div>

            <div className="space-y-0">
              <h1 className="text-[3.75rem] md:text-[7.5rem] font-black tracking-tighter leading-[0.8] text-white uppercase italic select-none">
                THE INTENT
              </h1>
              <TypingHeadline text="VALIDATOR." startTrigger={isReady} />
            </div>

            <div className="pt-4 md:pt-6 pb-0 md:pb-2 space-y-4 md:space-y-6 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-6 bg-cyan-500/40" />
                <span className="text-[13px] md:text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em]">Introducing Layer 0.5 Security</span>
              </div>
              <div className="relative border-l-[3px] border-cyan-500/50 pl-6 md:pl-8">
                <p className="text-xl md:text-2xl text-zinc-300 font-medium leading-relaxed italic">
                  "A human-layer security model that operates <span className="text-white">between user intent and cryptographic execution,</span> detecting context loss before irreversible transactions occur."
                </p>
                <button 
                  onClick={() => onOpenDoc('whitepaper')}
                  className="mt-4 flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" /> [READ_WHITEPAPER: VIG-WP-2026]
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 md:gap-5 mt-6 md:mt-4">
            <InstallButton />
            <button 
              onClick={() => scrollToSection('flow')} 
              className="px-10 py-3.5 md:py-5 border border-zinc-800 text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] hover:bg-zinc-900 transition-colors h-fit"
            >
              SYSTEM OVERVIEW
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 block">
          <div className="py-12 px-6 md:py-[4.5rem] md:px-14 bg-[#0a0a0a] border-[0.1px] border-zinc-900 rounded-[1.5rem] md:rounded-[28px] relative group overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] animate-status-sync-border">
            
            <div className="absolute -top-4 -right-4 opacity-10 pointer-events-none">
              <ShieldX className="w-56 h-56 text-red-600/40" />
            </div>
            
            <div className="relative z-10 space-y-10">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">Visual Deception Shield</span>
                
                <div className="relative">
                   <h3 className="text-4xl md:text-5xl font-black text-white leading-[1.0] uppercase italic tracking-tighter">
                     STOP ADDRESS <br/>
                     POISONING.
                   </h3>
                </div>
              </div>
              
              <p className="text-zinc-400 text-xl md:text-[1.35rem] leading-[1.6] font-medium">
                <span className="text-zinc-100 font-bold">VIGIL intercepts attacks inside the browser DOM,</span> <span className="text-white">where most address poisoning originates,</span> validating belief against reality.
              </p>
              
              <div className="pt-6 flex items-center gap-4 md:gap-6">
                <div className="inline-flex items-center space-x-2 md:space-x-3 px-3 md:px-5 py-3 bg-zinc-950/20 border-[0.1px] rounded-xl relative z-20 animate-sync-color-border overflow-hidden">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shrink-0 animate-sync-color-bg shadow-[0_0_8px_currentColor]" />
                  <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest whitespace-nowrap animate-sync-color-text">
                    Active Monitoring
                  </span>
                </div>
                <div className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.2em] max-w-[100px] md:max-w-[120px] leading-tight">
                  PROTECTED BY <br/> 0.5 PRIMITIVE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div 
        ref={boundaryRef}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-zinc-900/50 overflow-hidden"
      >
        <div 
          className={`h-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent transition-all duration-[1200ms] ease-out ${
            hasDrawn ? 'w-full' : 'w-0'
          }`}
        />
      </div>
    </section>
  );
};