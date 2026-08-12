import LinkedInSection from "@/components/LinkedInSection";
import { useT } from "@/contexts/LanguageContext";
import { useSeo } from "@/lib/useSeo";

const News = () => {
  const t = useT();
  useSeo(t("nav.news"), t("news.intro"));
  return (
    <div className="pt-20">
      <LinkedInSection />
    </div>
  );
};

export default News;
