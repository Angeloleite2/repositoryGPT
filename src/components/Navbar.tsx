import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage, langMeta } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const location = useLocation();
  const { lang, cycleLang, t } = useLanguage();
  const current = langMeta[lang];

  const links = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.about"), to: "/sobre" },
    { label: t("nav.services"), to: "/servicos" },
    { label: t("nav.operations"), to: "/atuacoes" },
    { label: t("nav.freezone"), to: "/zona-franca" },
    { label: t("nav.maritime"), to: "/agencia-maritima" },
    { label: t("nav.resources"), to: "/materiais" },
    { label: t("nav.news"), to: "/novidades" },
    { label: t("nav.contact"), to: "/contato" },
  ];

  useMotionValueEvent(scrollYProgress, "change", (v) => setScrolled(v > 0.02));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-secondary origin-left z-[60]"
      />
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || !isHome ? "bg-background/90 backdrop-blur-xl border-b border-border" : "bg-gradient-to-b from-background/70 to-transparent backdrop-blur-sm"}`}>
        <div className="container-luxury flex items-center justify-between gap-4 h-20">
          <Link to="/" data-cursor-hover className="flex shrink-0 items-center gap-3 group">
            <img
              src="/logo-white.png"
              alt="PTP Group"
              className="h-9 md:h-10 w-auto object-contain"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
            />
          </Link>

          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">

            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                data-cursor-hover
                className={({ isActive }) =>
                  `text-xs tracking-[0.2em] uppercase font-medium whitespace-nowrap transition-colors ${
                    isActive ? "text-secondary" : "text-foreground/85 hover:text-secondary"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={cycleLang}
              data-cursor-hover
              aria-label={`Idioma: ${current.label}. Trocar idioma`}
              title={current.label}
              className="hidden sm:flex items-center px-3 py-1.5 border border-border rounded-full text-xs tracking-[0.2em] uppercase text-foreground/85 hover:text-secondary hover:border-secondary transition-colors"
            >
              <span>{current.code}</span>
            </button>
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="xl:hidden text-foreground" data-cursor-hover>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 bg-background xl:hidden flex flex-col items-center justify-center gap-8"
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `font-display text-3xl font-light transition-colors ${
                  isActive ? "text-secondary" : "hover:text-secondary"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <button
            onClick={cycleLang}
            className="mt-6 inline-flex items-center px-4 py-2 border border-border rounded-full text-xs tracking-[0.2em] uppercase text-muted-foreground"
          >
            <span>{current.code}</span>
          </button>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
