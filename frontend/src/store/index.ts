import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { type State } from './types'
import { type PodcastFeed } from '../types'

const useGlobalStore = create<State>()(
  devtools(
    (set, get) => ({
      podcast: null,
      setPodcast: (podcast: PodcastFeed) => set({ podcast }),
      getFeedItemByGuid: (guid: string) => {
        console.log('items', get().podcast?.items)
        return get().podcast?.items.find(item => item.guid === guid)
      }
    }),
    {
      name: 'store'
    }
  )
)

export default useGlobalStore
