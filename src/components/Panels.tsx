import { useState } from "react";
import { motion } from "motion/react";
import { LayoutPanelLeft, GripVertical, Eye, EyeOff, Plus, Save } from "lucide-react";

interface Panel {
  id: string;
  name: string;
  description: string;
  visible: boolean;
}

const initialPanels: Panel[] = [
  { id: "p1", name: "Upcoming Appointments", description: "Shows next 5 scheduled events.", visible: true },
  { id: "p2", name: "Active Leads Pipeline", description: "Kanban overview of leads.", visible: true },
  { id: "p3", name: "Revenue (Closed)", description: "YTD revenue chart.", visible: true },
  { id: "p4", name: "Workflow Activity", description: "Recent automation runs.", visible: false },
  { id: "p5", name: "AI Insights", description: "Auto-generated business insights.", visible: true },
];

export default function Panels() {
  const [panels, setPanels] = useState(initialPanels);

  const toggleVisibility = (id: string) => {
    setPanels(panels.map(p => p.id === id ? { ...p, visible: !p.visible } : p));
  };

  return (
    <div className="h-full flex flex-col relative max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Dashboard Panels</h1>
          <p className="text-gray-400">Customize which widgets and panels appear on the main Overview.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white/5 hover:bg-white/10 text-white font-medium px-4 py-2.5 rounded-full transition-all border border-white/10 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create Custom
          </button>
          <button className="bg-[#FF4F00] hover:bg-[#E64600] text-white font-medium px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,79,0,0.3)]">
            <Save className="w-4 h-4" /> Save Layout
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hidden-scrollbar pb-10">
        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <LayoutPanelLeft className="w-5 h-5 text-gray-400" /> Layout Editor
          </h3>

          <div className="space-y-3">
            {panels.map((panel, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={panel.id}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  panel.visible ? 'bg-white/[0.04] border-white/10' : 'bg-white/[0.01] border-white/5 opacity-60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <button className="cursor-grab text-gray-600 hover:text-gray-400">
                    <GripVertical className="w-5 h-5" />
                  </button>
                  <div>
                    <h4 className="text-white font-medium">{panel.name}</h4>
                    <p className="text-sm text-gray-500">{panel.description}</p>
                  </div>
                </div>

                <button 
                  onClick={() => toggleVisibility(panel.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    panel.visible ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' : 'bg-white/5 text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {panel.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl border border-dashed border-white/20 flex flex-col items-center justify-center text-center bg-white/[0.01]">
            <LayoutPanelLeft className="w-8 h-8 text-gray-600 mb-2" />
            <p className="text-gray-400 font-medium">Drag panels to reorder them on the Dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
