import React from 'react';
import LandingHero from './LandingHero';
import LandingWorkflow from './LandingWorkflow';
import LandingModules from './LandingModules';
import LandingAIAgents from './LandingAIAgents';
import LandingPricing from './LandingPricing';

interface LandingPageProps {
  onNavigateToDashboard: () => void;
}

export default function LandingPage({ onNavigateToDashboard }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-y-auto overflow-x-hidden selection:bg-[#FF4F00] selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#FF4F00] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight">FlowBook <span className="text-gray-400">.AI</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Workflow</a>
            <a href="#" className="hover:text-white transition-colors">Modules</a>
            <a href="#" className="hover:text-white transition-colors">AI Agents</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onNavigateToDashboard}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              Sign in
            </button>
            <button 
              onClick={onNavigateToDashboard}
              className="text-sm font-medium bg-[#FF4F00] text-white px-4 py-2 rounded-md hover:bg-[#E64600] transition-colors cursor-pointer"
            >
              Start free
            </button>
          </div>
        </div>
      </nav>

      <main>
        <LandingHero onStartFree={onNavigateToDashboard} />
        <LandingWorkflow />
        <LandingModules />
        <LandingAIAgents />
        <LandingPricing />
      </main>

      {/* Footer minimal */}
      <footer className="py-8 border-t border-white/10 text-center text-sm text-gray-500">
        <p>&copy; 2026 FlowBook .AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
