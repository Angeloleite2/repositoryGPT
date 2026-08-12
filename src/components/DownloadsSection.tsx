import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileDown, ArrowUpRight, PlayCircle } from "lucide-react";
import { useT } from "@/contexts/LanguageContext";

type VideoItem = {
  id: string;
  driveId: string;
  titleKey: string;
  descKey: string;
  flag: string;
};

const videos: VideoItem[] = [
  {
    id: "eng",
    driveId: "19YsNdVLxv8bHyaxPfkr2VS5Q24X_DtX0",
    titleKey: "dl.video.eng.title",
    descKey: "dl.video.eng.desc",
    flag: "🇬🇧",
  },
  {
    id: "esp",
    driveId: "1zkC307GHhRkaJxZv6TEFMP6JkTf81F_N",
    titleKey: "dl.video.esp.title",
    descKey: "dl.video.esp.desc",
    flag: "🇪🇸",
  },
  {
    id: "por",
    driveId: "1xQUdIu-lPB3XAiGlpRXMow075yMOhl0k",
    titleKey: "dl.video.por.title",
    descKey: "dl.video.por.desc",
    flag: "🇧🇷",
  },
];

const DownloadsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const t = useT();

  return (
    <section id="materiais" ref={ref} className="bg-muted py-24 lg:py-32 border-t border-border">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-3xl"
        >
          <p className="text-eyebrow mb-6">{t("dl.eyebrow")}</p>
          <h1 className="heading-display">
            {t("dl.title.line1")}<br /><span className="italic text-secondary">{t("dl.title.line2")}</span>
          </h1>
        </motion.div>

        {/* Brochure */}
        <div className="grid md:grid-cols-1 gap-6 max-w-2xl mb-20">
          <motion.a
            href="/downloads/PTP_Brochure_POR.pdf"
            download
            data-cursor-hover
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative bg-background border border-border p-10 lg:p-14 overflow-hidden"
          >
            <FileDown className="w-10 h-10 text-secondary mb-12" strokeWidth={1.25} />
            <p className="text-eyebrow mb-3">{t("dl.size")}</p>
            <h3 className="font-display text-2xl md:text-3xl font-light mb-2">{t("dl.brochure.title")}</h3>
            <p className="text-muted-foreground text-sm mb-8">{t("dl.brochure.desc")}</p>
            <div className="flex items-center gap-3 text-sm font-medium group-hover:text-secondary transition-colors">
              <span>{t("dl.download")}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </motion.a>
        </div>

        {/* Videos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10"
        >
          <p className="text-eyebrow mb-3">{t("dl.videos.eyebrow")}</p>
          <div className="h-px w-16 bg-secondary/60" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {videos.map((v, i) => (
            <motion.a
              key={v.id}
              href={`https://drive.google.com/file/d/${v.driveId}/view`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="group relative bg-background border border-border p-8 lg:p-10 overflow-hidden flex flex-col"
            >
              <div className="flex items-start justify-between mb-10">
                <PlayCircle className="w-10 h-10 text-secondary" strokeWidth={1.25} />
                <span className="text-2xl leading-none" aria-hidden>{v.flag}</span>
              </div>
              <p className="text-eyebrow mb-3">{t("dl.videos.size")}</p>
              <h3 className="font-display text-xl md:text-2xl font-light mb-2">{t(v.titleKey)}</h3>
              <p className="text-muted-foreground text-sm mb-8 flex-1">{t(v.descKey)}</p>
              <div className="flex items-center gap-3 text-sm font-medium group-hover:text-secondary transition-colors">
                <span>{t("dl.video.watch")}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;
