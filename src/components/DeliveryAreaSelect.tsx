"use client";

import React, { useState, useRef, useEffect } from "react";
import { SAMANOUD_AREAS, type DeliveryArea } from "@/data/deliveryAreas";
import {
  MapPin,
  CaretDown,
  Check,
  Buildings,
  HouseLine,
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

interface DeliveryAreaSelectProps {
  selectedArea: DeliveryArea;
  onSelectArea: (area: DeliveryArea) => void;
}

export function DeliveryAreaSelect({
  selectedArea,
  onSelectArea,
}: DeliveryAreaSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cityArea = SAMANOUD_AREAS.find((a) => a.type === "city");
  const villageAreas = SAMANOUD_AREAS.filter((a) => a.type === "village");

  return (
    <div className="relative w-full text-right" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#fffdfa] border border-wine/15 hover:border-gold/60 rounded-xl py-2 px-3 flex items-center justify-between text-right text-xs transition-all focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 shadow-2xs cursor-pointer group"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <MapPin
            size={14}
            weight="fill"
            className="text-gold shrink-0"
          />
          <span className="font-medium text-wine-deep truncate">
            {selectedArea.name}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="px-2 py-0.5 rounded-full bg-gold/15 text-wine-deep border border-gold/30 font-bold text-[10px] font-num tracking-wider">
            {selectedArea.fee} ج
          </span>
          <CaretDown
            size={12}
            className={`text-ink-soft/70 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-wine" : ""
            }`}
          />
        </div>
      </button>

      {/* Floating Dropdown Menu (Opens upward) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute bottom-full mb-1.5 right-0 left-0 z-50 bg-[#faf6ef] border border-wine/20 rounded-2xl shadow-xl overflow-hidden max-h-[250px] flex flex-col"
          >
            {/* Header label */}
            <div className="px-3 py-2 border-b border-wine/10 bg-[#f2e9dc] flex items-center justify-between text-[11px] font-bold text-wine-deep">
              <span className="font-display">اختر منطقة التوصيل</span>
              <span className="text-[10px] text-wine/70 bg-gold/15 px-2 py-0.5 rounded-full border border-gold/30">
                سمنود وقراها
              </span>
            </div>

            {/* List options */}
            <div className="overflow-y-auto p-1.5 space-y-1 overscroll-contain flex-1">
              {/* City (20 EGP) */}
              {cityArea && (
                <div className="mb-1">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectArea(cityArea);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs text-right transition-colors cursor-pointer ${
                      selectedArea.id === cityArea.id
                        ? "bg-wine text-gold-soft font-semibold shadow-xs"
                        : "bg-wine/[0.03] hover:bg-wine/[0.08] text-ink"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Buildings size={14} weight="bold" />
                      <span className="font-bold">{cityArea.name}</span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <span
                        className={`text-[11px] font-num ${
                          selectedArea.id === cityArea.id
                            ? "text-gold-soft"
                            : "text-wine font-bold"
                        }`}
                      >
                        20 ج
                      </span>
                      {selectedArea.id === cityArea.id && (
                        <Check size={14} weight="bold" />
                      )}
                    </div>
                  </button>
                </div>
              )}

              {/* Villages Header (30 EGP) */}
              <div className="pt-1">
                <div className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold text-wine/70 bg-gold/10 rounded-lg mb-1 border border-gold/20">
                  <HouseLine size={13} weight="bold" className="text-gold" />
                  <span>قرى مركز سمنود (توصيل 30 جنيه)</span>
                </div>

                {villageAreas.map((area) => (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => {
                      onSelectArea(area);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs text-right transition-colors cursor-pointer ${
                      selectedArea.id === area.id
                        ? "bg-wine text-gold-soft font-semibold shadow-xs"
                        : "hover:bg-wine/[0.05] text-ink"
                    }`}
                  >
                    <span className="truncate">{area.name}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      <span
                        className={`text-[10px] font-num ${
                          selectedArea.id === area.id
                            ? "text-gold-soft"
                            : "text-wine font-bold"
                        }`}
                      >
                        30 ج
                      </span>
                      {selectedArea.id === area.id && (
                        <Check size={14} weight="bold" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
