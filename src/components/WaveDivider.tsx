import React from "react";

interface WaveProps {
  className?: string;
}

/**
 * موجة علوية: انتقال انسيابي ومائل من الخلفية الفاتحة (الكريمي) إلى الخلفية الداكنة (النبيتي)
 * متطابقة مع تصميم الصورة بدقة ونعومة عالية على الديسكتوب والموبايل
 */
export function WaveTop({ className = "" }: WaveProps) {
  return (
    <div className={`-mb-px w-full overflow-hidden leading-none select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block h-7 w-full sm:h-12 md:h-16 lg:h-20"
      >
        <path
          d="M0,32 C220,68 380,68 560,48 C740,28 980,12 1180,16 C1280,18 1370,26 1440,30 L1440,76 L0,76 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

/**
 * موجة سفلية: انتقال انسيابي ومكمل للموجة العلوية من الخلفية الداكنة (النبيتي) إلى الخلفية الفاتحة (الكريمي)
 */
export function WaveBottom({ className = "" }: WaveProps) {
  return (
    <div className={`-mt-px w-full overflow-hidden leading-none select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block h-7 w-full sm:h-12 md:h-16 lg:h-20"
      >
        <path
          d="M0,0 L1440,0 L1440,34 C1340,46 1200,64 1060,60 C880,54 700,20 520,18 C340,16 180,24 0,54 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
