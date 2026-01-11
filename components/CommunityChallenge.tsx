import React, { useState, useEffect, useRef } from 'react';
import { Target, Search, Trophy, Terminal as TerminalIcon, Lock, Unlock, ChevronRight, AlertCircle, CheckCircle2, User, Globe, Loader2, ShieldCheck, Wifi, WifiOff, LogOut, RefreshCcw, Wallet, Coins, ArrowUpRight, FileText, Database, ShieldAlert, Zap, Skull, Timer, Fingerprint, Brain, Activity, ShieldX, Info, History, List, Eye, AlertTriangle, Map as MapIcon, BarChart3, TrendingUp, Medal, Star, Shield, ZapOff, HeartPulse } from 'lucide-react';

const REGISTRY_ENDPOINT = "https://script.google.com/macros/s/AKfycbwY5wE282Rqmec5bMYsQLTm1nsbbxzzfD8B7Q_AsuA1VC2PNucGCfFDYo4l7f2J5h6CQQ/exec"; 
const CHALLENGE_DURATION = 5.0;

interface Puzzle {
  id: number;
  question: string;
  hint: string;
  answer: string;
  referenceAddr: string;
}

interface ClaimRecord {
  id: number;
  receipt: string;
  timestamp: string;
}

const isValidSolanaAddress = (addr: string) => {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(addr);
};

const generatePoisonMimic = (real: string): string => {
  const prefix = real.slice(0, 4);
  const suffix = real.slice(-4);
  const charset = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let middle = "";
  for (let i = 0; i < real.length - 8; i++) {
    if (Math.random() > 0.65) {
      middle += real[i + 4];
    } else {
      middle += charset.charAt(Math.floor(Math.random() * charset.length));
    }
  }
  return prefix + middle + suffix;
};

// SIMULATED LEADERBOARD DATA - SORTED BY RESILIENCE
const INITIAL_LEADERBOARD = [
  { handle: "@sol_guard", bri: 98, rank: "APEX", intercepted: 142 },
  { handle: "@vigil_01", bri: 94, rank: "SENTINEL", intercepted: 89 },
  { handle: "@nexus_sent", bri: 88, rank: "GUARDIAN", intercepted: 64 },
  { handle: "@phantom_eye", bri: 82, rank: "USER", intercepted: 41 },
  { handle: "@0x_shadow", bri: 76, rank: "ANALYST", intercepted: 22 }
];

