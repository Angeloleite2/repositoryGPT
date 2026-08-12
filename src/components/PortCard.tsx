import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Anchor } from "lucide-react";
import { Port } from "@/data/ports";
import ProjectBadge from "@/components/ProjectBadge";
import SmartImage from "@/components/SmartImage";
import { useT } from "@/contexts/LanguageContext";
import { useTr } from "@/lib/useTr";

const PortCard = ({ port, index = 0 }: { port: Port; index?: number }) => {
  const t = useT();
  const { tr } = useTr();

  const placeholder = (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted via-card to-background">
      <Anchor className="w-8 h-8 text-secondary/40" aria-hidden />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
    >
      <Link
        to={`/atuacoes/${port.slug}`}
        data-cursor-hover
        className="group flex flex-col border border-border bg-card/30 hover:bg-card/60 hover:border-secondary/60 transition-all rounded-lg h-full overflow-hidden"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {port.cover || port.thumb ? (
            <SmartImage
              src={port.thumb ?? port.cover!}
              fallbackSrc={port.cover}
              alt={tr(port.name)}
              width={800}
              height={450}
              loading={index < 4 ? "eager" : "lazy"}
              placeholder={placeholder}
              className="w-full h-full object-cover object-bottom group-hover:scale-105 duration-700"
            />
          ) : (
            placeholder
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent pointer-events-none" />
          {port.isProject && (
            <span className="absolute top-4 right-4">
              <ProjectBadge />
            </span>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">

          <p className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2">
            {tr(port.country)}
          </p>
          <h3 className="font-display text-xl md:text-2xl font-light mb-3 group-hover:text-secondary transition-colors">
            {tr(port.name)}
          </h3>

          <p className="flex items-start gap-2 text-[10px] tracking-[0.18em] uppercase text-secondary leading-tight mb-3">
            <Anchor className="w-3 h-3 shrink-0 mt-0.5" aria-hidden />
            <span>
              {port.sections
                .slice(0, 3)
                .map((s) => tr(s.type))
                .join(" · ")}
            </span>
          </p>

          {(() => {
            const topics = port.sections
              .flatMap((s) => (s.highlights ?? []).slice(0, 2))
              .slice(0, 3);
            if (!topics.length) return null;
            return (
              <ul className="space-y-1 mb-6">
                {topics.map((h) => (
                  <li key={h} className="flex gap-2 text-xs text-muted-foreground font-light">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-secondary" />
                    <span className="line-clamp-2">{tr(h)}</span>
                  </li>
                ))}
              </ul>
            );
          })()}

          <div className="mt-auto flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground group-hover:text-secondary transition-colors">
            <span>{t("ops.list.view")}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

      </Link>
    </motion.div>
  );
};

export default PortCard;
