import {
  MailX,
  FileSpreadsheet,
  PhoneCall,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const stats = [
    { value: "500+", label: "RFQS POSTED" },
    { value: "1,200+", label: "QUOTATIONS SUBMITTED" },
    { value: "300+", label: "ACTIVE BUSINESSES" },
    { value: "20+", label: "INDUSTRIAL CATEGORIES" },
  ];

  const painPoints = [
    {
      id: "01",
      category: "LOST INBOXES",
      title: "Chaotic Email Threads",
      description:
        "Requirements scatter across endless forwards, misplaced attachment revisions, and corrupted PDFs with missing specification appendices.",
      icon: MailX,
      iconBg: "bg-red-50 text-red-500",
    },
    {
      id: "02",
      category: "UNNORMALIZED BIDS",
      title: "Spreadsheet Gymnastics",
      description:
        "Procurement teams spend 15+ manual hours copy-pasting rates, converting tax inclusions, and fixing broken formulas across custom supplier sheets.",
      icon: FileSpreadsheet,
      iconBg: "bg-amber-50 text-amber-600",
    },
    {
      id: "03",
      category: "DEAD-END CHASING",
      title: "Constant Status Chasing",
      description:
        "Exhausting phone calls, unverified capability claims, and zero visibility into whether suppliers will honor stated delivery commitments.",
      icon: PhoneCall,
      iconBg: "bg-blue-50 text-blue-600",
    },
  ];

  const headingText = "Traditional Sourcing Gets Messy.";

  const paragraphText =
    "Off-platform quotation requests bleed corporate efficiency through fragmented communications and inaccessible rate records.";

  /* ================= WORD ANIMATION ================= */

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
    <section className="w-full bg-white">

      {/* ================= STATS ================= */}
      <div className="mx-auto w-full max-w-7xl border-b border-slate-100 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-4 md:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center"
            >
              <h3 className="text-2xl font-bold tracking-tight text-[#000000] sm:text-3xl lg:text-4xl">
                {stat.value}
              </h3>

              <p className="mt-1 max-w-[140px] text-[9px] font-bold uppercase tracking-[0.12em] text-[#5F5E5E] sm:max-w-none sm:text-[11px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MAIN SECTION ================= */}
      <div className="bg-[#f2f5ff] px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-7xl space-y-10 sm:space-y-12">

          {/* ================= HEADER ================= */}
          <div className="mx-auto max-w-3xl space-y-3 text-center">

            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-blue-600 sm:text-[11px] sm:tracking-widest">
              PAIN POINTS OF LEGACY PROCUREMENT
            </span>

            {/* ================= ANIMATED HEADING ================= */}
            <motion.h2
              className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.5,
              }}
              transition={{
                staggerChildren: 0.12,
              }}
            >
              {headingText.split(" ").map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  variants={wordVariants}
                  transition={{
                    duration: 0.45,
                    ease: "easeOut",
                  }}
                  className="mr-[0.3em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            {/* ================= ANIMATED PARAGRAPH ================= */}
            <motion.p
              className="mx-auto max-w-2xl text-sm leading-6 text-[#787777] sm:text-base sm:leading-relaxed"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.5,
              }}
              transition={{
                staggerChildren: 0.035,
                delayChildren: 0.35,
              }}
            >
              {paragraphText.split(" ").map((word, index) => (
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
          </div>

          {/* ================= PAIN POINT CARDS ================= */}
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3 lg:gap-8">
            {painPoints.map((item, index) => {
              const IconComponent = item.icon;

              return (
                <motion.div
                  key={item.id}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: false,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-7 lg:p-8"
                >
                  <div className="space-y-4">

                    {/* Icon */}
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.iconBg}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>

                    {/* Category */}
                    <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-[#5F5E5E] sm:text-[11px] sm:tracking-wider">
                      {item.id} / {item.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs leading-5 text-[#787777] sm:text-sm sm:leading-relaxed">
                      {item.description}
                    </p>

                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ================= PROCESS FLOW ================= */}
          <motion.div
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="flex justify-center pt-1 sm:pt-4"
          >
            <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-3 rounded-md border border-slate-200/80 bg-white px-4 py-4 shadow-sm sm:flex-row sm:flex-wrap sm:gap-4 sm:rounded-md sm:px-6 sm:py-3 lg:gap-6">

              {/* Problem */}
              <div className="flex items-center gap-2 text-xs font-medium text-rose-600 sm:text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>Messy manual sourcing</span>
              </div>

              {/* Arrow */}
              <ArrowRight className="hidden h-4 w-4 text-slate-400 sm:block" />

              {/* Mobile Arrow */}
              <ArrowRight className="h-4 w-4 rotate-90 text-slate-400 sm:hidden" />

              {/* Solution */}
              <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                <Sparkles className="h-3.5 w-3.5 shrink-0" />
                <span>RFQ Marketplace</span>
              </div>

              {/* Arrow */}
              <ArrowRight className="hidden h-4 w-4 text-slate-400 sm:block" />

              {/* Mobile Arrow */}
              <ArrowRight className="h-4 w-4 rotate-90 text-slate-400 sm:hidden" />

              {/* Success */}
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 sm:text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Clean, structured bids</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;