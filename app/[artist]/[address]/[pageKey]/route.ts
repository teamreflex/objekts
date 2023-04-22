import { fetchNFTs, getArtist } from '@/lib/api';
import { Artist } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  artist: Artist
  address: string
  pageKey?: string
}

export async function GET(request: NextRequest, context: { params: Context }) {
  console.log(context)
  const artist = getArtist(context.params.artist)
  if (!artist) return NextResponse.json({ error: 'Artist not found' })

  const res = await fetchNFTs(artist, context.params.address, context.params.pageKey)

  return NextResponse.json(res)
}