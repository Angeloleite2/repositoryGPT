import HeroVideo from "@/components/HeroVideo";
import StatsBar from "@/components/StatsBar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useT } from "@/contexts/LanguageContext";
import { lazy, Suspense, useEffect, useRef, useState } from "react";

const NetworkMap = lazy(() => import("@/components/NetworkMap"));

const DeferredGlobe = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current || visible) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [visible]);
  return (
    <div ref={ref} className="min-h-[40vh]">
      {visible && (
        <Suspense fallback={<div className="h-[60vh]" />}>
          <NetworkMap />
        </Suspense>
      )}
    </div>
  );
};

const Index = () => {
  const t = useT();
  return (
    <>
      <HeroVideo />

      <section className="bg-background py-24 lg:py-32 border-t border-border">
        <div className="container-luxury grid lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <p className="text-eyebrow mb-6">{t("home.about.eyebrow")}</p>
            <h1 className="heading-display">
              {t("home.about.title1")}<br />
              <span className="italic text-secondary">{t("home.about.title2")}</span>
            </h1>

          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 space-y-6 text-muted-foreground font-light leading-relaxed"
          >
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <Link
              to="/sobre"
              data-cursor-hover
              className="group inline-flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-secondary hover:gap-4 transition-all"
            >
              <span>{t("home.about.cta")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <StatsBar />
      <DeferredGlobe />

    </>
  );
};

export default Index;
