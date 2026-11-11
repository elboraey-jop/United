"use client";

import { useMemo, useState } from "react";
import { ShoppingBag } from "@phosphor-icons/react";
import { CartDrawer, type CartLine } from "./CartDrawer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Houses } from "./Houses";
import { MenuBook, type DraftOrder } from "./MenuBook";
import { SmoothScroll } from "./SmoothScroll";
import { SplashScreen } from "./SplashScreen";
import { formatPrice } from "@/lib/utils";

export function HomeExperience() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const total = useMemo(() => lines.reduce((sum, line) => sum + line.size.price * line.qty, 0), [lines]);

  const add = (draft: DraftOrder) => {
    const key = `${draft.item.id}|${draft.size.label}|${draft.option ?? ""}`;
    setLines((current) => {
      const existing = current.find((line) => line.key === key);
      if (!existing) return [...current, { ...draft, key }];
      return current.map((line) => (line.key === key ? { ...line, qty: line.qty + draft.qty } : line));
    });
    setOpen(true);
  };

  return (
    <div className={count > 0 ? "pb-24 sm:pb-0" : undefined}>
      <SmoothScroll />
      <SplashScreen />
      <Header count={count} onOpenCart={() => setOpen(true)} />
      <main>
        <Hero />
        <MenuBook onAdd={add} />
        <Houses />
      </main>
      <CartDrawer
        open={open}
        lines={lines}
        onClose={() => setOpen(false)}
        onRemove={(key) => setLines((current) => current.filter((line) => line.key !== key))}
        onChangeQty={(key, delta) =>
          setLines((current) =>
            current
              .map((line) => (line.key === key ? { ...line, qty: line.qty + delta } : line))
              .filter((line) => line.qty > 0),
          )
        }
      />
      {count > 0 && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed inset-x-4 bottom-[max(0.8rem,env(safe-area-inset-bottom))] z-40 flex h-14 items-center justify-between rounded-full bg-wine px-4 text-gold-soft shadow-lg sm:hidden"
        >
          <span className="flex items-center gap-2 text-[14px]">
            <ShoppingBag size={18} />
            <span className="font-num font-bold">{count}</span> صنف في السلة
          </span>
          <strong className="font-num text-lg font-bold">{formatPrice(total)} ج</strong>
        </button>
      )}
    </div>
  );
}
