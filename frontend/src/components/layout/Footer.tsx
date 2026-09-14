import { Menu } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#040814] font-sans text-slate-400">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12 lg:px-8">
        
        <div className="grid grid-cols-1 gap-8 pb-8 sm:pb-12 lg:grid-cols-12 lg:gap-12">
          
          <div className="space-y-4 lg:col-span-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-white">
                <Menu className="h-4 w-4 stroke-[2.5]" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                RFQMarket
              </span>
            </div>

            <p className="hidden max-w-sm text-xs leading-relaxed text-slate-400 sm:block">
              The standard enterprise marketplace for commercial RFQ publication, supplier validation, and comparative tender governance.
            </p>

            <div className="hidden flex-wrap items-center gap-2.5 pt-2 sm:flex">
              <span className="rounded border border-slate-800 bg-[#0B101E] px-2.5 py-1 text-[11px] font-medium text-slate-300">
                ISO 27001 Certified
              </span>
              <span className="rounded border border-slate-800 bg-[#0B101E] px-2.5 py-1 text-[11px] font-medium text-slate-300">
                SOC 2 Type II
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
                PLATFORM
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <a href="#workflow" className="transition-colors hover:text-white">
                    Workflow Engine
                  </a>
                </li>
                <li>
                  <a href="#directory" className="transition-colors hover:text-white">
                    Supplier Directory
                  </a>
                </li>
                <li>
                  <a href="#bom" className="transition-colors hover:text-white">
                    BOM Standardization
                  </a>
                </li>
                <li>
                  <a href="#security" className="transition-colors hover:text-white">
                    Security & Audit Logs
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
                SOLUTIONS
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <a href="#direct-procurement" className="transition-colors hover:text-white">
                    Direct Procurement
                  </a>
                </li>
                <li>
                  <a href="#oem" className="transition-colors hover:text-white">
                    OEM Manufacturing
                  </a>
                </li>
                <li>
                  <a href="#contract-suppliers" className="transition-colors hover:text-white">
                    Contract Suppliers
                  </a>
                </li>
                <li>
                  <a href="#erp" className="transition-colors hover:text-white">
                    ERP / API Connectors
                  </a>
                </li>
              </ul>
            </div>

            <div className="hidden space-y-3 sm:block">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
                LEGAL & TRUST
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <a href="#terms-procurement" className="transition-colors hover:text-white">
                    Terms of Procurement
                  </a>
                </li>
                <li>
                  <a href="#nda" className="transition-colors hover:text-white">
                    NDA & Confidentiality
                  </a>
                </li>
                <li>
                  <a href="#compliance" className="transition-colors hover:text-white">
                    Compliance Verification
                  </a>
                </li>
                <li>
                  <a href="#status" className="transition-colors hover:text-white">
                    System Status
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800/60 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© 2026 RFQMarket Inc. All rights reserved.</p>

          <div className="hidden items-center gap-6 sm:flex">
            <a href="#privacy" className="transition-colors hover:text-slate-400">
              Privacy Policy
            </a>
            <a href="#cookies" className="transition-colors hover:text-slate-400">
              Cookie Settings
            </a>
            <a href="#vulnerability" className="transition-colors hover:text-slate-400">
              Vulnerability Disclosure
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;