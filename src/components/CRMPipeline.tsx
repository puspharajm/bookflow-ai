import { useState } from "react";
import { mockLeadPipeline } from "../data";
import { motion } from "motion/react";
import { Mail, Phone, MoreHorizontal, Download } from "lucide-react";
import ClientDetailsModal from "./ClientDetailsModal";
import { CRMLead } from "../types";

export default function CRMPipeline() {
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null);

  const columns = [
    { id: 'new', label: 'New Leads', color: 'border-blue-500/30 bg-blue-500/10 text-blue-400' },
    { id: 'interested', label: 'Interested', color: 'border-amber-500/30 bg-amber-500/10 text-amber-400' },
    { id: 'booked', label: 'Appointment Booked', color: 'border-purple-500/30 bg-purple-500/10 text-purple-400' },
    { id: 'converted', label: 'Converted', color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' },
  ];

  const exportToCSV = () => {
    const allLeads = Object.values(mockLeadPipeline).flat();
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Name,Email,Phone,Status,Value,Last Contact\n"
        + allLeads.map(lead => `${lead.name},${lead.email},${lead.phone},${lead.status},${lead.value},${lead.lastContact}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "crm_leads_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">CRM Pipeline</h1>
          <p className="text-gray-400">Manage your leads and customer journeys.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={exportToCSV} className="bg-white/5 hover:bg-white/10 text-white font-medium px-4 py-2.5 rounded-full transition-all border border-white/10 flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white font-medium px-5 py-2.5 rounded-full transition-all border border-white/10">
            + Add Lead
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-6">
        {columns.map((col, idx) => (
          <div key={col.id} className="min-w-[320px] max-w-[320px] flex flex-col">
            <div className={`px-4 py-2 border rounded-full text-xs font-semibold mb-4 w-max ${col.color}`}>
              {col.label} ({mockLeadPipeline[col.id]?.length || 0})
            </div>
            
            <div className="flex-1 space-y-4">
              {mockLeadPipeline[col.id]?.map((lead, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + i * 0.05 }}
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="bento-card p-4 hover:border-white/20 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-white">{lead.name}</h4>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-500 hover:text-white transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-4">
                    ₹{lead.value}
                  </div>
                  
                  <div className="flex items-center gap-3 mt-4">
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 flex justify-center items-center gap-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-300 transition-colors"
                    >
                      <Phone className="w-3 h-3" /> Call
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 flex justify-center items-center gap-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-300 transition-colors"
                    >
                      <Mail className="w-3 h-3" /> Email
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ClientDetailsModal 
        lead={selectedLead} 
        onClose={() => setSelectedLead(null)} 
      />
    </div>
  );
}
