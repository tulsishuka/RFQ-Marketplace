
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "buyer" as "buyer" | "supplier",
    rememberMe: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            role: formData.role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      console.log("Login response:", data);

      // Save authentication information
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login successful!");

      // Redirect according to role
      if (data.user.role === "buyer") {
        navigate("/buyer/dashboard");
      } else if (data.user.role === "supplier") {
        navigate("/supplier/dashboard");
      }

    } catch (error) {
      console.error("Login error:", error);
      setMessage("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7FDF9] px-4 py-12">
      {/* Main Card */}
      <div className="w-full max-w-[440px] rounded-2xl border border-slate-200/80 bg-white p-7 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.12)] sm:p-9">

        {/* Heading */}
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Welcome back
        </h1>

        <p className="mt-1.5 text-xs font-medium text-slate-500 sm:text-sm">
          Sign in to manage your RFQs and quotations.
        </p>

        {/* Form */}
        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >

          {/* Email Address */}
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-700">
              EMAIL ADDRESS
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 sm:text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                PASSWORD
              </label>
            </div>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 sm:text-sm"
            />
          </div>

          {/* Role */}
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-700">
              LOGIN AS
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 sm:text-sm"
            >
              <option value="buyer">Buyer</option>
              <option value="supplier">Supplier</option>
            </select>
          </div>

          {/* Message */}
          {message && (
            <p className="text-center text-sm font-medium text-slate-600">
              {message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full rounded-lg bg-[#1E5BFF] py-3 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-8 border-t border-slate-100" />

        {/* Footer Link */}
        <div className="mt-6 text-center text-xs font-medium text-slate-500">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

