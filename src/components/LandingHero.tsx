import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import glowingOrb from '../assets/glowing-orb.png';

interface LandingHeroProps {
  onStartFree: () => void;
}

const Counter = ({ to, suffix = '' }: { to: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = to / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

export default function LandingHero({ onStartFree }: LandingHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Layered Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#060606]" />
        {/* Fine grid */}
        <div className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px'
          }}
        />
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,79,0,0.12),transparent_70%)]" />
        {/* Bottom dark fade */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#060606] to-transparent" />
      </div>

      {/* Ambient blobs */}
      <motion.div style={{ y }} className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#FF4F00]/8 blur-[120px] -z-10 pointer-events-none" />
      <motion.div style={{ y }} className="absolute -bottom-32 right-0 w-[500px] h-[500px] rounded-full bg-purple-900/15 blur-[100px] -z-10 pointer-events-none" />

      <div className="relative max-w-[1320px] mx-auto px-6 md:px-12 pt-28 pb-24 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 xl:gap-24">

          {/* LEFT CONTENT */}
          <div className="flex-1 min-w-0 space-y-8 z-10">
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm text-xs font-medium text-gray-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Now in private beta &nbsp;·&nbsp; Workflow OS for appointments
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1 className="text-[clamp(2.2rem,4vw,3.8rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white">
                Book an<br />
                appointment.<br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #FF4F00 0%, #FF2A85 50%, #8B5CF6 100%)' }}
                >
                  Automate the<br />entire business.
                </span>
              </h1>
            </motion.div>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[1.05rem] text-gray-400 max-w-[480px] leading-[1.75]"
            >
              Most booking tools stop at scheduling. FlowBook AI keeps going — into Google Sheets, Docs, CRM, WhatsApp, payments and AI agents. <strong className="text-gray-200 font-medium">One trigger. Your whole client workflow.</strong>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={onStartFree}
                className="group relative overflow-hidden px-7 py-3.5 bg-[#FF4F00] text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,79,0,0.4)] hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
              >
                <span>Start automating free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                {/* Shine effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </button>
              <button className="px-7 py-3.5 text-white rounded-xl font-semibold text-sm border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 cursor-pointer flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF4F00]" />
                See a live workflow
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex items-center gap-10 pt-4 border-t border-white/[0.08]"
            >
              {[
                { value: 12, suffix: 'k+', label: 'Workflows run daily' },
                { value: 94, suffix: '%', label: 'Less manual ops' },
                { value: 6, suffix: ' min', label: 'Avg time-to-launch' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-white tracking-tight">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 font-medium">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Orb visual */}
          <div className="flex-1 w-full max-w-[560px] relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ scale: orbScale }}
              className="relative"
            >
              {/* Decorative frame ring */}
              <div className="absolute -inset-px rounded-[24px] bg-gradient-to-br from-white/10 via-transparent to-[#FF4F00]/20" />
              {/* Card */}
              <div className="relative rounded-[22px] overflow-hidden border border-white/[0.06] shadow-2xl bg-black aspect-[4/3]">
                <img
                  src={glowingOrb}
                  alt="FlowBook AI glowing workflow visualization"
                  className="w-full h-full object-cover"
                />
                {/* Inner gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                {/* Floating metric pill */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute bottom-5 left-5 flex items-center gap-3 bg-black/60 border border-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e]" />
                  <span className="text-xs font-semibold text-white">7 steps completed</span>
                  <span className="text-xs text-green-400 font-bold">in 4s</span>
                </motion.div>
                {/* Floating trigger pill */}
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute top-5 right-5 flex items-center gap-2 bg-[#FF4F00]/20 border border-[#FF4F00]/30 backdrop-blur-md px-3 py-1.5 rounded-full"
                >
                  <Sparkles className="w-3 h-3 text-[#FF4F00]" />
                  <span className="text-[11px] font-semibold text-[#FF8A50]">AI Triggered</span>
                </motion.div>
              </div>
              {/* Glow bloom behind card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#FF4F00]/15 blur-[80px] -z-10 rounded-full" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
