import { useEffect, useState } from "react";
import { Search, Users, Calendar as CalendarIcon, LayoutDashboard, Loader2 } from "lucide-react";
import { navItems } from "../data";
import { CRMLead } from "../types";

interface CommandBarProps {
  setActiveTab: (tab: string) => void;
}

export default function CommandBar({ setActiveTab }: CommandBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  
  const [leads, setLeads] = useState<CRMLead[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Fetch live data when command bar opens
      const fetchData = async () => {
        setLoading(true);
        try {
          const [leadsRes, apptsRes] = await Promise.all([
            fetch('/api/leads'),
            fetch('/api/appointments')
          ]);
          if (leadsRes.ok) setLeads(await leadsRes.json());
          if (apptsRes.ok) setAppointments(await apptsRes.json());
        } catch (error) {
          console.error("Failed to fetch command bar data", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const lowerQuery = query.toLowerCase();

  const filteredNav = query ? navItems.filter((item) =>
    item.label.toLowerCase().includes(lowerQuery)
  ) : navItems;

  const filteredLeads = query ? leads.filter(lead => 
    lead.name.toLowerCase().includes(lowerQuery) || 
    lead.email.toLowerCase().includes(lowerQuery) || 
    lead.phone.toLowerCase().includes(lowerQuery)
  ).slice(0, 3) : [];

  const filteredAppointments = query ? appointments.filter(apt => 
    apt.customerName.toLowerCase().includes(lowerQuery) ||
    apt.service.toLowerCase().includes(lowerQuery) 
  ).slice(0, 3) : [];

  const handleAction = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-[#050816]/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bento-card p-4 mx-4 border border-white/20 shadow-2xl bg-[#050816]">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search commands, leads, or appointments..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none placeholder:text-gray-500"
            autoFocus
          />
          {loading && <Loader2 className="w-4 h-4 text-[#FF4F00] animate-spin" />}
        </div>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto hidden-scrollbar">
          {filteredNav.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Navigation</div>
              <div className="space-y-1">
                {filteredNav.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleAction(item.id)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/10 text-left transition-colors text-white/80 hover:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <LayoutDashboard className="w-4 h-4 text-gray-400" />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-xs text-gray-500 border border-white/10 px-2 py-1 rounded bg-white/5">Jump to</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredLeads.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Clients</div>
              <div className="space-y-1">
                {filteredLeads.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => handleAction("crm")}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/10 text-left transition-colors text-white/80 hover:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-[#06B6D4]" />
                      <div>
                        <div className="text-sm">{lead.name}</div>
                        <div className="text-xs text-gray-500">{lead.email}</div>
                      </div>
                    </div>
                    <span className="text-xs text-[#06B6D4] opacity-50">View in CRM</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredAppointments.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Appointments</div>
              <div className="space-y-1">
                {filteredAppointments.map((apt) => (
                  <button
                    key={apt.id}
                    onClick={() => handleAction("calendar")}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/10 text-left transition-colors text-white/80 hover:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="w-4 h-4 text-[#8B5CF6]" />
                      <div>
                        <div className="text-sm">{apt.customerName}</div>
                        <div className="text-xs text-gray-500">{apt.date} at {apt.time} • {apt.service}</div>
                      </div>
                    </div>
                    <span className="text-xs text-[#8B5CF6] opacity-50">View in Calendar</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredNav.length === 0 && filteredLeads.length === 0 && filteredAppointments.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500 text-sm">No results found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
