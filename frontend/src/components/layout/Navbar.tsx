import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="w-full bg-black shadow-sm  px-4 sm:px-6 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center"
          >
            <div className="flex items-center space-x-2">

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

              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-lg leading-tight tracking-tight text-white">
                  RFQ<span className="text-blue-500">Market</span>
                </span>

                <span className="text-[7px] sm:text-[9px] text-gray-400 font-semibold tracking-wider uppercase -mt-0.5">
                  B2B SOURCING PLATFORM
                </span>
              </div>

            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium">

            <Link
              to="/"
              className="text-gray-300 hover:text-blue-500 transition-colors"
            >
              Home
            </Link>

            <Link
              to="/"
              className="text-gray-300 hover:text-blue-500 transition-colors"
            >
              How It Works
            </Link>

            <Link
              to="/"
              className="text-gray-300 hover:text-blue-500 transition-colors"
            >
              About
            </Link>

          </div>

          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 text-sm">

            <Link
              to="/login"
              className="text-gray-300 hover:text-white font-medium transition-colors"
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
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
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

        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-800">

            <div className="flex flex-col space-y-3 text-sm font-medium">

              <Link
                to="/"
                onClick={closeMenu}
                className="px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-blue-500 transition-colors"
              >
                Home
              </Link>

              <Link
                to="/"
                onClick={closeMenu}
                className="px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-blue-500 transition-colors"
              >
                How It Works
              </Link>

              <Link
                to="/"
                onClick={closeMenu}
                className="px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-blue-500 transition-colors"
              >
                About
              </Link>

              <div className="pt-2 border-t border-gray-800 flex flex-col gap-3">

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="px-3 py-2 text-gray-300 hover:text-white transition-colors"
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
