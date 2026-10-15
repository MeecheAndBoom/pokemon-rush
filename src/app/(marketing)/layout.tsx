import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { getSiteSettings } from "@/lib/settings";

// Contact details and the WhatsApp number are editable from Admin -> Settings.
// These pages are cached and revalidated after a save (plus this safety net).
export const revalidate = 300;

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header name={settings.name} phone={settings.phone} phoneHref={settings.phoneHref} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <WhatsAppButton href={settings.whatsappHref} />
    </>
  );
}
