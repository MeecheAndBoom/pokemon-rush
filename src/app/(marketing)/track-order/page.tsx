import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import { TrackOrderClient } from "./TrackOrderClient";

export const metadata: Metadata = {
  title: "Track an order",
  description:
    "Look up the status of a PokéStore Direct order with your order reference and email address.",
};

export default async function TrackOrderPage() {
  const settings = await getSiteSettings();

  return <TrackOrderClient phone={settings.phone} hours={settings.hours} />;
}
