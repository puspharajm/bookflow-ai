import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Circle, AlertTriangle, ExternalLink, RefreshCw, Trophy } from "lucide-react";

const seoTasks = [
  { id: 1, category: "Technical", task: "SSL Certificate Installed", status: "pass", detail: "Traffic is encrypted via HTTPS." },
  { id: 2, category: "Technical", task: "Robots.txt Configured", status: "pass", detail: "Search engines can properly crawl the site." },
  { id: 3, category: "Content", task: "Meta Descriptions", status: "warn", detail: "3 pages are missing meta descriptions." },
  { id: 4, category: "Content", task: "H1 Tags Present", status: "pass", detail: "All pages have a single H1 tag." },
  { id: 5, category: "Performance", task: "Mobile Responsiveness", status: "pass", detail: "Viewport meta tag is set correctly." },
  { id: 6, category: "Performance", task: "Image Optimization", status: "fail", detail: "Large images on /about are slowing down load times." },
];

export default function SEOGuide() {
  const [tasks, setTasks] = useState(seoTasks);

  const score = Math.round(
    (tasks.filter(t => t.status === 'pass').length / tasks.length) * 100
  );

  return (
    <div className="h-full flex flex-col relative max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">SEO Guide</h1>
          <p className="text-gray-400">Optimize your booking pages to rank higher on Google.</p>
        </div>
        <button className="bg-white/5 hover:bg-white/10 text-white font-medium px-4 py-2.5 rounded-full transition-all border border-white/10 flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Run Audit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto hidden-scrollbar pb-10">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/5 rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[#FF4F00]/10 blur-[40px]" />
            
            <div className="relative inline-flex items-center justify-center mb-6">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="none" />
                <motion.circle 
                  cx="80" cy="80" r="70" 
                  stroke="#FF4F00" 
                  strokeWidth="12" 
                  fill="none" 
                  strokeDasharray="439.8" 
                  strokeDashoffset={439.8 - (439.8 * score) / 100}
                  initial={{ strokeDashoffset: 439.8 }}
                  animate={{ strokeDashoffset: 439.8 - (439.8 * score) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white">{score}</span>
                <span className="text-[10px] uppercase font-bold text-[#FF4F00] tracking-widest mt-1">Score</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Good, but needs work!</h3>
            <p className="text-sm text-gray-400 mb-6">
              Your site is technically sound, but performance issues are holding your rankings back.
            </p>
            
            <div className="flex items-center justify-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 py-2 px-4 rounded-xl text-sm font-bold">
              <Trophy className="w-4 h-4" /> Top 20% of Bookflow users
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4">Quick Resources</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm text-gray-300">
                How to write Meta Descriptions <ExternalLink className="w-3 h-3 text-gray-500" />
              </a>
              <a href="#" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm text-gray-300">
                Compressing WebP Images <ExternalLink className="w-3 h-3 text-gray-500" />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-white mb-2">Action Items</h3>
          {tasks.map((task, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={task.id}
              className={`p-5 rounded-2xl border transition-all ${
                task.status === 'fail' ? 'bg-red-500/[0.02] border-red-500/20' :
                task.status === 'warn' ? 'bg-amber-500/[0.02] border-amber-500/20' :
                'bg-white/[0.02] border-white/5 hover:bg-white/5'
              }`}
            >
              <div className="flex gap-4">
                <div className="mt-1 shrink-0">
                  {task.status === 'pass' && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                  {task.status === 'warn' && <AlertTriangle className="w-6 h-6 text-amber-500" />}
                  {task.status === 'fail' && <Circle className="w-6 h-6 text-red-500 fill-red-500/20" />}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-base font-bold text-white">{task.task}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                      {task.category}
                    </span>
                  </div>
                  <p className={`text-sm ${task.status === 'fail' ? 'text-red-300' : task.status === 'warn' ? 'text-amber-300' : 'text-gray-400'}`}>
                    {task.detail}
                  </p>
                  
                  {task.status !== 'pass' && (
                    <button className="mt-3 text-xs font-bold text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
                      Fix Issue
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
