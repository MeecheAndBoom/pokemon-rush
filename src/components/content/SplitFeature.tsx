import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SplitFeature({
  image,
  imageAlt,
  reverse = false,
  title,
  body,
  points = [],
  href,
  cta,
}: {
  image: string;
  imageAlt: string;
  reverse?: boolean;
  title: string;
  body: string[];
  points?: string[];
  href?: string;
  cta?: string;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={cn("relative", reverse && "lg:order-2")}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[var(--surface-2)]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain p-10"
          />
        </div>
      </div>

      <div className={cn(reverse && "lg:order-1")}>
        <h2 className="text-[26px] font-semibold tracking-[-0.02em] sm:text-[34px]">
          {title}
        </h2>
        {body.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-[16px] leading-relaxed text-[var(--ink-2)]">
            {paragraph}
          </p>
        ))}

        {points.length > 0 ? (
          <ul className="mt-6 space-y-2.5">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-[var(--ink-2)]">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {href && cta ? (
          <Link
            href={href}
            className="mt-7 inline-flex items-center gap-1.5 text-[16px] text-[var(--accent)] hover:opacity-70"
          >
            {cta}
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
