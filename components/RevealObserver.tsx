"use client";

import { useReveal } from "@/hooks/useReveal";

/** Mount once in the layout to activate scroll-reveal on all .reveal elements. */
export default function RevealObserver() {
  useReveal();
  return null;
}
