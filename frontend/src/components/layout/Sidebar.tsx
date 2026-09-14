import { Link } from "react-router-dom";

type Role = "buyer" | "supplier";

interface SidebarProps {
  role: Role;
}

const Sidebar = ({ role }: SidebarProps) => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-200">

    <Link to="/" className="block p-4 border-b border-slate-200">
       <div className="flex items-center space-x-2">

              {/* Logo Icon */}
              <div className="bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center">
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

              {/* Logo Text */}
              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-lg leading-tight tracking-tight text-gray-900">
                  RFQ<span className="text-blue-600">Market</span>
                </span>

                <span className="text-[7px] sm:text-[9px] text-gray-400 font-semibold tracking-wider uppercase -mt-0.5">
                  B2B SOURCING PLATFORM
                </span>
              </div>
              

            </div>
</Link>
      {/* Buyer */}
      {role === "buyer" && (
        <nav className="px-4 space-y-2">

          <Link
            to="/buyer/dashboard"
            className="block px-4 py-3 rounded-lg hover:bg-slate-100"
          >
            Dashboard
          </Link>

          <Link
            to="/buyer/createrfq"
            className="block px-4 py-3 rounded-lg hover:bg-slate-100"
          >
            Create RFQ
          </Link>

          <Link
            to="/buyer/buyerdetail"
            className="block px-4 py-3 rounded-lg hover:bg-slate-100"
          >
            RFQ Details
          </Link>

        </nav>
      )}

      {/* Supplier */}
      {role === "supplier" && (
        <nav className="px-4 space-y-2">

          <Link
            to="/supplier/dashboard"
            className="block px-4 py-3 rounded-lg hover:bg-slate-100"
          >
            Dashboard
          </Link>

          <Link
            to="/supplier/browse-rfqs"
            className="block px-4 py-3 rounded-lg hover:bg-slate-100"
          >
            Browse RFQs
          </Link>
  <Link
            to="/supplier/myquotation"
            className="block px-4 py-3 rounded-lg hover:bg-slate-100"
          >
           My Quotations
          </Link>
            <Link
            to="/supplier/supplierdetail"
            className="block px-4 py-3 rounded-lg hover:bg-slate-100"
          >
            RFQ Details
          </Link>
        </nav>
      )}

    </aside>
  );
};

export default Sidebar;