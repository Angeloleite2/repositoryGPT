import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "./components/Layout";
import Index from "./pages/Index.tsx";

const About = lazy(() => import("./pages/About.tsx"));
const Services = lazy(() => import("./pages/Services.tsx"));
const Operations = lazy(() => import("./pages/Operations.tsx"));
const PortDetail = lazy(() => import("./pages/PortDetail.tsx"));
const FreeZone = lazy(() => import("./pages/FreeZone.tsx"));
const MaritimeAgency = lazy(() => import("./pages/MaritimeAgency.tsx"));
const Downloads = lazy(() => import("./pages/Downloads.tsx"));
const News = lazy(() => import("./pages/News.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

/** Localized / legacy URLs that must not 404 (shared links, old menus). */
const ROUTE_ALIASES: Record<string, string> = {
  "/imprensa": "/novidades",
  "/prensa": "/novidades",
  "/press": "/novidades",
  "/press-center": "/novidades",
  "/news": "/novidades",
  "/noticias": "/novidades",
  "/recursos": "/materiais",
  "/resources": "/materiais",
  "/media": "/materiais",
  "/downloads": "/materiais",
  "/about": "/sobre",
  "/about-us": "/sobre",
  "/nosotros": "/sobre",
  "/services": "/servicos",
  "/servicios": "/servicos",
  "/operations": "/atuacoes",
  "/operaciones": "/atuacoes",
  "/ports": "/atuacoes",
  "/puertos": "/atuacoes",
  "/portos": "/atuacoes",
  "/free-zone": "/zona-franca",
  "/zona-libre": "/zona-franca",
  "/shipping-agency": "/agencia-maritima",
  "/agencia-naviera": "/agencia-maritima",
  "/maritime-agency": "/agencia-maritima",
  "/contact": "/contato",
  "/contact-us": "/contato",
  "/contacto": "/contato",
};


const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-secondary/30 border-t-secondary animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route
                path="/sobre"
                element={<Suspense fallback={<RouteFallback />}><About /></Suspense>}
              />
              <Route
                path="/servicos"
                element={<Suspense fallback={<RouteFallback />}><Services /></Suspense>}
              />
              <Route
                path="/atuacoes"
                element={<Suspense fallback={<RouteFallback />}><Operations /></Suspense>}
              />
              <Route
                path="/atuacoes/:slug"
                element={<Suspense fallback={<RouteFallback />}><PortDetail /></Suspense>}
              />
              <Route
                path="/zona-franca"
                element={<Suspense fallback={<RouteFallback />}><FreeZone /></Suspense>}
              />
              <Route
                path="/agencia-maritima"
                element={<Suspense fallback={<RouteFallback />}><MaritimeAgency /></Suspense>}
              />
              <Route
                path="/materiais"
                element={<Suspense fallback={<RouteFallback />}><Downloads /></Suspense>}
              />
              <Route
                path="/novidades"
                element={<Suspense fallback={<RouteFallback />}><News /></Suspense>}
              />
              <Route
                path="/contato"
                element={<Suspense fallback={<RouteFallback />}><Contact /></Suspense>}
              />
              {/* Legacy / localized URL aliases → canonical routes */}
              {Object.entries(ROUTE_ALIASES).map(([from, to]) => (
                <Route key={from} path={from} element={<Navigate to={to} replace />} />
              ))}
              <Route
                path="*"
                element={<Suspense fallback={<RouteFallback />}><NotFound /></Suspense>}
              />

            </Route>

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
