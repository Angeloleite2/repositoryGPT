import { Mail, MapPin } from "lucide-react";
import { Office } from "@/data/offices";
import { useTr } from "@/lib/useTr";

const OfficeCard = ({ office }: { office: Office }) => {
  const { tr } = useTr();
  return (
    <article className="border border-border rounded-lg p-8 bg-card/30 hover:bg-card/60 transition-colors h-full flex flex-col">
      <header className="flex items-center gap-3 mb-6">
        <span className="text-3xl" aria-hidden>
          {office.flag}
        </span>
        <div>
          <p className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
            {tr(office.country)}
          </p>
          <h3 className="font-display text-xl font-light">{office.unit}</h3>
        </div>
      </header>

      <a
        href={`mailto:${office.email}`}
        data-cursor-hover
        className="inline-flex items-center gap-2 text-sm text-secondary hover:underline mb-6 break-all"
      >
        <Mail className="w-3.5 h-3.5 shrink-0" /> {office.email}
      </a>

      <ul className="space-y-4 mt-auto">
        {office.addresses.map((a) => (
          <li key={a.city} className="flex items-start gap-3 text-sm text-foreground/90 font-light">
            <MapPin className="w-3.5 h-3.5 mt-1 text-secondary shrink-0" />
            <div>
              <p className="font-medium">{a.city}</p>
              <p className="text-muted-foreground">{a.address}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default OfficeCard;
