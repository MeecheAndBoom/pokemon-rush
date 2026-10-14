import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <div className="pt-24 pb-10 sm:pt-32">
      <Container size="narrow">
        <p className="text-[13px] text-[var(--ink-2)]">404</p>
        <h1 className="mt-4 text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">
          We could not find that page.
        </h1>
        <p className="mt-5 text-[16px] leading-relaxed text-[var(--ink-2)]">
          The link may be broken or the product may have moved. Try the shop, or search the full
          catalogue.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[16px]">
          <Link href="/shop" className="text-[var(--accent)] hover:opacity-70">
            Shop all products
          </Link>
          <Link href="/" className="text-[var(--accent)] hover:opacity-70">
            Back home
          </Link>
        </div>
      </Container>
    </div>
  );
}
