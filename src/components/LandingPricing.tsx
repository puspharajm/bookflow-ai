import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Free',
    description: 'Limited version to get started.',
    priceUSD: 0,
    priceINR: 0,
    features: [
      '10 bookings/mo',
      'Basic booking page',
      'Email notifications'
    ],
    highlight: false,
  },
  {
    name: 'Starter',
    description: 'Solo consultants getting started.',
    priceUSD: 6,
    priceINR: 499,
    features: [
      '100 bookings/mo',
      'Public booking page',
      'Email reminders'
    ],
    highlight: false,
  },
  {
    name: 'Pro',
    description: 'For coaches & freelancers.',
    priceUSD: 25,
    priceINR: 1999,
    features: [
      '1,000 bookings/mo',
      'Google Workspace',
      'Basic workflows'
    ],
    highlight: false,
  },
  {
    name: 'Business',
    description: 'Most popular for agencies.',
    priceUSD: 59,
    priceINR: 4999,
    features: [
      'AI workflows',
      'Built-in CRM',
      'WhatsApp automation'
    ],
    highlight: true,
  },
  {
    name: 'Agency',
    description: 'White-label, multi-tenant.',
    priceUSD: 119,
    priceINR: 9999,
    features: [
      'Unlimited workflows',
      'Multi-tenant',
      'White-label domain'
    ],
    highlight: false,
  }
];

export default function LandingPricing() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  return (
    <section className="py-24 px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <div className="text-[#FF4F00] text-sm font-bold tracking-wider uppercase mb-4">Pricing</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Priced like a tool. Replaces a <br /> team.
          </h2>
        </div>
        
        {/* Currency Switcher */}
        <div className="flex items-center bg-[#111111] border border-white/10 rounded-lg p-1 shrink-0">
          <button
            onClick={() => setCurrency('INR')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currency === 'INR' ? 'bg-[#FF4F00] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            INR (₹)
          </button>
          <button
            onClick={() => setCurrency('USD')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currency === 'USD' ? 'bg-[#FF4F00] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {pricingTiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`bento-card p-6 flex flex-col relative ${
              tier.highlight ? 'border-[#FF4F00]/50 shadow-[0_0_20px_rgba(255,79,0,0.1)] -translate-y-2 bg-gradient-to-b from-[#1a0a05] to-[#111]' : ''
            }`}
          >
            {tier.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF4F00] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Most Popular
              </div>
            )}
            
            <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
            <p className="text-xs text-gray-400 mb-6 h-8 leading-normal">{tier.description}</p>
            
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">
                {currency === 'INR' ? '₹' : '$'}
                {currency === 'INR' ? tier.priceINR.toLocaleString('en-IN') : tier.priceUSD}
              </span>
              <span className="text-gray-500 text-sm"> /mo</span>
            </div>
            
            <ul className="space-y-3 mb-8 flex-1">
              {tier.features.map((feature, j) => (
                <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="leading-tight">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button className={`w-full py-3 rounded-lg font-bold text-sm transition-colors ${
              tier.highlight 
                ? 'bg-[#FF4F00] text-white hover:bg-[#E64600]' 
                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
            }`}>
              Choose {tier.name}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
