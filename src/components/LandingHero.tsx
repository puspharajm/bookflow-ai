import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import glowingOrb from '../assets/glowing-orb.png';

interface LandingHeroProps {
  onStartFree: () => void;
}

export default function LandingHero({ onStartFree }: LandingHeroProps) {
  return (
    <section className="relative pt-32 pb-20 px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
      {/* Background Grid Pattern - Made more visible and covers the whole section */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.08)_1px,transparent_1px)] bg-[size:32px_32px] -z-10" />

      {/* Content */}
      <div className="flex-1 space-y-8 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Now in private beta · Workflow OS for appointments
        </div>

        <h1 className="text-6xl md:text-[5.5rem] font-bold tracking-tight text-white leading-[1.05]">
          Book an <br /> appointment. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] via-[#FF2A85] to-[#8B5CF6]">
            Automate the <br /> entire business.
          </span>
        </h1>

        <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed">
          Most booking tools stop at scheduling. FlowBook AI keeps going —
          into Google Sheets, Docs, CRM, WhatsApp, payments and AI
          agents. One trigger. Your whole client workflow.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4">
          <button 
            onClick={onStartFree}
            className="px-6 py-3.5 bg-[#FF4F00] hover:bg-[#E64600] text-white rounded-lg font-medium transition-colors flex items-center gap-2 cursor-pointer"
          >
            Start automating free <ArrowRight className="w-4 h-4" />
          </button>
          <button className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium border border-white/10 transition-colors flex items-center gap-2 cursor-pointer">
            See a live workflow
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10 max-w-lg">
          <div>
            <div className="text-2xl font-bold text-white">12k+</div>
            <div className="text-xs text-gray-400 mt-1">Workflows run daily</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">94%</div>
            <div className="text-xs text-gray-400 mt-1">Less manual ops</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">6 min</div>
            <div className="text-xs text-gray-400 mt-1">Avg time-to-launch</div>
          </div>
        </div>
      </div>

      {/* Image / Graphic */}
      <div className="flex-1 w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black aspect-[4/3] flex items-center justify-center"
        >
          {/* Using the generated glowing orb image */}
          <img 
            src={glowingOrb} 
            alt="Futuristic glowing orb representing AI workflow automation" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </motion.div>
        
        {/* Glow behind image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#FF4F00]/20 blur-[100px] -z-10 rounded-full" />
      </div>
    </section>
  );
}
