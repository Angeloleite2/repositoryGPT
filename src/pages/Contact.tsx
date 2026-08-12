import { useSeo } from "@/lib/useSeo";
import ContactSection from "@/components/ContactSection";
import OfficeCard from "@/components/OfficeCard";
import { offices } from "@/data/offices";
import { useT } from "@/contexts/LanguageContext";

const Contact = () => {
  const t = useT();
  useSeo(t("contact.eyebrow"), t("seo.contact.desc"));
  return (
    <div className="pt-20">
      <ContactSection />
      <section className="bg-background border-t border-border py-24 lg:py-32">
        <div className="container-luxury">
          <div className="max-w-3xl mb-16">
            <p className="text-eyebrow mb-6">{t("contact.offices.eyebrow")}</p>
            <h2 className="heading-display">
              {t("contact.offices.title1")}<br />
              <span className="italic text-secondary">{t("contact.offices.title2")}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {offices.map((o) => (
              <OfficeCard key={o.unit} office={o} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
