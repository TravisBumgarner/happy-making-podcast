export interface PodcastFeed {
  items: Episode[]
  feedUrl: string
  image: {
    link: string
    url: string
    title: string
  }
  paginationLinks: {
    self: string
  }
  title: string
  description: string
  managingEditor: string
  generator: string
  link: string
  language: string
  copyright: string
  lastBuildDate: string
  itunes: {
    owner: {
      name: string
    }
    image: string
    categories: string[]
    categoriesWithSubs: {
      name: string
      subs: { name: string }[] | null
    }[]
    author: string
    subtitle: string
    summary: string
    explicit: string
  }
}

export interface Episode {
  title: string
  link: string
  pubDate: string
  'content:encoded': string
  'content:encodedSnippet': string
  enclosure: {
    url: string
    length: string
    type: string
  }
  content: string
  contentSnippet: string
  guid: string
  isoDate: string
  itunes: {
    explicit: string
    duration: string
    image: string
    episodeType: string
  }

  /** ✅ Flattened YouTube info returned from backend */
  youtube?: {
    title: string
    url: string
  } | null
}

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


