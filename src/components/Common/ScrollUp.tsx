"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

export default function ScrollUp() {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.document.scrollingElement?.scrollTo(0, 0);
    }
  }, [lenis]);

  return null;
}
