
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

const stats = [
  { label: "Active Global Enterprises", value: "1,200+" },
  { label: "Fulfillment Accuracy", value: "99.4%" },
  { label: "Average Turnaround", value: "< 48 hrs" },
];

const Home = () => {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#070C1E] text-white">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl items-center px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:gap-20">

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
            <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-blue-400 sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              About RFQ Marketplace
            </div>

            {/* Heading */}
            <h1 className="text-[38px] font-bold leading-[1.08] tracking-[-0.02em] text-white sm:text-[46px] md:text-[50px] lg:text-[52px] xl:text-[56px]">
              <span className="block">Making Business Sourcing</span>
              <span className="block text-white">Simple and Structured.</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-[610px] text-sm leading-relaxed text-slate-400 sm:mx-0 sm:text-base">
              RFQ Marketplace gives buyers and suppliers a clear, disciplined
              space to manage business specifications, competitive tenders,
              and high-value quotations without the operational drag.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
              <button
                type="button"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-200 hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]"
              >
                Join the Network
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center justify-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2 text-xs font-medium text-emerald-400 sm:justify-start">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>ISO-compliant audit trails</span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:justify-start lg:gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-blue-500">◆</span>
                  <span>
                    <strong className="font-bold text-white">{stat.value}</strong> {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>

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
                rounded-[28px]
                border
                border-slate-800
                bg-[#0B1226]/90
                p-6
                shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]
                backdrop-blur-xl
                lg:ml-auto
              "
            >
              {/* Header */}
              <div className="mb-6 flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 sm:text-[11px]">
                  Workflow Progression
                </span>

                <div className="flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[9px] font-semibold text-blue-400 sm:text-[10px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
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
                          border-blue-400/80
                          bg-[#000000]/60
                          px-4
                          py-3.5
                          transition-all
                          duration-200
                          hover:border-slate-700
                          hover:bg-[#0F1833]
                          sm:min-h-[76px]
                        "
                      >
                        <div className="flex min-w-0 items-center gap-3.5">
                          {/* Icon */}
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-400">
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-white sm:text-sm">
                              {step.title}
                            </h4>

                            <p className="mt-0.5 truncate text-[10px] font-medium text-slate-400 sm:text-xs">
                              {step.description}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`shrink-0 rounded-md px-2.5 py-1 text-[9px] font-medium sm:text-[10px] ${
                            step.blueBadge
                              ? "border border-blue-500/30 bg-blue-500/20 text-blue-300"
                              : "border border-slate-700 bg-slate-800/60 text-slate-300"
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
                          <ArrowDown className="h-3.5 w-3.5 text-slate-600" />
                        </motion.div>
                      )}
                    </div>
                  );
                })}

                <div className="flex h-6 items-center justify-center">
                  <ArrowDown className="h-3.5 w-3.5 text-slate-600" />
                </div>

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
                    border-blue-500/50
                    bg-[#112248]/80
                    px-4
                    py-3.5
                    shadow-[0_0_20px_rgba(37,99,235,0.15)]
                    sm:min-h-[76px]
                  "
                >
                  <div className="flex min-w-0 items-center gap-3.5">
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
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-blue-600
                        text-white
                        shadow-[0_0_15px_rgba(37,99,235,0.5)]
                      "
                    >
                      <FileCheck className="h-5 w-5" />
                    </motion.div>

                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white sm:text-sm">
                        Standardized Quotes
                      </h4>

                      <p className="mt-0.5 truncate text-[10px] font-medium text-slate-300 sm:text-xs">
                        Structured unit pricing & leads
                      </p>
                    </div>
                  </div>

                  <span
                    className="
                      shrink-0
                      rounded-md
                      border
                      border-emerald-500/30
                      bg-emerald-500/10
                      px-2.5
                      py-1
                      text-[9px]
                      font-bold
                      text-emerald-400
                      sm:text-[10px]
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