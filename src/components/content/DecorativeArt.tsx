import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Purely decorative character artwork used as a subtle backdrop for section
 * headers and panels. It is non-interactive, hidden from assistive tech, and
 * scales with the viewport so it stays visible on phones rather than being
 * dropped below the `lg` breakpoint.
 *
 * Size and placement come from `className` (for example
 * `-right-10 top-0 w-[220px] sm:w-[300px] lg:w-[380px]`).
 */
export function DecorativeArt({
  src,
  className,
  opacity = 0.14,
  priority = false,
}: {
  src: string;
  className?: string;
  opacity?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt=""
      width={480}
      height={620}
      aria-hidden="true"
      priority={priority}
      className={cn("pointer-events-none absolute h-auto select-none", className)}
      style={{ opacity }}
    />
  );
}
