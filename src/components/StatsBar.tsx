import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useT } from "@/contexts/LanguageContext";

const StatsBar = () => {
  const t = useT();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const stats = [
    { value: "6", label: t("stats.countries") },
    { value: "22", label: t("stats.ports") },
    { value: "+50", label: t("stats.hectares") },
    { value: "2010", label: t("stats.since") },
  ];
  return (
    <section ref={ref} className="bg-background border-t border-b border-border py-16">
      <div className="container-luxury grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className="flex flex-col"
          >
            <span className="font-display text-5xl md:text-6xl font-light text-secondary tabular-nums">
              {s.value}
            </span>
            <span className="text-eyebrow mt-3">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
