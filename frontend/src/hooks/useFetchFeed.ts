import { useEffect } from 'react'
import useGlobalStore from '../store'

const API_URL = 'http://localhost:8000/api/rss'

const useFetchFeed = () => {
  const setPodcast = useGlobalStore(state => state.setPodcast)

  useEffect(() => {
    const controller = new AbortController()
    const fetchFeed = async () => {
      try {
        const res = await fetch(API_URL, {
          signal: controller.signal
        })

        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        console.log('setting data', data)
        setPodcast(data)
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.log(err.message || 'Failed to fetch feed')
        }
      }
    }

    fetchFeed()
    return () => controller.abort()
  }, [])
}

export default useFetchFeed
