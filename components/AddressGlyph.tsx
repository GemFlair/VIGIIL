
import React, { useMemo } from 'react';

interface AddressGlyphProps {
  address: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AddressGlyph: React.FC<AddressGlyphProps> = ({ address, size = 'md', className = '' }) => {
  const glyphData = useMemo(() => {
    if (!address) return null;
    
    // Simple hash from address string
    let hash = 0;
    for (let i = 0; i < address.length; i++) {
      hash = ((hash << 5) - hash) + address.charCodeAt(i);
      hash |= 0; 
    }
    
    const absHash = Math.abs(hash);
    const colors = [
      'from-blue-500 to-cyan-400',
      'from-emerald-500 to-teal-400',
      'from-purple-600 to-pink-500',
      'from-amber-500 to-orange-400',
      'from-red-600 to-rose-500',
      'from-indigo-600 to-blue-400'
    ];
    
    const shapes = [
      'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', // Pentagon
      'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',           // Diamond
      'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', // Hexagon
      'circle(50% at 50% 50%)',                                // Circle
      'inset(10% 10% 10% 10% round 20%)',                      // Rounded Square
      'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' // Star
    ];

    return {
      color: colors[absHash % colors.length],
      shape: shapes[(absHash >> 2) % shapes.length],
      rotation: (absHash % 4) * 90
    };
  }, [address]);

  if (!glyphData) return null;

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div 
      className={`${sizeClasses[size]} ${className} relative shrink-0 group/glyph`}
      title={`Visual Identity Glyph for ${address.slice(0, 4)}...`}
    >
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${glyphData.color} opacity-20 blur-md rounded-full group-hover/glyph:opacity-40 transition-opacity`} 
      />
      <div 
        className={`w-full h-full bg-gradient-to-br ${glyphData.color} shadow-lg relative z-10`}
        style={{ 
          clipPath: glyphData.shape,
          transform: `rotate(${glyphData.rotation}deg)`
        }}
      />
    </div>
  );
};
