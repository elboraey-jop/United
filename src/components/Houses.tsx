import { FacebookLogo, InstagramLogo, NavigationArrow, Phone, TiktokLogo, WhatsappLogo } from "@phosphor-icons/react";
import { HOUSE } from "@/data/menu";

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
      <section id="branches" className="scroll-mt-[calc(4rem+env(safe-area-inset-top,0px))] bg-wine-deep px-4 py-14 text-cream sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-latin text-[11px] tracking-[0.28em] text-gold">OUR BRANCHES</p>
          <h2 className="mt-2 text-4xl font-bold sm:text-5xl">فروعنا في سمنود</h2>
          <p className="mt-3 max-w-md text-[15px] leading-8 text-white/75">
            شرفنا في أقرب فرع ليك، نفس الجودة والخدمة المميزة في الفرعين.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
            {branches.map((branch) => (
              <article key={branch.id} className="relative min-h-96 overflow-hidden rounded-2xl sm:min-h-[70svh] sm:rounded-3xl">
                <img src={branch.image} alt={branch.alt} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-deep via-wine-deep/20 to-transparent" />
                <div className="relative flex min-h-96 flex-col justify-end p-3 sm:min-h-[70svh] sm:p-5">
                  <span className="font-num text-xs font-bold tracking-[0.3em] text-gold-soft sm:text-sm">{branch.index}</span>
                  <h3 className="mt-1 text-xl font-bold sm:text-4xl">{branch.name}</h3>
                  <p className="text-[11px] font-medium text-gold sm:text-[13px]">{branch.since}</p>
                  <p className="mt-2 max-w-xs text-[11px] leading-5 text-white/80 sm:text-[14px] sm:leading-7">{branch.address}</p>
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
                      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-gold/40 px-3 text-[11px] sm:h-11 sm:gap-2 sm:px-4 sm:text-[13px]"
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

      <section id="visit" className="scroll-mt-[calc(4rem+env(safe-area-inset-top,0px))] bg-wine-deep px-4 py-14 text-cream sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <img src="/media/logo.jpg?v=2" alt="شعار يونايتد" className="h-28 w-28 rounded-md object-cover ring-1 ring-gold" />
            <h2 className="mt-5 text-4xl font-bold sm:text-6xl">شرفنا بالزيارة أو اطلب دليفري</h2>
            <p className="mt-3 max-w-md text-[15px] leading-8 text-white/70">
              تقدر تطلب أوردرك دليفري تليفونياً أو عبر واتساب، ومتوفرين أيضاً على تطبيق عناب في سمنود.
            </p>
          </div>
          <div className="space-y-3">
            {HOUSE.phones.map((phone) => (
              <a
                key={phone.raw}
                href={`tel:${phone.raw}`}
                className="flex h-14 items-center justify-between rounded-2xl border border-white/15 px-4"
              >
                <span className="flex items-center gap-2 text-gold-soft">
                  <Phone size={18} />
                  اتصل بنا
                </span>
                <span className="font-num text-lg font-bold tracking-wider" dir="ltr">
                  {phone.pretty}
                </span>
              </a>
            ))}
            <a
              href={`https://wa.me/${HOUSE.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gold font-semibold text-wine-deep"
            >
              <WhatsappLogo size={20} weight="fill" />
              اطلب عبر واتساب
            </a>
            <div className="flex gap-2 pt-2">
              <a
                href="https://instagram.com/UnitedCaffeine"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-[13px]"
              >
                <InstagramLogo size={16} />
                @UnitedCaffeine
              </a>
              <a
                href="https://www.tiktok.com/@UnitedCaffeine"
                target="_blank"
                rel="noreferrer"
                aria-label="تيك توك"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15"
              >
                <TiktokLogo size={16} />
              </a>
              <a
                href="https://www.facebook.com/UnitedCaffeine"
                target="_blank"
                rel="noreferrer"
                aria-label="فيسبوك"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15"
              >
                <FacebookLogo size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-[12px] text-white/50">
          <span>© 2026 United Caffeine &amp; Dessert House</span>
          <span className="font-latin tracking-[0.2em]">SAMANOUD</span>
        </div>
      </section>
    </>
  );
}
