import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Calendar, FileSpreadsheet, FileText, MessageCircle, Users, Bell, CreditCard, ChevronRight } from 'lucide-react';

const steps = [
  { id: '01', title: 'Customer books', desc: 'Appointment is created on the platform.', icon: Calendar, color: 'from-orange-500 to-red-500' },
  { id: '02', title: 'Sheet row added', desc: 'Google Sheets is updated instantly.', icon: FileSpreadsheet, color: 'from-green-500 to-emerald-500' },
  { id: '03', title: 'Doc generated', desc: 'Custom docs are auto-created per client.', icon: FileText, color: 'from-blue-500 to-cyan-500' },
  { id: '04', title: 'WhatsApp confirm', desc: 'Instant confirmation is sent to customer.', icon: MessageCircle, color: 'from-green-400 to-teal-500' },
  { id: '05', title: 'CRM lead created', desc: 'Lead is added to the sales pipeline.', icon: Users, color: 'from-purple-500 to-violet-500' },
  { id: '06', title: 'Team notified', desc: 'Staff gets alerted on their channel.', icon: Bell, color: 'from-yellow-500 to-orange-500' },
  { id: '07', title: 'Revenue tracked', desc: 'Payment data flows into your dashboard.', icon: CreditCard, color: 'from-pink-500 to-rose-500' },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative flex flex-col gap-5 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm hover:border-white/[0.12] hover:bg-white/[0.055] transition-all duration-500 overflow-hidden">
        {/* Gradient corner accent */}
        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-bl-full`} />

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold text-gray-600 tracking-[0.15em]">STEP {step.id}</span>
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${step.color} p-[1px] shadow-lg flex-shrink-0`}>
            <div className="w-full h-full rounded-[11px] bg-[#0d0d0d] flex items-center justify-center">
              <step.icon className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-[#FF8A50] transition-colors duration-300">{step.title}</h3>
          <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
        </div>

        {/* Bottom connection line indicator */}
        {index < steps.length - 1 && (
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center">
            <div className="w-6 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
            <ChevronRight className="w-3 h-3 text-white/20" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function LandingWorkflow() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="relative py-28 px-6 md:px-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(255,79,0,0.05),transparent_70%)]" />

      <div className="max-w-[1320px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-lg"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF4F00]/10 border border-[#FF4F00]/20 text-[#FF4F00] text-xs font-bold tracking-widest uppercase mb-6">
              The Trigger
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.1]">
              One booking.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] to-[#FF8A50]">Seven things happen</span><br />
              in 4 seconds.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-xs"
          >
            <p className="text-gray-400 leading-relaxed text-sm">
              A visual workflow builder inspired by n8n & Zapier — built specifically for appointment-based businesses that want to grow without hiring more staff.
            </p>
            <div className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="w-2 h-2 rounded-full bg-[#FF4F00] shadow-[0_0_8px_rgba(255,79,0,0.8)]" />
              <span className="text-xs font-medium text-gray-300">Fully automated · No manual steps</span>
            </div>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {steps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </div>

        {/* Timeline connector bar (desktop only) */}
        <div className="hidden lg:flex mt-6 items-center gap-0">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{ transformOrigin: 'left' }}
                className={`flex-1 h-[2px] bg-gradient-to-r ${step.color} opacity-30`}
              />
              {index < steps.length - 1 && (
                <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${step.color} opacity-50 flex-shrink-0`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
