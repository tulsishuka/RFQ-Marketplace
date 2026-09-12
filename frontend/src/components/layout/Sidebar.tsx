import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Search,
  FileText,
  User,
  LogOut,
  ShieldCheck,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const navigationItems = [
    { name: "Dashboard", path: "/supplier/dashboard", icon: LayoutGrid },
    { name: "Browse RFQs", path: "/supplier/browse-rfqs", icon: Search },
    { name: "My Quotations", path: "/supplier/my-quotations", icon: FileText },
    { name: "Profile", path: "/supplier/profile", icon: User },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-200/80 flex flex-col justify-between p-4 text-slate-700 select-none">
      
      {/* Top Section */}
      <div className="space-y-5">
        
        {/* Logo Header */}
        <div className="flex items-center justify-between px-2 pt-1 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-xs">
              RFQ
            </div>
            <span className="font-extrabold text-slate-900 text-lg tracking-tight">
              RFQ<span className="text-blue-600">Hub</span>
            </span>
          </div>
          <div className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded leading-tight text-right">
            SUPPLIER<br />HUB
          </div>
        </div>

        {/* Status Badge */}
        <div className="bg-emerald-50 border border-emerald-100/80 rounded-lg p-2 flex items-center justify-between text-xs">
          <span className="text-emerald-700 font-bold flex items-center gap-1.5 text-[11px] tracking-wide">
            <ShieldCheck size={14} className="text-emerald-600" />
            ACTIVE SELLER
          </span>
          <span className="text-[10px] font-semibold text-slate-400">v2 border</span>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1 pt-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                }`}
              >
                <Icon size={17} className={isActive ? "text-white" : "text-slate-500"} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Footer Section */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        
        {/* User Card */}
        <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
            VM
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-slate-900 truncate leading-tight">
              Vikram Mehta
            </h4>
            <p className="text-[10px] text-slate-400 truncate leading-tight">
              Apex Industrial...
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => console.log("Logging out...")}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
        >
          <LogOut size={14} />
          <span>Log Out</span>
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;