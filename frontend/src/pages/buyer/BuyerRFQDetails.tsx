// /* eslint-disable react-hooks/set-state-in-effect */



// import { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// import {
//   ArrowLeft,

//   MapPin,
//   ClipboardList,
//   CheckCircle2,
//   ShieldCheck,
//   TrendingUp,
//   Check,
//   MessageSquare,
//   Zap,
//   Tag,
//   Wrench,
//   Clock,
//   Truck,
//   Sparkles,
// } from "lucide-react";

// interface RFQ {
//   _id: string;
//   productService: string;
//   description: string;
//   quantity: number;
//   unit: "Units" | "Pcs" | "Bays" | "Kg";
//   deliveryLocation: string;
//   deadline: string;
//   images: string[];
//   status: "open" | "closed";
//   createdAt: string;
// }

// interface Supplier {
//   _id: string;
//   name: string;
//   email: string;
// }

// interface Quote {
//   _id: string;
//   rfq: string;
//   supplier: Supplier;
//   price: number;
//   deliveryTime: string;
//   message: string;
//   createdAt: string;
// }

// const BuyerRFQDetails = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   const rfqId = searchParams.get("id");

//   const [rfq, setRfq] = useState<RFQ | null>(null);
//   const [quotes, setQuotes] = useState<Quote[]>([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchRFQDetails = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const token = localStorage.getItem("token");

//       if (!token) {
//         setError("Please login first.");
//         return;
//       }

//       if (!rfqId) {
//         setError("RFQ ID is missing.");
//         return;
//       }


//       const rfqResponse = await fetch(
//         `https://rfq-marketplace-502m.onrender.com/api/rfqs/${rfqId}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const rfqData = await rfqResponse.json();

//       if (!rfqResponse.ok) {
//         setError(
//           rfqData.message || "Failed to fetch RFQ details."
//         );
//         return;
//       }

//       setRfq(rfqData.rfq);

//       console.log("RFQ DATA:", rfqData.rfq);
// console.log("RFQ IMAGES:", rfqData.rfq?.images);



//       const quoteResponse = await fetch(
//         `https://rfq-marketplace-502m.onrender.com/api/rfqs/${rfqId}/quotes`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const quoteData = await quoteResponse.json();

//       if (quoteResponse.ok) {
//         setQuotes(quoteData.quotes || []);
//       } else {
//         console.error(
//           "Failed to fetch quotations:",
//           quoteData.message
//         );
//       }
//     } catch (error) {
//       console.error(
//         "Fetch RFQ details error:",
//         error
//       );

//       setError("Unable to connect to server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRFQDetails();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [rfqId]);

 
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#060a12] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto" />

//           <p className="mt-4 text-sm text-slate-400">
//             Loading RFQ details...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !rfq) {
//     return (
//       <div className="min-h-screen bg-[#060a12] flex items-center justify-center p-6">
//         <div className="bg-[#0b1329] rounded-2xl border border-slate-800 p-8 text-center max-w-md shadow-2xl">
//           <p className="text-red-400 font-semibold">
//             {error || "RFQ not found."}
//           </p>

//           <button
//             onClick={() => navigate("/buyer/dashboard")}
//             className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all shadow-lg shadow-blue-600/20"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

 
//   const lowestQuote =
//     quotes.length > 0
//       ? [...quotes].sort(
//           (a, b) => a.price - b.price
//         )[0]
//       : null;

//   const fastestQuote =
//     quotes.length > 0
//       ? [...quotes].sort((a, b) => {
//           const aDays =
//             parseInt(a.deliveryTime) || 999999;

//           const bDays =
//             parseInt(b.deliveryTime) || 999999;

//           return aDays - bDays;
//         })[0]
//       : null;

//   const formatDate = (date: string) => {
//     return new Date(date).toLocaleDateString(
//       "en-IN",
//       {
//         day: "2-digit",
//         month: "long",
//         year: "numeric",
//       }
//     );
//   };

//   const formatPrice = (price: number) => {
//     return `₹${price.toLocaleString("en-IN")}`;
//   };

//   return (
//     <div className="min-h-screen bg-[#060a12] text-slate-100 font-sans p-4 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-6">

      
//         <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
//           <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
//             <span className="text-slate-200 font-semibold">Procurement Portal</span>
//             <span>/</span>
//             <span>Buyer Workspace</span>
//           </div>

         
//         </div>

//         <div className="space-y-4">
//           <div className="flex items-center justify-between text-xs">
//             <button
//               onClick={() => navigate("/buyer/dashboard")}
//               className="flex items-center gap-2 font-medium text-blue-400 hover:text-blue-300 transition-colors"
//             >
//               <ArrowLeft size={15} />
//               Back to My RFQs
//             </button>

