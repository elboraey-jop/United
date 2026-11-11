"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "@phosphor-icons/react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } } };

const up = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const pop = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <>
      <section id="top" className="relative overflow-hidden bg-wine-deep text-cream">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative mx-auto grid min-h-[100svh] max-w-6xl grid-rows-[auto_1fr] gap-4 px-4 pb-4 pt-16 sm:px-5 sm:gap-6 sm:pb-8 sm:pt-24 md:grid-cols-[1.05fr_0.95fr] md:grid-rows-1 md:items-center md:gap-8 md:pb-14 md:pt-28"
        >
          {/* النص — جانب يمين */}
          <div>
            <motion.p
              variants={up}
              className="flex items-center justify-center gap-2.5 font-latin text-[10px] tracking-[0.3em] text-gold sm:justify-start sm:text-[11px] sm:tracking-[0.32em]"
            >
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
              CAFFEINE &amp; DESSERT HOUSE
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
            </motion.p>

            <motion.h1
              variants={up}
              className="mt-2.5 text-center font-display text-[2rem] font-bold leading-[1.45] text-gold-soft sm:mt-4 sm:text-start sm:text-5xl sm:leading-[1.35] md:text-[3.4rem] md:leading-[1.3]"
            >
              مكانك المفضل{" "}
              <span className="text-cream">للقهوة والحلويات</span>
            </motion.h1>

            <motion.p
              variants={up}
              className="mt-3 hidden max-w-md text-[15px] leading-7 text-cream/75 sm:block sm:mt-4 sm:leading-8"
            >
              في قلب سمنود من 2020 — بنقدملك القهوة المظبوطة وألذ الحلويات في جو رايق يليق بيكم وأصحابكم.
            </motion.p>

            <motion.div variants={up} className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:mt-6 sm:justify-start sm:gap-3">
              <a
                href="#menu"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-gold px-5 text-[13px] font-semibold text-wine-deep sm:h-12 sm:px-6 sm:text-[14px]"
              >
                تصفح المنيو
                <ArrowLeft size={15} />
              </a>
              <a
                href="#branches"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-gold/50 px-5 text-[13px] text-gold-soft transition-colors hover:bg-gold/10 sm:h-12 sm:px-6 sm:text-[14px]"
              >
                فروعنا
              </a>
            </motion.div>
          </div>

          {/* كومبوزيشن الصور — جانب شمال */}
          <motion.div
            variants={pop}
            className="relative mx-auto flex min-h-52 w-full max-w-64 justify-center sm:max-w-72 md:h-auto md:max-w-md md:justify-start"
          >
            <div className="relative h-full w-full md:h-auto md:aspect-[4/5]">
              <span aria-hidden className="absolute inset-0 translate-y-2 rounded-t-full border border-gold/30" />
              <div className="relative h-full overflow-hidden rounded-t-full ring-1 ring-gold/50">
                <img
                  src="/media/hero-night.jpg"
                  alt="فرع يونايتد ليلاً"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between rounded-full bg-wine-deep/70 px-3 py-1.5 text-[10px] backdrop-blur sm:inset-x-4 sm:bottom-4 sm:px-4 sm:py-2.5 sm:text-[12px]">
                  فرع ش البحر
                  <span className="font-latin tracking-[0.2em] text-gold-soft/90">AT NIGHT</span>
                </span>
              </div>

              {/* طبقية صغيرة حابية أسفل */}
              <motion.div
                variants={pop}
                className="absolute -bottom-1 -left-2 w-20 -rotate-3 rounded-xl bg-paper p-1.5 pb-4 shadow-[0_16px_32px_rgba(0,0,0,0.35)] sm:-left-5 sm:w-28 sm:rounded-2xl sm:p-2 sm:pb-5 md:-left-7 md:w-32"
              >
                <img src="/media/cup.jpg" alt="قهوة يونايتد" className="aspect-square w-full rounded-lg object-cover sm:rounded-xl" />
                <span className="absolute inset-x-0 bottom-1 text-center text-[8px] text-ink-soft sm:bottom-1.5 sm:text-[10px]">
                  قهوتنا المظبوطة
                </span>
              </motion.div>

              {/* دايرة صغيرة فوق يمين */}
              <motion.div
                variants={up}
                className="absolute -top-3 -right-2 h-14 w-14 rotate-6 overflow-hidden rounded-full ring-2 ring-gold/60 sm:-top-4 sm:-right-3 sm:h-20 sm:w-20 md:-top-5 md:-right-5 md:h-[4.5rem] md:w-[4.5rem]"
              >
                <img src="/media/donut.jpg" alt="دوناتس يونايتد" className="h-full w-full object-cover" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <span aria-hidden className="gold-hairline block" />
      </section>

      <section id="house" className="scroll-mt-[calc(4rem+env(safe-area-inset-top,0px))] bg-cream px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-latin text-[11px] tracking-[0.28em] text-wine">ABOUT UNITED</p>
          <h2 className="mt-2 text-4xl font-bold leading-tight text-wine-deep sm:text-5xl">
            حكايتنا في يونايتد
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-8 text-ink-soft">
            من 2020 وهدفنا بسيط: نقدم أفضل تجربة قهوة وحلويات بأجواء رايقة وجودة تفضل فاكرها دايماً.
          </p>
          <div className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 hide-scroll">
            {seals.map((seal) => (
              <article
                key={seal.title}
                className="w-[78%] shrink-0 snap-start overflow-hidden rounded-2xl bg-paper ring-1 ring-gold/40 sm:w-[calc(33.33%-0.75rem)]"
              >
                <img src={seal.src} alt={seal.title} className="aspect-[4/5] w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-wine">{seal.title}</h3>
                  <p className="mt-1 text-[14px] leading-7 text-ink-soft">{seal.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const seals = [
  {
    src: "/media/cup.jpg",
    title: "قهوة بمزاج",
    text: "كل مشروب بيتحضر بعناية وبأعلى جودة عشان يظبط يومك.",
  },
  {
    src: "/media/flag.jpg",
    title: "جودة ثابتة",
    text: "نفس الطعم والمستوى اللي اتعودت عليه من أول يوم.",
  },
  {
    src: "/media/atmosphere-seal.jpg",
    title: "أجواء مميزة",
    text: "مكان مريح ورايق يجمعك بأصحابك وحبايبك في أي وقت.",
  },
];
