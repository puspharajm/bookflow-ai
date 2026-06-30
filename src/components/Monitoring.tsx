import { motion } from "motion/react";
import { Activity, Server, Database, Globe, ArrowUpRight, ArrowDownRight, CheckCircle2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const latencyData = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  latency: Math.floor(Math.random() * 50) + 20,
  traffic: Math.floor(Math.random() * 500) + 100
}));

export default function Monitoring() {
  return (
    <div className="h-full flex flex-col relative">
      <div className="flex justify-between items-end mb-8 relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Monitoring</h1>
          <p className="text-gray-400">Real-time system health and performance metrics.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-400 text-sm font-bold">All Systems Operational</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hidden-scrollbar pb-10 space-y-6">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "API Uptime", value: "99.99%", icon: Server, color: "emerald", change: "+0.01%" },
            { label: "Database Load", value: "14%", icon: Database, color: "blue", change: "-2%" },
            { label: "Avg Latency", value: "32ms", icon: Activity, color: "amber", change: "+5ms" },
            { label: "Global Traffic", value: "24.5k", icon: Globe, color: "purple", change: "+12%" },
          ].map((stat, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={idx}
              className="bg-white/[0.02] backdrop-blur-md border border-white/[0.06] rounded-2xl p-5"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-400`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${stat.change.startsWith('+') && stat.label !== "Avg Latency" ? 'text-emerald-500' : 'text-gray-500'}`}>
                  {stat.change}
                  {stat.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
            <h3 className="text-lg font-bold text-white mb-6">Global Latency (ms)</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={latencyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0a0a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#F59E0B' }}
                  />
                  <Area type="monotone" dataKey="latency" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#colorLatency)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">Active Services</h3>
              <div className="space-y-4">
                {['Authentication API', 'Postgres Database', 'Redis Cache', 'Stripe Webhooks', 'Email Service'].map((service, i) => (
                  <div key={i} className="flex justify-between items-center pb-3 border-b border-white/5 last:border-0 last:pb-0">
                    <span className="text-sm text-gray-300 font-medium">{service}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">Storage Usage</h3>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-gray-400">Database</span>
                <span className="text-white font-bold">42GB / 100GB</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[42%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
