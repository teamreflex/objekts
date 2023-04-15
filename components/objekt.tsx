'use client'

import { Objekt } from "@/types/api"
import Image from "next/image"
import { useState } from "react"

export default function Objekt({ frontImage, backImage, class: className, memberName, season, collection, num, tokenId }: Objekt) {
  const [image, setImage] = useState(frontImage)
  const [loading, setLoading] = useState(true)

  function toggleImage() {
    setLoading(true)
    setImage(image === frontImage ? backImage : frontImage)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Image onLoadingComplete={() => setLoading(false)} className={loading ? 'blur-sm' : ''} onClick={() => toggleImage()} src={image} width={300} height={300} alt={`${memberName} ${collection} ${num}`} />
      <div className="grid grid-cols-1 grid-rows-3 lg:grid-cols-2 lg:grid-rows-2">
        <p className="font-bold">{memberName} {collection}</p>
        <p className="flex font-semibold lg:justify-end">{className}</p>
        <p>#{num}</p>
      </div>
    </div>
  )
}