export const CommunityChallenge: React.FC = () => {
  const puzzles: Puzzle[] = [
    { id: 1, question: "IDENTIFY_FRAGMENT_01: Locate the 4-character prefix of the 'FAKE' address used to demonstrate 'Vanishing Entropy' in the primary vulnerability analysis.", hint: "Search the registry focused on Adversarial Analysis and Entropy Collisions.", answer: "Ab1C", referenceAddr: "Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90" },
    { id: 2, question: "IDENTIFY_FRAGMENT_02: Identify the 'Archive ID' assigned to the Shadow dApp dataset utilized in the peer-reviewed methodology.", hint: "Inspect the Methodology section of the document documenting 'Project Mirror'.", answer: "BSEC-2024-POISON-V2", referenceAddr: "BSECv27821xPoisoN7729110028x992211" },
    { id: 3, question: "IDENTIFY_FRAGMENT_03: Provide the terminal 'Registry ID' that concludes the primary compliance framework for operational standards.", hint: "Find the document governing 'Operational Terms' and scroll to the absolute end-of-file string.", answer: "VIG-TOS-INST-A1", referenceAddr: "VIG1nsT7281x992811772008x99120817" },
    { id: 4, question: "IDENTIFY_FRAGMENT_04: Find the 'LOG_ID' of the specific validation snapshot window that indicates 'COMPLETE' for poisoning patterns.", hint: "Inspect the visual UI mockups embedded within the architectural documentation.", answer: "8821-X", referenceAddr: "8821xVIGIL0091128x772199291120038" },
    { id: 5, question: "IDENTIFY_FRAGMENT_05: State the total count of 'Registered Assets' (Wordmarks and Marks) currently held in the restricted media gateway.", hint: "You must first unlock the v0.0.1.1 gateway to count the definitive wordmarks.", answer: "19", referenceAddr: "REG19xASSET992811x772199291120038" },
    { id: 6, question: "IDENTIFY_FRAGMENT_06: Identify the target latency threshold (in milliseconds) required for 0.5 Layer DOM interception.", hint: "Refer to the Operational Latency section in the Technical Specification.", answer: "12ms", referenceAddr: "LAT12msX992811x772199291120038" },
    { id: 7, question: "IDENTIFY_FRAGMENT_07: Provide the operation ID assigned to the Adversarial Mimicry Lab experimental environment.", hint: "Check the top label of the Adversarial Mimicry Lab / Trial by Fire section.", answer: "VIG-POI-X1", referenceAddr: "VIGP01X1x992811x772199291120038" },
    { id: 8, question: "IDENTIFY_FRAGMENT_08: Locate the specific Registry ID found at the conclusion of the 'Privacy Protocol'.", hint: "Navigate to the end of the Data Governance Privacy Protocol document.", answer: "VIG-PRV-INST-03", referenceAddr: "V1GPRV1NST03x772199291120038" },
    { id: 9, question: "IDENTIFY_FRAGMENT_09: Identify the Reference ID (REF) used for the classified Strategic Intelligence Threat Model.", hint: "Inspect the header of the Threat Model document in the registry.", answer: "VIG-TM-2026.09", referenceAddr: "VIGTM202609x772199291120038" },
    { id: 10, question: "IDENTIFY_FRAGMENT_10: State the ID assigned to the 'Heuristic Signal' specification within the Intent Validator engine.", hint: "Check the Engine Specification label inside the Intent Validator breakdown.", answer: "VIG-HEUR-01", referenceAddr: "VIGHEUR01x772199291120038" },
    { id: 11, question: "IDENTIFY_FRAGMENT_11: List the four flagship wordmark types (letters only) mentioned in the Institutional Design Note.", hint: "Look for the types (e.g. Type A, B...) listed in the Brand Assets section.", answer: "PQRS", referenceAddr: "TYPEPQRSx772199291120038" },
    { id: 12, question: "IDENTIFY_FRAGMENT_12: Identify the Tier designation assigned to the 'Baseline Awareness' baseline protection plan.", hint: "Refer to the baseline plan label in the Plans & Licensing section.", answer: "TIER: 01", referenceAddr: "TIER01xREGRx772199291120038" },
    { id: 13, question: "IDENTIFY_FRAGMENT_13: Provide the Registry ID that concludes the official Research Briefing (Annotated Edition).", hint: "Scroll to the final data log entry of the Research Briefing document.", answer: "VIG-INTEL-RP-01-FULL-H2", referenceAddr: "VIGINTELRP01FULLH2x77219929" },
    { id: 14, question: "IDENTIFY_FRAGMENT_14: State the specific operational version tag displayed on the VIGIL system dashboard.", hint: "Check the version label found in the sidebar or header (e.g. v 0.x.x.x).", answer: "v 0.0.1.1", referenceAddr: "V0011xSYSx772199291120038" },
    { id: 15, question: "IDENTIFY_FRAGMENT_15: Provide the terminal Registry Reference ID mentioned at the absolute end of the Institutional Disclaimer.", hint: "Inspect the end of the legal registry's disclaimer fragment.", answer: "VIG-LEGAL-CORE-A1", referenceAddr: "VIGLEGALCOREA1x772199291120038" }
  ];

  const [userHandle, setUserHandle] = useState('');
  const [solanaAddress, setSolanaAddress] = useState('');
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  // Gamification States (Phase 2)
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [bri, setBri] = useState(100); // Biological Resilience Index
  const [view, setView] = useState<'INTEL' | 'GLOBAL'>('INTEL');

  // Challenge Flow
  const [flowState, setFlowState] = useState<'QUESTION' | 'TRIAL_PREP' | 'TRIAL' | 'SYNCING' | 'SUCCESS' | 'ERROR' | 'BREACH'>('QUESTION');
  const [errorMsg, setErrorMsg] = useState('');
  const [claimHistory, setClaimHistory] = useState<ClaimRecord[]>([]);

  // Mimicry Trial States
  const [trialOptions, setTrialOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_DURATION);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('vigil_challenge_pro_v2');
    const savedHandle = localStorage.getItem('vigil_user_handle');
    const savedAddress = localStorage.getItem('vigil_user_address');
    const savedClaims = localStorage.getItem('vigil_claims_v3');
    const savedXp = localStorage.getItem('vigil_user_xp');
    const savedBri = localStorage.getItem('vigil_user_bri');
    
    if (saved) setCurrentStep(Math.min(parseInt(saved), puzzles.length));
    if (savedHandle) setUserHandle(savedHandle);
    if (savedAddress) setSolanaAddress(savedAddress);
    if (savedClaims) setClaimHistory(JSON.parse(savedClaims));
    if (savedXp) {
      const parsedXp = parseInt(savedXp);
      setXp(parsedXp);
      setLevel(Math.floor(parsedXp / 100) + 1);
    }
    if (savedBri) setBri(parseInt(savedBri));
    
    if (savedHandle && savedAddress) {
      setIsSessionActive(true);
    }
  }, []);

  const updateBri = (delta: number) => {
    const nextBri = Math.max(0, Math.min(100, bri + delta));
    setBri(nextBri);
    localStorage.setItem('vigil_user_bri', nextBri.toString());
  };

  const initiateSession = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationError(null);
    const error = validateIdentity();
    if (error) {
      setRegistrationError(error);
      return;
    }
    const cleanHandle = userHandle.trim();
    const cleanAddr = solanaAddress.trim();
    setUserHandle(cleanHandle);
    setSolanaAddress(cleanAddr);
    setIsSessionActive(true);
    localStorage.setItem('vigil_user_handle', cleanHandle);
    localStorage.setItem('vigil_user_address', cleanAddr);
  };

  const validateIdentity = () => {
    const cleanHandle = userHandle.trim();
    const cleanAddr = solanaAddress.trim();
    const isHandleInvalid = !cleanHandle.startsWith('@') || cleanHandle.length < 2;
    const isAddrInvalid = cleanAddr === '' || !isValidSolanaAddress(cleanAddr);
    if (isHandleInvalid && isAddrInvalid) return "CRITICAL_AUTH_FAILURE: DUAL_FRAGMENT_MISMATCH";
    if (isHandleInvalid) return "IDENTITY_FAILURE: INVALID X_ID";
    if (isAddrInvalid) return "MALFORMED_PAYLOAD: INVALID ADDRESS";
    return null;
  };

  const handlePuzzleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const current = puzzles[currentStep];
    if (inputValue.trim().toUpperCase() === current.answer.toUpperCase()) {
      setFlowState('TRIAL_PREP');
    } else {
      setFlowState('ERROR');
      setErrorMsg('Intel Fragment mismatch. Data refused.');
      updateBri(-2);
      setTimeout(() => setFlowState('QUESTION'), 2000);
    }
  };

  const initiateTrial = () => {
    const current = puzzles[currentStep];
    const mimics = [
      generatePoisonMimic(current.referenceAddr),
      generatePoisonMimic(current.referenceAddr),
      generatePoisonMimic(current.referenceAddr),
      generatePoisonMimic(current.referenceAddr)
    ];
    setTrialOptions([...mimics, current.referenceAddr].sort(() => Math.random() - 0.5));
    setFlowState('TRIAL');
    startTrialTimer();
  };

  const startTrialTimer = () => {
    setTimeLeft(CHALLENGE_DURATION);
    const start = Date.now();
    timerRef.current = window.setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const remaining = Math.max(0, CHALLENGE_DURATION - elapsed);
      setTimeLeft(remaining);
      if (remaining === 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        failTrial('Cognitive Timeout. Biological response delayed.');
      }
    }, 10);
  };

  const failTrial = (msg: string) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setFlowState('BREACH');
    setErrorMsg(msg);
    updateBri(-10);
    setTimeout(() => {
      setFlowState('QUESTION');
      setInputValue('');
    }, 3000);
  };

  const handleTrialSelection = async (selection: string) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const current = puzzles[currentStep];
    
    if (selection === current.referenceAddr) {
      setFlowState('SYNCING');
      const speedBonus = timeLeft > 3.5 ? 2 : 0;
      updateBri(2 + speedBonus);
      await submitClaim(currentStep + 1);
    } else {
      failTrial('Biological Failure. Intent mismatched.');
    }
  };

  const submitClaim = async (id: number) => {
    const proof = btoa(`${solanaAddress}_${id}_${Date.now()}`).slice(0, 10).toUpperCase();
    try {
      await fetch(REGISTRY_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          handle: userHandle,
          address: solanaAddress,
          fragment: id,
          bri: bri,
          proof: proof
        })
      });

      const newClaim: ClaimRecord = { id, receipt: `VIG-REC-${proof}`, timestamp: new Date().toLocaleTimeString() };
      const updated = [...claimHistory, newClaim];
      setClaimHistory(updated);
      localStorage.setItem('vigil_claims_v3', JSON.stringify(updated));

      const newXp = xp + 50;
      setXp(newXp);
      setLevel(Math.floor(newXp / 100) + 1);
      localStorage.setItem('vigil_user_xp', newXp.toString());
      
      setFlowState('SUCCESS');
      setTimeout(() => {
        const next = currentStep + 1;
        setCurrentStep(next);
        localStorage.setItem('vigil_challenge_pro_v2', next.toString());
        setInputValue('');
        setFlowState('QUESTION');
      }, 1500);
    } catch (err) {
      setFlowState('ERROR');
      setErrorMsg('Registry Sync Failure.');
      setTimeout(() => setFlowState('QUESTION'), 2000);
    }
  };

  const terminateSession = () => {
    if (confirm("Revoke identity session? Registry records will be preserved.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const currentEarnings = claimHistory.length * 0.1;
  const userRank = bri >= 90 ? "APEX" : bri >= 75 ? "SENTINEL" : bri >= 50 ? "GUARDIAN" : "RECRUIT";

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col relative z-10 overflow-hidden">
      {!isSessionActive ? (
        <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-700 px-4">
           <div className="w-full max-w-2xl text-center space-y-12">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-amber-600/10 border border-amber-500/30 rounded-3xl flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(245,158,11,0.15)]">
                  <User className="w-10 h-10 text-amber-500" />
                </div>
                <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-none">User <br/> Assessment.</h2>
              </div>
              <form onSubmit={initiateSession} className="space-y-8">
                <div className="space-y-4">
                  <input autoFocus type="text" value={userHandle} onChange={(e) => setUserHandle(e.target.value)} placeholder="@X_ID" className="w-full bg-[#080808] border-2 border-zinc-900 rounded-3xl py-5 px-8 text-xl font-mono text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-600 transition-all uppercase" />
                  <input type="text" value={solanaAddress} onChange={(e) => setSolanaAddress(e.target.value)} placeholder="SOL_ADDRESS" className="w-full bg-[#080808] border-2 border-zinc-900 rounded-3xl py-5 px-8 text-sm font-mono text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-600 transition-all uppercase" />
                </div>
                {registrationError && <div className="p-5 bg-red-600 border border-red-500 rounded-2xl flex items-center gap-4 animate-pulse"><AlertTriangle className="w-5 h-5 text-white" /><span className="text-[10px] font-black text-white uppercase tracking-widest">{registrationError}</span></div>}
                <button type="submit" className="w-full py-6 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-3xl hover:bg-amber-600 hover:text-white transition-all">INITIATE ASSESSMENT</button>
              </form>
           </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col h-full min-h-0 animate-in fade-in duration-1000 px-4">
          
          {/* PHASE 2 HEADER */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 px-4 py-6 shrink-0">
            <div className="space-y-1 text-center lg:text-left">
               <div className="flex items-center gap-3 justify-center lg:justify-start">
                 <Shield className="w-4 h-4 text-amber-500 animate-pulse" />
                 <span className="text-amber-500 font-black text-[9px] uppercase tracking-[0.6em]">Biological Integrity: MONITORING</span>
               </div>
               <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">Sentinel Ops.</h2>
            </div>
            
            <div className="flex items-center gap-4">
               {/* VIEW TOGGLE */}
               <div className="p-1 bg-[#0a0a0a] border border-zinc-900 rounded-2xl flex">
                  <button onClick={() => setView('INTEL')} className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${view === 'INTEL' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}>
                    <TerminalIcon className="w-3.5 h-3.5 inline mr-2" /> Decryption
                  </button>
                  <button onClick={() => setView('GLOBAL')} className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${view === 'GLOBAL' ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}>
                    <Globe className="w-3.5 h-3.5 inline mr-2" /> Global Shield
                  </button>
               </div>

               {/* BIOMETRIC GAUGE */}
               <div className="p-3 h-20 bg-[#0a0a0a] border border-zinc-900 rounded-[1.5rem] shadow-2xl flex items-center gap-4 relative overflow-hidden group">
                  <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                     <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-zinc-900" />
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" className={`transition-all duration-1000 ${bri > 80 ? 'text-emerald-500' : bri > 50 ? 'text-amber-500' : 'text-red-500'}`} strokeDasharray="125.6" strokeDashoffset={125.6 - (125.6 * (bri / 100))} />
                     </svg>
                     <div className="text-center">
                        <div className="text-[10px] font-black text-white italic leading-none">{bri}%</div>
                     </div>
                  </div>
                  <div className="space-y-0.5 pr-2">
                     <div className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">Resilience Index</div>
                     <div className={`text-[11px] font-black italic tracking-tighter leading-none ${bri > 80 ? 'text-emerald-500' : bri > 50 ? 'text-amber-500' : 'text-red-500'}`}>{userRank} Rank</div>
                  </div>
               </div>

               <button onClick={terminateSession} className="group flex items-center justify-center w-14 h-20 bg-zinc-900 border border-zinc-800 rounded-[1.5rem] text-zinc-600 hover:text-red-500 transition-all">
                  <LogOut className="w-5 h-5" />
               </button>
            </div>
          </div>

          {view === 'GLOBAL' ? (
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in zoom-in duration-500 pb-4 overflow-hidden">
               {/* GLOBAL MAP HEATMAP */}
               <div className="lg:col-span-8 bg-[#0a0a0a] border border-zinc-900 rounded-[3rem] p-8 relative overflow-hidden h-full flex flex-col items-center justify-center">
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2),transparent_70%)]" />
                     <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                  </div>
                  
                  <div className="relative z-10 text-center space-y-6">
                     <div className="relative w-24 h-24 mx-auto">
                        <Globe className="w-full h-full text-blue-500/20 animate-pulse" />
                        <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-ping" />
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Sentinel Network Map</h3>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.4em]">Live Cluster Interception: ACTIVE</p>
                     </div>
                  </div>

                  <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-red-600 rounded-full animate-ping delay-700" />
                  <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />

                  <div className="absolute bottom-6 right-6 p-6 bg-black/50 backdrop-blur-md border border-zinc-800 rounded-3xl space-y-3 max-w-xs">
                     <div className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-[9px] font-black text-white uppercase tracking-widest">Network Throughput</span>
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                        <div>
                           <div className="text-2xl font-black text-white italic">14.2k</div>
                           <div className="text-[7px] text-zinc-600 font-black uppercase">Intercepts/hr</div>
                        </div>
                        <div>
                           <div className="text-2xl font-black text-emerald-500 italic">99.2%</div>
                           <div className="text-[7px] text-zinc-600 font-black uppercase">Integrity</div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* REFINED LEADERBOARD */}
               <div className="lg:col-span-4 bg-[#0a0a0a] border border-zinc-900 rounded-[3rem] p-8 space-y-6 h-full flex flex-col overflow-hidden">
                  <div className="space-y-1 border-b border-zinc-900 pb-4 shrink-0">
                     <div className="flex items-center gap-2">
                        <Medal className="w-4 h-4 text-amber-500" />
                        <h3 className="text-lg font-black text-white italic uppercase">User Rankings</h3>
                     </div>
                     <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest">Ranked by BRI Performance</p>
                  </div>

                  <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pr-1">
                     {INITIAL_LEADERBOARD.map((op, i) => (
                        <div key={i} className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-center justify-between group hover:border-blue-500/30 transition-all">
                           <div className="flex items-center gap-3">
                              <div className="text-[10px] font-black text-zinc-800">{i + 1}</div>
                              <div className="space-y-0.5">
                                 <div className="text-[10px] font-black text-white uppercase tracking-widest">{op.handle}</div>
                                 <div className="text-[7px] font-bold text-blue-500 uppercase tracking-widest italic">{op.rank} Sentinel</div>
                              </div>
                           </div>
                           <div className="text-right">
                              <div className={`text-xs font-black italic leading-none ${op.bri > 90 ? 'text-emerald-500' : 'text-amber-500'}`}>{op.bri}% BRI</div>
                              <div className="text-[6px] text-zinc-700 font-black uppercase tracking-widest mt-1">{op.intercepted} SECURED</div>
                           </div>
                        </div>
                     ))}
                     <div className="p-4 bg-amber-500/10 border border-amber-500/40 rounded-2xl flex items-center justify-between animate-pulse">
                        <div className="flex items-center gap-3">
                           <div className="text-[10px] font-black text-amber-500">88</div>
                           <div className="space-y-0.5">
                              <div className="text-[10px] font-black text-white uppercase tracking-widest">{userHandle || "@YOU"}</div>
                              <div className="text-[7px] font-bold text-amber-500 uppercase tracking-widest italic">{userRank} Candidate</div>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-xs font-black text-amber-500 italic leading-none">{bri}% BRI</div>
                           <div className="text-[6px] text-zinc-500 font-black uppercase tracking-widest mt-1">{claimHistory.length} SECURED</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          ) : (
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-4 overflow-hidden h-full">
              
              <div className="lg:col-span-3 h-full overflow-hidden">
                <div className="p-6 bg-[#0a0a0a] border border-zinc-900 rounded-[2.5rem] shadow-2xl flex flex-col h-full overflow-hidden">
                  <div className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em] border-b border-zinc-900 pb-3 flex items-center gap-2 shrink-0 mb-4">
                    <List className="w-3 h-3" /> Intel index
                  </div>
                  <div className="space-y-3 overflow-y-auto no-scrollbar pr-1 flex-1">
                    {puzzles.map((p, idx) => {
                      const isUnlocked = idx < currentStep;
                      const isActive = idx === currentStep;
                      return (
                        <div key={p.id} className={`p-4 rounded-xl border transition-all duration-500 flex items-center justify-between group ${isActive ? 'bg-amber-600/5 border-amber-600/30' : isUnlocked ? 'bg-emerald-600/5 border-emerald-600/20' : 'bg-zinc-950 border-zinc-900 opacity-80'}`}>
                           <div className="flex items-center gap-3">
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${isActive ? 'bg-amber-600 text-white' : isUnlocked ? 'bg-emerald-600/10 text-emerald-500' : 'bg-zinc-900 text-zinc-400'}`}>
                                 {isActive ? <Target className="w-3.5 h-3.5" /> : isUnlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                              </div>
                              <div className="space-y-0.5">
                                 <p className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-white' : isUnlocked ? 'text-emerald-500' : 'text-zinc-500'}`}>Fragment {p.id < 10 ? `0${p.id}` : p.id}</p>
                                 <p className="text-[6.5px] font-bold text-zinc-700 uppercase tracking-widest">{isUnlocked ? 'SYNCED' : isActive ? 'IN_PROGRESS' : 'ENCRYPTED'}</p>
                              </div>
                           </div>
                           <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-amber-500 animate-pulse' : isUnlocked ? 'bg-emerald-500' : 'bg-zinc-800'}`} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 h-full overflow-hidden">
                <div className={`h-full bg-[#080808] border-2 rounded-[3.5rem] overflow-hidden transition-all duration-700 flex flex-col ${flowState === 'ERROR' || flowState === 'BREACH' ? 'border-red-900/50' : (flowState === 'TRIAL' || flowState === 'TRIAL_PREP') ? 'border-amber-600/40' : flowState === 'SUCCESS' ? 'border-emerald-600/30' : 'border-zinc-900 shadow-2xl'}`}>
                  <div className="h-14 bg-zinc-950 border-b border-zinc-900 flex items-center px-8 justify-between shrink-0">
                     <div className="flex items-center gap-3">
                        <HeartPulse className={`w-3.5 h-3.5 ${bri > 50 ? 'text-emerald-500' : 'text-red-500'} animate-pulse`} />
                        <span className="text-[9px] font-mono text-zinc-600 font-bold uppercase tracking-widest italic">FRAGMENT_{puzzles[currentStep]?.id || 'DONE'} // BRI: {bri}%</span>
                     </div>
                  </div>

                  <div className={`flex-1 ${(flowState === 'TRIAL' || flowState === 'TRIAL_PREP') ? 'p-4 md:p-6' : 'p-8 md:p-12'} relative overflow-hidden flex flex-col ${(flowState === 'TRIAL' || flowState === 'TRIAL_PREP') ? 'justify-start' : 'justify-center'}`}>
                     {currentStep < puzzles.length ? (
                       <div className="h-full flex flex-col justify-center">
                        {flowState === 'QUESTION' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                              <div className="space-y-4">
                                  <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                                    <Search className="w-3.5 h-3.5" /> Intellectual Acquisition
                                  </div>
                                  <h3 className="text-xl md:text-2xl font-black text-zinc-100 italic uppercase tracking-tight leading-tight">{puzzles[currentStep].question}</h3>
                              </div>
                              <form onSubmit={handlePuzzleSubmit} className="space-y-6">
                                  <div className="space-y-2">
                                    <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">Input Fragment Key</label>
                                    <input autoFocus type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="ENTER_FRAGMENT_SECRET..." className="w-full bg-black border-2 border-zinc-900 rounded-2xl py-5 px-6 text-sm font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-600 transition-all uppercase" />
                                  </div>
                                  <button type="submit" className="px-10 py-4 bg-amber-600 text-white text-[9px] font-black uppercase tracking-[0.4em] rounded-xl hover:bg-amber-500 transition-all shadow-xl active:scale-95">AUTHENTICATE FRAGMENT</button>
                              </form>
                            </div>
                        )}

                        {flowState === 'TRIAL_PREP' && (
                          <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center justify-center h-full space-y-10 text-center">
                              <div className="space-y-3">
                                <div className="flex items-center justify-center gap-3">
                                  <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
                                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Ready for Assessment</span>
                                </div>
                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Memorize Target.</h3>
                              </div>

                              <div className="w-full max-w-md p-6 bg-[#0a0a0a] border-2 border-emerald-500/30 rounded-2xl space-y-3 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                                <div className="flex items-center justify-between">
                                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Authenticated Path Fragment</span>
                                  <Target className="w-3.5 h-3.5 text-emerald-500/50" />
                                </div>
                                <p className="font-mono text-base text-white break-all tracking-tighter leading-tight bg-black/60 p-4 rounded-xl border border-emerald-500/10 shadow-inner">
                                  {puzzles[currentStep].referenceAddr}
                                </p>
                              </div>

                              <div className="space-y-6 max-w-sm">
                                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                                  Identify the REAL destination. Saccadic response tracked. 5 second execution window.
                                </p>
                                <button 
                                  onClick={initiateTrial}
                                  className="px-12 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.5em] rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-2xl active:scale-95 flex items-center gap-3"
                                >
                                  <Zap size={14} className="fill-current" /> INITIATE_TRIAL
                                </button>
                              </div>
                          </div>
                        )}
                        
                        {flowState === 'TRIAL' && (
                          <div className="animate-in zoom-in duration-500 flex flex-col items-center h-full">
                              <div className="text-center space-y-1 mb-4 shrink-0">
                                <div className="flex items-center justify-center gap-3">
                                    <Skull className="w-3.5 h-3.5 text-red-500" />
                                    <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">Mimicry Trial Active</span>
                                </div>
                                <p className="text-zinc-500 text-[9px] italic font-medium max-w-sm mx-auto uppercase tracking-widest">Identify the REAL destination. Saccadic response tracked.</p>
                              </div>

                              <div className="w-full max-w-md p-4 bg-[#0a0a0a] border border-emerald-500/30 rounded-2xl space-y-2 mb-4 shrink-0 shadow-[0_0_40px_rgba(16,185,129,0.05)]">
                                <div className="flex items-center justify-between">
                                  <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Target Reference Address</span>
                                  <Target className="w-2.5 h-2.5 text-emerald-500/40" />
                                </div>
                                <p className="font-mono text-[10px] text-white break-all tracking-tighter leading-tight bg-black/50 p-2.5 rounded-lg border border-emerald-500/10 shadow-inner">{puzzles[currentStep].referenceAddr}</p>
                              </div>

                              <div className="relative w-12 h-12 flex items-center justify-center mb-4 shrink-0">
                                <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                                    <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="2.5" fill="transparent" className="text-zinc-900" />
                                    <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="2.5" fill="transparent" className="text-red-600 transition-all duration-75" strokeDasharray="131.9" strokeDashoffset={131.9 - (131.9 * (timeLeft / CHALLENGE_DURATION))} />
                                </svg>
                                <span className="text-sm font-black italic text-white tabular-nums">{timeLeft.toFixed(1)}s</span>
                              </div>

                              <div className="flex-1 min-h-0 w-full max-w-md bg-black/40 border border-zinc-900 rounded-[2rem] overflow-hidden flex flex-col shadow-inner">
                                <div className="p-3 border-b border-zinc-900 bg-zinc-950/50 flex justify-between items-center px-6 shrink-0">
                                   <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Select Authenticated Path</span>
                                   <div className="flex gap-1.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                                   </div>
                                </div>
                                <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                                  {trialOptions.map((opt, i) => (
                                    <button key={i} onClick={() => handleTrialSelection(opt)} className="group relative w-full p-4 bg-black border border-zinc-900 rounded-xl hover:border-blue-500 hover:bg-blue-600/5 active:scale-[0.98] transition-all duration-200 shadow-sm">
                                        <div className="font-mono text-[10px] text-zinc-600 group-hover:text-zinc-200 flex justify-between items-center tracking-tighter">
                                          <span>{opt.slice(0, 10)}<span className="opacity-20 mx-1">...</span>{opt.slice(-10)}</span>
                                          <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-blue-500" />
                                        </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                          </div>
                        )}

                        {flowState === 'BREACH' && (
                           <div className="flex flex-col items-center justify-center h-full space-y-8 animate-in zoom-in duration-500">
                              <ZapOff className="w-16 h-16 text-red-600 animate-pulse" />
                              <div className="text-center space-y-3">
                                 <h4 className="text-2xl font-black text-red-600 uppercase italic tracking-tighter">Biological Breach.</h4>
                                 <div className="px-3 py-1 bg-red-600/10 border border-red-600/30 rounded-lg inline-block">
                                    <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Resilience Impact: -10% BRI</span>
                                 </div>
                                 <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest leading-relaxed max-w-xs mx-auto">{errorMsg}</p>
                              </div>
                           </div>
                        )}

                        {flowState === 'SYNCING' && <div className="flex flex-col items-center justify-center h-full animate-pulse"><Loader2 className="w-12 h-12 text-amber-500 animate-spin" /><p className="text-[12px] font-black text-white uppercase tracking-[0.4em] mt-6">Committing Proof...</p></div>}
                        {flowState === 'SUCCESS' && <div className="flex flex-col items-center justify-center h-full animate-in zoom-in duration-500"><div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center"><CheckCircle2 className="w-10 h-10 text-emerald-500" /></div><p className="text-[12px] font-black text-emerald-500 uppercase tracking-[0.4em] mt-6">Integrity Maintained</p></div>}
                        {flowState === 'ERROR' && <div className="flex flex-col items-center justify-center h-full animate-in zoom-in duration-500"><ShieldX className="w-12 h-12 text-red-600" /><p className="text-[12px] font-black text-red-600 uppercase tracking-[0.4em] mt-6">Scan Failure</p><p className="text-[9px] text-zinc-500 uppercase tracking-widest mt-2">{errorMsg}</p></div>}
                       </div>
                     ) : (
                        <div className="text-center h-full flex flex-col justify-center space-y-8 animate-in zoom-in duration-1000">
                          <Trophy className="w-24 h-24 text-emerald-500 mx-auto" />
                          <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">Assessment <br/> Complete.</h2>
                          <div className="px-6 py-4 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-[0.4em] inline-block">FINAL BRI: {bri}% // RANK: {userRank}</div>
                        </div>
                     )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 h-full overflow-hidden">
                 <div className="p-6 bg-[#0a0a0a] border border-zinc-900 rounded-[2.5rem] shadow-2xl flex flex-col h-full overflow-hidden">
                    <div className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em] border-b border-zinc-900 pb-3 flex items-center gap-2 shrink-0 mb-4">
                      <History className="w-3 h-3" /> Intercept Log
                    </div>
                    <div className={`space-y-3 ${currentStep === puzzles.length ? 'overflow-y-auto' : 'overflow-hidden'} custom-scrollbar pr-1 flex-1`}>
                       {claimHistory.length === 0 ? (
                         <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-20">
                            <Database className="w-8 h-8" />
                            <p className="text-[7px] font-black uppercase tracking-widest">No verified intercepts</p>
                         </div>
                       ) : (
                         claimHistory.slice().reverse().map((claim, idx) => (
                             <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-1.5 group hover:border-emerald-500/30 transition-colors">
                                <div className="flex items-center justify-between">
                                   <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">Intercept #{claim.id}</span>
                                   <span className="text-[7px] font-mono text-zinc-700 uppercase">{claim.timestamp}</span>
                                </div>
                                <p className="text-[8px] font-mono text-zinc-600 truncate">{claim.receipt}</p>
                             </div>
                         ))
                       )}
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* BOTTOM STATUS BAR */}
          <div className="py-4 border-t border-zinc-900/50 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
            <div className="space-y-1 text-center md:text-left px-2">
              <div className="flex items-center justify-center md:justify-start gap-3">
                 <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Sentinel Roster: VIG-2026-X</div>
                 <div className="h-3 w-[1px] bg-zinc-800" />
                 <div className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Global Intercepts: 1.2M+</div>
              </div>
              <p className="text-[9px] text-zinc-700 font-bold uppercase tracking-widest italic">Live Global Intelligence synchronization established.</p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] border border-zinc-800 rounded-full mr-2">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.3em]">USER_IDENTITY_LOCKED</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};