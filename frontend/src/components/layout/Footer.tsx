
const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-100 bg-white font-sans text-slate-600">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12 lg:px-8">

        {/* ================= TOP CONTENT ================= */}
        <div className="grid grid-cols-1 gap-7 pb-7 sm:gap-10 sm:pb-12 md:grid-cols-12">

          {/* ================= BRAND ================= */}
          <div className="space-y-2 text-center md:col-span-5 md:text-left">
            <div className="flex items-center justify-center gap-2 text-lg font-bold text-slate-900 md:justify-start">
            <span className="font-bold text-base sm:text-lg leading-tight tracking-tight text-gray-900">
                  RFQ<span className="text-blue-600">Market</span>
                </span>
            </div>

            <p className="mx-auto max-w-sm text-sm leading-relaxed text-slate-500 md:mx-0">
              A simple B2B platform for structured sourcing and supplier quotations.
            </p>
          </div>

          {/* ================= LINKS ================= */}
          <div className="grid grid-cols-2 gap-6 md:col-span-7 md:grid-cols-3 md:gap-8">

            {/* Platform */}
            <div className="space-y-3 text-center md:text-left">
              <h4 className="text-sm font-semibold text-slate-900">
                Platform
              </h4>

              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <a href="#home" className="transition-colors hover:text-blue-600">
                    Home
                  </a>
                </li>

                <li>
                  <a
                    href="#how-it-works"
                    className="transition-colors hover:text-blue-600"
                  >
                    How It Works
                  </a>
                </li>

                <li>
                  <a href="#about" className="transition-colors hover:text-blue-600">
                    About
                  </a>
                </li>
              </ul>
            </div>

            {/* Account */}
            <div className="space-y-3 text-center md:text-left">
              <h4 className="text-sm font-semibold text-slate-900">
                Account
              </h4>

              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <a href="#login" className="transition-colors hover:text-blue-600">
                    Login
                  </a>
                </li>

                <li>
                  <a href="#signup" className="transition-colors hover:text-blue-600">
                    Sign Up
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - hidden on phone */}
            <div className="hidden space-y-3 text-center md:block md:text-left">
              <h4 className="text-sm font-semibold text-slate-900">
                Legal
              </h4>

              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <a href="#privacy" className="transition-colors hover:text-blue-600">
                    Privacy
                  </a>
                </li>

                <li>
                  <a href="#terms" className="transition-colors hover:text-blue-600">
                    Terms
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="flex flex-col items-center gap-3 border-t border-slate-200/60 pt-5 text-center text-xs text-slate-400 sm:flex-row sm:justify-between sm:text-left">

          <p>© 2026 RFQ Marketplace. All rights reserved.</p>

          {/* Status */}
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/50 bg-slate-100/80 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-medium text-slate-700">
              Systems Operational
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;