//             <div className="flex items-center gap-3">
//               <span className="font-mono text-xs text-slate-400 tracking-wide">
//                 RFQ-ID: #{rfq._id.slice(-8).toUpperCase()}
//               </span>
//               <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 text-[11px] font-medium">
//                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//                 Public Sourcing
//               </span>
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
//             <div>
//               <div className="flex flex-wrap items-center gap-3">
//                 <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
//                   {rfq.productService}
//                 </h1>

//                 <span
//                   className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
//                     rfq.status === "open"
//                       ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
//                       : "bg-slate-800 text-slate-400 border-slate-700"
//                   }`}
//                 >
//                   {rfq.status === "open" ? "● Open" : "Closed"}
//                 </span>

//                 <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700 font-medium">
//                   Standard Commercial Sourcing
//                 </span>
//               </div>

             
//             </div>

             
            
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

         
//           <div className="lg:col-span-2 bg-[#0b1329] rounded-2xl p-5 sm:p-6 border border-slate-800/80 shadow-xl space-y-5">

//             <div className="flex items-center justify-between border-b border-slate-800/80 pb-3.5">
//               <div className="flex items-center gap-2.5 font-bold text-white text-base">
//                 <ClipboardList className="text-blue-400" size={18} />
//                 <span>Buyer Requirement Details</span>
//               </div>

//               <span className="text-[11px] text-slate-400 bg-slate-800/50 border border-slate-700/50 px-2.5 py-0.5 rounded-md">
//                 Category: Corporate Furniture
//               </span>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

//               <div className="bg-[#111c38] p-3 rounded-xl border border-slate-800/60">
//                 <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                   PRODUCT / SERVICE
//                 </p>
//                 <p className="font-bold text-slate-100 text-xs sm:text-sm mt-1">
//                   {rfq.productService}
//                 </p>
//               </div>

//               <div className="bg-[#111c38] p-3 rounded-xl border border-slate-800/60">
//                 <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                   TOTAL QUANTITY
//                 </p>
//                 <p className="font-bold text-blue-400 text-xs sm:text-sm mt-1">
//                   {rfq.quantity} {rfq.unit}
//                 </p>
//               </div>

//               <div className="bg-[#111c38] p-3 rounded-xl border border-slate-800/60">
//                 <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                   DELIVERY LOCATION
//                 </p>
//                 <p className="font-bold text-slate-100 text-xs sm:text-sm mt-1 flex items-center gap-1">
//                   <MapPin size={12} className="text-blue-400 shrink-0" />
//                   <span className="truncate">{rfq.deliveryLocation}</span>
//                 </p>
//               </div>

//               <div className="bg-[#111c38] p-3 rounded-xl border border-slate-800/60">
//                 <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                   DEADLINE FOR QUOTES
//                 </p>
//                 <p className="font-bold text-red-400 text-xs sm:text-sm mt-1">
//                   {formatDate(rfq.deadline)}
//                 </p>
//               </div>

//               <div className="bg-[#111c38] p-3 rounded-xl border border-slate-800/60">
//                 <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                   POSTED ON
//                 </p>
//                 <p className="font-bold text-slate-200 text-xs sm:text-sm mt-1">
//                   {formatDate(rfq.createdAt)}
//                 </p>
//               </div>

//               <div className="bg-[#111c38] p-3 rounded-xl border border-slate-800/60">
//                 <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                   TARGET FULFILLMENT
//                 </p>
//                 <p className="font-bold text-slate-200 text-xs sm:text-sm mt-1">
//                   Immediate / Q3 Batch
//                 </p>
//               </div>

//             </div>

//             {/* DESCRIPTION */}
//             <div className="space-y-1.5">
//               <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                 REQUIREMENT DESCRIPTION & SPECIFICATIONS
//               </p>

//               <div className="bg-[#111c38]/70 border border-slate-800 p-4 rounded-xl text-xs text-slate-300 leading-relaxed">
//                 {rfq.description}
//               </div>
//             </div>

//             {rfq.images && rfq.images.length > 0 && (
//               <div className="space-y-2">
//                 <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                   REFERENCE IMAGES
//                 </p>

//                 <div className="flex flex-wrap gap-3">
//                   {rfq.images.map((image, index) => (
//                     <img
//                       key={index}
//                       src={`https://rfq-marketplace-502m.onrender.com/${image}`}
//                       alt={`RFQ reference ${index + 1}`}
//                       className="w-24 h-24 object-cover rounded-xl border border-slate-700 bg-slate-900"
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

           

