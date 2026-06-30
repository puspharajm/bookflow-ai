import { Calendar, Link as LinkIcon, CheckCircle2, Video } from "lucide-react";

export default function Integrations() {
  const integrations = [
    {
      id: "google_calendar",
      name: "Google Calendar",
      description: "Two-way sync with your personal Google Calendar.",
      icon: Calendar,
      connected: true,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      id: "outlook_calendar",
      name: "Outlook Calendar",
      description: "Sync your bookings with Microsoft Outlook.",
      icon: Calendar,
      connected: false,
      color: "text-blue-600",
      bgColor: "bg-blue-600/10"
    },
    {
      id: "zoom",
      name: "Zoom",
      description: "Automatically generate Zoom meeting links for online appointments.",
      icon: Video,
      connected: false,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10"
    },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Service Integrations</h1>
        <p className="text-gray-400">Manage external calendar connections and service providers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          return (
            <div key={integration.id} className="bento-card p-6 flex flex-col group hover:border-white/20 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${integration.bgColor}`}>
                  <Icon className={`w-6 h-6 ${integration.color}`} />
                </div>
                {integration.connected && (
                  <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> Connected
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">{integration.name}</h3>
              <p className="text-sm text-gray-400 mb-6 flex-1">{integration.description}</p>
              
              <button 
                className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all flex justify-center items-center gap-2 ${
                  integration.connected 
                    ? "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5" 
                    : "bg-[#06B6D4]/10 text-[#06B6D4] hover:bg-[#06B6D4]/20 border border-[#06B6D4]/20"
                }`}
              >
                <LinkIcon className="w-4 h-4" /> 
                {integration.connected ? "Manage Connection" : "Connect"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
