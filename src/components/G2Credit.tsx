import { shouldShowG2Credit } from "@/config/g2Credit";
import { useT } from "@/contexts/LanguageContext";

const G2Credit = () => {
  if (!shouldShowG2Credit()) {
    return null;
  }

  const t = useT();

  return (
    <span className="text-xs text-muted-foreground">
      {t("footer.g2.prefix")}{" "}
      <a
        href="https://www.g2agencia.com.br/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-secondary hover:text-secondary/80 transition-colors"
      >
        G2
      </a>
    </span>
  );
};

export default G2Credit;
