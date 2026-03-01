"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";
import { isSafari, isMobile } from "../../utils/detectBrowser";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  if (typeof window !== 'undefined' && isSafari()) {
    // Disable custom smooth scroller on Safari to avoid jank; fallback to native scroll
    return <>{children}</>;
  }

  // On low-end mobile devices, reduce smoothing to help performance
  const mobile = typeof window !== 'undefined' && isMobile();
  const options = mobile ? { lerp: 0.18, duration: 1.2, smoothWheel: false } : { lerp: 0.07, duration: 1.5, smoothWheel: true };

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}