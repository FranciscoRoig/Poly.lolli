import React, { useEffect, useState } from 'react';
import { kernivaClient } from '../services/kerniva/kernivaClient';
import { Booking, ChangeRequest, Customer, EventDetails, LowRiskPreferences, Quote } from '../services/kerniva/types';
import { Language, TranslationDictionary } from '../i18n/translations';
import { AlertCircle, CheckCircle2, CreditCard, RefreshCw, Search, Send } from 'lucide-react';

interface Props {
  isOpen:boolean;
  onClose:()=>void;
  lang:Language;
  t:TranslationDictionary;
  initialReference?:string|null;
}

type Bundle={booking:Booking;customer:Customer;event:EventDetails;quote:Quote;changeRequests:ChangeRequest[]};

export const CustomerPortalModal:React.FC<Props>=({isOpen,onClose,t,initialReference})=>{
  const [ref,setRef]=useState(initialReference||'PLY-26-8K2F');
  const [data,setData]=useState<Bundle|null>(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState<string|null>(null);
  const [tab,setTab]=useState<'details'|'preferences'|'change'>('details');
  const [prefs,setPrefs]=useState<LowRiskPreferences>({estimatedChildren:18,allergies:'',accessibilityNotes:'',musicPreferences:'',themePreferences:'',venueParkingNotes:'',generalNotes:''});
  const [field,setField]=useState('startTime');
  const [requested,setRequested]=useState('15:30');
  const [reason,setReason]=useState('We need to adjust the event details.');
  const [message,setMessage]=useState<string|null>(null);

  const load=async(value=ref)=>{
    if(!value.trim())return;
    setLoading(true);setError(null);
    try{
      const found=await kernivaClient.getBooking(value.trim().toUpperCase());
      if(!found){setData(null);setError(`No booking found for ${value}. Try PLY-26-8K2F.`);}
      else {setData(found);setPrefs(found.event.preferences);setRef(found.booking.publicId);}
    } catch { setError('Unable to read the booking from Kerniva.'); }
    finally { setLoading(false); }
  };

  useEffect(()=>{if(isOpen)load(initialReference||ref);},[isOpen,initialReference]);

  if(!isOpen)return null;

  const savePrefs=async()=>{
    if(!data)return;
    const event=await kernivaClient.updatePreferences(data.booking.publicId,prefs);
    setData({...data,event}); setMessage(t.portal.savedAlert);
  };

  const submitChange=async()=>{
    if(!data)return;
    const current=field==='startTime'?data.event.startTime:field==='eventDate'?data.event.eventDate:data.event.packageName;
    await kernivaClient.submitChangeRequest(data.booking.publicId,{field,currentValue:current,requestedValue:requested,reason});
    await load(data.booking.publicId); setMessage('Change request submitted to Kerniva for business review.');
  };

  const acceptQuote=async()=>{if(!data)return;await kernivaClient.acceptQuote(data.quote.id,data.booking.publicId);await load(data.booking.publicId);};
  const payDeposit=async()=>{if(!data)return;await kernivaClient.processDepositPayment(data.booking.publicId,data.quote.depositAmount,'Simulated card checkout');await load(data.booking.publicId);};

  return <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3">
    <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-slate-900 border border-white/15 p-6 sm:p-8 shadow-2xl">
      <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
        <div><div className="text-xs uppercase tracking-wider text-pink-400">{t.portal.subtitle} · <span className="text-cyan-400 font-mono">polylolli-art-lik</span></div><h3 className="font-display font-black text-2xl text-white mt-1">{t.portal.title}</h3></div>
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 text-white">✕</button>
      </div>

      <div className="my-5 flex gap-2 p-3 rounded-xl bg-slate-950 border border-white/10">
        <Search className="w-4 h-4 text-slate-400 mt-2"/>
        <input value={ref} onChange={e=>setRef(e.target.value.toUpperCase())} placeholder={t.portal.refInputPlaceholder} className="flex-1 bg-transparent text-white font-mono outline-none"/>
        <button onClick={()=>load()} className="px-4 py-2 rounded-lg bg-white/10 text-xs font-semibold flex items-center gap-1"><RefreshCw className={`w-3.5 h-3.5 ${loading?'animate-spin':''}`}/>{t.portal.searchBtn}</button>
      </div>

      {error && <div className="p-3 mb-5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex gap-2"><AlertCircle className="w-4 h-4"/>{error}</div>}

      {data && <>
        <div className="grid sm:grid-cols-4 gap-3 mb-5">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10"><div className="text-[10px] text-slate-400 uppercase">{t.portal.statusLabel}</div><div className="font-bold text-emerald-300">{t.portal.statusMap[data.booking.status]||data.booking.status}</div></div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10"><div className="text-[10px] text-slate-400 uppercase">{t.portal.totalAmount}</div><div className="font-mono font-bold text-white">£{data.booking.totalAmount}</div></div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10"><div className="text-[10px] text-slate-400 uppercase">{t.portal.depositPaid}</div><div className="font-mono font-bold text-white">£{data.booking.depositPaid}</div></div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10"><div className="text-[10px] text-slate-400 uppercase">{t.portal.balanceDue}</div><div className="font-mono font-bold text-pink-300">£{data.booking.outstandingBalance}</div></div>
        </div>

        <div className="flex gap-2 mb-5 border-b border-white/10 pb-3">
          {([['details','Details'],['preferences',t.portal.preferencesTab],['change',t.portal.changeRequestTab]] as const).map(([id,label])=><button key={id} onClick={()=>setTab(id)} className={`px-3 py-2 rounded-lg text-xs font-semibold ${tab===id?'bg-pink-500/20 text-pink-300':'text-slate-400'}`}>{label}</button>)}
        </div>

        {tab==='details' && <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-slate-950 border border-white/10"><div className="text-slate-400 text-xs">{t.portal.packageLabel}</div><strong className="text-white">{data.event.packageName}</strong><div className="text-slate-400 mt-2">{data.event.eventDate} · {data.event.startTime}–{data.event.endTime}</div></div>
            <div className="p-4 rounded-xl bg-slate-950 border border-white/10"><div className="text-slate-400 text-xs">Venue</div><strong className="text-white">{data.event.venueName}</strong><div className="text-slate-400 mt-2">{data.event.venueAddress}</div></div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-white/10">
            <div className="font-bold text-white">{t.portal.quoteReviewTitle}</div><p className="text-xs text-slate-400 mt-1">{t.portal.quoteReviewDesc}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {data.quote.status!=='ACCEPTED'?<button onClick={acceptQuote} className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-xs font-bold">{t.portal.acceptQuoteBtn}</button>:<span className="text-emerald-300 text-xs flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/>{t.portal.quoteAcceptedBadge}</span>}
              {data.quote.status==='ACCEPTED' && data.booking.depositPaid===0 && <button onClick={payDeposit} className="px-4 py-2 bg-pink-600 text-white rounded-lg text-xs font-bold flex items-center gap-1"><CreditCard className="w-4 h-4"/>Pay £{data.quote.depositAmount} deposit</button>}
            </div>
          </div>
        </div>}

        {tab==='preferences' && <div className="space-y-3">
          <p className="text-sm text-slate-300">{t.portal.preferencesDesc}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="text-xs text-slate-300">Children<input type="number" value={prefs.estimatedChildren} onChange={e=>setPrefs({...prefs,estimatedChildren:+e.target.value})} className="mt-1 w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white"/></label>
            <label className="text-xs text-slate-300">{t.portal.themeLabel}<input value={prefs.themePreferences} onChange={e=>setPrefs({...prefs,themePreferences:e.target.value})} className="mt-1 w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white"/></label>
            <label className="text-xs text-slate-300">{t.portal.allergiesLabel}<input value={prefs.allergies} onChange={e=>setPrefs({...prefs,allergies:e.target.value})} className="mt-1 w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white"/></label>
            <label className="text-xs text-slate-300">{t.portal.musicLabel}<input value={prefs.musicPreferences} onChange={e=>setPrefs({...prefs,musicPreferences:e.target.value})} className="mt-1 w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white"/></label>
          </div>
          <button onClick={savePrefs} className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs">{t.portal.savePreferencesBtn}</button>
        </div>}

        {tab==='change' && <div className="space-y-3">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">{t.portal.restrictedNotice}</div>
          <div className="grid sm:grid-cols-2 gap-3">
            <select value={field} onChange={e=>setField(e.target.value)} className="p-3 rounded-xl bg-slate-950 border border-white/10 text-white text-sm"><option value="startTime">Start time</option><option value="eventDate">Event date</option><option value="package">Package</option></select>
            <input value={requested} onChange={e=>setRequested(e.target.value)} className="p-3 rounded-xl bg-slate-950 border border-white/10 text-white text-sm" placeholder={t.portal.newRequestedValue}/>
          </div>
          <textarea value={reason} onChange={e=>setReason(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white text-sm" rows={3}/>
          <button onClick={submitChange} className="px-5 py-2.5 rounded-xl bg-pink-600 text-white font-bold text-xs flex items-center gap-1"><Send className="w-4 h-4"/>{t.portal.submitChangeBtn}</button>
          {data.changeRequests.length>0 && <div className="space-y-2 pt-2">{data.changeRequests.map(req=><div key={req.id} className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs"><strong className="text-white">{req.field}</strong> · {req.currentValue} → {req.requestedValue}<span className="ml-2 text-cyan-300">{req.status}</span></div>)}</div>}
        </div>}

        {message && <div className="mt-4 text-xs text-emerald-300">{message}</div>}
      </>}
    </div>
  </div>;
};
