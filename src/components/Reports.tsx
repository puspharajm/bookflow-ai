import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Filter, Download, Calendar as CalendarIcon, TrendingUp } from "lucide-react";

const conversionData = [
  { name: 'Mon', visitors: 400, leads: 240, bookings: 140 },
  { name: 'Tue', visitors: 300, leads: 139, bookings: 100 },
  { name: 'Wed', visitors: 200, leads: 980, bookings: 120 },
  { name: 'Thu', visitors: 278, leads: 390, bookings: 200 },
  { name: 'Fri', visitors: 189, leads: 480, bookings: 218 },
  { name: 'Sat', visitors: 239, leads: 380, bookings: 250 },
  { name: 'Sun', visitors: 349, leads: 430, bookings: 300 },
];

const sourceData = [
  { name: 'Organic Search', value: 400 },
  { name: 'Social Media', value: 300 },
  { name: 'Direct Link', value: 300 },
  { name: 'Referral', value: 200 },
];
const COLORS = ['#FF4F00', '#8B5CF6', '#10B981', '#3B82F6'];

export default function Reports() {
  return (
    <div className="h-full flex flex-col relative max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Advanced Reports</h1>
          <p className="text-gray-400">Deep dive into your funnel, conversion rates, and audience sources.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white/5 hover:bg-white/10 text-white font-medium px-4 py-2.5 rounded-full transition-all border border-white/10 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" /> Last 7 Days
          </button>
          <button className="bg-[#FF4F00]/10 hover:bg-[#FF4F00]/20 text-[#FF4F00] font-medium px-4 py-2.5 rounded-full transition-all border border-[#FF4F00]/20 flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hidden-scrollbar pb-10 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Funnel Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Funnel Conversion (Daily)</h3>
              <button className="text-gray-400 hover:text-white"><Filter className="w-4 h-4" /></button>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    contentStyle={{ backgroundColor: '#0a0a0a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                  <Bar dataKey="visitors" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="leads" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="bookings" fill="#FF4F00" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Traffic Sources Pie Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col"
          >
            <h3 className="text-lg font-bold text-white mb-2">Traffic Sources</h3>
            <p className="text-xs text-gray-400 mb-6">Where your bookings originate from.</p>
            
            <div className="h-[200px] w-full relative mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0a0a0a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
                <span className="text-2xl font-bold text-white">1.2k</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">Total</span>
              </div>
            </div>

            <div className="space-y-2 mt-auto">
              {sourceData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                    {item.name}
                  </div>
                  <span className="font-bold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Highest Converting Day", value: "Wednesday", detail: "24% higher than avg" },
            { title: "Top Performing Service", value: "30-Min Discovery", detail: "42 Bookings this week" },
            { title: "Avg Time to Book", value: "4.2 Days", detail: "From first touch to booked" },
          ].map((insight, idx) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
              key={idx}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/5 rounded-2xl p-6"
            >
              <TrendingUp className="w-6 h-6 text-[#FF4F00] mb-4" />
              <h4 className="text-gray-400 text-sm font-medium mb-1">{insight.title}</h4>
              <p className="text-2xl font-bold text-white mb-2">{insight.value}</p>
              <p className="text-emerald-400 text-xs font-bold">{insight.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
