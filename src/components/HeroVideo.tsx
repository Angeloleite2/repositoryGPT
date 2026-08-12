import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useT } from "@/contexts/LanguageContext";

const HERO_VIDEO_SRC = "/hero-video.mp4";
const HERO_POSTER_SRC = "/hero-poster.jpg";

const HeroVideo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const t = useT();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.35, 0.7, 1]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Force eager autoplay as soon as enough data is buffered
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    let resume: (() => void) | undefined;
    const tryPlay = () => {
      v.play().catch(() => {
        // Autoplay blocked — retry on first user interaction
        resume = () => {
          v.play().finally(() => {
            if (resume) {
              window.removeEventListener("pointerdown", resume);
              window.removeEventListener("touchstart", resume);
            }
          });
        };
        window.addEventListener("pointerdown", resume, { once: true });
        window.addEventListener("touchstart", resume, { once: true });
      });
    };
    v.load();
    if (v.readyState >= 2) tryPlay();
    else v.addEventListener("loadeddata", tryPlay, { once: true });
    return () => {
      v.removeEventListener("loadeddata", tryPlay);
      if (resume) {
        window.removeEventListener("pointerdown", resume);
        window.removeEventListener("touchstart", resume);
      }
    };
  }, []);

  return (
    <section ref={ref} id="home" className="relative h-screen w-full overflow-hidden bg-background">
      <img
        src={HERO_POSTER_SRC}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <motion.div style={{ scale }} className="absolute inset-0">
        {!hasError && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={HERO_POSTER_SRC}
            onLoadedData={() => setIsLoaded(true)}
            onCanPlay={() => setIsLoaded(true)}
            onPlaying={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        )}

      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-background pointer-events-none"
      />
      {/* Soft fade-to-background mask at the bottom for seamless section transition */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />

      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-foreground/70"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">{t("hero.scroll")}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroVideo;
