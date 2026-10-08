import React, { useState } from 'react';
import { OFFICIAL_PACKAGES } from '../services/kerniva/kernivaClient';
import { ServicePackage } from '../services/kerniva/types';
import { Language, TranslationDictionary } from '../i18n/translations';
import { Sparkles, Check, Clock, Users, CalendarCheck, Shield } from 'lucide-react';

interface PackagesSectionProps {
  lang: Language;
  t: TranslationDictionary;
  onSelectPackageToBook: (pkg: ServicePackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  lang,
  t,
  onSelectPackageToBook,
}) => {
  const [selectedPackageId, setSelectedPackageId] = useState<string>('pkg-magic');

  return (
    <section id="packages" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-pink-300 font-semibold mb-3">
          <span>02. Transparent Kerniva Pricing</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          {t.packages.title}
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          {t.packages.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {OFFICIAL_PACKAGES.map((pkg) => {
          const isFeatured = pkg.id === 'pkg-magic';
          const isSelected = selectedPackageId === pkg.id;

          return (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackageId(pkg.id)}
              className={`relative rounded-2xl p-7 transition-all duration-300 border flex flex-col justify-between cursor-pointer ${
                isFeatured
                  ? 'bg-slate-900/90 border-pink-500 shadow-[0_0_35px_rgba(236,72,153,0.25)] ring-1 ring-pink-500/50'
                  : 'bg-slate-900/60 border-white/10 hover:border-white/25 hover:bg-slate-900/80'
              }`}
            >
              {isFeatured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs tracking-wider uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Signature Most Popular</span>
                </div>
              )}

              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-white">{pkg.name[lang]}</h3>
                    <p className="text-xs text-slate-400 mt-1">{pkg.tagline[lang]}</p>
                  </div>
                </div>

                <div className="my-5 pb-5 border-b border-white/10 flex items-baseline gap-2">
                  <span className="font-display font-black text-4xl text-white font-mono tabular-nums">£{pkg.price}</span>
                  <span className="text-xs text-slate-400 font-medium">{t.packages.perParty}</span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300 mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-pink-400 shrink-0" />
                    <span><strong className="text-white">{t.packages.duration}:</strong> {pkg.durationHours} hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span><strong className="text-white">{t.packages.guests}:</strong> Up to {pkg.maxChildren} children</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong className="text-white">{t.packages.age}:</strong> {pkg.ageRange}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.packages.includesTitle}</div>
                  <ul className="space-y-2.5">
                    {pkg.features[lang].map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-snug">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span>Deposit: £{pkg.depositRequired}</span>
                  <span className="text-emerald-400 font-medium">Refundable up to 14 days</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPackageToBook(pkg);
                  }}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    isFeatured
                      ? 'bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white shadow-lg hover:shadow-pink-500/30'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.packages.selectPackage}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{t.packages.depositNotice}</span>
        </div>
        <div className="text-slate-300 font-medium">
          Need a custom duration or twin birthday? Request via party builder.
        </div>
      </div>
    </section>
  );
};
