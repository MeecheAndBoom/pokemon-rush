"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type GalleryImage = { url: string; alt: string };

export function ProductGallery({
  images,
  name,
}: {
  images: GalleryImage[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  if (!current) return null;

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-3xl">
        <Image
          src={current.url}
          alt={current.alt || name}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain p-8"
        />
      </div>

      {images.length > 1 ? (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={index === active}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl transition-all duration-200 ease-out",
                index === active
                  ? "ring-2 ring-[var(--accent)]"
                  : "ring-1 ring-[var(--hairline)] hover:ring-[var(--ink-2)]"
              )}
            >
              <Image
                src={image.url}
                alt=""
                fill
                sizes="15vw"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
