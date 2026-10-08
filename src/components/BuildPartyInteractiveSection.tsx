import React, { useMemo, useState } from 'react';
import { Language, TranslationDictionary } from '../i18n/translations';
import { WorldAtmosphere } from './AmbientBackground';
import { OFFICIAL_PACKAGES, kernivaClient } from '../services/kerniva/kernivaClient';
import { Calendar, CheckCircle2, MapPin, Sparkles, Users } from 'lucide-react';

interface Props {
  lang: Language;
  t: TranslationDictionary;
  onAtmosphereChange: (atmosphere: WorldAtmosphere) => void;
  onBookingCreated: (ref: string) => void;
  onOpenPortalWithRef: (ref: string) => void;
}

export const BuildPartyInteractiveSection: React.FC<Props> = ({ lang, t, onAtmosphereChange, onBookingCreated, onOpenPortalWithRef }) => {
  const [eventType,setEventType]=useState("Children's Birthday");
  const [packageId,setPackageId]=useState('pkg-magic');
  const [children,setChildren]=useState(18);
  const [date,setDate]=useState('2026-11-21');
  const [time,setTime]=useState('15:00');
  const [venue,setVenue]=useState('Watford');
  const [name,setName]=useState('Sofia');
  const [age,setAge]=useState(7);
  const [theme,setTheme]=useState('Princess / Pastel Pink');
  const [created,setCreated]=useState<string|null>(null);
  const [busy,setBusy]=useState(false);

  const pkg=useMemo(()=>OFFICIAL_PACKAGES.find(p=>p.id===packageId) || OFFICIAL_PACKAGES[0],[packageId]);

  const selectType=(type:string, atmosphere:WorldAtmosphere)=>{ setEventType(type); onAtmosphereChange(atmosphere); };

  const submit=async()=>{
    setBusy(true);
    try{
      const res=await kernivaClient.createEnquiry({
        parentName:'Website Customer',parentEmail:'customer@example.co.uk',parentPhone:'+44 7000 000000',
        celebrantName:name,celebrantAge:age,eventType,eventDate:date,preferredTime:time,estimatedChildren:children,
        venueName:venue,venueAddress:venue,packageId,theme,notes:'Created from Polylolli interactive party builder'
      });
      setCreated(res.bookingRef); onBookingCreated(res.bookingRef);
    } finally { setBusy(false); }
  };

  return <section id="build-party" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
      <div className="space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-300">
          <Sparkles className="w-3.5 h-3.5"/> Interactive Party Builder
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white">Build the celebration around the child, not a template.</h2>
        <p className="text-slate-300 leading-relaxed">Choose the occasion, guest count, package, date and venue. Polylolli presents the journey; Kerniva creates the operational enquiry and booking reference.</p>

        <div className="grid grid-cols-2 gap-3">
          {[
            ["Children's Birthday",'Birthday','celebrationBirthday'],
            ['1st Birthday / Milestone','Baby milestone','celebrationBaby'],
            ['School / Seasonal Celebration','School event','celebrationSchool'],
            ['Family Gathering','Family event','celebrationFamily']
          ].map(([value,label,atm])=><button key={value} onClick={()=>selectType(value,atm as WorldAtmosphere)} className={`p-3 rounded-xl border text-left text-sm font-semibold transition-all ${eventType===value?'border-pink-500 bg-pink-500/15 text-white':'border-white/10 bg-white/5 text-slate-300'}`}>{label}</button>)}
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10">
          <div className="flex items-center justify-between"><span className="text-sm text-slate-300">Selected package</span><strong className="text-pink-300">£{pkg.price}</strong></div>
          <div className="font-display font-bold text-xl text-white mt-1">{pkg.name[lang]}</div>
          <div className="text-xs text-slate-400 mt-1">{pkg.durationHours}h · up to {pkg.maxChildren} children · £{pkg.depositRequired} deposit</div>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-900/90 border border-white/15 p-6 sm:p-8 shadow-2xl">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="text-xs text-slate-300">Child name<input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white"/></label>
          <label className="text-xs text-slate-300">Age<input type="number" value={age} onChange={e=>setAge(+e.target.value)} className="mt-1 w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white"/></label>
          <label className="text-xs text-slate-300">Children<input type="number" value={children} onChange={e=>setChildren(+e.target.value)} className="mt-1 w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white"/></label>
          <label className="text-xs text-slate-300">Package<select value={packageId} onChange={e=>setPackageId(e.target.value)} className="mt-1 w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white">{OFFICIAL_PACKAGES.map(p=><option key={p.id} value={p.id}>{p.name[lang]} — £{p.price}</option>)}</select></label>
          <label className="text-xs text-slate-300">Date<input type="date" value={date} onChange={e=>setDate(e.target.value)} className="mt-1 w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white"/></label>
          <label className="text-xs text-slate-300">Start time<input type="time" value={time} onChange={e=>setTime(e.target.value)} className="mt-1 w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white"/></label>
          <label className="text-xs text-slate-300 sm:col-span-2">Venue / postcode<input value={venue} onChange={e=>setVenue(e.target.value)} className="mt-1 w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white"/></label>
          <label className="text-xs text-slate-300 sm:col-span-2">Theme<input value={theme} onChange={e=>setTheme(e.target.value)} className="mt-1 w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white"/></label>
        </div>

        <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-400 mt-5">
          <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-cyan-400"/>{children} children</div>
          <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-pink-400"/>{date}</div>
          <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-400"/>{venue}</div>
        </div>

        <button onClick={submit} disabled={busy} className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white font-bold disabled:opacity-50">{busy?'Creating Kerniva enquiry…':'Create party enquiry'}</button>

        {created && <div className="mt-4 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-sm text-emerald-200">
          <div className="flex items-center gap-2 font-semibold"><CheckCircle2 className="w-4 h-4"/> Saved in Kerniva</div>
          <div className="font-mono text-lg mt-1">{created}</div>
          <button onClick={()=>onOpenPortalWithRef(created)} className="mt-2 text-xs underline">Open customer portal</button>
        </div>}
      </div>
    </div>
  </section>;
};
