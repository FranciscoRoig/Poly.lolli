import React from 'react';
import { Language, TranslationDictionary } from '../i18n/translations';
import { Sparkles, Calendar, Database, Phone, MessageCircle, Instagram, Facebook, MapPin } from 'lucide-react';

interface HeaderNavProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  t: TranslationDictionary;
  onOpenPortal: () => void;
  onOpenKerniva: () => void;
  onOpenWizard: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  lang,
  onLanguageChange,
  t,
  onOpenPortal,
  onOpenKerniva,
  onOpenWizard,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/90 border-b border-white/10 transition-colors">
      <div className="bg-gradient-to-r from-pink-950/80 via-purple-950/80 to-slate-950 border-b border-pink-500/20 text-[11px] text-slate-300 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-pink-200">
            <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
            <span className="font-medium truncate">
              {lang === 'es'
                ? 'Brixton · Zonas Latinas de Londres · Gran Londres · Watford · Hertfordshire'
                : 'Brixton · Latin London Hubs · Greater London · Watford · Hertfordshire'}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0 font-medium">
            <a
              href="tel:07938601802"
              className="flex items-center gap-1 hover:text-white transition-colors text-slate-200"
              title="Call Polylolli Art & Lik"
            >
              <Phone className="w-3 h-3 text-cyan-400" />
              <span>07938601802</span>
            </a>

            <span className="text-white/20">|</span>

            <a
              href="https://wa.me/447938601802"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-emerald-300 text-emerald-400 font-semibold transition-colors"
              title="WhatsApp Direct"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            <span className="text-white/20">|</span>

            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com/polylolli.artlik"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-pink-300 text-pink-400 transition-colors"
                title="Instagram @polylolli.artlik"
              >
                <Instagram className="w-3 h-3 text-pink-400" />
                <span className="hidden sm:inline">@polylolli.artlik</span>
              </a>

              <a
                href="https://facebook.com/PolylolliArtLik"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-blue-300 text-blue-400 transition-colors"
                title="Facebook Polylolli Art & Lik"
              >
                <Facebook className="w-3 h-3 text-blue-400" />
                <span className="hidden sm:inline">Polylolli</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        <a
          href="#enter-polylolli"
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded-md"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-cyan-400 p-[2px] transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
              <span className="font-display font-black text-xs text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-300">
                PL
              </span>
            </div>
          </div>
          <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white">
            POLY<span className="text-pink-400">LOLLI</span>
            <span className="ml-1.5 text-xs font-semibold text-slate-400 font-sans tracking-widest uppercase hidden sm:inline">
              ART & LIK
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#worlds" className="hover:text-pink-300 transition-colors py-1 hover:border-b hover:border-pink-400/60">
            {t.nav.worlds}
          </a>
          <a href="#real-work" className="hover:text-pink-300 transition-colors py-1 hover:border-b hover:border-pink-400/60">
            {t.nav.realWork}
          </a>
          <a href="#packages" className="hover:text-pink-300 transition-colors py-1 hover:border-b hover:border-pink-400/60">
            {t.nav.packages}
          </a>
          <a href="#build-party" className="hover:text-pink-300 transition-colors py-1 hover:border-b hover:border-pink-400/60 text-pink-300 font-semibold">
            {lang === 'es' ? 'Crea Tu Fiesta' : 'Build Party'}
          </a>
          <a href="#trust-faq" className="hover:text-pink-300 transition-colors py-1 hover:border-b hover:border-pink-400/60">
            {t.nav.faq}
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5 text-xs font-semibold">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded-md transition-colors ${
                lang === 'en'
                  ? 'bg-pink-500/25 text-pink-300 font-bold border border-pink-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('es')}
              className={`px-2 py-1 rounded-md transition-colors ${
                lang === 'es'
                  ? 'bg-pink-500/25 text-pink-300 font-bold border border-pink-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Español"
            >
              ES
            </button>
          </div>

          <button
            onClick={onOpenPortal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors whitespace-nowrap"
            title="Access existing party booking with secure reference code"
          >
            <Calendar className="w-3.5 h-3.5 text-pink-400" />
            <span>{t.nav.myParty}</span>
          </button>

          <button
            onClick={onOpenKerniva}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/60 rounded-lg transition-colors whitespace-nowrap"
            title="Inspect Kerniva multi-tenant core operational state & Smart Events"
          >
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">{t.nav.kernivaOps}</span>
          </button>

          <button
            onClick={onOpenWizard}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 rounded-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all whitespace-nowrap active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.nav.planParty}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
