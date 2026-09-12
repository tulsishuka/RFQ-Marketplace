import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="w-full bg-white border-b border-gray-100 shadow-sm rounded-t-2xl px-4 sm:px-6 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto">

        {/* Main Navbar */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center"
          >
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium">

            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>

            <Link
              to="/buyer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              How It Works
            </Link>

            <Link
              to="/supplier"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </Link>

          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 text-sm">

            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 lg:px-5 py-2 sm:py-2.5 rounded-lg shadow-sm transition-all duration-200"
            >
              Get Started
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-100">

            <div className="flex flex-col space-y-3 text-sm font-medium">

              <Link
                to="/"
                onClick={closeMenu}
                className="px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              >
                Home
              </Link>

              <Link
                to="/"
                onClick={closeMenu}
                className="px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              >
                How It Works
              </Link>

              <Link
                to="/"
                onClick={closeMenu}
                className="px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              >
                About
              </Link>

              <div className="pt-2 border-t border-gray-100 flex flex-col gap-3">

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm transition-all duration-200"
                >
                  Get Started
                </Link>

              </div>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;