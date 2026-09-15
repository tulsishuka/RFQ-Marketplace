/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";

import {
  ArrowLeft,
  MapPin,
  Calendar,
  Package,
  FileText,
  Send,
  ShieldCheck,
  Clock,
  Copy,
  Info,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

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

const SupplierRFQDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [rfq, setRfq] = useState<RFQ | null>(null);

  const [price, setPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchRFQ = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      const response = await fetch(
        `https://rfq-marketplace-502m.onrender.com/api/supplier/rfqs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to fetch RFQ.");
        return;
      }
      console.log("RFQ DATA:", data.rfq);
console.log("IMAGE URL:", data.rfq?.images?.[0]);


      setRfq(data.rfq);
    } catch (error) {
      console.error(error);
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRFQ();
  }, [id]);

  const getImageUrl = (image: string) => {
    if (!image) {
      return "";
    }

    // Cloudinary or any complete image URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    // Old images saved as /uploads/...
    const cleanImage = image.replace(/^\/+/, "");

    return `https://rfq-marketplace-502m.onrender.com/${cleanImage}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!price || !deliveryTime) {
      setError("Price and delivery time are required.");
      return;
    }

    try {
      setSubmitting(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://rfq-marketplace-502m.onrender.com/api/supplier/rfqs/${id}/quotes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            price: Number(price),
            deliveryTime,
            message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to submit quotation.");
        return;
      }

      setSuccess("Quotation submitted successfully!");

      setPrice("");
      setDeliveryTime("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setError("Unable to connect to server.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B132B] text-slate-100 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!rfq) {
    return (
      <div className="min-h-screen bg-[#0B132B] text-slate-100 flex flex-col items-center justify-center p-8">
        <p className="text-red-400 font-medium mb-4">
          {error || "RFQ not found."}
        </p>

        <button
          onClick={() => navigate("/supplier/browse-rfqs")}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-xs transition"
        >
          Back to RFQs
        </button>
      </div>
    );
  }

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 p-4 md:p-8 max-w-[1400px] mx-auto space-y-6 font-sans">
      {/* Top Bar / Navigation Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <button
          onClick={() => navigate("/supplier/browse-rfqs")}
          className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#111C3A] hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition"
        >
          <ArrowLeft size={14} />
          Back to Browse RFQs
        </button>

        <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-slate-500" />
            <span>Posted: {formatDate(rfq.createdAt)}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-red-400" />
            <span>Deadline: {formatDate(rfq.deadline)}</span>
          </div>

          <span className="bg-emerald-950/80 border border-emerald-800/50 text-emerald-400 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
            ● Open for Bidding
          </span>
        </div>
      </div>

      {/* Header Info Banner */}
      <div className="bg-[#111C3A] rounded-2xl p-6 border border-slate-800/80 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-900/60 border border-blue-700/50 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
              Standard RFQ Specification
            </span>

            <span className="bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-md">
              Commercial Grade
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            RFQ Details: {rfq.productService}
          </h1>

          <p className="text-slate-400 text-xs mt-1">
            Review the verified buyer specification and submit your quotation
            proposal.
          </p>
        </div>

        <div className="bg-[#0B132B]/80 border border-blue-900/40 p-3.5 rounded-xl text-center min-w-[160px] self-start md:self-auto">
          <p className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">
            Competitive Bids Active
          </p>

          <p className="text-xl font-extrabold text-blue-400 mt-0.5">
            6 Received
          </p>
        </div>
      </div>

      {/* Main Details Section */}
      <div className="bg-[#111C3A] rounded-2xl border border-slate-800/80 shadow-md p-6 space-y-6">
        {/* Buyer & ID Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/60 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600 text-white">
              <FileText size={16} />
            </div>

            <div>
              <span className="text-slate-400">
                Buyer Requirements
              </span>

              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                  <ShieldCheck size={13} />
                  Verified Corporate Buyer
                </span>

                <span className="text-slate-600">•</span>

                <span className="text-slate-400 text-[11px]">
                  Enterprise Account
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigator.clipboard.writeText(rfq._id)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0B132B] hover:bg-slate-900 border border-slate-700/60 text-slate-300 rounded-lg text-xs font-mono transition"
          >
            <Copy size={12} />
            Copy RFQ ID
          </button>
        </div>

        {/* Top Spec Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="bg-[#0B132B]/70 p-3.5 rounded-xl border border-slate-800/60">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block tracking-wider">
              Product / Service
            </span>

            <p className="font-bold text-white text-sm mt-1">
              {rfq.productService}
            </p>

            <span className="text-[10px] text-slate-400 block mt-0.5">
              High-spec industrial
            </span>
          </div>

          <div className="bg-[#0B132B]/70 p-3.5 rounded-xl border border-slate-800/60">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block tracking-wider">
              Category
            </span>

            <p className="font-bold text-white text-sm mt-1">
              Commercial Office
            </p>

            <span className="text-[10px] text-slate-400 block mt-0.5">
              Workspace Interiors
            </span>
          </div>

          <div className="bg-[#0B132B]/70 p-3.5 rounded-xl border border-slate-800/60">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block tracking-wider">
              Required Quantity
            </span>

            <p className="font-bold text-blue-400 text-sm mt-1 flex items-center gap-1">
              <Package size={14} />
              {rfq.quantity} {rfq.unit}
            </p>

            <span className="text-[10px] text-slate-400 block mt-0.5">
              Single consolidated order
            </span>
          </div>

          <div className="bg-[#0B132B]/70 p-3.5 rounded-xl border border-slate-800/60">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block tracking-wider">
              Delivery Location
            </span>

            <p className="font-bold text-white text-sm mt-1 flex items-center gap-1">
              <MapPin size={14} className="text-slate-400" />
              {rfq.deliveryLocation}
            </p>

            <span className="text-[10px] text-slate-400 block mt-0.5">
              Pincode verified
            </span>
          </div>

          <div className="bg-[#0B132B]/70 p-3.5 rounded-xl border border-slate-800/60 col-span-2 md:col-span-1">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block tracking-wider">
              Bidding Closes
            </span>

            <p className="font-bold text-red-400 text-sm mt-1 flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(rfq.deadline)}
            </p>

            <span className="text-[10px] text-slate-400 block mt-0.5">
              23:59 IST (Firm)
            </span>
          </div>
        </div>

        {/* Detailed Description & Side Buyer Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#0B132B]/40 border border-slate-800/60 rounded-xl p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <FileText size={14} className="text-blue-400" />
                Full Specification Description
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {rfq.description}
              </p>
            </div>

            {/* Spec Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[#0B132B]/60 border border-slate-800/60 p-3 rounded-xl flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-950/80 border border-blue-800/40 text-blue-400 mt-0.5">
                  <ShieldCheck size={16} />
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white">
                    Quality Standard Compliance
                  </h4>

                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Mandatory quality & safety testing certificate required
                    upon award.
                  </p>
                </div>
              </div>

              <div className="bg-[#0B132B]/60 border border-slate-800/60 p-3 rounded-xl flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-950/80 border border-blue-800/40 text-blue-400 mt-0.5">
                  <Package size={16} />
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white">
                    Packaging & Handover
                  </h4>

                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Flat-packed or assembled with hardware and unloading dock
                    access.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Buyer Info & Image Panel */}
          <div className="space-y-4">
            {rfq.buyer && (
              <div className="bg-[#0B132B]/80 border border-slate-800/80 p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                    Buyer Credential Check
                  </span>

                  <span className="text-[10px] bg-emerald-950/80 border border-emerald-800/50 text-emerald-400 font-semibold px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-900/60 border border-blue-700/50 flex items-center justify-center font-bold text-blue-300 text-sm shrink-0">
                    {rfq.buyer.name.charAt(0)}
                  </div>

                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-white truncate">
                      {rfq.buyer.name}
                    </p>

                    <p className="text-[11px] text-slate-400 truncate">
                      {rfq.buyer.email}
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-[11px] space-y-1.5 border-t border-slate-800/60 text-slate-400">
                  <div className="flex justify-between">
                    <span>Payment Terms:</span>

                    <span className="text-slate-200 font-medium">
                      Net 30 Days (Escrow)
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>GSTIN Status:</span>

                    <span className="text-emerald-400 font-medium">
                      Verified Active
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Past Awards:</span>

                    <span className="text-slate-200 font-medium">
                      28 RFQs Settled
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Reference Image */}
            {rfq.images && rfq.images.length > 0 ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-800 h-44 bg-slate-900 group">
                <img
                  src={getImageUrl(rfq.images[0])}
                  alt="RFQ Reference"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-2.5 text-[10px] text-slate-300 flex justify-between items-center">
                  <span>Reference Style Specification</span>

                  <span className="font-semibold text-white">
                    {rfq.quantity} {rfq.unit}
                  </span>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-slate-800/80 bg-[#0B132B]/60 p-6 text-center text-slate-500 text-xs">
                <Package size={28} className="mx-auto mb-2 opacity-40" />
                No reference images provided by buyer.
              </div>
            )}
          </div>
        </div>

        {/* Submit Quotation */}
        <div className="bg-[#111C3A] rounded-2xl border border-slate-800/80 shadow-md p-6 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800/60 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-600 text-white">
                  <Send size={14} />
                </div>

                <h2 className="text-base font-bold text-white">
                  Submit Your Quotation
                </h2>
              </div>

              <p className="text-xs text-slate-400 mt-1">
                Provide your best price and delivery estimate to the buyer.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1 rounded-full text-[11px]">
                <ShieldCheck size={13} />
                Direct Submission
              </span>

              <span className="text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full text-[11px] border border-slate-700/50">
                No Cancellation Fee
              </span>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-950/30 border border-blue-900/50 rounded-xl p-3 flex items-start gap-2.5 text-xs text-blue-300">
            <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />

            <span>
              Your message and price are directly visible to the buyer. No
              separate chat is needed or supported. Quotations are compared
              directly in the buyer's procurement decision matrix.
            </span>
          </div>

          {/* Notifications */}
          {error && (
            <div className="bg-red-950/40 border border-red-800/60 rounded-xl p-3.5 flex items-center gap-2 text-xs text-red-300">
              <XCircle size={16} className="text-red-400 shrink-0" />

              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-3.5 flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle size={16} className="text-emerald-400 shrink-0" />

              <span>{success}</span>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price Input */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1">
                    Quoted Total Price{" "}
                    <span className="text-red-400">*</span>
                  </label>

                  <span className="text-[10px] text-slate-400">
                    INR (₹) unit total
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                    ₹
                  </span>

                  <input
                    type="number"
                    min="0"
                    placeholder="Enter your total price (e.g. 2,50,000)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 bg-[#0B132B] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 transition"
                  />
                </div>

                <p className="text-[10px] text-slate-500 mt-1">
                  Inclusive of GST and standard freight to{" "}
                  {rfq.deliveryLocation}.
                </p>
              </div>

              {/* Delivery Time Input */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1">
                    Delivery Lead Time{" "}
                    <span className="text-red-400">*</span>
                  </label>

                  <span className="text-[10px] text-slate-400">
                    Required target: &lt; 30 days
                  </span>
                </div>

                <input
                  type="text"
                  placeholder="Example: 15 days"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0B132B] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 transition"
                />

                <p className="text-[10px] text-slate-500 mt-1">
                  Specify lead time from order confirmation to physical delivery.
                </p>
              </div>
            </div>

            {/* Message Area */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1">
                  Proposal Details / Notes{" "}
                  <span className="text-red-400">*</span>
                </label>

                <span className="text-[10px] text-slate-500">
                  {message.length} / 500 characters (min 10)
                </span>
              </div>

              <textarea
                rows={4}
                placeholder="Add a message or additional information for the buyer... (e.g., warranty terms, bulk line pricing, material specs)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 bg-[#0B132B] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 transition resize-none leading-relaxed"
              />

              <p className="text-[10px] text-slate-500 mt-1">
                This message will be attached directly to your quotation card for
                the buyer's evaluation.
              </p>
            </div>

            {/* Submission Specs & Action Buttons */}
            <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800/60">
              <div className="flex items-center gap-2 text-[10px] text-slate-400 flex-wrap">
                <span className="font-semibold text-slate-300">
                  SUBMISSION REQUIREMENTS:
                </span>

                <span className="bg-[#0B132B] border border-slate-800 px-2 py-0.5 rounded text-slate-300">
                  ✓ All fields required
                </span>

                <span className="bg-[#0B132B] border border-slate-800 px-2 py-0.5 rounded text-slate-300">
                  ✓ Price formatted in ₹
                </span>

                <span className="bg-[#0B132B] border border-slate-800 px-2 py-0.5 rounded text-slate-300">
                  ✓ Minimum 10 characters message
                </span>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => navigate("/supplier/browse-rfqs")}
                  className="w-1/2 md:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-1/2 md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition shadow-md shadow-blue-900/30"
                >
                  <Send size={14} />

                  {submitting
                    ? "Submitting..."
                    : "Submit Quotation"}
                </button>
              </div>
            </div>
          </form>

          <p className="text-[10px] text-center text-slate-500 pt-2 border-t border-slate-800/40">
            🔒 Secured & Legally Binding under RFQHub Terms
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupplierRFQDetails;
