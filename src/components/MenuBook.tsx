"use client";

import { useMemo, useRef, useState } from "react";
import { Cake, Coffee, Minus, Plus, Star, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { categories, MENU_ITEMS, type CategoryId, type CupSize, type MenuItem } from "@/data/menu";
import { formatPrice } from "@/lib/utils";

export type DraftOrder = {
  item: MenuItem;
  size: CupSize;
  option?: string;
  qty: number;
};

export function MenuBook({ onAdd }: { onAdd: (draft: DraftOrder) => void }) {
  const [category, setCategory] = useState<CategoryId>("coffee");
  const [subCategory, setSubCategory] = useState<string | null>(null);
  const [draft, setDraft] = useState<MenuItem | null>(null);
  const stickyBarRef = useRef<HTMLDivElement | null>(null);

  const lenisScroll = () =>
    (window as unknown as { __unitedLenis?: { scrollTo: (t: number, opts?: { immediate?: boolean; offset?: number }) => void } }).__unitedLenis;

  // نرجع لما الكاتيجوريز تبقى لازقه في الناف بار (نقطة التثبيت بتاعتها)
  const scrollToCategories = () => {
    const marker = stickyBarRef.current;
    if (!marker) return;
    // الشريط اللاصق على طول بعد العلامة — بنحسب مسافة الـmargin بتاعته
    const bar = marker.nextElementSibling as HTMLElement | null;
    const gap = bar ? parseFloat(getComputedStyle(bar).marginTop) || 0 : 0;

    // نقرا الـsafe-area بتاع النوتش عشان نحسب نقطة التثبيت بدقة
    const probe = document.createElement("div");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText = "position:fixed;top:env(safe-area-inset-top);height:0;visibility:hidden;pointer-events:none";
    document.body.appendChild(probe);
    const safeTop = Math.max(0, probe.getBoundingClientRect().top || 0);
    probe.remove();

    const y = Math.max(0, marker.getBoundingClientRect().top + window.scrollY + gap - 64 - safeTop);

    const jump = () => {
      const lenis = lenisScroll();
      if (lenis) lenis.scrollTo(y, { immediate: true });
      else window.scrollTo({ top: y, behavior: "auto" });
    };

    // تغيير لحظي — سكرول مباشر من غير أنيميشن
    requestAnimationFrame(jump);

    // شبكة أمان: بعض الموبايلات بيتجاهل السكرول البرمجي وقت الزخم أو تغير القايمة
    window.setTimeout(() => {
      const pause = window.scrollY;
      window.setTimeout(() => {
        if (Math.abs(window.scrollY - y) > 32 && Math.abs(window.scrollY - pause) < 4) jump();
      }, 180);
    }, 220);
  };

  const availableSubCategories = useMemo(() => {
    const list: string[] = [];
    MENU_ITEMS.forEach((item) => {
      if (item.category === category && !list.includes(item.group)) {
        list.push(item.group);
      }
    });
    return list;
  }, [category]);

  const visible = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const inCategory = item.category === category;
      const inSubCategory = !subCategory ? true : item.group === subCategory;
      return inCategory && inSubCategory;
    });
  }, [category, subCategory]);

  const groups = useMemo(() => {
    const map = new Map<string, MenuItem[]>();
    visible.forEach((item) => {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    });
    return [...map.entries()];
  }, [visible]);

  return (
    <section id="menu" className="paper-rings relative scroll-mt-[calc(4rem+env(safe-area-inset-top,0px))] px-4 pt-8 pb-14 sm:pt-12 sm:pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-right">
          <p className="font-latin text-[11px] tracking-[0.28em] text-wine">OUR MENU</p>
          <h2 className="mt-1 text-4xl font-bold text-wine-deep sm:text-5xl">قائمة المشروبات والحلويات</h2>
        </div>

        <div ref={stickyBarRef} aria-hidden className="h-0 w-0" />
        <div className="sticky top-[calc(4rem+env(safe-area-inset-top))] z-30 -mx-4 mt-6 border-b border-wine/10 bg-[#f6f0e6]/95 px-4 py-3 backdrop-blur">
          <div className="flex gap-2 overflow-x-auto hide-scroll pb-1">
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setCategory(item.id);
                  setSubCategory(null);
                  scrollToCategories();
                }}
                className={`h-10 shrink-0 rounded-full px-4 text-[14px] font-medium transition-colors ${
                  category === item.id
                    ? "bg-wine text-gold-soft shadow-xs font-semibold"
                    : "bg-white/80 text-wine ring-1 ring-wine/10 hover:bg-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {availableSubCategories.length > 1 && (
            <div className="mt-2.5 flex flex-wrap justify-center gap-1.5 border-t border-wine/10 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSubCategory(null);
                  scrollToCategories();
                }}
                className={`h-8 shrink-0 rounded-full px-3 text-[12px] font-medium transition-colors ${
                  subCategory === null
                    ? "bg-wine text-gold-soft shadow-2xs font-semibold"
                    : "bg-white/80 text-wine ring-1 ring-wine/10 hover:bg-white"
                }`}
              >
                الكل
              </button>
              {availableSubCategories.map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => {
                    setSubCategory(group);
                    scrollToCategories();
                  }}
                  className={`h-8 shrink-0 rounded-full px-3 text-[12px] font-medium transition-colors ${
                    subCategory === group
                      ? "bg-wine text-gold-soft shadow-2xs font-semibold"
                      : "bg-white/80 text-wine ring-1 ring-wine/10 hover:bg-white"
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-2 space-y-8">
          {groups.map(([group, list]) => (
            <div key={group}>
              <div className="mb-3 flex items-center gap-3">
                <h3 className="rounded-full bg-gold px-3 py-1 text-[13px] font-semibold text-wine-deep">{group}</h3>
                <span className="gold-hairline flex-1" />
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {list.map((item) => {
                  const isDrink =
                    item.category === "coffee" ||
                    item.category === "tea" ||
                    item.category === "cold" ||
                    item.category === "cocoa";

                  return (
                    <div
                      key={item.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setDraft(item)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setDraft(item);
                        }
                      }}
                      className="group relative flex items-center justify-between gap-3 rounded-2xl bg-white/90 p-3 sm:p-3.5 text-right shadow-[0_2px_8px_-2px_rgba(58,13,20,0.04)] ring-1 ring-wine/10 transition-all duration-200 hover:bg-white hover:ring-gold/60 hover:shadow-[0_8px_20px_-4px_rgba(58,13,20,0.08)] active:scale-[0.99] cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                        {/* مصغرة صورة المنتج (مستطيل طولي بأطراف دائرية) */}
                        <div className="relative grid h-12 w-9 sm:h-14 sm:w-10 shrink-0 place-items-center rounded-xl bg-[#f9f5ed] text-wine ring-1.5 ring-[#c6a15a]/60 shadow-2xs transition-transform duration-200 group-hover:scale-105">
                          {isDrink ? <Coffee size={18} weight="fill" /> : <Cake size={18} weight="fill" />}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-display text-[15px] sm:text-[16px] font-bold leading-snug text-wine-deep transition-colors duration-200 group-hover:text-wine">
                              {item.name}
                            </span>
                            {item.signature && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-wine-deep ring-1 ring-gold/40">
                                <Star size={10} weight="fill" className="text-gold" />
                                سبيشال
                              </span>
                            )}
                          </div>
                          {item.note && (
                            <p className="mt-1 text-[11.5px] sm:text-[12px] leading-snug text-ink-soft/80">
                              {item.note}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
                        <div className="flex items-center rounded-full bg-wine/[0.035] px-3 py-1.5 ring-1 ring-wine/10 transition-colors group-hover:bg-wine/[0.06] group-hover:ring-wine/20">
                          {item.sizes.map((size, index) => (
                            <div
                              key={`${item.id}-${size.label || index}`}
                              className={`flex flex-col items-center px-1.5 min-w-[2rem] text-center ${
                                index > 0 ? "border-s border-wine/10" : ""
                              }`}
                            >
                              {size.label && (
                                <span className="font-latin text-[9px] font-semibold tracking-wider text-wine/60">
                                  {size.label}
                                </span>
                              )}
                              <span className="font-num text-[15px] sm:text-[16px] font-bold leading-tight text-wine-deep">
                                {formatPrice(size.price)}
                                <span className="font-normal text-[10px] text-wine/50 ms-0.5">ج</span>
                              </span>
                            </div>
                          ))}
                        </div>

                        <button
                          type="button"
                          aria-label={`إضافة ${item.name} إلى السلة`}
                          onClick={(e) => {
                            e.stopPropagation();
                            const hasChoices = item.sizes.length > 1 || Boolean(item.options && item.options.length > 0);
                            if (hasChoices) {
                              setDraft(item);
                            } else {
                              onAdd({ item, size: item.sizes[0], qty: 1 });
                            }
                          }}
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-wine text-gold-soft shadow-xs ring-1 ring-gold/30 transition-all duration-200 hover:scale-110 hover:bg-wine-deep active:scale-95"
                        >
                          <Plus size={13} weight="bold" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {groups.length === 0 && (
            <p className="py-10 text-center text-ink-soft">مفيش نتائج مطابقة للبحث في المنيو.</p>
          )}
        </div>
      </div>

      {draft && <Picker key={draft.id} item={draft} onClose={() => setDraft(null)} onAdd={onAdd} />}
    </section>
  );
}

function Picker({
  item,
  onClose,
  onAdd,
}: {
  item: MenuItem | null;
  onClose: () => void;
  onAdd: (draft: DraftOrder) => void;
}) {
  const [sizeLabel, setSizeLabel] = useState("");
  const [option, setOption] = useState("");
  const [qty, setQty] = useState(1);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const dragControls = useDragControls();

  const scrollToSlide = (idx: number) => {
    if (!carouselRef.current) return;
    const items = carouselRef.current.querySelectorAll<HTMLElement>("[data-slide]");
    if (items[idx]) {
      items[idx].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      setActiveSlide(idx);
    }
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const items = container.querySelectorAll<HTMLElement>("[data-slide]");
    const containerCenter = container.getBoundingClientRect().left + container.offsetWidth / 2;
    let closestIdx = 0;
    let minDiff = Infinity;
    items.forEach((itemEl, idx) => {
      const rect = itemEl.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const diff = Math.abs(containerCenter - itemCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setActiveSlide(closestIdx);
  };

  const size = item?.sizes.find((entry) => entry.label === sizeLabel) ?? item?.sizes[0];
  const isDrink = item ? ["coffee", "tea", "cocoa", "cold"].includes(item.category) : false;

  return (
    <AnimatePresence>
      {item && size && (
        <motion.div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="إغلاق" className="absolute inset-0 bg-wine-deep/50 backdrop-blur-[2px]" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-label={item.name}
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_event, info) => {
              if (info.offset.y > 75 || info.velocity.y > 300) {
                onClose();
              }
            }}
            className="relative w-full max-w-md max-h-[92dvh] overflow-y-auto rounded-t-[28px] bg-[#f8f3eb] p-4 sm:p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl sm:rounded-3xl"
            data-lenis-prevent
          >
            {/* Grab handle for sheet */}
            <div
              onPointerDown={(e) => dragControls.start(e)}
              className="pt-0.5 pb-2 flex justify-center sm:hidden cursor-grab active:cursor-grabbing touch-none select-none"
            >
              <span className="h-1.5 w-12 rounded-full bg-wine/25" />
            </div>

            {/* Header: Group (Large) & Name (Small) + Close Button */}
            <div
              onPointerDown={(e) => {
                if ((e.target as HTMLElement).closest("button")) return;
                dragControls.start(e);
              }}
              className="flex items-start justify-between gap-3 text-right cursor-grab active:cursor-grabbing sm:cursor-auto touch-none select-none"
            >
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight text-wine-deep">{item.group}</h3>
                <p className="mt-0.5 text-[13px] sm:text-[14px] font-semibold text-wine">{item.name}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق"
                className="grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full border border-wine/15 text-wine/70 hover:text-wine hover:border-wine/30 transition-colors bg-white/60"
              >
                <X size={16} />
              </button>
            </div>

            {/* 3 Swipeable Image Placeholders (Vintage Frame) */}
            <div className="mt-2.5">
              <div
                ref={carouselRef}
                onScroll={handleScroll}
                className="flex snap-x snap-mandatory gap-4 overflow-x-auto hide-scroll py-2 px-[calc(50%-102px)] sm:px-[calc(50%-118px)] items-center"
              >
                {[1, 2, 3].map((num, idx) => (
                  <div
                    key={num}
                    data-slide
                    onClick={() => scrollToSlide(idx)}
                    className={`group/frame relative aspect-[632/895] h-72 sm:h-84 shrink-0 snap-center transition-all duration-300 cursor-pointer ${
                      activeSlide === idx
                        ? "scale-100 opacity-100 drop-shadow-[0_16px_24px_rgba(58,13,20,0.22)]"
                        : "scale-90 opacity-55 drop-shadow-md"
                    }`}
                  >
                    {/* Inner Artwork / Content Canvas (fits inside the frame window) */}
                    <div className="absolute top-[15.2%] bottom-[15.8%] left-[18.8%] right-[18.8%] flex flex-col items-center justify-center bg-[#faf6ee] p-2 text-center overflow-hidden">
                      {/* Subtle vintage texture / lighting */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[#fbf8f0] via-transparent to-[#f2e7d3]/70 pointer-events-none" />

                      {/* Inner gold hairline */}
                      <div className="absolute inset-1.5 border border-[#c6a15a]/30 pointer-events-none rounded-sm" />

                      {/* Icon Crest Only */}
                      <div className="relative grid h-20 w-20 sm:h-24 sm:w-24 place-items-center rounded-full bg-white text-wine ring-2 ring-[#c6a15a] shadow-xs transition-transform group-hover/frame:scale-105">
                        {isDrink ? <Coffee size={42} weight="fill" /> : <Cake size={42} weight="fill" />}
                      </div>
                    </div>

                    {/* Clean Isolated Antique Gilded Picture Frame Overlay */}
                    <img
                      src="/media/rococo-gold-frame-clean.png"
                      alt="برواز مذهب"
                      className="pointer-events-none absolute inset-0 h-full w-full object-fill select-none"
                    />
                  </div>
                ))}
              </div>

              {/* Swipe dots */}
              <div className="flex justify-center items-center gap-1.5 pt-1.5">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToSlide(idx)}
                    aria-label={`صورة ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeSlide === idx ? "w-5 bg-wine" : "w-1.5 bg-wine/25 hover:bg-wine/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Description (UNDER IMAGES) */}
            {item.note && (
              <p className="mt-2 text-[12px] leading-relaxed text-ink-soft text-right">{item.note}</p>
            )}

            {item.sizes.length > 1 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.sizes.map((entry) => {
                  const active = (sizeLabel || item.sizes[0].label) === entry.label;
                  return (
                    <button
                      key={entry.label}
                      type="button"
                      onClick={() => setSizeLabel(entry.label)}
                      className={`h-9 rounded-full px-3.5 text-[13px] ${active ? "bg-wine text-gold-soft font-semibold" : "bg-white ring-1 ring-line"}`}
                    >
                      {entry.label} · <span className="font-num text-[15px] font-bold">{formatPrice(entry.price)}</span> ج
                    </button>
                  );
                })}
              </div>
            )}

            {item.options && (
              <div className="mt-2.5">
                <p className="mb-1.5 text-[12px] text-ink-soft">{item.optionLabel}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.options.map((entry) => (
                    <button
                      key={entry}
                      type="button"
                      onClick={() => setOption(entry)}
                      className={`h-9 rounded-full px-3 text-[12px] ${option === entry ? "bg-gold text-wine-deep font-semibold" : "bg-white ring-1 ring-line"}`}
                    >
                      {entry}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-3.5 flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <button type="button" aria-label="تقليل" onClick={() => setQty((value) => Math.max(1, value - 1))} className="grid h-10 w-10 place-items-center rounded-full border border-line">
                  <Minus size={15} />
                </button>
                <span className="font-num w-7 text-center text-lg font-bold">{qty}</span>
                <button type="button" aria-label="زيادة" onClick={() => setQty((value) => value + 1)} className="grid h-10 w-10 place-items-center rounded-full border border-line">
                  <Plus size={15} />
                </button>
              </div>
              <button
                type="button"
                disabled={Boolean(item.options && !option)}
                onClick={() => {
                  onAdd({ item, size, option: option || undefined, qty });
                  setQty(1);
                  setOption("");
                  setSizeLabel("");
                  onClose();
                }}
                className="h-11 flex-1 rounded-full bg-wine text-[13px] sm:text-[14px] font-semibold text-gold-soft disabled:opacity-40"
              >
                إضافة للطلب · <span className="font-num text-[16px] font-bold">{formatPrice(size.price * qty)}</span> ج
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
