"use client";

import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine, ISourceOptions } from "tsparticles-engine";

export default function ParticlesBackground() {
  const init = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const options: ISourceOptions = useMemo(() => ({
    fpsLimit: 60,
    detectRetina: true,
    // fullScreen: true → library owns fixed positioning & z-index
    // zIndex: 0 keeps canvas below content (content wrapper uses z-10)
    fullScreen: { enable: true, zIndex: 0 },

    background: {
      color: { value: "#04080f" }, // matches body fallback colour
    },

    particles: {
      number: {
        value: 90,
        density: { enable: true, area: 900 },
      },
      color: {
        value: ["#60a5fa", "#818cf8", "#94a3b8", "#ffffff"],
      },
      opacity: {
        value: 0.7,
        random: true,
        animation: {
          enable: true,
          speed: 0.8,
          minimumValue: 0.2,
          sync: false,
        },
      },
      size: {
        value: 2.8,
        random: { enable: true, minimumValue: 1 },
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
      links: {
        enable: true,
        distance: 140,
        color: "#3b82f6",
        opacity: 0.35,
        width: 1,
      },
    },

    interactivity: {
      detectsOn: "window",
      events: {
        onHover: { enable: true, mode: "grab" },
        resize: true,
      },
      modes: {
        grab: {
          distance: 160,
          links: { opacity: 0.4 },
        },
      },
    },

    // Adaptive: fewer particles + no lines on small screens
    responsive: [
      {
        maxWidth: 768,
        options: {
          particles: {
            number: { value: 20 },
            links: { enable: false },
            move: { speed: 0.25 },
            opacity: { value: 0.3 },
          },
        },
      },
      {
        maxWidth: 480,
        options: {
          particles: {
            number: { value: 12 },
            links: { enable: false },
            move: { speed: 0.2 },
          },
        },
      },
    ],
  }), []);

  return (
    <Particles
      id="tsparticles"
      init={init}
      options={options}
      className="pointer-events-none"
    />
  );
}
