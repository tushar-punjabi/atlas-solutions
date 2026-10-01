"use client";

import { useEffect } from "react";

export default function Particles() {
  useEffect(() => {
    const colors = ["rgba(62,207,207,0.5)", "rgba(255,255,255,0.3)"];
    const nodes: HTMLDivElement[] = [];

    for (let i = 0; i < 18; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const size = Math.random() * 3 + 1;
      p.style.cssText = [
        `width:${size}px`,
        `height:${size}px`,
        `left:${10 + Math.random() * 80}%`,
        `top:${10 + Math.random() * 80}%`,
        `background:${colors[Math.floor(Math.random() * colors.length)]}`,
        `--dur:${4 + Math.random() * 6}s`,
        `--delay:${Math.random() * 6}s`,
      ].join(";");
      document.body.appendChild(p);
      nodes.push(p);
    }

    return () => {
      nodes.forEach((n) => n.remove());
    };
  }, []);

  return null;
}
