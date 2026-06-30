import { X, Phone, Mail, Clock, CalendarIcon } from "lucide-react";
import { CRMLead } from "../types";

interface ClientDetailsModalProps {
  lead: CRMLead | null;
  onClose: () => void;
}

export default function ClientDetailsModal({ lead, onClose }: ClientDetailsModalProps) {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050816]/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bento-card mx-4 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-white/10 flex justify-between items-start bg-gradient-to-r from-white/[0.05] to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#8B5CF6] flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              {lead.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">{lead.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300 capitalize border border-white/5">
                  Status: {lead.status}
                </span>
                <span className="text-sm font-semibold text-[#FBBF24]">₹{lead.value}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider">
                <Mail className="w-4 h-4 text-[#06B6D4]" /> Email
              </div>
              <div className="text-sm text-white font-medium truncate">{lead.email}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider">
                <Phone className="w-4 h-4 text-[#8B5CF6]" /> Phone
              </div>
              <div className="text-sm text-white font-medium">{lead.phone}</div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Recent Activity</h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white/20 bg-[#050816] text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                   <div className="w-2 h-2 bg-[#06B6D4] rounded-full"></div>
                </div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.25rem)] p-4 rounded-xl bg-white/5 border border-white/5 group-[.is-active]:border-[#06B6D4]/30 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-semibold text-white text-sm">Last Contact</div>
                    <time className="text-xs text-gray-500">{lead.lastContact}</time>
                  </div>
                  <div className="text-xs text-gray-400">Followed up via WhatsApp message regarding upcoming availability.</div>
                </div>
              </div>
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white/20 bg-[#050816] text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                </div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.25rem)] p-4 rounded-xl bg-white/5 border border-white/5 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium text-white/80 text-sm">Lead Created</div>
                    <time className="text-xs text-gray-500">1w ago</time>
                  </div>
                  <div className="text-xs text-gray-400">Entered via landing page intake form.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/10 flex gap-3">
          <button className="flex-1 py-2.5 rounded-xl text-white bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium flex justify-center items-center gap-2">
             <CalendarIcon className="w-4 h-4" /> Book Appointment
          </button>
          <button className="flex-1 py-2.5 rounded-xl text-black bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] hover:opacity-90 transition-all text-sm font-semibold shadow-[0_0_15px_rgba(139,92,246,0.3)]">
             Convert Lead
          </button>
        </div>
      </div>
    </div>
  );
}
