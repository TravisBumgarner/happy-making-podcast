export interface FeedChannel {
  title: string
  guid: string
  lastBuildDate: string
  generator: string
  language: string
  copyright: string
  managingEditor: string
  summary: string
  image: string
  link: string
  explicit: boolean
  type: string
  categories: string[]
  owner: {
    name: string
    author: string
  }
}

export interface FeedEnclosure {
  url: string
  length?: number
  type?: string
}

export interface FeedAlternateEnclosure {
  type: string
  title: string
  source: string
}

export interface FeedItem {
  title: string
  description: string
  shortDescription: string
  content: string
  link: string
  guid: string
  pubDate: Date
  itunes: {
    image?: string
    duration?: string
    explicit: boolean
    episodeType?: string
  }
  enclosure: FeedEnclosure
  alternateEnclosures: Record<'video/youtube', FeedAlternateEnclosure>
}

export interface Feed {
  channel: FeedChannel
  items: FeedItem[]
}
