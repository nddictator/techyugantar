"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  if (!number) return null;

  const href = `https://wa.me/${number}?text=${encodeURIComponent(
    "Hi Tech Yugantar, I'd like to know more about your services.",
  )}`;

  return (
    <div className="fixed right-8 bottom-8 z-99">
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] backdrop-blur-md"
      >
        {!shouldReduceMotion && (
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/60" />
        )}

        <FaWhatsapp className="h-7 w-7" />

        <AnimatePresence>
          {isHovered && !shouldReduceMotion && (
            <motion.span
              initial={{ opacity: 0, x: 8, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="border-body-color/10 dark:border-white/10 absolute right-full mr-3 rounded-md border bg-white/90 px-3 py-1.5 text-sm font-medium whitespace-nowrap text-black shadow-lg backdrop-blur-md dark:bg-[#1a1f2b]/90 dark:text-white"
            >
              Chat on WhatsApp
            </motion.span>
          )}
        </AnimatePresence>
      </motion.a>
    </div>
  );
}
