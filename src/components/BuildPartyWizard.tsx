import React, { useState } from 'react';
import { kernivaClient, OFFICIAL_PACKAGES } from '../services/kerniva/kernivaClient';
import { ServicePackage } from '../services/kerniva/types';
import { Language, TranslationDictionary } from '../i18n/translations';
import { Sparkles, Calendar, MapPin, User, Check, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

interface BuildPartyWizardProps {
  lang: Language;
  t: TranslationDictionary;
  initialPackage?: ServicePackage | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingCreated: (bookingRef: string) => void;
}

export const BuildPartyWizard: React.FC<BuildPartyWizardProps> = ({
  lang,
  t,
  initialPackage,
  isOpen,
  onClose,
  onBookingCreated,
}) => {
  const [step, setStep] = useState<number>(1);
  const [celebrationType, setCelebrationType] = useState<string>("Children's Birthday");
  const [celebrantName, setCelebrantName] = useState<string>('Sofia');
  const [celebrantAge, setCelebrantAge] = useState<number>(7);
  const [estimatedChildren, setEstimatedChildren] = useState<number>(18);
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    initialPackage?.id || 'pkg-magic'
  );
  const [venueName, setVenueName] = useState<string>('The Grove Hall');
  const [venueAddress, setVenueAddress] = useState<string>('High Street, Watford, WD17 3TX');
  const [eventDate, setEventDate] = useState<string>('2026-11-21');
  const [preferredTime, setPreferredTime] = useState<string>('15:00');
  const [parentName, setParentName] = useState<string>('Elena Davies');
  const [parentEmail, setParentEmail] = useState<string>('elena.davies@example.co.uk');
  const [parentPhone, setParentPhone] = useState<string>('+44 7700 900382');
  const [theme, setTheme] = useState<string>('Princess / Pastel Pink');
  const [notes, setNotes] = useState<string>('Nut allergy for one guest; loves dancing.');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdRef, setCreatedRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentPkg =
    OFFICIAL_PACKAGES.find((p) => p.id === selectedPackageId) || OFFICIAL_PACKAGES[2];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await kernivaClient.createEnquiry({
        parentName,
        parentEmail,
        parentPhone,
        celebrantName,
        celebrantAge,
        eventType: celebrationType,
        eventDate,
        preferredTime,
        estimatedChildren,
        venueName,
        venueAddress,
        packageId: selectedPackageId,
        theme,
        notes,
      });

      setCreatedRef(res.bookingRef);
    } catch (err) {
      console.error('Error creating Kerniva booking:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-pink-400">
              Kerniva Public Interface · Tenant: polylolli-art-lik
            </span>
            <h3 className="font-display font-bold text-2xl text-white">
              {t.wizard.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Success View */}
        {createdRef ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="font-display font-extrabold text-2xl text-white">
                {t.wizard.successTitle}
              </h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                {t.wizard.successDesc}
              </p>
            </div>

            {/* Opaque Booking Reference Box (Section 55) */}
            <div className="p-4 rounded-xl bg-slate-950 border border-pink-500/30 max-w-xs mx-auto">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                {t.wizard.bookingRefLabel}
              </div>
              <div className="font-mono font-bold text-2xl text-pink-300 tracking-wider mt-1">
                {createdRef}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  onBookingCreated(createdRef);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl text-sm hover:shadow-lg transition-all"
              >
                {t.wizard.openPortalBtn}
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 text-slate-300 font-semibold rounded-xl text-sm transition-colors"
              >
                Close & Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Wizard Flow */
          <div>
            {/* Step Indicators */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-6 px-1">
              <span>Step {step} of 4</span>
              <span className="font-semibold text-pink-400">
                {step === 1 && t.wizard.step1}
                {step === 2 && t.wizard.step2}
                {step === 3 && t.wizard.step4}
                {step === 4 && t.wizard.step5}
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Celebration & Package */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">
                      {t.wizard.celebrationType}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: "Children's Birthday", label: t.wizard.types.birthday },
                        { id: '1st Birthday / Milestone', label: t.wizard.types.babyFirst },
                        { id: 'School / Seasonal Celebration', label: t.wizard.types.schoolSeason },
                        { id: 'Family Gathering', label: t.wizard.types.family },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setCelebrationType(item.id)}
                          className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                            celebrationType === item.id
                              ? 'border-pink-500 bg-pink-500/20 text-white'
                              : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">
                      {t.wizard.packageLabel}
                    </label>
                    <div className="space-y-2">
                      {OFFICIAL_PACKAGES.map((pkg) => (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedPackageId(pkg.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                            selectedPackageId === pkg.id
                              ? 'border-pink-500 bg-pink-500/15 text-white'
                              : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                          }`}
                        >
                          <div>
                            <span className="font-bold text-sm block text-white">{pkg.name[lang]}</span>
                            <span className="text-slate-400">
                              {pkg.durationHours}h · Up to {pkg.maxChildren} kids
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-mono font-bold text-sm text-pink-300">£{pkg.price}</span>
                            <span className="text-[11px] text-slate-400 block">Deposit £{pkg.depositRequired}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Child Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Child's First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={celebrantName}
                        onChange={(e) => setCelebrantName(e.target.value)}
                        placeholder={t.wizard.childNamePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:border-pink-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.wizard.childAgeLabel}
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={16}
                        required
                        value={celebrantAge}
                        onChange={(e) => setCelebrantAge(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:border-pink-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.wizard.guestsLabel}
                    </label>
                    <input
                      type="number"
                      min={5}
                      max={60}
                      required
                      value={estimatedChildren}
                      onChange={(e) => setEstimatedChildren(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:border-pink-500 focus:outline-none font-mono"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      You can adjust the final count later in your Customer Portal.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.wizard.themeLabel}
                    </label>
                    <input
                      type="text"
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      placeholder={t.wizard.themePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Venue & Date */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Venue Name or Home
                    </label>
                    <input
                      type="text"
                      required
                      value={venueName}
                      onChange={(e) => setVenueName(e.target.value)}
                      placeholder={t.wizard.venueNamePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Address & Postcode (e.g. Watford, St Albans, London)
                    </label>
                    <input
                      type="text"
                      required
                      value={venueAddress}
                      onChange={(e) => setVenueAddress(e.target.value)}
                      placeholder={t.wizard.venueAddressPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.wizard.dateLabel}
                      </label>
                      <input
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:border-pink-500 focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.wizard.timeLabel}
                      </label>
                      <input
                        type="time"
                        required
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:border-pink-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Contact & Review */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.wizard.parentNameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.wizard.emailLabel}
                      </label>
                      <input
                        type="email"
                        required
                        value={parentEmail}
                        onChange={(e) => setParentEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:border-pink-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.wizard.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        required
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:border-pink-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.wizard.notesLabel}
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t.wizard.notesPlaceholder}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  {/* Summary Box */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-1">
                    <div className="flex justify-between">
                      <span>Package:</span>
                      <strong className="text-white">{currentPkg.name[lang]} (£{currentPkg.price})</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Date & Time:</span>
                      <span className="text-white">{eventDate} at {preferredTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Deposit Required:</span>
                      <span className="text-pink-300 font-bold font-mono">£{currentPkg.depositRequired}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg hover:shadow-pink-500/25 transition-all disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? t.wizard.submittingBtn : t.wizard.submitBtn}</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
