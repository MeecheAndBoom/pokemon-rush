"use client";

import { useState } from "react";
import { toast } from "sonner";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") || "");
    setStatus("busy");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        const error = data.error || "Could not subscribe.";
        setMessage(error);
        setStatus("error");
        toast.error("Subscription failed", { description: error });
        return;
      }
      form.reset();
      setMessage("You are on the list.");
      setStatus("done");
      toast.success("You are on the list", {
        description: "We will email you when sets restock or release.",
      });
    } catch {
      setMessage("Could not subscribe right now.");
      setStatus("error");
      toast.error("Could not subscribe right now.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6">
      <label htmlFor="newsletter-email" className="text-[13px] font-semibold tracking-tight">
        Set restock and release alerts
      </label>
      <div className="mt-3 flex max-w-xs gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="h-10 min-w-0 flex-1 rounded-full border border-[var(--hairline)] bg-[var(--background)] px-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
        <button
          type="submit"
          disabled={status === "busy"}
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-[var(--foreground)] px-5 text-[14px] font-medium text-[var(--background)] transition-transform duration-150 ease-out active:scale-[0.97] disabled:opacity-60"
        >
          {status === "busy" ? "…" : "Join"}
        </button>
      </div>
      {message ? (
        <p
          aria-live="polite"
          className={`mt-2 text-[13px] ${
            status === "done" ? "text-[var(--ink-2)]" : "text-red-600"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
