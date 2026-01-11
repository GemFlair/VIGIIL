import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ShieldX, Trophy, HeartPulse, ShieldCheck, User, Zap, 
  Terminal as TerminalIcon, Battery, BatteryLow, LayoutDashboard, 
  Target, Fingerprint, Cpu, Search, Brain, Activity, ZapOff, 
  Shield, List, BookOpen, Layers, HardDrive, Network, Eye,
  AlertOctagon, Users, FileWarning, Gavel, Lock, Radio,
  Smartphone, Share2, Keyboard, Video, History, MessageSquareCode,
  Trash2, Landmark, Globe, Microscope, Briefcase, HelpCircle,
  Sword, Brush, Copy, Globe2, Check
} from 'lucide-react';

interface HeaderProps {
  activeAnchor: string;
  scrollToSection: (id: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (val: boolean) => void;
  onVersionClick?: () => void;
  isUnlocked?: boolean;
  powerSave?: boolean;
  onTogglePowerSave?: () => void;
  releasePhase: number;
  scrollPercentage: number;
  ambientStatus?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeAnchor, scrollToSection, isMenuOpen, setIsMenuOpen, onVersionClick, isUnlocked, powerSave, onTogglePowerSave, releasePhase, scrollPercentage, ambientStatus 
}) => {
  const [glitchText, setGlitchText] = useState(ambientStatus || 'STATUS: [PERIMETER_SYNC_INIT]');
  const scrollableNavRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (ambientStatus) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789//[]_';
      let iterations = 0;
      const interval = setInterval(() => {
        setGlitchText(prev => 
          ambientStatus.split('').map((char, index) => {
            if (index < iterations) return ambientStatus[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );
        if (iterations >= ambientStatus.length) clearInterval(interval);
        iterations += 1;
      }, 25);
      return () => clearInterval(interval);
    }
  }, [ambientStatus]);

  useEffect(() => {
    if (activeAnchor && scrollableNavRef.current && activeItemRef.current) {
      const container = scrollableNavRef.current;
      const activeItem = activeItemRef.current;
      const itemOffsetTop = activeItem.offsetTop;
      const containerHeight = container.clientHeight;
      const itemHeight = activeItem.clientHeight;
      const targetScroll = itemOffsetTop - (containerHeight / 2) + (itemHeight / 2);
      container.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }, [activeAnchor]);

  const navItems = [
    { id: 'hero', label: 'Control Surface', icon: <LayoutDashboard size={14} />, phase: 1 },
    { type: 'header', label: 'Phase: Identity', phase: 1 },
    { id: 'about-us', label: 'The Origin', icon: <Users size={14} />, phase: 1 },
    { id: 'the-threat', label: 'Vulnerability Matrix', icon: <AlertOctagon size={14} />, phase: 1 },
    { id: 'research-intro', label: 'Research Briefing', icon: <Microscope size={14} />, phase: 1 },
    { id: 'ecosystem-impact', label: 'Ecosystem Losses', icon: <Activity size={14} />, phase: 1 },
    { type: 'header', label: 'Phase: Logic', phase: 1 },
    { id: 'how-it-works', label: 'Context Mapping', icon: <Layers size={14} />, phase: 1 },
    { id: 'features', label: 'Safety Co-pilot', icon: <List size={14} />, phase: 1 },
    { type: 'header', label: 'Phase: Execution', phase: 2 },
    { id: 'system-simulation', label: 'Intent Validator', icon: <ShieldCheck size={14} />, phase: 2 },
    { id: 'mimicry-lab', label: 'Mimicry Lab', icon: <Fingerprint size={14} />, phase: 2 },
    { id: 'intel-forge', label: 'Intelligence Forge', icon: <Zap size={14} />, color: 'cyan', phase: 3 },
    { id: 'reputation-search', label: 'Reputation Sync', icon: <Search size={14} />, color: 'cyan', phase: 3 },
    { id: 'field-unit', label: 'Field Unit Hub', icon: <Smartphone size={14} />, color: 'emerald', phase: 5 },
    { id: 'mobile-sovereignty', label: 'Mobile Unit', icon: <Keyboard size={14} />, color: 'emerald', phase: 6 },
    { type: 'header', label: 'Phase: Governance', phase: 1 },
    { id: 'non-goals', label: 'System Purity', icon: <Trash2 size={14} />, phase: 1 },
    { id: 'pricing', label: 'Node Portal', icon: <Briefcase size={14} />, phase: 5 },
    { id: 'roadmap', label: 'Expansion Path', icon: <Network size={14} />, phase: 5 },
    { id: 'faq', label: 'Technical FAQ', icon: <HelpCircle size={14} />, phase: 1 },
    { id: 'neural-audit', label: 'Neural Audit', icon: <Brain size={14} />, phase: 1 },
    { type: 'header', label: 'Phase: Community', phase: 1 },
    { id: 'master_broadcast', label: 'Production Studio', icon: <Video size={14} />, color: 'red', phase: 1 },
    { id: 'chronicle_library', label: 'Chronicle Repository', icon: <History size={14} />, color: 'red', phase: 1 },
    { id: 'header-architect', label: 'Brand Architect', icon: <Brush size={14} />, color: 'blue', phase: 1 },
    { id: 'comms-terminal', label: 'Comms Terminal', icon: <TerminalIcon size={14} />, color: 'red', phase: 1 },
    { id: 'community-challenge', label: 'Active Challenge', icon: <Sword size={14} />, color: 'emerald', glow: true, phase: 1 },
    { id: 'narrative-glitch-forge', label: 'Daily Distraction', icon: <Zap size={14} />, color: 'red', phase: 1 },
    { id: 'mesh-intel', label: 'Mesh Intelligence', icon: <MessageSquareCode size={14} />, color: 'cyan', phase: 1 },
    { id: 'footer', label: 'Operational Registry', icon: <HardDrive size={14} />, phase: 1 },
  ];

  const visibleItems = navItems.filter(item => (item.phase || 1) <= releasePhase);

  return (
    <aside className={`fixed inset-x-0 bottom-0 top-10 z-[100] bg-[#050505]/98 backdrop-blur-2xl md:relative md:top-0 md:h-full w-full md:w-72 border-r border-zinc-900/50 transition-all duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="p-6 shrink-0 relative z-30 bg-[#050505] border-b border-zinc-900/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => scrollToSection('hero')}>
              <div className="w-6 h-6 bg-white flex items-center justify-center rounded-sm transition-all group-hover:rotate-90 group-hover:scale-110 duration-500">
                <div className="w-3 h-3 bg-black rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter uppercase italic text-white leading-none">Vigil</span>
                <span className="text-[8px] font-black text-zinc-700 tracking-[0.4em] uppercase -mt-0.5">Layer Standard</span>
              </div>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="md:hidden text-zinc-500 hover:text-white p-2"><X className="w-6 h-6" /></button>
          </div>
          
          <div className="mt-6 flex items-center gap-3 px-4 py-2.5 bg-zinc-950/20 border border-zinc-900/50 rounded-xl animate-sync-color-border overflow-hidden group">
             <div className="w-1.5 h-1.5 rounded-full shrink-0 animate-sync-color-bg shadow-[0_0_8px_currentColor]" />
             <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest whitespace-nowrap animate-sync-color-text font-mono truncate">
               {glitchText}
             </span>
          </div>
        </div>

        <div ref={scrollableNavRef} className="flex-1 min-0 relative overflow-y-auto custom-scrollbar px-6 py-4 scroll-smooth">
          <nav className="space-y-1 pb-10">
            {visibleItems.map((item, idx) => {
              if (item.type === 'header') return (
                <div key={idx} className="text-[9px] text-zinc-700 font-black uppercase tracking-[0.5em] mt-10 mb-4 px-4 flex items-center gap-3">
                  <div className="h-[1px] w-6 bg-zinc-900" />
                  {item.label}
                </div>
              );
              const isActive = activeAnchor === item.id;
              return (
                <button 
                  key={item.id} 
                  ref={isActive ? activeItemRef : null}
                  onClick={() => scrollToSection(item.id || '')} 
                  className={`w-full text-left px-4 py-3 rounded-2xl transition-all duration-500 flex items-center group relative border ${isActive ? 'bg-[#0a0a0a] border-zinc-800 scale-[1.02] shadow-lg' : 'text-zinc-600 border-transparent hover:text-zinc-300 hover:bg-zinc-950/40'}`}
                >
                  <div className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-500 mr-4 shrink-0 ${isActive ? (item.color === 'red' ? 'text-red-500 bg-red-500/10 border-red-500/30' : item.color === 'emerald' ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' : 'text-blue-500 bg-blue-500/10 border-blue-500/30') : 'text-zinc-800 border-zinc-900/50'} ${item.glow ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse' : ''}`}>
                    {item.icon}
                  </div>
                  <span className={`text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-500 ${isActive ? 'text-white' : ''} ${item.glow ? 'text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse' : ''}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="p-6 border-t border-zinc-900/50 shrink-0 space-y-3 bg-[#050505] z-30">
          <button onClick={onTogglePowerSave} className={`w-full py-3.5 px-5 rounded-2xl border-2 flex items-center justify-between transition-all ${powerSave ? 'bg-amber-600/10 border-amber-600/30 text-amber-500' : 'bg-[#080808] border-zinc-900 text-zinc-600'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${powerSave ? 'bg-amber-500 text-black border-amber-400' : 'bg-zinc-950 border-zinc-800'}`}>
                {powerSave ? <BatteryLow size={14} /> : <Battery size={14} />}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Power Save</span>
            </div>
          </button>
          <button onClick={onVersionClick} className="w-full py-3.5 px-4 rounded-2xl border-2 border-zinc-900 bg-[#080808] text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] italic hover:text-blue-500 transition-all">
            v 0.0.1.1 <span className="ml-2 not-italic text-[8px] opacity-40">DEFINITIVE</span>
          </button>
        </div>
      </div>
    </aside>
  );
};