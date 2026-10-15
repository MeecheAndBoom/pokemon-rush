import Link from "next/link";
import type { Metadata } from "next";
import { BadgeCheck, MapPin, PackageCheck, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "About us",
  description:
    "PokéStore Direct sources factory-sealed Pokémon, One Piece, and Weiss Schwarz trading cards through official distribution and ships worldwide.",
};

const standards = [
  {
    icon: ShieldCheck,
    title: "Authentic, official distribution",
    body: "We buy through official channels in Japan, the United States, and Europe. No grey-market stock, no middlemen, and no sealed product we cannot trace.",
  },
  {
    icon: PackageCheck,
    title: "Inspected before dispatch",
    body: "Factory seals, corners, and edges are checked on every order. Anything that fails our standard is set aside and replaced rather than shipped with an apology.",
  },
  {
    icon: BadgeCheck,
    title: "Described plainly",
    body: "Language, set, product type, and condition are stated up front. Pre-orders and release shifts are communicated directly, not buried in fine print.",
  },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="pt-14 pb-16 sm:pt-20">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">About us</h1>
          <p className="mt-6 text-[17px] leading-relaxed text-[var(--ink-2)]">
            PokéStore Direct is a collector-focused store supplying authentic, factory-sealed Pokémon TCG,
            One Piece Card Game, and Weiss Schwarz trading cards. We source through official
            distribution, inspect every item before dispatch, and keep the process simple and honest.
          </p>
          <p className="mt-5 text-[17px] leading-relaxed text-[var(--ink-2)]">
            We started because buying sealed product online had become a gamble: listings that did
            not match the box, seals you could not trust, and packaging that treated a case like an
            afterthought. Our aim is the opposite. Stock the releases collectors actually want,
            describe them plainly, and get them moving without unnecessary friction.
          </p>

          <h2 className="mt-14 text-[22px] font-semibold tracking-tight">What we stock</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--ink-2)]">
            Booster boxes, booster bundles, Elite Trainer Boxes, sealed cases, booster packs, and
            premium collections across Pokémon, One Piece, and Weiss Schwarz. Japanese, English, and
            Chinese printings are all listed with their language and product type stated up front.
          </p>
          <p className="mt-5 text-[16px] leading-relaxed text-[var(--ink-2)]">
            If you are chasing a specific release we do not list, ask us. We will tell you plainly
            whether we can source it, what it would cost, and how long it would take.
          </p>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {standards.map((item) => (
            <div key={item.title}>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--surface-2)] text-[var(--accent)]">
                <item.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-[17px] font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 rounded-3xl bg-[var(--surface-2)] p-8 sm:p-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-[20px] font-semibold tracking-tight">Where we are</h2>
            <p className="mt-4 flex items-start gap-2.5 text-[15px] leading-relaxed text-[var(--ink-2)]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <span>
                {settings.address.line1 ? (
                  <>
                    {settings.address.line1}
                    <br />
                  </>
                ) : null}
                {settings.address.line2 ? (
                  <>
                    {settings.address.line2}
                    <br />
                  </>
                ) : null}
                {settings.address.city}
                <br />
                {settings.address.country}
              </span>
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-[var(--ink-2)]">
              We ship internationally from here. Delivery options and estimated windows are confirmed
              in your payment instructions after you place an order.
            </p>
          </div>
          <div>
            <h2 className="text-[20px] font-semibold tracking-tight">Independent and transparent</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-2)]">
              PokéStore Direct is an independent reseller. We are not affiliated with, endorsed by, or
              sponsored by Nintendo, Creatures, GAME FREAK, The Pokémon Company, Bandai, or
              Bushiroad. All trademarks and product names belong to their respective owners and are
              used only to describe the products we sell.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-[16px]">
          <Link href="/shop" className="text-[var(--accent)] hover:opacity-70">
            Browse the shop
          </Link>
          <Link href="/talk-to-a-specialist" className="text-[var(--accent)] hover:opacity-70">
            Talk to a specialist
          </Link>
          <a href={settings.phoneHref} className="text-[var(--accent)] hover:opacity-70">
            {settings.phone}
          </a>
        </div>
      </Container>
    </div>
  );
}
