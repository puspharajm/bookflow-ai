import React from 'react';
import { motion } from 'motion/react';

const agents = [
  { name: 'Booking Agent', description: 'Handles scheduling end-to-end.' },
  { name: 'Qualification Agent', description: 'Scores every lead the moment it lands.' },
  { name: 'Reminder Agent', description: 'Cuts no-shows on WhatsApp + email.' },
  { name: 'Follow-up Agent', description: 'Re-books quiet customers automatically.' },
  { name: 'CRM Agent', description: 'Moves deals across your pipeline.' },
  { name: 'Analytics Agent', description: 'Answers: which source converts to revenue?' },
];

export default function LandingAIAgents() {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="lg:w-1/3 sticky top-24">
          <div className="text-green-500 text-sm font-bold tracking-wider uppercase mb-4">AI Agents</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            A team of <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">specialists,</span> <br />
            running 24/7.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
            Six pre-built agents handle the work most teams hire two people to do. 
            Compose them into your workflow with one click.
          </p>
        </div>

        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bento-card p-6 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                <h3 className="text-white font-bold">{agent.name}</h3>
              </div>
              <p className="text-gray-400 text-sm pl-3.5">
                {agent.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
