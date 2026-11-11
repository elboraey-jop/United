"use client";

import { useMemo, useState } from "react";
import {
  Minus,
  Plus,
  Trash,
  WhatsappLogo,
  X,
  Motorcycle,
  Storefront,
  MapPin,
  User,
  Phone,
  PaperPlaneTilt,
  CheckCircle,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { HOUSE } from "@/data/menu";
import { SAMANOUD_AREAS, type DeliveryArea } from "@/data/deliveryAreas";
import { DeliveryAreaSelect } from "./DeliveryAreaSelect";
import { formatPrice } from "@/lib/utils";
import type { DraftOrder } from "./MenuBook";

export type CartLine = DraftOrder & { key: string };

const branches = ["فرع ش البحر", "فرع ترعة الساحل"];

export function CartDrawer({
  open,
  lines,
  onClose,
  onChangeQty,
  onRemove,
  onClearCart,
}: {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onChangeQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onClearCart?: () => void;
}) {
  const dragControls = useDragControls();
  const [orderType, setOrderType] = useState<"delivery" | "takeaway">("delivery");
  const [branch, setBranch] = useState(branches[0]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [selectedArea, setSelectedArea] = useState<DeliveryArea>(SAMANOUD_AREAS[0]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const subtotal = lines.reduce((sum, line) => sum + line.size.price * line.qty, 0);
  const deliveryFee = orderType === "delivery" && lines.length > 0 ? selectedArea.fee : 0;
  const total = subtotal + deliveryFee;

  const link = useMemo(() => {
    const body = lines
      .map((line) => {
        const detail = [line.option, line.size.label].filter(Boolean).join(" · ");
        return `• ${line.item.name}${detail ? ` (${detail})` : ""} × ${line.qty} = ${line.size.price * line.qty} ج`;
      })
      .join("\n");

    if (orderType === "delivery") {
      let text = `أهلاً يونايتد كافيه ☕\nطلب دليفري جديد من الموقع:\n───────────────────\n${body}\n───────────────────\n💰 المجموع الفرعي: ${subtotal} ج\n🛵 خدمة التوصيل (${selectedArea.name}): +${deliveryFee} ج\n💵 الإجمالي الكلي: ${total} جنيه`;

      if (customerName.trim() || customerPhone.trim() || customerAddress.trim()) {
        text += `\n\nبيانات التوصيل:`;
        if (customerName.trim()) text += `\nالاسم: ${customerName.trim()}`;
        if (customerPhone.trim()) text += `\nالموبايل: ${customerPhone.trim()}`;
        text += `\nالمنطقة: ${selectedArea.name}`;
        if (customerAddress.trim()) text += `\nالعنوان بالتفصيل: ${customerAddress.trim()}`;
      }

      text += `\n\nنأمل تأكيد الطلب وتجهيزه فوراً، شكراً لكم. ☕✨`;
      return `https://wa.me/${HOUSE.whatsapp}?text=${encodeURIComponent(text)}`;
    }

    // Takeaway
    let text = `أهلاً يونايتد كافيه ☕\nطلب استلام من الفرع (تيكاوي)\n📍 الفرع: ${branch}\n───────────────────\n${body}\n───────────────────\n💵 الإجمالي: ${total} جنيه`;

    if (customerName.trim() || customerPhone.trim()) {
      text += `\n\nبيانات المستلم:`;
      if (customerName.trim()) text += `\nالاسم: ${customerName.trim()}`;
      if (customerPhone.trim()) text += `\nالموبايل: ${customerPhone.trim()}`;
    }

    return `https://wa.me/${HOUSE.whatsapp}?text=${encodeURIComponent(text)}`;
  }, [orderType, branch, customerName, customerPhone, customerAddress, selectedArea, lines, subtotal, deliveryFee, total]);

  const handleDirectOrder = () => {
    if (lines.length === 0) return;

    if (!customerPhone.trim()) {
      alert("برجاء إدخال رقم الموبايل لتأكيد الطلب والتواصل معك");
      return;
    }

    if (orderType === "delivery" && !customerAddress.trim()) {
      alert("برجاء إدخال العنوان بالتفصيل لتوصيل الطلب");
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `UNT-${randomNum}`;

    try {
      const orderPayload = {
        id: newOrderId,
        createdAt: new Date().toISOString(),
        orderType,
        branch: orderType === "takeaway" ? branch : null,
        customerName: customerName.trim() || "عميل يونايتد",
        customerPhone: customerPhone.trim(),
        customerAddress: customerAddress.trim(),
        area: orderType === "delivery" ? selectedArea : null,
        items: lines.map((line) => ({
          name: line.item.name,
          size: line.size.label,
          option: line.option,
          price: line.size.price,
          qty: line.qty,
          total: line.size.price * line.qty,
        })),
        subtotal,
        deliveryFee,
        total,
        status: "new",
      };

      const existing = JSON.parse(localStorage.getItem("united_orders") || "[]");
      localStorage.setItem("united_orders", JSON.stringify([orderPayload, ...existing]));
    } catch {
      // In case localStorage is unavailable
    }

    setOrderNumber(newOrderId);
    setOrderSuccess(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[65] flex items-end sm:items-stretch sm:justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="إغلاق السلة"
            className="absolute inset-0 bg-wine-deep/50 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-label="سلة الطلبات"
            initial={{ y: 48 }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_e, info) => {
              if (info.offset.y > 75 || info.velocity.y > 300) {
                onClose();
              }
            }}
            className="relative flex max-h-[94svh] w-full flex-col rounded-t-[32px] overflow-hidden bg-[#f8f3eb] shadow-2xl sm:max-h-none sm:w-[440px] sm:rounded-none"
            data-lenis-prevent
          >
            {/* Grab handle for bottom sheet */}
            <div
              onPointerDown={(e) => dragControls.start(e)}
              className="pt-2.5 pb-1 flex justify-center sm:hidden bg-[#f8f3eb] cursor-grab active:cursor-grabbing touch-none select-none"
            >
              <span className="h-1.5 w-12 rounded-full bg-wine/25" />
            </div>

            {/* Header */}
            <div
              onPointerDown={(e) => {
                if ((e.target as HTMLElement).closest("button")) return;
                dragControls.start(e);
              }}
              className="flex items-center justify-between px-5 py-3 border-b border-wine/10 bg-[#f8f3eb] cursor-grab active:cursor-grabbing sm:cursor-auto touch-none select-none"
            >
              <div>
                <p className="font-latin text-[11px] tracking-[0.22em] text-wine">YOUR ORDER</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-wine-deep">سلة الطلبات</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق"
                className="grid h-9 w-9 place-items-center rounded-full border border-wine/15 text-wine/70 hover:text-wine hover:border-wine/30 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {orderSuccess ? (
              /* Success View */
              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-wine text-gold-soft flex items-center justify-center shadow-lg border border-gold/40">
                  <CheckCircle size={36} weight="fill" />
                </div>

                <h3 className="font-display text-2xl font-bold text-wine-deep">
                  تم تأكيد طلبك بنجاح!
                </h3>

                <p className="text-xs text-ink-soft max-w-xs leading-5">
                  تم تسجيل الطلب بنجاح وسيتم تجهيزه من قبل الإدارة فوراً.
                </p>

                <div className="p-3.5 bg-white/90 border border-wine/15 rounded-2xl w-full max-w-xs text-center shadow-2xs">
                  <span className="block text-[11px] text-ink-soft">رقم الطلب</span>
                  <span className="font-num text-2xl font-bold text-wine tracking-wider">{orderNumber}</span>
                  <span className="mt-1 block text-[11px] text-wine/80">
                    {orderType === "delivery" ? `توصيل (${selectedArea.name})` : `استلام (${branch})`}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setOrderSuccess(false);
                    if (onClearCart) onClearCart();
                    else lines.forEach((l) => onRemove(l.key));
                    onClose();
                  }}
                  className="w-full max-w-xs py-3 rounded-full bg-wine text-gold-soft font-semibold text-xs shadow-xs hover:bg-wine-deep transition-all cursor-pointer"
                >
                  حسناً، متابعة التصفح
                </button>
              </div>
            ) : (
              /* Normal Cart View */
              <>
                {/* Order Type Toggle (Delivery vs Takeaway) */}
                <div className="px-5 pt-3">
                  <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-wine/[0.05] border border-wine/10">
                    <button
                      type="button"
                      onClick={() => setOrderType("delivery")}
                      className={`h-9 rounded-xl text-[12px] sm:text-[13px] font-medium flex items-center justify-center gap-1.5 transition-all ${
                        orderType === "delivery"
                          ? "bg-wine text-gold-soft font-semibold shadow-xs"
                          : "text-wine-deep hover:text-wine"
                      }`}
                    >
                      <Motorcycle size={16} weight="fill" className={orderType === "delivery" ? "text-gold" : ""} />
                      <span>توصيل (دليفري)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType("takeaway")}
                      className={`h-9 rounded-xl text-[12px] sm:text-[13px] font-medium flex items-center justify-center gap-1.5 transition-all ${
                        orderType === "takeaway"
                          ? "bg-wine text-gold-soft font-semibold shadow-xs"
                          : "text-wine-deep hover:text-wine"
                      }`}
                    >
                      <Storefront size={16} weight="fill" className={orderType === "takeaway" ? "text-gold" : ""} />
                      <span>استلام من الفرع</span>
                    </button>
                  </div>
                </div>

                {/* Branch Selector: ONLY VISIBLE IF TAKEAWAY */}
                {orderType === "takeaway" && (
                  <div className="mt-2.5 flex gap-2 px-5">
                    {branches.map((name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => setBranch(name)}
                        className={`h-9 flex-1 rounded-xl text-[12px] font-medium transition-all ${
                          branch === name
                            ? "bg-wine text-gold-soft font-semibold shadow-xs"
                            : "bg-white/80 text-ink-soft border border-wine/15 hover:border-wine/35"
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Scrollable Middle Section: Items List */}
                <div className="mt-3 flex-1 space-y-2.5 overflow-y-auto px-5 pb-2">
                  {lines.length === 0 && (
                    <p className="py-12 text-center text-ink-soft text-sm">
                      السلة فاضية.. اختار اللي يعجبك من المنيو.
                    </p>
                  )}

                  {/* Items List */}
                  {lines.map((line) => (
                    <div
                      key={line.key}
                      className="rounded-2xl bg-white/90 p-3 border border-wine/10 shadow-[0_1px_3px_rgba(58,13,20,0.03)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <strong className="block text-[14px] sm:text-[15px] font-semibold text-wine-deep">
                            {line.item.name}
                          </strong>
                          <span className="text-[12px] text-ink-soft">
                            {[line.option, line.size.label].filter(Boolean).join(" · ") || "الحجم الأساسي"} ·{" "}
                            <span className="font-num text-[13px] font-bold text-wine">
                              {formatPrice(line.size.price)}
                            </span>{" "}
                            ج
                          </span>
                        </div>
                        <button
                          type="button"
                          aria-label="حذف"
                          onClick={() => onRemove(line.key)}
                          className="text-wine/60 hover:text-wine p-1 transition-colors"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label="تقليل"
                            onClick={() => onChangeQty(line.key, -1)}
                            className="grid h-8 w-8 place-items-center rounded-full border border-wine/15 hover:border-wine/35 transition-colors"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="font-num w-6 text-center text-base font-bold text-wine-deep">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            aria-label="زيادة"
                            onClick={() => onChangeQty(line.key, 1)}
                            className="grid h-8 w-8 place-items-center rounded-full border border-wine/15 hover:border-wine/35 transition-colors"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <strong className="font-num text-[16px] font-bold text-wine">
                          {formatPrice(line.size.price * line.qty)} ج
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Section: Attached Delivery/Recipient Details + Totals + Action Buttons */}
                {lines.length > 0 && (
                  <div className="border-t border-wine/15 bg-[#f3ece0] px-5 py-3 pb-[max(1rem,env(safe-area-inset-bottom))] space-y-2.5 shrink-0 shadow-[0_-6px_20px_rgba(58,13,20,0.05)]">
                    {/* 1. Delivery Details (Flush & attached to the lower section) */}
                    {orderType === "delivery" && (
                      <div className="space-y-2 text-right">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-wine-deep">
                            <MapPin size={14} weight="fill" className="text-gold" />
                            <span className="font-display">بيانات التوصيل</span>
                          </div>
                          <span className="text-[10px] text-wine/80 bg-gold/15 px-2 py-0.5 rounded-full border border-gold/30 font-medium">
                            سمنود وقراها
                          </span>
                        </div>

                        {/* Row 1: Name + Phone */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="relative">
                            <input
                              type="text"
                              value={customerName}
                              onChange={(e) => setCustomerName(e.target.value)}
                              placeholder="اسمك الكريم"
                              className="w-full bg-[#fffdfa] border border-wine/15 rounded-xl py-2 pr-7 pl-2 text-[11px] sm:text-[12px] text-ink placeholder:text-ink-soft/45 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
                            />
                            <User
                              size={13}
                              className="absolute top-1/2 -translate-y-1/2 right-2 text-gold pointer-events-none"
                            />
                          </div>

                          <div className="relative">
                            <input
                              type="tel"
                              dir="rtl"
                              value={customerPhone}
                              onChange={(e) => setCustomerPhone(e.target.value)}
                              placeholder="رقم الموبايل *"
                              className="w-full bg-[#fffdfa] border border-wine/15 rounded-xl py-2 pr-7 pl-2 text-[11px] sm:text-[12px] text-right text-ink placeholder:text-ink-soft/45 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
                            />
                            <Phone
                              size={13}
                              className="absolute top-1/2 -translate-y-1/2 right-2 text-gold pointer-events-none"
                            />
                          </div>
                        </div>

                        {/* Row 2: Delivery Area Dropdown */}
                        <div>
                          <DeliveryAreaSelect
                            selectedArea={selectedArea}
                            onSelectArea={setSelectedArea}
                          />
                        </div>

                        {/* Row 3: Detailed Address */}
                        <div className="relative">
                          <input
                            type="text"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            placeholder="العنوان بالتفصيل (اسم الشارع أو علامة مميزة)"
                            className="w-full bg-[#fffdfa] border border-wine/15 rounded-xl py-2 pr-7 pl-2 text-[11px] sm:text-[12px] text-ink placeholder:text-ink-soft/45 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
                          />
                          <MapPin
                            size={13}
                            className="absolute top-1/2 -translate-y-1/2 right-2 text-gold pointer-events-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* 2. Takeaway Recipient Details (Flush & attached) */}
                    {orderType === "takeaway" && (
                      <div className="space-y-1.5 text-right">
                        <span className="text-[11px] font-bold text-wine-deep font-display">بيانات المستلم</span>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="relative">
                            <input
                              type="text"
                              value={customerName}
                              onChange={(e) => setCustomerName(e.target.value)}
                              placeholder="اسمك الكريم"
                              className="w-full bg-[#fffdfa] border border-wine/15 rounded-xl py-1.5 pr-7 pl-2 text-[11px] text-ink placeholder:text-ink-soft/45 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
                            />
                            <User
                              size={12}
                              className="absolute top-1/2 -translate-y-1/2 right-2 text-gold pointer-events-none"
                            />
                          </div>
                          <div className="relative">
                            <input
                              type="tel"
                              dir="rtl"
                              value={customerPhone}
                              onChange={(e) => setCustomerPhone(e.target.value)}
                              placeholder="رقم الموبايل"
                              className="w-full bg-[#fffdfa] border border-wine/15 rounded-xl py-1.5 pr-7 pl-2 text-[11px] text-right text-ink placeholder:text-ink-soft/45 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
                            />
                            <Phone
                              size={12}
                              className="absolute top-1/2 -translate-y-1/2 right-2 text-gold pointer-events-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 3. Financial Totals */}
                    <div className="border-t border-wine/10 pt-2 space-y-1">
                      {orderType === "delivery" ? (
                        <>
                          <div className="flex items-center justify-between text-ink-soft text-[11px] sm:text-[12px]">
                            <span>المجموع الفرعي:</span>
                            <span className="font-num text-sm font-bold text-wine-deep">
                              {formatPrice(subtotal)} ج
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-ink-soft text-[11px] sm:text-[12px]">
                            <span>
                              خدمة التوصيل ({selectedArea.type === "city" ? "سمنود المدينة" : "قرية مجاورة"}):
                            </span>
                            <span className="font-num text-sm font-bold text-wine">
                              +{deliveryFee} ج
                            </span>
                          </div>

                          <div className="border-t border-wine/10 pt-1.5 mt-1 flex items-baseline justify-between">
                            <span className="font-bold text-wine-deep text-[13px] sm:text-[14px]">
                              الإجمالي الكلي:
                            </span>
                            <strong className="font-num text-2xl sm:text-3xl font-extrabold text-wine">
                              {formatPrice(total)} ج
                            </strong>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-between py-0.5">
                          <span className="text-ink-soft text-sm font-medium">الإجمالي:</span>
                          <strong className="font-num text-2xl sm:text-3xl font-extrabold text-wine">
                            {formatPrice(total)} ج
                          </strong>
                        </div>
                      )}
                    </div>

                    {/* 4. Action Buttons: WhatsApp & Direct Order */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 sm:h-12 items-center justify-center gap-1.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-[12px] sm:text-[13px] font-semibold shadow-xs transition-all active:scale-95 whitespace-nowrap cursor-pointer"
                      >
                        <WhatsappLogo size={18} weight="fill" className="shrink-0" />
                        <span>طلب واتساب</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleDirectOrder}
                        className="flex h-11 sm:h-12 items-center justify-center gap-1.5 rounded-full bg-wine hover:bg-wine-deep text-gold-soft text-[12px] sm:text-[13px] font-semibold shadow-xs transition-all active:scale-95 border border-gold/30 whitespace-nowrap cursor-pointer"
                      >
                        <PaperPlaneTilt size={16} weight="bold" className="shrink-0" />
                        <span>تأكيد الطلب</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
