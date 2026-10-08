import React, { useState } from 'react';
import { TranslationDictionary } from '../i18n/translations';
import { ShieldCheck, ChevronDown, CheckCircle2, HelpCircle } from 'lucide-react';

interface TrustFaqSectionProps {
  t: TranslationDictionary;
}

export const TrustFaqSection: React.FC<TrustFaqSectionProps> = ({ t }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: t.trust.faq1Q, a: t.trust.faq1A },
    { q: t.trust.faq2Q, a: t.trust.faq2A },
    { q: t.trust.faq3Q, a: t.trust.faq3A },
    { q: t.trust.faq4Q, a: t.trust.faq4A },
    { q: t.trust.faq5Q, a: t.trust.faq5A },
    { q: t.trust.faq6Q, a: t.trust.faq6A },
  ];

  return (
    <section id="trust-faq" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-pink-300 font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>04. {t.trust.kicker}</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          {t.trust.title}
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          {t.trust.subtitle}
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;

          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-slate-900/90 border-pink-500/40 shadow-lg'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-pink-400 font-bold shrink-0">
                    0{idx + 1}.
                  </span>
                  <span className="font-display font-bold text-base sm:text-lg text-white">
                    {faq.q}
                  </span>
                </div>

                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-pink-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/5">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="font-display font-bold text-base text-white">
            ¿Tienes alguna pregunta especial sobre tu fiesta?
          </h4>
          <p className="text-xs text-slate-300 mt-0.5">
            Escríbenos directamente por WhatsApp o llámanos. Respondemos en minutos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="tel:07938601802"
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <span>07938601802</span>
          </a>
          <a
            href="https://wa.me/447938601802"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <span>WhatsApp Directo</span>
          </a>
          <a
            href="https://instagram.com/polylolli.artlik"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-pink-600/20 hover:bg-pink-600/40 text-pink-300 border border-pink-500/30 text-xs transition-colors"
          >
            <span>@polylolli.artlik</span>
          </a>
        </div>
      </div>
    </section>
  );
};
