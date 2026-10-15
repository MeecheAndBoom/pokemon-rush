import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";
import { siteUrl } from "@/lib/site-url";
import { ogArtForBrand } from "@/lib/brand";

export const ogSize = { width: 1200, height: 630 } as const;
export const ogContentType = "image/png";

const WIDTH = ogSize.width;
const HEIGHT = ogSize.height;

const ACCENT = "#f5c518";
const INK = "#101418";
const MUTED = "#5f6875";
const HAIRLINE = "#e7e7e9";

/* Fonts and the wordmark are static, so they are read once per server process. */
const [geistRegular, geistMedium, geistSemiBold, logoData] = await Promise.all([
  readFile(join(process.cwd(), "src/assets/fonts/Geist-Regular.ttf")),
  readFile(join(process.cwd(), "src/assets/fonts/Geist-Medium.ttf")),
  readFile(join(process.cwd(), "src/assets/fonts/Geist-SemiBold.ttf")),
  readFile(join(process.cwd(), "public/brand/pokestore-direct-logo.png")),
]);

const logo = `data:image/png;base64,${logoData.toString("base64")}`;

const fonts = [
  { name: "Geist", data: geistRegular, weight: 400 as const, style: "normal" as const },
  { name: "Geist", data: geistMedium, weight: 500 as const, style: "normal" as const },
  { name: "Geist", data: geistSemiBold, weight: 600 as const, style: "normal" as const },
];

const artCache = new Map<string, string | null>();

/**
 * Loads one of the decorative character illustrations as a PNG data URI.
 * Satori cannot decode WebP, so these are pre-converted copies in /public/og-art.
 */
async function loadArt(name: string | undefined): Promise<string | null> {
  if (!name) return null;
  const cached = artCache.get(name);
  if (cached !== undefined) return cached;
  try {
    const data = await readFile(join(process.cwd(), "public", "og-art", `${name}.png`));
    const src = `data:image/png;base64,${data.toString("base64")}`;
    artCache.set(name, src);
    return src;
  } catch {
    artCache.set(name, null);
    return null;
  }
}

export { ogArtForBrand as artForBrand };

function clamp(value: string, max: number) {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}\u2026`;
}

function titleFontSize(title: string) {
  if (title.length > 96) return 50;
  if (title.length > 64) return 58;
  if (title.length > 40) return 66;
  return 76;
}

const domain = siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

export type OgCardInput = {
  /** Headline. Truncated automatically to fit the card. */
  title: string;
  /** Small yellow label shown above the headline (brand, category, section). */
  eyebrow?: string;
  /** Supporting line under the headline. */
  meta?: string;
  /** Character illustration key from /public/og-art, e.g. "art-pikachu". */
  art?: string;
};

/** Renders a branded social card as a PNG using Satori via next/og. */
export function ogCard({ title, eyebrow, meta, art }: OgCardInput) {
  const headline = clamp(title, 130);
  const fontSize = titleFontSize(headline);

  return (async () => {
    const artSrc = await loadArt(art);

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            background: "#ffffff",
            fontFamily: "Geist",
          }}
        >
          <div style={{ display: "flex", height: 14, background: ACCENT }} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              padding: "44px 64px 40px 64px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <img src={logo} height={54} alt="" />
              {eyebrow ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 999,
                    border: `1px solid ${HAIRLINE}`,
                    background: "#fafafa",
                    padding: "10px 22px",
                    fontSize: 24,
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                    color: INK,
                  }}
                >
                  {clamp(eyebrow, 48)}
                </div>
              ) : null}
            </div>

            <div style={{ display: "flex", flex: 1, alignItems: "center", gap: 40 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  maxWidth: artSrc ? 700 : 1040,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize,
                    fontWeight: 600,
                    lineHeight: 1.08,
                    letterSpacing: "-0.02em",
                    color: INK,
                  }}
                >
                  {headline}
                </div>
                {meta ? (
                  <div
                    style={{
                      display: "flex",
                      marginTop: 22,
                      fontSize: 28,
                      fontWeight: 400,
                      lineHeight: 1.35,
                      color: MUTED,
                    }}
                  >
                    {clamp(meta, 150)}
                  </div>
                ) : null}
              </div>

              {artSrc ? (
                <div
                  style={{
                    display: "flex",
                    width: 380,
                    height: 380,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={artSrc} width={380} height={380} alt="" />
                </div>
              ) : null}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: `1px solid ${HAIRLINE}`,
                paddingTop: 20,
                fontSize: 24,
                color: MUTED,
              }}
            >
              <div style={{ display: "flex" }}>
                {`${site.name} — factory-sealed trading cards`}
              </div>
              <div style={{ display: "flex" }}>{domain}</div>
            </div>
          </div>
        </div>
      ),
      { width: WIDTH, height: HEIGHT, fonts }
    );
  })();
}
