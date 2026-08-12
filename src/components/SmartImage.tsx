import { useCallback, useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import { resolveAssetSrc } from "@/lib/asset-url";

type Props = {
  src: string;
  /** Optional lighter/alternative source tried before giving up on `src`. */
  fallbackSrc?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  priority?: boolean;
  /** Rendered when every attempt fails (or when no src is given). */
  placeholder?: React.ReactNode;
};

const MAX_RETRIES = 2;

const DefaultPlaceholder = (
  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted via-card to-background">
    <ImageOff className="w-7 h-7 text-secondary/40" aria-hidden />
  </div>
);

/**
 * Image with graceful degradation:
 *  - never hides a decoded image: `complete` is checked on every mount/attach,
 *    so cached images, bfcache restores and pre-hydration decodes still show
 *    (this used to leave an invisible <img> over a dark skeleton).
 *  - retries transient network failures with a cache-busting param
 *  - falls back to `fallbackSrc`, then to a branded placeholder — never an
 *    empty box or a broken-image icon.
 */
const SmartImage = ({
  src,
  fallbackSrc,
  alt,
  className = "",
  width,
  height,
  loading = "lazy",
  priority = false,
  placeholder = DefaultPlaceholder,
}: Props) => {
  const [current, setCurrent] = useState(resolveAssetSrc(src));
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(!src);
  const retries = useRef(0);
  const usedFallback = useRef(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    retries.current = 0;
    usedFallback.current = false;
    setCurrent(resolveAssetSrc(src));
    setLoaded(false);
    setFailed(!src);
  }, [src]);

  /** Sync state with the DOM: an already-decoded image must be visible. */
  const syncFromDom = useCallback((node: HTMLImageElement | null) => {
    if (!node) return;
    if (node.complete) {
      if (node.naturalWidth > 0) setLoaded(true);
      else if (node.currentSrc) setLoaded(true); // decoded, unknown intrinsic size
    }
  }, []);

  const attachRef = useCallback(
    (node: HTMLImageElement | null) => {
      imgRef.current = node;
      syncFromDom(node);
    },
    [syncFromDom],
  );

  // Safety net: after mount (and after any src change) re-check the DOM, and
  // reveal the image unconditionally shortly after so a missed event can never
  // leave a permanently blank frame.
  useEffect(() => {
    syncFromDom(imgRef.current);
    const raf = requestAnimationFrame(() => syncFromDom(imgRef.current));
    const timer = window.setTimeout(() => {
      syncFromDom(imgRef.current);
      setLoaded(true);
    }, 1200);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [current, syncFromDom]);

  const handleError = () => {
    const resolvedFallback = resolveAssetSrc(fallbackSrc);
    const resolvedSrc = resolveAssetSrc(src);

    if (resolvedFallback && !usedFallback.current && resolvedFallback !== resolvedSrc) {
      usedFallback.current = true;
      retries.current = 0;
      setCurrent(resolvedFallback);
      return;
    }
    if (retries.current < MAX_RETRIES) {
      retries.current += 1;
      const base = usedFallback.current && resolvedFallback ? resolvedFallback : resolvedSrc;
      const sep = base.includes("?") ? "&" : "?";
      // Small delay so a flaky network has time to recover.
      window.setTimeout(
        () => setCurrent(`${base}${sep}r=${retries.current}`),
        350 * retries.current,
      );
      return;
    }
    setFailed(true);
  };

  if (failed) {
    return <>{placeholder}</>;
  }

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" aria-hidden />
      )}
      <img
        ref={attachRef}
        src={current}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : loading}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
};

export default SmartImage;
