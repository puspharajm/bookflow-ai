import { useState, useEffect } from "react";
import { Upload, Smartphone, ExternalLink, Moon, Sun, Globe, Mail } from "lucide-react";

export default function WhiteLabelSettings() {
  const [brandName, setBrandName] = useState("Bookflow.ai");
  const [primaryColor, setPrimaryColor] = useState("#FF4F00");
  const [isLightMode, setIsLightMode] = useState(false);
  const [customDomain, setCustomDomain] = useState("booking.mycompany.com");
  const [senderEmail, setSenderEmail] = useState("hello@mycompany.com");

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  }, [isLightMode]);

  return (
    <div className="h-full flex flex-col relative max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">White-Label Branding</h1>
          <p className="text-gray-400">Completely customize the portal to match your agency or brand.</p>
        </div>
        <button className="bg-[#FF4F00] hover:bg-[#E64600] shadow-[0_0_15px_rgba(255,79,0,0.3)] text-white font-medium px-6 py-2.5 rounded-full transition-all">
          Save Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 overflow-y-auto hidden-scrollbar pb-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
            <h2 className="text-xl font-bold text-white mb-6">Brand Identity</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Brand Name</label>
                  <input 
                    type="text" 
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF4F00] transition-colors shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Primary Color</label>
                  <div className="flex gap-3 items-center">
                    <input 
                      type="color" 
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-12 h-12 rounded-xl bg-transparent border-0 cursor-pointer p-0"
                    />
                    <input 
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-[#FF4F00] uppercase shadow-inner"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Brand Logo</label>
                <div className="border-2 border-dashed border-white/10 hover:border-[#FF4F00]/50 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white/[0.01]">
                  <Upload className="w-8 h-8 text-gray-500 mb-3" />
                  <p className="text-sm text-gray-300 font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">SVG, PNG, or JPG (max. 5MB)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
            <h2 className="text-xl font-bold text-white mb-6">Advanced Routing</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><Globe className="w-4 h-4"/> Custom Domain</label>
                <input 
                  type="text" 
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF4F00] transition-colors shadow-inner"
                />
                <p className="text-xs text-gray-500 mt-2">Point your CNAME record to <code className="text-emerald-400">cname.bookflow.ai</code></p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><Mail className="w-4 h-4"/> Sender Email Address</label>
                <input 
                  type="email" 
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF4F00] transition-colors shadow-inner"
                />
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 uppercase">Verification Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-gray-400" />
                Live Preview
              </h3>
              <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-white transition-colors flex items-center gap-1 font-bold">
                <ExternalLink className="w-3 h-3" /> Web
              </button>
            </div>
            
            <div className="relative mx-auto w-[240px] h-[500px] bg-black border-[6px] border-gray-800 rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-white/10">
              <div className="absolute top-0 w-full h-6 bg-black z-10 flex justify-center">
                <div className="w-16 h-4 bg-gray-800 rounded-b-xl" />
              </div>
              
              <div className="w-full h-full bg-[#050505] p-5 flex flex-col pt-12 relative">
                {/* Background glow using primary color */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 blur-[40px] opacity-20 pointer-events-none" style={{ backgroundColor: primaryColor }} />

                <div className="flex justify-between items-center mb-8 relative z-10">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg" style={{ background: primaryColor }}>
                    {brandName.charAt(0)}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5" />
                </div>
                
                <h4 className="text-white font-bold text-xl mb-1">{brandName}</h4>
                <p className="text-xs text-gray-400 mb-8">Select a service to book</p>
                
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl flex justify-between items-center bg-white/[0.03] border border-white/5 relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: primaryColor }} />
                    <div>
                      <div className="text-sm text-white font-bold mb-1">Discovery Call</div>
                      <div className="text-xs text-gray-400">30 Min</div>
                    </div>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                      <span className="text-[10px] font-bold">+</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl flex justify-between items-center bg-white/[0.03] border border-white/5 relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: primaryColor }} />
                    <div>
                      <div className="text-sm text-white font-bold mb-1">Strategy Session</div>
                      <div className="text-xs text-gray-400">60 Min</div>
                    </div>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                      <span className="text-[10px] font-bold">+</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="w-full py-3 rounded-xl text-center text-white text-sm font-bold shadow-lg" style={{ backgroundColor: primaryColor }}>
                    Confirm Booking
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
