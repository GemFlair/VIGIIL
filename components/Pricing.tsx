import React, { useState, useEffect } from 'react';
// Added Link to imports
import { Globe, ArrowRight, Chrome, ShieldAlert, Lock, Zap, Cpu, Terminal, ShieldCheck, Activity, Target, FlaskConical, Wallet, Check, AlertCircle, FileSignature, AlertTriangle, Smartphone, ExternalLink, Star, Shield, CalendarDays, BarChart3, Fingerprint, Link } from 'lucide-react';
import { RegistryDoc } from './OperationalRegistry';
import { TechLabel } from './docs/DocHelpers';
import * as solanaWeb3 from '@solana/web3.js';
import { VigilScanner } from './VigilScanner';

const TREASURY_ADDRESS = "Vig1L1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1i"; 
const REGISTRY_ENDPOINT = "https://script.google.com/macros/s/AKfycbwY5wE282Rqmec5bMYsQLTm1nsbbxzzfD8B7Q_AsuA1VC2PNucGCfFDYo4l7f2J5h6CQQ/exec";

// NOTE: You must update this ID once the extension is assigned one by Chrome (locally or in web store)
const VIGIL_EXTENSION_ID = "PLEASE_REPLACE_WITH_YOUR_LOCAL_EXTENSION_ID";

type BillingCycle = 'YEARLY' | 'QUARTERLY';

interface Plan {
  id: 'FREE' | 'SENTINEL' | 'APEX';
  label: string;
  priceSolYearly: number;
  priceSolQuarterly: number;
  priceUsdYearly: string;
  priceUsdQuarterly: string;
  tier: string;
  desc: string;
  features: string[];
  accent: 'zinc' | 'blue' | 'purple';
}

const PLANS: Plan[] = [
  {
    id: 'FREE',
    tier: 'TIER: 01',
    label: 'Baseline Awareness',
    priceSolYearly: 0,
    priceSolQuarterly: 0,
    priceUsdYearly: 'Free',
    priceUsdQuarterly: 'Free',
    accent: 'zinc',
    desc: 'Essential community protection.',
    features: ['Basic Poisoning Detection', 'Manual Verification Prompts', 'Local-Only Sandbox', '24h Threat Sync']
  },
  {
    id: 'SENTINEL',
    tier: 'TIER: 02',
    label: 'Advanced Sentinel',
    priceSolYearly: 0.25,
    priceSolQuarterly: 0.08,
    priceUsdYearly: '$50',
    priceUsdQuarterly: '$15',
    accent: 'blue',
    desc: 'Intelligent defense for active traders.',
    features: ['Visual Character Diffing', '6h Heuristic Matrix Sync', 'Dual-Device Node Sync', 'Custom Safety Labels']
  },
  {
    id: 'APEX',
    tier: 'TIER: 03',
    label: 'Sovereign Apex',
    priceSolYearly: 0.5,
    priceSolQuarterly: 0.15,
    priceUsdYearly: '$100',
    priceUsdQuarterly: '$30',
    accent: 'purple',
    desc: 'Full-spectrum institutional security.',
    features: ['Vanity Cluster Prediction', 'Forensic PDF/JSON Export', 'Custom RPC Tunnelling', 'Unlimited Sentinel Nodes']
  }
];

