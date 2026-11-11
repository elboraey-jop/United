"use client";

import { useEffect, useState } from "react";
import { List, ShoppingBag, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "#wall", label: "الصور" },
  { href: "#menu", label: "المنيو" },
  { href: "#branches", label: "فروعنا" },
  { href: "#visit", label: "تواصل معنا" },
];

export function Header({
  count,
  onOpenCart,
}: {
  count: number;
  onOpenCart: () => void;
}) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setOpen(false);

      if (href === "#top") {
        const lenis = (window as unknown as { __unitedLenis?: any }).__unitedLenis;
        if (lenis) {
          lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      const target = document.querySelector<HTMLElement>(href);
      if (target) {
        let elementTop = 0;
        let curr: HTMLElement | null = target;
        while (curr) {
          elementTop += curr.offsetTop;
          curr = curr.offsetParent as HTMLElement | null;
        }

        const headerEl = document.querySelector<HTMLElement>("header");
        const bar = headerEl?.querySelector<HTMLElement>("div");
        const barHeight = bar ? bar.offsetHeight : 64;
        const safeAreaTop = headerEl ? parseInt(window.getComputedStyle(headerEl).paddingTop) || 0 : 0;
        const navHeight = barHeight + safeAreaTop;

        const targetY = Math.max(0, elementTop - navHeight);

        const lenis = (window as unknown as { __unitedLenis?: any }).__unitedLenis;
        if (lenis) {
          lenis.scrollTo(targetY);
        } else {
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        solid || open
          ? "header-weave weave-drift bg-cream/95 text-wine shadow-[0_1px_0_rgba(110,24,36,0.12)] backdrop-blur"
          : "bg-transparent text-gold-soft"
      }`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent transition-opacity duration-300 ${
          solid || open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, "#top")}
          aria-label="يونايتد — الرئيسية"
          className="flex shrink-0 items-center gap-2.5"
        >
          <img
            src="/media/logo.jpg?v=2"
            alt="شعار يونايتد"
            className="h-12 w-12 rounded-md object-cover ring-1 ring-gold/80"
          />
          <span className="leading-none">
            <span className="block font-latin text-[15px] tracking-[0.18em]">UNITED</span>
            <span className={`mt-1 block font-latin text-[10px] tracking-[0.14em] md:text-[12px] ${solid || open ? "text-ink-soft" : "text-gold-soft/75"}`}>
              CAFFEINE &amp; DESSERT HOUSE
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-[14px] md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="transition-opacity hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label="عرض السلة"
            className={`relative grid h-11 w-11 place-items-center rounded-full border ${
              solid || open ? "border-wine/20" : "border-gold/40"
            }`}
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="font-num absolute -top-1 -left-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[12px] font-bold text-wine-deep">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            className={`grid h-11 w-11 place-items-center rounded-full border md:hidden ${
              solid || open ? "border-wine/20" : "border-gold/40"
            }`}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="overflow-hidden border-t border-line bg-cream md:hidden"
          >
            <div className="flex flex-col px-4 py-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="border-b border-line py-4 text-2xl font-semibold text-wine"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
