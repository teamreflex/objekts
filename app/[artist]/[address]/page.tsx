import InvalidArtist from "@/components/invalid-artist";
import ObjektList from "@/components/objekt-list";
import { fetchNFTs, getArtist } from "@/lib/api";
import { Artist } from "@/types/api";

type Params = {
  artist: Artist;
  address: string;
}

export default async function Page({ params }: { params: Params }) {
  const artist = getArtist(params.artist);
  if (!artist) {
    return <InvalidArtist />
  }

  const nfts = await fetchNFTs(artist, params.address);

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <ObjektList initialObjekts={nfts} />
    </section>
  )
}