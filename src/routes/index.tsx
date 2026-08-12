import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import App from "@/App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PTP Group | Portos e logística integrada" },
      {
        name: "description",
        content: "Rede internacional de portos, terminais, armazenagem e soluções logísticas integradas do PTP Group.",
      },
      { property: "og:title", content: "PTP Group | Portos e logística integrada" },
      {
        property: "og:description",
        content: "Rede internacional de portos, terminais, armazenagem e soluções logísticas integradas do PTP Group.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ptpgroup.com.ar/" }],
  }),
  component: ClientApp,
});

function ClientApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <App />;
}
