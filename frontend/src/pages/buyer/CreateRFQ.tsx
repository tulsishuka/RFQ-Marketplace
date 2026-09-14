import { useState } from "react";
import {  Plus, Upload, X } from "lucide-react";

const CreateRFQ = () => {

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    quantity: "100",
    unit: "Units",
    location: "",
    deadline: "2026-09-30",
  });

  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) {
      return;
    }

    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 5) {
      setMessage("You can upload maximum 5 images.");
      return;
    }

    const invalidFile = selectedFiles.find(
      (file) => file.size > 5 * 1024 * 1024
    );

    if (invalidFile) {
      setMessage(`${invalidFile.name} is larger than 5MB.`);
      return;
    }

    setImages(selectedFiles);
    setMessage("");
  };

  const handleRemoveImage = (index: number) => {
    setImages((previous) =>
      previous.filter((_, imageIndex) => imageIndex !== index)
    );
  };

  const handleCreateRFQ = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Please login first.");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("productService", formData.productName);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("quantity", formData.quantity);
      formDataToSend.append("unit", formData.unit);
      formDataToSend.append("deliveryLocation", formData.location);
      formDataToSend.append("deadline", formData.deadline);
      images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      const response = await fetch("https://rfq-marketplace-502m.onrender.com/api/rfqs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create RFQ");
        return;
      }

      setMessage("RFQ created successfully!");

      // Reset form
      setFormData({
        productName: "",
        description: "",
        quantity: "100",
        unit: "Units",
        location: "",
        deadline: "2026-09-30",
      });

      setImages([]);
    } catch (error) {
      console.error("Create RFQ error:", error);
      setMessage("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#070b14] text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full space-y-6">

        {/* Top Navbar / Header Mock Element */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0d1527] border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div>
          

            <div className="flex items-center gap-3">
             
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Create RFQ
              </h1>
            </div>

            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Tell suppliers what your business needs.
            </p>
          </div>

         
        </div>

        <form
          onSubmit={handleCreateRFQ}
          className="w-full rounded-2xl bg-[#0d1527] border border-slate-800 p-5 sm:p-8 shadow-xl space-y-6"
        >
          <div>
            <label
              htmlFor="productName"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300"
            >
              Product / Service <span className="text-blue-400">*</span>
            </label>

            <input
              id="productName"
              name="productName"
              type="text"
              value={formData.productName}
              onChange={handleChange}
              placeholder="e.g. Office Furniture"
              required
              className="w-full rounded-xl bg-[#162035] border border-slate-700/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300"
            >
              Description <span className="text-blue-400">*</span>
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your requirements..."
              rows={4}
              required
              className="w-full resize-none rounded-xl bg-[#162035] border border-slate-700/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="quantity"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Quantity <span className="text-blue-400">*</span>
              </label>

              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-[#162035] border border-slate-700/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="unit"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Unit <span className="text-blue-400">*</span>
              </label>

              <select
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-[#162035] border border-slate-700/80 px-4 py-3 text-sm text-slate-100 outline-none cursor-pointer transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="Units" className="bg-[#0d1527]">Units</option>
                <option value="Pcs" className="bg-[#0d1527]">Pcs</option>
                <option value="Bays" className="bg-[#0d1527]">Bays</option>
                <option value="Kg" className="bg-[#0d1527]">Kg</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Delivery Location <span className="text-blue-400">*</span>
              </label>

              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Lucknow, Uttar Pradesh"
                required
                className="w-full rounded-xl bg-[#162035] border border-slate-700/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="deadline"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Submission Deadline <span className="text-blue-400">*</span>
              </label>

              <input
                id="deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-[#162035] border border-slate-700/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:[color-scheme:dark]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="images"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300"
            >
              Product / Requirement Images
            </label>

            <div className="relative">
              <input
                id="images"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                multiple
                onChange={handleImageChange}
                className="absolute inset-0 h-full w-full opacity-0 cursor-pointer z-10"
              />
              <div className="rounded-xl border border-dashed border-slate-700/80 bg-[#162035]/50 p-6 text-center hover:border-blue-500/60 transition-colors">
                <Upload size={22} className="mx-auto text-blue-400 mb-1.5" />
                <p className="text-xs text-slate-300 font-medium">
                  Click to upload or drag and drop images
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Upload up to 5 images. JPG, PNG or WEBP. Maximum 5MB per image.
                </p>
              </div>
            </div>

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                {images.map((image, index) => (
                  <div
                    key={`${image.name}-${index}`}
                    className="relative overflow-hidden rounded-xl border border-slate-800 bg-[#162035]"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-full object-cover"
                    />
                    <div className="p-2 flex items-center justify-between gap-2 bg-[#0d1527]">
                      <p className="truncate text-[11px] text-slate-300">
                        {image.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="p-1 rounded text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {message && (
            <div
              className={`rounded-xl p-3.5 text-xs font-medium border ${
                message.includes("successfully")
                  ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/60"
                  : "bg-red-950/40 text-red-400 border-red-800/60"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
            {loading ? "Creating RFQ..." : "Create RFQ"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default CreateRFQ;