import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { site } from "@/lib/site";
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
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Sealed Pokémon, One Piece & Weiss Schwarz Cards`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Sealed Pokémon, One Piece & Weiss Schwarz Cards`,
    description: site.description,
    url: site.url,
    images: [{ url: "/open-graph-thumbnail-image.png", width: 1200, height: 675, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Sealed Pokémon, One Piece & Weiss Schwarz Cards`,
    description: site.description,
    images: ["/open-graph-thumbnail-image.png"],
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
      </body>
    </html>
  );
}
