import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteSettings } from "@/lib/settings";
import { siteGraphJsonLd } from "@/lib/seo";

// Contact details and the WhatsApp number are editable from Admin -> Settings.
// These pages are cached and revalidated after a save (plus this safety net).
// Keep this long: every marketing route inherits it, and each regeneration is
// a billable ISR write plus an origin transfer. Admin saves call
// revalidatePath("/", "layout") so changes still go live immediately.
export const revalidate = 3600;

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  // Site-wide Organization + WebSite structured data, built from the live
  // settings so that a phone or address change propagates to search engines too.
  const siteGraph = siteGraphJsonLd({
    name: settings.name,
    description: settings.description,
    email: settings.email,
    phone: settings.phone,
    addressLine: settings.addressLine,
    address: settings.address,
  });

  return (
    <>
      <JsonLd data={siteGraph} />
      <Header name={settings.name} phone={settings.phone} phoneHref={settings.phoneHref} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <WhatsAppButton href={settings.whatsappHref} />
    </>
  );
}
