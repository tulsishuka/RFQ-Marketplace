/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Plus,
  SlidersHorizontal,
  FileText,
  Activity,
  MessageSquareQuote,
  CheckCircle,
  ChevronRight,
  ShieldCheck,
  ArrowUpRight,
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
}


const BuyerDashboard = () => {
  const navigate = useNavigate();

  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [quoteCount, setQuoteCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRFQs = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      const response = await fetch(
        "https://rfq-marketplace-502m.onrender.com/api/rfqs/my",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Failed to fetch RFQs"
        );
        return;
      }

      setRfqs(data.rfqs || []);

      let totalQuotes = 0;

      for (const rfq of data.rfqs || []) {
        try {
          const quoteResponse = await fetch(
            `https://rfq-marketplace-502m.onrender.com/api/rfqs/${rfq._id}/quotes`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const quoteData = await quoteResponse.json();

          if (quoteResponse.ok) {
            totalQuotes += quoteData.count || 0;
          }
        } catch (quoteError) {
          console.error(
            `Failed to fetch quotes for ${rfq._id}`,
            quoteError
          );
        }
      }

      setQuoteCount(totalQuotes);
    } catch (error) {
      console.error(
        "Fetch RFQs error:",
        error
      );

      setError(
        "Unable to connect to server"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRFQs();
  }, []);

  const totalRFQs = rfqs.length;

  const activeRFQs = rfqs.filter(
    (rfq) => rfq.status === "open"
  ).length;

  const closedRFQs = rfqs.filter(
    (rfq) => rfq.status === "closed"
  ).length;

  const stats = [
    {
      title: "Total RFQs",
      value: totalRFQs.toString(),
      badge: `${totalRFQs} RFQs created`,
      badgeColor:
        "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20",
      icon: FileText,
      iconBg:
        "bg-slate-800 text-slate-300 border border-slate-700",
    },

    {
      title: "Active RFQs",
      value: activeRFQs.toString(),
      badge: `${activeRFQs} Open - Awaiting bids`,
      badgeColor:
        "text-blue-400 bg-blue-500/10 border border-blue-500/20",
      icon: Activity,
      iconBg:
        "bg-blue-900/40 text-blue-400 border border-blue-800/60",
      borderColor:
        "border-b-2 border-b-blue-500",
    },

    {
      title: "Quotations Received",
      value: quoteCount.toString(),
      badge:
        quoteCount > 0
          ? `${quoteCount} Supplier Proposals`
          : "No quotations yet",
      badgeColor:
        "text-cyan-400 bg-cyan-500/10 border border-cyan-500/20",
      icon: MessageSquareQuote,
      iconBg:
        "bg-cyan-900/40 text-cyan-400 border border-cyan-800/60",
      borderColor:
        "border-b-2 border-b-cyan-500",
    },

    {
      title: "Closed RFQs",
      value: closedRFQs.toString(),
      badge:
        closedRFQs > 0
          ? `${closedRFQs} Completed`
          : "No closed RFQs",
      badgeColor:
        "text-slate-400 bg-slate-800/80 border border-slate-700/50",
      icon: CheckCircle,
      iconBg:
        "bg-slate-800 text-slate-400 border border-slate-700",
    },
  ];

  const formatDate = (
    dateString: string
  ) => {
    const date = new Date(dateString);

    return date.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  


//   const getImageUrl = (image: string) => {
//   if (!image) return "";

//   if (image.startsWith("http")) {
//     return image;
//   }

//   return `https://rfq-marketplace-502m.onrender.com${image}`;
// };



const getImageUrl = (image: string) => {
  if (!image) return "";

  // Old images saved with localhost
  if (image.includes("localhost:3000")) {
    const path = image.split("localhost:3000")[1];

    return `https://rfq-marketplace-502m.onrender.com${path}`;
  }

  // Already deployed backend URL
  if (
    image.startsWith(
      "https://rfq-marketplace-502m.onrender.com"
    )
  ) {
    return image;
  }

  // Any other complete URL
  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  // Relative path: /uploads/image.png
  const cleanImage = image.replace(/^\/+/, "");

  return `https://rfq-marketplace-502m.onrender.com/${cleanImage}`;
};

  return (

  <div className="min-h-screen w-full flex-1 min-w-0  bg-[#070b14]  text-slate-100 p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-5 lg:space-y-6">
      <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800/80 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">

            <span className="bg-slate-800/80 text-blue-400 px-2.5 py-0.5 rounded border border-blue-500/20">
              Buyer Portal
            </span>

            <span>•</span>

            <span className="text-emerald-400">
              Live Data
            </span>
          </div>

          <h1 className="text-2xl font-bold text-white tracking-tight">
            Welcome back, Buyer
          </h1>

          <p className="text-emerald-400 text-sm mt-0.5">
            Manage your RFQs and review supplier quotations.
          </p>
        </div>

        <div className="flex items-center gap-3">

          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-slate-200 text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <SlidersHorizontal size={16} />
            Preferences
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/buyer/createrfq")
            }
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-lg shadow-blue-600/30 transition-all"
          >
            <Plus size={16} />
            Create RFQ
          </button>

        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-[#0f172a] rounded-2xl p-10 text-center border border-slate-800">
          <p className="text-sm text-slate-400">
            Loading your RFQs...
          </p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="bg-red-950/40 border border-red-800/60 rounded-2xl p-5">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* Statistics */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {stats.map(
              (stat, idx) => {
                const IconComponent =
                  stat.icon;

                return (
                  <div
                    key={idx}
                    className={`bg-[#0f172a] rounded-2xl p-5 border border-slate-800/80 shadow-md flex flex-col justify-between ${
                      stat.borderColor || ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">

                      <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                          {stat.title}
                        </p>

                        <p className="text-3xl font-bold text-white mt-1">
                          {stat.value}
                        </p>
                      </div>

                      <div
                        className={`p-2.5 rounded-xl ${stat.iconBg}`}
                      >
                        <IconComponent size={20} />
                      </div>

                    </div>

                    <div className="mt-2">
                      <span
                        className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${stat.badgeColor}`}
                      >
                        {stat.badge}
                      </span>
                    </div>

                  </div>
                );
              }
            )}

          </div>

          <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

            <div className="max-w-xl">

              <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                Procurement Cycle Velocity
              </p>

              <h2 className="text-xl font-bold text-white">
                Your procurement dashboard
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Track your RFQs and supplier quotations from one place.
              </p>

            </div>

            <div className="flex items-center gap-4 self-stretch md:self-auto justify-start">

              <div className="bg-[#182238] rounded-xl p-3 border border-slate-700/60 flex items-center gap-3 shadow-inner min-w-[170px]">

                <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-blue-200 flex items-center justify-center text-xs font-bold text-blue-400 bg-blue-950/50">
                  {totalRFQs > 0 ? "100%" : "0%"}
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-100">
                    RFQs
                  </p>

                  <p className="text-[11px] text-slate-400">
                    Created by you
                  </p>
                </div>

              </div>

              <div className="bg-[#182238] rounded-xl p-3 border border-slate-700/60 flex items-center gap-3 shadow-inner min-w-[170px]">

                <div className="w-10 h-10 rounded-full border-4 border-emerald-500 border-t-emerald-200 flex items-center justify-center text-xs font-bold text-emerald-400 bg-emerald-950/50">
                  {quoteCount}
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-100">
                    Quotes
                  </p>

                  <p className="text-[11px] text-slate-400">
                    Supplier proposals
                  </p>
                </div>

              </div>

            </div>
          </div>

          <div className="space-y-4">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-bold text-white">
                  Recent RFQs
                </h2>

                <p className="text-xs text-slate-400">
                  Latest requirements posted to the supplier marketplace
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/buyer/buyerdetail")
                }
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
              >
                View All RFQs
                <ArrowUpRight size={14} />
              </button>

            </div>

            {rfqs.length === 0 && (
              <div className="bg-[#0f172a] rounded-2xl p-12 border border-slate-800/80 text-center">

                <FileText
                  size={40}
                  className="mx-auto text-slate-600 mb-3"
                />

                <h3 className="font-semibold text-slate-200">
                  No RFQs yet
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  Create your first RFQ to start receiving supplier quotations.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/buyer/createrfq")
                  }
                  className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all"
                >
                  <Plus size={16} />
                  Create RFQ
                </button>

              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {rfqs.slice(0, 4).map(
                (rfq) => {

                  const status =
                    rfq.status ===
                    "open"
                      ? "Open"
                      : "Closed";

                  const statusColor =
                    rfq.status ===
                    "open"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                      : "bg-slate-800 text-slate-400 border border-slate-700";

                  return (
                    <div
                      key={rfq._id}
                      className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800/80 shadow-md flex flex-col justify-between hover:border-slate-700 transition-all"
                    >

                      <div>

                        <div className="flex items-start justify-between gap-3 mb-3">

                          <div className="flex items-center gap-3">

                            <div className="w-11 h-11 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-700">

                              {rfq.images &&
                              rfq.images.length >
                                0 ? (
                                <img
                                  src={getImageUrl(
                                    rfq.images[0]
                                  )}
                                  alt={
                                    rfq.productService
                                  }
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <FileText
                                  size={18}
                                  className="text-slate-500"
                                />
                              )}

                            </div>

                            <div>
                              <h3 className="font-bold text-white text-base leading-tight">
                                {
                                  rfq.productService
                                }
                              </h3>

                              <p className="text-xs text-slate-400">
                                RFQ #
                                {rfq._id.slice(
                                  -8
                                )}
                              </p>
                            </div>

                          </div>

                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor}`}
                          >
                            {status}
                          </span>

                        </div>

                        <p className="text-xs text-slate-300 mb-4 line-clamp-2">
                          {
                            rfq.description
                          }
                        </p>

                        <div className="bg-[#182238]/60 rounded-xl p-3 grid grid-cols-3 gap-2 mb-4 border border-slate-800">

                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                              Quantity
                            </p>

                            <p className="text-xs font-bold text-slate-100 mt-0.5">
                              {
                                rfq.quantity
                              }{" "}
                              {
                                rfq.unit
                              }
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                              Location
                            </p>

                            <p className="text-xs font-bold text-slate-100 mt-0.5 truncate">
                              {
                                rfq.deliveryLocation
                              }
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                              Deadline
                            </p>

                            <p className="text-xs font-bold text-slate-100 mt-0.5">
                              {
                                formatDate(
                                  rfq.deadline
                                )
                              }
                            </p>
                          </div>

                        </div>

                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800">

                        <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-900/40">
                          View quotations
                        </span>

                        <div className="flex items-center gap-2">

                          

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/buyer/buyerdetail?id=${rfq._id}`
                              )
                            }
                            className="flex items-center gap-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors shadow-md shadow-blue-600/20"
                          >
                            View Details
                            <ChevronRight
                              size={13}
                            />
                          </button>

                        </div>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>

          <div className="bg-gradient-to-r from-blue-950 via-[#0d1b3e] to-[#0f172a] text-white rounded-2xl p-5 border border-blue-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden shadow-lg">

            <div className="space-y-1 relative z-10">

              <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-wider">

                <ShieldCheck
                  size={16}
                  className="text-blue-400"
                />

                <span>
                  RFQHub Guarantee
                </span>

              </div>

              <p className="font-bold text-base text-white">
                Simple 3-Step Buyer Workflow
              </p>

              <p className="text-xs text-slate-300">
                1. Post Requirement → 2. Compare Supplier Quotations → 3. Connect directly without hidden fees.
              </p>

            </div>


          </div>

        </>
      )}

    </div>
  );
};

export default BuyerDashboard;

