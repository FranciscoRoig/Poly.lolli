import React from 'react';

export type WorldAtmosphere =
  | 'parties'
  | 'facePaint'
  | 'balloons'
  | 'inflatables'
  | 'babyEvents'
  | 'gallery'
  | 'wizard'
  | 'celebrationBirthday'
  | 'celebrationBaby'
  | 'celebrationSchool'
  | 'celebrationFamily';

interface AmbientBackgroundProps {
  atmosphere: WorldAtmosphere;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ atmosphere }) => {
  const palettes = {
    parties: {
      bg: 'from-slate-950 via-fuchsia-950/40 to-slate-950',
      glow1: 'rgba(236, 72, 153, 0.25)',
      glow2: 'rgba(168, 85, 247, 0.22)',
      beam: 'from-pink-500/10 via-purple-500/5 to-transparent',
    },
    celebrationBirthday: {
      bg: 'from-slate-950 via-fuchsia-950/50 to-slate-950',
      glow1: 'rgba(244, 63, 94, 0.32)',
      glow2: 'rgba(234, 179, 8, 0.25)',
      beam: 'from-pink-500/15 via-amber-400/10 to-transparent',
    },
    celebrationBaby: {
      bg: 'from-slate-950 via-rose-950/30 to-slate-950',
      glow1: 'rgba(251, 146, 60, 0.24)',
      glow2: 'rgba(244, 114, 182, 0.22)',
      beam: 'from-amber-200/15 via-rose-300/10 to-transparent',
    },
    celebrationSchool: {
      bg: 'from-slate-950 via-cyan-950/50 to-slate-950',
      glow1: 'rgba(6, 182, 212, 0.32)',
      glow2: 'rgba(59, 130, 246, 0.30)',
      beam: 'from-cyan-400/15 via-blue-500/10 to-transparent',
    },
    celebrationFamily: {
      bg: 'from-slate-950 via-purple-950/45 to-slate-950',
      glow1: 'rgba(168, 85, 247, 0.28)',
      glow2: 'rgba(250, 204, 21, 0.25)',
      beam: 'from-purple-500/15 via-amber-400/10 to-transparent',
    },
    facePaint: {
      bg: 'from-slate-950 via-cyan-950/40 to-slate-950',
      glow1: 'rgba(6, 182, 212, 0.26)',
      glow2: 'rgba(139, 92, 246, 0.22)',
      beam: 'from-cyan-500/10 via-indigo-500/5 to-transparent',
    },
    balloons: {
      bg: 'from-slate-950 via-sky-950/35 to-slate-950',
      glow1: 'rgba(244, 114, 182, 0.24)',
      glow2: 'rgba(250, 204, 21, 0.20)',
      beam: 'from-sky-400/10 via-amber-400/5 to-transparent',
    },
    inflatables: {
      bg: 'from-slate-950 via-blue-950/45 to-slate-950',
      glow1: 'rgba(59, 130, 246, 0.28)',
      glow2: 'rgba(236, 72, 153, 0.24)',
      beam: 'from-blue-600/15 via-pink-500/5 to-transparent',
    },
    babyEvents: {
      bg: 'from-slate-950 via-rose-950/25 to-slate-950',
      glow1: 'rgba(251, 146, 60, 0.18)',
      glow2: 'rgba(244, 114, 182, 0.16)',
      beam: 'from-orange-300/10 via-rose-200/5 to-transparent',
    },
    gallery: {
      bg: 'from-slate-950 via-zinc-900 to-slate-950',
      glow1: 'rgba(255, 255, 255, 0.08)',
      glow2: 'rgba(217, 70, 239, 0.12)',
      beam: 'from-white/5 via-zinc-500/5 to-transparent',
    },
    wizard: {
      bg: 'from-slate-950 via-purple-950/35 to-slate-950',
      glow1: 'rgba(236, 72, 153, 0.26)',
      glow2: 'rgba(6, 182, 212, 0.26)',
      beam: 'from-fuchsia-500/15 via-cyan-500/10 to-transparent',
    },
  }[atmosphere];

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-colors duration-1000 ease-out">
      <div className={`absolute inset-0 bg-gradient-to-b ${palettes.bg} transition-all duration-1000`} />
      <div className="absolute -top-[15%] left-[10%] w-[650px] h-[650px] rounded-full blur-[140px] transition-all duration-1000" style={{ backgroundColor: palettes.glow1 }} />
      <div className="absolute top-[35%] -right-[10%] w-[700px] h-[700px] rounded-full blur-[160px] transition-all duration-1000" style={{ backgroundColor: palettes.glow2 }} />
      <div className="absolute bottom-[5%] left-[25%] w-[550px] h-[550px] rounded-full blur-[140px] opacity-70 transition-all duration-1000" style={{ backgroundColor: palettes.glow1 }} />
      <div className={`absolute inset-0 bg-gradient-to-tr ${palettes.beam} opacity-60 transition-all duration-1000`} />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="absolute top-[8%] left-[6%] animate-float-slow opacity-35 blur-[1.5px]">
        <svg width="68" height="88" viewBox="0 0 68 88" fill="none">
          <ellipse cx="34" cy="38" rx="28" ry="34" fill="#f472b6" />
          <ellipse cx="26" cy="28" rx="8" ry="12" fill="white" opacity="0.35" />
          <path d="M34 72 Q36 78 33 86" stroke="#f472b6" strokeWidth="1.2" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute top-[48%] right-[8%] animate-float-slow opacity-30 blur-[2px]">
        <svg width="74" height="96" viewBox="0 0 74 96" fill="none">
          <ellipse cx="37" cy="42" rx="30" ry="38" fill="#38bdf8" />
          <ellipse cx="29" cy="30" rx="9" ry="13" fill="white" opacity="0.35" />
          <path d="M37 80 Q39 86 36 94" stroke="#38bdf8" strokeWidth="1.2" opacity="0.5" />
        </svg>
      </div>

      <div className="absolute top-[22%] right-[14%] animate-float-medium opacity-65">
        <svg width="84" height="110" viewBox="0 0 84 110" fill="none">
          <defs>
            <radialGradient id="balloonMidPink" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="65%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#9d174d" />
            </radialGradient>
          </defs>
          <ellipse cx="42" cy="48" rx="36" ry="44" fill="url(#balloonMidPink)" />
          <ellipse cx="30" cy="34" rx="10" ry="16" fill="white" opacity="0.4" />
          <polygon points="40,92 44,92 42,96" fill="#be185d" />
          <path d="M42 96 Q46 102 43 110" stroke="#f472b6" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="absolute top-[68%] left-[12%] animate-float-medium opacity-60">
        <svg width="80" height="104" viewBox="0 0 80 104" fill="none">
          <defs>
            <radialGradient id="balloonMidCyan" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#cffafe" />
              <stop offset="65%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0e7490" />
            </radialGradient>
          </defs>
          <ellipse cx="40" cy="45" rx="34" ry="41" fill="url(#balloonMidCyan)" />
          <ellipse cx="29" cy="32" rx="9" ry="14" fill="white" opacity="0.4" />
          <polygon points="38,86 42,86 40,90" fill="#0891b2" />
          <path d="M40 90 Q37 96 41 104" stroke="#67e8f9" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="absolute -bottom-8 right-[4%] animate-float-fast opacity-45 blur-[0.8px]">
        <svg width="120" height="150" viewBox="0 0 120 150" fill="none">
          <defs>
            <radialGradient id="balloonForeGold" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="65%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#854d0e" />
            </radialGradient>
          </defs>
          <ellipse cx="60" cy="65" rx="52" ry="60" fill="url(#balloonForeGold)" />
          <ellipse cx="45" cy="46" rx="14" ry="22" fill="white" opacity="0.45" />
          <path d="M60 125 Q64 135 61 148" stroke="#facc15" strokeWidth="2" />
        </svg>
      </div>

      <div className="absolute top-[18%] left-[28%] animate-twinkle">
        <span className="block w-1.5 h-1.5 rounded-full bg-pink-300 shadow-[0_0_8px_#f472b6]" />
      </div>
      <div className="absolute top-[34%] left-[72%] animate-twinkle" style={{ animationDelay: '1.4s' }}>
        <span className="block w-2 h-2 rounded-full bg-cyan-200 shadow-[0_0_10px_#67e8f9]" />
      </div>
      <div className="absolute top-[75%] right-[22%] animate-twinkle" style={{ animationDelay: '2.1s' }}>
        <span className="block w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_8px_#fde047]" />
      </div>
    </div>
  );
};
