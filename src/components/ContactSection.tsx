import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { useT } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const MAX_MSG = 1500;
const RECIPIENT = "info@ptpgroup.com.ar";

const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined,
};

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const t = useT();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    if (honeypot) return; // bot trap
    setSending(true);

    const payload = {
      name: form.name.trim(),
      company: form.company.trim() || null,
      phone: form.phone.trim() || null,
      email: form.email.trim(),
      message: form.message.trim(),
    };

    let stored = false;
    let mailed = false;

    try {
      const { error } = await supabase.from("contact_messages").insert(payload);
      if (error) throw error;
      stored = true;
    } catch (err) {
      console.error("[contact] storage failed", err);
    }

    if (EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey) {
      try {
        await emailjs.send(
          EMAILJS.serviceId,
          EMAILJS.templateId,
          {
            to_email: RECIPIENT,
            from_name: payload.name,
            reply_to: payload.email,
            company: payload.company ?? "—",
            phone: payload.phone ?? "—",
            email: payload.email,
            message: payload.message,
          },
          { publicKey: EMAILJS.publicKey },
        );
        mailed = true;
      } catch (err) {
        console.error("[contact] email delivery failed", err);
      }
    } else {
      console.warn("[contact] EmailJS env vars missing — message stored only.");
    }

    setSending(false);

    if (stored || mailed) {
      toast.success(t("contact.toast.title"), { description: t("contact.toast.desc") });
      setForm({ name: "", company: "", phone: "", email: "", message: "" });
    } else {
      toast.error("Error", { description: "Please try again in a moment." });
    }
  };

  const fields = [
    { k: "name", label: t("contact.field.name"), type: "text" },
    { k: "company", label: t("contact.field.company"), type: "text" },
    { k: "phone", label: t("contact.field.phone"), type: "tel" },
    { k: "email", label: t("contact.field.email"), type: "email" },
  ];


  return (
    <section id="contato" ref={ref} className="bg-muted py-24 lg:py-32 border-t border-border">
      <div className="container-luxury grid lg:grid-cols-12 gap-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5"
        >
          <p className="text-eyebrow mb-6">{t("contact.eyebrow")}</p>
          <h1 className="heading-display mb-8">
            {t("contact.title.line1")}<br /><span className="italic text-secondary">{t("contact.title.line2")}</span>
          </h1>
          <p className="text-muted-foreground font-light leading-relaxed max-w-md whitespace-pre-line">
            {t("contact.intro")}
          </p>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 space-y-8"
        >
          {fields.map((f) => (
            <div key={f.k} className="border-b border-border pb-3 focus-within:border-secondary transition-colors">
              <label className="text-eyebrow block mb-2">{f.label}</label>
              <input
                required
                type={f.type}
                value={(form as Record<string, string>)[f.k]}
                onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                placeholder={f.k === "phone" ? t("contact.field.phone.placeholder") : undefined}
                className="w-full bg-transparent outline-none text-lg font-light placeholder:text-muted-foreground/50"
              />
            </div>
          ))}

          <div className="border-b border-border pb-3 focus-within:border-secondary transition-colors">
            <div className="flex items-baseline justify-between mb-2">
              <label className="text-eyebrow">{t("contact.field.message")}</label>
              <span className="text-[10px] text-muted-foreground tabular-nums">
                {form.message.length}/{MAX_MSG}
              </span>
            </div>
            <textarea
              required
              rows={4}
              maxLength={MAX_MSG}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-transparent outline-none text-lg font-light resize-y"
            />
          </div>

          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute left-[-9999px] w-px h-px opacity-0"
          />



          <button
            type="submit"
            disabled={sending}
            data-cursor-hover
            className="group inline-flex items-center gap-4 mt-4 text-sm tracking-[0.2em] uppercase border border-foreground py-5 px-8 hover:bg-foreground hover:text-background transition-all disabled:opacity-60"
          >
            <span>{t("contact.submit")}</span>
            {sending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            )}
          </button>

        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
