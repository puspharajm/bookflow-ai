import { motion } from "motion/react";
import { Hammer, Sparkles, Rocket } from "lucide-react";

interface ComingSoonProps {
  title: string;
}

export default function ComingSoon({ title }: ComingSoonProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#FF4F00]/20 to-purple-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] shadow-2xl rounded-3xl p-10 text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF4F00] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FF4F00]/20 to-orange-500/5 rounded-2xl flex items-center justify-center border border-[#FF4F00]/20 shadow-[0_0_30px_rgba(255,79,0,0.15)] rotate-3">
                <Hammer className="w-10 h-10 text-[#FF4F00] -rotate-3" />
              </div>
              <Sparkles className="w-6 h-6 text-yellow-500 absolute -top-2 -right-3 animate-pulse" />
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">
              {title}
            </span> is building...
          </h2>
          
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            We're currently forging this feature in the background. It will be rolling out in an upcoming update with powerful new capabilities.
          </p>

          <button className="bg-white/5 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-full transition-all border border-white/10 flex items-center justify-center gap-2 mx-auto shadow-lg hover:shadow-xl">
            <Rocket className="w-4 h-4 text-[#FF4F00]" />
            Notify me when ready
          </button>
        </div>
      </motion.div>
    </div>
  );
}
