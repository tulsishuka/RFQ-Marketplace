
import {
  Rocket,
  ArrowRight,
  CheckCircle2,
  Lock,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const Third = () => {
  const headingText = "Ready to simplify your sourcing process?";

  const descriptionText =
    "Post your next requirement in minutes or browse active B2B opportunities seeking qualified vendors right now.";

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
    <section className="relative w-full overflow-hidden bg-[#0F172A] px-4 py-20 text-white sm:px-6 lg:px-8">

      {/* ================= BACKGROUND GRID ================= */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]
          bg-[size:4rem_4rem]
          opacity-20
          [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]
        "
      />

      {/* ================= CORNER CROSS LINES ================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div
          className="
            absolute left-1/2 top-1/2
            h-[2px] w-[160%]
            -translate-x-1/2 -translate-y-1/2
            rotate-[25deg]
            bg-gradient-to-r
            from-transparent
            via-slate-600/50
            to-transparent
          "
        />

        <div
          className="
            absolute left-1/2 top-1/2
            h-[2px] w-[160%]
            -translate-x-1/2 -translate-y-1/2
            -rotate-[25deg]
            bg-gradient-to-r
            from-transparent
            via-slate-600/50
            to-transparent
          "
        />

      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 mx-auto max-w-4xl space-y-8 text-center">

        {/* ================= BADGE ================= */}
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.55,
            ease: "easeOut",
          }}
          className="
            inline-flex items-center gap-2
            rounded-full
            border border-slate-700/60
            bg-[#1E293B]
            px-4 py-1.5
            text-[11px] font-semibold uppercase tracking-wider
            text-slate-300
            shadow-sm
            sm:text-xs
          "
        >
          <Rocket className="h-3.5 w-3.5 text-blue-400" />

          <span>ACCELERATE PROCUREMENT TODAY</span>
        </motion.div>

        {/* ================= HEADING ================= */}
        <motion.h2
          className="
            mx-auto max-w-6xl
            text-3xl font-bold
            leading-[1.15]
            tracking-tight
            text-white
            sm:text-5xl
            lg:text-6xl
          "
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

        {/* ================= DESCRIPTION ================= */}
        <motion.p
          className="
            mx-auto max-w-2xl
            text-sm font-normal
            leading-relaxed
            text-slate-400
            sm:text-base
            lg:text-lg
          "
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

        {/* ================= ACTION BUTTONS ================= */}
        <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">

          {/* Primary Button */}
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
            className="
              flex w-full items-center justify-center gap-2
              rounded-xl
              bg-[#1E5BFF]
              px-6 py-3.5
              text-sm font-semibold
              text-white
              shadow-lg shadow-blue-600/25
              transition-all duration-200
              hover:bg-blue-600
              sm:w-auto
            "
          >
            <span>Create an RFQ Now</span>

            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          </motion.button>

          {/* Secondary Button */}
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
            className="
              w-full
              rounded-xl
              border border-slate-700
              bg-transparent
              px-6 py-3.5
              text-sm font-semibold
              text-white
              transition-all duration-200
              hover:border-slate-500
              hover:bg-slate-800/30
              sm:w-auto
            "
          >
            Browse Active Demands
          </motion.button>

        </div>

        {/* ================= TRUST FEATURES ================= */}
        <div
          className="
            flex flex-wrap
            items-center justify-center
            gap-5
            border-t border-slate-800/80
            pt-8
            text-xs font-medium
            text-slate-400
            sm:gap-8
            sm:text-sm
          "
        >

          {/* Verified */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
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
              duration: 0.45,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />

            <span>100% Verified GST Entities</span>
          </motion.div>

          {/* Encrypted */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
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
              duration: 0.45,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="flex items-center gap-2"
          >
            <Lock className="h-4 w-4 shrink-0 text-emerald-400" />

            <span>Encrypted Commercial Bids</span>
          </motion.div>

          {/* Free */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
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
              duration: 0.45,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="flex items-center gap-2"
          >
            <Zap className="h-4 w-4 shrink-0 text-emerald-400" />

            <span>Free Standard RFQ Posting</span>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Third;