import { AvailableArtist } from "@/types/api";

export default function ComingSoon({ artist }: { artist: AvailableArtist }) {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-center">
        <div>{artist.name} is coming soon!</div>
      </div>
    </section>
  )
}