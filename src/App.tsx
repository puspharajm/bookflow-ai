import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import CRMPipeline from "./components/CRMPipeline";
import WhiteLabelSettings from "./components/WhiteLabelSettings";
import Integrations from "./components/Integrations";
import CommandBar from "./components/CommandBar";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Appointments from "./components/Appointments";
import Revenue from "./components/Revenue";
import Workflows from "./components/Workflows";
import RunTimeline from "./components/RunTimeline";
import Monitoring from "./components/Monitoring";
import BookingLinks from "./components/BookingLinks";
import Reports from "./components/Reports";
import Reconciliation from "./components/Reconciliation";
import SEOGuide from "./components/SEOGuide";
import SearchConsole from "./components/SearchConsole";
import SitemapAudit from "./components/SitemapAudit";
import Panels from "./components/Panels";
import ComingSoon from "./components/ComingSoon";
import { navItems } from "./data";

export default function App() {
  const [view, setView] = useState<"landing" | "login" | "signup" | "app">("landing");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setView("app");
    }
  }, []);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    setView("app");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setView("landing");
  };

  if (view === "landing") {
    return <LandingPage onNavigateToDashboard={() => setView("login")} />;
  }

  if (view === "login") {
    return (
      <Login 
        onNavigateToSignup={() => setView("signup")} 
        onLoginSuccess={handleLoginSuccess} 
      />
    );
  }

  if (view === "signup") {
    return (
      <Signup 
        onNavigateToLogin={() => setView("login")} 
        onSignupSuccess={handleLoginSuccess} 
      />
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#060606] overflow-hidden text-white font-sans selection:bg-[#FF4F00] selection:text-white relative">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        user={user}
        onLogout={handleLogout}
      />
      <CommandBar setActiveTab={setActiveTab} />
      
      {/* Mobile Header (Only visible on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#FF4F00] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight text-white">Bookflow.ai</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-gray-300 hover:text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <main className="flex-1 w-full h-full md:ml-64 p-4 pt-20 md:p-8 md:pt-8 overflow-y-auto hidden-scrollbar relative transition-all duration-300">
        {/* Background Ambient Glows */}
        <div className="fixed top-0 left-1/4 w-[800px] h-[400px] bg-[#FF4F00]/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "crm" && <CRMPipeline />}
        {activeTab === "appointments" && <Appointments />}
        {activeTab === "revenue" && <Revenue />}
        {activeTab === "integrations" && <Integrations />}
        {activeTab === "admin" && <WhiteLabelSettings />}
        {activeTab === "workflows" && <Workflows />}
        {activeTab === "timeline" && <RunTimeline />}
        {activeTab === "monitoring" && <Monitoring />}
        {activeTab === "booking_links" && <BookingLinks />}
        {activeTab === "reports" && <Reports />}
        {activeTab === "reconciliation" && <Reconciliation />}
        {activeTab === "seo" && <SEOGuide />}
        {activeTab === "search_console" && <SearchConsole />}
        {activeTab === "sitemap" && <SitemapAudit />}
        {activeTab === "panels" && <Panels />}
        
        {/* Fallback for all other tabs (e.g. settings) */}
        {!["dashboard", "crm", "appointments", "revenue", "integrations", "admin", "workflows", "timeline", "monitoring", "booking_links", "reports", "reconciliation", "seo", "search_console", "sitemap", "panels"].includes(activeTab) && (
          <ComingSoon 
            title={
              navItems.flatMap(g => g.items).find(i => i.id === activeTab)?.label || 
              activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
            } 
          />
        )}
      </main>
    </div>
  );
}
