
import { Link } from "react-router-dom";

type Role = "buyer" | "supplier";

interface SidebarProps {
  role: Role;
}

const Sidebar = ({ role }: SidebarProps) => {
  return (
    <aside
      className="
        w-40
        sm:w-48
        md:w-60
        lg:w-64
        min-h-screen
        shrink-0
        bg-[#0d1527]
        text-slate-300
        border-r
        border-slate-800
      "
    >
      <Link
        to="/"
        className="
          flex
          items-center
          gap-3
          px-3
          sm:px-4
          md:px-6
          py-4
          md:py-5
          border-b
          border-slate-800/60
          hover:bg-slate-800/30
          transition-colors
        "
      >
        {/* Logo */}
        <div
          className="
            bg-blue-600
            text-white
            p-2
            sm:p-2.5
            rounded-xl
            shrink-0
            shadow-lg
            shadow-blue-500/20
          "
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h10M4 18h16"
            />
          </svg>
        </div>

        <div className="min-w-0">
          <div className="font-bold text-base sm:text-lg leading-tight text-white">
            RFQ<span className="text-blue-500">Market</span>
          </div>

          <div className="text-[7px] sm:text-[9px] text-slate-400 font-semibold tracking-widest uppercase truncate">
            B2B SOURCING PLATFORM
          </div>
        </div>
      </Link>

      {role === "buyer" && (
        <nav className="flex flex-col gap-1.5 p-2 sm:p-3 md:p-4">
          
          <Link
            to="/buyer/dashboard"
            className="
              w-full
              px-2
              sm:px-3
              md:px-4
              py-2.5
              sm:py-3
              rounded-xl
              bg-blue-900/30
              text-blue-400
              font-medium
              border
              border-blue-500/20
              hover:bg-slate-800/60
              hover:text-blue-300
              transition-all
              text-xs
              sm:text-sm
              md:text-base
            "
          >
            Dashboard
          </Link>

          <Link
            to="/buyer/createrfq"
            className="
              w-full
              px-2
              sm:px-3
              md:px-4
              py-2.5
              sm:py-3
              rounded-xl
              hover:bg-slate-800/60
              hover:text-white
              transition-all
              text-xs
              sm:text-sm
              md:text-base
            "
          >
            Create RFQ
          </Link>
        </nav>
      )}

      {role === "supplier" && (
        <nav className="flex flex-col gap-1.5 p-2 sm:p-3 md:p-4">
          
          <Link
            to="/supplier/dashboard"
            className="
              w-full
              px-2
              sm:px-3
              md:px-4
              py-2.5
              sm:py-3
              rounded-xl
              bg-blue-900/30
              text-blue-400
              font-medium
              border
              border-blue-500/20
              hover:bg-slate-800/60
              hover:text-blue-300
              transition-all
              text-xs
              sm:text-sm
              md:text-base
            "
          >
            Dashboard
          </Link>

          <Link
            to="/supplier/browse-rfqs"
            className="
              w-full
              px-2
              sm:px-3
              md:px-4
              py-2.5
              sm:py-3
              rounded-xl
              hover:bg-slate-800/60
              hover:text-white
              transition-all
              text-xs
              sm:text-sm
              md:text-base
            "
          >
            Browse RFQs
          </Link>
  </nav>
      )}
    </aside>
  );
};

export default Sidebar;