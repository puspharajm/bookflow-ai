import React from 'react';
import { Calendar, FileText, Sparkles, Users, MessageCircle, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';

const modules = [
  {
    title: 'Smart Booking',
    description: 'Custom availability, timezones, buffers, round-robin and group bookings on a beautiful public page.',
    icon: Calendar,
    className: 'md:col-span-1 border-[#FF4F00]/50 shadow-[0_0_15px_rgba(255,79,0,0.1)]'
  },
  {
    title: 'Google Workspace',
    description: 'Calendar events, Sheet rows, generated Docs, Drive folders — automatically organized per client.',
    icon: FileText,
    className: 'md:col-span-1'
  },
  {
    title: 'AI Assistant',
    description: 'Lead summaries, lead scoring, meeting prep, talking points and upsell signals.',
    icon: Sparkles,
    className: 'md:col-span-1'
  },
  {
    title: 'Built-in CRM',
    description: 'Pipeline auto-updates as appointments move from booked → qualified → won.',
    icon: Users,
    className: 'md:col-span-1'
  },
  {
    title: 'WhatsApp Automation',
    description: 'Confirmations, reminders and follow-ups on the channel your customers actually open.',
    icon: MessageCircle,
    className: 'md:col-span-1'
  },
  {
    title: 'Payments',
    description: 'Razorpay, Stripe and PayPal. Collect consultation fees before the call.',
    icon: CreditCard,
    className: 'md:col-span-1'
  }
];

export default function LandingModules() {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="mb-16">
        <div className="text-[#FF4F00] text-sm font-bold tracking-wider uppercase mb-4">Modules</div>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight max-w-xl">
          Everything your back office does, automated.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((mod, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`bento-card p-8 flex flex-col justify-end min-h-[240px] ${mod.className} transition-transform hover:-translate-y-1`}
          >
            {mod.icon ? (
              <>
                <div className="mb-auto">
                  <mod.icon className="w-6 h-6 text-[#FF4F00]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{mod.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {mod.description}
                  </p>
                </div>
              </>
            ) : null}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
