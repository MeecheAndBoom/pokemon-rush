"use client";

import { useState } from "react";
import { toast } from "sonner";

const inputClass =
  "mt-2 h-11 w-full rounded-lg border border-[var(--hairline)] bg-transparent px-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";

export function ContactForm({
  type,
  subjectLabel = "Subject",
  cta = "Send message",
}: {
  type: "contact" | "support" | "specialist" | "wholesale";
  subjectLabel?: string;
  cta?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type }),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus("sent");
      toast.success("Message sent", {
        description: "We will reply within one business day.",
      });
    } catch {
      setStatus("error");
      toast.error("Something went wrong", {
        description: "Please try again, or call us on the number in the footer.",
      });
    }
  }

  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${type}-name`} className="text-[14px]">
            Name
          </label>
          <input id={`${type}-name`} required name="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${type}-email`} className="text-[14px]">
            Email
          </label>
          <input id={`${type}-email`} required type="email" name="email" className={inputClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${type}-phone`} className="text-[14px]">
            Phone (optional)
          </label>
          <input id={`${type}-phone`} name="phone" className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${type}-order`} className="text-[14px]">
            Order number (optional)
          </label>
          <input id={`${type}-order`} name="orderNumber" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor={`${type}-subject`} className="text-[14px]">
          {subjectLabel}
        </label>
        <input id={`${type}-subject`} name="subject" className={inputClass} />
      </div>

      <div>
        <label htmlFor={`${type}-message`} className="text-[14px]">
          Message
        </label>
        <textarea
          id={`${type}-message`}
          required
          name="message"
          rows={6}
          className="mt-2 w-full rounded-lg border border-[var(--hairline)] bg-transparent px-3 py-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-[15px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.97] disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : cta}
        </button>
        <p aria-live="polite" className="text-[14px] text-[var(--ink-2)]">
          {status === "sent" ? "Message sent. We will reply within one business day." : null}
          {status === "error" ? "Something went wrong. Please try again or call us." : null}
        </p>
      </div>
    </form>
  );
}
