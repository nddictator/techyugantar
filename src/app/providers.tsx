"use client";

import { ThemeProvider } from "next-themes";
import { ReactLenis } from "lenis/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          duration: 1.2,
          smoothWheel: true,
          syncTouch: false,
        }}
      >
        {children}
      </ReactLenis>
    </ThemeProvider>
  );
}
