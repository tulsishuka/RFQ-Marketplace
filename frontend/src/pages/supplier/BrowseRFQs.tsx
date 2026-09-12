import  { useState } from 'react';
import {
  Search,
  ChevronDown,
  RotateCcw,
  ShieldCheck,
  Hourglass,
  X,
  ArrowRight,
  Clock,
  AlertCircle,
  FilterX
} from 'lucide-react';

const BrowseRFQs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showComplianceBanner, setShowComplianceBanner] = useState(true);
  const [sandboxState, setSandboxState] = useState('empty'); // 'empty', 'loading', 'error'

  const rfqItems = [
    {
      id: 'RFQ-2026-0891',
      category: 'Commercial Furnishings',
      status: 'Open for Bidding',
      statusType: 'success',
      title: 'Office Chairs',
      description: 'Need 100 ergonomic office chairs for our new regional fulfillment center office. Specifications require breathable mesh back, adjustable lumber...',
      requiredQty: '100 Units',
      deliveryLocation: 'Lucknow, UP',
      targetDelivery: 'Standard 30 Days',
      deadline: '30 Sep 2026',
      daysLeft: '18 days left',
      postedDate: '08 Sep 2026',
      postedBy: 'Corporate Infrastructure Ltd.',
      urgent: false,
    },
    {
      id: 'RFQ-2026-0884',
      category: 'Warehouse Storage Solutions',
      status: 'Open for Bidding',
      statusType: 'success',
      title: 'Industrial Heavy-Duty Pallet...',
      description: 'Heavy-duty steel warehouse pallet racking systems with 2-ton tier load capacity. High tensile powder-coated uprights and horizontal beams.',
      requiredQty: '24 Bays',
      deliveryLocation: 'Pune, Maharashtra',
      targetDelivery: 'On-Site Assembly',
      deliveryLabel: 'INSTALLATION',
      deadline: '15 Oct 2026',
      daysLeft: '33 days left',
      postedDate: '09 Sep 2026',
      postedBy: 'Zenith Logistics Park',
      urgent: false,
    },
    {
      id: 'RFQ-2026-0774',
      category: 'Packaging & Shipping',
      status: 'Expiring Soon (3 days)',
      statusType: 'warning',
      title: '7-Ply Corrugated Export...',
      description: '5,000 heavy-duty corrugated shipping cartons, custom dimensions 600x400x400mm with water resistant outer liner and single-color...',
      requiredQty: '5,000 Pcs',
      deliveryLocation: 'Bengaluru, KA',
      targetDelivery: '600x400x400mm',
      deliveryLabel: 'SPECIFICATION',
      deadline: '15 Sep 2026',
      daysLeft: 'Urgent Bidding',
      postedDate: '03 Sep 2026',
      postedBy: 'Orion Electronics Pvt Ltd.',
      urgent: true,
    },
    {
      id: 'RFQ-2026-0812',
      category: 'Telecom & Network Cabling',
      status: 'Open for Bidding',
      statusType: 'success',
      title: 'Single-Mode 24-Core Armor...',
      description: 'OS2 armored outdoor grade 24-core fiber spools with factory test reports and low dB attenuation. Must be compliant with ITU-T G.652.D standard.',
      requiredQty: '5,000 Meters',
      deliveryLocation: 'Hyderabad, TS',
      targetDelivery: 'ITU-T G.652.D',
      deliveryLabel: 'STANDARD',
      deadline: '28 Sep 2026',
      daysLeft: '16 days left',
      postedDate: '07 Sep 2026',
      postedBy: 'Metro Netcom Infra',
      urgent: false,
    },
  ];

  const handleResetFilters = () => {
    setSearchQuery('');
    setLocationFilter('');
    setStatusFilter('');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 max-w-7xl mx-auto space-y-6 text-slate-800">
      
      {/* 1. Header Banner & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>MARKETPLACE DISCOVERY</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Browse RFQs</h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Find business opportunities that match your capabilities.
          </p>
        </div>

        {/* Stats Pill Badges */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="bg-white border border-slate-100 shadow-sm rounded-xl px-4 py-2.5 flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">VERIFIED LEADS</p>
              <p className="text-sm font-bold text-slate-900">142 Live Tenders</p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 shadow-sm rounded-xl px-4 py-2.5 flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Hourglass size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">EXPIRING THIS WEEK</p>
              <p className="text-sm font-bold text-slate-900">19 RFQs</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Procurement Compliance Guideline Banner */}
      {showComplianceBanner && (
        <div className="bg-blue-50/60 border border-blue-100/80 rounded-2xl p-4 relative flex items-start gap-3 text-xs text-blue-900">
          <div className="p-2 bg-blue-600 text-white rounded-lg flex-shrink-0 mt-0.5">
            <ShieldCheck size={16} />
          </div>
          <div className="pr-6 leading-relaxed">
            <p className="font-bold text-blue-950">Procurement Compliance Guideline</p>
            <p className="text-slate-600 text-[11px] mt-0.5">
              <strong className="text-slate-700">Important:</strong> Suppliers must open the RFQ details page to read the complete buyer specification before submitting a quotation. Quotations cannot be submitted directly from listings. Ensure all technical datasheets, compliance forms, and delivery constraints are evaluated thoroughly.
            </p>
          </div>
          <button
            onClick={() => setShowComplianceBanner(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* 3. Search & Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product or service..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Location Dropdown */}
          <div className="md:col-span-3 relative">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full pl-4 pr-8 py-2 border border-slate-200 rounded-xl text-xs appearance-none bg-white text-slate-700 focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
            >
              <option value="">All Locations</option>
              <option value="Lucknow, UP">Lucknow, UP</option>
              <option value="Pune, MH">Pune, Maharashtra</option>
              <option value="Bengaluru, KA">Bengaluru, KA</option>
              <option value="Hyderabad, TS">Hyderabad, TS</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" size={16} />
          </div>

          {/* Status Dropdown */}
          <div className="md:col-span-3 relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-4 pr-8 py-2 border border-slate-200 rounded-xl text-xs appearance-none bg-white text-slate-700 focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="Open for Bidding">Open for Bidding</option>
              <option value="Expiring Soon">Expiring Soon</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" size={16} />
          </div>

          {/* Reset Button */}
          <div className="md:col-span-1">
            <button
              onClick={handleResetFilters}
              className="w-full h-full py-2 flex items-center justify-center gap-1 border border-slate-200 text-slate-600 rounded-xl text-xs hover:bg-slate-50 transition-colors"
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>

        {/* Active Criteria Line */}
        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Active Criteria:</span>
            <span className="bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-md">
              Sector: B2B Industrial & Commercial
            </span>
          </div>
          <span className="text-slate-400">Sorting by: <strong className="text-slate-700">Latest Published</strong></span>
        </div>
      </div>

      {/* 4. Available Buyer Requests Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Available Buyer Requests (4)</h2>
          <span className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Real-time buyer RFQ stream
          </span>
        </div>

        {/* RFQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rfqItems.map((rfq) => (
            <div
              key={rfq.id}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Header Category & Status */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-semibold text-slate-400">{rfq.id}</span>
                    <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {rfq.category}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      rfq.statusType === 'warning'
                        ? 'bg-red-50 text-red-600 border border-red-100'
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    }`}
                  >
                    {rfq.status}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-1.5 leading-snug">{rfq.title}</h3>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                  {rfq.description}
                </p>

                {/* Details 3-Col Box */}
                <div className="bg-slate-50 p-3 rounded-xl grid grid-cols-3 gap-2 text-xs mb-4">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">REQUIRED QTY</span>
                    <span className="font-bold text-slate-800 mt-0.5 block">{rfq.requiredQty}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">DELIVERY LOCATION</span>
                    <span className="font-bold text-slate-800 mt-0.5 block">{rfq.deliveryLocation}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">
                      {rfq.deliveryLabel || 'TARGET DELIVERY'}
                    </span>
                    <span className="font-bold text-slate-800 mt-0.5 block truncate">{rfq.targetDelivery}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="text-[11px] text-slate-400 leading-tight">
                  <div className="flex items-center gap-1 font-semibold text-slate-700">
                    {rfq.urgent ? (
                      <span className="text-red-600 flex items-center gap-1 font-bold">
                        <Clock size={12} /> Deadline: {rfq.deadline} ({rfq.daysLeft})
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-slate-400" /> Deadline: <strong className="text-slate-800">{rfq.deadline}</strong> ({rfq.daysLeft})
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Posted on {rfq.postedDate} by {rfq.postedBy}
                  </p>
                </div>

                <button className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors flex-shrink-0">
                  View Details <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Component Sandbox / Edge States Section */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                COMPONENT SANDBOX
              </span>
              <h3 className="font-bold text-slate-900 text-sm">States Showcase Preview</h3>
            </div>
            <p className="text-xs text-slate-500">
              Live demonstrations of Edge States (Empty, Shimmer Loading Skeleton, and Network Error Handling).
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start">
            <button
              onClick={() => setSandboxState('empty')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                sandboxState === 'empty' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600'
              }`}
            >
              Empty State
            </button>
            <button
              onClick={() => setSandboxState('loading')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                sandboxState === 'loading' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600'
              }`}
            >
              Loading State
            </button>
            <button
              onClick={() => setSandboxState('error')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                sandboxState === 'error' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600'
              }`}
            >
              Error State
            </button>
          </div>
        </div>

        {/* State Preview Box */}
        <div className="bg-white border border-slate-100 rounded-2xl p-10 flex flex-col items-center justify-center text-center shadow-sm min-h-[220px]">
          {sandboxState === 'empty' && (
            <div className="space-y-3 max-w-sm">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <FilterX size={24} />
              </div>
              <h4 className="font-bold text-slate-900 text-base">No RFQs match your filter criteria.</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Try clearing filters or search terms. New opportunities are aggregated from verified enterprise buyers daily.
              </p>
            </div>
          )}

          {sandboxState === 'loading' && (
            <div className="w-full max-w-xl space-y-3 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/3 mx-auto"></div>
              <div className="h-3 bg-slate-100 rounded w-1/2 mx-auto"></div>
              <div className="h-20 bg-slate-100 rounded-xl w-full mt-4"></div>
            </div>
          )}

          {sandboxState === 'error' && (
            <div className="space-y-3 max-w-sm">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                <AlertCircle size={24} />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Failed to fetch marketplace data</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Network connection failed. Please check your internet connection or try again.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default BrowseRFQs;