//             {/* FOOTER METRICS */}
//             <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-800/80 gap-3">
//               <div className="flex items-center gap-4">
//                 <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
//                   <CheckCircle2 size={13} />
//                   100% Verified Specifications
//                 </span>

//                 <span className="flex items-center gap-1.5 text-slate-300">
//                   <Truck size={13} className="text-blue-400" />
//                   Freight Included preferred
//                 </span>
//               </div>

//               <span className="font-mono text-slate-500">
//                 Procurement Code: LKO-CORP-9901
//               </span>
//             </div>

//           </div>

//           <div className="bg-[#0b1329] rounded-2xl p-6 border border-slate-800/80 shadow-xl flex flex-col justify-between space-y-4">

//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="font-bold text-white text-sm">
//                   RFQ Marketplace Vitality
//                 </h3>
//                 <TrendingUp size={16} className="text-blue-400" />
//               </div>

//               <div className="flex items-center justify-between my-5">
//                 <div>
//                   <div className="text-3xl sm:text-4xl font-extrabold text-white">
//                     {quotes.length}
//                     <span className="text-sm font-normal text-slate-400 ml-1.5">
//                       Quotes
//                     </span>
//                   </div>

//                   <p className="text-xs text-emerald-400 font-medium mt-1">
//                     {quotes.length > 0
//                       ? "100% compliant with spec"
//                       : "Waiting for supplier quotes"}
//                   </p>
//                 </div>

//                 <div className="relative w-14 h-14 flex items-center justify-center rounded-full border-4 border-blue-500 border-t-slate-700 bg-blue-950/30">
//                   <span className="text-xs font-bold text-white">
//                     {quotes.length > 0 ? "75%" : "0%"}
//                   </span>
//                 </div>
//               </div>

//               <div className="space-y-2.5 text-xs border-t border-slate-800/80 pt-4">

//                 <div className="flex justify-between items-center gap-3">
//                   <span className="text-slate-400">
//                     Lowest Bid Received
//                   </span>
//                   <span className="font-bold text-emerald-400 text-right">
//                     {lowestQuote
//                       ? `${formatPrice(lowestQuote.price)} (${lowestQuote.supplier?.name || "XYZ Office"})`
//                       : "No bids"}
//                   </span>
//                 </div>

//                 <div className="flex justify-between items-center gap-3">
//                   <span className="text-slate-400">
//                     Fastest Delivery
//                   </span>
//                   <span className="font-bold text-blue-400 text-right">
//                     {fastestQuote
//                       ? `${fastestQuote.deliveryTime} (Modern Workspace)`
//                       : "No bids"}
//                   </span>
//                 </div>

//                 <div className="flex justify-between items-center gap-3">
//                   <span className="text-slate-400">
//                     Target Budget Estimate
//                   </span>
//                   <span className="font-bold text-slate-200">
//                     ₹2,60,000 Max
//                   </span>
//                 </div>

//               </div>
//             </div>

//             <div className="bg-[#111c38] rounded-xl p-3 flex items-start gap-2 text-xs text-slate-300 border border-slate-800">
//               <ShieldCheck size={16} className="text-emerald-400 shrink-0 mt-0.5" />
//               <span>
//                 All {quotes.length || 3} bidders hold verified GSTIN & MSME credentials
//               </span>
//             </div>

//           </div>

//         </div>

     
//         <div className="space-y-4 pt-2">

//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//             <div>
//               <div className="flex items-center gap-2.5">
//                 <h2 className="text-lg font-bold text-white">
//                   Quotations Received ({quotes.length})
//                 </h2>

//                 {quotes.length > 0 && (
//                   <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
//                     LIVE BIDS
//                   </span>
//                 )}
//               </div>

//               <p className="text-xs text-slate-400 mt-0.5">
//                 Compare all quotation proposals submitted by verified suppliers for this RFQ.
//               </p>
//             </div>

//             <button
//               type="button"
//               className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50 self-start sm:self-auto"
//             >
//               <Sparkles size={12} className="text-blue-400" />
//               Preview "Empty Quotations" State
//             </button>
//           </div>

//           {quotes.length === 0 && (
//             <div className="bg-[#0b1329] rounded-2xl border border-slate-800 shadow-xl p-12 text-center">
//               <MessageSquare size={36} className="mx-auto text-slate-600" />

//               <h3 className="mt-4 font-bold text-slate-200">
//                 No quotations yet
//               </h3>

