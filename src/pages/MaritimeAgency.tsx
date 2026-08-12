import { useSeo } from "@/lib/useSeo";
import { useT } from "@/contexts/LanguageContext";
import { useTr } from "@/lib/useTr";

const MaritimeAgency = () => {
  const t = useT();
  useSeo(t("mar.eyebrow"), t("seo.maritime.desc"));
  const { tr } = useTr();
  const services = Array.from({ length: 12 }, (_, i) => t(`mar.s.${i + 1}`));
  const portsServed = [
    { country: tr("Argentina"), detail: t("mar.coverage.national") },
    { country: tr("Uruguai"), detail: t("mar.coverage.national") },
    { country: tr("Paraguai"), detail: t("mar.coverage.national") },
    { country: tr("Brasil"), detail: "Porto Murtinho" },
    { country: tr("Espanha"), detail: "Cádiz, Motril" },
  ];


  return (
    <div className="pt-32 pb-24 bg-background">
      <div className="container-luxury max-w-5xl">
        <p className="text-eyebrow mb-6">{t("mar.eyebrow")}</p>
        <h1 className="heading-display mb-6">
          {t("mar.title1")}<br />
          <span className="italic text-secondary">{t("mar.title2")}</span>
        </h1>

        <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mb-12">
          {t("mar.lead")}
        </p>

        <p className="text-muted-foreground font-light leading-relaxed max-w-3xl mb-16">
          {t("mar.intro")}
        </p>

        <section className="mb-16">
          <p className="text-eyebrow mb-6">{t("mar.services.title")}</p>
          <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
            {services.map((s) => (
              <li key={s} className="flex items-start gap-3 text-sm text-foreground/90 font-light">
                <span className="text-secondary mt-1.5">·</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <p className="text-eyebrow mb-6">{t("mar.ports.title")}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portsServed.map((p) => (
              <div key={p.country} className="p-5 border border-border rounded-lg bg-card/30">
                <p className="font-display text-lg font-light">{p.country}</p>
                <p className="text-sm text-muted-foreground mt-1">{p.detail}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default MaritimeAgency;
