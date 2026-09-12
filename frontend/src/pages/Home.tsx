import {
  ArrowRight,
  ShieldCheck,
  FileText,
  LayoutGrid,
  Users,
  FileCheck,
  ArrowDown,
} from "lucide-react";
import { motion } from "framer-motion";

const workflowSteps = [
  {
    icon: FileText,
    title: "Requirement",
    description: "BOM & Spec Sheet uploaded",
    badge: "v1.4 Spec",
  },
  {
    icon: LayoutGrid,
    title: "RFQ Published",
    description: "RFQ-2026-8942 • 4 Line Items",
    badge: "Open Lot",
    blueBadge: true,
  },
  {
    icon: Users,
    title: "Verified Suppliers",
    description: "Direct match to ISO certs",
    badge: "8 Matched",
  },
];

const Home = () => {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#F7FDF9]">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-9xl items-center px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:gap-20">

          {/* ================= LEFT CONTENT ================= */}
          <motion.section
            className="max-w-2xl text-center sm:text-left"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          >
            {/* Label */}
            <div className="mb-5 inline-flex items-center justify-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-blue-600 sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              About RFQ Marketplace
            </div>

            {/* Heading */}
            <h1 className="text-[38px] font-bold leading-[1.01] tracking-[-0.03em] text-[#0B1527] sm:text-[46px] md:text-[50px] lg:text-[52px] xl:text-[54px]">
              <span className="block">Making Business Sourcing</span>
              <span className="block">Simple and Structured.</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-[610px] text-sm leading-6 text-slate-500 sm:mx-0 sm:text-base sm:leading-7">
              RFQ Marketplace gives buyers and suppliers a clear, disciplined
              space to manage business specifications, competitive tenders,
              and high-value quotations without the operational drag.
            </p>

            {/* CTA */}
            <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
              <button
                type="button"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-[#1E5BFF] px-5 py-3 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
              >
                Join the Network
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 sm:justify-start sm:text-sm">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 sm:h-5 sm:w-5" />
                <span>ISO-compliant audit trails</span>
              </div>
            </div>
          </motion.section>

          {/* ================= RIGHT WORKFLOW ================= */}
          <motion.section
            className="w-full"
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          >
            {/* Floating Workflow Card */}
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                mx-auto
                w-full
                max-w-[500px]
                rounded-3xl
                border
                border-slate-200/70
                bg-white
                p-5
                shadow-[0_20px_60px_-20px_rgba(15,23,42,0.20),0_8px_25px_-12px_rgba(15,23,42,0.10)]
                sm:p-6
                lg:ml-auto
              "
            >
              {/* Header */}
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 sm:text-[11px]">
                  Workflow Progression
                </span>

                <div className="flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[9px] font-semibold text-blue-600 sm:text-[10px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  Active Pipeline
                </div>
              </div>

              {/* Steps */}
              <div className="flex flex-col">
                {workflowSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div key={step.title}>
                      {/* Step */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{
                          once: false,
                          amount: 0.2,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.12,
                          ease: "easeOut",
                        }}
                        className="
                          flex
                          min-h-[72px]
                          items-center
                          justify-between
                          gap-3
                          rounded-xl
                          border
                          border-slate-200/60
                          bg-white
                          px-3.5
                          py-3
                          shadow-[0_3px_12px_-8px_rgba(15,23,42,0.18)]
                          transition-all
                          duration-200
                          hover:border-slate-200
                          hover:shadow-[0_6px_18px_-10px_rgba(15,23,42,0.20)]
                          sm:min-h-[76px]
                          sm:px-4
                        "
                      >
                        {/* Step Content */}
                        <div className="flex min-w-0 items-center gap-3">
                          {/* Icon */}
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 sm:h-10 sm:w-10">
                            <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                          </div>

                          {/* Text */}
                          <div className="min-w-0">
                            <h4 className="text-[11px] font-bold text-slate-900 sm:text-xs">
                              {step.title}
                            </h4>

                            <p className="mt-1 truncate text-[9px] font-medium text-slate-400 sm:text-[10px]">
                              {step.description}
                            </p>
                          </div>
                        </div>

                        {/* Badge */}
                        <span
                          className={`shrink-0 rounded-md px-2 py-1.5 text-[8px] font-medium sm:text-[9px] ${
                            step.blueBadge
                              ? "border border-blue-100 bg-blue-50 text-blue-600"
                              : "border border-slate-100 bg-slate-50 text-slate-400"
                          }`}
                        >
                          {step.badge}
                        </span>
                      </motion.div>

                      {/* Arrow */}
                      {index < workflowSteps.length - 1 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.7 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{
                            once: false,
                            amount: 0.2,
                          }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.12 + 0.15,
                            ease: "easeOut",
                          }}
                          className="flex h-6 items-center justify-center"
                        >
                          <ArrowDown className="h-3.5 w-3.5 text-blue-400" />
                        </motion.div>
                      )}
                    </div>
                  );
                })}

                {/* ================= ACTIVE STEP ================= */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: false,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4,
                    ease: "easeOut",
                  }}
                  className="
                    flex
                    min-h-[72px]
                    items-center
                    justify-between
                    gap-3
                    rounded-xl
                    border
                    border-blue-100
                    bg-[#F5F8FF]
                    px-3.5
                    py-3
                    shadow-[0_5px_18px_-10px_rgba(30,91,255,0.25)]
                    sm:min-h-[76px]
                    sm:px-4
                  "
                >
                  {/* Content */}
                  <div className="flex min-w-0 items-center gap-3">
                    {/* Icon */}
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-[#1E5BFF]
                        text-white
                        shadow-[0_5px_12px_-4px_rgba(30,91,255,0.45)]
                        sm:h-10
                        sm:w-10
                      "
                    >
                      <FileCheck className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                    </motion.div>

                    {/* Text */}
                    <div className="min-w-0">
                      <h4 className="text-[11px] font-bold text-slate-900 sm:text-xs">
                        Standardized Quotes
                      </h4>

                      <p className="mt-1 truncate text-[9px] font-medium text-slate-500 sm:text-[10px]">
                        Structured unit pricing & leads
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <span
                    className="
                      shrink-0
                      rounded-md
                      border
                      border-emerald-100
                      bg-emerald-50
                      px-2
                      py-1.5
                      text-[8px]
                      font-bold
                      text-emerald-700
                      sm:text-[9px]
                    "
                  >
                    Ready for Review
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </main>
  );
};

export default Home;