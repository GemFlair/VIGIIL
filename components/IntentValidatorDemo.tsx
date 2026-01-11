
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ShieldAlert, ShieldCheck, Search, Binary, AlertTriangle, CheckCircle2, Info, UserPlus, Globe, MessageSquare, ExternalLink, Activity, Zap, ClipboardPaste, Clock, ShieldQuestion, Wifi, ShieldX, Scan, AlertOctagon, Scale, X, Fingerprint, Database, HelpCircle, History, MousePointerClick, Brain, Skull, Radar, Eye, Calculator, ChevronRight, BarChart3, RotateCcw } from 'lucide-react';
import { analyzeSecurityIntent, ThreatAnalysisResponse, IntentCategory, UsageData } from '../services/geminiService';
import { AddressGlyph } from './AddressGlyph';
import { VigilScanner } from './VigilScanner';

interface TIMAxes {
  vsi: number; // Visual Similarity
  edi: number; // Entropy Deviation
  pdi: number; // Provenance Depth
  cri: number; // Context Risk
  ipi: number; // Interaction Pattern
  rii: number; // Registry Integrity
  eii: number; // Execution Integrity
}

interface IntentValidatorDemoProps {
  onUsageUpdate?: (usage: UsageData) => void;
  onScanningChange?: (isScanning: boolean) => void;
}

const TIMDiagnosticModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  axes: TIMAxes;
  totalIndex: number;
}> = ({ isOpen, onClose, axes, totalIndex }) => {
  if (!isOpen) return null;

  const axisDefinitions = [
    { id: 'VSI', label: 'Visual Similarity', score: axes.vsi, weight: 0.20, desc: 'Prefix/suffix collisions and character overlap risk.' },
    { id: 'EDI', label: 'Entropy Deviation', score: axes.edi, weight: 0.15, desc: 'Likelihood of vanity/non-random generation.' },
    { id: 'PDI', label: 'Provenance Depth', score: axes.pdi, weight: 0.15, desc: 'Address age and recurring interaction history.' },
    { id: 'CRI', label: 'Context Risk', score: axes.cri, weight: 0.15, desc: 'Source vulnerability (DM, Clipboard, or UI).' },
    { id: 'IPI', label: 'Interaction Pattern', score: axes.ipi, weight: 0.15, desc: 'Evidence of dust transfers or zero-value injections.' },
    { id: 'RII', label: 'Registry Integrity', score: axes.rii, weight: 0.10, desc: 'Mint authenticity vs official Circle/Solana registry.' },
    { id: 'EII', label: 'Execution Integrity', score: axes.eii, weight: 0.10, desc: 'Real-time clipboard mutation or DOM swap events.' },
  ];

  const thresholds = [
    { range: '0–15%', label: 'VERIFIED', color: 'bg-emerald-500', desc: 'Secure historical node.' },
    { range: '16–45%', label: 'CAUTION', color: 'bg-blue-500', desc: 'Anomalies detected. Manual check.' },
    { range: '46–75%', label: 'HIGH RISK', color: 'bg-amber-500', desc: 'Strong evidence of deception.' },
    { range: '76–100%', label: 'CRITICAL', color: 'bg-red-500', desc: 'Confirmed adversarial vector.' },
  ];

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="w-full max-w-3xl bg-[#050505] border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 opacity-30" />
        
        <button onClick={onClose} className="absolute top-8 right-8 p-2 text-zinc-500 hover:text-white transition-colors z-10">
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calculator className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">TIM v1.0 // Diagnostic Calculator</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">Threat Matrix.</h3>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-black text-zinc-500 uppercase tracking-widest mb-1">Composite Index</div>
              <div className={`text-6xl font-black italic tracking-tighter ${totalIndex > 75 ? 'text-red-500' : totalIndex > 45 ? 'text-amber-500' : 'text-emerald-500'}`}>
                {totalIndex}%
              </div>
            </div>
          </div>

          <div className="space-y-4">
             <div className="grid grid-cols-12 gap-4 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] border-b border-zinc-900 pb-3">
                <div className="col-span-1">Axis</div>
                <div className="col-span-4">Factor Definition</div>
                <div className="col-span-3 text-center">Score / 100</div>
                <div className="col-span-2 text-center">Weight</div>
                <div className="col-span-2 text-right">Contribution</div>
             </div>
             
             <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar">
                {axisDefinitions.map((axis) => {
                  const contribution = (axis.score * axis.weight).toFixed(1);
                  const isCritical = axis.score >= 90;
                  return (
                    <div key={axis.id} className="grid grid-cols-12 gap-4 items-center p-4 bg-zinc-900/30 border border-zinc-900 rounded-xl group hover:border-zinc-700 transition-all">
                       <div className={`col-span-1 font-mono text-[11px] font-black ${isCritical ? 'text-red-500' : 'text-zinc-500'}`}>{axis.id}</div>
                       <div className="col-span-4">
                          <div className="text-[11px] font-black text-white uppercase tracking-tight">{axis.label}</div>
                          <div className="text-[9px] text-zinc-500 font-bold uppercase italic mt-0.5">{axis.desc}</div>
                       </div>
                       <div className="col-span-3">
                          <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                             <div 
                                className={`h-full transition-all duration-1000 ${isCritical ? 'bg-red-600 shadow-[0_0_10px_#ef4444]' : 'bg-zinc-700'}`} 
                                style={{ width: `${axis.score}%` }} 
                             />
                          </div>
                          <div className="text-center text-[11px] font-mono text-zinc-400 mt-1.5 font-bold">{axis.score}</div>
                       </div>
                       <div className="col-span-2 text-center text-[11px] font-mono text-zinc-500">x{axis.weight.toFixed(2)}</div>
                       <div className={`col-span-2 text-right font-mono text-[13px] font-black ${isCritical ? 'text-red-500' : 'text-white'}`}>
                         +{contribution}%
                       </div>
                    </div>
                  );
                })}
             </div>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] border-b border-zinc-900 pb-3 flex items-center gap-2">
              <Scale className="w-3 h-3" /> Threat Level Definitions
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {thresholds.map((t, i) => (
                <div key={i} className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-2 flex flex-col items-center text-center group/leg hover:border-zinc-700 transition-all">
                  <div className={`w-1.5 h-1.5 rounded-full ${t.color} shadow-[0_0_8px_currentColor]`} />
                  <div className="space-y-1">
                    <span className="text-[12px] font-black text-white italic leading-none block">{t.range}</span>
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-none block">{t.label}</span>
                  </div>
                  <p className="text-[8px] text-zinc-600 font-bold uppercase italic leading-tight">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-900 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <Info className="w-4 h-4 text-zinc-700" />
                <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest leading-relaxed">
                  Composite score reflects signal convergence across independent layers. <br/>
                  Registry (RII) and Execution (EII) inputs provide weighted overrides for critical states.
                </p>
             </div>
             <p className="text-[9px] font-mono text-zinc-900 uppercase">CALC_ENGINE_v1.0.5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ThreatIndexBreakdown: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const vectors = [
    { 
      label: "Visual Mimicry Entropy", 
      weight: "40%", 
      desc: "Analysis of 'Entropy Collision' at address edges. Detects high-performance vanity mimics.",
      icon: <Fingerprint className="w-4 h-4 text-red-500" />
    },
    { 
      label: "Contextual Provenance", 
      weight: "25%", 
      desc: "Evaluates the source DOM context (Explorer vs. Social DM) to establish intent validity.",
      icon: <Search className="w-4 h-4 text-blue-500" />
    },
    { 
      label: "On-Chain Provenance", 
      weight: "20%", 
      desc: "Queries RPC layer for address age, balance, and transaction history depth.",
      icon: <History className="w-4 h-4 text-emerald-500" />
    },
    { 
      label: "Global Feed Correlation", 
      weight: "15%", 
      desc: "Cross-referencing against known 'Poisoning Clusters' and vanity generator signatures.",
      icon: <Database className="w-4 h-4 text-purple-500" />
    }
  ];

  const intervals = [
    { range: "0–15%", state: "VERIFIED", color: "text-emerald-500", desc: "Safe historical node." },
    { range: "16–45%", state: "CAUTION", color: "text-blue-500", desc: "Manual verify advised." },
    { range: "46–75%", state: "HIGH RISK", color: "text-amber-500", desc: "Elevated threat detected." },
    { range: "76–100%", state: "CRITICAL", color: "text-red-500", desc: "Confirmed adversarial vector." }
  ];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-[#080808] border border-zinc-800 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 relative overflow-y-auto max-h-[90vh] shadow-2xl no-scrollbar">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors z-10">
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="space-y-8 md:space-y-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Engine Specification // VIG-HEUR-01</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">Threat Index.</h3>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium max-w-md">
              A probabilistic security metric measuring the **likelihood of user deception**, not simple cryptographic similarity.
            </p>
          </div>

          <div className="space-y-6">
            <div className="text-[11px] font-black text-zinc-700 uppercase tracking-[0.3em] border-b border-zinc-900 pb-3 flex items-center gap-2">
              <Scale className="w-3.5 h-3.5" /> Calculation Vectors
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vectors.map((v, i) => (
                <div key={i} className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {v.icon}
                      <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">{v.label}</span>
                    </div>
                    <span className="text-[10px] font-black text-zinc-600">{v.weight}</span>
                  </div>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase italic leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-[11px] font-black text-zinc-700 uppercase tracking-[0.3em] border-b border-zinc-900 pb-3 flex items-center gap-2">
              <Binary className="w-3.5 h-3.5" /> Threshold Key
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {intervals.map((int, i) => (
                <div key={i} className="space-y-1">
                  <div className={`text-[12px] font-black italic ${int.color}`}>{int.range}</div>
                  <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{int.state}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-900">
            <p className="text-[9px] text-zinc-700 font-black uppercase tracking-[0.3em] italic text-center">
              VIGIL monitors the gap between user intent and cryptographic reality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const IntentValidatorDemo: React.FC<IntentValidatorDemoProps> = ({ onUsageUpdate, onScanningChange }) => {
  const [historyAddr, setHistoryAddr] = useState('Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90');
  const [currentAddr, setCurrentAddr] = useState('');
  const [source, setSource] = useState<'EXPLORER' | 'SOCIAL' | 'DAPP'>('EXPLORER');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [completedSims, setCompletedSims] = useState<Set<string>>(new Set());
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimerRef = useRef<number | null>(null);
  
  const [result, setResult] = useState<(ThreatAnalysisResponse & { 
    telemetry?: { age: string; lastTx: string; activity15d: string };
    threatIndex?: number;
    axes?: TIMAxes;
  }) | null>(null);
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);

  // Scenarios mapped to TIM Axes
  const testScenarios = [
    { id: 'TRUSTED', label: 'Test Trusted', addr: 'Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90', telemetry: { age: '1,204 Days', lastTx: '14m ago', activity15d: '402' }, axes: { vsi: 5, edi: 0, pdi: 10, cri: 0, ipi: 0, rii: 0, eii: 0 } },
    { id: 'POISON', label: 'Visual Poisoning', addr: 'Ab1C00000000000000000000000000Zz90', telemetry: { age: '2,401 Days', lastTx: '14m ago', activity15d: '402' }, axes: { vsi: 95, edi: 90, pdi: 50, cri: 30, ipi: 80, rii: 0, eii: 0 } },
    { id: 'PHISHING', label: 'Phishing Shield', addr: '6vX9f72Lp6mX9wR7yT5vB4nQ8jK3mZzM1', telemetry: { age: '3 Days', lastTx: 'Never', activity15d: '1' }, axes: { vsi: 30, edi: 0, pdi: 100, cri: 100, ipi: 0, rii: 0, eii: 0 } },
    { id: 'DUST', label: 'Dust Injection', addr: 'Dust99kLp6mX9wR7yT5vB4nQ8jK3mZzDust', telemetry: { age: '42 Days', lastTx: '14d ago', activity15d: '1' }, axes: { vsi: 50, edi: 40, pdi: 60, cri: 30, ipi: 100, rii: 0, eii: 0 } },
    { id: 'NEW', label: 'New Provenance', addr: '5U398zH6pA2wM1nL9xT4vR7yB8jK2mQ5v', telemetry: { age: '1 Day', lastTx: 'New', activity15d: '0' }, axes: { vsi: 10, edi: 0, pdi: 100, cri: 30, ipi: 10, rii: 0, eii: 0 } },
    { id: 'SIMILARITY', label: 'Similarity/Entropy', addr: 'Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz91', telemetry: { age: '891 Days', lastTx: '2h ago', activity15d: '82' }, axes: { vsi: 85, edi: 60, pdi: 30, cri: 30, ipi: 10, rii: 0, eii: 0 } },
    { id: 'MINT', label: 'Mint Mismatch', addr: 'EPjFW33rdLH2QD6LksXY33vMRfGct1grTparXMQ7fgc3', telemetry: { age: '12 Days', lastTx: '3h ago', activity15d: '1,209' }, axes: { vsi: 20, edi: 0, pdi: 80, cri: 30, ipi: 10, rii: 100, eii: 0 } },
    { id: 'CLIPBOARD', label: 'Clipboard Intercept', addr: 'Sol1Restored92kLp6mX9wR7yT5vB4nQ8jK3', telemetry: { age: '1,102 Days', lastTx: '12m ago', activity15d: '55' }, axes: { vsi: 10, edi: 0, pdi: 70, cri: 90, ipi: 10, rii: 0, eii: 100 } },
    { id: 'SPOOF', label: 'Visual Spoof', addr: 'EyeS0000p6mX9wR7yT5vB4nQ8jK3mZzEye', telemetry: { age: '5 Days', lastTx: 'Never', activity15d: '2' }, axes: { vsi: 100, edi: 95, pdi: 100, cri: 40, ipi: 10, rii: 0, eii: 0 } }
  ];

  const calculateThreatIndex = (axes: TIMAxes) => {
    let total = (
      0.20 * axes.vsi +
      0.15 * axes.edi +
      0.15 * axes.pdi +
      0.15 * axes.cri +
      0.15 * axes.ipi +
      0.10 * axes.rii +
      0.10 * axes.eii
    );
    if (axes.rii === 100 || axes.eii === 100) return 100;
    return Math.round(total);
  };

  const injectScenario = (sc: typeof testScenarios[0]) => {
    setCurrentAddr(sc.addr);
    setResult(null);
  };

  const handleValidate = async () => {
    if (!currentAddr) return;
    setIsAnalyzing(true);
    onScanningChange?.(true); // START TELEMETRY
    setResult(null);
    
    // DETECT TEST SCENARIO BYPASS
    const matchedScenario = testScenarios.find(s => s.addr === currentAddr);
    
    setTimeout(async () => {
      try {
        const { data, usage } = await analyzeSecurityIntent(currentAddr, historyAddr, source);
        onUsageUpdate?.(usage); // DISPATCH TELEMETRY DATA
        
        const threatIndex = calculateThreatIndex(matchedScenario?.axes || { vsi: data.riskScore, edi: 10, pdi: 20, cri: 10, ipi: 5, rii: 0, eii: 0 });
        
        setResult({
          ...data,
          intentState: (matchedScenario?.id as IntentCategory) || data.intentState,
          telemetry: matchedScenario?.telemetry || { age: data.onChainAge, lastTx: 'Unknown', activity15d: '0' },
          threatIndex: threatIndex,
          axes: matchedScenario?.axes || { vsi: data.riskScore, edi: 10, pdi: 20, cri: 10, ipi: 5, rii: 0, eii: 0 }
        });
        
        if (matchedScenario) {
          setCompletedSims(prev => new Set([...prev, matchedScenario.id]));
        }
      } catch (err) {
        console.error("Audit failure", err);
      } finally {
        setIsAnalyzing(false);
        onScanningChange?.(false); // END TELEMETRY
      }
    }, 1200);
  };

  const startHold = () => {
    const startTime = Date.now();
    const duration = 1500;
    holdTimerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setHoldProgress(progress);
      if (progress >= 100) {
        if (holdTimerRef.current) clearInterval(holdTimerRef.current);
        setHoldProgress(0);
        handleOverride();
      }
    }, 10);
  };

  const cancelHold = () => {
    if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    setHoldProgress(0);
  };

  const handleOverride = () => {
    const currentBri = parseInt(localStorage.getItem('vigil_user_bri') || '100');
    localStorage.setItem('vigil_user_bri', Math.max(0, currentBri - 15).toString());
    setResult(null);
  };

  const getStatusConfig = (state: string) => {
    switch (state) {
      case 'POISON':
        return { 
          color: 'text-red-500', bg: 'bg-red-500/5', border: 'border-red-500/20', icon: <Skull className="w-6 h-6" />, label: 'POSSIBLE ADDRESS POISONING', glow: 'bg-red-600', animation: 'animate-scan-vertical',
          primaryCta: "HALT: ADDRESS POISONING DETECTED",
          secondaryCta: "OVERRIDE: PROCEED WITH RISK",
          why: "DEFINITION: Critical detection of vanity mimics designed to exploit the human eye's 8-character verification gap.\nEXAMPLE: An attacker sees you frequently send to Ab1C...Zz90 and generates a fake address Ab1C...Hacker...Zz90. You almost click it because the start and end look identical."
        };
      case 'PHISHING':
        return { 
          color: 'text-purple-500', bg: 'bg-purple-500/5', border: 'border-purple-500/30', icon: <Radar className="w-6 h-6" />, label: 'PHISHING SHIELD ACTIVE', glow: 'bg-purple-600', animation: 'animate-sonar-ripple',
          primaryCta: "TERMINAL ABORT: SOURCE UNTRUSTED",
          secondaryCta: "IGNORE SHIELD: TRUST MANUALLY",
          why: "DEFINITION: Interception triggered by high-risk source contexts such as social DMs or unverified dApp portals.\nEXAMPLE: You copy a 'Treasury Address' from a Telegram DM or a random X (Twitter) comment; VIGIL flags the source as a high-risk entry point."
        };
      case 'DUST':
        return { 
          color: 'text-amber-500', bg: 'bg-amber-500/5', border: 'border-amber-500/20', icon: <AlertOctagon className="w-6 h-6" />, label: 'DUST TRANSFER DETECTED', glow: 'bg-amber-600', animation: 'animate-float-dust',
          primaryCta: "DISCARD INJECTED DATA",
          secondaryCta: "PROCEED: DUST VERIFIED",
          why: "DEFINITION: Identification of unsolicited transfers used to pollute transaction logs with malicious destination history.\nEXAMPLE: A bot sends 0.000001 SOL to your wallet so that their malicious address appears at the top of your 'Recent Transactions' list."
        };
      case 'NEW':
        return { 
          color: 'text-cyan-500', bg: 'bg-cyan-500/5', border: 'border-cyan-500/20', icon: <Fingerprint className="w-6 h-6" />, label: 'REPORT: NEW ADDRESS', glow: 'bg-cyan-600', animation: 'animate-breathe',
          primaryCta: "INITIATE FORENSIC VERIFICATION",
          secondaryCta: "CONTINUE TO EXECUTION",
          why: "DEFINITION: Forensic alert for addresses with no prior interaction history or established on-chain reputation.\nEXAMPLE: You try to send funds to a wallet address that was created only 10 minutes ago and has zero previous transactions."
        };
      case 'SIMILARITY':
        return { 
          color: 'text-yellow-500', bg: 'bg-yellow-500/5', border: 'border-yellow-500/20', icon: <Scale className="w-6 h-6" />, label: 'REPORT: SIMILARITY NOTICE', glow: 'bg-yellow-600', animation: 'animate-shimmer',
          primaryCta: "COMPARE CHARACTER NODES",
          secondaryCta: "INTENT MATCHES: CONTINUE",
          why: "DEFINITION: Analysis of non-random character clusters that signal a computationally generated vanity attack.\nEXAMPLE: VIGIL detects that an address has been mathematically forced to start with 'DEFI...' or 'CEX...'—a sign of a generated scam wallet."
        };
      case 'MINT':
        return { 
          color: 'text-red-700', bg: 'bg-red-900/5', border: 'border-red-900/60', icon: <ShieldX className="w-6 h-6" />, label: 'MINT ADDRESS MISMATCH', glow: 'bg-red-800', animation: 'animate-strobe',
          primaryCta: "BLOCK COUNTERFEIT ASSET",
          secondaryCta: "IGNORE REGISTRY: EXECUTE",
          why: "DEFINITION: Shielding against counterfeit assets that impersonate legitimate tokens via registry verification failure.\nEXAMPLE: You are buying 'USDC' on a dApp, but VIGIL detects the token's contract address is not the official Circle mint."
        };
      case 'CLIPBOARD':
        return { 
          color: 'text-emerald-500', bg: 'bg-emerald-500/5', border: 'border-emerald-500/40', icon: <Zap className="w-6 h-6" />, label: 'CLIPBOARD SWAP INTERCEPTED', glow: 'bg-emerald-600', animation: 'animate-glitch',
          primaryCta: "REVIEW ORIGINAL INTENT",
          secondaryCta: "TRUST RESTORED PAYLOAD",
          why: "DEFINITION: Real-time neutralization of malicious scripts attempting to swap address data during transfer.\nEXAMPLE: You copy a valid address, but hidden malware instantly swaps it for the hacker's address the moment you press 'Paste'."
        };
      case 'SPOOF':
        return { 
          color: 'text-pink-500', bg: 'bg-pink-500/5', border: 'border-pink-500/40', icon: <Eye className="w-6 h-6" />, label: 'VISUAL SPOOF DETECTED', glow: 'bg-pink-600', animation: 'animate-magnify',
          primaryCta: "NEUTRALIZE DECEPTION",
          secondaryCta: "BYPASS BIOLOGICAL SHIELD",
          why: "DEFINITION: Detection of deceptive Unicode homographs and character substitutions designed to simulate authentic destinations.\nEXAMPLE: A scammer uses a Greek 'ο' instead of a Latin 'o' in an address string; to your eye they look identical."
        };
      case 'TRUSTED':
        return { 
          color: 'text-emerald-500', bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', icon: <ShieldCheck className="w-6 h-6" />, label: 'TRUSTED DESTINATION', glow: 'bg-emerald-600', animation: '',
          primaryCta: "RETURN TO SOURCE",
          secondaryCta: "SETTLE INTENT: CONFIRM",
          why: "DEFINITION: Verification of intent against an established safe node within your local historical trust graph.\nEXAMPLE: You are sending SOL to your hardware wallet address that you have used successfully 20 times this year."
        };
      default:
        return { 
          color: 'text-blue-500', bg: 'bg-blue-500/5', border: 'border-blue-500/20', icon: <Info className="w-5 h-5" />, label: 'REPORT: INFO WARNING', glow: 'bg-blue-600', animation: '', 
          primaryCta: "ABORT TRANSACTION", secondaryCta: "PROCEED MANUALLY", 
          why: "Analysis Layer Online. System monitoring interaction context and validating structural intent." 
        };
    }
  };

  return (
    <section id="system-simulation" className="px-6 md:px-20 py-4 md:py-8 bg-[#020202] relative z-10 scroll-mt-20 flex flex-col items-center min-h-fit overflow-hidden">
      <ThreatIndexBreakdown isOpen={isBreakdownOpen} onClose={() => setIsBreakdownOpen(false)} />
      
      {result?.axes && (
        <TIMDiagnosticModal 
          isOpen={isDiagnosticOpen} 
          onClose={() => setIsDiagnosticOpen(false)} 
          axes={result.axes}
          totalIndex={result.threatIndex || 0}
        />
      )}

      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          
          {/* CONTROL PANEL */}
          <div className="lg:w-[42%] space-y-6 flex flex-col w-full">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Path 01 // Intent Validator</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
                  Intent Validator.
                </h2>
              </div>
              <p className="text-sm md:text-base text-zinc-400 font-medium leading-relaxed italic animate-in fade-in duration-1000">
                "Validating user <span className="text-blue-500">belief against reality.</span> Ensure the destination you see is the one you sign."
              </p>
            </div>

            <div className="space-y-3">
               <div className="flex flex-col gap-2">
                 <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-2">
                      <Zap className="w-3 h-3 text-amber-500" /> SIMULATION CONTROL
                    </label>
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                       STATUS: {completedSims.size} / 9 VECTORS ANALYZED
                    </span>
                 </div>
                 <div className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 border border-blue-500/20 rounded-xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
                    <MousePointerClick className="w-4 h-4 text-blue-500 relative z-10" />
                    <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest relative z-10 leading-tight">
                       To synchronize biological perception with VIGIL Layer 0.5, execute all 9 simulation vectors.
                    </span>
                 </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {testScenarios.map((sc) => (
                    <button 
                      key={sc.id} 
                      onClick={() => injectScenario(sc)} 
                      className={`py-3.5 px-4 border rounded-xl hover:border-blue-500/50 hover:bg-blue-600/5 transition-all group relative overflow-hidden active:scale-[0.97] flex items-center justify-center ${currentAddr === sc.addr ? 'bg-zinc-900 border-blue-500/50 shadow-lg shadow-blue-500/5' : 'bg-zinc-950 border-zinc-900'}`}
                    >
                       <span className={`text-[10px] font-black uppercase tracking-widest transition-colors z-10 text-center ${currentAddr === sc.addr ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`}>
                         {sc.label}
                       </span>
                       {completedSims.has(sc.id) && (
                         <div className="absolute left-2 text-emerald-500">
                           <CheckCircle2 size={10} />
                         </div>
                       )}
                       <div className="absolute right-2 px-1.5 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[7px] font-black text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all whitespace-nowrap z-20">
                         INJECT
                       </div>
                    </button>
                  ))}
               </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-zinc-900/50">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1 text-center block w-full">Source Context</label>
                 <div className="flex gap-2">
                    {[
                      { id: 'EXPLORER', icon: <Globe className="w-3.5 h-3.5" />, label: 'Explorer' },
                      { id: 'DAPP', icon: <ExternalLink className="w-3.5 h-3.5" />, label: 'dApp' },
                      { id: 'SOCIAL', icon: <MessageSquare className="w-3.5 h-3.5" />, label: 'Social' }
                    ].map((s) => (
                      <button key={s.id} onClick={() => setSource(s.id as any)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${source === s.id ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-[#080808] border-zinc-900 text-zinc-600'}`}>
                        {s.icon} {s.label}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] ml-1 flex items-center justify-center gap-2 w-full">
                   <ClipboardPaste className="w-3.5 h-3.5" /> Transfer Destination
                </label>
                <div className="flex gap-4">
                   <input type="text" value={currentAddr} onChange={(e) => setCurrentAddr(e.target.value)} placeholder="PASTE ADDRESS..." className="flex-1 bg-[#080808] border-2 border-zinc-900 rounded-2xl py-4 px-6 text-xs font-mono text-white placeholder:text-zinc-800 focus:outline-none focus:border-blue-600 transition-all uppercase shadow-inner text-center" />
                </div>
              </div>

              <button 
                onClick={handleValidate} 
                disabled={isAnalyzing || !currentAddr} 
                className={`w-full py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-500 flex items-center justify-center gap-3 active:scale-95 shadow-2xl ${
                  isAnalyzing ? 'bg-zinc-900 text-zinc-600 cursor-wait' : 'bg-white text-black hover:bg-blue-600 hover:text-white'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <Activity className="w-4 h-4 animate-pulse" />
                    ANALYZING...
                  </>
                ) : (
                  <>
                    <Scan className="w-4 h-4" />
                    VALIDATE TRANSACTION
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RESULTS PANEL (THE POPUP BOX) */}
          <div className="lg:w-[58%] w-full h-full min-h-[600px] flex flex-col">
            <div className={`flex-1 bg-[#0a0a0a] border-2 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden transition-[border-color,box-shadow] duration-700 ${result ? getStatusConfig(result.intentState).border : 'border-zinc-900 shadow-2xl'}`}>
              
              {/* Ambient Glow & Animation Layer */}
              {result && (
                <>
                  <div className={`absolute -top-24 -right-24 w-64 h-64 ${getStatusConfig(result.intentState).glow} blur-[80px] opacity-20 pointer-events-none transition-opacity`} />
                  <div className={`absolute inset-0 pointer-events-none opacity-40 ${getStatusConfig(result.intentState).animation}`} />
                </>
              )}

              {/* Threat Index Badge */}
              {result && (
                <div className="absolute top-8 right-8 z-30 group/badge">
                   <button 
                    onClick={() => setIsDiagnosticOpen(true)}
                    className={`flex items-center gap-1.5 px-2 py-1 bg-black border rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 ${result.threatIndex! > 75 ? 'border-red-500/40' : result.threatIndex! > 45 ? 'border-amber-500/40' : 'border-emerald-500/40'}`}
                   >
                      <BarChart3 className={`w-3 h-3 ${result.threatIndex! > 75 ? 'text-red-500' : result.threatIndex! > 45 ? 'text-amber-500' : 'text-emerald-500'}`} />
                      <div className="space-y-0 text-left">
                         <span className={`text-[12px] font-black italic leading-none ${result.threatIndex! > 75 ? 'text-red-500' : result.threatIndex! > 45 ? 'text-amber-500' : 'text-emerald-500'}`}>{result.threatIndex}%</span>
                      </div>
                      <div className="h-3 w-[1px] bg-zinc-800" />
                      <span className="text-[7px] font-black text-blue-500 uppercase tracking-widest group-hover/badge:underline decoration-blue-500/40 pr-1 animate-inspect-flicker">Inspect</span>
                   </button>
                </div>
              )}

              {!result && !isAnalyzing && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-12 animate-in fade-in duration-1000">
                  <div className="flex flex-col items-center gap-8">
                     <div className="relative group">
                        <div className="absolute inset-0 bg-blue-500/10 blur-[60px] animate-pulse rounded-full" />
                        <Brain className="w-24 h-24 text-zinc-700 relative z-10 animate-pulse" strokeWidth={0.8} />
                     </div>
                     
                     <div className="space-y-4 relative z-10">
                        <div className="space-y-2">
                          <h3 className="text-xl md:text-2xl font-black text-zinc-400 uppercase tracking-[0.4em]">Awaiting Simulation</h3>
                          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest italic">LISTENING_FOR_INTENT</p>
                        </div>
                        <div className="h-[1px] w-12 bg-zinc-800 mx-auto" />
                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.8em] block">Cognitive Core Standby</span>
                     </div>
                  </div>
                </div>
              )}

              {isAnalyzing && (
                 <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <VigilScanner label="EXECUTING_HEURISTIC_MATRIX" size="lg" />
                 </div>
              )}

              {result && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 relative z-10">
                   <div className="flex items-center gap-6 border-b border-white/5 pb-8 mr-32">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-2xl transition-all duration-500 ${getStatusConfig(result.intentState).color} ${getStatusConfig(result.intentState).border} ${getStatusConfig(result.intentState).bg}`}>
                        {getStatusConfig(result.intentState).icon}
                      </div>
                      <div className="space-y-1">
                         <h3 className={`text-xl font-black italic uppercase tracking-tighter ${getStatusConfig(result.intentState).color}`}>
                           {getStatusConfig(result.intentState).label}
                         </h3>
                         <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full animate-pulse ${getStatusConfig(result.intentState).color}`} />
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Active_Interception_Layer</span>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Info className={`w-3 h-3 ${getStatusConfig(result.intentState).color}`} />
                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Interception Logic</span>
                      </div>
                      <div className="space-y-4 text-zinc-400 text-base leading-relaxed font-medium whitespace-pre-line">
                        {getStatusConfig(result.intentState).why.split('\n').map((line, i) => (
                          <div key={i} className={i > 0 ? "pt-4 border-t border-white/5" : ""}>
                            {line.startsWith('DEFINITION:') ? (
                               <div className="flex flex-col gap-2">
                                  <span className={`inline-block w-fit px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-500 border border-blue-500/20`}>DEFINITION</span>
                                  <span className="italic">"{line.replace('DEFINITION:', '').trim()}"</span>
                               </div>
                            ) : line.startsWith('EXAMPLE:') ? (
                               <div className="flex flex-col gap-2">
                                  <span className={`inline-block w-fit px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/20`}>EXAMPLE</span>
                                  <span className="italic text-zinc-500">"{line.replace('EXAMPLE:', '').trim()}"</span>
                               </div>
                            ) : line}
                          </div>
                        ))}
                      </div>
                   </div>

                   {result.telemetry && (
                     <div className="p-6 bg-black/40 border border-white/5 rounded-3xl space-y-4 shadow-inner">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-3.5 h-3.5 text-blue-500" />
                          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Subject Telemetry</span>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                          <div className="space-y-1.5">
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block">Address Age</span>
                            <span className="text-[12px] font-mono font-bold text-zinc-200">{result.telemetry.age}</span>
                          </div>
                          <div className="space-y-1.5 border-x border-white/5 px-6">
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block">Last Time</span>
                            <span className="text-[12px] font-mono font-bold text-zinc-200">{result.telemetry.lastTx}</span>
                          </div>
                          <div className="space-y-1.5">
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block">15D Tx</span>
                            <span className="text-[12px] font-mono font-bold text-zinc-200">{result.telemetry.activity15d}</span>
                          </div>
                        </div>
                     </div>
                   )}

                   <div className="space-y-3">
                      <button 
                        onClick={() => setResult(null)}
                        className={`w-full py-5 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-center justify-center gap-4 group/action hover:border-zinc-700 transition-all active:scale-[0.98] ${getStatusConfig(result.intentState).color}`}
                      >
                         <ShieldCheck className="w-5 h-5" />
                         <span className="text-xs font-black uppercase tracking-[0.25em]">{getStatusConfig(result.intentState).primaryCta}</span>
                      </button>

                      <button 
                        onMouseDown={startHold}
                        onMouseUp={cancelHold}
                        onMouseLeave={cancelHold}
                        onTouchStart={startHold}
                        onTouchEnd={cancelHold}
                        className="relative w-full py-4 bg-transparent border border-zinc-900 rounded-2xl flex items-center justify-center gap-3 group/risky hover:border-red-900/50 transition-all active:scale-[0.99] overflow-hidden"
                      >
                         <div 
                           className="absolute top-0 left-0 bottom-0 bg-red-600/10 transition-all duration-75 pointer-events-none"
                           style={{ width: `${holdProgress}%` }}
                         />
                         <div className="relative z-10 flex items-center gap-3">
                            <AlertTriangle className="w-3.5 h-3.5 text-zinc-400 group-hover/risky:text-red-600 transition-colors" />
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest group-hover/risky:text-zinc-500">
                               {getStatusConfig(result.intentState).secondaryCta}
                               <span className="ml-2 text-[8px] opacity-80 font-mono">[HOLD 1.5S]</span>
                            </span>
                         </div>
                      </button>
                   </div>

                   <div className="pt-6 border-t border-white/5">
                      <p className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.25em] leading-relaxed text-center italic">
                        VIGIL ADVISORY: SECURITY IS PROBABILISTIC. WE DO NOT SIGN TRANSACTIONS. OPERATOR ASSUMES ALL RISK.
                      </p>
                   </div>
                   
                   <button onClick={() => setResult(null)} className="absolute top-0 right-0 p-2 text-zinc-800 hover:text-zinc-600 transition-colors">
                      <RotateCcw className="w-4 h-4" />
                   </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-vertical {
          0% { top: -100%; }
          100% { top: 100%; }
        }
        .animate-scan-vertical::after {
          content: "";
          position: absolute; left: 0; width: 100%; height: 3px;
          background: rgba(239, 68, 68, 0.4);
          box-shadow: 0 0 20px #ef4444;
          animation: scan-vertical 3s linear infinite;
        }
        @keyframes sonar {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .animate-sonar-ripple::after {
          content: "";
          position: absolute; top: 50%; left: 50%; width: 300px; height: 300px;
          margin-top: -150px; margin-left: -150px;
          border: 1px solid rgba(168, 85, 247, 0.3);
          border-radius: 50%;
          animation: sonar 2s linear infinite;
        }
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(15px, 15px); }
        }
        .animate-float-dust::after {
          content: "· . · . ·";
          position: absolute; font-size: 24px; color: rgba(245, 158, 11, 0.1);
          animation: drift 6s infinite linear;
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(-3px, -3px); }
          60% { transform: translate(3px, 3px); }
          80% { transform: translate(3px, -3px); }
          100% { transform: translate(0); }
        }
        .animate-glitch { animation: glitch 0.25s infinite; opacity: 0.03; background: white; }
        @keyframes strobe {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.1; }
        }
        .animate-strobe { animation: strobe 0.4s step-end infinite; opacity: 0.05; background: rgba(185, 28, 28, 0.3); }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.05), transparent);
          background-size: 200% 100%;
          animation: shimmer 4s infinite linear;
        }
        @keyframes magnify {
          0% { transform: scale(1) translate(0); }
          50% { transform: scale(1.1) translate(10px, 10px); }
          100% { transform: scale(1) translate(0); }
        }
        .animate-magnify { animation: magnify 4s infinite ease-in-out; }
        @keyframes breathe {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.15; }
        }
        .animate-breathe { animation: breathe 4s infinite ease-in-out; background: #06b6d4; }
        @keyframes inspect-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .animate-inspect-flicker {
          animation: inspect-flicker 1s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
