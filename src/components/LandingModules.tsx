import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Calendar, FileText, Sparkles, Users, MessageCircle, CreditCard, ArrowUpRight } from 'lucide-react';

const modules = [
  {
    title: 'Smart Booking',
    description: 'Custom availability, timezones, buffers, round-robin and group bookings on a beautiful public page.',
    icon: Calendar,
    gradient: 'from-orange-500/20 to-red-500/10',
    border: 'border-orange-500/20',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10',
    size: 'lg:col-span-2 lg:row-span-2',
    featured: true,
  },
  {
    title: 'Google Workspace',
    description: 'Calendar events, Sheet rows, generated Docs, Drive folders — organized automatically per client.',
    icon: FileText,
    gradient: 'from-blue-500/10 to-cyan-500/10',
    border: 'border-blue-500/15',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    size: 'lg:col-span-1',
    featured: false,
  },
  {
    title: 'AI Assistant',
    description: 'Lead summaries, scoring, meeting prep, talking points and upsell signals on autopilot.',
    icon: Sparkles,
    gradient: 'from-purple-500/10 to-violet-500/10',
    border: 'border-purple-500/15',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10',
    size: 'lg:col-span-1',
    featured: false,
  },
  {
    title: 'Built-in CRM',
    description: 'Pipeline auto-updates as appointments move from booked → qualified → won.',
    icon: Users,
    gradient: 'from-emerald-500/10 to-green-500/10',
    border: 'border-emerald-500/15',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    size: 'lg:col-span-1',
    featured: false,
  },
  {
    title: 'WhatsApp Automation',
    description: 'Confirmations, reminders and follow-ups on the channel your customers actually open.',
    icon: MessageCircle,
    gradient: 'from-green-500/10 to-teal-500/10',
    border: 'border-green-500/15',
    iconColor: 'text-green-400',
    iconBg: 'bg-green-500/10',
    size: 'lg:col-span-1',
    featured: false,
  },
  {
    title: 'Payments',
    description: 'Razorpay, Stripe and PayPal. Collect consultation fees before the call.',
    icon: CreditCard,
    gradient: 'from-pink-500/10 to-rose-500/10',
    border: 'border-pink-500/15',
    iconColor: 'text-pink-400',
    iconBg: 'bg-pink-500/10',
    size: 'lg:col-span-1',
    featured: false,
  },
];

export default function LandingModules() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-28 px-6 md:px-12 overflow-hidden">
      {/* Subtle section bg */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_10%_60%,rgba(139,92,246,0.04),transparent_60%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-[1320px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-gray-400 text-xs font-bold tracking-widest uppercase mb-6">
              Modules
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.1] max-w-xl">
                Everything your back<br />
                office does,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">automated.</span>
              </h2>
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                Six production-ready modules that replace entire workflows your team spends hours doing manually every day.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[220px]">
          {modules.map((mod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative flex flex-col p-7 rounded-2xl border bg-gradient-to-br overflow-hidden cursor-default transition-all duration-500 ${mod.size} ${mod.gradient} ${mod.border} ${
                hoveredIndex === i ? 'scale-[1.015] shadow-2xl shadow-black/40' : 'hover:border-white/15'
              } ${mod.featured ? 'justify-between' : 'justify-end'}`}
            >
              {/* Background noise texture simulation */}
              <div className="absolute inset-0 bg-[#0d0d0d]/70 backdrop-blur-xs" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />

              {/* Icon */}
              <div className={`relative z-10 w-11 h-11 rounded-xl ${mod.iconBg} flex items-center justify-center ${mod.featured ? '' : 'mb-auto'}`}>
                <mod.icon className={`w-5 h-5 ${mod.iconColor}`} />
              </div>

              {/* Text */}
              <div className="relative z-10 mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-bold text-white ${mod.featured ? 'text-xl' : 'text-base'}`}>{mod.title}</h3>
                  <ArrowUpRight className={`w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 group-hover:text-gray-300 transition-all duration-300`} />
                </div>
                <p className={`text-gray-500 leading-relaxed ${mod.featured ? 'text-sm' : 'text-xs'}`}>{mod.description}</p>
              </div>

              {/* Bottom accent line on hover */}
              <div className={`absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r ${mod.gradient.replace('/20', '/60').replace('/10', '/40')} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
