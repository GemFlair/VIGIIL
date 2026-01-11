import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { SecurityAnnouncementBar } from './components/SecurityAnnouncementBar';
import { SecurityModal } from './components/SecurityModal';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Problem } from './components/Problem';
import { Features } from './components/Features';
import { ScamStats } from './components/ScamStats';
import { About } from './components/About';
import { Roadmap } from './components/Roadmap';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { OperationalRegistry, RegistryDoc } from './components/OperationalRegistry';
import { ThreatResearch } from './components/ThreatResearch';
import { Pricing } from './components/Pricing';
import { FinalNotice } from './components/FinalNotice';
import { IntentValidatorDemo } from './components/IntentValidatorDemo';
import { AdversarialMimicryLab } from './components/AdversarialMimicryLab';
import { IntelligenceForge } from './components/IntelligenceForge';
import { ContextualReputationSearch } from './components/ContextualReputationSearch';
import { PathBriefing } from './components/PathBriefing';
import { SystemBoot } from './components/SystemBoot';
import { NeuralProficiencyAudit } from './components/NeuralProficiencyAudit';
import { ExitProtocolOverlay, ExitType } from './components/ExitProtocolOverlay';
import { FieldUnitHub } from './components/FieldUnitHub';
import { HubHeader } from './components/HubHeader';
import { SecurityZoneBackground } from './components/SecurityZoneBackground';
import { MobileSovereignty } from './components/MobileSovereignty';
import { TelemetryDisplay } from './components/TelemetryDisplay';
import { DefinitiveNonGoals } from './components/DefinitiveNonGoals';
import { MeshQueryTerminal } from './components/MeshQueryTerminal';
// Added import for ScrollProgress to fix line 314 error
import { ScrollProgress } from './components/ScrollProgress';
import { UsageData } from './services/geminiService';
import { MessageSquare } from 'lucide-react';

