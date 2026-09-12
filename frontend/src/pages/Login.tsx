import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          
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

          

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-3 w-full rounded-lg bg-[#1E5BFF] py-3 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md sm:text-sm"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="mt-8 border-t border-slate-100" />

        {/* Footer Link */}
        <div className="mt-6 text-center text-xs font-medium text-slate-500">
          Don't have an account?{" "}
          <a href="/signup" className="font-semibold text-blue-600 hover:underline">
            Create an account
          </a>
        </div>
      </div>

    
    </div>
  );
};

export default Login;