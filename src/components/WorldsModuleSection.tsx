import React from 'react';
import { WorldAtmosphere } from './AmbientBackground';
import { TranslationDictionary } from '../i18n/translations';
import { Sparkles, Palette, PartyPopper, Flame, Baby, Image, ArrowRight } from 'lucide-react';

interface WorldsModuleSectionProps {
  currentAtmosphere: WorldAtmosphere;
  onSelectAtmosphere: (world: WorldAtmosphere) => void;
  t: TranslationDictionary;
  onOpenWizard: () => void;
}

export const WorldsModuleSection: React.FC<WorldsModuleSectionProps> = ({
  currentAtmosphere,
  onSelectAtmosphere,
  t,
  onOpenWizard,
}) => {
  const worldCards = [
    {
      id: 'parties' as WorldAtmosphere,
      title: t.worlds.parties.name,
      tag: t.worlds.parties.tag,
      description: t.worlds.parties.desc,
      stat: t.worlds.parties.stat,
      icon: PartyPopper,
      borderActive: 'border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.3)]',
      gradient: 'from-pink-500/20 via-purple-500/10 to-transparent',
      accentColor: '#ec4899',
    },
    {
      id: 'facePaint' as WorldAtmosphere,
      title: t.worlds.facePaint.name,
      tag: t.worlds.facePaint.tag,
      description: t.worlds.facePaint.desc,
      stat: t.worlds.facePaint.stat,
      icon: Palette,
      borderActive: 'border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)]',
      gradient: 'from-cyan-500/20 via-indigo-500/10 to-transparent',
      accentColor: '#06b6d4',
    },
    {
      id: 'balloons' as WorldAtmosphere,
      title: t.worlds.balloons.name,
      tag: t.worlds.balloons.tag,
      description: t.worlds.balloons.desc,
      stat: t.worlds.balloons.stat,
      icon: Sparkles,
      borderActive: 'border-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.3)]',
      gradient: 'from-sky-400/20 via-amber-400/10 to-transparent',
      accentColor: '#38bdf8',
    },
    {
      id: 'inflatables' as WorldAtmosphere,
      title: t.worlds.inflatables.name,
      tag: t.worlds.inflatables.tag,
      description: t.worlds.inflatables.desc,
      stat: t.worlds.inflatables.stat,
      icon: Flame,
      borderActive: 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)]',
      gradient: 'from-blue-600/20 via-pink-500/10 to-transparent',
      accentColor: '#3b82f6',
    },
    {
      id: 'babyEvents' as WorldAtmosphere,
      title: t.worlds.babyEvents.name,
      tag: t.worlds.babyEvents.tag,
      description: t.worlds.babyEvents.desc,
      stat: t.worlds.babyEvents.stat,
      icon: Baby,
      borderActive: 'border-rose-300 shadow-[0_0_30px_rgba(251,146,60,0.25)]',
      gradient: 'from-orange-300/20 via-rose-200/10 to-transparent',
      accentColor: '#fb923c',
    },
    {
      id: 'gallery' as WorldAtmosphere,
      title: t.worlds.gallery.name,
      tag: t.worlds.gallery.tag,
      description: t.worlds.gallery.desc,
      stat: t.worlds.gallery.stat,
      icon: Image,
      borderActive: 'border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.15)]',
      gradient: 'from-zinc-500/20 via-purple-500/5 to-transparent',
      accentColor: '#e4e4e7',
    },
  ];

  return (
    <section id="worlds" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-pink-300 font-semibold mb-3">
          <span>01. Interconnected Worlds</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
          {t.worlds.sectionTitle}
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base font-normal">
          {t.worlds.sectionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {worldCards.map((world) => {
          const isSelected = currentAtmosphere === world.id;
          const Icon = world.icon;

          return (
            <div
              key={world.id}
              onClick={() => onSelectAtmosphere(world.id)}
              onMouseEnter={() => onSelectAtmosphere(world.id)}
              className={`group relative rounded-2xl p-6 transition-all duration-500 cursor-pointer border bg-slate-900/60 backdrop-blur-sm flex flex-col justify-between overflow-hidden ${
                isSelected
                  ? world.borderActive
                  : 'border-white/10 hover:border-white/25 hover:bg-slate-900/80'
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${world.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                  isSelected ? 'opacity-100' : ''
                }`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-md"
                    style={{ backgroundColor: `${world.accentColor}25` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: world.accentColor }} />
                  </div>
                  <span className="text-xs font-medium text-slate-400">{world.stat}</span>
                </div>

                <h3 className="font-display font-bold text-xl text-white group-hover:text-pink-200 transition-colors">
                  {world.title}
                </h3>
                <div className="text-xs font-medium text-slate-400 mt-1 mb-3">
                  <span>{world.tag}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">{world.description}</p>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
                <span
                  className="transition-colors group-hover:underline flex items-center gap-1.5"
                  style={{ color: world.accentColor }}
                >
                  {isSelected ? 'Active Atmosphere' : 'Select Atmosphere'}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenWizard();
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Book this world →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
