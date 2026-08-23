"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionTitle from "../Common/SectionTitle";
import { Reveal } from "@/components/motion";

export default function Video() {
  const [isOpen, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const VIDEO_URL =
    "https://firebasestorage.googleapis.com/v0/b/rewardhub-35c65.firebasestorage.app/o/videos%2FIMG_0651.MP4?alt=media&token=9f3a0eda-0898-46a9-82d0-a21ded37ff2a";

  // Optional: your thumbnail — replace with your actual path
  const THUMBNAIL = "/images/video/image.png";

  // Pause & reset when modal closes
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  return (
    <>
      <section className="relative z-10 py-16 md:py-20 lg:py-28">
        <div className="container">
          <Reveal>
            <SectionTitle
              title="We are ready to help"
              paragraph="Watch a quick walkthrough of how Tech Yugantar approaches a project — from first conversation to shipped, production-ready software."
              center
              mb="80px"
            />
          </Reveal>
        </div>

        <div className="relative overflow-hidden">
          <Reveal className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[770px] overflow-hidden rounded-md">
                <div className="relative aspect-77/40 items-center justify-center">
                  {/* Thumbnail */}
                  <Image
                    src={THUMBNAIL}
                    alt="video thumbnail"
                    className="object-cover"
                    fill
                  />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      aria-label="video play button"
                      onClick={() => setOpen(true)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-primary flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white/75 transition hover:bg-white cursor-pointer"
                    >
                      <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        className="fill-current"
                      >
                        <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="absolute right-0 bottom-0 left-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat" />
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="relative w-full max-w-4xl rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close video"
                className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1L13 13M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Native video player */}
              <video
                ref={videoRef}
                src={VIDEO_URL}
                controls
                autoPlay
                className="w-full max-h-[80vh] bg-black"
                playsInline
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}