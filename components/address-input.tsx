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

  const availableArtists = Object.entries(artists)
  const colSpan = `col-span-${availableArtists.length}`

  function view(artist: Artist) {
    router.push(`${artist}/${address}`)
  }

  function onKeyUp(event) {
    if (event.keyCode === 13) {
      view('triples')
    }
  }

  return (
    <div className={cn(`md:grid-cols-${availableArtists.length}`, 'grid w-full grid-cols-1 grid-rows-3 items-center gap-2 md:w-1/2 md:grid-rows-2 lg:w-1/3')}>
      <span className={cn('text-center', colSpan)}>Enter your Cosmo username or your wallet address</span>
      <Input className={colSpan} placeholder="0x..." value={address} onChange={e => setAddress(e.currentTarget.value)} onKeyUp={onKeyUp} />
      <div className="flex flex-row gap-2">
        {availableArtists.map(([key, artist]) => <Button className="w-full" key={key} onClick={() => view(key as Artist)}>View {artist.name}</Button>)}
      </div>
    </div>
  )
};