import { motion } from "motion/react";
import { Link2, Copy, MoreVertical, ExternalLink, Calendar as CalendarIcon, Clock, Users } from "lucide-react";

const mockLinks = [
  { id: 1, title: "30-Min Discovery Call", slug: "/book/discovery", duration: "30 min", type: "1-on-1", views: 124, bookings: 42, active: true },
  { id: 2, title: "Strategy Session (Paid)", slug: "/book/strategy", duration: "60 min", type: "1-on-1", views: 89, bookings: 12, active: true },
  { id: 3, title: "Group Onboarding Webinar", slug: "/book/onboarding", duration: "45 min", type: "Group", views: 342, bookings: 156, active: true },
  { id: 4, title: "Quick Sync", slug: "/book/sync", duration: "15 min", type: "1-on-1", views: 45, bookings: 3, active: false }
];

export default function BookingLinks() {
  return (
    <div className="h-full flex flex-col relative max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Booking Links</h1>
          <p className="text-gray-400">Manage your shareable scheduling links and track their performance.</p>
        </div>
        <button className="bg-[#FF4F00] hover:bg-[#E64600] shadow-[0_0_15px_rgba(255,79,0,0.3)] text-white font-medium px-5 py-2.5 rounded-full transition-all flex items-center gap-2">
          <Link2 className="w-5 h-5" /> Create Link
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto hidden-scrollbar pb-10">
        {mockLinks.map((link, idx) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            key={link.id}
            className={`bg-white/[0.02] backdrop-blur-md border ${link.active ? 'border-white/[0.06] hover:border-white/20' : 'border-white/[0.02] opacity-60'} rounded-2xl p-6 transition-all group flex flex-col`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF4F00]/20 to-purple-500/10 flex items-center justify-center border border-[#FF4F00]/20">
                <CalendarIcon className="w-6 h-6 text-[#FF4F00]" />
              </div>
              <button className="text-gray-500 hover:text-white transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#FF4F00] transition-colors">{link.title}</h3>
            <p className="text-sm text-blue-400 mb-6 flex items-center gap-1 hover:underline cursor-pointer">
              bookflow.ai{link.slug} <ExternalLink className="w-3 h-3" />
            </p>

            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                <Clock className="w-4 h-4 text-gray-500" /> {link.duration}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                <Users className="w-4 h-4 text-gray-500" /> {link.type}
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
              <div className="flex gap-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                <div><span className="text-white text-sm">{link.views}</span> Views</div>
                <div><span className="text-emerald-400 text-sm">{link.bookings}</span> Booked</div>
              </div>
              <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white" title="Copy Link">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
