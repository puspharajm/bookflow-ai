import { motion } from "motion/react";
import { Network, Search, Link as LinkIcon, FileCheck2, FileWarning, AlertTriangle } from "lucide-react";

export default function SitemapAudit() {
  const pages = [
    { url: "/", status: 200, type: "index", lastCrawled: "2 hours ago", issues: 0 },
    { url: "/pricing", status: 200, type: "page", lastCrawled: "2 hours ago", issues: 0 },
    { url: "/book/discovery", status: 200, type: "booking", lastCrawled: "5 hours ago", issues: 1 },
    { url: "/blog/how-to-automate", status: 200, type: "post", lastCrawled: "1 day ago", issues: 0 },
    { url: "/old-services", status: 404, type: "unknown", lastCrawled: "2 days ago", issues: 1 },
    { url: "/contact", status: 301, type: "redirect", lastCrawled: "3 days ago", issues: 0 },
  ];

  return (
    <div className="h-full flex flex-col relative max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Sitemap Audit</h1>
          <p className="text-gray-400">Analyze your website structure and identify indexing issues.</p>
        </div>
        <button className="bg-white/5 hover:bg-white/10 text-white font-medium px-4 py-2.5 rounded-full transition-all border border-white/10 flex items-center gap-2 shadow-lg">
          <Search className="w-4 h-4" /> Trigger Crawl
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 rounded-xl"><FileCheck2 className="w-6 h-6 text-emerald-400" /></div>
          <div>
            <p className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-1">Healthy Pages</p>
            <p className="text-2xl font-bold text-white">42</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 rounded-xl"><FileWarning className="w-6 h-6 text-amber-400" /></div>
          <div>
            <p className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-1">Warnings</p>
            <p className="text-2xl font-bold text-white">3</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-red-500/20 rounded-xl"><AlertTriangle className="w-6 h-6 text-red-400" /></div>
          <div>
            <p className="text-sm font-bold text-red-400 uppercase tracking-wider mb-1">Broken (404s)</p>
            <p className="text-2xl font-bold text-white">1</p>
          </div>
        </motion.div>
      </div>

      <div className="flex-1 overflow-y-auto hidden-scrollbar pb-10">
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden relative">
          
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
            <h3 className="text-white font-bold flex items-center gap-2"><Network className="w-5 h-5 text-gray-400" /> Discovered URLs</h3>
            <div className="text-sm text-gray-500 font-mono">Last full crawl: Today, 08:00 AM</div>
          </div>

          <div className="divide-y divide-white/5">
            {pages.map((page, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={idx} 
                className="p-4 hover:bg-white/[0.02] transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <LinkIcon className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm flex items-center gap-2">
                      bookflow.ai{page.url}
                      {page.issues > 0 && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400">{page.issues} Issue</span>}
                    </h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mt-1">Type: {page.type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Last Crawled</p>
                    <p className="text-sm text-gray-300">{page.lastCrawled}</p>
                  </div>
                  
                  <div className="w-20 text-right">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      page.status === 200 ? 'bg-emerald-500/20 text-emerald-400' :
                      page.status === 404 ? 'bg-red-500/20 text-red-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {page.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
