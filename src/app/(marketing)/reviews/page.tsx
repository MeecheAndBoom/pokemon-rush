import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Stars } from "@/components/content/Stars";
import { reviewSummary, reviews } from "@/data/reviews";

export const metadata: Metadata = seoMetadata("/reviews");

export default function ReviewsPage() {
  return (
    <div className="pt-14 pb-10 sm:pt-20">
      <Container>
        <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">Reviews</h1>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[var(--ink-2)]">
          What collectors say after their order arrives.
        </p>

        <div className="mt-12 grid gap-12 sm:grid-cols-[220px_1fr] sm:gap-16">
          <div>
            <p className="text-[56px] font-semibold leading-none tracking-[-0.03em]">
              {reviewSummary.average.toFixed(1)}
            </p>
            <div className="mt-3">
              <Stars rating={reviewSummary.average} size={18} />
            </div>
            <p className="mt-3 text-[14px] text-[var(--ink-2)]">
              Based on {reviewSummary.count} reviews
            </p>
          </div>

          <div className="space-y-3">
            {reviewSummary.breakdown.map((row) => (
              <div key={row.stars} className="flex items-center gap-4">
                <span className="w-12 text-[13px] text-[var(--ink-2)] tabular-nums">
                  {row.stars} star
                </span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
                  <span
                    className="block h-full rounded-full bg-[var(--foreground)]"
                    style={{ width: `${row.percent}%` }}
                  />
                </span>
                <span className="w-10 text-right text-[13px] text-[var(--ink-2)] tabular-nums">
                  {row.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <ul className="mt-20 grid gap-x-12 gap-y-14 sm:grid-cols-2">
          {reviews.map((review) => (
            <li key={`${review.name}-${review.date}`}>
              <Stars rating={review.rating} />
              <h2 className="mt-4 text-[17px] font-semibold tracking-tight">{review.title}</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-[var(--ink-2)]">
                {review.body}
              </p>
              <p className="mt-4 text-[13px] text-[var(--ink-2)]">
                {review.name} · {review.location}
                {review.product ? ` · ${review.product}` : ""}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-20 rounded-3xl bg-[var(--surface-2)] px-6 py-14 text-center sm:px-16">
          <h2 className="text-[24px] font-semibold tracking-tight sm:text-[30px]">
            Bought from us?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-[var(--ink-2)]">
            Tell us how it went. Real feedback helps other collectors and helps us get better.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-[15px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.97]"
          >
            Leave a review
          </Link>
        </div>
      </Container>
    </div>
  );
}
