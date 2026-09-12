// const BuyerDashboard = () => {
//   return (
//     <div>
//       <h1>Buyer Dashboard</h1>
//     </div>
//   );
// };

// export default BuyerDashboard;

import {
  Plus,
  SlidersHorizontal,
  FileText,
  Activity,
  MessageSquareQuote,
  CheckCircle,
  Pencil,
  ChevronRight,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';

const BuyerDashboard = () => {
  // Stat Card Data
  const stats = [
    {
      title: 'Total RFQs',
      value: '12',
      badge: '+2 posted this month',
      badgeColor: 'text-emerald-600 bg-emerald-50',
      icon: FileText,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Active RFQs',
      value: '4',
      badge: '4 Open - Awaiting final bids',
      badgeColor: 'text-blue-600 bg-blue-50',
      icon: Activity,
      iconBg: 'bg-indigo-50 text-indigo-600',
      borderColor: 'border-b-2 border-blue-600',
    },
    {
      title: 'Quotations Received',
      value: '28',
      badge: '+7 New Proposals - Ready to audit',
      badgeColor: 'text-cyan-600 bg-cyan-50',
      icon: MessageSquareQuote,
      iconBg: 'bg-cyan-50 text-cyan-600',
      borderColor: 'border-b-2 border-cyan-500',
    },
    {
      title: 'Closed RFQs',
      value: '8',
      badge: '100% contracts fulfilled',
      badgeColor: 'text-gray-500 bg-gray-50',
      icon: CheckCircle,
      iconBg: 'bg-gray-100 text-gray-600',
    },
  ];

  // RFQ Cards Data
  const rfqItems = [
    {
      id: 'RFQ-2026-0893',
      title: 'Office Chairs',
      status: 'Open',
      statusColor: 'bg-emerald-100 text-emerald-700',
      description: 'Need 100 ergonomic office chairs for our new office.',
      quantity: '100 Units',
      location: 'Lucknow',
      deadline: '30 Sep 2026',
      quotesCount: '3 Quotations Received',
      quotesBg: 'bg-blue-50 text-blue-700',
    },
    {
      id: 'RFQ-2026-0874',
      title: 'Industrial Storage Racks',
      status: 'Open',
      statusColor: 'bg-emerald-100 text-emerald-700',
      description: 'Heavy-duty steel warehouse pallet racking systems with 2-ton tier load capacity.',
      quantity: '24 Bays',
      location: 'Pune',
      deadline: '15 Oct 2026',
      quotesCount: '5 Quotations',
      quotesBg: 'bg-blue-50 text-blue-700',
    },
    {
      id: 'RFQ-2026-0869',
      title: 'Commercial Solar Inverters',
      status: 'Under Review',
      statusColor: 'bg-sky-100 text-sky-700',
      description: '50kW three-phase on-grid solar inverters with remote monitoring gateway.',
      quantity: '6 Units',
      location: 'Ahmedabad',
      deadline: '22 Sep 2026',
      quotesCount: '4 Quotations',
      quotesBg: 'bg-blue-50 text-blue-700',
    },
    {
      id: 'RFQ-2026-0810',
      title: 'Packaging Corrugated Boxes',
      status: 'Closed',
      statusColor: 'bg-gray-100 text-gray-600',
      description: '7 ply export grade heavy corrugated packing boxes with custom logo print.',
      quantity: '5,000 Pcs',
      location: 'Bengaluru',
      deadline: '05 Sep 2026',
      quotesCount: '7 Quotations',
      quotesBg: 'bg-gray-100 text-gray-600',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 space-y-6 max-w-7xl mx-auto text-slate-800">
      
      {/* 1. Header Banner Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Buyer Portal</span>
            <span>•</span>
            <span>Updated 2m ago</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, Priya Sharma</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage your RFQs and review supplier quotations.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
            <SlidersHorizontal size={16} />
            Preferences
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 shadow-sm transition-colors">
            <Plus size={16} />
            Create RFQ
          </button>
        </div>
      </div>

      {/* 2. Top Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={idx}
              className={`bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between ${
                stat.borderColor || ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
                  <IconComponent size={20} />
                </div>
              </div>
              <div className="mt-2">
                <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${stat.badgeColor}`}>
                  {stat.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Procurement Cycle Velocity Banner */}
      <div className="bg-gradient-to-r from-blue-50/60 to-indigo-50/40 rounded-2xl p-6 border border-blue-100/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Procurement Cycle Velocity</p>
          <h2 className="text-xl font-bold text-slate-900">Average turn-around: 4.2 days per quote</h2>
          <p className="text-xs text-slate-500 mt-1">
            Your RFQs receive responses 35% faster than marketplace average due to thorough technical specifications.
          </p>
        </div>

        <div className="flex items-center gap-4 self-stretch md:self-auto justify-start">
          <div className="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-3 shadow-sm min-w-[170px]">
            <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-t-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
              82%
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Match Rate</p>
              <p className="text-[11px] text-slate-400">Verified Suppliers</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-3 shadow-sm min-w-[170px]">
            <div className="w-10 h-10 rounded-full border-4 border-emerald-600 border-t-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700">
              12.8%
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Est. Savings</p>
              <p className="text-[11px] text-slate-400">Bid Negotiations</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Recent RFQs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent RFQs</h2>
            <p className="text-xs text-slate-500">Latest requirements posted to the supplier marketplace</p>
          </div>
          <button className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1">
            View All RFQs <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rfqItems.map((rfq) => (
            <div
              key={rfq.id}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Card Top Banner */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 text-slate-400 font-bold text-xs">
                      IMG
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-tight">{rfq.title}</h3>
                      <p className="text-xs text-slate-400">{rfq.id}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${rfq.statusColor}`}>
                    {rfq.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-4 line-clamp-2">{rfq.description}</p>

                {/* Info Pills */}
                <div className="bg-slate-50 rounded-xl p-3 grid grid-cols-3 gap-2 mb-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Quantity</p>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">{rfq.quantity}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Location</p>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">{rfq.location}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Deadline</p>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">{rfq.deadline}</p>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className={`text-xs font-medium px-3 py-1.5 rounded-lg ${rfq.quotesBg}`}>
                  {rfq.quotesCount}
                </span>

                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg border border-slate-200 transition-colors">
                    <Pencil size={13} /> Edit
                  </button>
                  <button className="flex items-center gap-1 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-lg transition-colors">
                    View Details <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Bottom Guarantee Banner */}
      <div className="bg-blue-900 text-white rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-1.5 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={16} className="text-blue-300" />
            <span>RFQHub Guarantee</span>
          </div>
          <p className="font-bold text-base">Simple 3-Step Buyer Workflow</p>
          <p className="text-xs text-blue-200">
            1. Post Requirement → 2. Compare Supplier Quotations → 3. Connect directly without hidden fees.
          </p>
        </div>

        <button className="relative z-10 bg-white text-blue-900 text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-colors flex-shrink-0">
          Learn Guidelines
        </button>
      </div>

    </div>
  );
};

export default BuyerDashboard;