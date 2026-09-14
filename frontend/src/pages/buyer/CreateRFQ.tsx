import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRFQ = () => {
  const navigate = useNavigate();

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

  // Handle text/select inputs
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

  // Handle image selection
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) {
      return;
    }

    const selectedFiles = Array.from(e.target.files);

    // Maximum 5 images
    if (selectedFiles.length > 5) {
      setMessage(
        "You can upload maximum 5 images."
      );

      return;
    }

    // Maximum 5 MB per image
    const invalidFile = selectedFiles.find(
      (file) => file.size > 5 * 1024 * 1024
    );

    if (invalidFile) {
      setMessage(
        `${invalidFile.name} is larger than 5MB.`
      );

      return;
    }

    setImages(selectedFiles);

    setMessage("");
  };

  // Remove selected image
  const handleRemoveImage = (index: number) => {
    setImages((previous) =>
      previous.filter(
        (_, imageIndex) => imageIndex !== index
      )
    );
  };

  // Submit RFQ
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

      // Create FormData
      const formDataToSend = new FormData();

      formDataToSend.append(
        "productService",
        formData.productName
      );

      formDataToSend.append(
        "description",
        formData.description
      );

      formDataToSend.append(
        "quantity",
        formData.quantity
      );

      formDataToSend.append(
        "unit",
        formData.unit
      );

      formDataToSend.append(
        "deliveryLocation",
        formData.location
      );

      formDataToSend.append(
        "deadline",
        formData.deadline
      );

      // Add images
      images.forEach((image) => {
        formDataToSend.append(
          "images",
          image
        );
      });

      // Send request
      const response = await fetch(
        "http://localhost:3000/api/rfqs",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "Failed to create RFQ"
        );

        return;
      }

      console.log(
        "RFQ created:",
        data
      );

      setMessage(
        "RFQ created successfully!"
      );

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

      // Optional: redirect after success
      // setTimeout(() => {
      //   navigate("/buyer/dashboard");
      // }, 1000);

    } catch (error) {
      console.error(
        "Create RFQ error:",
        error
      );

      setMessage(
        "Unable to connect to server"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() =>
              navigate("/buyer/dashboard")
            }
            className="mb-4 text-sm text-slate-500 hover:text-slate-900"
          >
            ← Back to Dashboard
          </button>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Create RFQ
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create a new request for quotation
            and receive supplier quotes.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleCreateRFQ}
          className="rounded-2xl bg-white p-5 shadow-sm sm:p-8"
        >

          {/* Product */}
          <div className="mb-6">
            <label
              htmlFor="productName"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Product / Service
            </label>

            <input
              id="productName"
              name="productName"
              type="text"
              value={formData.productName}
              onChange={handleChange}
              placeholder="e.g. Office Furniture"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your requirements..."
              rows={5}
              required
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
            />
          </div>

          {/* Quantity + Unit */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2">

            {/* Quantity */}
            <div>
              <label
                htmlFor="quantity"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Quantity
              </label>

              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
              />
            </div>

            {/* Unit */}
            <div>
              <label
                htmlFor="unit"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Unit
              </label>

              <select
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500"
              >
                <option value="Units">
                  Units
                </option>

                <option value="Pcs">
                  Pcs
                </option>

                <option value="Bays">
                  Bays
                </option>

                <option value="Kg">
                  Kg
                </option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Delivery Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Lucknow, Uttar Pradesh"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
            />
          </div>

          {/* Deadline */}
          <div className="mb-6">
            <label
              htmlFor="deadline"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Submission Deadline
            </label>

            <input
              id="deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
            />
          </div>

          {/* Images */}
          <div className="mb-8">
            <label
              htmlFor="images"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Product / Requirement Images
            </label>

            <input
              id="images"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              multiple
              onChange={handleImageChange}
              className="w-full cursor-pointer rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-600"
            />

            <p className="mt-2 text-xs text-slate-500">
              Upload up to 5 images. JPG, PNG or
              WEBP. Maximum 5MB per image.
            </p>

            {/* Selected images */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {images.map((image, index) => (
                  <div
                    key={`${image.name}-${index}`}
                    className="relative overflow-hidden rounded-xl border border-slate-200 bg-white"
                  >
                    <img
                      src={URL.createObjectURL(
                        image
                      )}
                      alt={`Preview ${index + 1}`}
                      className="h-32 w-full object-cover"
                    />

                    <div className="p-2">
                      <p className="truncate text-xs text-slate-600">
                        {image.name}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveImage(
                            index
                          )
                        }
                        className="mt-1 text-xs font-medium text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Message */}
          {message && (
            <div
              className={`mb-5 rounded-xl px-4 py-3 text-sm ${
                message.includes(
                  "successfully"
                )
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-slate-900 px-6 py-3.5 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Creating RFQ..."
              : "Create RFQ"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRFQ;