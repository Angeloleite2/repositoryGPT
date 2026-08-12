import { Linkedin, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useT } from "@/contexts/LanguageContext";
import { useTr } from "@/lib/useTr";
import G2Credit from "@/components/G2Credit";

const Footer = () => {
  const t = useT();
  const { tr } = useTr();
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container-luxury">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo-white.png"
                alt="PTP Group"
                className="h-10 w-auto object-contain"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
              />
            </div>
            <p className="text-muted-foreground font-light max-w-md leading-relaxed">
              {t("footer.about")}
            </p>
          </div>

          <div>
            <p className="text-eyebrow mb-4">{t("footer.nav")}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/sobre" className="hover:text-secondary transition-colors">{t("nav.about")}</Link></li>
              <li><Link to="/servicos" className="hover:text-secondary transition-colors">{t("nav.services")}</Link></li>
              <li><Link to="/atuacoes" className="hover:text-secondary transition-colors">{t("nav.operations")}</Link></li>
              <li><Link to="/zona-franca" className="hover:text-secondary transition-colors">{t("nav.freezone")}</Link></li>
              <li><Link to="/agencia-maritima" className="hover:text-secondary transition-colors">{t("nav.maritime")}</Link></li>
              <li><Link to="/contato" className="hover:text-secondary transition-colors">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-eyebrow mb-4">{t("footer.units")}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="text-secondary/70 text-[10px] tracking-widest mr-2">AR</span>{tr("Argentina")}</li>
              <li><span className="text-secondary/70 text-[10px] tracking-widest mr-2">BR</span>{tr("Brasil")}</li>
              <li><span className="text-secondary/70 text-[10px] tracking-widest mr-2">PY</span>{tr("Paraguay")}</li>
              <li><span className="text-secondary/70 text-[10px] tracking-widest mr-2">UY</span>{tr("Uruguay")}</li>
              <li><span className="text-secondary/70 text-[10px] tracking-widest mr-2">ES</span>{tr("España")}</li>
              <li><span className="text-secondary/70 text-[10px] tracking-widest mr-2">NL</span>{tr("Netherlands")}</li>
            </ul>
          </div>

          <div>
            <p className="text-eyebrow mb-4">{t("footer.contact")}</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> info@ptpgroup.com.ar</li>
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Buenos Aires · Argentina</li>
              <li>
                <a
                  href="https://uy.linkedin.com/company/ptp-group-logistics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-secondary transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" /> @ptp-group-logistics
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="hairline mb-6" />
        <div className="flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} PTP Group. {t("footer.rights")}</p>
          <p>{t("footer.craft")}</p>
          <G2Credit />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
