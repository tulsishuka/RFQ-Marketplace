
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

  const [activeFilter, setActiveFilter] =
    useState("All Available");


  // ==========================================
  // GET CURRENT SUPPLIER
  // ==========================================

  const storedUser = localStorage.getItem("user");

  const currentUser = storedUser
    ? JSON.parse(storedUser)
    : null;


  // ==========================================
  // FETCH RFQs + MY QUOTES
  // ==========================================

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }


      // ----------------------------------------
      // 1. GET ALL AVAILABLE RFQs
      // ----------------------------------------

      const rfqResponse = await fetch(
        "http://localhost:3000/api/supplier/rfqs",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const rfqData = await rfqResponse.json();

      if (!rfqResponse.ok) {
        setError(
          rfqData.message ||
            "Failed to fetch RFQs."
        );

        return;
      }

      setRfqs(rfqData.rfqs || []);


      // ----------------------------------------
      // 2. GET MY QUOTATIONS
      // ----------------------------------------

      const quoteResponse = await fetch(
        "http://localhost:3000/api/supplier/quotes/my",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const quoteData =
        await quoteResponse.json();

      if (!quoteResponse.ok) {
        setError(
          quoteData.message ||
            "Failed to fetch quotations."
        );

        return;
      }

      setQuotes(quoteData.quotes || []);

    } catch (error) {
      console.error(
        "Supplier dashboard error:",
        error
      );

      setError(
        "Unable to connect to server."
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchDashboardData();
  }, []);


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  // ==========================================
  // METRICS
  // ==========================================

  const availableRFQs = rfqs.length;

  const myQuotations = quotes.length;

  /*
    At the moment your Quote model does not
    contain a quotation status field.

    Therefore we count quotations whose RFQ
    is still open as pending.
  */

  const pendingQuotations =
    quotes.filter(
      (quote) =>
        quote.rfq?.status === "open"
    ).length;


  // ==========================================
  // SEARCH + FILTER
  // ==========================================

  const filteredRFQs = rfqs.filter((rfq) => {

    const searchText =
      `${rfq.productService}
      ${rfq.description}
      ${rfq.deliveryLocation}`
        .toLowerCase();

    const matchesSearch =
      searchText.includes(
        search.toLowerCase()
      );

    /*
      Your current RFQ model does not contain
      category information.

      So the category buttons are currently
      visual filters only.

      "All Available" shows everything.
    */

    const matchesFilter =
      activeFilter === "All Available";

    return matchesSearch && matchesFilter;
  });


  // ==========================================
  // IMAGE
  // ==========================================

  const getRFQImage = (rfq: RFQ) => {

    if (
      rfq.images &&
      rfq.images.length > 0
    ) {
      return `http://localhost:3000${rfq.images[0]}`;
    }

    /*
      If buyer didn't upload an image,
      use a simple fallback.
    */

    return "";
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">

        <div className="text-center">

          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-sm text-slate-500">
            Loading supplier marketplace...
          </p>

        </div>

      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 max-w-7xl mx-auto space-y-6 text-slate-800">


      {/* ========================================== */}
      {/* HEADER BANNER */}
      {/* ========================================== */}

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>

          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">

            <span className="w-2 h-2 rounded-full bg-blue-600"></span>

            <span>
              SUPPLIER LIVE MARKETPLACE
            </span>

          </div>


          <h1 className="text-2xl font-bold text-slate-900">

            Welcome back
            {currentUser?.name
              ? `, ${currentUser.name}`
              : ""}

          </h1>


          <p className="text-slate-500 text-xs mt-0.5">
            Find relevant RFQs and submit competitive quotations across the marketplace.
          </p>

        </div>


        <button
          onClick={() =>
            navigate(
              "/supplier/browse-rfqs"
            )
          }
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors self-start md:self-auto"
        >

          <Globe size={15} />

          Browse RFQs

          <ArrowRight size={15} />

        </button>

      </div>


      {/* ========================================== */}
      {/* ERROR */}
      {/* ========================================== */}

      {error && (

        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center justify-between text-sm text-red-700">

          <div className="flex items-center gap-2">

            <AlertTriangle size={17} />

            {error}

          </div>


          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded-lg text-xs font-semibold"
          >

            <RefreshCw size={13} />

            Retry

          </button>

        </div>

      )}


      {/* ========================================== */}
      {/* KEY METRICS */}
      {/* ========================================== */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


        {/* AVAILABLE RFQs */}

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-xs font-bold text-slate-400">
                Available RFQs
              </p>

              <p className="text-3xl font-extrabold text-slate-900 mt-1">
                {availableRFQs}
              </p>

            </div>


            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">

              <Search size={18} />

            </div>

          </div>


          <div className="flex items-center justify-between text-xs mt-4">

            <span className="text-slate-500">
              Open for Bidding
            </span>

            <span className="bg-emerald-50 text-emerald-600 font-semibold px-2.5 py-0.5 rounded-full text-[11px]">

              Live

            </span>

          </div>

        </div>


        {/* MY QUOTATIONS */}

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-xs font-bold text-slate-400">
                My Quotations
              </p>

              <p className="text-3xl font-extrabold text-slate-900 mt-1">
                {myQuotations}
              </p>

            </div>


            <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600">

              <Send size={18} />

            </div>

          </div>


          <div className="flex items-center justify-between text-xs mt-4">

            <span className="text-slate-500">
              Total Submitted
            </span>

            <span className="bg-sky-50 text-sky-600 font-semibold px-2.5 py-0.5 rounded-full text-[11px]">

              {myQuotations} submitted

            </span>

          </div>

        </div>


        {/* PENDING */}

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-xs font-bold text-slate-400">
                Pending Quotations
              </p>

              <p className="text-3xl font-extrabold text-slate-900 mt-1">
                {pendingQuotations}
              </p>

            </div>


            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">

              <Hourglass size={18} />

            </div>

          </div>


          <div className="flex items-center justify-between text-xs mt-4">

            <span className="text-slate-500">
              RFQs still open
            </span>

            <span className="bg-slate-100 text-slate-600 font-medium px-2.5 py-0.5 rounded-full text-[11px] flex items-center gap-1">

              <Clock size={11} />

              Awaiting buyer

            </span>

          </div>

        </div>

      </div>


      {/* ========================================== */}
      {/* LATEST RFQs */}
      {/* ========================================== */}

      <div className="space-y-4">


        {/* TITLE */}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">

          <div>

            <div className="flex items-center gap-2">

              <h2 className="text-lg font-bold text-slate-900">
                Latest RFQs
              </h2>

              <span className="bg-blue-100 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded-full">

                {rfqs.length} Live

              </span>

            </div>


            <p className="text-xs text-slate-500">
              Recently posted buyer requirements available for quotation.
            </p>

          </div>


          {/* SEARCH */}

          <div className="relative w-full md:w-72">

            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search RFQs..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
            />

          </div>

        </div>


        {/* FILTER */}

        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/70 p-1 rounded-xl w-fit">

          {[
            "All Available",
          ].map((filter) => {

            const isActive =
              activeFilter === filter;

            return (

              <button
                key={filter}
                onClick={() =>
                  setActiveFilter(filter)
                }
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >

                {filter}

              </button>

            );

          })}

        </div>


        {/* ========================================== */}
        {/* NO RFQs */}
        {/* ========================================== */}

        {filteredRFQs.length === 0 && (

          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">

            <Search
              size={38}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-bold text-slate-800">
              No RFQs available
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              No buyer requirements match your search.
            </p>

          </div>

        )}


        {/* ========================================== */}
        {/* RFQ CARDS */}
        {/* ========================================== */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {filteredRFQs.map((rfq) => (

            <div
              key={rfq._id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
            >

              <div>


                {/* IMAGE */}

                <div className="relative h-44 w-full bg-slate-100">

                  {getRFQImage(rfq) ? (

                    <img
                      src={getRFQImage(rfq)}
                      alt={rfq.productService}
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="w-full h-full flex items-center justify-center">

                      <Package
                        size={45}
                        className="text-slate-300"
                      />

                    </div>

                  )}


                  {/* CATEGORY */}

                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">

                    <Package size={13} />

                    Buyer Requirement

                  </div>


                  {/* STATUS */}

                  <div className="absolute top-3 right-3 bg-emerald-700/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">

                    {rfq.status}

                  </div>

                </div>


                {/* CARD CONTENT */}

                <div className="p-4 space-y-3">


                  <div className="flex items-start justify-between gap-2">

                    <h3 className="font-bold text-slate-900 text-base leading-snug">

                      {rfq.productService}

                    </h3>

                    <span className="text-[9px] font-mono text-slate-400 font-semibold">

                      #{rfq._id.slice(-6)}

                    </span>

                  </div>


                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">

                    {rfq.description}

                  </p>


                  {/* DETAILS */}

                  <div className="bg-slate-50 p-3 rounded-xl grid grid-cols-2 gap-y-3 text-xs">

                    <div>

                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                        Quantity
                      </span>

                      <span className="font-bold text-slate-800">

                        {rfq.quantity}{" "}
                        {rfq.unit}

                      </span>

                    </div>


                    <div>

                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                        Delivery Location
                      </span>

                      <span className="font-bold text-slate-800">

                        {rfq.deliveryLocation}

                      </span>

                    </div>


                    <div>

                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                        Bid Deadline
                      </span>

                      <span className="font-bold text-red-600">

                        {formatDate(
                          rfq.deadline
                        )}

                      </span>

                    </div>


                    <div>

                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                        Posted Date
                      </span>

                      <span className="font-bold text-slate-700">

                        {formatDate(
                          rfq.createdAt
                        )}

                      </span>

                    </div>

                  </div>

                </div>

              </div>


              {/* FOOTER */}

              <div className="p-4 pt-0 flex items-center justify-between gap-2">

                <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">

                  <ShieldCheck size={14} />

                  Registered Buyer

                </span>


                <button
                  onClick={() =>
                    navigate(
                      `/supplier/rfq/${rfq._id}`
                    )
                  }
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors"
                >

                  View Details

                  <ArrowRight size={13} />

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* ========================================== */}
      {/* MARKETPLACE STATUS */}
      {/* ========================================== */}

      <div className="space-y-2 pt-2">

        <div className="flex items-center justify-between text-xs">

          <span className="font-bold text-slate-800 flex items-center gap-1.5">

            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>

            Marketplace Status

          </span>

          <span className="text-slate-400 text-[10px]">

            Live database connection

          </span>

        </div>


        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 flex items-center justify-between text-xs text-emerald-700">

          <div className="flex items-center gap-2">

            <ShieldCheck
              size={16}
              className="text-emerald-500"
            />

            <span className="font-medium">

              Marketplace data loaded successfully.

            </span>

          </div>


          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-1 px-3 py-1 bg-white border border-emerald-200 text-emerald-600 rounded-lg text-xs font-semibold hover:bg-emerald-50 transition-colors"
          >

            <RefreshCw size={12} />

            Refresh

          </button>

        </div>

      </div>

    </div>
  );
};

export default SupplierDashboard;

