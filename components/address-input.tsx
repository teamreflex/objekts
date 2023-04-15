'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Artist, artists } from "@/types/api"
import { cn } from "@/lib/utils"

export default function AddressInput() {
  const router = useRouter();
  const [address, setAddress] = useState('')

  function view<const Artist>(artist: Artist) {
    router.push(`${artist}/${address}`)
  }

  const artists = Object.entries(artists)
  const colSpan = `col-span-${artists.length}`;

  return (
    <div className={cn(`grid-cols-${artists.length}`, 'grid w-full grid-rows-3 items-center gap-2 md:w-1/2 lg:w-1/3')}>
      <span className={cn('text-center', colSpan)}>Enter your wallet address to view your collection</span>
      <Input className={colSpan} placeholder="0x ..." value={address} onChange={e => setAddress(e.currentTarget.value)} />
      {artists.map(([key, artist]) => <Button key={key} onClick={() => view(key)}>View {artist.name}</Button>)}
    </div>
  )
};