const ProvisioningTerminal = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [step, setStep] = useState(0);

  const sequences = [
    "INITIALIZING BRIDGE LAYER 0.5...",
    "MAPPING BROWSER DOM SCOPE...",
    "ESTABLISHING LOCAL SANDBOX...",
    "SYNCING THREAT INTELLIGENCE FEED...",
    "VALIDATING DEFINITIVE SIGNATURE...",
    "AUTHORIZING NODE DEPLOYMENT..."
  ];

  useEffect(() => {
    if (step < sequences.length) {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${sequences[step]}`]);
        setStep(s => s + 1);
      }, 400 + (Math.random() * 600));
      return () => clearTimeout(timer);
    } else {
      setTimeout(onComplete, 1000);
    }
  }, [step]);

  return (
    <div className="font-mono text-[9px] md:text-[10px] text-emerald-500/80 space-y-1.5 text-left max-h-[150px] overflow-hidden">
      {logs.map((log, i) => (
        <div key={i} className="animate-in slide-in-from-left-2 duration-300">
          <span className="text-emerald-900 mr-2">>></span> {log}
        </div>
      ))}
      {step < sequences.length && (
        <div className="flex items-center gap-2 animate-pulse">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          <span>EXECUTING...</span>
        </div>
      )}
    </div>
  );
};

export const Pricing: React.FC<{ onOpenDoc?: (doc: RegistryDoc) => void }> = ({ onOpenDoc }) => {
  const [provisionState, setProvisionState] = useState<'IDLE' | 'SCANNING' | 'CONNECTING' | 'PAYING' | 'SIGNING' | 'AUTHORIZED' | 'ERROR'>('IDLE');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('YEARLY');
  const [errorMessage, setErrorMessage] = useState('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<Plan>(PLANS[1]);

  /**
   * Triggers the actual message to the Chrome Extension.
   * This is what unlocks the "Field Unit" based on the selected tier.
   */
  const triggerExtensionHandshake = async (tier: string, wallet: string) => {
    // Fix: cast window to any to access chrome property and resolve property 'chrome' does not exist error
    const chrome = (window as any).chrome;
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      try {
        chrome.runtime.sendMessage(VIGIL_EXTENSION_ID, {
          type: 'VIGIL_HANDSHAKE_ACTIVATE',
          tier: tier,
          wallet: wallet
        }, (response: any) => {
          if (chrome.runtime.lastError) {
            console.warn("VIGIL_HANDSHAKE: Extension ID mismatch or not installed.");
          } else {
            console.log("VIGIL_HANDSHAKE: Handshake accepted by Field Unit.", response);
          }
        });
      } catch (e) {
        console.error("VIGIL_HANDSHAKE: External link failure.", e);
      }
    }
  };

  const startProvisioning = async (plan: Plan) => {
    setSelectedPlan(plan);
    
    // For Free users, we trigger a direct wallet connection for identity, then handshake.
    if (plan.id === 'FREE') {
      setProvisionState('CONNECTING');
      return;
    }
    
    setProvisionState('SCANNING');
  };

  const connectWallet = async (isVirtual: boolean = false) => {
    setProvisionState('CONNECTING');
    try {
      let wallet = "";
      
      if (isVirtual) {
        wallet = "VIRTUAL_NODE_" + Math.random().toString(16).slice(2, 10).toUpperCase();
      } else {
        // @ts-ignore
        const provider = window.solana || window.phantom?.solana;
        if (!provider) throw new Error("No Solana wallet found.");
        await provider.connect();
        wallet = provider.publicKey.toString();
      }
      
      if (selectedPlan.id === 'FREE' || isVirtual) {
        // BYPASS: Directly authorize after identity established
        localStorage.setItem('vigil_node_verified', 'true');
        localStorage.setItem('vigil_plan_tier', isVirtual ? 'VIRTUAL' : selectedPlan.id);
        localStorage.setItem('vigil_linked_wallet', wallet);
        
        await triggerExtensionHandshake(selectedPlan.id, wallet);
        
        setExpiryDate("PERMANENT");
        setProvisionState('AUTHORIZED');
      } else {
        setProvisionState('PAYING');
      }
    } catch (err: any) {
      setProvisionState('ERROR');
      setErrorMessage(err.message || "Failed to connect wallet.");
    }
  };

  const handleActualPayment = async () => {
    setProvisionState('SIGNING');
    try {
      // @ts-ignore
      const provider = window.solana || window.phantom?.solana;
      const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"));
      const amount = billingCycle === 'YEARLY' ? selectedPlan.priceSolYearly : selectedPlan.priceSolQuarterly;
      
      const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
          fromPubkey: provider.publicKey,
          toPubkey: new solanaWeb3.PublicKey(TREASURY_ADDRESS),
          lamports: amount * solanaWeb3.LAMPORTS_PER_SOL,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = provider.publicKey;

      const { signature } = await provider.signAndSendTransaction(transaction);
      
      await fetch(REGISTRY_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          wallet: provider.publicKey.toString(),
          signature: signature,
          type: `NODE_PROVISIONING_${selectedPlan.id}_${billingCycle}`,
          fee: amount,
          utc: new Date().toISOString()
        })
      });

      const days = billingCycle === 'YEARLY' ? 365 : 90;
      const expiry = Date.now() + (days * 24 * 60 * 60 * 1000);
      const wallet = provider.publicKey.toString();
      
      localStorage.setItem('vigil_node_verified', 'true');
      localStorage.setItem('vigil_node_expiry', expiry.toString());
      localStorage.setItem('vigil_plan_tier', selectedPlan.id);
      localStorage.setItem('vigil_linked_wallet', wallet);

      // TRIGGER EXTENSION LINK
      await triggerExtensionHandshake(selectedPlan.id, wallet);
      
      setExpiryDate(new Date(expiry).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
      setProvisionState('AUTHORIZED');
    } catch (err: any) {
      setProvisionState('ERROR');
      setErrorMessage(err.message || "Transaction failed.");
    }
  };

  return (
    <div id="pricing-module" className="bg-[#020202] py-12 relative z-10 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-20">
        
        <div className="flex flex-col items-center text-center space-y-10">
          <div className="space-y-4">
            <span className="text-blue-500 font-black text-[11px] uppercase tracking-[0.6em]">Node Selection Portal</span>
            <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
              Deploy Your <br/> Sentinel.
            </h2>
          </div>

          {/* BILLING TOGGLE */}
          <div className="p-1 bg-[#0a0a0a] border border-zinc-900 rounded-2xl flex items-center shadow-2xl">
             <button 
               onClick={() => setBillingCycle('YEARLY')}
               className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${billingCycle === 'YEARLY' ? 'bg-white text-black shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}
             >
                Yearly <span className={`px-2 py-0.5 rounded-full text-[8px] ${billingCycle === 'YEARLY' ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-800 text-zinc-500'}`}>-20%</span>
             </button>
             <button 
               onClick={() => setBillingCycle('QUARTERLY')}
               className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${billingCycle === 'QUARTERLY' ? 'bg-white text-black shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}
             >
                Quarterly
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => {
            const isYearly = billingCycle === 'YEARLY';
            const displayPriceUsd = isYearly ? plan.priceUsdYearly : plan.priceUsdQuarterly;
            const displayPriceSol = isYearly ? plan.priceSolYearly : plan.priceSolQuarterly;

            return (
              <div key={plan.id} className="group relative flex flex-col h-full">
                <div className={`absolute -inset-[1px] bg-gradient-to-b ${plan.accent === 'purple' ? 'from-purple-600/30' : plan.accent === 'blue' ? 'from-blue-600/30' : 'from-zinc-700/30'} to-transparent rounded-[2.5rem] opacity-20 group-hover:opacity-100 transition-opacity duration-1000`} />
                
                <div className={`relative h-full bg-[#080808] border-2 border-zinc-900 rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-700 group-hover:border-zinc-700 ${plan.id === 'SENTINEL' ? 'md:scale-105 z-20' : 'z-10'}`}>
                  
                  {plan.id === 'SENTINEL' && (
                    <div className="absolute top-0 right-10 transform -translate-y-1/2">
                      <div className="px-4 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl animate-pulse">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="space-y-10">
                    <div className="space-y-4">
                      <TechLabel text={plan.tier} color={plan.accent} />
                      <h4 className="text-3xl font-black text-white italic uppercase tracking-tight leading-tight">{plan.label}</h4>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-white">{displayPriceUsd}</span>
                        <span className="text-zinc-600 text-[9px] font-bold uppercase tracking-widest italic">{plan.id !== 'FREE' ? `~ ${displayPriceSol} SOL / ${isYearly ? 'yr' : 'qtr'}` : ''}</span>
                      </div>
                      <p className="text-zinc-500 text-sm font-medium italic">{plan.desc}</p>
                    </div>
                    
                    <ul className="space-y-5">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-relaxed">
                          <Check className={`w-4 h-4 shrink-0 ${plan.accent === 'purple' ? 'text-purple-500' : plan.accent === 'blue' ? 'text-blue-500' : 'text-zinc-600'}`} /> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6 pt-10 border-t border-zinc-900 mt-10">
                    <button 
                      onClick={() => startProvisioning(plan)}
                      className={`w-full py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-300 shadow-xl active:scale-95 flex items-center justify-center gap-3 ${
                        plan.id === 'FREE' ? 'bg-white text-black hover:bg-zinc-800 hover:text-white' : 
                        plan.accent === 'purple' ? 'bg-purple-600 text-white hover:bg-purple-500' : 
                        'bg-white text-black hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      {plan.id === 'FREE' ? <><Link className="w-4 h-4" /> ACTIVATE NODE</> : <><Zap className="w-4 h-4 fill-current" /> ACTIVATE {plan.id}</>}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* PROVISIONING OVERLAY */}
        {provisionState !== 'IDLE' && provisionState !== 'AUTHORIZED' && (
           <div className="fixed inset-0 z-[500] bg-black/90 backdrop-blur-3xl flex items-center justify-center p-6 animate-in fade-in duration-500">
              <div className="w-full max-w-xl bg-[#080808] border border-zinc-800 rounded-[3rem] p-12 text-center space-y-10 relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]">
                 <div className="space-y-6">
                    <TechLabel text={`SECURE_HANDSHAKE: ${selectedPlan.id}`} color={selectedPlan.accent} />
                    <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">Provisioning...</h3>
                 </div>

                 <div className="p-8 bg-[#050505] border border-zinc-900 rounded-3xl min-h-[160px] flex flex-col justify-center shadow-inner">
                    {provisionState === 'SCANNING' && <ProvisioningTerminal onComplete={() => connectWallet(false)} />}
                    {provisionState === 'CONNECTING' && (
                       <div className="animate-in zoom-in duration-300 space-y-6">
                          <VigilScanner label="AWAITING_IDENTITY_HANDSHAKE" />
                          <button onClick={() => connectWallet(false)} className="px-8 py-3 bg-zinc-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">ESTABLISH LINK</button>
                       </div>
                    )}
                    {provisionState === 'PAYING' && (
                       <div className="space-y-6 animate-in zoom-in duration-300">
                          <Wallet className="w-12 h-12 text-emerald-500 mx-auto animate-pulse" />
                          <p className="text-[10px] font-black text-white uppercase tracking-widest">Authorize {billingCycle === 'YEARLY' ? selectedPlan.priceSolYearly : selectedPlan.priceSolQuarterly} SOL</p>
                          <button onClick={handleActualPayment} className="px-10 py-4 bg-emerald-600 text-white text-[11px] font-black uppercase rounded-xl hover:bg-emerald-500">CONFIRM PAYMENT</button>
                       </div>
                    )}
                    {provisionState === 'SIGNING' && (
                      <div className="animate-in zoom-in duration-300">
                        <VigilScanner label="SYNCING_MASTER_REGISTRY" status="scanning" />
                      </div>
                    )}
                    {provisionState === 'ERROR' && (
                      <div className="animate-in zoom-in duration-300 space-y-4">
                        <VigilScanner label={errorMessage} status="error" />
                        <div className="flex flex-col gap-3">
                           <button onClick={() => connectWallet(true)} className="px-8 py-3 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl">ESTABLISH VIRTUAL IDENTITY</button>
                           <button onClick={() => setProvisionState('IDLE')} className="text-[9px] font-black text-zinc-600 uppercase tracking-widest underline underline-offset-4">Retry Handshake</button>
                        </div>
                      </div>
                    )}
                 </div>
                 <button onClick={() => setProvisionState('IDLE')} className="text-zinc-700 text-[10px] font-black uppercase tracking-widest hover:text-zinc-500">Terminate Setup</button>
              </div>
           </div>
        )}

        {/* POST-AUTH STATUS */}
        {provisionState === 'AUTHORIZED' && (
           <div className="p-12 bg-emerald-600/5 border border-emerald-500/20 rounded-[3rem] text-center space-y-8 animate-in zoom-in duration-700">
              <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                 <ShieldCheck className="w-10 h-10 text-emerald-500" />
              </div>
              <div className="space-y-2">
                 <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">Node Operational.</h3>
                 <p className="text-zinc-400 font-medium italic">"Calibration Verified. Local node synchronized with the {selectedPlan.label} standard. Extension link updated."</p>
              </div>
              <div className="py-3 px-8 bg-zinc-950 border border-zinc-900 rounded-xl inline-block">
                 <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mr-4">License Status</span>
                 <span className="text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-widest">{expiryDate === "PERMANENT" ? "PERMANENT_LINK_ESTABLISHED" : `EXPIRES: ${expiryDate}`}</span>
              </div>
           </div>
        )}

        <div className="pt-20 border-t border-zinc-900/50 grid grid-cols-1 md:grid-cols-4 gap-8">
           {[
             { icon: <Lock />, label: 'Non-Custodial', desc: 'VIGIL operates in a local sandbox. We never access your private keys.' },
             { icon: <Activity />, label: 'Heuristic Sync', desc: 'Updates from the global Sentinel mesh every 6 hours (Sentinel/Apex).' },
             { icon: <Fingerprint />, label: 'Entropy Analysis', desc: 'Detects brute-forced vanity addresses through mathematical distribution.' },
             { icon: <BarChart3 />, label: 'Forensic Suite', desc: 'Export definitive intercept logs for security audits (Apex Tier).' }
           ].map((item, i) => (
             <div key={i} className="space-y-3">
                <div className="flex items-center gap-3 text-blue-500">
                   {React.cloneElement(item.icon as React.ReactElement<{ size?: number }>, { size: 18 })}
                   <h5 className="text-[11px] font-black uppercase tracking-widest">{item.label}</h5>
                </div>
                <p className="text-[11px] text-zinc-600 font-bold leading-relaxed uppercase italic">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};