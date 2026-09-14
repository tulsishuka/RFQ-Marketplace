import {
  Wrench,
  Cpu,
  Box,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const ProcurementPage = () => {
  const sectors = [
    {
      title: "Industrial CNC & Sheet Metal",
      description: "Milling, 5-axis turning, stampings, laser sheet profiles.",
      count: "410 Active Lots",
      icon: Wrench,
    },
    {
      title: "Electronics & PCBA",
      description: "SMT assembly, embedded controllers, wiring harnesses.",
      count: "295 Active Lots",
      icon: Cpu,
    },
    {
      title: "Injection Molding & Tooling",
      description: "High volume thermoplastics, silicone compression molds.",
      count: "182 Active Lots",
      icon: Box,
    },
  ];

  const headingText = "Ready to Standardize Your Procurement Operations?";
  const descriptionText =
    "Join over 1,200 purchasing teams saving an average of 19% on bill-of-materials expenditures with audited compliance.";

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 12,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="min-h-screen w-full bg-[#030712] font-sans text-white">
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-500">
              PROCUREMENT VERTICALS
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              High-Demand Sourcing Sectors
            </h2>
          </div>
          <a
            href="#categories"
            className="hidden items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300 sm:flex"
          >
            <span>Browse all 38 categories</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between rounded-xl border border-blue-400/80 bg-black p-5 transition-all duration-200 hover:border-slate-700 hover:bg-[#0F1524]"
              >
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-[#131B2E] text-slate-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    {sector.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    {sector.description}
                  </p>
                </div>
                <div className="mt-4 pt-2 text-xs font-semibold text-blue-400">
                  {sector.count}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 text-center sm:hidden">
          <a
            href="#categories"
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300"
          >
            <span>Browse all 38 categories</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-blue-400/80 bg-black  px-6 py-16 sm:px-12 lg:px-16">
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <motion.h2
              className="mx-auto max-w-2xl text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.4,
              }}
              transition={{
                staggerChildren: 0.09,
              }}
            >
              {headingText.split(" ").map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  variants={wordVariants}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className="mr-[0.3em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              className="mx-auto mt-4 max-w-xl text-xs leading-relaxed text-slate-400 sm:text-sm"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.4,
              }}
              transition={{
                staggerChildren: 0.035,
                delayChildren: 0.3,
              }}
            >
              {descriptionText.split(" ").map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  variants={wordVariants}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className="mr-[0.25em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <motion.button
                type="button"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: false,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="w-full rounded-xl bg-[#2563EB] px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-600 sm:w-auto"
              >
                Publish Your First RFQ Free
              </motion.button>

              <motion.button
                type="button"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: false,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.22,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="w-full rounded-xl border border-slate-800 bg-[#060913] px-6 py-3 text-xs font-semibold text-slate-200 transition-all duration-200 hover:border-slate-700 hover:bg-slate-900 sm:w-auto"
              >
                Register as a Supplier
              </motion.button>
            </div>

            <p className="mt-6 text-[11px] text-slate-500">
              No credit card required for standard buyer accounts • Zero commission on pilot batches
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProcurementPage;