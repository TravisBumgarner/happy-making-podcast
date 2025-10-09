import { type Episode, type PodcastFeed } from '../types'

export interface State {
  podcast: PodcastFeed | null
  setPodcast: (podcast: PodcastFeed) => void
  getFeedItemByGuid: (guid: string) => Episode | undefined
}
