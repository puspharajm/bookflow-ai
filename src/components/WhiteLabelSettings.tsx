import { useState, useEffect } from "react";
import { Upload, Smartphone, ExternalLink, Moon, Sun } from "lucide-react";

export default function WhiteLabelSettings() {
  const [brandName, setBrandName] = useState("JP Fitness");
  const [primaryColor, setPrimaryColor] = useState("#06B6D4");
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  }, [isLightMode]);

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">White-Label Branding</h1>
        <p className="text-gray-400">Customize your booking portal and mobile app appearance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bento-card p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Brand Identity</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Brand Name</label>
                <input 
                  type="text" 
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#06B6D4] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Brand Logo</label>
                <div className="border-2 border-dashed border-white/10 hover:border-white/20 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#050816]/50">
                  <Upload className="w-8 h-8 text-gray-500 mb-3" />
                  <p className="text-sm text-gray-300 font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Primary Color</label>
                  <div className="flex gap-3 items-center">
                    <input 
                      type="color" 
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-12 h-12 rounded bg-transparent border-0 cursor-pointer p-0"
                    />
                    <input 
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1 bg-[#050816] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#06B6D4]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Theme Mode</label>
                  <button 
                    onClick={() => setIsLightMode(!isLightMode)}
                    className="w-full flex justify-between items-center bg-[#050816] border border-white/10 rounded-xl px-4 py-3 text-white transition-colors hover:border-[#06B6D4]"
                  >
                    <div className="flex items-center gap-2">
                      {isLightMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-gray-400" />}
                      <span>{isLightMode ? "High-Contrast Light" : "Dark Mode Default"}</span>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${isLightMode ? 'bg-[#06B6D4]' : 'bg-white/10'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all transform ${isLightMode ? 'left-[22px]' : 'left-0.5'}`} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
              <button className="bg-[#06B6D4] hover:bg-[#06B6D4]/80 text-black font-semibold px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bento-card p-6 bg-gradient-to-br from-[#8B5CF6]/10 to-[#06B6D4]/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#06B6D4]" />
                App Preview
              </h3>
              <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-white transition-colors flex items-center gap-1">
                <ExternalLink className="w-3 h-3" /> Portal
              </button>
            </div>
            
            <div className="relative mx-auto w-[240px] h-[500px] bg-black border-[6px] border-gray-800 rounded-[3rem] overflow-hidden shadow-2xl">
              <div className="absolute top-0 w-full h-6 bg-black z-10 flex justify-center">
                <div className="w-20 h-4 bg-gray-800 rounded-b-xl" />
              </div>
              
              <div className="w-full h-full bg-[#050816] p-4 flex flex-col pt-10">
                <div className="flex justify-between items-center mb-6">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold" style={{ background: primaryColor }}>
                    {brandName.charAt(0)}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10" />
                </div>
                
                <h4 className="text-white font-medium mb-1">Hello, Sarah</h4>
                <p className="text-xs text-gray-400 mb-6">Let's book your next session</p>
                
                <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: `${primaryColor}20`, border: `1px solid ${primaryColor}40` }}>
                  <div className="text-xs text-white/70 mb-1">Upcoming</div>
                  <div className="text-sm text-white font-medium mb-2">Yoga Class</div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Today, 5:00 PM</span>
                  </div>
                </div>
                
                <div className="text-xs font-semibold text-gray-400 mb-3 mt-2">Services</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-square rounded-xl bg-white/5 border border-white/10" />
                  <div className="aspect-square rounded-xl bg-white/5 border border-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
