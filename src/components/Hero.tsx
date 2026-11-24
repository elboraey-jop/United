"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Coffee, MapPin, Clock } from "@phosphor-icons/react";

export function Hero() {
  return (
    <>
      {/* 
        قسم الهيرو — تصميم مفتوح وراقي بالرسم الخطي المعماري الحقيقي لكافيه يونايتد
      */}
      <section
        id="top"
        className="relative flex min-h-[92svh] flex-col items-center justify-start overflow-hidden bg-[#faf6ee] px-4 pt-28 pb-12 text-wine-deep select-none sm:px-6 sm:pt-32 sm:pb-14 lg:min-h-[88svh] lg:justify-center lg:pt-24 lg:pb-10"
      >
        {/* خلفية التوهج الدافئ الخفيف بنعومة الورق */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 35%, rgba(198, 161, 90, 0.16) 0%, transparent 65%)`,
          }}
        />

        {/* محتوى الهيرو المباشر: عمود واحد للموبايل، وتقسيم ثنائي متوازن للديسكتوب */}
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-4 sm:gap-6 lg:grid lg:max-w-6xl lg:grid-cols-12 lg:items-center lg:gap-x-10 lg:gap-y-5">
          
          {/* العناوين الرئيسية */}
          <div className="text-center lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:self-end lg:text-right">
            <h1 className="font-body text-4xl font-extrabold tracking-tight text-wine-deep sm:text-5xl lg:text-[3.4rem] xl:text-6xl">
              بيت القهوة
              <span className="mt-1.5 block font-display text-3xl font-bold text-wine sm:text-4xl lg:text-[2.6rem] xl:text-5xl">
                والحلويات الفاخرة
              </span>
            </h1>

            <p className="mt-2 font-display text-sm tracking-wider text-gold italic sm:text-base lg:text-lg">
              United Caffeine & Dessert House
            </p>

            <p className="mx-auto mt-3 max-w-md text-[12.5px] font-medium leading-relaxed tracking-wide text-wine/80 sm:text-[14px] lg:mx-0">
              وجهتكم الأولى لمذاق القهوة المختصة وألذ أطباق الحلويات والمخبوزات الطازجة في سمنود.
            </p>
          </div>

          {/* الرسمة الخطية المعمارية الحقيقية لكافيه يونايتد */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative my-2 flex w-full max-w-[400px] items-center justify-center sm:my-4 sm:max-w-[540px] lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:my-0 lg:max-w-none"
          >
            <img
              src="/media/united-custom-drawing.png?v=2"
              alt="رسمة خطية معمارية لمبنى كافيه يونايتد الحقيقي - بيت القهوة والحلويات"
              draggable={false}
              className="h-auto w-full object-contain filter drop-shadow-[0_6px_20px_rgba(58,13,20,0.06)] lg:max-h-[540px]"
            />
          </motion.div>

          {/* تفاصيل المواعيد والفروع وأزرار الأكشن */}
          <div className="flex w-full flex-col items-center lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:items-start lg:self-start">
            {/* بطاقتان أنيقتان للمعلومات: مواعيد العمل والفروع */}
            <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:gap-4 lg:max-w-none">
              <div className="flex flex-col items-center justify-center rounded-2xl border border-wine/15 bg-white/60 px-2.5 py-3 text-center shadow-xs transition-all hover:border-gold/50 sm:p-3.5">
                <span className="font-latin text-[9px] font-bold tracking-[0.18em] text-wine/60 uppercase sm:text-[10px]">
                  OPENING HOURS
                </span>
                <span className="mt-1 flex items-center gap-1 font-num text-xs font-bold text-wine-deep sm:text-sm">
                  <Clock size={14} className="shrink-0 text-gold" />
                  ٤ عصراً — ٢ فجراً
                </span>
                <span className="mt-0.5 text-[10.5px] font-semibold text-wine/80">
                  يومياً ما عدا الأحد إجازة
                </span>
              </div>

              <div className="flex flex-col items-center justify-center rounded-2xl border border-wine/15 bg-white/60 px-2.5 py-3 text-center shadow-xs transition-all hover:border-gold/50 sm:p-3.5">
                <span className="font-latin text-[9px] font-bold tracking-[0.18em] text-wine/60 uppercase sm:text-[10px]">
                  TWO HOUSES
                </span>
                <span className="mt-1 flex items-center gap-1 text-xs font-bold text-wine-deep sm:text-sm">
                  <MapPin size={14} className="shrink-0 text-gold" />
                  ش البحر • ترعة الساحل
                </span>
                <span className="mt-0.5 text-[10.5px] font-medium text-wine/70">
                  سمنود — الغربية
                </span>
              </div>
            </div>

            {/* أزرار الدعوة للعمل (Call to Action Buttons) */}
            <div className="mt-5 grid w-full max-w-md grid-cols-2 gap-2.5 sm:mt-6 sm:flex sm:w-auto sm:max-w-none sm:items-center sm:justify-center sm:gap-3 lg:justify-start">
              <a
                href="#menu"
                className="inline-flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-wine-deep px-3 text-[12px] font-bold text-gold-soft shadow-md transition-all hover:bg-wine hover:shadow-lg active:scale-95 sm:gap-2 sm:px-7 sm:text-[13.5px]"
              >
                تصفح المنيو الكامل
                <ArrowLeft size={15} className="shrink-0 sm:h-4 sm:w-4" />
              </a>

              <a
                href="#wall"
                className="inline-flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-wine/25 bg-white/60 px-3 text-[12px] font-semibold text-wine transition-all hover:border-wine hover:bg-white active:scale-95 sm:gap-2 sm:px-6 sm:text-[13px]"
              >
                <Coffee size={15} className="shrink-0" />
                أجواء المكان
              </a>
            </div>

            {/* تذييل البوستر الأنيق */}
            <div className="mt-5 text-center font-latin text-[10.5px] tracking-wider text-wine/50 lg:text-right">
              WWW.UNITEDCAFE.EG • SAMANOUD, GHARBIA
            </div>
          </div>

        </div>
      </section>

      {/* خط فاصل كلاسيكي رفيع وناعم يفصل بين البوستر ومعرض الأجواء */}
      <div className="bg-[#faf6ee] py-3 text-center">
        <span aria-hidden className="gold-hairline mx-auto block max-w-xs" />
      </div>

      <section id="wall" className="paper-rings relative scroll-mt-[calc(4rem+env(safe-area-inset-top,0px))] px-4 pt-14 pb-8 sm:pt-20 sm:pb-12">
        <div className="mx-auto max-w-6xl">
          <p className="font-latin text-[11px] tracking-[0.28em] text-wine">ATMOSPHERE</p>
          <h2 className="mt-2 text-4xl font-bold text-wine-deep sm:text-5xl">أجواء المكان</h2>
          <p className="mt-3 max-w-md text-[15px] leading-8 text-ink-soft">
            لقطات من المكان وقعداتنا المريحة في الفرعين.
          </p>
          <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-4 hide-scroll">
            {frames.map((frame) => (
              <figure key={frame.src} className="w-[78%] shrink-0 snap-start sm:w-72">
                <div className="relative aspect-[632/895] w-full">
                  {/* Photo completely filling the inner window and tucking under frame */}
                  <div className="absolute top-[15.2%] bottom-[15.8%] left-[18.8%] right-[18.8%] overflow-hidden">
                    <img
                      src={frame.src}
                      alt={frame.label}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Clean Isolated Rococo Gilded Gold Frame Overlay */}
                  <img
                    src="/media/rococo-gold-frame-clean.png"
                    alt=""
                    aria-hidden
                    className="pointer-events-none absolute inset-0 h-full w-full object-fill select-none"
                  />
                </div>
                <figcaption className="mt-3 text-center">
                  <span className="block text-xl font-bold text-wine">{frame.label}</span>
                  <span className="text-[13px] text-ink-soft">{frame.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-4 mt-8 sm:mt-12">
          <span aria-hidden className="gold-hairline block" />
        </div>
      </section>
    </>
  );
}

const frames = [
  { src: "/media/room-red.jpg", label: "الصالة الداخلية", caption: "قعدة مريحة وهادية" },
  { src: "/media/facade.jpg", label: "واجهة المكان", caption: "فرع شارع البحر" },
  { src: "/media/terrace.jpg", label: "تفاصيل الديكور", caption: "أجواء يونايتد المميزة" },
  { src: "/media/pistachio.jpg", label: "وافل بستاشيو", caption: "حلويات طازة يومياً" },
  { src: "/media/donut.jpg", label: "دوناتس محشية", caption: "بأشهى الصوصات" },
  { src: "/media/hall-gold.jpg", label: "الصالة الرئيسية", caption: "فرع ترعة الساحل" },
  { src: "/media/gallery-wall.jpg", label: "ركن الذكريات", caption: "تفاصيل تجمعنا" },
  { src: "/media/branch-street.jpg", label: "القعدة الخارجية", caption: "قعدة روقان في الهواء الطلق" },
];
