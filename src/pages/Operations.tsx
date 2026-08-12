import { useSeo } from "@/lib/useSeo";
import PortCard from "@/components/PortCard";
import { ports } from "@/data/ports";
import { useT } from "@/contexts/LanguageContext";

const Operations = () => {
  const t = useT();
  useSeo(t("ops.list.eyebrow"), t("ops.list.intro"));
  return (
    <div className="pt-20">
      <section className="bg-background border-t border-border py-24 lg:py-32">
        <div className="container-luxury">
          <div className="max-w-3xl mb-16">
            <p className="text-eyebrow mb-6">{t("ops.list.eyebrow")}</p>
            <h1 className="heading-display">
              {t("ops.list.title1")}<br />
              <span className="italic text-secondary">{t("ops.list.title2")}</span>
            </h1>

            <p className="mt-8 text-muted-foreground font-light leading-relaxed max-w-2xl">
              {t("ops.list.intro")}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {ports.map((p, i) => (
              <PortCard key={p.slug} port={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Operations;
