import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Plus,
  SlidersHorizontal,
  FileText,
  Activity,
  MessageSquareQuote,
  CheckCircle,
  Pencil,
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

interface Quote {
  _id: string;
  rfq: string;
  supplier: {
    _id: string;
    name: string;
    email: string;
  };
  price: number;
  deliveryTime: string;
  message: string;
  createdAt: string;
}

const BuyerDashboard = () => {
  const navigate = useNavigate();

  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [quoteCount, setQuoteCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch buyer RFQs
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
        "http://localhost:3000/api/rfqs/my",
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

      // Fetch quotations for every RFQ
      let totalQuotes = 0;

      for (const rfq of data.rfqs || []) {
        try {
          const quoteResponse = await fetch(
            `http://localhost:3000/api/rfqs/${rfq._id}/quotes`,
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

  // Statistics
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
        "text-emerald-600 bg-emerald-50",
      icon: FileText,
      iconBg:
        "bg-blue-50 text-blue-600",
    },

    {
      title: "Active RFQs",
      value: activeRFQs.toString(),
      badge: `${activeRFQs} Open - Awaiting bids`,
      badgeColor:
        "text-blue-600 bg-blue-50",
      icon: Activity,
      iconBg:
        "bg-indigo-50 text-indigo-600",
      borderColor:
        "border-b-2 border-blue-600",
    },

    {
      title: "Quotations Received",
      value: quoteCount.toString(),
      badge:
        quoteCount > 0
          ? `${quoteCount} Supplier Proposals`
          : "No quotations yet",
      badgeColor:
        "text-cyan-600 bg-cyan-50",
      icon: MessageSquareQuote,
      iconBg:
        "bg-cyan-50 text-cyan-600",
      borderColor:
        "border-b-2 border-cyan-500",
    },

    {
      title: "Closed RFQs",
      value: closedRFQs.toString(),
      badge:
        closedRFQs > 0
          ? `${closedRFQs} Completed`
          : "No closed RFQs",
      badgeColor:
        "text-gray-500 bg-gray-50",
      icon: CheckCircle,
      iconBg:
        "bg-gray-100 text-gray-600",
    },
  ];

  // Format date
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

  // Get image URL
  const getImageUrl = (
    image: string
  ) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    return `http://localhost:3000${image}`;
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 space-y-6 max-w-7xl mx-auto text-slate-800">

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">

            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              Buyer Portal
            </span>

            <span>•</span>

            <span>
              Live Data
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, Buyer
          </h1>

          <p className="text-slate-500 text-sm mt-0.5">
            Manage your RFQs and review supplier quotations.
          </p>
        </div>

        <div className="flex items-center gap-3">

          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            <SlidersHorizontal size={16} />
            Preferences
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/buyer/createrfq")
            }
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 shadow-sm transition-colors"
          >
            <Plus size={16} />
            Create RFQ
          </button>

        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-100">
          <p className="text-sm text-slate-500">
            Loading your RFQs...
          </p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
          <p className="text-sm text-red-600">
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
                    className={`bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between ${
                      stat.borderColor || ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">

                      <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                          {stat.title}
                        </p>

                        <p className="text-3xl font-bold text-slate-900 mt-1">
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

          {/* Procurement Banner */}
          <div className="bg-gradient-to-r from-blue-50/60 to-indigo-50/40 rounded-2xl p-6 border border-blue-100/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

            <div className="max-w-xl">

              <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                Procurement Cycle Velocity
              </p>

              <h2 className="text-xl font-bold text-slate-900">
                Your procurement dashboard
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Track your RFQs and supplier quotations from one place.
              </p>

            </div>

            <div className="flex items-center gap-4 self-stretch md:self-auto justify-start">

              <div className="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-3 shadow-sm min-w-[170px]">

                <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-t-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
                  {totalRFQs > 0 ? "100%" : "0%"}
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-800">
                    RFQs
                  </p>

                  <p className="text-[11px] text-slate-400">
                    Created by you
                  </p>
                </div>

              </div>

              <div className="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-3 shadow-sm min-w-[170px]">

                <div className="w-10 h-10 rounded-full border-4 border-emerald-600 border-t-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700">
                  {quoteCount}
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Quotes
                  </p>

                  <p className="text-[11px] text-slate-400">
                    Supplier proposals
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* Recent RFQs */}
          <div className="space-y-4">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent RFQs
                </h2>

                <p className="text-xs text-slate-500">
                  Latest requirements posted to the supplier marketplace
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/buyer/buyerdetail")
                }
                className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1"
              >
                View All RFQs
                <ArrowUpRight size={14} />
              </button>

            </div>

            {/* Empty State */}
            {rfqs.length === 0 && (
              <div className="bg-white rounded-2xl p-12 border border-slate-100 shadow-sm text-center">

                <FileText
                  size={40}
                  className="mx-auto text-slate-300 mb-3"
                />

                <h3 className="font-semibold text-slate-800">
                  No RFQs yet
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Create your first RFQ to start receiving supplier quotations.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/buyer/createrfq")
                  }
                  className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-medium hover:bg-blue-800"
                >
                  <Plus size={16} />
                  Create RFQ
                </button>

              </div>
            )}

            {/* RFQ Cards */}
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
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-600";

                  return (
                    <div
                      key={rfq._id}
                      className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                    >

                      <div>

                        {/* Card Top */}
                        <div className="flex items-start justify-between gap-3 mb-3">

                          <div className="flex items-center gap-3">

                            <div className="w-11 h-11 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">

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
                                  className="text-slate-400"
                                />
                              )}

                            </div>

                            <div>
                              <h3 className="font-bold text-slate-900 text-base leading-tight">
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

                        {/* Description */}
                        <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                          {
                            rfq.description
                          }
                        </p>

                        {/* Information */}
                        <div className="bg-slate-50 rounded-xl p-3 grid grid-cols-3 gap-2 mb-4">

                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                              Quantity
                            </p>

                            <p className="text-xs font-bold text-slate-800 mt-0.5">
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

                            <p className="text-xs font-bold text-slate-800 mt-0.5 truncate">
                              {
                                rfq.deliveryLocation
                              }
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                              Deadline
                            </p>

                            <p className="text-xs font-bold text-slate-800 mt-0.5">
                              {
                                formatDate(
                                  rfq.deadline
                                )
                              }
                            </p>
                          </div>

                        </div>

                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">

                        <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700">
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
                            className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg border border-slate-200 transition-colors"
                          >
                            <Pencil
                              size={13}
                            />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/buyer/buyerdetail?id=${rfq._id}`
                              )
                            }
                            className="flex items-center gap-1 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-lg transition-colors"
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

          {/* Bottom Banner */}
          <div className="bg-blue-900 text-white rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">

            <div className="space-y-1 relative z-10">

              <div className="flex items-center gap-1.5 text-blue-200 text-xs font-bold uppercase tracking-wider">

                <ShieldCheck
                  size={16}
                  className="text-blue-300"
                />

                <span>
                  RFQHub Guarantee
                </span>

              </div>

              <p className="font-bold text-base">
                Simple 3-Step Buyer Workflow
              </p>

              <p className="text-xs text-blue-200">
                1. Post Requirement → 2. Compare Supplier Quotations → 3. Connect directly without hidden fees.
              </p>

            </div>

            <button
              type="button"
              className="relative z-10 bg-white text-blue-900 text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-colors flex-shrink-0"
            >
              Learn Guidelines
            </button>

          </div>

        </>
      )}

    </div>
  );
};

export default BuyerDashboard;