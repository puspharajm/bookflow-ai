import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Check, Zap } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Free',
    tagline: 'Limited version to explore',
    priceUSD: 0,
    priceINR: 0,
    features: ['10 bookings/mo', 'Basic booking page', 'Email notifications'],
    cta: 'Get started free',
    highlight: false,
    color: 'from-gray-600 to-gray-700',
  },
  {
    name: 'Starter',
    tagline: 'Solo consultants getting started',
    priceUSD: 6,
    priceINR: 499,
    features: ['100 bookings/mo', 'Public booking page', 'Email reminders', 'Basic analytics'],
    cta: 'Start with Starter',
    highlight: false,
    color: 'from-blue-600 to-cyan-600',
  },
  {
    name: 'Pro',
    tagline: 'For coaches & freelancers',
    priceUSD: 25,
    priceINR: 1999,
    features: ['1,000 bookings/mo', 'Google Workspace', 'Basic workflows', 'WhatsApp notifications'],
    cta: 'Upgrade to Pro',
    highlight: false,
    color: 'from-purple-600 to-violet-600',
  },
  {
    name: 'Business',
    tagline: 'Most popular for agencies',
    priceUSD: 59,
    priceINR: 4999,
    features: ['AI workflows', 'Built-in CRM', 'WhatsApp automation', 'AI Agents', 'Priority support'],
    cta: 'Get Business',
    highlight: true,
    color: 'from-[#FF4F00] to-[#FF2A85]',
  },
  {
    name: 'Agency',
    tagline: 'White-label, multi-tenant',
    priceUSD: 119,
    priceINR: 9999,
    features: ['Unlimited workflows', 'Multi-tenant', 'White-label domain', 'Dedicated support', 'Custom integrations'],
    cta: 'Go Agency',
    highlight: false,
    color: 'from-yellow-500 to-orange-500',
  },
];

export default function LandingPricing() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="relative py-28 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(255,79,0,0.06),transparent_70%)]" />

      <div className="max-w-[1320px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF4F00]/10 border border-[#FF4F00]/20 text-[#FF4F00] text-xs font-bold tracking-widest uppercase mb-6">
              Pricing
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.1]">
              Priced like a tool.<br />
              <span className="text-gray-500">Replaces a team.</span>
            </h2>
          </motion.div>

          {/* Currency Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl shrink-0"
          >
            {(['INR', 'USD'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-250 ${
                  currency === c
                    ? 'bg-[#FF4F00] text-white shadow-[0_0_15px_rgba(255,79,0,0.3)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {c === 'INR' ? '₹ INR' : '$ USD'}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 group ${
                tier.highlight
                  ? 'border border-[#FF4F00]/30 shadow-[0_0_40px_rgba(255,79,0,0.12)] -translate-y-3 bg-gradient-to-b from-[#1c0a04] to-[#0d0d0d]'
                  : 'border border-white/[0.06] bg-[#0d0d0d] hover:border-white/[0.12] hover:-translate-y-1'
              }`}
            >
              {/* Most Popular badge */}
              {tier.highlight && (
                <div className="absolute -top-0 inset-x-0 flex justify-center">
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#FF4F00] to-[#FF2A85] text-white text-[10px] font-bold px-4 py-1.5 rounded-b-xl uppercase tracking-wider shadow-lg">
                    <Zap className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Top gradient strip */}
              <div className={`h-[2px] w-full bg-gradient-to-r ${tier.color} opacity-60`} />

              <div className={`p-6 flex flex-col flex-1 ${tier.highlight ? 'pt-8' : ''}`}>
                <h3 className="text-lg font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">{tier.tagline}</p>

                {/* Price */}
                <div className="mb-8">
                  {tier.priceINR === 0 ? (
                    <div className="text-4xl font-extrabold text-white tracking-tight">Free</div>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-extrabold text-white tracking-tight">
                        {currency === 'INR' ? '₹' : '$'}
                        {currency === 'INR'
                          ? tier.priceINR.toLocaleString('en-IN')
                          : tier.priceUSD}
                      </span>
                      <span className="text-gray-500 text-sm mb-1">/mo</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-xs text-gray-400">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${tier.color} p-[1px] shrink-0 mt-px`}>
                        <div className="w-full h-full rounded-full bg-[#0d0d0d] flex items-center justify-center">
                          <Check className="w-2 h-2 text-white" />
                        </div>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className={`relative overflow-hidden w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                    tier.highlight
                      ? `bg-gradient-to-r ${tier.color} text-white hover:shadow-[0_0_25px_rgba(255,79,0,0.35)] hover:scale-[1.02]`
                      : 'bg-white/[0.05] border border-white/[0.08] text-gray-300 hover:bg-white/[0.09] hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{tier.cta}</span>
                  {tier.highlight && (
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-gray-600 mt-10"
        >
          All plans include a 14-day free trial. No credit card required. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
}
