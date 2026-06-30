import React from 'react';
import { motion } from 'motion/react';
import { Calendar, FileText, MessageCircle, Users, Bell, CreditCard, FileSpreadsheet } from 'lucide-react';

const steps = [
  { id: '01', title: 'Customer books', icon: Calendar },
  { id: '02', title: 'Google Sheet row', icon: FileSpreadsheet },
  { id: '03', title: 'Doc generated', icon: FileText },
  { id: '04', title: 'WhatsApp confirm', icon: MessageCircle },
  { id: '05', title: 'CRM lead created', icon: Users },
  { id: '06', title: 'Team notified', icon: Bell },
  { id: '07', title: 'Revenue tracked', icon: CreditCard },
];

export default function LandingWorkflow() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <div className="text-[#FF4F00] text-sm font-bold tracking-wider uppercase mb-4">The Trigger</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            One booking. Seven things <br /> happen <span className="text-[#FF4F00]">in 4 seconds.</span>
          </h2>
        </div>
        <p className="text-gray-400 max-w-sm text-sm">
          A visual builder inspired by n8n & Zapier — built specifically for appointment workflows.
        </p>
      </div>

      <div className="w-full">
        {/* Desktop View (Horizontal) */}
        <div className="hidden lg:flex items-center justify-between w-full">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col gap-3 bento-card p-4 flex-1 max-w-[160px] relative z-10"
              >
                <div className="text-[10px] font-mono text-gray-500">STEP {step.id}</div>
                <step.icon className="w-6 h-6 text-[#FF4F00]" />
                <div className="text-sm font-semibold text-white mt-1 leading-tight">{step.title}</div>
              </motion.div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 h-[1px] bg-[#FF4F00]/30 mx-1 z-0 relative min-w-[10px]">
                  <motion.div 
                    className="absolute inset-0 bg-[#FF4F00]"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    style={{ transformOrigin: 'left' }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile / Tablet View (Vertical Stack with connecting line) */}
        <div className="flex lg:hidden flex-col gap-4 relative">
          <div className="absolute left-[39px] top-4 bottom-4 w-[1px] bg-[#FF4F00]/30 z-0">
             <motion.div 
                className="absolute inset-0 bg-[#FF4F00]"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                style={{ transformOrigin: 'top' }}
              />
          </div>
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-6 relative z-10"
            >
              <div className="w-20 shrink-0 text-right text-xs font-mono text-gray-500 pt-1">
                STEP {step.id}
              </div>
              <div className="w-10 h-10 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(255,79,0,0.1)]">
                 <step.icon className="w-5 h-5 text-[#FF4F00]" />
              </div>
              <div className="bento-card p-4 flex-1">
                <div className="font-semibold text-white">{step.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
