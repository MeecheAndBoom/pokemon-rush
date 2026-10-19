import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import { site } from "@/lib/site";
import { DEFAULT_OG_IMAGE, OG_IMAGE_SIZE } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Sealed Pokémon, One Piece & Weiss Schwarz Cards`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  category: "Shopping",
  keywords: [
    "sealed pokemon cards",
    "pokemon booster box",
    "elite trainer box",
    "one piece card game booster box",
    "weiss schwarz booster box",
    "sealed trading cards",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { email: false, address: false, telephone: false },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: `${site.name} — Sealed Pokémon, One Piece & Weiss Schwarz Cards`,
    description: site.description,
    url: siteUrl,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: OG_IMAGE_SIZE.width,
        height: OG_IMAGE_SIZE.height,
        alt: `${site.name} — factory-sealed trading cards`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Sealed Pokémon, One Piece & Weiss Schwarz Cards`,
    description: site.description,
    images: [DEFAULT_OG_IMAGE],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col overscroll-none">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:rounded focus:bg-[var(--background)] focus:text-[var(--foreground)] focus:outline focus:outline-2 focus:outline-[var(--accent)]"
        >
          Skip to main content
        </a>
        <div id="main" className="flex-1 flex flex-col">
          {children}
        </div>
        <Toaster
          position="bottom-left"
          theme="light"
          closeButton
          toastOptions={{
            classNames: {
              toast:
                "rounded-2xl border border-[var(--hairline)] bg-[var(--background)] text-[var(--foreground)] shadow-lg",
              description: "text-[var(--ink-2)]",
              actionButton: "bg-[var(--accent)] text-white",
              cancelButton: "bg-[var(--surface-2)] text-[var(--ink-2)]",
            },
          }}
        />
        {/* Smartsupp Live Chat script */}
        <Script
          id="smartsupp-live-chat"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `var _smartsupp = _smartsupp || {};
_smartsupp.key = '6cb957f8fe5154faaf53527f0d80bfaa0413a0c2';
window.smartsupp||(function(d) {
  var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
  s=d.getElementsByTagName('script')[0];c=d.createElement('script');
  c.type='text/javascript';c.charset='utf-8';c.async=true;
  c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
})(document);`,
          }}
        />
        <noscript>
          Powered by{" "}
          <a href="https://www.smartsupp.com" target="_blank" rel="noopener noreferrer">
            Smartsupp
          </a>
        </noscript>
      </body>
    </html>
  );
}
