import type { RiversideEpisode, RiversideFeed } from '../types'

export interface State {
  podcast: RiversideFeed | null
  setPodcast: (podcast: RiversideFeed) => void
  getFeedItemByGuid: (guid: string) => RiversideEpisode | undefined
}