//               <p className="text-xs text-slate-400 mt-1">
//                 Suppliers have not submitted quotations for this RFQ yet.
//               </p>
//             </div>
//           )}

        
//           {quotes.length > 0 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {quotes.map((q, index) => {
//                 const isLowest = lowestQuote?._id === q._id;
//                 const isFastest = fastestQuote?._id === q._id;

//                 // eslint-disable-next-line no-useless-assignment
//                 let badge = "";
//                 // eslint-disable-next-line no-useless-assignment
//                 let badgeStyle = "bg-blue-500/10 text-blue-400 border-blue-500/20";

//                 if (isLowest) {
//                   badge = "Lowest Price";
//                   badgeStyle = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
//                 } else if (isFastest) {
//                   badge = "Best Delivery Speed";
//                   badgeStyle = "bg-blue-500/10 text-blue-400 border-blue-500/20";
//                 } else {
//                   badge = "Includes Installation";
//                   badgeStyle = "bg-blue-500/10 text-blue-400 border-blue-500/20";
//                 }

//                 return (
//                   <div
//                     key={q._id}
//                     className={`bg-[#0b1329] rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xl ${
//                       isLowest
//                         ? "border-emerald-500/80 ring-1 ring-emerald-500/50"
//                         : "border-slate-800 hover:border-slate-700"
//                     }`}
//                   >
//                     <div>

//                       <div className="p-5 pb-3">

//                         <div className="flex items-center justify-between mb-3">
//                           <span
//                             className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${badgeStyle}`}
//                           >
//                             {isLowest && <Tag size={11} />}
//                             {isFastest && !isLowest && <Zap size={11} />}
//                             {!isLowest && !isFastest && <Wrench size={11} />}
//                             {badge}
//                           </span>

//                           <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
//                             Quote #{index + 1}
//                           </span>
//                         </div>

//                         <h3 className="font-bold text-white text-lg leading-tight flex items-center gap-2">
//                           {q.supplier?.name || "Unknown Supplier"}
//                         </h3>

//                         <div className="flex items-center gap-2 mt-1.5 text-xs">
//                           <span className="text-amber-400 font-bold flex items-center gap-0.5">
//                             ★ 4.8
//                           </span>
//                           <span className="text-slate-500">•</span>
//                           <span className="text-blue-400 font-medium flex items-center gap-1">
//                             <ShieldCheck size={12} />
//                             Verified Supplier
//                           </span>
//                         </div>

//                       </div>

//                       {/* PRICE BOX */}
//                       <div
//                         className={`mx-5 p-4 rounded-xl ${
//                           isLowest
//                             ? "bg-[#091f1c] border border-emerald-800/60"
//                             : "bg-[#111c38] border border-slate-800/60"
//                         }`}
//                       >
//                         <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                           {isLowest ? "LOWEST QUOTED TOTAL" : "TOTAL QUOTED PRICE"}
//                         </p>

//                         <div className="flex items-baseline gap-2 mt-0.5">
//                           <span
//                             className={`text-2xl sm:text-3xl font-black ${
//                               isLowest ? "text-emerald-400" : "text-white"
//                             }`}
//                           >
//                             {formatPrice(q.price)}
//                           </span>
//                           <span className="text-[10px] text-slate-400 font-normal">
//                             (GST Inc.)
//                           </span>
//                         </div>

//                         <div className="text-xs mt-1 text-slate-400">
//                           Unit Rate: {formatPrice(Math.round(q.price / rfq.quantity))} / {rfq.unit.toLowerCase().slice(0, -1) || "unit"}
//                           {isLowest && (
//                             <span className="text-emerald-400 font-medium ml-1">
//                               (Save ₹15,000+)
//                             </span>
//                           )}
//                         </div>
//                       </div>

//                       {/* DELIVERY + MESSAGE */}
//                       <div className="p-5 space-y-3">

//                         <div className="grid grid-cols-2 gap-2 text-xs">
//                           <div className="bg-[#111c38] p-2.5 rounded-lg border border-slate-800/60">
//                             <span className="text-slate-400 text-[10px] block uppercase font-bold">
//                               Delivery Timeline
//                             </span>
//                             <span className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
//                               <Clock size={12} className="text-blue-400" />
//                               {q.deliveryTime}
//                             </span>
//                           </div>

//                           <div className="bg-[#111c38] p-2.5 rounded-lg border border-slate-800/60">
//                             <span className="text-slate-400 text-[10px] block uppercase font-bold">
//                               {isLowest ? "Bulk Discount" : "Freight Terms"}
//                             </span>
//                             <span className="font-semibold text-emerald-400 mt-0.5 block">
//                               {isLowest ? "Applied" : "Free Delivery"}
//                             </span>
//                           </div>
//                         </div>

