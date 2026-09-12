import  { useState } from 'react';
import {
  Send,
  IndianRupee,
  CheckCircle2,
  Clock,
  PlusCircle,
  SlidersHorizontal,
  Search,
  LayoutGrid,
  List,
  Building2,
  Calendar,
  ShieldCheck,
  Truck,
  FileCheck,

  Package,
  ArrowRight,
  FilterX,
  AlertCircle
} from 'lucide-react';

const MyQuotations = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [sandboxState, setSandboxState] = useState('empty');

  const quotations = [
    {
      id: 'RFQ-2026-0891',
      title: 'Office Chairs',
      status: 'SUBMITTED / UNDER EVALUATION',
      statusType: 'blue',
      buyer: 'ProcureCorp Solutions Ltd.',
      location: 'Lucknow, UP',
      submittedDate: '10 September 2026',
      quoteAmount: '₹2,45,000',
      subText: '₹2,450 / chair (100 Units)',
      estimatedDelivery: '14 business days',
      standard: 'BIFMA X5.1 + 3-Yr Warranty',
      freight: 'Free Palletized Transit',
      validity: 'Valid till 30 Sep 2026',
      supplierNote: 'We can supply all 100 ergonomic chairs conforming to BIFMA X5.1 standards with 3-year warranty within 14 business days. Free palletized shipping included.',
      actionText: 'View RFQ',
    },
    {
      id: 'RFQ-2026-0834',
      title: 'Industrial Heavy-Duty Pallet Racks',
      status: 'ACCEPTED BY BUYER',
      statusType: 'green',
      buyer: 'Zenith Logistics Hub',
      location: 'Pune, MH',
      submittedDate: '10 September 2026',
      quoteAmount: '₹4,80,000',
      subText: 'PO Pending Issue',
      estimatedDelivery: '21 business days',
      standard: 'Cold-rolled IS 2062 steel',
      freight: 'On-site crew included',
      validity: 'Sign Procurement Contract',
      isActionHighlight: true,
      supplierNote: 'Cold-rolled structural steel specification with zinc-galvanized footplates and beams. On-site installation support available.',
      actionText: 'View RFQ',
    },
    {
      id: 'RFQ-2026-0799',
      title: 'Commercial 3-Phase Solar Inverters (50kW)',
      status: 'SUBMITTED / UNDER EVALUATION',
      statusType: 'blue',
      buyer: 'SunPower MPC Ltd.',
      location: 'Ahmedabad, GJ',
      submittedDate: '09 September 2026',
      quoteAmount: '₹8,90,000',
      subText: 'Immediate Dispatch Tier',
      estimatedDelivery: '7 calendar days',
      standard: 'In Stock (Local Depot)',
      freight: 'Cloud IoT Gateway incl.',
      validity: '5-Year O&M Warranty',
      supplierNote: 'Immediate warehouse stock available in Ahmedabad for same-week dispatch. Includes 5-year manufacturer warranty and cloud gateway.',
      actionText: 'View RFQ',
    },
    {
      id: 'RFQ-2026-0522',
      title: '7-Ply Corrugated Packaging Boxes (5,000 Pcs)',
      status: 'CLOSED / COMPLETED',
      statusType: 'gray',
      buyer: 'SwiftPack Solutions',
      location: 'Bengaluru, KA',
      submittedDate: '01 September 2026',
      quoteAmount: '₹1,35,000',
      subText: '₹27 / box fulfilled',
      estimatedDelivery: '10 calendar days',
      standard: '180 GSM Kraft fluting',
      freight: 'Burst Test Certified',
      validity: 'Goods Delivered & Closed',
      supplierNote: 'High-grade 180 GSM kraft fluting with burst test certification. Free sample carton dispatched for quality verification.',
      actionText: 'View RFQ',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 max-w-7xl mx-auto space-y-6 text-slate-800">
      
      {/* Top Navbar Context Header */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200/60 gap-2">
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

      {/* 1. Key Metrics Ribbon Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Active Submissions */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ACTIVE SUBMISSIONS</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">18</p>
            <p className="text-[11px] text-blue-600 font-medium mt-0.5">+3 this week</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
            <Send size={18} />
          </div>
        </div>

        {/* Pipeline Value */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">PIPELINE VALUE</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">₹17.50 L</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Across 8 active bids</p>
          </div>
          <div className="p-3 rounded-xl bg-cyan-50 text-cyan-600">
            <IndianRupee size={18} />
          </div>
        </div>

        {/* Buyer Win Rate */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">BUYER WIN RATE</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">33.3%</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5">4 Accepted contracts</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={18} />
          </div>
        </div>

        {/* Avg. Response Lead */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">AVG. RESPONSE LEAD</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">11.8h</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Top 10% for supplier</p>
          </div>
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
            <Clock size={18} />
          </div>
        </div>

      </div>

      {/* 2. Title & Global Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        <div>
          <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1">
            COMMERCIAL BIDS <span className="text-slate-300">•</span> Apex Industrial Supplies
          </div>
          <h1 className="text-2xl font-bold text-slate-900">My Quotations</h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Track the quotations you have submitted to buyers.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-sm transition-colors">
            <PlusCircle size={15} />
            Submit New Quote
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-colors">
            <SlidersHorizontal size={15} />
            Simulate States
          </button>
        </div>
      </div>

      {/* 3. Filter Tabs & Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
        
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-100/70 p-1 rounded-xl self-start">
          {[
            { label: 'All', count: 18 },
            { label: 'Under Evaluation', count: 12 },
            { label: 'Accepted', count: 4 },
            { label: 'Archived', count: 2 },
          ].map((tab) => {
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input & View Modes */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={15} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by RFQ product name, ID, or buyer name..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-0.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-slate-600 transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : ''
              }`}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-slate-600 transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : ''
              }`}
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Quotations List Stream */}
      <div className="space-y-4">
        {quotations.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
          >
            {/* Left Accent Bar */}
            <div
              className={`absolute top-0 left-0 bottom-0 w-1 ${
                item.statusType === 'green'
                  ? 'bg-emerald-500'
                  : item.statusType === 'blue'
                  ? 'bg-blue-600'
                  : 'bg-slate-300'
              }`}
            ></div>

            {/* Quotation Item Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pl-2">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                    <Package size={16} />
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold px-2 py-0.5 bg-slate-50 border border-slate-100 rounded">
                    {item.id}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      item.statusType === 'green'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : item.statusType === 'blue'
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pl-8">
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <Building2 size={13} className="text-slate-400" /> Buyer: {item.buyer}
                  </span>
                  <span>•</span>
                  <span>{item.location}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-slate-400" /> Submitted: {item.submittedDate}
                  </span>
                </div>
              </div>

              {/* Amount & Main Action */}
              <div className="flex items-center gap-4 self-end md:self-auto pl-8 md:pl-0">
                <div className="text-right">
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">QUOTED AMOUNT</span>
                  <span className="text-xl font-extrabold text-slate-900">{item.quoteAmount}</span>
                  <span className="text-[10px] text-slate-400 block font-medium">{item.subText}</span>
                </div>

                <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs rounded-xl flex items-center gap-1 transition-colors">
                  {item.actionText} <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Middle Specifications 4-Col Grid */}
            <div className="bg-slate-50/70 p-3 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-3 text-xs ml-2">
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-slate-400 flex-shrink-0" />
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">ESTIMATED DELIVERY</span>
                  <span className="font-bold text-slate-800">{item.estimatedDelivery}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-slate-400 flex-shrink-0" />
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">STANDARD & GUARANTEE</span>
                  <span className="font-bold text-slate-800">{item.standard}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Truck size={15} className="text-slate-400 flex-shrink-0" />
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">FREIGHT TERMS</span>
                  <span className="font-bold text-slate-800">{item.freight}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FileCheck size={15} className="text-slate-400 flex-shrink-0" />
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">QUOTE VALIDITY</span>
                  {item.isActionHighlight ? (
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[11px] inline-block">
                      {item.validity}
                    </span>
                  ) : (
                    <span className="font-bold text-slate-800">{item.validity}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Supplier Note Line */}
            <div className="text-xs text-slate-500 bg-slate-50/40 px-3 py-2 rounded-lg border border-slate-100 flex items-start gap-2 ml-2">
              <input type="checkbox" checked readOnly className="mt-0.5 rounded border-slate-300 text-blue-600" />
              <p>
                <strong className="text-slate-700 font-semibold">Supplier Note:</strong> "{item.supplierNote}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 5. States Simulation Showcase (Edge Cases Control) */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">DESIGN SYSTEM ALERT & PREVIEW</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">States Simulation Showcase</h3>
            <p className="text-xs text-slate-500">
              Interactive previews of Empty, Loading skeleton, and System Error states for this workspace.
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
              Loading Skeleton
            </button>
            <button
              onClick={() => setSandboxState('error')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                sandboxState === 'error' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600'
              }`}
            >
              Error Banner
            </button>
          </div>
        </div>

        {/* Dynamic Sandbox Display */}
        <div className="bg-white border border-slate-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm min-h-[180px]">
          {sandboxState === 'empty' && (
            <div className="space-y-2 max-w-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <FilterX size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">No Quotations Found</h4>
              <p className="text-xs text-slate-500">
                No active quotations match the selected tab filter or search query.
              </p>
            </div>
          )}

          {sandboxState === 'loading' && (
            <div className="w-full max-w-md space-y-3 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto"></div>
              <div className="h-3 bg-slate-100 rounded w-3/4 mx-auto"></div>
              <div className="h-12 bg-slate-100 rounded-xl w-full mt-2"></div>
            </div>
          )}

          {sandboxState === 'error' && (
            <div className="space-y-2 max-w-sm text-red-600">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                <AlertCircle size={20} />
              </div>
              <h4 className="font-bold text-sm">Failed to Sync Quotation Data</h4>
              <p className="text-xs text-slate-500">
                Could not connect to the backend server. Please check your credentials and try again.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default MyQuotations;