"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton({ href }: { href: string }) {
  const pathname = usePathname();

  // Keep the checkout and cart clear so the button never sits over a form control.
  if (!href || pathname.startsWith("/checkout") || pathname.startsWith("/cart")) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.35)] transition-transform duration-200 ease-out hover:scale-105 active:scale-95 motion-reduce:transition-none sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-[var(--foreground)] px-3 py-1.5 text-[12px] font-medium text-[var(--background)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 lg:block"
      >
        WhatsApp us
      </span>
    </a>
  );
}
