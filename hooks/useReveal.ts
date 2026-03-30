"use client";

import { useEffect } from "react";

/**
 * Scroll-triggered reveal animations using IntersectionObserver.
 * Mark any element with className="reveal" — it fades + slides up when it
 * enters the viewport. Add "reveal-delay-N" (100–500) for staggered children.
 *
 * Usage: call useReveal() once at the top of any page/layout component.
 */
export function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            // Unobserve after triggering so it doesn't re-animate on scroll-up
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
