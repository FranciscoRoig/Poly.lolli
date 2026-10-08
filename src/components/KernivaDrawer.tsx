import React, { useState, useEffect } from 'react';
import { kernivaClient } from '../services/kerniva/kernivaClient';
import { SmartEvent, AuditLogEntry, ChangeRequest } from '../services/kerniva/types';
import { TranslationDictionary } from '../i18n/translations';
import {
  Database,
  Activity,
  CheckCircle,
  XCircle,
  ShieldCheck,
  FileText,
  Clock,
  Layers,
  Sparkles,
  Server,
  Zap,
} from 'lucide-react';

interface KernivaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationDictionary;
}

export const KernivaDrawer: React.FC<KernivaDrawerProps> = ({ isOpen, onClose, t }) => {
  const [activeTab, setActiveTab] = useState<'events' | 'approvalQueue' | 'audit'>('events');
  const [smartEvents, setSmartEvents] = useState<SmartEvent[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [pendingRequests, setPendingRequests] = useState<ChangeRequest[]>([]);
  const [reviewerNote, setReviewerNote] = useState<string>('Entertainer schedule verified and available for 15:30.');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  const refreshData = async () => {
    const events = await kernivaClient.getSmartEvents();
    const audits = await kernivaClient.getAuditLogs();
    setSmartEvents(events);
    setAuditLogs(audits);

    const bookings = await kernivaClient.getAllBookingsForTenant();
    const allPending: ChangeRequest[] = [];
    for (const b of bookings) {
      const data = await kernivaClient.getBooking(b.publicId);
      if (data) {
        for (const cr of data.changeRequests) {
          if (cr.status === 'PENDING_REVIEW') {
            allPending.push(cr);
          }
        }
      }
    }
    setPendingRequests(allPending);
  };

  const handleReview = async (requestId: string, approve: boolean) => {
    setIsProcessing(true);
    try {
      await kernivaClient.reviewChangeRequest(requestId, approve, reviewerNote);
      await refreshData();
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-end p-2 sm:p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border-l border-white/15 h-full max-h-[96vh] rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-lg text-white">{t.kernivaDrawer.title}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                    {t.kernivaDrawer.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{t.kernivaDrawer.subtitle}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-cyan-800/40 text-[11px] text-cyan-200/90 mb-5 flex items-start gap-2">
            <Server className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong>Multi-Tenant Principle:</strong> Polylolli is the first customer-facing vertical. Kerniva manages CRM, Bookings, Pricing, and Policies. Direct database coupling is prohibited.
            </div>
          </div>

          <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'events'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Smart Events ({smartEvents.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('approvalQueue')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'approvalQueue'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Ops Queue ({pendingRequests.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'audit'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Audit Trail ({auditLogs.length})</span>
            </button>
          </div>

          {activeTab === 'events' && (
            <div className="space-y-3 max-h-[58vh] overflow-y-auto pr-1">
              {smartEvents.map((ev) => (
                <div key={ev.id} className="p-3.5 rounded-xl bg-slate-950 border border-white/10 text-xs flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-cyan-300 font-bold">{ev.eventType}</span>
                      <span className="text-[10px] text-slate-500">{new Date(ev.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div className="text-white font-semibold">{ev.title}</div>
                    <p className="text-slate-400">{ev.description}</p>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase shrink-0 ${
                      ev.severity === 'success'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : ev.severity === 'action_required'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {ev.severity}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'approvalQueue' && (
            <div className="space-y-4 max-h-[58vh] overflow-y-auto pr-1">
              {pendingRequests.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center text-xs text-slate-400">
                  <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  No pending change requests in the Kerniva queue.
                </div>
              ) : (
                pendingRequests.map((req) => (
                  <div key={req.id} className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 text-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-pink-300 font-bold">Booking: {req.bookingRef}</span>
                      <span className="text-[10px] text-amber-300 font-semibold uppercase">Pending Review</span>
                    </div>

                    <div>
                      <div className="text-white font-semibold">
                        Field to amend: <span className="text-amber-300">{req.field}</span>
                      </div>
                      <div className="text-slate-300 mt-0.5">
                        {req.currentValue} → <strong className="text-cyan-300">{req.requestedValue}</strong>
                      </div>
                      <p className="text-slate-400 italic mt-1">"{req.reason}"</p>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        Ops Decision Note:
                      </label>
                      <input
                        type="text"
                        value={reviewerNote}
                        onChange={(e) => setReviewerNote(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/15 text-white text-xs focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleReview(req.id, true)}
                        disabled={isProcessing}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 transition-all"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{t.kernivaDrawer.approveBtn}</span>
                      </button>

                      <button
                        onClick={() => handleReview(req.id, false)}
                        disabled={isProcessing}
                        className="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/30 font-semibold text-xs flex items-center gap-1 transition-all"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{t.kernivaDrawer.rejectBtn}</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-3 max-h-[58vh] overflow-y-auto pr-1">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-xl bg-slate-950 border border-white/10 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-cyan-300 font-bold">
                      {log.entityType} [{log.action}]
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-slate-300">
                    Actor: <span className="text-white font-medium">{log.performedBy}</span>
                  </div>
                  <p className="text-slate-400">{log.details}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-white/10 text-[11px] text-slate-500 flex items-center justify-between">
          <span>FRRM Group · Kerniva Core v1.4.2</span>
          <span>Tenant Isolated Mode</span>
        </div>
      </div>
    </div>
  );
};
