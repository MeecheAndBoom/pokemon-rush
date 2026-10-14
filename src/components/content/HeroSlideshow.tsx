"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type HeroSlide = {
  src: string;
  alt: string;
};

/**
 * Full-bleed background slideshow for the home hero. Cross-fades between the
 * supplied images and holds the first frame when the visitor prefers reduced
 * motion.
 */
export function HeroSlideshow({
  slides,
  intervalMs = 6500,
  className,
}: {
  slides: HeroSlide[];
  intervalMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % slides.length),
      intervalMs
    );
    return () => window.clearInterval(id);
  }, [slides.length, intervalMs]);

  return (
    <div className={className} aria-hidden="true">
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-[1400ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
