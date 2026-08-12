import { useSeo } from "@/lib/useSeo";
import { useT } from "@/contexts/LanguageContext";

const FreeZone = () => {
  const t = useT();
  useSeo(t("fz.eyebrow"), t("fz.p1"));

  return (
    <div className="pt-32 pb-24 bg-background">
      <div className="container-luxury max-w-5xl">
        <p className="text-eyebrow mb-6">{t("fz.eyebrow")}</p>
        <h1 className="heading-display mb-6">
          {t("fz.title1")}<br />
          <span className="italic text-secondary">{t("fz.title2")}</span>
        </h1>

        <div className="text-sm text-muted-foreground mb-12">
          <p><span className="text-eyebrow mr-2">{t("fz.label.location")}</span> {t("fz.location")}</p>
        </div>

        <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed mb-16">
          <p>{t("fz.p1")}</p>
          <p>{t("fz.p2")}</p>
        </div>

        <blockquote className="border-l-2 border-secondary pl-6 py-4 mb-16">
          <p className="font-display text-2xl md:text-3xl font-light italic text-foreground">
            {t("fz.quote")}
          </p>
        </blockquote>

      </div>
    </div>
  );
};

export default FreeZone;
