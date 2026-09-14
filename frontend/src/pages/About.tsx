


import {
  Layers,
  CheckCircle2,
  BarChart2,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const features = [
    {
      id: "01",
      title: "Structured RFQ Builder",
      description:
        "Turn loose bills of materials into machine-parseable criteria with mandatory tolerance and compliance standards.",
      icon: Layers,
      iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    {
      id: "02",
      title: "Pre-Screened Suppliers",
      description:
        "Every manufacturing partner holds verified certificates (ISO 9001, AS9100, IATF 16949) before placing a bid.",
      icon: CheckCircle2,
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    {
      id: "03",
      title: "Unit Cost Normalization",
      description:
        "Compare apples-to-apples across tooling costs, lead times, tariffs, and batch tier pricing instantly.",
      icon: BarChart2,
      iconBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    },
    {
      id: "04",
      title: "Cryptographic Audit Trail",
      description:
        "Immutable change history logged on every tender submission, revision, and approval sign-off.",
      icon: Lock,
      iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    },
  ];

  const headingText = "Everything needed to tender, award, and verify procurement.";

  const paragraphText =
    "Eliminate scattered email threads, vague specs, and unvetted suppliers with standard digitized procurement.";


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
    <section className="w-full bg-[#060A17] text-white">
      <div className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto w-full max-w-7xl space-y-12 sm:space-y-16">
          <div className="mx-auto max-w-4xl space-y-4 text-center">

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 sm:text-xs">
              DESIGNED FOR ENTERPRISE RIGOR
            </span>
            <motion.h2
              className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
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
            <motion.p
              className="mx-auto max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-relaxed"
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
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 ">
            {features.map((item, index) => {
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
                  className="flex flex-col justify-between rounded-2xl border border-blue-400/80 bg-black p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-[#0F1833] sm:p-7"
                >
                  <div className="space-y-5">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border ${item.iconBg}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold leading-snug text-white sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">
                      {item.description}
                    </p>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;