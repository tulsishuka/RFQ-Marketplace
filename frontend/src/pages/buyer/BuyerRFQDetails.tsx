import {
  ArrowLeft,
  Pencil,
  Trash2,
  MapPin,
  ClipboardList,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Star,
  Check,
  MessageSquare,
  Eye,
  Zap,
  Tag,
  Wrench,
  Clock,
  Truck
} from 'lucide-react';

const BuyerRFQDetails = () => {
  const quotes = [
    {
      id: 1,
      badge: 'Best Delivery Speed',
      badgeStyle: 'bg-blue-100 text-blue-700',
      company: 'ABC Furniture',
      rating: '4.8',
      verified: true,
      price: '₹2,50,000',
      unitRate: '₹2,500 / chair',
      delivery: '15 days',
      freight: 'Free Delivery',
      note: '"We can provide all 100 chairs within 15 days. Free delivery is available."',
      submittedDate: '12 September 2026',
      validDays: '28 Days',
      isBestValue: false,
    },
    {
      id: 2,
      badge: 'Lowest Price',
      badgeStyle: 'bg-emerald-100 text-emerald-700 font-semibold',
      bestValueBadge: true,
      company: 'XYZ Office Solutions',
      rating: '4.9',
      verified: true,
      price: '₹2,35,000',
      priceSave: 'Save ₹15,000',
      unitRate: '₹2,350 / chair',
      delivery: '20 days',
      discount: 'Applied',
      note: '"We can offer a better price for bulk orders and deliver within 20 days."',
      submittedDate: '12 September 2026',
      validDays: '15 Days',
      isBestValue: true,
    },
    {
      id: 3,
      badge: 'Includes Installation',
      badgeStyle: 'bg-blue-100 text-blue-700',
      company: 'Modern Workspace',
      rating: '4.7',
      verified: true,
      price: '₹2,70,000',
      unitRate: '₹2,700 / chair',
      delivery: '10 days (Fastest)',
      assembly: 'On-Site Setup',
      note: '"We can deliver within 10 days and provide installation support."',
      submittedDate: '12 September 2026',
      validDays: '30 Days',
      isBestValue: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 max-w-7xl mx-auto space-y-6 text-slate-800">
      
      {/* 1. Header Navigation & Info */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <button className="flex items-center gap-1.5 font-medium hover:text-slate-900 transition-colors">
            <ArrowLeft size={14} /> Back to My RFQs
          </button>
          <div className="flex items-center gap-3 font-mono">
            <span>RFQ-ID: #2026-CHAIRS-088</span>
            <span className="flex items-center gap-1 text-emerald-600 font-sans font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Public Sourcing
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">Office Chairs</h1>
              <span className="bg-emerald-100 text-emerald-700 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                Open
              </span>
              <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-0.5 rounded-full font-medium">
                Standard Commercial Sourcing
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-1">
              RFQ issued by Priya Sharma • Lucknow Regional Fulfillment Hub
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold bg-white hover:bg-slate-50 transition-colors">
              <Pencil size={14} /> Edit RFQ
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 text-xs font-semibold transition-colors">
              <Trash2 size={14} /> Delete RFQ
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Summary Section (Details Card + Marketplace Vitality) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Buyer Requirement Details (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <ClipboardList className="text-blue-600" size={20} />
              <span>Buyer Requirement Details</span>
            </div>
            <span className="text-xs text-slate-400">Category: <strong className="text-slate-700">Corporate Furniture</strong></span>
          </div>

          {/* Details Spec Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50/80 p-3 rounded-xl">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">PRODUCT / SERVICE</p>
              <p className="font-bold text-slate-800 text-xs mt-1">Office Chairs</p>
            </div>
            <div className="bg-blue-50/60 p-3 rounded-xl">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">TOTAL QUANTITY</p>
              <p className="font-bold text-blue-700 text-xs mt-1">100 Units</p>
            </div>
            <div className="bg-slate-50/80 p-3 rounded-xl">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">DELIVERY LOCATION</p>
              <p className="font-bold text-slate-800 text-xs mt-1 flex items-center gap-1">
                <MapPin size={12} className="text-slate-500" /> Lucknow
              </p>
            </div>
            <div className="bg-slate-50/80 p-3 rounded-xl">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">DEADLINE FOR QUOTES</p>
              <p className="font-bold text-red-600 text-xs mt-1">30 September 2026</p>
            </div>
            <div className="bg-slate-50/80 p-3 rounded-xl">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">POSTED ON</p>
              <p className="font-bold text-slate-800 text-xs mt-1">08 September 2026</p>
            </div>
            <div className="bg-slate-50/80 p-3 rounded-xl">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">TARGET FULFILLMENT</p>
              <p className="font-bold text-slate-800 text-xs mt-1">Immediate / Q3 Batch</p>
            </div>
          </div>

          {/* Requirement Description Box */}
          <div className="space-y-1.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">REQUIREMENT DESCRIPTION & SPECIFICATIONS</p>
            <div className="bg-blue-50/30 border border-blue-100/60 p-4 rounded-xl text-xs text-slate-700 leading-relaxed">
              Need 100 ergonomic office chairs for our new office. Specifications include: breathable mesh back, 3D adjustable armrests, synchronized tilt-lock mechanism, class-4 gas lift, and high-density molded seat foam. Must pass BIFMA durability benchmarks.
            </div>
          </div>

          {/* Footer Badges */}
          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-slate-600">
                <CheckCircle2 size={13} className="text-emerald-500" /> 100% Verified Specifications
              </span>
              <span className="flex items-center gap-1 text-slate-600">
                <Truck size={13} className="text-blue-500" /> Freight included preferred
              </span>
            </div>
            <span className="font-mono text-slate-400">Procurement Code: LKO-CORP-0926</span>
          </div>
        </div>

        {/* RFQ Marketplace Vitality (1 Col) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm">RFQ Marketplace Vitality</h3>
              <TrendingUp size={16} className="text-blue-600" />
            </div>

            <div className="flex items-center justify-between my-4">
              <div>
                <div className="text-3xl font-bold text-slate-900">3 <span className="text-sm font-normal text-slate-500">Quotes</span></div>
                <p className="text-xs text-emerald-600 font-medium mt-1">100% compliant with specs</p>
              </div>

              {/* Simple Circle Gauge */}
              <div className="relative w-14 h-14 flex items-center justify-center rounded-full border-4 border-blue-600 border-t-slate-200">
                <span className="text-xs font-bold text-slate-800">75%</span>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-slate-100 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Lowest Bid Received</span>
                <span className="font-bold text-slate-800">₹2,35,000 <span className="text-[10px] text-slate-400 font-normal">(XYZ Office)</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Fastest Delivery</span>
                <span className="font-bold text-slate-800">10 Days <span className="text-[10px] text-slate-400 font-normal">(Modern Workspace)</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Target Budget Estimate</span>
                <span className="font-bold text-slate-800">₹2,50,000 Max</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/70 rounded-xl p-3 flex items-start gap-2 text-xs text-blue-900">
            <ShieldCheck size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <span>All 3 bidders have verified GSTIN & MSME credentials.</span>
          </div>
        </div>

      </div>

      {/* 3. Quotations Received Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Quotations Received (3)</h2>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">LIVE BIDS</span>
            </div>
            <p className="text-xs text-slate-500">Compare all quotation proposals submitted by verified suppliers for this RFQ.</p>
          </div>
          <button className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-slate-50">
            <Eye size={14} /> Preview "Empty Quotations" State
          </button>
        </div>

        {/* 3 Quotations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <div
              key={q.id}
              className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                q.isBestValue 
                  ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500' 
                  : 'border-slate-100 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                {/* Header Badge Area */}
                <div className="p-5 pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 ${q.badgeStyle}`}>
                      {q.id === 1 && <Zap size={12} />}
                      {q.id === 2 && <Tag size={12} />}
                      {q.id === 3 && <Wrench size={12} />}
                      {q.badge}
                    </span>
                    {q.bestValueBadge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        Best Value
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-mono">Quote #{q.id}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg leading-tight">{q.company}</h3>
                  
                  <div className="flex items-center gap-1.5 mt-1 text-xs">
                    <span className="flex items-center gap-1 font-bold text-amber-500">
                      <Star size={13} fill="currentColor" /> {q.rating}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-blue-600 font-medium flex items-center gap-0.5">
                      <ShieldCheck size={13} /> Verified Supplier
                    </span>
                  </div>
                </div>

                {/* Price Box */}
                <div className={`mx-5 p-4 rounded-xl ${q.isBestValue ? 'bg-emerald-50/70 border border-emerald-100' : 'bg-slate-50'}`}>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">TOTAL QUOTED PRICE</p>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className={`text-2xl font-extrabold ${q.isBestValue ? 'text-emerald-700' : 'text-slate-900'}`}>
                      {q.price}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">(GST Inc.)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-slate-500 font-medium">Unit Rate: {q.unitRate}</span>
                    {q.priceSave && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-white px-1.5 py-0.5 rounded border border-emerald-200">
                        ({q.priceSave})
                      </span>
                    )}
                  </div>
                </div>

                {/* Delivery & Terms */}
                <div className="p-5 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="text-slate-400 text-[10px] block uppercase font-bold">Delivery Timeline</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                        <Clock size={12} className="text-slate-400" /> {q.delivery}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="text-slate-400 text-[10px] block uppercase font-bold">
                        {q.freight ? 'Freight Terms' : q.discount ? 'Bulk Discount' : 'Assembly / Care'}
                      </span>
                      <span className="font-semibold text-slate-800 mt-0.5 block">
                        {q.freight || q.discount || q.assembly}
                      </span>
                    </div>
                  </div>

                  {/* Supplier Proposal Note */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span className="flex items-center gap-1"><MessageSquare size={11} /> SUPPLIER PROPOSAL NOTE</span>
                      <span className="text-slate-300 font-serif text-sm">“”</span>
                    </div>
                    <p className="text-xs text-slate-600 bg-slate-50/70 p-3 rounded-xl border border-slate-100 italic leading-relaxed">
                      {q.note}
                    </p>
                  </div>

                  {/* Validity Info */}
                  <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
                    <span>Submitted: {q.submittedDate}</span>
                    <span>Valid: {q.validDays}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 space-y-2">
                <button className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors">
                  <Check size={14} /> Accept Quotation
                </button>
                <button className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors">
                  <MessageSquare size={14} /> Contact Supplier
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BuyerRFQDetails;