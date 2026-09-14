

import React, { useState } from "react";
import { Eye, EyeOff, ShoppingBag, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"buyer" | "supplier">("buyer");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setLoading(true);
  setMessage("");

  try {
    const response = await fetch(
      "http://localhost:3000/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: role,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Registration failed");
      return;
    }

    // Save authentication information
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Redirect according to role
    if (data.user.role === "buyer") {
      navigate("/buyer/dashboard");
    } else {
      navigate("/supplier/dashboard");
    }

  } catch (error) {
    console.error("Registration error:", error);
    setMessage("Unable to connect to server");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7FDF9] px-4 py-12">
      {/* Main Card */}
      <div className="w-full max-w-[480px] rounded-2xl border border-slate-200/80 bg-white p-7 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.12)] sm:p-9">

        {/* Top Header Label */}
        <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-600">
          <span className="text-blue-600">RFQMARKET</span>
          <span className="mx-1.5 text-slate-300">•</span>
          <span className="text-slate-400">B2B SOURCING PLATFORM</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Create your account
        </h1>

        <p className="mt-1.5 text-xs font-medium text-slate-500 sm:text-sm">
          Join RFQMarket to connect with buyers and suppliers.
        </p>

        {/* Form */}
        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >

          {/* Full Name */}
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-600">
              Full Name <span className="text-blue-600">*</span>
            </label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 sm:text-sm"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-600">
              Email Address <span className="text-blue-600">*</span>
            </label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 sm:text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-600">
              Password <span className="text-blue-600">*</span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 pr-10 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 sm:text-sm"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <p className="mt-1.5 text-[10px] font-medium text-slate-400 sm:text-[11px]">
              At least 8 characters with letters & numbers.
            </p>
          </div>

          {/* Role Selection */}
          <div className="mt-1">
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-600">
              I want to join as <span className="text-blue-600">*</span>
            </label>

            <div className="grid grid-cols-2 gap-3">

              {/* Buyer */}
              <div
                onClick={() => setRole("buyer")}
                className={`relative flex cursor-pointer flex-col justify-between rounded-xl border p-3.5 transition ${
                  role === "buyer"
                    ? "border-blue-600 bg-blue-50/40 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-100/70 text-blue-600">
                    <ShoppingBag className="h-4 w-4" />
                  </div>

                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      role === "buyer"
                        ? "border-blue-600 bg-blue-600"
                        : "border-slate-300"
                    }`}
                  >
                    {role === "buyer" && (
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <h4 className="text-xs font-bold text-slate-900">
                    Buyer
                  </h4>

                  <p className="mt-1 text-[9px] font-medium leading-tight text-slate-400 sm:text-[10px]">
                    Post requirements and receive quotations.
                  </p>
                </div>
              </div>

              {/* Supplier */}
              <div
                onClick={() => setRole("supplier")}
                className={`relative flex cursor-pointer flex-col justify-between rounded-xl border p-3.5 transition ${
                  role === "supplier"
                    ? "border-blue-600 bg-blue-50/40 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                    <Store className="h-4 w-4" />
                  </div>

                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      role === "supplier"
                        ? "border-blue-600 bg-blue-600"
                        : "border-slate-300"
                    }`}
                  >
                    {role === "supplier" && (
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <h4 className="text-xs font-bold text-slate-900">
                    Supplier
                  </h4>

                  <p className="mt-1 text-[9px] font-medium leading-tight text-slate-400 sm:text-[10px]">
                    Browse RFQs and submit quotations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <p className="text-center text-sm font-medium text-slate-600">
              {message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#1E5BFF] py-3 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-xs font-medium text-slate-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;

