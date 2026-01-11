
import React, { useEffect, useState, useRef } from 'react';
import { X, Terminal, Download, Copy, Check, ShieldCheck, FileImage } from 'lucide-react';

import { PrivacyContent } from './docs/PrivacyContent';
import { DisclaimerContent } from './docs/DisclaimerContent';
import { TechnicalSpecContent } from './docs/TechnicalSpecContent';
import { TermsContent } from './docs/TermsContent';
import { PricingContent } from './docs/PricingContent';
import { WhitepaperContent } from './docs/WhitepaperContent';
import { TechnicalDocumentationContent } from './docs/TechnicalDocumentationContent';
import { ThreatModelContent } from './docs/ThreatModelContent';
import { ResearchBriefingContent } from './docs/ResearchBriefingContent';
import { CodeRegistryContent } from './docs/CodeRegistryContent';
import { IdentityManifestContent } from './docs/IdentityManifestContent';
import { TechLabel } from './docs/DocHelpers';
import { CommunityChallenge } from './CommunityChallenge';
import { SocialIntelligenceLab } from './SocialIntelligenceLab';
import { SovereignSocialForge } from './SovereignSocialForge';
import { VideoProductionStudio } from './VideoProductionStudio';
import { ChronicleNarrativeLibrary } from './ChronicleNarrativeLibrary';
import { NarrativeGlitchForge } from './NarrativeGlitchForge';
import { VigilScanner } from './VigilScanner';
import { MeshQueryTerminal } from './MeshQueryTerminal';
import { FlagshipHeaderArchitect } from './FlagshipHeaderArchitect';
import { Pricing } from './Pricing';
import { UsageData } from '../services/geminiService';

export type RegistryDoc = 'privacy' | 'terms' | 'docs' | 'audit' | 'disclaimer' | 'pricing' | 'research_01' | 'technical_spec' | 'technical_doc' | 'press_kit' | 'whitepaper' | 'threat_model' | 'challenge' | 'comms_terminal' | 'social_forge' | 'prd_10_a' | 'master_broadcast' | 'chronicle_library' | 'identity_manifest' | 'mesh_intel' | 'narrative_forge' | 'header_architect' | null;

interface DocContentProps {
  type: RegistryDoc;
  onOpenDoc: (doc: RegistryDoc) => void;
  isUnlocked?: boolean;
  onUsageUpdate?: (usage: UsageData) => void;
  onScanningChange?: (isScanning: boolean) => void;
}

const DocContent = ({ type, onOpenDoc, isUnlocked, onUsageUpdate, onScanningChange }: DocContentProps) => {
  switch (type) {
    case 'privacy': return <PrivacyContent />;
    case 'terms': return <TermsContent />;
    case 'disclaimer': return <DisclaimerContent />;
    case 'whitepaper': return <WhitepaperContent />;
    case 'technical_spec': return <TechnicalSpecContent />;
    case 'technical_doc': return <TechnicalDocumentationContent />;
    case 'pricing': return <Pricing onOpenDoc={onOpenDoc} />;
    case 'threat_model': return <ThreatModelContent />;
    case 'press_kit': return <BrandAssetsContent />;
    case 'research_01': return <ResearchBriefingContent />;
    case 'prd_10_a': return <CodeRegistryContent />;
    case 'identity_manifest': return <IdentityManifestContent />;
    case 'challenge': return <div className="h-full py-0 md:py-0"><CommunityChallenge /></div>;
    case 'comms_terminal': return <div className="py-12"><SocialIntelligenceLab /></div>;
    case 'social_forge': return <div className="py-12"><SovereignSocialForge /></div>;
    case 'master_broadcast': return <div className="py-12"><VideoProductionStudio /></div>;
    case 'chronicle_library': return <div className="py-12"><ChronicleNarrativeLibrary /></div>;
    case 'narrative_forge': return <div className="py-12"><NarrativeGlitchForge /></div>;
    case 'header_architect': return <div className="py-12"><FlagshipHeaderArchitect /></div>;
    case 'mesh_intel': return <MeshQueryTerminal onUsageUpdate={onUsageUpdate} onScanningChange={onScanningChange} />;
    default: return (
      <div className="flex flex-col items-center justify-center py-32">
        <VigilScanner label="PROVISIONING_REGISTRY_SEGMENT" size="lg" />
      </div>
    );
  }
};

const LOGO_KINETIC_VL = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><path d="M50 200 H120 L180 350 L240 120 V350 H350" fill="none" stroke="currentColor" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const LOGO_KINETIC_VL_ANIMATED = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><path d="M50 200 H120 L180 350 L240 120 V350 H350" fill="none" stroke="currentColor" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" opacity="0.08"/><path d="M50 200 H120 L180 350 L240 120 V350 H350" fill="none" stroke="currentColor" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="120 1000"><animate attributeName="stroke-dashoffset" from="120" to="-1000" dur="1.8s" repeatCount="indefinite" /></path></svg>`;

const LOGO_MASTER_WORDMARK = `<svg viewBox="0 0 600 140" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="M40 20 L90 120 L140 20 H115 L90 80 L65 20 H40Z"/><path d="M170 40 V120 H190 V40 H170Z"/><path d="M170 20 H190 V28 H170V20Z"/><path d="M215 20 V120 H300 V100 H240 V60 H300 V20 H215Z"/><rect x="260" y="70" width="40" height="12"/><path d="M330 40 V120 H350 V40 H330Z"/><path d="M330 20 H350 V28 H330V20Z"/><path d="M380 20 V120 H450 V100 H405 V20 H380Z"/></g></svg>`;

const LOGO_MASTER_ICON = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="88" height="88" rx="22" fill="currentColor"/><path d="M30 28 L46 70 L50 62 L54 70 L70 28 H60 L50 50 L40 28 Z" fill="#000"/></svg>`;

const LOGO_CIRCULAR_ICON = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="44" fill="currentColor"/><path d="M30 28 L46 70 L50 62 L54 70 L70 28 H60 L50 50 L40 28 Z" fill="#000"/></svg>`;

const LOGO_VL_INTERCEPT = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="M20 20 L50 90 L80 20 H62 L50 55 L38 20 H20Z"/><path d="M85 20 V95 H110 V82 H97 V20 H85Z"/></g></svg>`;

const LOGO_VL_NEGATIVE_SPACE = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="M30 15 V100 H95 V85 H50 V15 H30Z"/><path d="M45 30 L62 75 L79 30 H70 L62 52 L54 30 H45Z" fill="#000"/></g></svg>`;

const LOGO_S_MONOLITH = `<svg viewBox="0 0 250 100" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="M15 25 L40 85 L65 25 H50 L40 60 L30 25 H15Z"/><path d="M75 35 V85 H87 V35 H75Z"/><path d="M75 25 H87 V31 H75V25Z"/><path d="M97 25 V85 H135 V73 H109 V37 H135 V25 H97Z"/><rect x="118" y="52" width="17" height="8"/><path d="M145 35 V85 H157 V35 H145Z"/><path d="M145 25 H157 V31 H145V25Z"/><path d="M167 25 V85 H210 V73 H179 V25 H167Z"/></g></svg>`;

const LOGO_V_GLYPH_ALPHA = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><rect x="50" y="50" width="300" height="300" rx="90" fill="white"/><rect x="135" y="135" width="130" height="130" fill="black" transform="rotate(45 200 200)"/></svg>`;

const LOGO_V_GLYPH_BETA = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><rect x="50" y="50" width="300" height="300" rx="90" fill="#111"/><rect x="135" y="135" width="130" height="130" fill="white" transform="rotate(45 200 200)"/></svg>`;

const LOGO_SENTINEL_APEX = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><path d="M200 40 L340 120 V280 L200 360 L60 280 V120 Z" fill="none" stroke="currentColor" stroke-width="12"/><path d="M120 140 L200 300 L280 140" fill="none" stroke="currentColor" stroke-width="24" stroke-linecap="square"/></svg>`;

const LOGO_RETINAL_GUARDIAN = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><path d="M60 200 C60 120 140 60 200 60 C260 60 340 120 340 200 C340 280 260 340 200 340 C140 340 60 280 60 200" fill="none" stroke="currentColor" stroke-width="10"/><circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="8 8"/><rect x="150" y="150" width="100" height="100" fill="currentColor" transform="rotate(45 200 200)"/></svg>`;

const LOGO_SOVEREIGN_SHARD = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><rect x="100" y="80" width="40" height="240" fill="currentColor"/><rect x="260" y="80" width="40" height="240" fill="currentColor"/><path d="M140 140 L260 260" stroke="currentColor" stroke-width="40"/></svg>`;

const LOGO_MESH_RADAR = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="160" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="10 5"/><path d="M200 120 L230 180 H290 L240 210 L260 280 L200 240 L140 280 L160 210 L110 180 H170 Z" fill="currentColor"/></svg>`;

