/**
 * Polylolli Art & Lik — Children's Events Vertical powered by Kerniva
 * Architecture: Polylolli (Brand & Public CX) + Kerniva (Multi-Tenant Operational Core)
 */

import React, { useState } from 'react';
import { Language, translations } from './i18n/translations';
import { AmbientBackground, WorldAtmosphere } from './components/AmbientBackground';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { WorldsModuleSection } from './components/WorldsModuleSection';
import { EditorialRealWorkSection } from './components/EditorialRealWorkSection';
import { PackagesSection } from './components/PackagesSection';
import { BuildPartyInteractiveSection } from './components/BuildPartyInteractiveSection';
import { GallerySection } from './components/GallerySection';
import { TrustFaqSection } from './components/TrustFaqSection';
import { BuildPartyWizard } from './components/BuildPartyWizard';
import { CustomerPortalModal } from './components/CustomerPortalModal';
import { KernivaDrawer } from './components/KernivaDrawer';
import { BrandLogo } from './components/BrandLogo';
import { ServicePackage } from './services/kerniva/types';
import { Sparkles, MessageCircle, Shield, Database } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [atmosphere, setAtmosphere] = useState<WorldAtmosphere>('parties');
  const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false);
  const [portalBookingRef, setPortalBookingRef] = useState<string | null>('PLY-26-8K2F');
  const [isKernivaDrawerOpen, setIsKernivaDrawerOpen] = useState<boolean>(false);
  const [isWizardOpen, setIsWizardOpen] = useState<boolean>(false);
  const [selectedPackageForWizard, setSelectedPackageForWizard] = useState<ServicePackage | null>(null);

  const t = translations[lang];

  const scrollToPartyBuilder = () => {
    const el = document.getElementById('build-party');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsWizardOpen(true);
    }
  };

  const handleSelectPackageToBook = (pkg: ServicePackage) => {
    setSelectedPackageForWizard(pkg);
    scrollToPartyBuilder();
  };

  const handleBookingCreated = (newRef: string) => {
    setPortalBookingRef(newRef);
    setIsPortalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-pink-500 selection:text-white">
      <AmbientBackground atmosphere={atmosphere} />
      <HeaderNav
        lang={lang}
        onLanguageChange={setLang}
        t={t}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenKerniva={() => setIsKernivaDrawerOpen(true)}
        onOpenWizard={scrollToPartyBuilder}
      />

      <main className="relative z-10 flex-grow">
        <HeroSection t={t} onOpenWizard={scrollToPartyBuilder} />
        <WorldsModuleSection
          currentAtmosphere={atmosphere}
          onSelectAtmosphere={setAtmosphere}
          t={t}
          onOpenWizard={scrollToPartyBuilder}
        />
        <EditorialRealWorkSection t={t} />
        <PackagesSection lang={lang} t={t} onSelectPackageToBook={handleSelectPackageToBook} />
        <BuildPartyInteractiveSection
          lang={lang}
          t={t}
          onAtmosphereChange={setAtmosphere}
          onBookingCreated={handleBookingCreated}
          onOpenPortalWithRef={(ref) => {
            setPortalBookingRef(ref);
            setIsPortalOpen(true);
          }}
        />
        <GallerySection t={t} />
        <TrustFaqSection t={t} />

        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-pink-950/40 via-purple-950/30 to-slate-900 border border-pink-500/30 relative overflow-hidden shadow-2xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <div className="inline-block transform hover:scale-105 transition-transform duration-300">
                <BrandLogo size="medium" showText={false} glowColor="rgba(236,72,153,0.5)" />
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
                {t.cta.title}
              </h2>
              <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {t.cta.subtitle}
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={scrollToPartyBuilder}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white font-bold rounded-xl text-base shadow-xl hover:shadow-pink-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.cta.button}</span>
                </button>
                <button
                  onClick={() => setIsPortalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl text-sm border border-white/15 transition-colors"
                >
                  {t.nav.myParty} (PLY-26-8K2F)
                </button>
              </div>
              <div className="pt-4 text-xs text-slate-400 flex items-center justify-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.cta.whatsappNote}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-slate-950/90 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-display font-extrabold text-white text-base tracking-tight">
              POLY<span className="text-pink-400">LOLLI</span> ART & LIK
            </span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span>Brixton · Zonas Latinas de Londres · Gran Londres · Watford · Hertfordshire</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="tel:07938601802" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
              Tel: 07938601802
            </a>
            <span className="text-white/20">·</span>
            <a href="https://wa.me/447938601802" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
              WhatsApp Directo
            </a>
            <span className="text-white/20">·</span>
            <a href="https://instagram.com/polylolli.artlik" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 transition-colors">
              @polylolli.artlik
            </a>
            <span className="text-white/20">·</span>
            <button onClick={() => setIsKernivaDrawerOpen(true)} className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors">
              <Database className="w-3.5 h-3.5" />
              <span>Kerniva (polylolli-art-lik)</span>
            </button>
          </div>
          <div className="text-slate-500 text-center md:text-right">
            © {new Date().getFullYear()} Polylolli Art & Lik. Powered by FRRM Group & Kerniva.
          </div>
        </div>
      </footer>

      <BuildPartyWizard
        lang={lang}
        t={t}
        initialPackage={selectedPackageForWizard}
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onBookingCreated={handleBookingCreated}
      />
      <CustomerPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        lang={lang}
        t={t}
        initialReference={portalBookingRef}
      />
      <KernivaDrawer
        isOpen={isKernivaDrawerOpen}
        onClose={() => setIsKernivaDrawerOpen(false)}
        t={t}
      />
    </div>
  );
}
