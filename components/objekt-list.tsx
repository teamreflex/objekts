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

function filterObjekts(objekts: RemoteObjekt[], filter: string) {
  switch (filter) {
    case 'digital':
      return objekts.filter(objekt => objekt.collection.includes('Z'))
    case 'physical':
      return objekts.filter(objekt => objekt.collection.includes('A'))
    default:
      return objekts;
  }
}

function sortObjekts(objekts: RemoteObjekt[], sort: string) {
  switch (sort) {
    case 'newest':
      return objekts.slice().sort((a, b) => b.tokenId - a.tokenId);
    case 'oldest':
      return objekts.slice().sort((a, b) => a.tokenId - b.tokenId);
    default:
      return objekts;
  }
}

export default function ObjektList({ initialObjekts }: { initialObjekts: RemoteObjekt[] }) {
  const [filter, setFilter] = useState<string>('all');
  const [sort, setSort] = useState<string>('newest');
  const [objekts, setObjekts] = useState<RemoteObjekt[]>(initialObjekts.sort((a, b) => b.tokenId - a.tokenId));

  function onFilterChange(filter: string, sort: string) {
    setFilter(filter);
    setSort(sort);

    const sorted = sortObjekts(initialObjekts, sort);
    const filtered = filterObjekts(sorted, filter);
    setObjekts(filtered);
  }

  return <>
    <div className="flex flex-row justify-between">
      <div className="font-bold">{objekts.length} Objekts</div>

      <div className="flex flex-row gap-2">
        {/* sort */}
        <Select defaultValue="newest" onValueChange={e => onFilterChange(filter, e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>

        {/* filter */}
        <Select defaultValue="all" onValueChange={e => onFilterChange(e, sort)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="digital">Digital</SelectItem>
            <SelectItem value="physical">Physical</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    <div className="grid grid-cols-2 items-center gap-2 lg:grid-cols-4">
      {objekts.map((objekt) => <Objekt key={objekt.tokenId} {...objekt} />)}
    </div>
  </>
}