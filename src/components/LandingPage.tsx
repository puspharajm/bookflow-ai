import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import LandingHero from './LandingHero';
import LandingWorkflow from './LandingWorkflow';
import LandingModules from './LandingModules';
import LandingAIAgents from './LandingAIAgents';
import LandingPricing from './LandingPricing';

interface LandingPageProps {
  onNavigateToDashboard: () => void;
}

const navLinks = [
  { label: 'Workflow', href: '#workflow' },
  { label: 'Modules', href: '#modules' },
  { label: 'AI Agents', href: '#agents' },
  { label: 'Pricing', href: '#pricing' },
];

export default function LandingPage({ onNavigateToDashboard }: LandingPageProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#060606] text-white overflow-x-hidden selection:bg-[#FF4F00] selection:text-white">
      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/[0.06] bg-[#060606]/90 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.04)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#FF4F00] flex items-center justify-center shadow-[0_0_12px_rgba(255,79,0,0.4)]">
              <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5 text-white" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="font-extrabold text-[1.1rem] tracking-tight text-white">
              FlowBook<span className="text-gray-500 font-medium">.AI</span>
            </span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={onNavigateToDashboard}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/[0.05]"
            >
              Sign in
            </button>
            <button
              onClick={onNavigateToDashboard}
              className="group text-sm font-semibold bg-[#FF4F00] hover:bg-[#E64600] text-white px-5 py-2.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,79,0,0.35)] flex items-center gap-1.5"
            >
              Start free
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-white/[0.06] bg-[#060606]/95 backdrop-blur-xl px-6 pb-6 space-y-1 overflow-hidden"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-gray-400 hover:text-white rounded-xl hover:bg-white/[0.04] transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-2.5">
                <button
                  onClick={onNavigateToDashboard}
                  className="w-full text-sm font-medium text-gray-300 border border-white/[0.08] px-4 py-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                >
                  Sign in
                </button>
                <button
                  onClick={onNavigateToDashboard}
                  className="w-full text-sm font-bold bg-[#FF4F00] text-white px-4 py-3 rounded-xl hover:bg-[#E64600] transition-colors"
                >
                  Start free
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Sections ── */}
      <main>
        <LandingHero onStartFree={onNavigateToDashboard} />
        <LandingWorkflow />
        <LandingModules />
        <LandingAIAgents />
        <LandingPricing />
      </main>

      {/* ── CTA Banner ── */}
      <section className="relative py-24 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(255,79,0,0.08),transparent_70%)]" />
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.1] mb-6">
              Stop booking.{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #FF4F00, #FF2A85, #8B5CF6)' }}>
                Start automating.
              </span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed max-w-xl mx-auto mb-10">
              Join thousands of appointment-based businesses already running on FlowBook AI. Free forever on limited plan.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onNavigateToDashboard}
                className="group relative overflow-hidden px-8 py-4 bg-[#FF4F00] text-white rounded-xl font-bold text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,79,0,0.5)] hover:scale-[1.03] flex items-center gap-2"
              >
                Get started for free
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </button>
              <button
                onClick={onNavigateToDashboard}
                className="px-8 py-4 border border-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
              >
                View live dashboard
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] bg-[#060606]">
        <div className="max-w-[1320px] mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#FF4F00] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <span className="font-extrabold text-white tracking-tight">FlowBook<span className="text-gray-500 font-medium">.AI</span></span>
              </div>
              <p className="text-xs text-gray-600 max-w-xs leading-relaxed">
                The Workflow OS for appointment-based businesses. One booking triggers everything.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-xs text-gray-500">
              {['Privacy Policy', 'Terms of Service', 'Documentation', 'Status'].map((link) => (
                <a key={link} href="#" className="hover:text-gray-300 transition-colors">{link}</a>
              ))}
            </div>
          </div>
          <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">&copy; 2026 FlowBook .AI. All rights reserved.</p>
            <p className="text-xs text-gray-700">Built with React · TypeScript · Tailwind CSS · Vite</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
