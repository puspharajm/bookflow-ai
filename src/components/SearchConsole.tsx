import { motion } from "motion/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, MousePointerClick, Eye, TrendingUp, Filter } from "lucide-react";

const searchData = Array.from({ length: 30 }).map((_, i) => ({
  date: `Jun ${i + 1}`,
  clicks: Math.floor(Math.random() * 50) + 10 + (i * 2),
  impressions: Math.floor(Math.random() * 500) + 200 + (i * 15),
}));

export default function SearchConsole() {
  const totalClicks = searchData.reduce((sum, item) => sum + item.clicks, 0);
  const totalImpressions = searchData.reduce((sum, item) => sum + item.impressions, 0);
  const avgCtr = ((totalClicks / totalImpressions) * 100).toFixed(1);

  return (
    <div className="h-full flex flex-col relative max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            Search Console <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">Connected</span>
          </h1>
          <p className="text-gray-400">Monitor your organic search performance on Google.</p>
        </div>
        <button className="bg-white/5 hover:bg-white/10 text-white font-medium px-4 py-2.5 rounded-full transition-all border border-white/10 flex items-center gap-2">
          <Filter className="w-4 h-4" /> Last 30 Days
        </button>
      </div>

      <div className="flex-1 overflow-y-auto hidden-scrollbar pb-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0A0A0A] border-t-[3px] border-[#8B5CF6] border-x border-b border-x-white/5 border-b-white/5 rounded-2xl p-6 relative overflow-hidden group hover:bg-white/[0.02] cursor-pointer transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#8B5CF6]/10"><MousePointerClick className="w-5 h-5 text-[#8B5CF6]" /></div>
              <h3 className="text-gray-400 font-medium">Total Clicks</h3>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{totalClicks.toLocaleString()}</p>
            <p className="text-[#8B5CF6] text-sm font-bold flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +12% vs last month</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#0A0A0A] border-t-[3px] border-[#10B981] border-x border-b border-x-white/5 border-b-white/5 rounded-2xl p-6 relative overflow-hidden group hover:bg-white/[0.02] cursor-pointer transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#10B981]/10"><Eye className="w-5 h-5 text-[#10B981]" /></div>
              <h3 className="text-gray-400 font-medium">Total Impressions</h3>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{totalImpressions.toLocaleString()}</p>
            <p className="text-[#10B981] text-sm font-bold flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +45% vs last month</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0A0A0A] border-t-[3px] border-[#3B82F6] border-x border-b border-x-white/5 border-b-white/5 rounded-2xl p-6 relative overflow-hidden group hover:bg-white/[0.02] cursor-pointer transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#3B82F6]/10"><Activity className="w-5 h-5 text-[#3B82F6]" /></div>
              <h3 className="text-gray-400 font-medium">Average CTR</h3>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{avgCtr}%</p>
            <p className="text-[#3B82F6] text-sm font-bold flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +1.2% vs last month</p>
          </motion.div>
        </div>

        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
          <h3 className="text-lg font-bold text-white mb-6">Performance over time</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={searchData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis yAxisId="left" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
                <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} dx={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area yAxisId="left" type="monotone" dataKey="clicks" stroke="#8B5CF6" strokeWidth={3} fill="url(#colorClicks)" name="Clicks" />
                <Area yAxisId="right" type="monotone" dataKey="impressions" stroke="#10B981" strokeWidth={2} fill="none" strokeDasharray="5 5" name="Impressions" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 bg-black/40 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <div className="col-span-6">Top Queries</div>
            <div className="col-span-2 text-right">Clicks</div>
            <div className="col-span-2 text-right">Impressions</div>
            <div className="col-span-2 text-right">CTR</div>
          </div>
          <div className="divide-y divide-white/5">
            {[
              { query: "bookflow ai", c: 450, i: 1200 },
              { query: "best booking software", c: 120, i: 3400 },
              { query: "automate appointments", c: 85, i: 890 },
              { query: "bookflow pricing", c: 60, i: 150 },
            ].map((q, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-4 p-4 hover:bg-white/[0.02] transition-colors items-center">
                <div className="col-span-6 text-sm font-medium text-white flex items-center gap-2">
                  <Search className="w-3 h-3 text-gray-500" /> {q.query}
                </div>
                <div className="col-span-2 text-right text-sm text-gray-300">{q.c}</div>
                <div className="col-span-2 text-right text-sm text-gray-300">{q.i}</div>
                <div className="col-span-2 text-right text-sm text-gray-300">{((q.c/q.i)*100).toFixed(1)}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
