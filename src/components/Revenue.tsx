import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, AlertCircle, Loader2 } from "lucide-react";

export default function Revenue() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRevenue = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/revenue');
      if (!res.ok) throw new Error('Failed to fetch revenue data');
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalBookings = data.reduce((sum, item) => sum + item.bookings, 0);

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Revenue Analytics</h1>
          <p className="text-gray-400">Track your financial performance in real-time.</p>
        </div>
        <button className="bg-white/5 hover:bg-white/10 text-white font-medium px-4 py-2.5 rounded-full transition-all border border-white/10">
          Download Report
        </button>
      </div>

      {error ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Failed to load analytics</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <button onClick={fetchRevenue} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium">
            Try Again
          </button>
        </div>
      ) : loading ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 text-[#FF4F00] animate-spin mb-4" />
          <p className="text-gray-400 font-medium">Loading live analytics...</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto hidden-scrollbar pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.06] rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-gray-400 font-medium text-sm">Total Revenue (YTD)</p>
                  <h3 className="text-3xl font-bold text-white">₹{totalRevenue.toLocaleString()}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>+12.5% from last year</span>
              </div>
            </div>

            <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.06] rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-400 font-medium text-sm">Total Bookings (YTD)</p>
                  <h3 className="text-3xl font-bold text-white">{totalBookings}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>+8.2% from last year</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 w-full shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#FF4F00]/50 to-transparent" />
            <h3 className="text-xl font-bold text-white mb-6">Revenue Growth</h3>
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF4F00" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FF4F00" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.4)" 
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.4)" 
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    dx={-10}
                    tickFormatter={(value) => `₹${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(10,10,10,0.9)', 
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}
                    itemStyle={{ color: '#FF4F00', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#FF4F00" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
