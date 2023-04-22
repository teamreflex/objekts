'use client'

import { Artist, Objekt as RemoteObjekt } from "@/types/api";
import { useEffect, useState } from "react";
import Objekt from "@/components/objekt";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InfiniteScroll from "react-infinite-scroll-component";

type ObjektListProps = {
  initialObjekts: RemoteObjekt[]
  initialPageKey: string | undefined
  totalCount: number
  artist: Artist
  address: string
}

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

export default function ObjektList({ initialObjekts, initialPageKey, totalCount, artist, address }: ObjektListProps) {
  const [filter, setFilter] = useState<string>('all');
  const [sort, setSort] = useState<string>('newest');
  const [objekts, setObjekts] = useState<RemoteObjekt[]>(initialObjekts.sort((a, b) => b.tokenId - a.tokenId));
  const [filteredObjekts, setFilteredObjekts] = useState<RemoteObjekt[]>(objekts);
  const [pageKey, setPageKey] = useState<string | undefined>(initialPageKey);

  useEffect(() => {
    function executeFilter(newObjekts: RemoteObjekt[]) {
      const sorted = sortObjekts(newObjekts, sort);
      return filterObjekts(sorted, filter);
    }

    setFilteredObjekts(executeFilter(objekts));
  }, [filter, sort, objekts])


  function onFilterChange(filter: string, sort: string) {
    setFilter(filter);
    setSort(sort);
  }

  async function fetchMore() {
    const res = await fetch(`/${artist}/${address}/${pageKey ?? ''}`);
    if (res.ok) {
      const { objekts: newObjekts, pageKey } = await res.json();
      setObjekts([...objekts, ...newObjekts]);
      setPageKey(pageKey);
    }
  }

  return <>
    <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
      <div className="text-center font-bold lg:text-left">{totalCount} Objekts</div>

      {/* sort and filter */}
      <div className="flex flex-row justify-center gap-2 lg:justify-end">
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

    {/* display */}
    <InfiniteScroll
      className="grid grid-cols-2 items-center gap-2 lg:grid-cols-4"
      dataLength={filteredObjekts.length}
      next={fetchMore}
      hasMore={pageKey !== undefined}
      loader={<h4>Loading...</h4>}
    >
      {filteredObjekts.map((objekt) => <Objekt key={objekt.tokenId} {...objekt} />)}
    </InfiniteScroll>
  </>
}