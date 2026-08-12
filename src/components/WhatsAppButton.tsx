import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useT } from "@/contexts/LanguageContext";

const WhatsAppButton = () => {
  const t = useT();
  return (
    <motion.a
      href="https://wa.me/59845449272"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("wa.aria")}
      data-cursor-hover
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring" }}
      className="fixed bottom-6 right-6 z-50"
    >
      <span className="relative flex">
        <span className="pulse-ring relative flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(142_70%_45%)] text-white shadow-2xl hover:scale-110 transition-transform">
          <MessageCircle className="w-6 h-6 relative z-10" strokeWidth={2} />
        </span>
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
