import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import CRMPipeline from "./components/CRMPipeline";
import WhiteLabelSettings from "./components/WhiteLabelSettings";
import Integrations from "./components/Integrations";
import CommandBar from "./components/CommandBar";
import LandingPage from "./components/LandingPage";

export default function App() {
  const [view, setView] = useState<"landing" | "app">("landing");
  const [activeTab, setActiveTab] = useState("dashboard");

  if (view === "landing") {
    return <LandingPage onNavigateToDashboard={() => setView("app")} />;
  }

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] overflow-hidden text-white font-sans selection:bg-[#FF4F00] selection:text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <CommandBar setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 overflow-y-auto w-full h-full p-8 hidden-scrollbar relative">
        {/* Background Ambient Glows - Updated for new theme */}
        <div className="fixed top-0 left-1/4 w-[800px] h-[400px] bg-[#FF4F00]/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "calendar" && (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-gray-400">Calendar View Upcoming</h2>
          </div>
        )}
        {activeTab === "crm" && <CRMPipeline />}
        {activeTab === "integrations" && <Integrations />}
        {activeTab === "automations" && (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-gray-400">Automations View Upcoming</h2>
          </div>
        )}
        {activeTab === "settings" && <WhiteLabelSettings />}
      </main>
    </div>
  );
}
