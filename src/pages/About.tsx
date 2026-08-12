import { useSeo } from "@/lib/useSeo";
import { motion } from "framer-motion";
import { useT } from "@/contexts/LanguageContext";

const About = () => {
  const t = useT();
  useSeo(t("about.eyebrow"), t("about.p1"));
  return (
    <div className="pt-32 pb-24 bg-background">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mb-20"
        >
          <p className="text-eyebrow mb-6">{t("about.eyebrow")}</p>
          <h1 className="heading-display mb-12">
            {t("about.title1")}<br />
            <span className="italic text-secondary">{t("about.title2")}</span>
          </h1>

          <div className="space-y-6 text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
            <p>{t("about.p4")}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
