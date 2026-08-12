import { useSeo } from "@/lib/useSeo";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { getPort } from "@/data/ports";
import PortFactSheet from "@/components/PortFactSheet";
import ProjectBadge from "@/components/ProjectBadge";
import SmartImage from "@/components/SmartImage";
import { resolveAssetSrc } from "@/lib/asset-url";

import { useT } from "@/contexts/LanguageContext";
import { useTr } from "@/lib/useTr";

const PortDetail = () => {
  const { slug = "" } = useParams();
  const port = getPort(slug);
  const t = useT();
  const { tr } = useTr();
  const [lightbox, setLightbox] = useState<string | null>(null);

  useSeo(
    port
      ? `${tr(port.name)} | ${tr(port.sections[0]?.type ?? "")} | PTP Group`
      : "PTP Group",
    port
      ? [
          `${tr(port.city)} · ${tr(port.country)}`,
          port.intro ? tr(port.intro) : "",
          (port.sections[0]?.highlights ?? []).slice(0, 3).map(tr).join(" · "),
        ]
          .filter(Boolean)
          .join(" — ")
          .slice(0, 300)
      : "",
  );


  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  if (!port) {
    return (
      <div className="pt-40 pb-24 container-luxury">
        <p className="text-eyebrow mb-4">{t("port.notfound.eyebrow")}</p>
        <h1 className="heading-display mb-8">{t("port.notfound.title")}</h1>
        <Link to="/atuacoes" className="text-secondary hover:underline">
          ← {t("port.back")}
        </Link>
      </div>
    );
  }

  const name = tr(port.name);

  return (
    <div className="pb-24 bg-background">
      {port.cover && (
        <div className="relative w-full overflow-hidden bg-background">
          <SmartImage
            src={port.cover}
            fallbackSrc={port.thumb}
            alt={name}
            width={1920}
            height={1080}
            priority
            className="w-full h-auto max-h-[70vh] object-contain object-center"
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>
      )}


      <div className={port.cover ? "pt-10 relative" : "pt-32"}>
        <div className="container-luxury">
          <Link
            to="/atuacoes"
            data-cursor-hover
            className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-muted-foreground hover:text-secondary transition-colors mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> {t("port.back")}
          </Link>

          <header className="max-w-4xl mb-16">
            <div className="flex items-center gap-3 mb-6">
              <p className="text-eyebrow">{tr(port.country)}</p>
              {port.isProject && <ProjectBadge />}
            </div>
            <h1 className="heading-display mb-6">{name}</h1>
            {port.intro && (
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                {tr(port.intro)}
              </p>
            )}
            {port.projectNote && (
              <div
                role="note"
                className="mt-6 p-5 border border-secondary/40 bg-secondary/5 rounded-lg text-sm text-foreground/90 font-light"
              >
                {tr(port.projectNote)}
              </div>
            )}
          </header>

          <div className="space-y-8 max-w-4xl">
            {port.sections.map((s, i) => (
              <PortFactSheet key={i} section={s} />
            ))}
          </div>

          {port.gallery && port.gallery.length > 0 && (
            <div className="mt-16 max-w-4xl">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {port.gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    data-cursor-hover
                    onClick={() => setLightbox(src)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted"
                  >
                    <SmartImage
                      src={src}
                      alt={`${name} — ${i + 1}`}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-105 duration-700"
                    />

                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={name}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-secondary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={resolveAssetSrc(lightbox)}
            alt={name}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default PortDetail;
