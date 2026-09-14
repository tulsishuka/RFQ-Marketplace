
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Calendar,
  Package,
  ArrowRight,
  FileText,
  Globe,
  AlertTriangle,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

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
  buyer?: {
    name: string;
    email: string;
  };
}

const BrowseRFQs = () => {
  const navigate = useNavigate();

  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRFQs = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      const response = await fetch("https://rfq-marketplace-502m.onrender.com/api/supplier/rfqs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to fetch RFQs");
        return;
      }

      setRfqs(data.rfqs || []);
    } catch (error) {
      console.error(error);
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRFQs();
  }, []);

  const filteredRFQs = rfqs.filter((rfq) =>
    `${rfq.productService} ${rfq.description} ${rfq.deliveryLocation}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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
          <p className="mt-4 text-xs text-slate-400">Loading available RFQs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 p-4 md:p-8 max-w-[1400px] mx-auto space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-[#111C3A] rounded-2xl p-6 border border-slate-800/80 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-1">
            <Globe size={13} />
            <span>LIVE BROWSER MARKETPLACE</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Browse All RFQs
          </h1>

          <p className="text-slate-400 text-xs mt-1">
            Find buyer requirements and submit your quotations across active industrial categories.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#0B132B]/80 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-white">{rfqs.length} Active Solicitations</span>
        </div>
      </div>

      <div className="relative max-w-xl">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search product, requirement or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-[#111C3A] border border-slate-800 rounded-xl outline-none focus:border-blue-500 text-xs text-white placeholder-slate-500 transition-colors shadow-sm"
        />
      </div>

      {error && (
        <div className="bg-red-950/40 border border-red-800/60 rounded-xl p-4 flex items-center justify-between text-xs text-red-300">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-400" />
            <span>{error}</span>
          </div>

          <button
            onClick={fetchRFQs}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900/50 hover:bg-red-900 border border-red-700/50 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            <RefreshCw size={12} />
            Retry
          </button>
        </div>
      )}

      {!error && filteredRFQs.length === 0 && (
        <div className="bg-[#111C3A] rounded-2xl border border-slate-800/80 p-12 text-center">
          <FileText size={40} className="mx-auto text-slate-600 mb-3" />

          <h3 className="font-bold text-white text-base">No RFQs found</h3>

          <p className="text-xs text-slate-400 mt-1">
            Try another search or check again later.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRFQs.map((rfq) => (
          <div
            key={rfq._id}
            className="bg-[#111C3A] rounded-2xl border border-slate-800/80 shadow-md overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group"
          >
            <div>
              <div className="relative h-40 w-full bg-slate-900/80 overflow-hidden">
                {getRFQImage(rfq) ? (
                  <img
                    src={getRFQImage(rfq)}
                    alt={rfq.productService}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-900/50">
                    <Package size={38} className="text-slate-700" />
                  </div>
                )}

                {/* Status Overlay */}
                <div className="absolute top-3 right-3 bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-ping"></span>
                  {rfq.status === "open" ? "Open" : rfq.status}
                </div>
              </div>

              {/* Card Main Info */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-base font-bold text-white line-clamp-1">
                    {rfq.productService}
                  </h2>
                  <span className="text-[10px] font-mono text-slate-500 font-semibold shrink-0">
                    RFQ-#{rfq._id.slice(-4).toUpperCase()}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {rfq.description}
                </p>

                <div className="bg-[#0B132B]/70 p-3 rounded-xl grid grid-cols-2 gap-3 text-xs border border-slate-800/50">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                      Quantity
                    </span>
                    <p className="flex items-center gap-1 mt-1 text-xs font-bold text-slate-200">
                      <Package size={13} className="text-blue-400" />
                      {rfq.quantity} {rfq.unit}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                      Location
                    </span>
                    <p className="flex items-center gap-1 mt-1 text-xs font-bold text-slate-200 line-clamp-1">
                      <MapPin size={13} className="text-slate-400" />
                      {rfq.deliveryLocation}
                    </p>
                  </div>

                  <div className="col-span-2 border-t border-slate-800/50 pt-2 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                        Quote Deadline
                      </span>
                      <p className="flex items-center gap-1 mt-0.5 text-xs font-bold text-red-400">
                        <Calendar size={13} />
                        {formatDate(rfq.deadline)}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                        Posted
                      </span>
                      <p className="text-xs font-medium text-slate-400 mt-0.5">
                        {formatDate(rfq.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 flex flex-col gap-3">
              <div className="flex items-center justify-between text-[11px] text-emerald-400 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} />
                  Verified Buyer Demand
                </span>
              </div>

              <button
                onClick={() => navigate(`/supplier/rfq/${rfq._id}`)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition shadow-md shadow-blue-900/20"
              >
                View RFQ & Submit Quote
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseRFQs;