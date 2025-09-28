import { type FeedChannel, type FeedItem } from '../types'

export interface State {
  feedItems: FeedItem[]
  setFeedItems: (feedItems: FeedItem[]) => void
  feedChannel: FeedChannel | null
  setFeedChannel: (channel: FeedChannel) => void
  getFeedItemByGuid: (guid: string) => FeedItem | undefined
}
