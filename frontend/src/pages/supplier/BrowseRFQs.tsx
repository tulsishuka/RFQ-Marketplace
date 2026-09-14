
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Calendar,
  Package,
  ArrowRight,
  FileText,
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

      const response = await fetch(
        "http://localhost:3000/api/supplier/rfqs",
        {
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
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-sm text-slate-500">
            Loading available RFQs...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Browse RFQs
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Find buyer requirements and submit your quotations.
        </p>
      </div>


      {/* Search */}

      <div className="relative max-w-xl">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search product, requirement or location..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm"
        />

      </div>


      {/* Error */}

      {error && (
        <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl p-4 text-sm">
          {error}
        </div>
      )}


      {/* Empty */}

      {!error &&
        filteredRFQs.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">

            <FileText
              size={40}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-bold text-slate-800">
              No RFQs found
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Try another search or check again later.
            </p>

          </div>
        )}


      {/* RFQ Cards */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {filteredRFQs.map((rfq) => (

          <div
            key={rfq._id}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition overflow-hidden"
          >

            <div className="p-5">

              {/* Top */}

              <div className="flex items-start justify-between gap-3">

                <div>

                  <h2 className="text-lg font-bold text-slate-900">
                    {rfq.productService}
                  </h2>

                  <p className="text-xs text-slate-400 mt-1">
                    Posted{" "}
                    {formatDate(rfq.createdAt)}
                  </p>

                </div>

                <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  Open
                </span>

              </div>


              {/* Description */}

              <p className="text-sm text-slate-600 mt-4 line-clamp-2">
                {rfq.description}
              </p>


              {/* Details */}

              <div className="grid grid-cols-2 gap-3 mt-5">

                <div className="bg-slate-50 rounded-xl p-3">

                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Quantity
                  </span>

                  <p className="flex items-center gap-1 mt-1 text-sm font-semibold text-slate-800">

                    <Package
                      size={14}
                      className="text-blue-600"
                    />

                    {rfq.quantity} {rfq.unit}

                  </p>

                </div>


                <div className="bg-slate-50 rounded-xl p-3">

                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Location
                  </span>

                  <p className="flex items-center gap-1 mt-1 text-sm font-semibold text-slate-800">

                    <MapPin
                      size={14}
                      className="text-blue-600"
                    />

                    {rfq.deliveryLocation}

                  </p>

                </div>


                <div className="bg-slate-50 rounded-xl p-3 col-span-2">

                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Quote Deadline
                  </span>

                  <p className="flex items-center gap-1 mt-1 text-sm font-semibold text-red-600">

                    <Calendar size={14} />

                    {formatDate(rfq.deadline)}

                  </p>

                </div>

              </div>


              {/* Button */}

              <button
                onClick={() =>
                  navigate(
                    `/supplier/rfq/${rfq._id}`
                  )
                }
                className="w-full mt-5 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition"
              >
                View RFQ & Submit Quote

                <ArrowRight size={16} />

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default BrowseRFQs;