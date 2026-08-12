import DownloadsSection from "@/components/DownloadsSection";
import { useT } from "@/contexts/LanguageContext";
import { useSeo } from "@/lib/useSeo";

const Downloads = () => {
  const t = useT();
  useSeo(t("dl.eyebrow"), t("seo.downloads.desc"));
  return (
    <div className="pt-20">
      <DownloadsSection />
    </div>
  );
};

export default Downloads;