export const CURRENT_PHASE = 6; 

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isBooting, setIsBooting] = useState(false);
  const [hasAcknowledged, setHasAcknowledged] = useState(false);
  const [activeDoc, setActiveDoc] = useState<RegistryDoc>(null);
  const [activeAnchor, setActiveAnchor] = useState<string>('hero');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isPowerSave, setIsPowerSave] = useState(() => localStorage.getItem('vigil_user_pwr_save') === 'true');
  const [activeExit, setActiveExit] = useState<ExitType>(null);
  const [ambientStatus, setAmbientStatus] = useState('STATUS: [PERIMETER_SCAN_ACTIVE] // ORIENTING_OPERATOR');
  
  const [lastUsage, setLastUsage] = useState<UsageData | null>(null);
  const [isAiScanning, setIsAiScanning] = useState(false);
  const [isTelemetryVisible, setIsTelemetryVisible] = useState(false);

  useEffect(() => {
    if (isAiScanning) {
      setIsTelemetryVisible(true);
    } else if (lastUsage) {
      const timer = setTimeout(() => {
        setIsTelemetryVisible(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isAiScanning, lastUsage]);
  
  const [clickCount, setClickCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const siteStartTimeRef = useRef<number>(Date.now());
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const targetScrollTopRef = useRef<number>(0);
  const currentScrollTopRef = useRef<number>(0);
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);

  const bottomExitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressUntilRef = useRef<number>(0);
  const prevDocRef = useRef<RegistryDoc>(null);

  useEffect(() => {
    if (activeExit) {
      setAmbientStatus('STATUS: [CONNECTION_TERMINATING] // VIGILANCE_PERSISTS');
      return;
    }
    
    if (scrollPercentage >= 99.5) {
      setAmbientStatus('STATUS: [REGISTRY_COMPLETE] // AWAITING_DISENGAGE');
    } else if (scrollPercentage >= 75) {
      setAmbientStatus('STATUS: [FINAL_AUDIT_PREP] // VERIFYING_COGNITIVE_INTEGRITY');
    } else if (scrollPercentage >= 50) {
      setAmbientStatus('STATUS: [NEURAL_LINK_ESTABLISHED] // CALIBRATING_SACCADIC_DEPTH');
    } else if (scrollPercentage >= 25) {
      setAmbientStatus('STATUS: [INTEL_FORGE_SYNC] // ANALYZING_THREAT_VECTORS');
    } else {
      setAmbientStatus('STATUS: [PERIMETER_SCAN_ACTIVE] // ORIENTING_OPERATOR');
    }
  }, [scrollPercentage, activeExit]);

  const togglePowerSave = () => {
    const next = !isPowerSave;
    setIsPowerSave(next);
    localStorage.setItem('vigil_user_pwr_save', next.toString());
  };

  useEffect(() => {
    const smoothScrollLoop = () => {
      if (!scrollContainerRef.current) return;
      const diff = targetScrollTopRef.current - currentScrollTopRef.current;
      
      if (Math.abs(diff) < 1) {
        currentScrollTopRef.current = targetScrollTopRef.current;
        isProgrammaticScrollRef.current = false;
      } else {
        currentScrollTopRef.current += diff * 0.1;
      }
      
      scrollContainerRef.current.scrollTop = currentScrollTopRef.current;
      animationFrameRef.current = requestAnimationFrame(smoothScrollLoop);
    };
    animationFrameRef.current = requestAnimationFrame(smoothScrollLoop);
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, []);

  useEffect(() => {
    const isAtBottom = scrollPercentage >= 99.5;
    const shouldCancel = scrollPercentage < 98.0;
    const isSuppressed = Date.now() < suppressUntilRef.current;

    if (shouldCancel || isSuppressed || activeExit || !hasAcknowledged) {
      if (bottomExitTimerRef.current) {
        clearTimeout(bottomExitTimerRef.current);
        bottomExitTimerRef.current = null;
      }
    } else if (isAtBottom) {
      if (activeDoc !== null) {
        if (bottomExitTimerRef.current) {
          clearTimeout(bottomExitTimerRef.current);
          bottomExitTimerRef.current = null;
        }
      } else {
        if (!bottomExitTimerRef.current) {
          const delay = (prevDocRef.current !== null) ? 3000 : 7000;
          bottomExitTimerRef.current = setTimeout(() => {
            setActiveExit('BOTTOM_OUT');
            bottomExitTimerRef.current = null;
          }, delay);
        }
      }
    }
    prevDocRef.current = activeDoc;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        const hasTriggered = sessionStorage.getItem('vigil_exit_triggered');
        const sessionTime = Date.now() - siteStartTimeRef.current;
        
        if (!hasTriggered && sessionTime > 180000 && !activeExit && hasAcknowledged) {
          sessionStorage.setItem('vigil_exit_triggered', 'true');
          setActiveExit('IDLE_EXIT');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [scrollPercentage, activeExit, hasAcknowledged, activeDoc]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      if (!isProgrammaticScrollRef.current) {
        currentScrollTopRef.current = scrollTop;
        targetScrollTopRef.current = scrollTop;
      }
      const totalScrollable = scrollHeight - clientHeight;
      const percentage = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;
      setScrollPercentage(percentage);
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setActiveAnchor('footer');
      }
    }
  };

  const handleUserInterruption = () => { isProgrammaticScrollRef.current = false; };

  const scrollToPercentage = (percent: number) => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      isProgrammaticScrollRef.current = true;
      targetScrollTopRef.current = (percent / 100) * (scrollHeight - clientHeight);
    }
  };

  const handleUnlockClick = () => {
    const now = Date.now();
    if (clickCount === 0 || now - startTime > 5000) {
      setClickCount(1);
      setStartTime(now);
    } else {
      const nextCount = clickCount + 1;
      if (nextCount >= 7) {
        setIsUnlocked(true);
        setActiveDoc('press_kit');
        setClickCount(0);
        setStartTime(0);
      } else {
        setClickCount(nextCount);
      }
    }
  };

  const scrollToSection = (id: string) => {
    // MODAL INTERCEPTION: If the ID is for a component that moved to the pop-up, trigger pop-up instead.
    if (id === 'community-challenge') { setActiveDoc('challenge'); setIsMenuOpen(false); return; }
    if (id === 'master_broadcast') { setActiveDoc('master_broadcast'); setIsMenuOpen(false); return; }
    if (id === 'chronicle_library') { setActiveDoc('chronicle_library'); setIsMenuOpen(false); return; }
    if (id === 'narrative-glitch-forge') { setActiveDoc('narrative_forge'); setIsMenuOpen(false); return; }
    if (id === 'header-architect') { setActiveDoc('header_architect'); setIsMenuOpen(false); return; }
    if (id === 'pricing') { setActiveDoc('pricing'); setIsMenuOpen(false); return; }
    
    if (id === 'comms-terminal') { setActiveDoc('comms_terminal'); setIsMenuOpen(false); return; }
    const element = document.getElementById(id);
    if (element && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const rect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const absoluteTarget = container.scrollTop + (rect.top - containerRect.top);
      isProgrammaticScrollRef.current = true;
      targetScrollTopRef.current = absoluteTarget - 40;
      setActiveAnchor(id);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const navIdMap: Record<string, string> = {
              'hub-execution': 'system-simulation',
              'hub-forge': 'intel-forge',
              'hub-field': 'field-unit',
              'hub-mobile': 'mobile-sovereignty'
            };
            setActiveAnchor(navIdMap[id] || id);
          }
        });
      },
      { root: container, rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );

    const sections = ['hero', 'about-us', 'the-threat', 'research-intro', 'ecosystem-impact', 'how-it-works', 'features', 'system-simulation', 'mimicry-lab', 'intel-forge', 'reputation-search', 'field-unit', 'mobile-sovereignty', 'non-goals', 'roadmap', 'faq', 'neural-audit', 'mesh-intel', 'footer'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [hasAcknowledged]);

  return (
    <div className={`h-screen w-screen bg-[#020202] text-[#fafafa] selection:bg-blue-600/40 selection:text-white font-sans flex flex-col pt-10 overflow-hidden ${isPowerSave ? 'pwr-save' : ''}`}>
      
      <SecurityZoneBackground activeAnchor={activeAnchor} powerSave={isPowerSave} />
      <SecurityAnnouncementBar />
      
      <SecurityModal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        setIsBooting(true);
      }} />

      {isBooting && (
        <SystemBoot onComplete={() => {
          setIsBooting(false);
          setHasAcknowledged(true);
        }} />
      )}

      {hasAcknowledged && <TelemetryDisplay data={lastUsage} isScanning={isAiScanning} isVisible={isTelemetryVisible} />}

      <ExitProtocolOverlay 
        exitType={activeExit} 
        onClose={() => {
          if (activeExit === 'BOTTOM_OUT') {
            suppressUntilRef.current = Date.now() + 60000;
          }
          setActiveExit(null);
        }} 
      />
      <OperationalRegistry 
        activeDoc={activeDoc} 
        onClose={() => setActiveDoc(null)} 
        onOpenDoc={(doc) => setActiveDoc(doc)}
        isUnlocked={isUnlocked} 
        onUsageUpdate={(usage) => setLastUsage(usage)}
        onScanningChange={(scanning) => setIsAiScanning(scanning)}
      />

      <div className={`flex flex-col md:flex-row flex-1 overflow-hidden relative transition-opacity duration-[1500ms] ${hasAcknowledged ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Header 
          activeAnchor={activeAnchor} 
          scrollToSection={scrollToSection} 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
          onVersionClick={handleUnlockClick} 
          isUnlocked={isUnlocked} 
          powerSave={isPowerSave} 
          onTogglePowerSave={togglePowerSave} 
          releasePhase={CURRENT_PHASE}
          scrollPercentage={scrollPercentage}
          ambientStatus={ambientStatus}
        />
        <ScrollProgress progress={scrollPercentage} onScrollTo={scrollToPercentage} />

        <main 
          ref={scrollContainerRef} 
          onScroll={handleScroll} 
          onWheel={handleUserInterruption}
          onTouchStart={handleUserInterruption}
          className="flex-1 overflow-y-auto no-scrollbar relative h-full scroll-smooth-none"
        >
          <div className="md:hidden h-14 border-b border-zinc-900/50 px-6 flex items-center justify-between glass sticky top-0 z-[60]">
            <div className="flex items-center space-x-3">
               <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
               </button>
               <span className="text-sm font-black tracking-tighter uppercase italic text-white">Vigil</span>
            </div>
            <button onClick={handleUnlockClick} className={`px-2 py-0.5 rounded border transition-all active:scale-90 ${isUnlocked ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500' : 'border-blue-500/20 bg-blue-500/10 text-blue-500'} text-[8px] font-bold uppercase tracking-widest`}>v 0.0.1.1</button>
          </div>

          <Hero 
            scrollToSection={() => scrollToSection('about-us')} 
            onOpenDoc={(doc) => setActiveDoc(doc)} 
            powerSave={isPowerSave} 
            isReady={hasAcknowledged}
          />

          <About />
          <Problem onOpenDoc={(doc) => setActiveDoc(doc)} />
          <ThreatResearch onOpenDoc={(doc) => setActiveDoc(doc)} />
          <ScamStats />

          <div id="how-it-works">
            <HowItWorks onOpenDoc={(doc) => setActiveDoc(doc)} />
          </div>
          <Features onOpenDoc={(doc) => setActiveDoc(doc)} />

          {CURRENT_PHASE >= 2 && (
            <div id="hub-execution" className="relative">
              <HubHeader number="01" title="Execution Sandbox." subtitle="Interception Proof-of-Work" />
              <PathBriefing pathNumber="01" title="Intent Validator" objective="Context-aware verification." threatVector="DOM address swaps." rationale="Validating belief vs execution." colorClass="text-blue-500" />
              <div id="system-simulation">
                <IntentValidatorDemo 
                  onUsageUpdate={(usage) => setLastUsage(usage)} 
                  onScanningChange={(scanning) => setIsAiScanning(scanning)} 
                />
              </div>
              <PathBriefing pathNumber="02" title="Adversarial Mimicry" objective="Test visual thresholds." threatVector="Vanity collisions." rationale="Experience visual failure." colorClass="text-red-500" />
              <div id="mimicry-lab"><AdversarialMimicryLab /></div>
            </div>
          )}

          {CURRENT_PHASE >= 3 && (
            <div id="hub-forge" className="relative">
              <HubHeader number="02" title="Synthesis Node." subtitle="Synchronized Intelligence Mapping" />
              <PathBriefing pathNumber="03" title="Intelligence Forge" objective="Global Sentinel mesh sync." threatVector="Threat isolation." rationale="Synthesized networks are stronger." colorClass="text-cyan-500" />
              <div id="intel-forge"><IntelligenceForge onOpenDoc={(doc) => setActiveDoc(doc)} powerSave={isPowerSave} /></div>
              <div id="reputation-search"><ContextualReputationSearch /></div>
            </div>
          )}

          <div className="py-12 flex justify-center border-t border-zinc-900/30">
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em] italic text-center px-6">
              Intelligence synthesized. Deploy the Sentinel to the browser environment.
            </span>
          </div>

          <div id="hub-field">
            <HubHeader number="05" title="Watch Tower." subtitle="Persistent Browser Shield" />
            <div id="field-unit">
              <FieldUnitHub />
            </div>
          </div>

          <div id="hub-mobile">
            <HubHeader number="06" title="Mobile Vision." subtitle="Sovereign Input Protection" />
            <div id="mobile-sovereignty">
              <MobileSovereignty />
            </div>
          </div>

          <div className="py-12 flex justify-center border-t border-zinc-900/30">
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em] italic text-center px-6">
              Perimeter established. Understand the strict boundaries of the Layer 0.5 standard.
            </span>
          </div>

          <div id="non-goals">
            <DefinitiveNonGoals />
          </div>

          {CURRENT_PHASE >= 5 && <div id="roadmap"><Roadmap /></div>}
          
          <div id="faq">
            <FAQ onOpenDoc={(doc) => setActiveDoc(doc)} />
          </div>
          
          <div id="neural-audit">
            <NeuralProficiencyAudit onCompleteExit={() => setActiveExit('AUDIT_COMPLETE')} />
          </div>

          <div id="mesh-intel" className="py-32 bg-[#050505] border-t border-zinc-900/50 min-h-[900px] flex flex-col items-center">
            <div className="w-full max-w-5xl px-6 space-y-12">
               <div className="p-8 bg-blue-600/5 border border-blue-500/20 rounded-[2.5rem] flex items-center gap-8 shadow-2xl animate-in zoom-in duration-700">
                  <div className="w-20 h-20 bg-blue-600/10 border-2 border-blue-500/30 rounded-3xl flex items-center justify-center shrink-0">
                    <MessageSquare size={40} className="text-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter">Terminal Assistance.</h4>
                    <p className="text-zinc-500 text-base leading-relaxed italic font-medium">
                      "Strategic onboarding concluded. Query the Sentinel Mesh for definitive technical clarification or system assistance."
                    </p>
                  </div>
               </div>
               <div className="h-[800px] relative">
                  <MeshQueryTerminal onUsageUpdate={(usage) => setLastUsage(usage)} onScanningChange={(scanning) => setIsAiScanning(scanning)} />
               </div>
            </div>
          </div>

          <FinalNotice />
          <Footer onOpenDoc={(doc) => setActiveDoc(doc)} onVersionClick={handleUnlockClick} />
          <ScrollToTop />
        </main>
      </div>
    </div>
  );
};
export default App;