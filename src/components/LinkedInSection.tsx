import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, ExternalLink, ArrowUpRight } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import { useT } from "@/contexts/LanguageContext";
import { useTr } from "@/lib/useTr";


const LINKEDIN_URL = "https://www.linkedin.com/company/ptp-group-logistics/";
const LINKEDIN_BLUE = "#0A66C2";

const posts = [
  {
    image: "/images/linkedin/post-1.jpg",
    date: "05 Ago 2026",
    tags: ["#SeguridadPortuariaYFluvial", "#CrecimientoEconómico", "#Hidrovía"],
    title: "Seguridad portuaria y fluvial: eje del crecimiento económico regional",
    excerpt:
      "PTP Group participa del debate sobre seguridad portuaria y fluvial en la Hidrovía, un factor decisivo para la competitividad y el crecimiento económico de la región.",
    href: "https://www.linkedin.com/posts/seguridadportuariayfluvial-crecimientoeconaejmico-ugcPost-7490081304240324608-xwbr/",
  },
  {
    image: "/images/linkedin/post-2.jpg",
    date: "11 Jul 2026",
    tags: ["#Logística", "#Puertos", "#ComercioExterior"],
    title: "Hidrovía, puertos y comercio exterior: la red logística en movimiento",
    excerpt:
      "Logística, puertos y comercio exterior conectados a lo largo de la Hidrovía, con inversiones que fortalecen la cadena de suministro regional.",
    href: "https://www.linkedin.com/posts/logaedstica-puertos-comercioexterior-ugcPost-7481619135819476992-uWOz/",
  },
  {
    image: "/images/linkedin/post-3.jpg",
    date: "02 Jul 2026",
    tags: ["#Exportación", "#Inversiones", "#Mercados"],
    title: "Exportación e inversiones: competitividad para la internacionalización",
    excerpt:
      "Nuevos mercados, inversiones y competitividad: PTP Group acompaña la internacionalización de sus clientes con soluciones logísticas integradas.",
    href: "https://www.linkedin.com/posts/exportaciaejn-inversiones-mercados-ugcPost-7478673739505856512-Aqub/",
  },
];



const LinkedInSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const t = useT();
  const { tr } = useTr();

  return (
    <section
      id="novidades"
      ref={ref}
      className="bg-background py-24 lg:py-32 border-t border-border"
    >
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div className="max-w-2xl">
            <p className="text-eyebrow mb-6">{t("news.eyebrow")}</p>
            <h1 className="heading-display mb-4">
              {t("news.title.line1")}<br />
              <span className="italic text-secondary">{t("news.title.line2")}</span>
            </h1>
            <p className="text-muted-foreground font-light leading-relaxed max-w-md">
              {t("news.intro")}
            </p>
          </div>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="inline-flex items-center gap-3 text-sm hover:text-secondary transition-colors group"
          >
            <Linkedin className="w-5 h-5" />
            <span>{t("news.follow")}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((p, i) => (
            <motion.article
              key={p.href}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => window.open(p.href, "_blank", "noopener,noreferrer")}
              data-cursor-hover
              className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-secondary/40 transition-colors shadow-sm hover:shadow-2xl cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <SmartImage
                  src={p.image}
                  alt={p.title}
                  width={800}
                  height={600}
                  loading={i === 0 ? "eager" : "lazy"}
                  placeholder={
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted via-card to-background">
                      <Linkedin className="w-8 h-8" style={{ color: LINKEDIN_BLUE, opacity: 0.5 }} />
                    </div>
                  }
                  className="w-full h-full object-cover group-hover:scale-105 duration-700"
                />
              </div>


              <div className="flex flex-col flex-1 p-6 lg:p-7">
                <div className="flex items-center gap-2 mb-4">
                  <Linkedin
                    className="w-4 h-4"
                    style={{ color: LINKEDIN_BLUE }}
                  />
                  <span className="text-xs tracking-widest uppercase text-muted-foreground">
                    {tr(p.date)}
                  </span>
                </div>

                <h3 className="font-display text-xl font-light mb-3 leading-snug group-hover:text-secondary transition-colors">
                  {tr(p.title)}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                  {tr(p.excerpt)}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] tracking-wider uppercase px-2 py-1 rounded-full border border-border text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 text-xs tracking-[0.2em] uppercase text-white rounded-md transition-opacity hover:opacity-90"
                  style={{ backgroundColor: LINKEDIN_BLUE }}
                >
                  <Linkedin className="w-4 h-4" />
                  {t("news.viewOn")}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mt-16"
        >
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="group inline-flex items-center gap-3 px-8 py-5 text-sm tracking-[0.2em] uppercase text-white rounded-md shadow-lg hover:shadow-2xl transition-all"
            style={{ backgroundColor: LINKEDIN_BLUE }}
          >
            <Linkedin className="w-5 h-5" />
            {t("news.viewMore")}
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default LinkedInSection;