const LOGO_INTERCEPTION_CIPHER = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><path d="M80 100 L200 320 L320 100" fill="none" stroke="currentColor" stroke-width="30"/><path d="M140 100 L200 210 L260 100" fill="none" stroke="currentColor" stroke-width="15"/><path d="M180 100 L200 135 L220 100" fill="none" stroke="currentColor" stroke-width="8"/></svg>`;

const BrandAssetsContent = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleDownload = (svg: string, name: string) => {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VIGIL_LOGO_${name.replace(/\s+/g, '_').toUpperCase()}.svg`;
    // Fix: line 107 replaced 'a' with 'link'
    document.body.appendChild(link);
    link.click();
    // Fix: line 109 replaced 'a' with 'link'
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPng = (svg: string, name: string) => {
    const match = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
    const width = match ? parseInt(match[1]) : 400;
    const height = match ? parseInt(match[2]) : 400;
    
    const absoluteColor = name.includes('Beta') ? '#111111' : '#FFFFFF';
    const processedSvg = svg
      .replace('<svg', `<svg width="${width}" height="${height}"`)
      .replace(/currentColor/g, absoluteColor);

    const canvas = document.createElement('canvas');
    const img = new Image();
    const svgBlob = new Blob([processedSvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      const scale = 4;
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = `VIGIL_LOGO_${name.replace(/\s+/g, '_').toUpperCase()}.png`;
        link.click();
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const handleCopyCode = async (svg: string, id: string) => {
    try {
      await navigator.clipboard.writeText(svg);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy SVG code:", err);
    }
  };

  const logos = [
    { id: 'KINETIC_VL_ANIMATED', name: 'Animated Signal Trace', svg: LOGO_KINETIC_VL_ANIMATED, desc: 'Live interception telemetry with active scanning pulse.', isWide: false },
    { id: 'KINETIC_VL', name: 'The Kinetic Intercept', svg: LOGO_KINETIC_VL, desc: 'Industrial signal-trace identifier (400x400).', isWide: false },
    { id: 'MASTER_WORDMARK', name: 'Master Wordmark [Engineered]', svg: LOGO_MASTER_WORDMARK, desc: 'High-legibility strategic wordmark (600x140).', isWide: true },
    { id: 'MASTER_ICON', name: 'Primary Icon [Engineered]', svg: LOGO_MASTER_ICON, desc: 'Optimized identifier for app/extension (100x100).', isWide: false },
    { id: 'CIRCULAR_ICON', name: 'Circular Identity Mark', svg: LOGO_CIRCULAR_ICON, desc: 'Geometric circular variant for lens-based UI surfaces.', isWide: false },
    { id: 'VL_INTERCEPT', name: 'VL Intercept Mark', svg: LOGO_VL_INTERCEPT, desc: 'Geometric fork/layer boundary identifier.', isWide: false },
    { id: 'VL_NEGATIVE', name: 'VL Negative Shard', svg: LOGO_VL_NEGATIVE_SPACE, desc: 'Elite minimal variant for protocol systems.', isWide: false },
    { id: 'GLYPH_ALPHA', name: 'Profile Mark [Alpha]', svg: LOGO_V_GLYPH_ALPHA, desc: 'High-contrast profile variant (400x400).', isWide: false },
    { id: 'GLYPH_BETA', name: 'Profile Mark [Beta]', svg: LOGO_V_GLYPH_BETA, desc: 'Dark theme profile variant (400x400).', isWide: false },
    { id: 'V_SENTINEL', name: 'The Sentinel Apex', svg: LOGO_SENTINEL_APEX, desc: 'Geometric sandbox representation.', isWide: false },
    { id: 'V_EYE', name: 'The Retinal Guardian', svg: LOGO_RETINAL_GUARDIAN, desc: 'Visual verification primitive.', isWide: false },
    { id: 'V_SHARD', name: 'The Sovereign Shard', svg: LOGO_SOVEREIGN_SHARD, desc: 'Bridge between L0 and L1.', isWide: false },
    { id: 'V_RADAR', name: 'The Mesh Radar', svg: LOGO_MESH_RADAR, desc: 'Distributed intelligence network.', isWide: false },
    { id: 'V_CIPHER', name: 'The Interception Cipher', svg: LOGO_INTERCEPTION_CIPHER, desc: 'Point of interception mark.', isWide: false },
    { id: 'TYPE_S', name: 'Master Structural Wordmark', svg: LOGO_S_MONOLITH, desc: 'The definitive master identity.', isWide: true }
  ];

  return (
    <div className="space-y-20 pb-40 max-w-6xl mx-auto px-4 md:px-0">
      <header className="space-y-6">
        <TechLabel text="OWNER_PROTOCOL" color="blue" />
        <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">Brand Assets.</h2>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        {logos.map((logo, i) => (
          <div 
            key={logo.id} 
            className={`p-1 bg-[#0a0a0a] border border-zinc-900 rounded-[2.5rem] overflow-hidden group hover:border-zinc-700 transition-all ${logo.isWide ? 'lg:col-span-12' : 'lg:col-span-6'}`}
          >
            <div className="aspect-square md:aspect-auto md:h-[400px] lg:h-[450px] bg-[#050505] rounded-[2.3rem] flex flex-col items-center justify-center p-12 text-white transition-colors relative overflow-hidden">
               <div className="w-full max-w-[400px] h-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: logo.svg }} />
               <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{logo.name}</p>
                     <p className="text-[8px] font-bold uppercase tracking-widest text-zinc-700">{logo.desc}</p>
                  </div>
                  <div className="flex gap-2">
                     <button 
                       onClick={() => handleCopyCode(logo.svg, logo.id)}
                       title="Copy SVG Code"
                       className={`p-3 bg-zinc-900 border border-zinc-800 rounded-xl transition-all ${copiedId === logo.id ? 'text-emerald-500 border-emerald-500/50' : 'text-zinc-500 hover:text-white hover:border-blue-500'}`}
                     >
                        {copiedId === logo.id ? <Check size={14} /> : <Copy size={14} />}
                     </button>
                     <button 
                       onClick={() => handleDownloadPng(logo.svg, logo.name)}
                       title="Download PNG"
                       className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500 hover:text-white hover:border-cyan-500 transition-all"
                     >
                        <FileImage size={14} />
                     </button>
                     <button 
                       onClick={() => handleDownload(logo.svg, logo.name)}
                       title="Download SVG File"
                       className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500 hover:text-white hover:border-blue-500 transition-all"
                     >
                        <Download size={14} />
                     </button>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const OperationalRegistry: React.FC<OperationalRegistryProps> = ({ 
  activeDoc, onClose, onOpenDoc, isUnlocked, onUsageUpdate, onScanningChange 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeDoc) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }
  }, [activeDoc]);

  if (!activeDoc && !isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[1000] flex items-center justify-center px-2 md:px-20 py-4 md:py-10 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-[#020202]/95 backdrop-blur-3xl" onClick={onClose} />
      <div ref={containerRef} className={`relative w-full max-w-[1400px] h-full bg-[#050505] border border-zinc-900/50 rounded-[1.5rem] md:rounded-[28px] shadow-[0_100px_200px_-50px_rgba(0,0,0,1)] overflow-hidden transition-all duration-700 flex flex-col ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-20 scale-95'}`}>
        <div className="h-16 md:h-20 border-b border-zinc-900/50 px-6 md:px-14 flex items-center justify-between glass z-[1001] shrink-0">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-600 rounded flex items-center justify-center shadow-lg"><div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-white rotate-45" /></div>
              <span className="text-base md:text-lg font-black tracking-tighter uppercase italic text-white">Vigil</span>
            </div>
            <div className="h-6 w-[1px] bg-zinc-900 shrink-0" />
            <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest whitespace-nowrap overflow-hidden">
              <Terminal className="w-3 md:w-3.5 h-3 md:h-3.5" /> 
              <span>Registry</span>
              <span className="text-zinc-800">/</span> 
              <span className={`italic uppercase truncate ${activeDoc === 'comms_terminal' ? 'text-red-500' : 'text-blue-500'}`}>
                {activeDoc?.replace('_', ' ')}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-zinc-950/50 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all"><X className="w-4 md:w-5 h-4 md:h-5" /></button>
        </div>
        <div className={`flex-1 ${activeDoc === 'mesh_intel' || activeDoc === 'challenge' ? 'flex flex-col overflow-hidden pt-0 md:pt-0 px-0 md:px-0' : 'overflow-y-auto custom-scrollbar pt-8 md:pt-24 px-2 md:px-20'} relative z-10 no-scrollbar`}>
           <DocContent 
            type={activeDoc} 
            onOpenDoc={onOpenDoc}
            isUnlocked={isUnlocked} 
            onUsageUpdate={onUsageUpdate} 
            onScanningChange={onScanningChange} 
           />
        </div>
        <div className="h-8 md:h-10 border-t border-zinc-900/50 px-6 md:px-14 flex items-center justify-between bg-black/50 z-[1001] shrink-0">
           <div className="flex items-center gap-2 md:gap-4 text-[7px] md:text-[8px] font-black text-zinc-700 uppercase tracking-widest italic">
              <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-blue-500 animate-pulse" /> Encrypted Connection
           </div>
           <div className="text-[7px] md:text-[8px] font-black text-zinc-800 uppercase tracking-widest italic">VIG-Registry-03</div>
        </div>
      </div>
    </div>
  );
};

interface OperationalRegistryProps {
  activeDoc: RegistryDoc;
  onClose: () => void;
  onOpenDoc: (doc: RegistryDoc) => void;
  isUnlocked?: boolean;
  onUsageUpdate?: (usage: UsageData) => void;
  onScanningChange?: (isScanning: boolean) => void;
}
