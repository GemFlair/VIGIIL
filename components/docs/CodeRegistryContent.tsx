
import React from 'react';
import { Terminal, Lock, Cpu } from 'lucide-react';
import { DocCard, TechLabel, TechNote } from './DocHelpers';

export const CodeRegistryContent: React.FC = () => {
  const codeSnippet = `/**
 * Address Validator - PRD Section 10.A (Locked)
 * Validates Solana addresses: Base58, length 43-44
 */

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

export function isValidSolanaAddress(address) {
  if (!address || typeof address !== 'string') {
    return false;
  }

  if (address.length < 43 || address.length > 44) {
    return false;
  }

  for (let i = 0; i < address.length; i++) {
    if (!BASE58_ALPHABET.includes(address[i])) {
      return false;
    }
  }

  return true;
}

export function extractAddresses(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const addressRegex = /[1-9A-HJ-NP-Za-km-z]{43,44}/g;
  const matches = text.match(addressRegex) || [];
  
  return matches.filter(addr => isValidSolanaAddress(addr));
}`;

  return (
    <div className="space-y-12 pb-40 max-w-6xl mx-auto selection:bg-blue-500/20 relative">
      <header className="space-y-6">
        <div className="flex items-center gap-4">
          <TechLabel text="REGISTRY_SECTION: 10.A" color="emerald" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-950 border border-zinc-900 rounded-lg">
             <Lock className="w-3 h-3 text-zinc-700" />
             <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">STATE: LOCKED</span>
          </div>
        </div>
        <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
          Address <br/> Validator.
        </h2>
        <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed max-w-3xl italic">
          "Core utility for Solana address validation, extraction, and normalization. Engineered for the Field Unit Layer."
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-6">
          <DocCard border="zinc">
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
                <Cpu className="w-4 h-4 text-emerald-500" />
                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Module Specs</h4>
              </div>
              <ul className="space-y-4">
                 {[
                   { l: "ALPHABET", v: "Base58 (Custom)" },
                   { l: "LENGTH", v: "43-44 Chars" },
                   { l: "SCOPE", v: "Field Unit (Ext)" },
                   { l: "TARGET", v: "Solana Mainnet" }
                 ].map((item, i) => (
                   <li key={i} className="flex justify-between items-center">
                     <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{item.l}</span>
                     <span className="text-[10px] font-mono text-zinc-300 font-bold">{item.v}</span>
                   </li>
                 ))}
              </ul>
            </div>
          </DocCard>
          
          <TechNote title="INTEGRITY CHECK">
            PRD Section 10.A represents the definitive standard for address interception within the VIGIL ecosystem.
          </TechNote>
        </div>

        <div className="lg:col-span-8">
          <div className="relative group">
            <div className="absolute -inset-[1px] bg-gradient-to-b from-zinc-700 to-transparent rounded-3xl opacity-20" />
            <div className="relative bg-[#080808] border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
              <div className="h-12 bg-zinc-950 border-b border-zinc-900 flex items-center px-6 justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">validator.ts // 10.A</span>
                </div>
                <div className="flex gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-zinc-900" />
                   <div className="w-2 h-2 rounded-full bg-zinc-900" />
                   <div className="w-2 h-2 rounded-full bg-zinc-900" />
                </div>
              </div>
              <div className="p-8 md:p-10 overflow-x-auto no-scrollbar">
                <pre className="font-mono text-[11px] md:text-[13px] leading-relaxed text-zinc-400">
                  <code>{codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
