import React from 'react';
import { TranslationDictionary } from '../i18n/translations';
import { Sparkles, CheckCircle2, ShieldCheck, Heart, Phone, MessageCircle, Instagram, Facebook, MapPin, Gift, Palette, PartyPopper } from 'lucide-react';

interface EditorialRealWorkSectionProps {
  t: TranslationDictionary;
}

export const EditorialRealWorkSection: React.FC<EditorialRealWorkSectionProps> = ({ t }) => {
  return (
    <section id="real-work" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-300 tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>{t.realWork.kicker}</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          {t.realWork.title}
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          {t.realWork.subtitle}
        </p>
      </div>

      <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-pink-950/30 to-purple-950/40 border border-pink-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-[320px] aspect-square rounded-2xl bg-slate-950/80 border border-white/15 p-4 flex items-center justify-center shadow-xl group">
              <img
                src="/ChatGPT Image Aug 2, 2025, 05_28_10 PM.png"
                alt="Polylolli Art & Lik Official Identity & Character"
                className="w-full h-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
                onError={(e) => {
                  e.currentTarget.src = '/polylolli-official-logo.svg';
                }}
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-2 font-mono">
              Official Brand Identity · Polylolli Art & Lik
            </span>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Bilingual Entertainment (EN & ES)</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-semibold flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5" />
                <span>Regalos para Todos + Especial Cumpleañero</span>
              </span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              Eventos Mágicos en Brixton, Zonas Latinas de Londres y Hertfordshire
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              En cada una de nuestras celebraciones llevamos la máxima alegría: <strong>Pintacaritas profesional (Face Painting)</strong>, <strong>juegos activos y dinámicas</strong>, <strong>esculturas de globos (Globoflexia)</strong> y nuestra promesa de oro: <em>¡ofrecemos un regalito para todos los niños y algo más especial y exclusivo al cumpleañero para que todos se vayan a casa con un recuerdo inolvidable!</em>
            </p>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Zonas con desplazamiento directo:</strong> Brixton (SW9), Elephant & Castle, Seven Sisters, Tottenham, Stockwell, Vauxhall, Camden, Southwark, Gran Londres, Watford (WD17) y Hertfordshire.
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="tel:07938601802"
                className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Llamar: 07938601802</span>
              </a>

              <a
                href="https://wa.me/447938601802"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: 07938601802</span>
              </a>

              <a
                href="https://instagram.com/polylolli.artlik"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 rounded-xl bg-pink-600/30 hover:bg-pink-600/50 text-pink-200 border border-pink-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>@polylolli.artlik</span>
              </a>

              <a
                href="https://facebook.com/PolylolliArtLik"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Facebook className="w-4 h-4 text-blue-400" />
                <span>Polylolli Art & Lik</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 group flex flex-col justify-between min-h-[380px]">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-950/80 via-purple-950/50 to-slate-950 overflow-hidden">
            <svg viewBox="0 0 600 400" className="w-full h-full object-cover opacity-80" fill="none">
              <defs>
                <radialGradient id="balVig1" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#fbcfe8" />
                  <stop offset="60%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#831843" />
                </radialGradient>
                <radialGradient id="balVig2" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="60%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#713f12" />
                </radialGradient>
                <radialGradient id="balVig3" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#fed7aa" />
                  <stop offset="60%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#9a3412" />
                </radialGradient>
              </defs>
              <circle cx="120" cy="80" r="90" fill="url(#balVig1)" />
              <circle cx="260" cy="110" r="110" fill="url(#balVig2)" />
              <circle cx="420" cy="90" r="80" fill="url(#balVig1)" />
              <circle cx="340" cy="220" r="100" fill="url(#balVig3)" />
              <circle cx="180" cy="250" r="85" fill="url(#balVig1)" />
              <circle cx="480" cy="230" r="75" fill="url(#balVig2)" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          </div>

          <div className="relative z-10 p-6 sm:p-8 mt-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-300 bg-pink-500/20 border border-pink-500/30 px-2.5 py-1 rounded-md mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Styling</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-white">
              {t.realWork.item1Title}
            </h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-xl">
              {t.realWork.item1Desc}
            </p>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 group flex flex-col justify-between min-h-[380px]">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/80 via-blue-950/50 to-slate-950 overflow-hidden">
            <svg viewBox="0 0 600 400" className="w-full h-full object-cover opacity-75" fill="none">
              <circle cx="280" cy="160" r="30" fill="#67e8f9" opacity="0.3" />
              <circle cx="320" cy="160" r="40" fill="#ec4899" opacity="0.3" />
              <circle cx="300" cy="200" r="35" fill="#fef08a" opacity="0.3" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          </div>

          <div className="relative z-10 p-6 sm:p-8 mt-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 bg-cyan-500/20 border border-cyan-500/30 px-2.5 py-1 rounded-md mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cosmetic Safety Certified</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-white">
              {t.realWork.item2Title}
            </h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-xl">
              {t.realWork.item2Desc}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-amber-400">03. Sweet Stations & Treats</span>
              <span>Freshly Served</span>
            </div>
            <h4 className="font-display font-bold text-xl text-white">
              {t.realWork.item3Title}
            </h4>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              {t.realWork.item3Desc}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Máquinas de palomitas calientes, algodón de azúcar y fuente de chocolate con frutas</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-pink-400">04. Every Child Leaves with a Gift</span>
              <span>Gifts Included</span>
            </div>
            <h4 className="font-display font-bold text-xl text-white">
              {t.realWork.item4Title}
            </h4>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              {t.realWork.item4Desc}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400">
            <Gift className="w-4 h-4 text-pink-400" />
            <span>Regalo especial VIP para el protagonista + regalito para cada niño invitado</span>
          </div>
        </div>
      </div>
    </section>
  );
};
