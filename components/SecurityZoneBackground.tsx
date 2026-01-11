import React, { useState, useEffect } from 'react';

export const SecurityZoneBackground = ({ activeAnchor, powerSave }: { activeAnchor: string; powerSave: boolean }) => {
  const [color, setColor] = useState('rgba(59, 130, 246, 0)');

  useEffect(() => {
    if (powerSave) {
      setColor('rgba(0,0,0,0)');
      return;
    }
    if (['hub-execution', 'system-simulation', 'mimicry-lab'].some(id => activeAnchor.startsWith(id))) {
      setColor('rgba(6, 182, 212, 0.04)');
    } 
    else if (['hub-forge', 'intel-forge', 'reputation-search', 'sentinel-deck'].some(id => activeAnchor.startsWith(id))) {
      setColor('rgba(245, 158, 11, 0.04)');
    }
    else if (['hub-biological', 'neural-firewall', 'neural-audit'].some(id => activeAnchor.startsWith(id))) {
      setColor('rgba(168, 85, 247, 0.04)');
    }
    else if (['hub-apex', 'entropy-collider', 'neural-audit'].some(id => activeAnchor.startsWith(id))) {
      setColor('rgba(251, 191, 36, 0.05)');
    }
    else if (['hub-field', 'field-unit'].some(id => activeAnchor.startsWith(id))) {
      setColor('rgba(16, 185, 129, 0.04)');
    }
    else {
      setColor('rgba(59, 130, 246, 0)');
    }
  }, [activeAnchor, powerSave]);

  if (powerSave) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 transition-colors duration-1000 ease-in-out overflow-hidden">
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out" 
        style={{ background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)` }} 
      />
      <div className="absolute inset-0 bg-[#020202] opacity-40 mix-blend-multiply" />
    </div>
  );
};