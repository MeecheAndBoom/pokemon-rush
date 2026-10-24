"use client";

/**
 * Image loader that keeps <Image> responsive without Vercel's optimizer.
 *
 * Cloudinary and Unsplash already resize/deliver images from their own CDNs, so
 * asking Vercel to fetch, re-encode and cache a copy of every variant only
 * burns the monthly image-transformation quota. This loader returns the
 * provider URL directly with the width/quality the browser asked for.
 *
 * Anything else (logos and other files in /public) is returned untouched, which
 * is what `unoptimized` would do for those sources.
 */

const CLOUDINARY = /^https:\/\/res\.cloudinary\.com\/([^/]+)\/image\/upload\//;
const UNSPLASH = /^https:\/\/images\.unsplash\.com\//;

// A Cloudinary transformation segment looks like "f_auto,q_auto,c_limit".
// Version paths ("v1792571264") and plain folders ("tuc", "products") do not
// match, so they are left alone.
const TRANSFORM_SEGMENT = /^[a-z]{1,3}_[^/,]+(,[a-z]{1,3}_[^/,]+)*$/;

function stripTransform(path) {
  const slash = path.indexOf("/");
  if (slash <= 0) return path;
  const first = path.slice(0, slash);
  return TRANSFORM_SEGMENT.test(first) ? path.slice(slash + 1) : path;
}

export default function imageLoader({ src, width, quality }) {
  const q = quality || "auto";

  const cloudinary = src.match(CLOUDINARY);
  if (cloudinary) {
    const cloud = cloudinary[1];
    const rest = stripTransform(src.slice(cloudinary[0].length));
    return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_${q},c_limit,w_${width}/${rest}`;
  }

  if (UNSPLASH.test(src)) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "max");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(q));
    return url.href;
  }

  return src;
}
