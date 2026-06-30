import { motion } from "motion/react";
import { CheckCircle2, XCircle, AlertCircle, Clock, Zap, ArrowRight, Webhook, Mail, MessageSquare } from "lucide-react";

interface TimelineEvent {
  id: string;
  type: "webhook" | "email" | "sms" | "automation";
  status: "success" | "failed" | "pending";
  title: string;
  description: string;
  time: string;
  metadata?: string;
}

const mockEvents: TimelineEvent[] = [
  {
    id: "evt-1",
    type: "automation",
    status: "success",
    title: "Workflow Completed",
    description: "New Lead Onboarding successfully finished for Sarah Connor.",
    time: "2 mins ago",
    metadata: "Execution time: 42ms"
  },
  {
    id: "evt-2",
    type: "email",
    status: "success",
    title: "Email Sent",
    description: "Welcome Packet sent to sarah@example.com.",
    time: "3 mins ago"
  },
  {
    id: "evt-3",
    type: "webhook",
    status: "success",
    title: "Webhook Received",
    description: "Stripe payout confirmation received.",
    time: "1 hour ago",
    metadata: "Payload size: 1.2kb"
  },
  {
    id: "evt-4",
    type: "sms",
    status: "failed",
    title: "SMS Delivery Failed",
    description: "Could not send reminder to +1 (555) 000-0000.",
    time: "3 hours ago",
    metadata: "Error 400: Invalid Number"
  },
  {
    id: "evt-5",
    type: "automation",
    status: "pending",
    title: "Scheduled Task Queued",
    description: "Follow-up email queued for John Doe.",
    time: "5 hours ago",
    metadata: "Executes at 09:00 AM UTC"
  }
];

export default function RunTimeline() {
  const getIcon = (type: string) => {
    switch (type) {
      case "webhook": return <Webhook className="w-4 h-4 text-purple-400" />;
      case "email": return <Mail className="w-4 h-4 text-blue-400" />;
      case "sms": return <MessageSquare className="w-4 h-4 text-emerald-400" />;
      case "automation": return <Zap className="w-4 h-4 text-[#FF4F00]" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "failed": return <XCircle className="w-5 h-5 text-red-500" />;
      case "pending": return <Clock className="w-5 h-5 text-amber-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="h-full flex flex-col relative max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-8 relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Run Timeline</h1>
          <p className="text-gray-400">Chronological feed of all system events and automations.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors">
            Filter
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors">
            Export Logs
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hidden-scrollbar pb-10">
        <div className="relative pl-6 border-l border-white/10 space-y-8 ml-4">
          {mockEvents.map((event, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={event.id}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[35px] top-1 bg-[#0a0a0a] p-1">
                {getStatusIcon(event.status)}
              </div>

              <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.04] transition-colors group">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      {getIcon(event.type)}
                    </div>
                    <h3 className="text-lg font-bold text-white">{event.title}</h3>
                  </div>
                  <span className="text-xs font-medium text-gray-500 whitespace-nowrap">{event.time}</span>
                </div>
                
                <p className="text-sm text-gray-400 mb-3 ml-11">{event.description}</p>
                
                {event.metadata && (
                  <div className="ml-11 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-xs font-mono text-gray-500">
                    <ArrowRight className="w-3 h-3 text-gray-600" />
                    {event.metadata}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
