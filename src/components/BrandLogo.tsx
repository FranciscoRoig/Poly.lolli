import React, { useState } from 'react';

interface BrandLogoProps {
  size?: 'hero' | 'large' | 'medium' | 'small';
  showText?: boolean;
  className?: string;
  glowColor?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'medium',
  showText = true,
  className = '',
  glowColor = 'rgba(236, 72, 153, 0.45)',
}) => {
  const [imgError, setImgError] = useState(false);

  const dimensions = {
    hero: { width: 340, height: 340, textSize: 'text-3xl md:text-5xl', subSize: 'text-xs md:text-sm' },
    large: { width: 220, height: 220, textSize: 'text-2xl', subSize: 'text-xs' },
    medium: { width: 110, height: 110, textSize: 'text-xl', subSize: 'text-[10px]' },
    small: { width: 48, height: 48, textSize: 'text-base', subSize: 'text-[9px]' },
  }[size];

  // Official logo image uploaded by the user - preserved exactly as requested
  const logoSrc = imgError
    ? '/polylolli-official-logo.svg'
    : '/ChatGPT Image Aug 2, 2025, 05_28_10 PM.png';

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      {/* Visual Logo Center with Dynamic Glow & Floating Depth */}
      <div
        className="relative flex items-center justify-center transition-all duration-700 ease-out"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        {/* Soft Radial Ambient Glow */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-75 transition-colors duration-700 pointer-events-none"
          style={{ background: glowColor }}
        />

        {/* Outer Luminous Ring */}
        <div className="absolute inset-2 rounded-full border border-pink-400/30 shadow-[0_0_35px_rgba(244,114,182,0.3)] pointer-events-none" />

        {/* The Official Polylolli Character Logo Image (Unmodified, Exact Asset) */}
        <img
          src={logoSrc}
          alt="Polylolli Art & Lik Official Character"
          className="w-full h-full object-contain relative z-10 drop-shadow-[0_16px_32px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:scale-[1.03]"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
        />
      </div>

      {/* Brand Typography Sub-label if needed */}
      {showText && size !== 'hero' && (
        <div className="text-center mt-2 tracking-tight">
          <div className={`font-display font-black text-white tracking-wide ${dimensions.textSize}`}>
            POLY<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-300">LOLLI</span>
          </div>
          <div
            className={`font-semibold tracking-[0.25em] text-amber-300/90 uppercase font-sans ${dimensions.subSize}`}
          >
            ART & LIK
          </div>
        </div>
      )}
    </div>
  );
};
