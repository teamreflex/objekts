import { Artist, AvailableArtist, Objekt, artists } from "@/types/api";
import { Alchemy, Network } from "alchemy-sdk";

function client() {
  return new Alchemy({
    apiKey: process.env.ALCHEMY_KEY,
    network: Network.MATIC_MAINNET,
  });
}

export function getArtist(artistString: Artist) {
  const entries = Object.entries(artists);
  return entries.find(([key]) => key === artistString)?.[1];
}

export async function fetchNFTs(artist: AvailableArtist, wallet: string): Promise<Objekt[]> {
  const nfts = await client().nft.getNftsForOwner(wallet, {
    contractAddresses: [artist.contractAddress],
  });

  return nfts.ownedNfts.map(nft => ({
    frontImage: nft.rawMetadata?.objekt.frontImage as string,
    backImage: nft.rawMetadata?.objekt.backImage as string,
    class: nft.rawMetadata?.objekt.class as string,
    memberName: nft.rawMetadata?.objekt.member as string,
    season: nft.rawMetadata?.objekt.season as string,
    collection: nft.rawMetadata?.objekt.collectionNo as string,
    num: nft.rawMetadata?.objekt.objektNo as number,
    tokenId: Number(nft.rawMetadata?.objekt.tokenId),
  }))
}