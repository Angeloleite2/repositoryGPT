import { useT, useLanguage } from "@/contexts/LanguageContext";

const ProjectBadge = ({ label }: { label?: string }) => {
  const t = useT();
  return (
    <span
      aria-label={t("badge.project.aria")}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-secondary/60 text-secondary text-[10px] tracking-[0.22em] uppercase rounded-full"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
      {label ?? t("badge.project")}
    </span>
  );
};

export default ProjectBadge;
