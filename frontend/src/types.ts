
export interface RiversideFeed {
  items: RiversideEpisode[]
  feedUrl: string
  paginationLinks: {
    self: string
  }
  creator: string
  title: string
  description: string
  author: string
  pubDate: string
  generator: string
  link: string
  language: string
  copyright: string
  lastBuildDate: string
  ttl: string
  itunes: {
    owner: {
      name: string
      email: string
    }
    image: string
    categories: string[]
    categoriesWithSubs: {
      name: string
      subs: { name: string }[] | null
    }[]
    author: string
    summary: string
    explicit: string
  }
}

export interface RiversideEpisode {
  creator: string
  title: string
  link: string
  pubDate: string
  enclosure: {
    url: string
    length: string
    type: string
  }
  'dc:creator': string
  content: string
  contentSnippet: string
  guid: string
  isoDate: string
  itunes: {
    summary: string
    explicit: string
    duration: string
    image: string
    season: string
    episodeType: string
  }
}


