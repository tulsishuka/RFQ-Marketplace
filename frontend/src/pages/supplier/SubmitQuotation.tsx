import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SubmitQuotation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [price, setPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!price || !deliveryTime) {
      setError("Price and delivery time are required.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

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

      setTimeout(() => {
        navigate(`/supplier/rfq/${id}`);
      }, 1000);
    } catch (error) {
      console.error(error);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">

        <button
          onClick={() => navigate(`/supplier/rfq/${id}`)}
          className="text-sm text-slate-500 hover:text-black mb-6"
        >
          ← Back to RFQ
        </button>

        <h1 className="text-2xl font-bold text-slate-900">
          Submit Quotation
        </h1>

        <p className="text-slate-500 mt-2 mb-8">
          Enter your quotation details and add a message for the buyer.
        </p>

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-50 text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 p-3 rounded-lg bg-green-50 text-green-600">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Quotation Price
            </label>

            <input
              type="number"
              min="0"
              placeholder="Enter your price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Delivery Time */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Delivery Time
            </label>

            <input
              type="text"
              placeholder="e.g. 15 days"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Comment / Message to Buyer
            </label>

            <textarea
              rows={5}
              placeholder="Write a message for the buyer..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none resize-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Quotation"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default SubmitQuotation;