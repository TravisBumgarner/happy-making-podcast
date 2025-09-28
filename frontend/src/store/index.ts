import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { type State } from './types'
import { type FeedChannel, type FeedItem } from '../types'

const useGlobalStore = create<State>()(
  devtools(
    (set, get) => ({
      feedItems: [],
      setFeedItems: (feedItems: FeedItem[]) => set({ feedItems }),
      feedChannel: null,
      setFeedChannel: (feedChannel: FeedChannel) => set({ feedChannel }),
      getFeedItemByGuid: (guid: string) => {
        return get().feedItems.find(item => item.guid === guid)
      }
    }),
    {
      name: 'store'
    }
  )
)

export default useGlobalStore
