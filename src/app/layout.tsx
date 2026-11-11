import type { Metadata, Viewport } from "next";
import { Alexandria, Amiri, Cinzel, Playfair_Display } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  variable: "--font-amiri-face",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

const alexandria = Alexandria({
  variable: "--font-alexandria-face",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel-face",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-numbers-face",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#3A0D14",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "يونايتد كافيه | United — قهوة وحلويات في سمنود",
  description:
    "يونايتد كافيه في سمنود منذ 2020. استمتع بأفضل قهوة وحلويات في فرعينا (ش البحر وترعة الساحل)، أو اطلب مباشرة عبر واتساب.",
  keywords: [
    "يونايتد",
    "United",
    "كافيه سمنود",
    "يونايتد كافيه",
    "قهوة سمنود",
    "United Caffeine",
  ],
  openGraph: {
    title: "يونايتد كافيه | قهوة وحلويات — سمنود",
    description: "أفضل قهوة وحلويات في سمنود منذ 2020. تصفح المنيو واطلب أونلاين.",
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${amiri.variable} ${alexandria.variable} ${cinzel.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream text-ink selection:bg-wine selection:text-gold-soft">
        {children}
      </body>
    </html>
  );
}
