import { Clock, FacebookLogo, InstagramLogo, NavigationArrow, Phone, TiktokLogo, WhatsappLogo } from "@phosphor-icons/react";
import { HOUSE } from "@/data/menu";
import { WaveTop, WaveBottom } from "./WaveDivider";

const branches = [
  {
    id: "sea",
    index: "01",
    name: "فرع ش البحر",
    since: "الفرع الرئيسي",
    address: "بعد بنك الإسكندرية، بجوار مدرسة سمنود الثانوية بنين.",
    image: "/media/facade.jpg",
    alt: "فرع شارع البحر",
    map: "https://www.google.com/maps/search/?api=1&query=United+Caffeine+شارع+البحر+سمنود",
  },
  {
    id: "sahil",
    index: "02",
    name: "فرع ترعة الساحل",
    since: "الفرع الثاني",
    address: "بجوار ورشة السلاموني، محلات شركة بدر للدهانات.",
    image: "/media/branch-new.jpg",
    alt: "فرع ترعة الساحل",
    map: "https://www.google.com/maps/search/?api=1&query=United+Caffeine+ترعة+الساحل+سمنود",
  },
];

export function Houses() {
  return (
    <>
      <section id="branches" className="scroll-mt-[calc(4rem+env(safe-area-inset-top,0px))] bg-cream px-4 py-12 text-ink sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="font-latin text-[11px] tracking-[0.28em] text-wine">OUR BRANCHES</p>
          <h2 className="mt-2 text-4xl font-bold text-wine-deep sm:text-5xl">فروعنا في سمنود</h2>
          <p className="mt-3 max-w-md text-[15px] leading-8 text-ink-soft">
            شرفنا في أقرب فرع ليك، نفس الجودة والخدمة المميزة في الفرعين.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
            {branches.map((branch) => (
              <article key={branch.id} className="relative min-h-96 overflow-hidden rounded-2xl shadow-lg sm:min-h-[70svh] sm:rounded-3xl">
                <img src={branch.image} alt={branch.alt} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-deep via-wine-deep/30 to-transparent" />
                <div className="relative flex min-h-96 flex-col justify-end p-3 sm:min-h-[70svh] sm:p-5">
                  <span className="font-num text-xs font-bold tracking-[0.3em] text-gold-soft sm:text-sm">{branch.index}</span>
                  <h3 className="mt-1 text-xl font-bold text-cream sm:text-4xl">{branch.name}</h3>
                  <p className="text-[11px] font-medium text-gold sm:text-[13px]">{branch.since}</p>
                  <p className="mt-2 max-w-xs text-[11px] leading-5 text-white/85 sm:text-[14px] sm:leading-7">{branch.address}</p>
                  <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                    <a
                      href={branch.map}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 items-center gap-1.5 rounded-full bg-gold px-3 text-[11px] font-semibold text-wine-deep sm:h-11 sm:gap-2 sm:px-4 sm:text-[13px]"
                    >
                      <NavigationArrow size={15} />
                      الاتجاهات
                    </a>
                    <a
                      href={`tel:${HOUSE.phones[0].raw}`}
                      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-gold/40 bg-wine-deep/40 px-3 text-[11px] text-cream backdrop-blur-xs sm:h-11 sm:gap-2 sm:px-4 sm:text-[13px]"
                    >
                      <Phone size={15} />
                      اتصل
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* موجة علوية تنقل من قسم الفروع الفاتح إلى الفوتر النبيتي */}
      <WaveTop className="text-wine-deep bg-cream" />

      {/* قسم الفوتر والتواصل باللون النبيتي */}
      <section id="visit" className="scroll-mt-[calc(4rem+env(safe-area-inset-top,0px))] bg-wine-deep px-4 py-14 text-cream sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <div className="flex items-center gap-3.5 sm:block">
              <img
                src="/media/logo.jpg?v=2"
                alt="شعار يونايتد"
                className="h-20 w-20 shrink-0 rounded-2xl object-cover ring-1 ring-gold shadow-md sm:h-28 sm:w-28 sm:rounded-md"
              />
              <h2 className="text-2xl font-bold leading-tight text-gold-soft sm:mt-5 sm:text-5xl md:text-6xl">
                شرفنا بالزيارة أو اطلب دليفري
              </h2>
            </div>
            <p className="mt-3 max-w-md text-[13.5px] leading-6 text-cream/80 sm:text-[15px] sm:leading-8">
              تقدر تطلب أوردرك دليفري تليفونياً أو عبر واتساب، ومتوفرين أيضاً على تطبيق عناب في سمنود.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-wine/40 px-3.5 py-1.5 text-[12px] font-medium text-gold-soft sm:text-[13px]">
              <Clock size={14} className="shrink-0 text-gold" />
              مواعيد العمل: من ٤ عصراً حتى ٢ فجراً (الأحد إجازة)
            </p>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {HOUSE.phones.map((phone) => (
                <a
                  key={phone.raw}
                  href={`tel:${phone.raw}`}
                  className="flex h-12 items-center justify-center gap-1.5 rounded-full border border-gold/30 bg-wine/60 px-2 text-gold-soft transition-colors hover:border-gold hover:bg-wine sm:h-14 sm:gap-2 sm:px-4"
                >
                  <Phone size={16} className="shrink-0 text-gold" />
                  <span className="font-num text-[12.5px] font-bold tracking-tight text-gold-soft sm:text-base sm:tracking-wider" dir="ltr">
                    {phone.pretty}
                  </span>
                </a>
              ))}
            </div>
            <a
              href={`https://wa.me/${HOUSE.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-gold font-semibold text-wine-deep shadow-md transition-all hover:bg-gold-soft hover:shadow-lg sm:h-14"
            >
              <WhatsappLogo size={20} weight="fill" />
              اطلب عبر واتساب
            </a>
            <div className="flex justify-center gap-2 pt-2 sm:justify-start">
              <a
                href="https://instagram.com/UnitedCaffeine"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-gold/30 bg-wine/60 px-4 text-[13px] text-gold-soft transition-colors hover:border-gold hover:bg-wine hover:text-white"
              >
                <InstagramLogo size={16} />
                @UnitedCaffeine
              </a>
              <a
                href="https://www.tiktok.com/@UnitedCaffeine"
                target="_blank"
                rel="noreferrer"
                aria-label="تيك توك"
                className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-wine/60 text-gold-soft transition-colors hover:border-gold hover:bg-wine hover:text-white"
              >
                <TiktokLogo size={16} />
              </a>
              <a
                href="https://www.facebook.com/UnitedCaffeine"
                target="_blank"
                rel="noreferrer"
                aria-label="فيسبوك"
                className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-wine/60 text-gold-soft transition-colors hover:border-gold hover:bg-wine hover:text-white"
              >
                <FacebookLogo size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-gold/20 pt-5 text-[12px] text-cream/70">
          <span>© 2026 United Caffeine &amp; Dessert House</span>
          <span className="font-latin tracking-[0.2em] text-gold">SAMANOUD</span>
        </div>
      </section>
    </>
  );
}
