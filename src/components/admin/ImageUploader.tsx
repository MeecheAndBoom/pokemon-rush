"use client";

import Image from "next/image";
import { useState } from "react";

export function ImageUploader({
  name = "images",
  initial = [],
}: {
  name?: string;
  initial?: string[];
}) {
  const [urls, setUrls] = useState<string[]>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [manual, setManual] = useState("");

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError("");
    const body = new FormData();
    Array.from(files).forEach((f) => body.append("file", f));
    try {
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setUrls((prev) => [...prev, ...data.files.map((f: { url: string }) => f.url)]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={urls.join("\n")} />

      <div className="flex flex-wrap gap-3">
        {urls.map((url) => (
          <div
            key={url}
            className="group relative h-24 w-24 overflow-hidden rounded-xl border border-[var(--hairline)] bg-[var(--surface-2)]"
          >
            <Image src={url} alt="" fill sizes="96px" className="object-contain p-1" />
            <button
              type="button"
              onClick={() => setUrls((prev) => prev.filter((u) => u !== url))}
              aria-label="Remove image"
              className="absolute right-1 top-1 rounded-full bg-[var(--foreground)] px-1.5 text-[12px] text-[var(--background)] opacity-0 transition-opacity group-hover:opacity-100"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label className="inline-flex h-9 cursor-pointer items-center justify-center rounded-full border border-[var(--hairline)] px-4 text-[13px] hover:border-[var(--foreground)]">
          {busy ? "Uploading…" : "Upload images"}
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => onFiles(e.target.files)}
          />
        </label>
        <span className="text-[12px] text-[var(--ink-2)]">
          PNG or JPG. Uploaded to Cloudinary.
        </span>
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={manual}
          onChange={(e) => setManual(e.target.value)}
          placeholder="Or paste an image URL"
          className="h-9 flex-1 rounded-lg border border-[var(--hairline)] bg-transparent px-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
        <button
          type="button"
          onClick={() => {
            const v = manual.trim();
            if (v) {
              setUrls((prev) => [...prev, v]);
              setManual("");
            }
          }}
          className="h-9 rounded-full border border-[var(--hairline)] px-4 text-[13px] hover:border-[var(--foreground)]"
        >
          Add
        </button>
      </div>

      {error ? <p className="mt-2 text-[13px] text-red-600">{error}</p> : null}
    </div>
  );
}
