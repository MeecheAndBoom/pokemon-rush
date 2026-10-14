import type { Faq } from "@/data/faq";

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <dl className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer items-start justify-between gap-6 text-[17px] tracking-tight">
            <span>{item.q}</span>
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-[var(--ink-2)] transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-2)]">{item.a}</p>
        </details>
      ))}
    </dl>
  );
}
