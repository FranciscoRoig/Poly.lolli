import React, { useState } from 'react';
import { TranslationDictionary } from '../i18n/translations';
import { Sparkles, Camera, MapPin } from 'lucide-react';

interface GallerySectionProps {
  t: TranslationDictionary;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ t }) => {
  const [filter, setFilter] = useState<string>('all');

  const galleryItems = [
    {
      id: 'gal-1',
      category: 'balloons',
      title: 'Pastel Macaron Balloon Arch & Shimmer Backdrop',
      location: 'Moor Park Mansion, Rickmansworth',
      gradient: 'from-pink-900/60 via-purple-900/30 to-slate-900',
      badge: 'Bespoke Garland',
      colSpan: 'col-span-1 lg:col-span-2',
      details: '4-metre organic balloon installation with chrome gold accents for Sofia’s celebration.',
    },
    {
      id: 'gal-2',
      category: 'facePaint',
      title: 'Bespoke Iridescent Butterfly Face Art',
      location: 'The Town Hall, St Albans',
      gradient: 'from-cyan-900/60 via-blue-900/30 to-slate-900',
      badge: 'Bio-Glitter Artistry',
      colSpan: 'col-span-1',
      details: 'Cosmetic grade water-activated pigments with cosmetic eye gems.',
    },
    {
      id: 'gal-3',
      category: 'magic',
      title: 'Theatrical Comedy Magic & Child Helper Trick',
      location: 'High Street Community Centre, Watford',
      gradient: 'from-fuchsia-900/60 via-pink-900/30 to-slate-900',
      badge: 'Magic Stage',
      colSpan: 'col-span-1',
      details: 'Full interactive 40-minute stage performance with snow machine finale.',
    },
    {
      id: 'gal-4',
      category: 'baby',
      title: 'Aesthetic Neutral Soft Play & Ball Pit',
      location: 'Private Residence, Northwood',
      gradient: 'from-orange-900/50 via-rose-900/30 to-slate-900',
      badge: 'Toddler Milestone',
      colSpan: 'col-span-1 lg:col-span-2',
      details: 'Cream, sage and blush foam building blocks and slide with sanitised balls.',
    },
    {
      id: 'gal-5',
      category: 'balloons',
      title: 'Double Ring Chrome Balloon Portal with Neon Sign',
      location: 'The Grove, Chandler’s Cross',
      gradient: 'from-sky-900/60 via-indigo-900/30 to-slate-900',
      badge: 'VIP Entrance',
      colSpan: 'col-span-1',
      details: 'Welcoming VIP entrance setup for school milestone event.',
    },
    {
      id: 'gal-6',
      category: 'magic',
      title: 'Giant Parachute Games & Balloon Sculptures',
      location: 'Mill Hill Pavilion, London',
      gradient: 'from-purple-900/60 via-pink-900/30 to-slate-900',
      badge: 'Active Games',
      colSpan: 'col-span-1',
      details: 'High-energy team coordination and custom multi-balloon sculptures.',
    },
  ];

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-pink-300 font-semibold mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>03. Real Event Portfolio</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Event Showcase
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-xl">
            Visual record of real installations and parties delivered across Watford, Hertfordshire and Greater London.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-white/5 border border-white/10">
          {[
            { id: 'all', label: 'All Celebrations' },
            { id: 'balloons', label: 'Balloons' },
            { id: 'facePaint', label: 'Face Paint' },
            { id: 'magic', label: 'Magic & Games' },
            { id: 'baby', label: 'Soft Play' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filter === tab.id ? 'bg-pink-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`group relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 min-h-[300px] flex flex-col justify-end p-6 transition-all duration-300 hover:border-white/30 ${item.colSpan}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-700 group-hover:scale-105`} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between text-xs text-pink-300">
                <span className="font-semibold uppercase tracking-wider">{item.badge}</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3 h-3 text-pink-400" />
                  {item.location}
                </span>
              </div>
              <h4 className="font-display font-bold text-xl text-white group-hover:text-pink-200 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-slate-300 font-normal leading-relaxed line-clamp-2">{item.details}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
