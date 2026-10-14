export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span
      className="inline-flex items-center gap-0.5 align-middle"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={i <= Math.round(rating) ? "fill-[var(--foreground)]" : "fill-[var(--hairline)]"}
        >
          <path d="M10 1.6l2.47 5.35 5.86.67-4.34 3.98 1.17 5.8L10 14.5l-5.16 2.9 1.17-5.8L1.67 7.62l5.86-.67L10 1.6z" />
        </svg>
      ))}
    </span>
  );
}
