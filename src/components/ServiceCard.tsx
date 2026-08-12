import { motion } from "framer-motion";
import { Service } from "@/data/services";
import { useTr } from "@/lib/useTr";

const ServiceCard = ({ service, index = 0 }: { service: Service; index?: number }) => {
  const { tr } = useTr();
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
      className="border border-border bg-card/30 rounded-lg p-8 md:p-10 hover:border-secondary/60 transition-colors"
    >
      <div className="flex items-baseline gap-4 mb-6">
        <span className="text-xs text-muted-foreground tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-light">{tr(service.title)}</h3>
      </div>
      <p className="text-muted-foreground font-light leading-relaxed">{tr(service.description)}</p>
      {service.note && (
        <p className="mt-4 text-xs tracking-[0.2em] uppercase text-secondary">{tr(service.note)}</p>
      )}
    </motion.article>
  );
};

export default ServiceCard;
