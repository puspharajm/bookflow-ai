import { useState } from "react";
import { motion } from "motion/react";
import { Play, Pause, Settings, Plus, Zap, ArrowRight, Activity, Clock } from "lucide-react";

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused";
  triggers: string[];
  actions: string[];
  lastRun: string;
  successRate: number;
}

const mockWorkflows: Workflow[] = [
  {
    id: "wf-1",
    name: "New Lead Onboarding",
    description: "Send welcome sequence when a new lead is added to CRM.",
    status: "active",
    triggers: ["Lead Created"],
    actions: ["Send Email", "Wait 2 Days", "Send SMS"],
    lastRun: "2 mins ago",
    successRate: 99.8
  },
  {
    id: "wf-2",
    name: "Appointment Reminder",
    description: "Notify clients 24 hours before their scheduled appointment.",
    status: "active",
    triggers: ["Time: 24h Before Appt"],
    actions: ["Send SMS", "Notify Staff"],
    lastRun: "1 hour ago",
    successRate: 100
  },
  {
    id: "wf-3",
    name: "No-show Reactivation",
    description: "Trigger sequence if a lead misses an appointment.",
    status: "paused",
    triggers: ["Status: No-show"],
    actions: ["Tag Contact", "Send Reactivation Email"],
    lastRun: "3 days ago",
    successRate: 85.5
  }
];

export default function Workflows() {
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows);

  const toggleStatus = (id: string) => {
    setWorkflows(workflows.map(wf => 
      wf.id === id ? { ...wf, status: wf.status === 'active' ? 'paused' : 'active' } : wf
    ));
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            Workflows <span className="px-2.5 py-0.5 rounded-full bg-[#FF4F00]/20 text-[#FF4F00] text-xs font-bold uppercase tracking-wider">Beta</span>
          </h1>
          <p className="text-gray-400">Automate your business logic with intelligent visual flows.</p>
        </div>
        <button className="bg-[#FF4F00] hover:bg-[#E64600] shadow-[0_0_15px_rgba(255,79,0,0.3)] text-white font-medium px-5 py-2.5 rounded-full transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" /> New Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto hidden-scrollbar pb-10">
        <div className="lg:col-span-2 space-y-4">
          {workflows.map((wf, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={wf.id} 
              className="bg-white/[0.02] backdrop-blur-md border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.04] transition-all group"
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#FF4F00] transition-colors">{wf.name}</h3>
                    <div className={`px-2 py-0.5 rounded-full text-xs font-bold border ${
                      wf.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                    }`}>
                      {wf.status.toUpperCase()}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{wf.description}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <button 
                    onClick={() => toggleStatus(wf.id)}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    {wf.status === 'active' ? <Pause className="w-4 h-4 text-gray-300" /> : <Play className="w-4 h-4 text-emerald-400 ml-1" />}
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <Settings className="w-4 h-4 text-gray-300" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 p-3 bg-black/20 rounded-xl border border-white/[0.02]">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium border border-blue-500/20">
                  <Zap className="w-3.5 h-3.5" />
                  {wf.triggers[0]}
                </div>
                {wf.actions.map((action, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-gray-600" />
                    <div className="px-3 py-1.5 bg-white/5 text-gray-300 rounded-lg text-xs font-medium border border-white/10">
                      {action}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4F00]/10 blur-[50px]" />
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#FF4F00]" />
              System Status
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-gray-400 text-sm">Engine Uptime</span>
                <span className="text-emerald-400 font-bold font-mono">99.99%</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-gray-400 text-sm">Avg Execution</span>
                <span className="text-white font-bold font-mono">45ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Tasks Queued</span>
                <span className="text-white font-bold font-mono">12</span>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              Recent Executions
            </h3>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-300 font-medium">New Lead Onboarding</p>
                    <p className="text-xs text-gray-500">Triggered by John Doe · Just now</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
