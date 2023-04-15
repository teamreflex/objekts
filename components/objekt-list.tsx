'use client'

import { Objekt as RemoteObjekt } from "@/types/api";
import { useState } from "react";
import Objekt from "@/components/objekt";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ObjektList({ initialObjekts }: { initialObjekts: RemoteObjekt[] }) {
  const [filter, setFilter] = useState<string>('newest');
  const [objekts, setObjekts] = useState<RemoteObjekt[]>(initialObjekts.sort((a, b) => b.tokenId - a.tokenId));

  function onFilterChange(filter: string) {
    setFilter(filter);
    setObjekts(initialObjekts.slice().sort((a, b) => {
      switch (filter) {
        case 'newest':
          return b.tokenId - a.tokenId;
        case 'oldest':
          return a.tokenId - b.tokenId;
        default:
          return 0;
      }
    }));

    console.log(objekts)
  }

  return <>
    <div className="flex flex-row justify-between">
      <div className="font-bold">{objekts.length} Objekts</div>
      <Select defaultValue="newest" onValueChange={e => onFilterChange(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="grid grid-cols-2 items-center gap-2 lg:grid-cols-4">
      {objekts.map((objekt) => <Objekt key={objekt.tokenId} {...objekt} />)}
    </div>
  </>
}