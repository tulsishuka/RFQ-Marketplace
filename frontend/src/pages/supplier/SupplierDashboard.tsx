import  { useState } from 'react';
import {
  Globe,
  ArrowRight,
  Search,
  Send,
  Hourglass,
  Clock,
  ShieldCheck,
  Building2,
  Package,
  Zap,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

const SupplierDashboard = () => {
  const [activeFilter, setActiveFilter] = useState('All Available (24)');

  const filters = [
    'All Available (24)',
    'Industrial & Warehouse (8)',
    'Office & IT (6)',
    'Packaging & Bulk (10)',
  ];

  const rfqList = [
    {
      id: 'RFQ-8821',
      category: 'Corporate Furniture',
      status: 'Open for Bids',
      title: 'Office Chairs',
      description: 'Need 100 ergonomic office chairs with breathable mesh back, lumbar support, and adjustable...',
      quantity: '100 Units',
      location: 'Lucknow, UP',
      deadline: '30 Sep 2026',
      postedDate: '08 Sep 2026',
      image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'RFQ-8834',
      category: 'Warehousing',
      status: 'Open for Bids',
      title: 'Industrial Heavy-Duty Pallet...',
      description: '24 bays of heavy-duty cold-rolled steel pallet racking systems with 2-ton tier load capacity a...',
      quantity: '24 Bays',
      location: 'Pune, MH',
      deadline: '15 Oct 2026',
      postedDate: '09 Sep 2026',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'RFQ-8799',
      category: 'Electrical',
      status: 'Open for Bids',
      title: 'Commercial 3-Phase Solar...',
      description: 'Supply of 6 units 50kW on-grid solar inverters with IP65 outdoor enclosure and remote...',
      quantity: '6 Units',
      location: 'Ahmedabad, GJ',
      deadline: '22 Sep 2026',
      postedDate: '05 Sep 2026',
      image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 max-w-7xl mx-auto space-y-6 text-slate-800">
      
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>SUPPLIER LIVE MARKETPLACE</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, Vikram Mehta</h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Find relevant RFQs and submit competitive quotations across your registered industrial verticals.
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors self-start md:self-auto">
          <Globe size={15} />
          Browse RFQs
          <ArrowRight size={15} />
        </button>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Available RFQs */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400">Available RFQs</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">24</p>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Search size={18} />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs mt-4">
            <span className="text-slate-500">Open for Bidding</span>
            <span className="bg-emerald-50 text-emerald-600 font-semibold px-2.5 py-0.5 rounded-full text-[11px]">
              +6 new today
            </span>
          </div>
        </div>

        {/* My Quotations */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400">My Quotations</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">18</p>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600">
              <Send size={18} />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs mt-4">
            <span className="text-slate-500">Total Submitted</span>
            <span className="bg-sky-50 text-sky-600 font-semibold px-2.5 py-0.5 rounded-full text-[11px]">
              4 under evaluation
            </span>
          </div>
        </div>

        {/* Pending Quotations */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400">Pending Quotations</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">5</p>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
              <Hourglass size={18} />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs mt-4">
            <span className="text-slate-500">Awaiting Buyer Decision</span>
            <span className="bg-slate-100 text-slate-600 font-medium px-2.5 py-0.5 rounded-full text-[11px] flex items-center gap-1">
              <Clock size={11} /> Avg response 2.4 days
            </span>
          </div>
        </div>

      </div>

      {/* 3. Latest RFQs Marketplace */}
      <div className="space-y-4">
        {/* Title & Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Latest RFQs</h2>
              <span className="bg-blue-100 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded-full">
                24 Live
              </span>
            </div>
            <p className="text-xs text-slate-500">Recently posted requirements matching your category profile</p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/70 p-1 rounded-xl">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rfqList.map((rfq) => (
            <div
              key={rfq.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Card Image Banner */}
                <div className="relative h-44 w-full bg-slate-100">
                  <img
                    src={rfq.image}
                    alt={rfq.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                    {rfq.category === 'Corporate Furniture' && <Building2 size={13} />}
                    {rfq.category === 'Warehousing' && <Package size={13} />}
                    {rfq.category === 'Electrical' && <Zap size={13} />}
                    {rfq.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-700/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {rfq.status}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-slate-900 text-base leading-snug">{rfq.title}</h3>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">{rfq.id}</span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {rfq.description}
                  </p>

                  {/* Details Grid Box */}
                  <div className="bg-slate-50 p-3 rounded-xl grid grid-cols-2 gap-y-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Quantity</span>
                      <span className="font-bold text-slate-800">{rfq.quantity}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Delivery Location</span>
                      <span className="font-bold text-slate-800">{rfq.location}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Bid Deadline</span>
                      <span className="font-bold text-red-600">{rfq.deadline}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Posted Date</span>
                      <span className="font-bold text-slate-700">{rfq.postedDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 pt-0 flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                  <ShieldCheck size={14} /> Verified Buyer
                </span>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors">
                  View Details <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. System Interface States Banner */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            System Interface States
          </span>
          <span className="text-slate-400 text-[10px]">Marketplace Viewport Handlers</span>
        </div>

        {/* Alert Box */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-3.5 flex items-center justify-between text-xs text-red-700">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-500 flex-shrink-0" />
            <span className="font-medium">
              Unable to load latest market feeds. Market data socket connection interrupted.
            </span>
          </div>
          <button className="flex items-center gap-1 px-3 py-1 bg-white border border-red-200 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-50 transition-colors flex-shrink-0">
            <RefreshCw size={12} /> Retry Now
          </button>
        </div>
      </div>

    </div>
  );
};

export default SupplierDashboard;