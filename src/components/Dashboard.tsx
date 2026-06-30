import { useState, useEffect } from "react";
import { ArrowUpRight, TrendingUp, Users, Calendar as CalendarIcon, DollarSign, Zap, Activity } from "lucide-react";
import { motion } from "motion/react";

interface Appointment {
  id: string;
  customerName: string;
  service: string;
  date: string;
  time: string;
  status: string;
  staff: string;
}

interface CRMLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  value: number;
  lastContact: string;
}

interface RevenueData {
  name: string;
  revenue: number;
  bookings: number;
}

export default function Dashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [leads, setLeads] = useState<CRMLead[]>([]);
  const [revenue, setRevenue] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [apptsRes, leadsRes, revRes] = await Promise.all([
          fetch('/api/appointments'),
          fetch('/api/leads'),
          fetch('/api/revenue')
        ]);
        
        if (apptsRes.ok && leadsRes.ok && revRes.ok) {
          const [apptsData, leadsData, revData] = await Promise.all([
            apptsRes.json(),
            leadsRes.json(),
            revRes.json()
          ]);
          setAppointments(apptsData);
          setLeads(leadsData);
          setRevenue(revData);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Compute Stats
  const activeLeadsCount = leads.filter(l => l.status !== 'converted').length;
  const closedRevenue = leads
    .filter(l => l.status === 'converted')
    .reduce((sum, lead) => sum + lead.value, 0);
  const totalLeadsValue = leads.reduce((sum, lead) => sum + lead.value, 0);
  const conversionRate = leads.length > 0 
    ? Math.round((leads.filter(l => l.status === 'converted').length / leads.length) * 100) 
    : 0;

  const statCards = [
    { title: "Upcoming appointments", value: loading ? "..." : String(appointments.length), change: "+12%", icon: CalendarIcon },
    { title: "Active leads", value: loading ? "..." : String(activeLeadsCount), change: "+8%", icon: Users },
    { title: "Revenue (closed)", value: loading ? "..." : `$${closedRevenue}`, change: "+24%", icon: TrendingUp },
    { title: "Workflow runs", value: loading ? "..." : String(leads.length), change: "100% ok", icon: Zap },
    { title: "Workflow revenue", value: loading ? "..." : `$${totalLeadsValue}`, change: "attributed", icon: DollarSign },
    { title: "Conversion rate", value: loading ? "..." : `${conversionRate}%`, change: "+3%", icon: Activity },
  ];

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold tracking-tight text-white">Super Admin <span className="text-gray-500 font-normal">· Overview</span></h1>
        <div className="text-sm text-gray-500">Tuesday, June 30</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="bento-card p-5 relative flex flex-col justify-between min-h-[120px]"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-white/5 text-[#FF4F00]">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-green-500">
                {stat.change}
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <h3 className="text-gray-500 text-xs font-medium">{stat.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Workflow Runs Section */}
        <div className="lg:col-span-2 bento-card p-6 min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-white">Workflow runs</h2>
            <span className="text-xs text-gray-500">Last {appointments.length} runs</span>
          </div>
          
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto hidden-scrollbar pr-2 max-h-[300px]">
            {appointments.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm text-gray-500">
                  No workflow runs yet. Build a workflow and trigger a booking to see activity here.
                </p>
              </div>
            ) : (
              appointments.map((appt) => (
                <div key={appt.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors">
                  <div>
                    <h4 className="font-bold text-white text-sm">{appt.customerName}</h4>
                    <p className="text-xs text-gray-400 mt-1">{appt.service} · {appt.staff}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 font-bold border border-green-500/20 uppercase tracking-wider">
                      {appt.status}
                    </span>
                    <p className="text-[10px] text-gray-500 mt-1.5">{appt.date} @ {appt.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="lg:col-span-1 bento-card bg-gradient-to-br from-[#2a110a] to-[#111111] p-6 border-[#FF4F00]/20">
          <h2 className="text-base font-bold text-white mb-4">AI Insights</h2>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Conversion up 24% this week. Top source: organic booking links.
          </p>
          
          <ul className="space-y-4">
            <li className="flex gap-3 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 mt-1.5" />
              <span className="text-gray-300">
                Workflows attributed real revenue — top: Appointment Booked — Onboarding
              </span>
            </li>
            <li className="flex gap-3 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 mt-1.5" />
              <span className="text-gray-300">
                3 follow-ups due tomorrow
              </span>
            </li>
            <li className="flex gap-3 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 mt-1.5" />
              <span className="text-gray-300">
                AI brief generated for {leads.length} new leads this week
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
