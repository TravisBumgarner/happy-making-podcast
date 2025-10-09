export interface ParsedRSSFeed {
  items: ParsedRSSItem[]
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
    categoriesWithSubs: Array<{
      name: string
      subs: Array<{
        name: string
      }> | null
    }>
    author: string
    subtitle: string
    summary: string
    explicit: string
  }
}

export interface ParsedRSSItem {
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
}
