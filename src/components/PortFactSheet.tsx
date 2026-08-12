import { PortSection } from "@/data/ports";
import ProjectBadge from "@/components/ProjectBadge";
import { useTr } from "@/lib/useTr";

const Line = ({ value }: { value?: string }) =>
  value ? <p className="text-sm font-light text-foreground/90 leading-relaxed">{value}</p> : null;

const PortFactSheet = ({ section }: { section: PortSection }) => {
  const { tr, trList } = useTr();
  const join = (list?: string[]) => trList(list)?.join(" · ");
  return (
    <article className="bg-card/40 border border-border rounded-lg p-8 md:p-10">
      {(section.subtitle || section.isProject) && (
        <header className="flex items-center justify-between flex-wrap gap-3 mb-6">
          {section.subtitle && (
            <h3 className="font-display text-xl md:text-2xl font-light">{tr(section.subtitle)}</h3>
          )}
          {section.isProject && <ProjectBadge />}
        </header>
      )}
      <div className="space-y-2">
        <Line value={tr(section.type)} />
        <Line value={section.coast ? tr(section.coast) : undefined} />
        <Line value={join(section.vessels)} />
        <Line value={join(section.facilities)} />
        <Line value={join(section.cargoes)} />
      </div>
      {section.highlights && section.highlights.length > 0 && (
        <div className="mt-6 space-y-2">
          {section.highlights.map((h) => (
            <p key={h} className="text-sm text-foreground/90 font-light leading-relaxed">
              {tr(h)}
            </p>
          ))}
        </div>
      )}
    </article>
  );
};

export default PortFactSheet;
