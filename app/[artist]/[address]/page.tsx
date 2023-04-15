import ComingSoon from "@/components/coming-soon";
import InvalidArtist from "@/components/invalid-artist";
import ObjektList from "@/components/objekt-list";
import { siteConfig } from "@/config/site";
import { fetchNFTs, getArtist } from "@/lib/api";
import { Artist } from "@/types/api";
import { Metadata } from "next";

type Params = {
  artist: Artist;
  address: string;
}

export async function generateMetadata({ params }: { params: Params }) {
  const artist = getArtist(params.artist)

  const name = `${artist?.name ?? ''} Objekts - ${params.address}`;
  return {
    title: name,
    description: siteConfig.description,
    keywords: ['Modhaus', 'Objekt', 'tripleS', 'LOONA', 'ARTMS', 'kpop'],
    authors: [{ name: 'rfxkairu', url: siteConfig.links.github }],
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
    ],
    openGraph: {
      title: name,
      description: siteConfig.description,
      url: siteConfig.links.github,
      siteName: 'Next.js',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description: siteConfig.description,
      creator: '@rfxkairu',
    },
  }
}

export default async function Page({ params }: { params: Params }) {
  const artist = getArtist(params.artist);
  if (!artist) {
    return <InvalidArtist />
  }
  if (!artist.enabled) {
    return <ComingSoon artist={artist} />
  }

  const nfts = await fetchNFTs(artist, params.address);

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <ObjektList initialObjekts={nfts} />
    </section>
  )
}