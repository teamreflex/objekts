export type AvailableArtist = {
  name: string
  contractAddress: string
}

export type Artist = 'triples' | 'artms'

export const artists: Record<Artist, AvailableArtist> = {
  'triples': {
    name: 'tripleS',
    contractAddress: '0xA4B37bE40F7b231Ee9574c4b16b7DDb7EAcDC99B'
  },
  'artms':{
    name: 'ARTMS',
    contractAddress: ''
  }
}

export type Objekt = {
  frontImage: string
  backImage: string
  class: string
  memberName: string
  season: string
  collection: string
  num: number
  tokenId: number
}