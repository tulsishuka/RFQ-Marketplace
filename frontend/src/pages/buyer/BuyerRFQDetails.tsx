
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  ArrowLeft,
  Pencil,
  Trash2,
  MapPin,
  ClipboardList,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Star,
  Check,
  MessageSquare,
  Zap,
  Tag,
  Wrench,
  Clock,
  Truck,
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

interface Supplier {
  _id: string;
  name: string;
  email: string;
}

interface Quote {
  _id: string;
  rfq: string;
  supplier: Supplier;
  price: number;
  deliveryTime: string;
  message: string;
  createdAt: string;
}

const BuyerRFQDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get the RFQ id from:
  // /buyer/buyerdetail?id=123
  const rfqId = searchParams.get("id");

  const [rfq, setRfq] = useState<RFQ | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRFQDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      if (!rfqId) {
        setError("RFQ ID is missing.");
        return;
      }

      // --------------------------------
      // 1. Fetch selected RFQ
      // --------------------------------

      const rfqResponse = await fetch(
        `http://localhost:3000/api/rfqs/${rfqId}`,
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
          rfqData.message || "Failed to fetch RFQ details."
        );
        return;
      }

      setRfq(rfqData.rfq);

      // --------------------------------
      // 2. Fetch quotations for this RFQ
      // --------------------------------

      const quoteResponse = await fetch(
        `http://localhost:3000/api/rfqs/${rfqId}/quotes`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const quoteData = await quoteResponse.json();

      if (quoteResponse.ok) {
        setQuotes(quoteData.quotes || []);
      } else {
        console.error(
          "Failed to fetch quotations:",
          quoteData.message
        );
      }
    } catch (error) {
      console.error(
        "Fetch RFQ details error:",
        error
      );

      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRFQDetails();
  }, [rfqId]);

  // --------------------------------
  // Loading
  // --------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-sm text-slate-500">
            Loading RFQ details...
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------
  // Error
  // --------------------------------

  if (error || !rfq) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-md">
          <p className="text-red-600 font-semibold">
            {error || "RFQ not found."}
          </p>

          <button
            onClick={() => navigate("/buyer/dashboard")}
            className="mt-5 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------
  // Calculations
  // --------------------------------

  const lowestQuote =
    quotes.length > 0
      ? [...quotes].sort(
          (a, b) => a.price - b.price
        )[0]
      : null;

  const fastestQuote =
    quotes.length > 0
      ? [...quotes].sort((a, b) => {
          const aDays =
            parseInt(a.deliveryTime) || 999999;

          const bDays =
            parseInt(b.deliveryTime) || 999999;

          return aDays - bDays;
        })[0]
      : null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 max-w-7xl mx-auto space-y-6 text-slate-800">

      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <div className="space-y-3">

        <div className="flex items-center justify-between text-xs text-slate-500">

          <button
            onClick={() =>
              navigate("/buyer/dashboard")
            }
            className="flex items-center gap-1.5 font-medium hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to My RFQs
          </button>

          <div className="flex items-center gap-3 font-mono">

            <span>
              RFQ-ID: #{rfq._id.slice(-8).toUpperCase()}
            </span>

            <span className="flex items-center gap-1 text-emerald-600 font-sans font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

              {rfq.status === "open"
                ? "Open RFQ"
                : "Closed RFQ"}
            </span>

          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <h1 className="text-2xl font-bold text-slate-900">
                {rfq.productService}
              </h1>

              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                  rfq.status === "open"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {rfq.status === "open"
                  ? "Open"
                  : "Closed"}
              </span>

            </div>

            <p className="text-slate-500 text-xs mt-1">
              RFQ created on{" "}
              {formatDate(rfq.createdAt)}
            </p>

          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                navigate(
                  `/buyer/buyerdetail?id=${rfq._id}&edit=true`
                )
              }
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold bg-white hover:bg-slate-50 transition-colors"
            >
              <Pencil size={14} />
              Edit RFQ
            </button>

            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 text-xs font-semibold transition-colors"
            >
              <Trash2 size={14} />
              Delete RFQ
            </button>

          </div>

        </div>
      </div>


      {/* ========================================= */}
      {/* TOP SUMMARY */}
      {/* ========================================= */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ----------------------------------------- */}
        {/* RFQ DETAILS */}
        {/* ----------------------------------------- */}

        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-5">

          <div className="flex items-center justify-between border-b border-slate-100 pb-4">

            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <ClipboardList
                className="text-blue-600"
                size={20}
              />

              <span>
                Buyer Requirement Details
              </span>
            </div>

            <span className="text-xs text-slate-400">
              RFQ Requirement
            </span>

          </div>


          {/* SPEC GRID */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

            <div className="bg-slate-50/80 p-3 rounded-xl">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                PRODUCT / SERVICE
              </p>

              <p className="font-bold text-slate-800 text-xs mt-1">
                {rfq.productService}
              </p>
            </div>


            <div className="bg-blue-50/60 p-3 rounded-xl">

              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                TOTAL QUANTITY
              </p>

              <p className="font-bold text-blue-700 text-xs mt-1">
                {rfq.quantity} {rfq.unit}
              </p>

            </div>


            <div className="bg-slate-50/80 p-3 rounded-xl">

              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                DELIVERY LOCATION
              </p>

              <p className="font-bold text-slate-800 text-xs mt-1 flex items-center gap-1">

                <MapPin
                  size={12}
                  className="text-slate-500"
                />

                {rfq.deliveryLocation}

              </p>

            </div>


            <div className="bg-slate-50/80 p-3 rounded-xl">

              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                DEADLINE FOR QUOTES
              </p>

              <p className="font-bold text-red-600 text-xs mt-1">
                {formatDate(rfq.deadline)}
              </p>

            </div>


            <div className="bg-slate-50/80 p-3 rounded-xl">

              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                POSTED ON
              </p>

              <p className="font-bold text-slate-800 text-xs mt-1">
                {formatDate(rfq.createdAt)}
              </p>

            </div>


            <div className="bg-slate-50/80 p-3 rounded-xl">

              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                STATUS
              </p>

              <p className="font-bold text-slate-800 text-xs mt-1 capitalize">
                {rfq.status}
              </p>

            </div>

          </div>


          {/* DESCRIPTION */}

          <div className="space-y-1.5">

            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              REQUIREMENT DESCRIPTION & SPECIFICATIONS
            </p>

            <div className="bg-blue-50/30 border border-blue-100/60 p-4 rounded-xl text-xs text-slate-700 leading-relaxed">
              {rfq.description}
            </div>

          </div>


          {/* IMAGES */}

          {rfq.images &&
            rfq.images.length > 0 && (

              <div className="space-y-2">

                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  REFERENCE IMAGES
                </p>

                <div className="flex flex-wrap gap-3">

                  {rfq.images.map(
                    (image, index) => (

                      <img
                        key={index}
                        src={`http://localhost:3000${image}`}
                        alt={`RFQ reference ${index + 1}`}
                        className="w-28 h-28 object-cover rounded-xl border border-slate-200"
                      />

                    )
                  )}

                </div>

              </div>

            )}


          {/* FOOTER */}

          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 gap-2">

            <div className="flex items-center gap-4">

              <span className="flex items-center gap-1 text-slate-600">

                <CheckCircle2
                  size={13}
                  className="text-emerald-500"
                />

                Requirement Saved

              </span>

              <span className="flex items-center gap-1 text-slate-600">

                <Truck
                  size={13}
                  className="text-blue-500"
                />

                Delivery:{" "}
                {rfq.deliveryLocation}

              </span>

            </div>

          </div>

        </div>


        {/* ----------------------------------------- */}
        {/* MARKETPLACE VITALITY */}
        {/* ----------------------------------------- */}

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">

          <div>

            <div className="flex items-center justify-between mb-4">

              <h3 className="font-bold text-slate-900 text-sm">
                RFQ Marketplace Vitality
              </h3>

              <TrendingUp
                size={16}
                className="text-blue-600"
              />

            </div>


            <div className="flex items-center justify-between my-4">

              <div>

                <div className="text-3xl font-bold text-slate-900">

                  {quotes.length}

                  <span className="text-sm font-normal text-slate-500">
                    {" "}
                    Quotes
                  </span>

                </div>

                <p className="text-xs text-emerald-600 font-medium mt-1">

                  {quotes.length > 0
                    ? "Suppliers have responded"
                    : "Waiting for supplier quotes"}

                </p>

              </div>


              <div className="relative w-14 h-14 flex items-center justify-center rounded-full border-4 border-blue-600 border-t-slate-200">

                <span className="text-xs font-bold text-slate-800">
                  {quotes.length > 0
                    ? "100%"
                    : "0%"}
                </span>

              </div>

            </div>


            <div className="space-y-2 text-xs border-t border-slate-100 pt-4">

              <div className="flex justify-between items-center gap-3">

                <span className="text-slate-400">
                  Lowest Bid Received
                </span>

                <span className="font-bold text-slate-800 text-right">

                  {lowestQuote
                    ? formatPrice(
                        lowestQuote.price
                      )
                    : "No bids"}

                </span>

              </div>


              <div className="flex justify-between items-center gap-3">

                <span className="text-slate-400">
                  Fastest Delivery
                </span>

                <span className="font-bold text-slate-800 text-right">

                  {fastestQuote
                    ? fastestQuote.deliveryTime
                    : "No bids"}

                </span>

              </div>


              <div className="flex justify-between items-center gap-3">

                <span className="text-slate-400">
                  Total Quotations
                </span>

                <span className="font-bold text-slate-800">
                  {quotes.length}
                </span>

              </div>

            </div>

          </div>


          <div className="bg-blue-50/70 rounded-xl p-3 flex items-start gap-2 text-xs text-blue-900">

            <ShieldCheck
              size={16}
              className="text-blue-600 flex-shrink-0 mt-0.5"
            />

            <span>
              Quotations shown below are submitted by registered suppliers.
            </span>

          </div>

        </div>

      </div>


      {/* ========================================= */}
      {/* QUOTATIONS */}
      {/* ========================================= */}

      <div className="space-y-4">

        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-2">

              <h2 className="text-lg font-bold text-slate-900">
                Quotations Received ({quotes.length})
              </h2>

              {quotes.length > 0 && (
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  LIVE BIDS
                </span>
              )}

            </div>

            <p className="text-xs text-slate-500">
              Compare quotation proposals submitted by suppliers for this RFQ.
            </p>

          </div>

        </div>


        {/* ========================================= */}
        {/* EMPTY QUOTES */}
        {/* ========================================= */}

        {quotes.length === 0 && (

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">

            <MessageSquare
              size={36}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-bold text-slate-800">
              No quotations yet
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Suppliers have not submitted quotations for this RFQ yet.
            </p>

          </div>

        )}


        {/* ========================================= */}
        {/* QUOTE CARDS */}
        {/* ========================================= */}

        {quotes.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {quotes.map((q, index) => {

              const isLowest =
                lowestQuote?._id === q._id;

              const isFastest =
                fastestQuote?._id === q._id;

              let badge = "";

              let badgeStyle =
                "bg-blue-100 text-blue-700";

              if (isLowest) {
                badge = "Lowest Price";
                badgeStyle =
                  "bg-emerald-100 text-emerald-700";
              } else if (isFastest) {
                badge = "Best Delivery Speed";
                badgeStyle =
                  "bg-blue-100 text-blue-700";
              } else {
                badge = "Supplier Quote";
              }

              return (

                <div
                  key={q._id}
                  className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                    isLowest
                      ? "border-emerald-500 shadow-md ring-1 ring-emerald-500"
                      : "border-slate-100 shadow-sm hover:shadow-md"
                  }`}
                >

                  <div>

                    {/* QUOTE HEADER */}

                    <div className="p-5 pb-3">

                      <div className="flex items-center justify-between mb-3">

                        <span
                          className={`text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 ${badgeStyle}`}
                        >

                          {isLowest && (
                            <Tag size={12} />
                          )}

                          {isFastest &&
                            !isLowest && (
                              <Zap size={12} />
                            )}

                          {!isLowest &&
                            !isFastest && (
                              <Wrench size={12} />
                            )}

                          {badge}

                        </span>

                        {isLowest && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                            Best Value
                          </span>
                        )}

                      </div>


                      <h3 className="font-bold text-slate-900 text-lg leading-tight">

                        {q.supplier?.name ||
                          "Unknown Supplier"}

                      </h3>


                      <div className="flex flex-col gap-1 mt-1 text-xs">

                        <span className="text-blue-600 font-medium flex items-center gap-0.5">

                          <ShieldCheck size={13} />

                          Registered Supplier

                        </span>

                        <span className="text-slate-400">

                          {q.supplier?.email}

                        </span>

                      </div>

                    </div>


                    {/* PRICE */}

                    <div
                      className={`mx-5 p-4 rounded-xl ${
                        isLowest
                          ? "bg-emerald-50/70 border border-emerald-100"
                          : "bg-slate-50"
                      }`}
                    >

                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        TOTAL QUOTED PRICE
                      </p>

                      <div className="flex items-baseline gap-2 mt-0.5">

                        <span
                          className={`text-2xl font-extrabold ${
                            isLowest
                              ? "text-emerald-700"
                              : "text-slate-900"
                          }`}
                        >
                          {formatPrice(q.price)}
                        </span>

                      </div>

                      <div className="text-xs mt-1">

                        <span className="text-slate-500 font-medium">

                          Unit Rate:{" "}
                          {formatPrice(
                            q.price /
                              rfq.quantity
                          )}{" "}
                          / {rfq.unit}

                        </span>

                      </div>

                    </div>


                    {/* DELIVERY + MESSAGE */}

                    <div className="p-5 space-y-3">

                      <div className="grid grid-cols-1 gap-2 text-xs">

                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">

                          <span className="text-slate-400 text-[10px] block uppercase font-bold">
                            Delivery Timeline
                          </span>

                          <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">

                            <Clock
                              size={12}
                              className="text-slate-400"
                            />

                            {q.deliveryTime}

                          </span>

                        </div>

                      </div>


                      {/* SUPPLIER MESSAGE */}

                      <div className="space-y-1">

                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">

                          <span className="flex items-center gap-1">

                            <MessageSquare size={11} />

                            SUPPLIER MESSAGE

                          </span>

                        </div>

                        <p className="text-xs text-slate-600 bg-slate-50/70 p-3 rounded-xl border border-slate-100 italic leading-relaxed">

                          {q.message ||
                            "No message provided."}

                        </p>

                      </div>


                      {/* SUBMITTED DATE */}

                      <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">

                        <span>
                          Submitted:{" "}
                          {formatDate(
                            q.createdAt
                          )}
                        </span>

                      </div>

                    </div>

                  </div>


                  {/* ACTIONS */}

                  <div className="p-5 pt-0 space-y-2">

                    <button
                      className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                    >
                      <Check size={14} />
                      Accept Quotation
                    </button>

                    <button
                      className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageSquare size={14} />
                      Contact Supplier
                    </button>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </div>

    </div>
  );
};

export default BuyerRFQDetails;
