import { cache } from "react";
import { connectDB } from "@/lib/db";
import { AdminUser } from "@/lib/models/AdminUser";
import { SiteSetting } from "@/lib/models/SiteSetting";
import { formatAddress, site, type Address } from "@/lib/site";

export type SiteSettings = {
  name: string;
  description: string;
  email: string;
  hours: string;
  phone: string;
  phoneHref: string;
  address: Address;
  addressLine: string;
  whatsapp: string;
  whatsappHref: string;
  whatsappMessage: string;
  adminEmail: string;
};

export function digits(value: string) {
  return String(value || "").replace(/[^0-9]/g, "");
}

export function telHref(phone: string) {
  const d = digits(phone);
  return d ? `tel:+${d}` : "";
}

export function whatsappHref(number: string, message?: string) {
  const d = digits(number);
  if (!d) return "";
  const base = `https://wa.me/${d}`;
  return message && message.trim()
    ? `${base}?text=${encodeURIComponent(message.trim())}`
    : base;
}

function fallback(): SiteSettings {
  return {
    name: site.name,
    description: site.description,
    email: site.email,
    hours: site.hours,
    phone: site.phone,
    phoneHref: telHref(site.phone),
    address: site.address,
    addressLine: formatAddress(site.address),
    whatsapp: site.whatsapp,
    whatsappHref: whatsappHref(site.whatsapp, site.whatsappMessage),
    whatsappMessage: site.whatsappMessage,
    adminEmail: "",
  };
}

// If Mongo is unreachable we serve the static defaults, and stop retrying for a
// while so that a build (which renders every page) cannot stall on timeouts.
let lastFailureAt = 0;
const RETRY_AFTER_MS = 60_000;

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (lastFailureAt && Date.now() - lastFailureAt < RETRY_AFTER_MS) return fallback();

  try {
    await connectDB();
    const doc = await SiteSetting.findOne({ key: "site" }).lean();
    if (!doc) return fallback();

    const address: Address = {
      line1: doc.address?.line1 || "",
      line2: doc.address?.line2 || "",
      city: doc.address?.city || "",
      country: doc.address?.country || "",
    };

    const phone = (doc.phone || "").trim() || site.phone;
    const whatsapp = digits(doc.whatsapp || "") || site.whatsapp;
    const whatsappMessage = (doc.whatsappMessage || "").trim() || site.whatsappMessage;

    return {
      name: site.name,
      description: site.description,
      email: site.email,
      hours: site.hours,
      phone,
      phoneHref: telHref(phone),
      address,
      addressLine: formatAddress(address),
      whatsapp,
      whatsappHref: whatsappHref(whatsapp, whatsappMessage),
      whatsappMessage,
      adminEmail: (doc.adminEmail || "").trim().toLowerCase(),
    };
  } catch {
    lastFailureAt = Date.now();
    return fallback();
  }
});

/** Where order and contact notifications are delivered. */
export async function getNotificationEmail(): Promise<string> {
  const settings = await getSiteSettings();
  if (settings.adminEmail) return settings.adminEmail;

  if (process.env.ADMIN_EMAIL) return process.env.ADMIN_EMAIL.toLowerCase();

  try {
    await connectDB();
    const admin = await AdminUser.findOne({ role: "admin" }).sort({ createdAt: 1 }).lean();
    if (admin?.email) return admin.email;
  } catch {
    // fall through to the public support address
  }

  return site.email;
}
