import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function pageWindow(current: number, total: number) {
  const pages: (number | "ellipsis")[] = [];
  const push = (value: number | "ellipsis") => pages.push(value);
  if (total <= 7) {
    for (let i = 1; i <= total; i += 1) push(i);
    return pages;
  }
  push(1);
  if (current > 3) push("ellipsis");
  const from = Math.max(2, current - 1);
  const to = Math.min(total - 1, current + 1);
  for (let i = from; i <= to; i += 1) push(i);
  if (current < total - 2) push("ellipsis");
  push(total);
  return pages;
}

export function Pagination({
  current,
  total,
  hrefForPage,
  className,
}: {
  current: number;
  total: number;
  hrefForPage: (page: number) => string;
  className?: string;
}) {
  if (total <= 1) return null;

  const button =
    "grid h-9 min-w-9 place-items-center rounded-full border border-[var(--hairline)] px-3 text-[13px] text-[var(--ink-2)] transition-colors hover:border-[var(--foreground)] hover:text-[var(--foreground)]";

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex flex-wrap items-center justify-center gap-2", className)}
    >
      <Link
        href={hrefForPage(Math.max(1, current - 1))}
        aria-label="Previous page"
        aria-disabled={current === 1}
        className={cn(button, current === 1 && "pointer-events-none opacity-40")}
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
      </Link>

      {pageWindow(current, total).map((p, index) =>
        p === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            className="px-1 text-[13px] text-[var(--ink-2)]"
          >
            …
          </span>
        ) : (
          <Link
            key={p}
            href={hrefForPage(p)}
            aria-current={p === current ? "page" : undefined}
            className={cn(
              button,
              p === current &&
                "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] hover:text-[var(--background)]"
            )}
          >
            {p}
          </Link>
        )
      )}

      <Link
        href={hrefForPage(Math.min(total, current + 1))}
        aria-label="Next page"
        aria-disabled={current >= total}
        className={cn(button, current >= total && "pointer-events-none opacity-40")}
      >
        <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
      </Link>
    </nav>
  );
}
