import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import AddressInput from "@/components/address-input";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ['Modhaus', 'Objekt', 'tripleS', 'LOONA', 'ARTMS', 'kpop'],
  authors: [{ name: 'rfxkairu', url: siteConfig.links.github }],
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.links.github,
    siteName: 'Next.js',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: '@rfxkairu',
  },
}

export default function Page() {
  return (
    <section className="container grid items-center gap-6 pb-4 pt-6 md:py-5">
      <div className="flex flex-col items-center gap-3">
        <AddressInput />
      </div>
    </section>
  )
}