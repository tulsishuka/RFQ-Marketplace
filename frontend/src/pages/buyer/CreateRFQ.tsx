import { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  FileEdit,
  MapPin,
  Zap,
  Lightbulb,
  Truck,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Box
} from 'lucide-react';

const CreateRFQ = () => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    quantity: '100',
    unit: 'Units',
    location: '',
    deadline: '2026-09-30',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 max-w-7xl mx-auto space-y-6 text-slate-800">
      
      {/* 1. Top Header Navbar */}
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="text-slate-900 font-bold">Procurement Portal</span>
          <span>/</span>
          <span>Buyer Workspace</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            Buyer
          </span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-300 overflow-hidden flex items-center justify-center font-bold text-slate-600 text-xs">
              PS
            </div>
            <div className="text-left leading-tight">
              <p className="text-xs font-bold text-slate-900">Priya Sharma</p>
              <p className="text-[10px] text-slate-400">Buyer Account</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Page Title Header & Mode Switchers */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-600">
            <ShieldCheck size={14} />
            <span>Enterprise Sourcing Pipeline / RFQ-2026-V8</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Create RFQ</h1>
          <p className="text-xs text-slate-500">Tell suppliers what your business needs.</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-blue-700 text-xs font-semibold shadow-sm transition-all">
            <Plus size={14} /> New Requirement
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 text-xs font-medium transition-all">
            <FileEdit size={14} /> Edit Existing RFQ (Demo Mode)
          </button>
        </div>
      </div>

      {/* 3. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Main Form & Radar Footer - 2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Form Container */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-5">
            
            {/* Form Header Badge */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                Draft Specification
              </span>
              <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                Step 1 of 1 • Direct Broadcast
              </span>
            </div>

            <form className="space-y-4">
              {/* Product / Service Name */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-800">
                    Product / Service Name <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">HSN / UNSPSC Auto-Match</span>
                </div>
                <div className="relative">
                  <Box className="absolute left-3 top-3 text-slate-400" size={16} />
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    placeholder="e.g., Office Chairs"
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Specify the exact product or service name to optimize vendor matching.
                </p>
              </div>

              {/* Requirement Description */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-800">
                    Requirement Description <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {formData.description.length}/500 characters
                  </span>
                </div>
                <textarea
                  name="description"
                  rows={4}
                  maxLength={500}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="e.g., Need 100 ergonomic office chairs for our new office. Include specifications like mesh back, lumbar support, and adjustable armrests."
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-slate-400 resize-none"
                />
                <p className="text-[11px] text-slate-400">
                  Include material preferences, physical dimensions, warranty parameters, and relevant testing standards.
                </p>
              </div>

              {/* Quantity & Location Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Quantity */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 text-xs">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      className="bg-blue-50/70 border border-blue-100 text-blue-700 text-xs font-semibold rounded-xl px-3 py-2 outline-none cursor-pointer"
                    >
                      <option value="Units">Units</option>
                      <option value="Pcs">Pcs</option>
                      <option value="Bays">Bays</option>
                      <option value="Kg">Kg</option>
                    </select>
                  </div>
                  <p className="text-[11px] text-slate-400">Bulk orders get tiered volume discounts.</p>
                </div>

                {/* Delivery Location */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 text-xs">
                    Delivery Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 text-slate-400" size={16} />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Lucknow"
                      className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 outline-none placeholder:text-slate-400"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">Include city/state or zip code for freight estimation.</p>
                </div>
              </div>

              {/* Deadline & Dispatch Velocity Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* RFQ Deadline */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 text-xs">
                    RFQ Deadline <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 outline-none text-slate-700"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">Suppliers can submit proposals until 23:59 IST.</p>
                </div>

                {/* Estimated Dispatch Velocity Banner */}
                <div className="bg-blue-50/60 rounded-xl p-3 border border-blue-100 flex items-center gap-3">
                  <div className="p-2 bg-blue-600 text-white rounded-lg">
                    <Zap size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">ESTIMATED DISPATCH VELOCITY</p>
                    <p className="font-bold text-slate-900 text-sm">3–5 Business Days</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <Plus size={16} /> Create RFQ
                </button>
              </div>

            </form>
          </div>

          {/* Automated Supplier Radar Banner */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">Automated Supplier Radar</h4>
                <p className="text-[11px] text-slate-500">
                  Our catalog engine matches your specs with verified Tier-1 & Tier-2 vendors instantly.
                </p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl text-right flex-shrink-0">
              <span className="font-extrabold text-emerald-700 text-sm block">18</span>
              <span className="text-[10px] text-emerald-600 font-medium leading-none">Active in North Hub</span>
            </div>
          </div>

        </div>

        {/* Right Column (Best Practices & Interactive Sandbox - 1 Col) */}
        <div className="space-y-6">
          
          {/* Best Practices Section */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="text-blue-600" size={18} />
              <h3 className="font-bold text-slate-900 text-sm">RFQ Best Practices for Buyers</h3>
            </div>

            <div className="space-y-3">
              <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-100/50 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Zap size={14} className="text-blue-600" /> Speed & Clarity
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Detailed specifications get <strong className="text-blue-700">40% faster responses</strong> and eliminate rounds of supplier clarification questions.
                </p>
              </div>

              <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-100/50 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Truck size={14} className="text-blue-600" /> Logistics Precision
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  A clear delivery location prevents freight calculation disparities and border transit surcharges.
                </p>
              </div>

              <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-100/50 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <TrendingUp size={14} className="text-blue-600" /> Competitive Pricing
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Realistic deadlines ensure that verified manufacturers can calculate factory utilization and submit lower margins.
                </p>
              </div>
            </div>

            {/* Historical Fulfillment Index Sparkline Card */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400">HISTORICAL FULFILLMENT INDEX</span>
                <span className="font-bold text-blue-700 text-xs">96.4%</span>
              </div>
              {/* SVG Sparkline Curve */}
              <div className="h-10 w-full">
                <svg className="w-full h-full" viewBox="0 0 200 40" fill="none">
                  <path
                    d="M 0 30 Q 50 10, 100 25 T 200 15"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    fill="none"
                  />
                </svg>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
                <span>RFQ Release</span>
                <span>Quote Review</span>
                <span>Awarded</span>
              </div>
            </div>
          </div>

          {/* Interactive Sandbox (Dev Test State) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-xs">Interactive Sandbox</h4>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">DEV SDK</span>
            </div>
            <p className="text-[11px] text-slate-500">Test platform response states directly:</p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button className="flex items-center justify-center gap-1 py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 font-medium transition-colors">
                <Loader2 size={13} className="animate-spin text-blue-600" /> Loading State
              </button>
              <button className="flex items-center justify-center gap-1 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg border border-emerald-200 font-medium transition-colors">
                <CheckCircle2 size={13} /> Success State
              </button>
              <button className="flex items-center justify-center gap-1 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg border border-red-200 font-medium transition-colors">
                <AlertCircle size={13} /> Error State
              </button>
              <button 
                onClick={() => setFormData({ productName: '', description: '', quantity: '100', unit: 'Units', location: '', deadline: '2026-09-30' })}
                className="flex items-center justify-center gap-1 py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 font-medium transition-colors"
              >
                <RotateCcw size={13} /> Clear Form
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default CreateRFQ;