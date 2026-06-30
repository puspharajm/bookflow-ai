import { useState } from "react";
import { ArrowUpRight, TrendingUp, Users, Calendar as CalendarIcon, DollarSign, Zap, Activity } from "lucide-react";
import { motion } from "motion/react";

export default function Dashboard() {
  const statCards = [
    { title: "Upcoming appointments", value: "0", change: "+12%", changeType: "increase", icon: CalendarIcon },
    { title: "Active leads", value: "0", change: "+8%", changeType: "increase", icon: Users },
    { title: "Revenue (closed)", value: "$0", change: "+24%", changeType: "increase", icon: TrendingUp },
    { title: "Workflow runs", value: "0", change: "100% ok", changeType: "increase", icon: Zap },
    { title: "Workflow revenue", value: "$0", change: "attributed", changeType: "increase", icon: DollarSign },
    { title: "Conversion rate", value: "0%", change: "+3%", changeType: "increase", icon: Activity },
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
            <span className="text-xs text-gray-500">Last 0 runs</span>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-gray-500">
              No workflow runs yet. Build a workflow and trigger a booking to see activity here.
            </p>
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
                AI brief generated for 12 new leads this week
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
