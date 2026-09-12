import{ useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Copy,
  Building2,
  ShieldCheck,
  FileText,
  CheckCircle2,
  Truck,
  IndianRupee,
  Info,
  Layers,
  Sliders,
  Palette,
  Send
} from 'lucide-react';

const SupplierRFQDetails = () => {
  const [quotedPrice, setQuotedPrice] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [message, setMessage] = useState('');

  const handleCopyId = () => {
    navigator.clipboard.writeText('RFQ-2026-0891');
    alert('RFQ ID copied to clipboard!');
  };

  const handleSubmitQuote = (e) => {
    e.preventDefault();
    alert('Quotation submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 max-w-7xl mx-auto space-y-6 text-slate-800">
      
      {/* 1. Global Header Navbar Navigation */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-200/60 gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900">RFQHub</span>
          <span>/</span>
          <span className="bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded text-[10px]">
            SUPPLIER PORTAL
          </span>
          <span>/</span>
          <span>Supplier Workspace / Seller Console</span>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full text-[11px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active Seller
          </span>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
              VM
            </div>
            <div className="text-left text-[11px]">
              <p className="font-bold text-slate-900 leading-tight">Vikram Mehta <span className="text-[9px] bg-slate-200 px-1 rounded text-slate-600 font-medium">SUPPLIER</span></p>
              <p className="text-slate-400 text-[10px]">Apex Industrial Supplies</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Secondary Navigation & Metadata Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-4 text-slate-500">
          <button className="flex items-center gap-1.5 text-blue-700 font-semibold hover:underline">
            <ArrowLeft size={14} /> Back to Browse RFQs
          </button>
          <span className="text-slate-300">|</span>
          <span className="font-mono font-bold text-slate-700">RFQ-2026-0891</span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1">
            <Calendar size={13} className="text-slate-400" /> Posted: 08 Sep 2026
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 text-slate-700 font-medium">
            <Clock size={13} className="text-slate-400" /> Deadline: 30 Sep 2026 (23:59 IST)
          </span>
        </div>

        <span className="bg-emerald-100/80 text-emerald-800 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> OPEN FOR BIDDING
        </span>
      </div>

      {/* 3. Page Title & Live Bids Counter */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded text-[10px]">
              STANDARD RFQ SPECIFICATION
            </span>
            <span className="text-slate-400 text-[11px]">Commercial Grade</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">RFQ Details: Office Chairs</h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Review the verified buyer specification and submit your quotation proposal.
          </p>
        </div>

        <div className="bg-blue-50/60 border border-blue-100 px-5 py-3 rounded-xl text-right self-start md:self-auto">
          <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">COMPETITIVE BIDS ACTIVE</p>
          <p className="text-2xl font-extrabold text-blue-900">6 Received</p>
        </div>
      </div>

      {/* 4. Buyer Requirement Main Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        
        {/* Buyer Header Banner */}
        <div className="p-5 bg-slate-50/60 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl">
              <Building2 size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-slate-900 text-sm">Buyer Requirement</h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-800">ProcureCorp Solutions Ltd.</span>
                <span className="flex items-center gap-0.5 text-blue-600 font-medium text-[11px]">
                  <ShieldCheck size={13} /> Verified Corporate Buyer
                </span>
                <span>•</span>
                <span className="text-[11px] text-slate-400">Enterprise Account</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCopyId}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Copy size={13} /> Copy RFQ ID
          </button>
        </div>

        {/* Overview Key Metrics Row */}
        <div className="p-5 grid grid-cols-2 md:grid-cols-5 gap-4 border-b border-slate-100 text-xs">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">PRODUCT / SERVICE</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">Office Chairs</p>
            <p className="text-[10px] text-slate-500">High-back ergonomic</p>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">CATEGORY</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">Commercial Office Furniture</p>
            <p className="text-[10px] text-slate-500">Workspace Interiors</p>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">REQUIRED QUANTITY</span>
            <p className="font-bold text-blue-700 text-sm mt-0.5">100 Units</p>
            <p className="text-[10px] text-slate-500">Single consolidated order</p>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">DELIVERY LOCATION</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">Lucknow, UP</p>
            <p className="text-[10px] text-slate-500">PIN: 226010</p>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">TARGET DELIVERY</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">Within 30 Days</p>
            <p className="text-[10px] text-slate-500">Immediate deployment</p>
          </div>
        </div>

        {/* Detailed Requirement Body Grid (Left Specs + Right Buyer Credential Card & Image) */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Descriptions & Tech Specs (8 Cols) */}
          <div className="lg:col-span-8 space-y-5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <FileText size={14} className="text-blue-600" /> FULL REQUIREMENT DESCRIPTION
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                Need 100 ergonomic office chairs for our new regional fulfillment facility. Specifications include: high-density molded foam seat cushion (minimum 45kg/m³ density), breathable double-layer nylon mesh backrest with adjustable lumbar support, 3D adjustable armrests (height, angle, and depth), Class-4 certified pneumatic gas lift cylinder, heavy-duty nylon base with 60mm PU castors, and multi-position tilt lock mechanism with tension control. Must comply with BIFMA X5.1 commercial seating standards. Color preference: Charcoal Gray / Black.
              </p>
            </div>

            {/* Technical Bullet Spec Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-3">
                <CheckCircle2 size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">BIFMA X5.1 Standard</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Mandatory compliance testing certificate required</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-3">
                <Layers size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Foam Density: ≥45 kg/m³</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Pure virgin molded PU foam cushion</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-3">
                <Sliders size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Class-4 Gas Lift Cylinder</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Heavy-duty pneumatic stroke (100mm–120mm)</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-3">
                <Palette size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Tone: Charcoal Gray / Black</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Anti-dust nylon mesh with matte black framework</p>
                </div>
              </div>
            </div>

            {/* Logistics Box */}
            <div className="bg-blue-50/40 p-4 rounded-xl border border-blue-100 text-xs text-blue-950 flex items-start gap-3">
              <Truck size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900">Logistics & Packaging Requirements</h4>
                <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
                  All units to be flat-packed or pre-assembled with manual tools and hardware included. Palletized delivery to ground-floor unloading bay in Lucknow. Standard warehouse unloading dock available.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Buyer Credential Check & Visual Reference (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Buyer Credential Box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                BUYER CREDENTIAL CHECK
              </h4>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                  P
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs leading-snug">ProcureCorp Solutions Ltd.</h5>
                  <p className="text-[10px] text-slate-400">Procurement ID: BUY-2026</p>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-200/60 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400 text-[11px]">Payment Terms:</span>
                  <span className="font-semibold text-slate-800 text-[11px]">Net 30 Days (Invoice)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-[11px]">GSTIN Status:</span>
                  <span className="font-semibold text-emerald-600 text-[11px]">Verified (09AAACK...)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-[11px]">Past Awards:</span>
                  <span className="font-semibold text-slate-800 text-[11px]">24 RFQs Settled</span>
                </div>
              </div>
            </div>

            {/* Reference Image Box */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-xs group">
              <img
                src="https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=600&q=80"
                alt="Reference Office Chair"
                className="w-full h-44 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-3 justify-between">
                <span className="text-white text-[11px] font-semibold">Reference Style: Modern High-Back</span>
                <span className="bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded">
                  100 Units
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 5. Submit Your Quotation Section */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl">
              <Send size={18} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base">Submit Your Quotation</h2>
              <p className="text-xs text-slate-500">Provide your best price and delivery estimate to the buyer.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100">
              Direct Quotation
            </span>
            <span className="text-[10px] text-slate-400">No Commission Fee</span>
          </div>
        </div>

        {/* Notice Box */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-blue-900">
          <Info size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Notice: Transparent Quotation System</span>
            <p className="text-slate-600 text-[11px] mt-0.5">
              Your message and price are directly visible to the buyer. No separate chat is needed or supported. Quotations are compared directly in the buyer's procurement decision matrix.
            </p>
          </div>
        </div>

        {/* Quotation Input Form */}
        <form onSubmit={handleSubmitQuote} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Price Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-900">Quoted Price (INR ₹) <span className="text-red-500">*</span></label>
                <span className="text-slate-400 text-[10px]">Excl. tax</span>
              </div>
              <div className="relative">
                <IndianRupee className="absolute left-3.5 top-3 text-slate-400" size={16} />
                <input
                  type="number"
                  required
                  value={quotedPrice}
                  onChange={(e) => setQuotedPrice(e.target.value)}
                  placeholder="Enter your quoted price (e.g. 2,55,000)"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 outline-none placeholder:text-slate-400 font-medium"
                />
              </div>
              <p className="text-[10px] text-slate-400">Inclusive of GST and standard freight to Lucknow.</p>
            </div>

            {/* Delivery Time Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-900">Estimated Delivery Time <span className="text-red-500">*</span></label>
                <span className="text-slate-400 text-[10px]">Required Target: &lt; 30 days</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  placeholder="Example: 15 days"
                  className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 outline-none placeholder:text-slate-400 font-medium"
                />
                <Truck className="absolute right-3.5 top-3 text-slate-400" size={16} />
              </div>
              <p className="text-[10px] text-slate-400">Specify lead time from order confirmation to physical delivery.</p>
            </div>

          </div>

          {/* Message to Buyer */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-900">Message to Buyer <span className="text-red-500">*</span></label>
              <span className="text-slate-400 text-[10px]">0 / 500 characters (min 50)</span>
            </div>
            <textarea
              rows={4}
              required
              minLength={50}
              maxLength={500}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a message or additional information for the buyer... (e.g., warranty terms, bulk tier pricing, material specs)"
              className="w-full p-3.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 outline-none placeholder:text-slate-400 leading-relaxed"
            ></textarea>
            <p className="text-[10px] text-slate-400">This message will be attached directly to your quotation card for the buyer's evaluation.</p>
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-2"
            >
              <Send size={14} /> Submit Quotation Proposal
            </button>
          </div>
        </form>

      </div>

    </div>
  );
};

export default SupplierRFQDetails;