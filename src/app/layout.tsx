import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
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
  title: {
    default: "Pokemon Rush",
    template: "%s | Pokemon Rush",
  },
  description:
    "Authentic Japanese & English Pokémon TCG, One Piece TCG, Weiss Schwarz, and sealed collectibles.",
  metadataBase: new URL("http://localhost:3000"),
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
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
          position="bottom-right"
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
