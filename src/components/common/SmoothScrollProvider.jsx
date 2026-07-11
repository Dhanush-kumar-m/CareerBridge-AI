"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Wrap your root layout's <body> children with this once:
 *
 *   // app/layout.jsx
 *   import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";
 *   ...
 *   <body>
 *     <SmoothScrollProvider>{children}</SmoothScrollProvider>
 *   </body>
 *
 * That's the entire integration — every scroll on the site becomes
 * eased/inertial automatically, and your existing IntersectionObserver
 * or FadeContent scroll-reveals keep working exactly as before, since
 * Lenis just changes *how* scrolling feels, not the scroll events
 * themselves (it re-dispatches native scroll under the hood).
 */
export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      // lower = heavier/slower settle, higher = snappier.
      // 1.1–1.4 is the "fin.com" range. Below 1 starts feeling laggy.
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease-out expo
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2, // mobile momentum, keep close to native
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // respect reduced-motion users — don't force momentum on them
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) lenis.destroy();

    return () => lenis.destroy();
  }, []);

  return children;
}
