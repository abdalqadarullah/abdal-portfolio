"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Loader2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Checkbox } from "@/components/ui/checkbox";
import { cta } from "@/data/content";

/**
 * CTA — "LET'S WORK TOGETHER." section.
 *
 * Client component because of:
 * - Form state (name, email, message, consent, status)
 * - EmailJS client-side send (no backend)
 *
 * EmailJS env vars (NEXT_PUBLIC_EMAILJS_*) are read at build time. If any is
 * empty, the form degrades gracefully — submit returns a friendly error and
 * suggests WhatsApp instead.
 */

type Status = "idle" | "loading" | "success" | "error";

export function CTA() {
  const WhatsappIcon = cta.whatsapp.icon;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const emailjsConfigured = Boolean(serviceId && templateId && publicKey);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setStatus("loading");
    setStatusMessage("");

    if (!emailjsConfigured) {
      setStatus("error");
      setStatusMessage(
        "Form email belum dikonfigurasi. Silakan hubungi via WhatsApp."
      );
      return;
    }

    try {
      await emailjs.send(
        serviceId!,
        templateId!,
        {
          from_name: name,
          from_email: email,
          message,
        },
        publicKey!
      );
      setStatus("success");
      setStatusMessage(cta.form.successMessage);
      setName("");
      setEmail("");
      setMessage("");
      setConsent(false);
    } catch (err) {
      console.error("[CTA] EmailJS error:", err);
      setStatus("error");
      setStatusMessage(cta.form.errorMessage);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[#D4FF00] text-[#0A0A0A] border-y-2 border-[#0A0A0A]"
    >
      <div className="container-brutal py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: heading + WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#0A0A0A]" />
              <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#0A0A0A]/70">
                Kontak
              </span>
            </div>
            <h2 className="font-heading text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] text-[#0A0A0A] mb-6">
              {cta.heading}
            </h2>
            <p className="font-body text-base text-[#0A0A0A]/70 leading-relaxed mb-8 max-w-md">
              {cta.subheading}
            </p>

            {/* WhatsApp quick button */}
            <a
              href={cta.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0A0A0A] text-[#D4FF00] font-body font-bold text-xs uppercase tracking-[0.1em] hover:bg-[#FAFAFA] hover:text-[#0A0A0A] transition-colors border-2 border-[#0A0A0A]"
            >
              <WhatsappIcon className="w-4 h-4" strokeWidth={2.2} />
              {cta.whatsapp.label}
              <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
            </a>
            <div className="mt-3 font-body text-xs text-[#0A0A0A]/60">
              {cta.whatsapp.display}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#FAFAFA] border-2 border-[#0A0A0A] p-6 md:p-8 lg:p-10 shadow-brutal"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="cta-name"
                    className="block font-body text-[10px] font-bold uppercase tracking-[0.15em] text-[#0A0A0A]/70 mb-2"
                  >
                    {cta.form.nameLabel}
                  </label>
                  <input
                    id="cta-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={cta.form.namePlaceholder}
                    className="input-brutal"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="cta-email"
                    className="block font-body text-[10px] font-bold uppercase tracking-[0.15em] text-[#0A0A0A]/70 mb-2"
                  >
                    {cta.form.emailLabel}
                  </label>
                  <input
                    id="cta-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={cta.form.emailPlaceholder}
                    className="input-brutal"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="mb-4 md:mb-5">
                <label
                  htmlFor="cta-message"
                  className="block font-body text-[10px] font-bold uppercase tracking-[0.15em] text-[#0A0A0A]/70 mb-2"
                >
                  {cta.form.messageLabel}
                </label>
                <textarea
                  id="cta-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={cta.form.messagePlaceholder}
                  className="input-brutal resize-none"
                />
              </div>

              {/* Consent checkbox (custom brutalist style via globals.css) */}
              <div className="mb-5">
                <label
                  htmlFor="cta-consent"
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <Checkbox
                    id="cta-consent"
                    checked={consent}
                    onCheckedChange={(v) => setConsent(v === true)}
                    className="mt-0.5"
                  />
                  <span className="font-body text-xs text-[#0A0A0A]/70 leading-relaxed group-hover:text-[#0A0A0A] transition-colors">
                    {cta.form.consentLabel}
                  </span>
                </label>
              </div>

              {/* Submit + status */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "loading" || !consent}
                  className="btn-brutal"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {cta.form.submittingLabel}
                    </>
                  ) : (
                    <>
                      {cta.form.submitLabel}
                      <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                    </>
                  )}
                </button>

                {/* Inline status message */}
                {status === "success" && (
                  <span className="inline-flex items-center gap-2 font-body text-xs text-[#0A0A0A] font-medium">
                    <Check className="w-4 h-4 text-green-700" strokeWidth={2.5} />
                    {statusMessage}
                  </span>
                )}
                {status === "error" && (
                  <span className="inline-flex items-center gap-2 font-body text-xs text-red-700 font-medium">
                    <AlertCircle className="w-4 h-4" strokeWidth={2.5} />
                    {statusMessage}
                  </span>
                )}
              </div>

              {!emailjsConfigured && (
                <p className="mt-4 font-body text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/40">
                  ⚠ EmailJS belum dikonfigurasi — set NEXT_PUBLIC_EMAILJS_* di .env
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
