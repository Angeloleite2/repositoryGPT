import { useSeo } from "@/lib/useSeo";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";
import { useT } from "@/contexts/LanguageContext";

const Services = () => {
  const t = useT();
  useSeo(t("services.eyebrow"), t("seo.services.desc"));
  return (
    <div className="pt-32 pb-24 bg-background">
      <div className="container-luxury">
        <div className="max-w-3xl mb-16">
          <p className="text-eyebrow mb-6">{t("services.eyebrow")}</p>
          <h1 className="heading-display">
            {t("services.title1")}<br />
            <span className="italic text-secondary">{t("services.title2")}</span>
          </h1>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
