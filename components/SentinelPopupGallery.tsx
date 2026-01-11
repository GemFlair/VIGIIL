import React, { useState } from 'react';
import { 
  Skull, Radar, Radio, Fingerprint, Scale, 
  ShieldX, Zap, Eye, Clock, Activity, 
  AlertTriangle, ShieldAlert, CheckCircle2,
  Terminal, Info, MousePointer2, AlertOctagon,
  Search, Shield, FileText, Clipboard, ExternalLink, ShieldCheck
} from 'lucide-react';

interface PopupProps {
  title: string;
  explanation: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
  animation: string;
  primaryCta: string;
  secondaryCta: string;
  telemetry: {
    age: string;
    lastTx: string;
    activity15d: string;
  };
}

const AlertPopup: React.FC<PopupProps> = ({ title, explanation, icon, color, glow, animation, telemetry, primaryCta, secondaryCta }) => (
  <div className={`relative w-full max-w-md bg-[#0a0a0a]/80 backdrop-blur-[24px] border-2 border-white/10 rounded-[2rem] p-8 overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20 group`}>
    {/* Ambient Glow */}
    <div className={`absolute -top-24 -right-24 w-64 h-64 ${glow} blur-[80px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity`} />
    
    {/* Animation Layer */}
    <div className={`absolute inset-0 pointer-events-none ${animation}`} />

    <div className="relative z-10 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-white/5 pb-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-lg ${color}`}>
          {icon}
        </div>
        <div className="space-y-1">
          <h3 className={`text-lg font-black italic uppercase tracking-tighter ${color.split(' ')[0]}`}>{title}</h3>
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${color.split(' ')[0]}`} />
            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Active_Interception_Layer</span>
          </div>
        </div>
      </div>

      {/* Structured Logic / Explanation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest italic">Interception Logic</span>
        </div>
        <div className="space-y-4 text-zinc-400 text-sm leading-relaxed font-medium whitespace-pre-line">
          {explanation.split('\n').map((line, i) => (
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

      {/* Telemetry Block */}
      <div className="p-5 bg-black/40 border border-white/5 rounded-2xl space-y-4 shadow-inner">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-3 h-3 text-blue-500" />
          <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Subject Telemetry</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest block">Address Age</span>
            <span className="text-[11px] font-mono font-bold text-zinc-200">{telemetry.age}</span>
          </div>
          <div className="space-y-1 border-x border-white/5 px-4">
            <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest block">Last Time</span>
            <span className="text-[11px] font-mono font-bold text-zinc-200">{telemetry.lastTx}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest block">15D Tx</span>
            <span className="text-[11px] font-mono font-bold text-zinc-200">{telemetry.activity15d}</span>
          </div>
        </div>
      </div>

      {/* Dual Action Matrix */}
      <div className="space-y-3">
        <button className={`w-full py-4 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center justify-center gap-3 transition-all ${color.split(' ')[0]}`}>
           <ShieldCheck size={14} />
           <span className="text-[10px] font-black uppercase tracking-widest">{primaryCta}</span>
        </button>
        <button className="w-full py-3 bg-transparent border border-zinc-900/50 rounded-xl flex items-center justify-center gap-2 opacity-90 hover:opacity-100 transition-all">
           <AlertTriangle size={12} className="text-zinc-400" />
           <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{secondaryCta}</span>
        </button>
      </div>

      {/* Legal Safeguard */}
      <div className="pt-4 border-t border-white/5">
        <p className="text-[7.5px] font-black text-zinc-700 uppercase tracking-[0.2em] leading-relaxed text-center italic">
          VIGIL ADVISORY: SECURITY IS PROBABILISTIC. WE DO NOT SIGN TRANSACTIONS. OPERATOR ASSUMES ALL RISK.
        </p>
      </div>
    </div>
  </div>
);

export const SentinelPopupGallery: React.FC = () => {
  const alerts = [
    {
      title: "🚨 Possible Address Poisoning",
      explanation: "DEFINITION: Critical detection of vanity mimics designed to exploit the human eye's 8-character verification gap.\nEXAMPLE: An attacker sees you frequently send to Ab1C...Zz90 and generates a fake address Ab1C...Hacker...Zz90. You almost click it because the start and end look identical.",
      icon: <Skull className="w-6 h-6" />,
      color: "text-red-500 border-red-500/40 bg-red-500/10",
      glow: "bg-red-600",
      animation: "animate-scan-vertical",
      primaryCta: "HALT: ADDRESS POISONING DETECTED",
      secondaryCta: "OVERRIDE: PROCEED WITH RISK",
      telemetry: { age: "2,401 Days", lastTx: "14m ago", activity15d: "402" }
    },
    {
      title: "📡 Phishing Shield Active",
      explanation: "DEFINITION: Interception triggered by high-risk source contexts such as social DMs or unverified dApp portals.\nEXAMPLE: You copy a 'Treasury Address' from a Telegram DM or a random X (Twitter) comment; VIGIL flags the source as a high-risk entry point.",
      icon: <Radar className="w-6 h-6" />,
      color: "text-purple-500 border-purple-500/40 bg-purple-500/10",
      glow: "bg-purple-600",
      animation: "animate-sonar-ripple",
      primaryCta: "TERMINAL ABORT: SOURCE UNTRUSTED",
      secondaryCta: "IGNORE SHIELD: TRUST MANUALLY",
      telemetry: { age: "3 Days", lastTx: "Never", activity15d: "1" }
    },
    {
      title: "☢️ Dust Transfer Detected",
      explanation: "DEFINITION: Identification of unsolicited transfers used to pollute transaction logs with malicious destination history.\nEXAMPLE: A bot sends 0.000001 SOL to your wallet so that their malicious address appears at the top of your 'Recent Transactions' list.",
      icon: <AlertOctagon className="w-6 h-6 text-amber-500" />,
      color: "text-amber-500 border-amber-500/40 bg-amber-500/10",
      glow: "bg-amber-600",
      animation: "animate-float-dust",
      primaryCta: "DISCARD INJECTED DATA",
      secondaryCta: "PROCEED: DUST VERIFIED",
      telemetry: { age: "42 Days", lastTx: "14d ago", activity15d: "1" }
    },
    {
      title: "👤 Report: New Address",
      explanation: "DEFINITION: Forensic alert for addresses with no prior interaction history or established on-chain reputation.\nEXAMPLE: You try to send funds to a wallet address that was created only 10 minutes ago and has zero previous transactions; VIGIL warns you of the 'Zero-History' risk.",
      icon: <Fingerprint className="w-6 h-6" />,
      color: "text-cyan-500 border-cyan-500/40 bg-cyan-500/10",
      glow: "bg-cyan-600",
      animation: "animate-breathe",
      primaryCta: "INITIATE FORENSIC VERIFICATION",
      secondaryCta: "CONTINUE TO EXECUTION",
      telemetry: { age: "1 Day", lastTx: "New", activity15d: "0" }
    },
    {
      title: "⚖️ Report: Similarity Notice",
      explanation: "DEFINITION: Analysis of non-random character clusters that signal a computationally generated vanity attack.\nEXAMPLE: VIGIL detects that an address has been mathematically forced to start with 'DEFI...' or 'CEX...'—a common sign of a computer-generated scam wallet.",
      icon: <Scale className="w-6 h-6" />,
      color: "text-yellow-500 border-yellow-500/40 bg-yellow-500/10",
      glow: "bg-yellow-600",
      animation: "animate-shimmer",
      primaryCta: "COMPARE CHARACTER NODES",
      secondaryCta: "INTENT MATCHES: CONTINUE",
      telemetry: { age: "891 Days", lastTx: "2h ago", activity15d: "82" }
    },
    {
      title: "❌ Mint Address Mismatch",
      explanation: "DEFINITION: Shielding against counterfeit assets that impersonate legitimate tokens via registry verification failure.\nEXAMPLE: You are buying 'USDC' on a dApp, but VIGIL detects the token's contract address is not the official Circle mint; it's a fake asset.",
      icon: <ShieldX className="w-6 h-6" />,
      color: "text-red-700 border-red-900/60 bg-red-900/20",
      glow: "bg-red-800",
      animation: "animate-strobe",
      primaryCta: "BLOCK COUNTERFEIT ASSET",
      secondaryCta: "IGNORE REGISTRY: EXECUTE",
      telemetry: { age: "12 Days", lastTx: "3h ago", activity15d: "1,209" }
    },
    {
      title: "⚡ Clipboard Swap Intercepted",
      explanation: "DEFINITION: Real-time neutralization of malicious background scripts attempting to swap address data during transfer.\nEXAMPLE: You copy a valid address, but a hidden piece of malware instantly swaps it for the hacker's address the moment you press 'Paste'.",
      icon: <Zap className="w-6 h-6" />,
      color: "text-emerald-500 border-emerald-500/40 bg-emerald-500/10",
      glow: "bg-emerald-600",
      animation: "animate-glitch",
      primaryCta: "REVIEW ORIGINAL INTENT",
      secondaryCta: "TRUST RESTORED PAYLOAD",
      telemetry: { age: "1,102 Days", lastTx: "12m ago", activity15d: "55" }
    },
    {
      title: "👁️ Visual Spoof Detected",
      explanation: "DEFINITION: Detection of deceptive Unicode homographs and character substitutions designed to simulate authentic destinations.\nEXAMPLE: A scammer uses a Greek 'ο' instead of a Latin 'o' in an address string; to your eye they look identical.",
      icon: <Eye className="w-6 h-6" />,
      color: "text-pink-500 border-pink-500/40 bg-pink-500/10",
      glow: "bg-pink-600",
      animation: "animate-magnify",
      primaryCta: "NEUTRALIZE DECEPTION",
      secondaryCta: "BYPASS BIOLOGICAL SHIELD",
      telemetry: { age: "5 Days", lastTx: "Never", activity15d: "2" }
    },
    {
      title: "✅ Trusted Destination",
      explanation: "DEFINITION: Verification of intent against an established safe node within your local historical trust graph.\nEXAMPLE: You are sending SOL to your hardware wallet address that you have used successfully 20 times this year; VIGIL confirms this 'Safe Node.'",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "text-emerald-500 border-emerald-500/40 bg-emerald-500/10",
      glow: "bg-emerald-600",
      animation: "",
      primaryCta: "RETURN TO SOURCE",
      secondaryCta: "SETTLE INTENT: CONFIRM",
      telemetry: { age: "502 Days", lastTx: "1h ago", activity15d: "12" }
    }
  ];

  return (
    <div className="w-full space-y-20 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {alerts.map((alert, idx) => (
          <AlertPopup key={idx} {...alert} />
        ))}
      </div>
      
      <style>{`
        @keyframes scan-vertical {
          0% { top: -100%; }
          100% { top: 100%; }
        }
        .animate-scan-vertical::after {
          content: "";
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: rgba(239, 68, 68, 0.4);
          box-shadow: 0 0 15px #ef4444;
          animation: scan-vertical 3s linear infinite;
        }
        @keyframes sonar {
          0% { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }
        .animate-sonar-ripple::after {
          content: "";
          position: absolute;
          top: 50%; left: 50%;
          width: 200px; height: 200px;
          margin-top: -100px; margin-left: -100px;
          border: 1px solid rgba(168, 85, 247, 0.4);
          border-radius: 50%;
          animation: sonar 2s linear infinite;
        }
        @keyframes strobe {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        .animate-strobe { animation: strobe 0.5s step-end infinite; opacity: 0.05; background: rgba(185, 28, 28, 0.2); }
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, 10px); }
        }
        .animate-float-dust::after {
          content: "· . · .";
          position: absolute;
          font-size: 20px;
          color: rgba(245, 158, 11, 0.1);
          animation: drift 5s infinite linear;
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        .animate-glitch { animation: glitch 0.2s infinite; opacity: 0.02; background: white; }
      `}</style>
    </div>
  );
};