//                         {/* SUPPLIER MESSAGE */}
//                         <div className="space-y-1">
//                           <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                             <span className="flex items-center gap-1">
//                               <MessageSquare size={11} />
//                               SUPPLIER PROPOSAL NOTE
//                             </span>
//                           </div>

//                           <p className="text-xs text-slate-300 bg-[#111c38]/60 p-3 rounded-xl border border-slate-800 italic leading-relaxed">
//                             "{q.message || "We can provide all items within schedule."}"
//                           </p>
//                         </div>

//                         {/* SUBMITTED DATE */}
//                         <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1">
//                           <span>
//                             Submitted: {formatDate(q.createdAt)}
//                           </span>
//                           <span>
//                             Valid: 30 Days
//                           </span>
//                         </div>

//                       </div>

//                     </div>

//                     {/* ACTIONS */}
//                     <div className="p-5 pt-0 space-y-2">
//                       <button
//                         className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/20 transition-all"
//                       >
//                         <Check size={14} />
//                         Accept Quotation
//                       </button>

//                       <button
//                         className="w-full py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-slate-700/60 transition-colors"
//                       >
//                         <MessageSquare size={14} />
//                         Contact Supplier
//                       </button>
//                     </div>

//                   </div>
//                 );
//               })}
//             </div>
//           )}

//         </div>

//       </div>
//     </div>
//   );
// };

// export default BuyerRFQDetails;




/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  ArrowLeft,
  MapPin,
  ClipboardList,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Check,
  MessageSquare,
  Zap,
  Tag,
  Wrench,
  Clock,
  Truck,
  Sparkles,
} from "lucide-react";

interface RFQ {
  _id: string;
  productService: string;
  description: string;
  quantity: number;
  unit: "Units" | "Pcs" | "Bays" | "Kg";
  deliveryLocation: string;
  deadline: string;
  images: string[];
  status: "open" | "closed";
  createdAt: string;
}

interface Supplier {
  _id: string;
  name: string;
  email: string;
}

interface Quote {
  _id: string;
  rfq: string;
  supplier: Supplier;
  price: number;
  deliveryTime: string;
  message: string;
  createdAt: string;
}

const BuyerRFQDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const rfqId = searchParams.get("id");

  const [rfq, setRfq] = useState<RFQ | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Convert image paths into the correct deployed backend URL
  const getImageUrl = (image: string) => {
    if (!image) return "";

    // Old images saved with localhost
    if (image.includes("localhost:3000")) {
      const path = image.split("localhost:3000")[1];

      return `https://rfq-marketplace-502m.onrender.com${path}`;
    }

    // Already deployed backend URL
    if (
      image.startsWith(
        "https://rfq-marketplace-502m.onrender.com"
      )
    ) {
      return image;
    }

    // Any other complete URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    // Relative path such as /uploads/image.png
    const cleanImage = image.replace(/^\/+/, "");

    return `https://rfq-marketplace-502m.onrender.com/${cleanImage}`;
  };

  const fetchRFQDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      if (!rfqId) {
        setError("RFQ ID is missing.");
        return;
      }

      const rfqResponse = await fetch(
        `https://rfq-marketplace-502m.onrender.com/api/rfqs/${rfqId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const rfqData = await rfqResponse.json();

      if (!rfqResponse.ok) {
        setError(
          rfqData.message || "Failed to fetch RFQ details."
        );
        return;
      }

      setRfq(rfqData.rfq);

      console.log("RFQ DATA:", rfqData.rfq);
      console.log(
        "RFQ IMAGES:",
        rfqData.rfq?.images
      );

      const quoteResponse = await fetch(
        `https://rfq-marketplace-502m.onrender.com/api/rfqs/${rfqId}/quotes`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const quoteData = await quoteResponse.json();

      if (quoteResponse.ok) {
        setQuotes(quoteData.quotes || []);
      } else {
        console.error(
          "Failed to fetch quotations:",
          quoteData.message
        );
      }
    } catch (error) {
      console.error(
        "Fetch RFQ details error:",
        error
      );

      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRFQDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rfqId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060a12] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-sm text-slate-400">
            Loading RFQ details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !rfq) {
    return (
      <div className="min-h-screen bg-[#060a12] flex items-center justify-center p-6">
        <div className="bg-[#0b1329] rounded-2xl border border-slate-800 p-8 text-center max-w-md shadow-2xl">
          <p className="text-red-400 font-semibold">
            {error || "RFQ not found."}
          </p>

          <button
            onClick={() =>
              navigate("/buyer/dashboard")
            }
            className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all shadow-lg shadow-blue-600/20"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const lowestQuote =
    quotes.length > 0
      ? [...quotes].sort(
          (a, b) => a.price - b.price
        )[0]
      : null;

  const fastestQuote =
    quotes.length > 0
      ? [...quotes].sort((a, b) => {
          const aDays =
            parseInt(a.deliveryTime) || 999999;

          const bDays =
            parseInt(b.deliveryTime) || 999999;

          return aDays - bDays;
        })[0]
      : null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <span className="text-slate-200 font-semibold">
              Procurement Portal
            </span>
            <span>/</span>
            <span>Buyer Workspace</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <button
              onClick={() =>
                navigate("/buyer/dashboard")
              }
              className="flex items-center gap-2 font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft size={15} />
              Back to My RFQs
            </button>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-slate-400 tracking-wide">
                RFQ-ID: #
                {rfq._id.slice(-8).toUpperCase()}
              </span>

              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Public Sourcing
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {rfq.productService}
                </h1>

                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                    rfq.status === "open"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}
                >
                  {rfq.status === "open"
                    ? "● Open"
                    : "Closed"}
                </span>

                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700 font-medium">
                  Standard Commercial Sourcing
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 bg-[#0b1329] rounded-2xl p-5 sm:p-6 border border-slate-800/80 shadow-xl space-y-5">

            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3.5">
              <div className="flex items-center gap-2.5 font-bold text-white text-base">
                <ClipboardList
                  className="text-blue-400"
                  size={18}
                />
                <span>
                  Buyer Requirement Details
                </span>
              </div>

              <span className="text-[11px] text-slate-400 bg-slate-800/50 border border-slate-700/50 px-2.5 py-0.5 rounded-md">
                Category: Corporate Furniture
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

              <div className="bg-[#111c38] p-3 rounded-xl border border-slate-800/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  PRODUCT / SERVICE
                </p>

                <p className="font-bold text-slate-100 text-xs sm:text-sm mt-1">
                  {rfq.productService}
                </p>
              </div>

              <div className="bg-[#111c38] p-3 rounded-xl border border-slate-800/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  TOTAL QUANTITY
                </p>

                <p className="font-bold text-blue-400 text-xs sm:text-sm mt-1">
                  {rfq.quantity} {rfq.unit}
                </p>
              </div>

              <div className="bg-[#111c38] p-3 rounded-xl border border-slate-800/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  DELIVERY LOCATION
                </p>

                <p className="font-bold text-slate-100 text-xs sm:text-sm mt-1 flex items-center gap-1">
                  <MapPin
                    size={12}
                    className="text-blue-400 shrink-0"
                  />

                  <span className="truncate">
                    {rfq.deliveryLocation}
                  </span>
                </p>
              </div>

              <div className="bg-[#111c38] p-3 rounded-xl border border-slate-800/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  DEADLINE FOR QUOTES
                </p>

                <p className="font-bold text-red-400 text-xs sm:text-sm mt-1">
                  {formatDate(rfq.deadline)}
                </p>
              </div>

              <div className="bg-[#111c38] p-3 rounded-xl border border-slate-800/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  POSTED ON
                </p>

                <p className="font-bold text-slate-200 text-xs sm:text-sm mt-1">
                  {formatDate(rfq.createdAt)}
                </p>
              </div>

              <div className="bg-[#111c38] p-3 rounded-xl border border-slate-800/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  TARGET FULFILLMENT
                </p>

                <p className="font-bold text-slate-200 text-xs sm:text-sm mt-1">
                  Immediate / Q3 Batch
                </p>
              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                REQUIREMENT DESCRIPTION &
                SPECIFICATIONS
              </p>

              <div className="bg-[#111c38]/70 border border-slate-800 p-4 rounded-xl text-xs text-slate-300 leading-relaxed">
                {rfq.description}
              </div>
            </div>

            {rfq.images &&
              rfq.images.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    REFERENCE IMAGES
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {rfq.images.map(
                      (image, index) => {
                        const imageUrl =
                          getImageUrl(image);

                        return (
                          <a
                            key={index}
                            href={imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <img
                              src={imageUrl}
                              alt={`RFQ reference ${
                                index + 1
                              }`}
                              className="w-24 h-24 object-cover rounded-xl border border-slate-700 bg-slate-900"
                              onLoad={() => {
                                console.log(
                                  "IMAGE LOADED:",
                                  imageUrl
                                );
                              }}
                              onError={() => {
                                console.error(
                                  "IMAGE FAILED:",
                                  imageUrl
                                );
                              }}
                            />
                          </a>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

            {/* FOOTER METRICS */}
            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-800/80 gap-3">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <CheckCircle2 size={13} />
                  100% Verified Specifications
                </span>

                <span className="flex items-center gap-1.5 text-slate-300">
                  <Truck
                    size={13}
                    className="text-blue-400"
                  />
                  Freight Included preferred
                </span>
              </div>

              <span className="font-mono text-slate-500">
                Procurement Code: LKO-CORP-9901
              </span>
            </div>

          </div>

          <div className="bg-[#0b1329] rounded-2xl p-6 border border-slate-800/80 shadow-xl flex flex-col justify-between space-y-4">

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-white text-sm">
                  RFQ Marketplace Vitality
                </h3>

                <TrendingUp
                  size={16}
                  className="text-blue-400"
                />
              </div>

              <div className="flex items-center justify-between my-5">
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">
                    {quotes.length}

                    <span className="text-sm font-normal text-slate-400 ml-1.5">
                      Quotes
                    </span>
                  </div>

                  <p className="text-xs text-emerald-400 font-medium mt-1">
                    {quotes.length > 0
                      ? "100% compliant with spec"
                      : "Waiting for supplier quotes"}
                  </p>
                </div>

                <div className="relative w-14 h-14 flex items-center justify-center rounded-full border-4 border-blue-500 border-t-slate-700 bg-blue-950/30">
                  <span className="text-xs font-bold text-white">
                    {quotes.length > 0
                      ? "75%"
                      : "0%"}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs border-t border-slate-800/80 pt-4">

                <div className="flex justify-between items-center gap-3">
                  <span className="text-slate-400">
                    Lowest Bid Received
                  </span>

                  <span className="font-bold text-emerald-400 text-right">
                    {lowestQuote
                      ? `${formatPrice(
                          lowestQuote.price
                        )} (${
                          lowestQuote.supplier?.name ||
                          "XYZ Office"
                        })`
                      : "No bids"}
                  </span>
                </div>

                <div className="flex justify-between items-center gap-3">
                  <span className="text-slate-400">
                    Fastest Delivery
                  </span>

                  <span className="font-bold text-blue-400 text-right">
                    {fastestQuote
                      ? `${fastestQuote.deliveryTime} (Modern Workspace)`
                      : "No bids"}
                  </span>
                </div>

                <div className="flex justify-between items-center gap-3">
                  <span className="text-slate-400">
                    Target Budget Estimate
                  </span>

                  <span className="font-bold text-slate-200">
                    ₹2,60,000 Max
                  </span>
                </div>

              </div>
            </div>

            <div className="bg-[#111c38] rounded-xl p-3 flex items-start gap-2 text-xs text-slate-300 border border-slate-800">
              <ShieldCheck
                size={16}
                className="text-emerald-400 shrink-0 mt-0.5"
              />

              <span>
                All {quotes.length || 3} bidders
                hold verified GSTIN & MSME
                credentials
              </span>
            </div>

          </div>

        </div>

        <div className="space-y-4 pt-2">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold text-white">
                  Quotations Received ({quotes.length})
                </h2>

                {quotes.length > 0 && (
                  <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    LIVE BIDS
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-400 mt-0.5">
                Compare all quotation proposals submitted
                by verified suppliers for this RFQ.
              </p>
            </div>

            <button
              type="button"
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50 self-start sm:self-auto"
            >
              <Sparkles
                size={12}
                className="text-blue-400"
              />
              Preview "Empty Quotations" State
            </button>
          </div>

          {quotes.length === 0 && (
            <div className="bg-[#0b1329] rounded-2xl border border-slate-800 shadow-xl p-12 text-center">
              <MessageSquare
                size={36}
                className="mx-auto text-slate-600"
              />

              <h3 className="mt-4 font-bold text-slate-200">
                No quotations yet
              </h3>

              <p className="text-xs text-slate-400 mt-1">
                Suppliers have not submitted quotations
                for this RFQ yet.
              </p>
            </div>
          )}

          {quotes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {quotes.map((q, index) => {
                const isLowest =
                  lowestQuote?._id === q._id;

                const isFastest =
                  fastestQuote?._id === q._id;

                // eslint-disable-next-line no-useless-assignment
                let badge = "";

                // eslint-disable-next-line no-useless-assignment
                let badgeStyle =
                  "bg-blue-500/10 text-blue-400 border-blue-500/20";

                if (isLowest) {
                  badge = "Lowest Price";

                  badgeStyle =
                    "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
                } else if (isFastest) {
                  badge = "Best Delivery Speed";

                  badgeStyle =
                    "bg-blue-500/10 text-blue-400 border-blue-500/20";
                } else {
                  badge = "Includes Installation";

                  badgeStyle =
                    "bg-blue-500/10 text-blue-400 border-blue-500/20";
                }

                return (
                  <div
                    key={q._id}
                    className={`bg-[#0b1329] rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xl ${
                      isLowest
                        ? "border-emerald-500/80 ring-1 ring-emerald-500/50"
                        : "border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div>

                      <div className="p-5 pb-3">

                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${badgeStyle}`}
                          >
                            {isLowest && (
                              <Tag size={11} />
                            )}

                            {isFastest &&
                              !isLowest && (
                                <Zap size={11} />
                              )}

                            {!isLowest &&
                              !isFastest && (
                                <Wrench size={11} />
                              )}

                            {badge}
                          </span>

                          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                            Quote #{index + 1}
                          </span>
                        </div>

                        <h3 className="font-bold text-white text-lg leading-tight flex items-center gap-2">
                          {q.supplier?.name ||
                            "Unknown Supplier"}
                        </h3>

                        <div className="flex items-center gap-2 mt-1.5 text-xs">
                          <span className="text-amber-400 font-bold flex items-center gap-0.5">
                            ★ 4.8
                          </span>

                          <span className="text-slate-500">
                            •
                          </span>

                          <span className="text-blue-400 font-medium flex items-center gap-1">
                            <ShieldCheck size={12} />
                            Verified Supplier
                          </span>
                        </div>

                      </div>

                      {/* PRICE BOX */}
                      <div
                        className={`mx-5 p-4 rounded-xl ${
                          isLowest
                            ? "bg-[#091f1c] border border-emerald-800/60"
                            : "bg-[#111c38] border border-slate-800/60"
                        }`}
                      >
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {isLowest
                            ? "LOWEST QUOTED TOTAL"
                            : "TOTAL QUOTED PRICE"}
                        </p>

                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span
                            className={`text-2xl sm:text-3xl font-black ${
                              isLowest
                                ? "text-emerald-400"
                                : "text-white"
                            }`}
                          >
                            {formatPrice(q.price)}
                          </span>

                          <span className="text-[10px] text-slate-400 font-normal">
                            (GST Inc.)
                          </span>
                        </div>

                        <div className="text-xs mt-1 text-slate-400">
                          Unit Rate:{" "}
                          {formatPrice(
                            Math.round(
                              q.price / rfq.quantity
                            )
                          )}{" "}
                          /{" "}
                          {rfq.unit
                            .toLowerCase()
                            .slice(0, -1) ||
                            "unit"}

                          {isLowest && (
                            <span className="text-emerald-400 font-medium ml-1">
                              (Save ₹15,000+)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* DELIVERY + MESSAGE */}
                      <div className="p-5 space-y-3">

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-[#111c38] p-2.5 rounded-lg border border-slate-800/60">
                            <span className="text-slate-400 text-[10px] block uppercase font-bold">
                              Delivery Timeline
                            </span>

                            <span className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                              <Clock
                                size={12}
                                className="text-blue-400"
                              />

                              {q.deliveryTime}
                            </span>
                          </div>

                          <div className="bg-[#111c38] p-2.5 rounded-lg border border-slate-800/60">
                            <span className="text-slate-400 text-[10px] block uppercase font-bold">
                              {isLowest
                                ? "Bulk Discount"
                                : "Freight Terms"}
                            </span>

                            <span className="font-semibold text-emerald-400 mt-0.5 block">
                              {isLowest
                                ? "Applied"
                                : "Free Delivery"}
                            </span>
                          </div>
                        </div>

                        {/* SUPPLIER MESSAGE */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            <span className="flex items-center gap-1">
                              <MessageSquare size={11} />
                              SUPPLIER PROPOSAL NOTE
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 bg-[#111c38]/60 p-3 rounded-xl border border-slate-800 italic leading-relaxed">
                            "
                            {q.message ||
                              "We can provide all items within schedule."}
                            "
                          </p>
                        </div>

                        {/* SUBMITTED DATE */}
                        <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1">
                          <span>
                            Submitted:{" "}
                            {formatDate(
                              q.createdAt
                            )}
                          </span>

                          <span>
                            Valid: 30 Days
                          </span>
                        </div>

                      </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="p-5 pt-0 space-y-2">
                      <button
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/20 transition-all"
                      >
                        <Check size={14} />
                        Accept Quotation
                      </button>

                      <button
                        className="w-full py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-slate-700/60 transition-colors"
                      >
                        <MessageSquare size={14} />
                        Contact Supplier
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default BuyerRFQDetails;