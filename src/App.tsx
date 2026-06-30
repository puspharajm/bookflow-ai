import { useState, useEffect } from "react";
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
import ComingSoon from "./components/ComingSoon";
import { navItems } from "./data";

export default function App() {
  const [view, setView] = useState<"landing" | "login" | "signup" | "app">("landing");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is already logged in
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
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <CommandBar setActiveTab={setActiveTab} />
      
      {/* Logout button (Temporary placement for testing) */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] rounded-lg text-sm transition-colors"
        >
          Logout {user?.name ? `(${user.name})` : ''}
        </button>
      </div>

      <main className="flex-1 ml-64 overflow-y-auto w-full h-full p-8 hidden-scrollbar relative">
        {/* Background Ambient Glows */}
        <div className="fixed top-0 left-1/4 w-[800px] h-[400px] bg-[#FF4F00]/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "crm" && <CRMPipeline />}
        {activeTab === "appointments" && <Appointments />}
        {activeTab === "revenue" && <Revenue />}
        {activeTab === "integrations" && <Integrations />}
        {activeTab === "admin" && <WhiteLabelSettings />}
        
        {/* Fallback for all other tabs */}
        {!["dashboard", "crm", "appointments", "revenue", "integrations", "admin"].includes(activeTab) && (
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
