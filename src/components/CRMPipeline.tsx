import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MoreHorizontal, Download, RefreshCw, AlertCircle, Loader2 } from "lucide-react";
import ClientDetailsModal from "./ClientDetailsModal";
import { CRMLead } from "../types";

export default function CRMPipeline() {
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null);
  const [leads, setLeads] = useState<CRMLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");

  const columns = [
    { id: 'new', label: 'New Leads', color: 'border-blue-500/30 bg-blue-500/10 text-blue-400', glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]' },
    { id: 'interested', label: 'Interested', color: 'border-amber-500/30 bg-amber-500/10 text-amber-400', glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]' },
    { id: 'booked', label: 'Appointment Booked', color: 'border-purple-500/30 bg-purple-500/10 text-purple-400', glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]' },
    { id: 'converted', label: 'Converted', color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400', glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]' },
  ];

  const fetchLeads = async (refresh = false) => {
    if (refresh) setIsRefreshing(true);
    else setLoading(true);
    
    setError("");
    
    try {
      const res = await fetch('/api/leads');
      if (!res.ok) {
        throw new Error('Failed to fetch CRM leads. Is the backend running?');
      }
      const data = await res.json();
      setLeads(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Name,Email,Phone,Status,Value,Last Contact\n"
        + leads.map(lead => `${lead.name},${lead.email},${lead.phone},${lead.status},${lead.value},${lead.lastContact}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "crm_leads_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const groupedLeads = columns.reduce((acc, col) => {
    acc[col.id] = leads.filter(l => l.status === col.id);
    return acc;
  }, {} as Record<string, CRMLead[]>);

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">CRM Pipeline</h1>
          <p className="text-gray-400">Manage your leads with real-time data.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => fetchLeads(true)} 
            disabled={loading || isRefreshing}
            className="bg-white/5 hover:bg-white/10 text-gray-300 font-medium px-4 py-2.5 rounded-full transition-all border border-white/10 flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={exportToCSV} 
            disabled={leads.length === 0}
            className="bg-white/5 hover:bg-white/10 text-white font-medium px-4 py-2.5 rounded-full transition-all border border-white/10 flex items-center gap-2 disabled:opacity-50"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="bg-[#FF4F00] hover:bg-[#E64600] shadow-[0_0_15px_rgba(255,79,0,0.3)] text-white font-medium px-5 py-2.5 rounded-full transition-all border border-[#FF4F00]">
            + Add Lead
          </button>
        </div>
      </div>

      {error ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Error Loading CRM</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <button onClick={() => fetchLeads()} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-sm font-medium">
            Try Again
          </button>
        </div>
      ) : loading ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 text-[#FF4F00] animate-spin mb-4" />
          <p className="text-gray-400 font-medium">Loading live pipeline...</p>
        </div>
      ) : (
        <div className="flex-1 flex gap-6 overflow-x-auto pb-6 relative z-10 hidden-scrollbar">
          {columns.map((col, idx) => (
            <div key={col.id} className="min-w-[320px] max-w-[320px] flex flex-col">
              <div className={`px-4 py-2 border rounded-full text-xs font-semibold mb-6 w-max shadow-sm backdrop-blur-sm ${col.color}`}>
                {col.label} ({groupedLeads[col.id]?.length || 0})
              </div>
              
              <div className="flex-1 space-y-4">
                <AnimatePresence>
                  {groupedLeads[col.id]?.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-32 rounded-2xl border border-dashed border-white/10 flex items-center justify-center bg-white/[0.01]"
                    >
                      <span className="text-xs text-gray-500 font-medium">No leads in this stage</span>
                    </motion.div>
                  ) : (
                    groupedLeads[col.id]?.map((lead, i) => (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: idx * 0.1 + i * 0.05, duration: 0.4, type: "spring", bounce: 0 }}
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className={`bg-white/[0.02] backdrop-blur-md border border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.2)] rounded-2xl p-5 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 cursor-pointer group ${col.glow}`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold text-white tracking-tight">{lead.name}</h4>
                          <button 
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-500 hover:text-white transition-colors"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 mb-5">
                          ₹{lead.value}
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 border-t border-white/[0.04] pt-4">
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">
                            {lead.lastContact}
                          </span>
                          <div className="flex gap-2">
                            <button 
                              onClick={(e) => e.stopPropagation()}
                              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                              title="Call"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={(e) => e.stopPropagation()}
                              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                              title="Email"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      )}

      <ClientDetailsModal 
        lead={selectedLead} 
        onClose={() => setSelectedLead(null)} 
      />
    </div>
  );
}
