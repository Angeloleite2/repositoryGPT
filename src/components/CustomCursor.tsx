import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom stylized arrow cursor inspired by the PTP star/compass mark.
 * Sharp triangular arrowhead in brand orange with a thin tail and soft glow.
 */
const CustomCursor = () => {
  const [hidden, setHidden] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const sy = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px), (pointer: coarse)").matches) {
      setHidden(true);
      return;
    }

    document.documentElement.classList.add("ptp-cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest(
          "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
        )
      );
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const out = () => setHidden(true);
    const over = () => setHidden(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", out);
    document.addEventListener("mouseenter", over);
    return () => {
      document.documentElement.classList.remove("ptp-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", out);
      document.removeEventListener("mouseenter", over);
    };
  }, [x, y]);

  if (hidden) return null;

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
    >
      <motion.div
        animate={{
          scale: clicking ? 0.85 : hovering ? 1.25 : 1,
          rotate: hovering ? -12 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformOrigin: "2px 2px" }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_8px_hsl(var(--secondary)/0.55)]"
        >
          {/* outer arrowhead */}
          <path
            d="M2 2 L24 14 L14 16 L12 26 Z"
            fill="hsl(var(--secondary))"
            stroke="hsl(var(--background))"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          {/* inner shard echoing the PTP star facets */}
          <path
            d="M2 2 L16 11 L13 13 Z"
            fill="hsl(var(--background))"
            opacity="0.85"
          />
          {/* tiny spark at tip */}
          <circle cx="2" cy="2" r="1.2" fill="hsl(var(--secondary))" />
        </svg>
      </motion.div>

      {/* hover halo */}
      <motion.div
        animate={{
          opacity: hovering ? 1 : 0,
          scale: hovering ? 1 : 0.4,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute -top-3 -left-3 w-10 h-10 rounded-full border border-secondary/60"
      />
    </motion.div>
  );
};

export default CustomCursor;
