import { Fragment } from "react";

function inline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${keyPrefix}-${i}`} className="font-semibold text-[var(--foreground)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={`${keyPrefix}-${i}`}>{part}</Fragment>;
  });
}

export function Prose({ body, className }: { body: string; className?: string }) {
  const blocks = body.split(/\n\s*\n/);

  return (
    <div className={className}>
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;
        if (trimmed.startsWith("- ")) {
          const items = trimmed.split("\n").map((l) => l.replace(/^-\s*/, ""));
          return (
            <ul key={i} className="my-5 list-disc space-y-2 pl-5 text-[16px] leading-relaxed text-[var(--ink-2)]">
              {items.map((item, j) => (
                <li key={j}>{inline(item, `li-${i}-${j}`)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="my-5 text-[16px] leading-relaxed text-[var(--ink-2)]">
            {inline(trimmed, `p-${i}`)}
          </p>
        );
      })}
    </div>
  );
}
