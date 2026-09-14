/* eslint-disable react-hooks/set-state-in-effect */


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Globe,
  ArrowRight,
  Search,
  Send,
  Hourglass,
  Clock,
  ShieldCheck,
  Package,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

interface Buyer {
  _id: string;
  name: string;
  email: string;
}

interface RFQ {
  _id: string;
  productService: string;
  description: string;
  quantity: number;
  unit: "Units" | "Pcs" | "Bays" | "Kg";
  deliveryLocation: string;
  deadline: string;
  images: string[];
  status: "open" | "closed";
  createdAt: string;
  buyer?: Buyer;
}

interface QuoteRFQ {
  _id: string;
  productService: string;
  quantity: number;
  unit: string;
  deliveryLocation: string;
  deadline: string;
  status: string;
}

interface Quote {
  _id: string;
  rfq: QuoteRFQ;
  supplier: string;
  price: number;
  deliveryTime: string;
  message: string;
  createdAt: string;
}

const SupplierDashboard = () => {
  const navigate = useNavigate();

  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeFilter, setActiveFilter] = useState("All Available");

  const storedUser = localStorage.getItem("user");

  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

    
      const rfqResponse = await fetch(
        "https://rfq-marketplace-502m.onrender.com/api/supplier/rfqs",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const rfqData = await rfqResponse.json();

      if (!rfqResponse.ok) {
        setError(rfqData.message || "Failed to fetch RFQs.");
        return;
      }

      setRfqs(rfqData.rfqs || []);

      const quoteResponse = await fetch(
        "https://rfq-marketplace-502m.onrender.com/api/supplier/quotes/my",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const quoteData = await quoteResponse.json();

      if (!quoteResponse.ok) {
        setError(quoteData.message || "Failed to fetch quotations.");
        return;
      }

      setQuotes(quoteData.quotes || []);
    } catch (err) {
      console.error("Supplier dashboard error:", err);
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);


  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };


  const availableRFQs = rfqs.length;
  const myQuotations = quotes.length;
  const pendingQuotations = quotes.filter(
    (quote) => quote.rfq?.status === "open"
  ).length;


  const filteredRFQs = rfqs.filter((rfq) => {
    const searchText =
      `${rfq.productService} ${rfq.description} ${rfq.deliveryLocation}`.toLowerCase();

    const matchesSearch = searchText.includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All Available";

    return matchesSearch && matchesFilter;
  });

  
  const getRFQImage = (rfq: RFQ) => {
    if (rfq.images && rfq.images.length > 0) {
      return `https://rfq-marketplace-502m.onrender.com/${rfq.images[0]}`;
    }
    return "";
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B132B] text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-slate-400">
            Loading supplier marketplace...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 p-6 md:p-8 max-w-[1400px] mx-auto space-y-6 font-sans">
  
      <div className="bg-[#111C3A] rounded-2xl p-6 border border-slate-800/80 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span>SUPPLIER LIVE MARKETPLACE</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Welcome back
            {currentUser?.name ? `, ${currentUser.name}` : ""}
          </h1>

          <p className="text-slate-400 text-xs mt-1">
            Find relevant RFQs and submit competitive quotations across your registered industrial verticals.
          </p>
        </div>

        <button
          onClick={() => navigate("/supplier/browse-rfqs")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-900/30 transition-all self-start md:self-auto"
        >
          <Globe size={15} />
          Browse RFQs
          <ArrowRight size={15} />
        </button>
      </div>

      {error && (
        <div className="bg-red-950/40 border border-red-800/60 rounded-xl p-4 flex items-center justify-between text-xs text-red-300">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-400" />
            <span>{error}</span>
          </div>

          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900/50 hover:bg-red-900 border border-red-700/50 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            <RefreshCw size={12} />
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#111C3A] rounded-2xl p-5 border border-slate-800/80 shadow-md flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">Available RFQs</p>
              <p className="text-3xl font-extrabold text-white mt-1">
                {availableRFQs}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-800/40 text-blue-400">
              <Search size={18} />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs mt-6">
            <span className="text-slate-400">Open for Bidding</span>
            <span className="bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full text-[10px]">
              +8 new today
            </span>
          </div>
        </div>

        <div className="bg-[#111C3A] rounded-2xl p-5 border border-slate-800/80 shadow-md flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">My Quotations</p>
              <p className="text-3xl font-extrabold text-white mt-1">
                {myQuotations}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-800/40 text-blue-400">
              <Send size={18} />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs mt-6">
            <span className="text-slate-400">Total Submitted</span>
            <span className="bg-blue-950/80 border border-blue-800/40 text-blue-400 font-semibold px-2.5 py-0.5 rounded-full text-[10px]">
              4 under evaluation
            </span>
          </div>
        </div>

        <div className="bg-[#111C3A] rounded-2xl p-5 border border-slate-800/80 shadow-md flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">
                Pending Quotations
              </p>
              <p className="text-3xl font-extrabold text-white mt-1">
                {pendingQuotations}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-300">
              <Hourglass size={18} />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs mt-6">
            <span className="text-slate-400">Awaiting Buyer Decision</span>
            <span className="bg-slate-800/80 text-slate-300 font-medium px-2.5 py-0.5 rounded-full text-[10px] flex items-center gap-1 border border-slate-700/50">
              <Clock size={11} />
              Avg response 2.4 days
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        {/* HEADER & CONTROLS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">Latest RFQs</h2>
              <span className="bg-blue-900/60 border border-blue-700/50 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {rfqs.length} Live
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Recently posted requirements matching your category profile
            </p>
          </div>

          {/* SEARCH INPUT */}
          <div className="relative w-full md:w-72">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search RFQs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#111C3A] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: `All Available (${rfqs.length})`, key: "All Available" },
            { label: "Industrial & Warehouse (0)", key: "Industrial" },
            { label: "Office & IT (0)", key: "Office" },
            { label: "Packaging & Bulk (10)", key: "Packaging" },
          ].map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  isActive
                    ? "bg-blue-600 border-blue-500 text-white shadow-sm"
                    : "bg-[#111C3A]/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-[#111C3A]"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {filteredRFQs.length === 0 && (
          <div className="bg-[#111C3A] rounded-2xl border border-slate-800/80 p-12 text-center">
            <Search size={36} className="mx-auto text-slate-600 mb-3" />
            <h3 className="font-bold text-white text-base">No RFQs available</h3>
            <p className="text-xs text-slate-400 mt-1">
              No buyer requirements match your search criteria.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredRFQs.map((rfq) => (
            <div
              key={rfq._id}
              className="bg-[#111C3A] rounded-2xl border border-slate-800/80 shadow-md overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                {/* IMAGE CONTAINER */}
                <div className="relative h-44 w-full bg-slate-900/80 overflow-hidden">
                  {getRFQImage(rfq) ? (
                    <img
                      src={getRFQImage(rfq)}
                      alt={rfq.productService}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900/50">
                      <Package size={42} className="text-slate-700" />
                    </div>
                  )}

                  {/* STATUS BADGE OVERLAY */}
                  <div className="absolute top-3 right-3 bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-ping"></span>
                    {rfq.status === "open" ? "Open for Bids" : rfq.status}
                  </div>
                </div>

                {/* CARD BODY */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-white text-base line-clamp-1">
                      {rfq.productService}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500 font-semibold shrink-0">
                      RFQ-#{rfq._id.slice(-4).toUpperCase()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {rfq.description}
                  </p>

                  <div className="bg-[#0B132B]/70 p-3 rounded-xl grid grid-cols-2 gap-y-3 text-xs border border-slate-800/50">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block tracking-wider">
                        Quantity
                      </span>
                      <span className="font-bold text-slate-200">
                        {rfq.quantity} {rfq.unit}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block tracking-wider">
                        Delivery Location
                      </span>
                      <span className="font-bold text-slate-200 line-clamp-1">
                        {rfq.deliveryLocation}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block tracking-wider">
                        Bid Deadline
                      </span>
                      <span className="font-bold text-red-400">
                        {formatDate(rfq.deadline)}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block tracking-wider">
                        Posted Date
                      </span>
                      <span className="font-bold text-slate-300">
                        {formatDate(rfq.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-1 flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <ShieldCheck size={14} />
                  Verified Buyer
                </span>

                <button
                  onClick={() => navigate(`/supplier/rfq/${rfq._id}`)}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-all shadow-md shadow-blue-900/20"
                >
                  View Details
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );
};

export default SupplierDashboard;