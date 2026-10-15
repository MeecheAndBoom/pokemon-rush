import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/settings";
import { TrackOrderClient } from "./TrackOrderClient";

export const metadata: Metadata = seoMetadata("/track-order");

export default async function TrackOrderPage() {
  const settings = await getSiteSettings();

  return <TrackOrderClient phone={settings.phone} hours={settings.hours} />;
}
