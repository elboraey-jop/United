"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.83, 0, 0.17, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const logoVar = {
  hidden: { opacity: 0, scale: 0.86, y: 18 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" as const } },
};

const up = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const draw = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: "easeOut" as const } },
};

export function SplashScreen() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(false), 2400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.button
          type="button"
          aria-label="دخول الموقع"
          onClick={() => setOpen(false)}
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.9, ease: EASE } }}
          className="fixed inset-0 z-[80] text-gold-soft"
        >
          <span className="absolute inset-0 bg-wine-deep" aria-hidden />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative flex h-full w-full flex-col items-center justify-center px-6 text-center"
          >
            <motion.div variants={logoVar} className="relative">
              <img
                src="/media/logo.jpg?v=2"
                alt="شعار يونايتد"
                className="h-36 w-36 rounded-2xl object-cover shadow-[0_24px_50px_rgba(0,0,0,0.4)] sm:h-44 sm:w-44"
              />
            </motion.div>

            <motion.div variants={draw} className="gold-hairline mt-6 w-40" aria-hidden />

            <motion.h1
              variants={up}
              className="mt-4 font-display text-2xl leading-relaxed text-gold-soft sm:text-3xl"
            >
              مكانك المفضل للقهوة والحلويات
            </motion.h1>

            <motion.p variants={up} className="mt-3 font-latin text-[11px] tracking-[0.35em] text-gold-soft/80">
              SINCE 2020
            </motion.p>
          </motion.div>

          {/* خيط ذهبي يمسح الشاشة وقت الخروج */}
          <span
            aria-hidden
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
