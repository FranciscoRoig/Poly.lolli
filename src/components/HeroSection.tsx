import React from 'react';
import { BrandLogo } from './BrandLogo';
import { TranslationDictionary } from '../i18n/translations';
import { Sparkles, ArrowDown, ShieldCheck, HeartHandshake } from 'lucide-react';

interface HeroSectionProps {
  t: TranslationDictionary;
  onOpenWizard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ t, onOpenWizard }) => {
  return (
    <section
      id="enter-polylolli"
      className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-8 pb-16 overflow-hidden"
    >
      {/* Soft Glow Radial Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Trust Micro-Kicker */}
      <div className="relative inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-white/5 border border-white/10 text-xs text-pink-200/90 tracking-wide font-medium shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-twinkle" />
        <span>{t.hero.badge}</span>
      </div>

      {/* The Central Iconic Polylolli Mascot Logo (Section 74) */}
      <div className="relative mb-6 transform hover:scale-[1.02] transition-transform duration-500">
        <BrandLogo size="hero" glowColor="rgba(236, 72, 153, 0.45)" />
      </div>

      {/* Headline (Short, Confident, Human — Section 61 & 92) */}
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
          {t.hero.titleLine1}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-300 to-cyan-300">
            {t.hero.titleHighlight}
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal">
          {t.hero.subtitle}
        </p>
      </div>

      {/* Action Decision Block (Single Primary CTA + Explore Worlds) */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
        <button
          onClick={onOpenWizard}
          className="w-full sm:w-auto px-7 py-3.5 text-base font-bold text-white bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 rounded-xl hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5"
        >
          <Sparkles className="w-4 h-4 text-pink-200" />
          <span>{t.hero.planPartyBtn}</span>
        </button>

        <a
          href="#worlds"
          className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl transition-all duration-200 hover:text-white flex items-center justify-center gap-2"
        >
          <span>{t.hero.exploreWorldsBtn}</span>
          <ArrowDown className="w-4 h-4 text-pink-400" />
        </a>
      </div>

      {/* Real Parent Proof & Safety Badges (Adjacent to Value Claim - Section 1.H) */}
      <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400 font-medium">
        <div className="flex items-center gap-1.5 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Enhanced DBS Checked</span>
        </div>
        <span className="text-white/20 hidden sm:inline">·</span>
        <div className="flex items-center gap-1.5 text-slate-300">
          <HeartHandshake className="w-4 h-4 text-pink-400" />
          <span>£5,000,000 Public Liability</span>
        </div>
        <span className="text-white/20 hidden sm:inline">·</span>
        <div className="text-slate-300">
          <span className="text-amber-400 font-bold">4.9★</span> Rated by 340+ London & Herts Families
        </div>
      </div>
    </section>
  );
};
