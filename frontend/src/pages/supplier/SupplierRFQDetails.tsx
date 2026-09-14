
import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  MapPin,
  Calendar,
  Package,
  FileText,
  Send,
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

const SupplierRFQDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [rfq, setRfq] =
    useState<RFQ | null>(null);

  const [price, setPrice] = useState("");
  const [deliveryTime, setDeliveryTime] =
    useState("");
  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // ==========================================
  // FETCH RFQ
  // ==========================================

  const fetchRFQ = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/supplier/rfqs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Failed to fetch RFQ."
        );
        return;
      }

      setRfq(data.rfq);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to connect to server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRFQ();
  }, [id]);


  // ==========================================
  // SUBMIT QUOTATION
  // ==========================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!price || !deliveryTime) {
      setError(
        "Price and delivery time are required."
      );

      return;
    }

    try {
      setSubmitting(true);

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/supplier/rfqs/${id}/quotes`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

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
        setError(
          data.message ||
            "Failed to submit quotation."
        );

        return;
      }

      setSuccess(
        "Quotation submitted successfully!"
      );

      setPrice("");
      setDeliveryTime("");
      setMessage("");

    } catch (error) {
      console.error(error);

      setError(
        "Unable to connect to server."
      );
    } finally {
      setSubmitting(false);
    }
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">

        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />

      </div>
    );
  }


  // ==========================================
  // ERROR
  // ==========================================

  if (!rfq) {
    return (
      <div className="p-8 text-center">

        <p className="text-red-600">
          {error || "RFQ not found."}
        </p>

        <button
          onClick={() =>
            navigate(
              "/supplier/browse-rfqs"
            )
          }
          className="mt-4 px-4 py-2 bg-blue-700 text-white rounded-lg"
        >
          Back to RFQs
        </button>

      </div>
    );
  }


  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );


  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Back */}

      <button
        onClick={() =>
          navigate(
            "/supplier/browse-rfqs"
          )
        }
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} />

        Back to Browse RFQs
      </button>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ================================= */}
        {/* RFQ DETAILS */}
        {/* ================================= */}

        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

          <div className="flex items-start justify-between gap-4">

            <div>

              <h1 className="text-2xl font-bold text-slate-900">
                {rfq.productService}
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Posted on{" "}
                {formatDate(
                  rfq.createdAt
                )}
              </p>

            </div>

            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
              {rfq.status}
            </span>

          </div>


          {/* Requirement */}

          <div className="mt-6">

            <h2 className="font-bold text-slate-900 flex items-center gap-2">

              <FileText
                size={18}
                className="text-blue-600"
              />

              Requirement

            </h2>

            <p className="mt-3 text-sm text-slate-600 leading-7 bg-slate-50 p-4 rounded-xl">
              {rfq.description}
            </p>

          </div>


          {/* Information */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

            <div className="bg-blue-50 p-4 rounded-xl">

              <p className="text-xs text-slate-400">
                Quantity
              </p>

              <p className="font-bold text-blue-700 mt-1 flex items-center gap-1">

                <Package size={15} />

                {rfq.quantity}{" "}
                {rfq.unit}

              </p>

            </div>


            <div className="bg-slate-50 p-4 rounded-xl">

              <p className="text-xs text-slate-400">
                Delivery Location
              </p>

              <p className="font-bold text-slate-800 mt-1 flex items-center gap-1">

                <MapPin size={15} />

                {rfq.deliveryLocation}

              </p>

            </div>


            <div className="bg-red-50 p-4 rounded-xl">

              <p className="text-xs text-slate-400">
                Quote Deadline
              </p>

              <p className="font-bold text-red-600 mt-1 flex items-center gap-1">

                <Calendar size={15} />

                {formatDate(
                  rfq.deadline
                )}

              </p>

            </div>

          </div>


          {/* Buyer */}

          {rfq.buyer && (
            <div className="mt-6 p-4 border border-slate-100 rounded-xl">

              <p className="text-xs text-slate-400">
                Buyer
              </p>

              <p className="font-bold text-slate-900 mt-1">
                {rfq.buyer.name}
              </p>

              <p className="text-sm text-slate-500">
                {rfq.buyer.email}
              </p>

            </div>
          )}


          {/* Images */}

          {rfq.images?.length > 0 && (

            <div className="mt-6">

              <h2 className="font-bold text-slate-900 mb-3">
                Reference Images
              </h2>

              <div className="flex flex-wrap gap-3">

                {rfq.images.map(
                  (image, index) => (

                    <img
                      key={index}
                      src={`http://localhost:3000${image}`}
                      alt={`RFQ ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-xl border border-slate-200"
                    />

                  )
                )}

              </div>

            </div>

          )}

        </div>


        {/* ================================= */}
        {/* QUOTATION FORM */}
        {/* ================================= */}

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-fit">

         <button
  onClick={() => navigate(`/supplier/rfq/${id}/quotation`)}
  className="px-6 py-3 bg-black text-white rounded-xl"
>
  Submit Quotation
</button> 

          <p className="text-sm text-slate-500 mt-1">
            Send your best offer to the buyer.
          </p>


          {/* Error */}

          {error && (
            <div className="mt-4 bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-xl">
              {error}
            </div>
          )}


          {/* Success */}

          {success && (
            <div className="mt-4 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm p-3 rounded-xl">
              {success}
            </div>
          )}


          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
          >

            {/* Price */}

            <div>

              <label className="text-sm font-semibold text-slate-700">
                Total Price
              </label>

              <input
                type="number"
                min="0"
                placeholder="Enter your total price"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                className="w-full mt-2 px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
              />

            </div>


            {/* Delivery */}

            <div>

              <label className="text-sm font-semibold text-slate-700">
                Delivery Time
              </label>

              <input
                type="text"
                placeholder="Example: 15 days"
                value={deliveryTime}
                onChange={(e) =>
                  setDeliveryTime(
                    e.target.value
                  )
                }
                className="w-full mt-2 px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
              />

            </div>


            {/* Message */}

            <div>

              <label className="text-sm font-semibold text-slate-700">
                Message / Notes
              </label>

              <textarea
                rows={5}
                placeholder="Add delivery terms, offer details or notes..."
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                className="w-full mt-2 px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none"
              />

            </div>


            {/* Submit */}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-300 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition"
            >

              <Send size={16} />

              {submitting
                ? "Submitting..."
                : "Submit Quotation"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default SupplierRFQDetails;