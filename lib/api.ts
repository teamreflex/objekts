import { Artist, AvailableArtist, Objekt, ObjektResponse, artists } from "@/types/api";
import { Alchemy, Network, NftOrdering } from "alchemy-sdk";

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

export async function fetchNFTs(artist: AvailableArtist, wallet: string, pageKey?: string): Promise<ObjektResponse> {
  const nfts = await client().nft.getNftsForOwner(wallet, {
    contractAddresses: [artist.contractAddress],
    orderBy: NftOrdering.TRANSFERTIME,
    pageKey: pageKey,
  });

  const objekts = nfts.ownedNfts
    .filter(nft => nft.rawMetadata?.objekt !== undefined)
    .map(nft => ({
      frontImage: nft.rawMetadata?.objekt.frontImage,
      backImage: nft.rawMetadata?.objekt.backImage as string,
      class: nft.rawMetadata?.objekt.class as string,
      memberName: nft.rawMetadata?.objekt.member as string,
      season: nft.rawMetadata?.objekt.season as string,
      collection: nft.rawMetadata?.objekt.collectionNo as string,
      num: nft.rawMetadata?.objekt.objektNo as number,
      tokenId: Number(nft.rawMetadata?.objekt.tokenId),
    }));

  return {
    objekts,
    pageKey: nfts.pageKey,
    totalCount: nfts.totalCount,
  }
}