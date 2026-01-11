
import React from 'react';
import { Check, X, Chrome, ShieldCheck, Zap, Lock, Info, Terminal, ShieldAlert, MoveHorizontal, Star, Shield, Briefcase, UserCheck } from 'lucide-react';
import { DocumentWatermark, SectionHeader, DocCard, TechLabel, TechNote } from './DocHelpers';

export const PricingContent = () => (
  <div className="space-y-0 pb-20 md:pb-40 max-w-6xl mx-auto selection:bg-emerald-500/20 relative">
    <DocumentWatermark text="VIGIL COMMERCIAL REGISTRY" />
    
    <SectionHeader 
      id="DOC: VIG-PRC-2026.01"
      category="Strategic Commercial Unit"
      title="Licensing Registry."
      subtitle="Security is a structural requirement, not an luxury."
      colorClass="text-emerald-500"
      bgGlow="bg-emerald-600/10"
    />

    <div className="mt-12 space-y-24 px-6 md:px-12 relative z-10">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* FREE */}
        <DocCard border="zinc">
          <div className="space-y-8 h-full flex flex-col">
            <div className="space-y-4">
              <TechLabel text="TIER 01" color="zinc" />
              <h4 className="text-2xl font-black text-white uppercase italic">Baseline</h4>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Free Forever</p>
            </div>
            <ul className="space-y-4 flex-1">
              {['Poison Detection', 'Manual Prompts', 'Local Sandbox', '24h Sync'].map(f => (
                <li key={f} className="flex items-center gap-3 text-[10px] font-black text-zinc-500 uppercase"><Check size={14} /> {f}</li>
              ))}
            </ul>
          </div>
        </DocCard>

        {/* SENTINEL */}
        <DocCard border="blue" glow>
          <div className="space-y-8 h-full flex flex-col">
            <div className="space-y-4">
              <TechLabel text="TIER 02" color="blue" />
              <h4 className="text-2xl font-black text-white uppercase italic">Sentinel</h4>
              <p className="text-blue-500 text-xs font-black uppercase tracking-widest">$50/yr · $15/qtr</p>
            </div>
            <ul className="space-y-4 flex-1">
              {['Character Diffing', '6hr Heuristic Sync', '2 Linked Nodes', 'Custom Safety Labels'].map(f => (
                <li key={f} className="flex items-center gap-3 text-[10px] font-black text-zinc-300 uppercase"><Check size={14} className="text-blue-500" /> {f}</li>
              ))}
            </ul>
          </div>
        </DocCard>

        {/* APEX */}
        <DocCard border="purple">
          <div className="space-y-8 h-full flex flex-col">
            <div className="space-y-4">
              <TechLabel text="TIER 03" color="purple" />
              <h4 className="text-2xl font-black text-white uppercase italic">Apex</h4>
              <p className="text-purple-500 text-xs font-black uppercase tracking-widest">$100/yr · $30/qtr</p>
            </div>
            <ul className="space-y-4 flex-1">
              {['Cluster Prediction', 'Forensic PDF Export', 'Custom RPC Support', 'Unlimited Nodes'].map(f => (
                <li key={f} className="flex items-center gap-3 text-[10px] font-black text-zinc-300 uppercase"><Check size={14} className="text-purple-500" /> {f}</li>
              ))}
            </ul>
          </div>
        </DocCard>
      </div>

      <div className="space-y-10">
        <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Technical Comparison Matrix</h3>
        <div className="bg-[#080808] border border-zinc-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-zinc-950 border-b border-zinc-900">
              <tr>
                <th className="p-8 text-[10px] font-black text-zinc-600 uppercase">Feature Vector</th>
                <th className="p-8 text-[10px] font-black text-zinc-600 uppercase">Baseline</th>
                <th className="p-8 text-[10px] font-black text-blue-500 uppercase">Sentinel</th>
                <th className="p-8 text-[10px] font-black text-purple-500 uppercase">Apex</th>
              </tr>
            </thead>
            <tbody className="text-zinc-400 text-[11px] font-bold uppercase tracking-widest">
              {[
                { f: "Verification Frequency", b: "Daily", s: "6 Hours", a: "Real-time" },
                { f: "Character Diffing", b: false, s: true, a: true },
                { f: "Device Sync Limit", b: "1", s: "2", a: "Unlimited" },
                { f: "Custom Safety Labels", b: false, s: true, a: true },
                { f: "Vanity Farm Detection", b: false, s: "Basic", a: "Predictive" },
                { f: "Forensic Reporting", b: false, s: false, a: "JSON / PDF" },
                { f: "RPC Tunneling", b: false, s: false, a: true }
              ].map((row, i) => (
                <tr key={i} className="border-b border-zinc-900/50">
                  <td className="p-8 border-r border-zinc-900/50">{row.f}</td>
                  <td className="p-8 border-r border-zinc-900/50">{row.b === false ? <X size={14} className="text-zinc-800" /> : row.b === true ? <Check size={14} className="text-zinc-600" /> : row.b}</td>
                  <td className="p-8 border-r border-zinc-900/50">{row.s === false ? <X size={14} className="text-zinc-800" /> : row.s === true ? <Check size={14} className="text-blue-500" /> : row.s}</td>
                  <td className="p-8 font-black text-white">{row.a === false ? <X size={14} className="text-zinc-800" /> : row.a === true ? <Check size={14} className="text-purple-500" /> : row.a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <DocCard border="blue">
           <h4 className="text-lg font-black text-white italic uppercase mb-4">Quarterly Provisions</h4>
           <p className="text-zinc-500 text-sm font-medium italic leading-relaxed">
             Quarterly billing cycles allow for tactical flexibility. Ideal for operators with cyclical market participation. License keys are issued for 90-day intervals.
           </p>
        </DocCard>
        <DocCard border="purple">
           <h4 className="text-lg font-black text-white italic uppercase mb-4">Institutional Nodes</h4>
           <p className="text-zinc-500 text-sm font-medium italic leading-relaxed">
             APEX nodes grant access to the VIGIL forensic suite. This is the only tier that supports white-labeled safety indicators for enterprise-level wallet deployments.
           </p>
        </DocCard>
      </div>

      <div className="pt-24 text-center space-y-8">
         <div className="h-[2px] w-32 bg-emerald-900/30 mx-auto" />
         <h3 className="text-3xl font-black text-white italic uppercase tracking-[0.3em]">End of Registry</h3>
         <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.6em]">Commercial Standard: VIG-PRC-2026-FINAL</p>
      </div>
    </div>
  </div>
);
