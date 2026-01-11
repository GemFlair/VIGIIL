import React from 'react';
import { LegalLayout } from './LegalLayout';

export const Privacy: React.FC = () => (
  <LegalLayout>
    <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">Privacy Protocol</h1>
    <p className="text-lg leading-relaxed">VIGIL prioritizes zero-knowledge localized processing. We never store your wallet addresses or transaction history on external servers.</p>
  </LegalLayout>
);
