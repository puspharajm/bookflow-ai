import { 
  LayoutDashboard, CalendarCheck, Users, Calendar, GitMerge, Activity, Link, 
  FileText, DollarSign, RefreshCw, ShieldAlert, Plug, Search, Map, Layout, Settings, LogOut, X
} from "lucide-react";
import { ElementType } from "react";
import { cn } from "../lib/utils";
import { navItems } from "../data";

const iconMap: Record<string, ElementType> = {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Calendar,
  GitMerge,
  Activity,
  Link,
  FileText,
  DollarSign,
  RefreshCw,
  ShieldAlert,
  Plug,
  Search,
  Map,
  Layout,
  Settings,
};

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  user: any;
  onLogout: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen, user, onLogout }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={cn(
        "w-64 h-screen border-r border-white/5 bg-[#0a0a0a] flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out md:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#FF4F00] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              Bookflow.ai
            </span>
          </div>
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto hidden-scrollbar px-3 py-2 space-y-6">
          {navItems.map((group, groupIndex) => (
            <div key={groupIndex}>
              {group.group !== "Main" && (
                <div className="px-4 text-xs font-bold tracking-wider text-gray-500 uppercase mb-2">
                  {group.group}
                </div>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = iconMap[item.icon] || LayoutDashboard;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                        isActive
                          ? "bg-[#FF4F00]/10 text-[#FF4F00] font-medium"
                          : "text-gray-400 hover:text-gray-200 hover:bg-white/5 font-normal"
                      )}
                    >
                      <Icon className={cn("w-4 h-4", isActive ? "text-[#FF4F00]" : "text-gray-400")} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 mt-auto border-t border-white/5">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 w-full bg-transparent hover:bg-white/5 p-2 rounded-lg cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#FF4F00] flex items-center justify-center text-white font-medium text-sm shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex flex-col text-left overflow-hidden">
              <span className="text-sm font-medium text-white truncate">{user?.name || 'User'}</span>
              <span className="text-xs text-gray-500 capitalize">{user?.role || 'Member'}</span>
            </div>
            <LogOut className="w-4 h-4 text-gray-500 ml-auto shrink-0" />
          </button>
        </div>
      </div>
    </>
  );
}
