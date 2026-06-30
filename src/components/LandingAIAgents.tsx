import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const agents = [
  { name: 'Booking Agent', description: 'Handles scheduling queries and bookings end-to-end without any manual input.', color: 'bg-orange-500' },
  { name: 'Qualification Agent', description: 'Scores every lead the moment it lands using AI-defined criteria.', color: 'bg-purple-500' },
  { name: 'Reminder Agent', description: 'Cuts no-shows by automatically sending reminders on WhatsApp and email.', color: 'bg-blue-500' },
  { name: 'Follow-up Agent', description: 'Re-books quiet customers automatically with personalized messages.', color: 'bg-green-500' },
  { name: 'CRM Agent', description: 'Moves deals across your pipeline stages based on appointment activity.', color: 'bg-pink-500' },
  { name: 'Analytics Agent', description: 'Answers: which source converts to revenue and where to focus next.', color: 'bg-yellow-500' },
];

export default function LandingAIAgents() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true });

  return (
    <section className="relative py-28 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {/* Purple ambient glow */}
      <div className="absolute -right-40 top-20 w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-[120px] -z-10" />

      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          {/* Left sticky column */}
          <div ref={headerRef} className="lg:w-[400px] shrink-0 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold tracking-widest uppercase mb-6">
                AI Agents
              </div>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.1] mb-6">
                A team of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-500">specialists,</span>
                <br />running 24/7.
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-10">
                Six pre-built AI agents handle the work most teams hire two people to do. Compose them into your workflow with a single click — no prompting required.
              </p>
              {/* Visual agent load indicator */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="font-semibold text-gray-400">Agent Network Status</span>
                  <span className="text-green-400 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    All online
                  </span>
                </div>
                {[
                  { name: 'Booking', load: 78 },
                  { name: 'CRM', load: 52 },
                  { name: 'Analytics', load: 91 },
                ].map((a) => (
                  <div key={a.name}>
                    <div className="flex justify-between text-[11px] mb-1 text-gray-500">
                      <span>{a.name} Agent</span>
                      <span>{a.load}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${a.load}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-[#FF4F00] to-purple-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right cards grid */}
          <div ref={gridRef} className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 24 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.045] hover:border-white/[0.1] transition-all duration-400 overflow-hidden cursor-default"
              >
                {/* Subtle top colored line */}
                <div className={`absolute top-0 inset-x-0 h-[2px] ${agent.color} opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />

                <div className="flex items-start gap-4">
                  <div className={`w-2 h-2 rounded-full ${agent.color} mt-1.5 shrink-0 shadow-[0_0_8px_currentColor]`} />
                  <div>
                    <h3 className="text-white font-bold text-sm mb-2 group-hover:text-[#FF8A50] transition-colors duration-300">{agent.name}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{agent.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
