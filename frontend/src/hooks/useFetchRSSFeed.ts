import { useEffect, useState } from 'react'

import {
  type Feed,
  type FeedAlternateEnclosure,
  type FeedChannel,
  type FeedEnclosure,
  type FeedItem
} from '../types'
import useGlobalStore from '../store'

const RSS_FEED = 'https://feeds.captivate.fm/happy-making/'

export function parseRSS(xml: string): Feed {
  const doc = new DOMParser().parseFromString(xml, 'application/xml')

  const text = (sel: string, parent: ParentNode = doc): string =>
    parent.querySelector(sel)?.textContent?.trim() ?? ''

  const attr = (
    sel: string,
    attrName: string,
    parent: ParentNode = doc
  ): string | undefined =>
    parent.querySelector(sel)?.getAttribute(attrName) ?? undefined

  // ---- Channel ----
  const channelEl = doc.querySelector('channel')
  if (!channelEl) throw new Error('Invalid RSS: no <channel>')

  const channel: FeedChannel = {
    title: text('title', channelEl),
    guid: text('podcast\\:guid', channelEl),
    lastBuildDate: text('lastBuildDate', channelEl),
    generator: text('generator', channelEl),
    language: text('language', channelEl),
    copyright: text('copyright', channelEl),
    managingEditor: text('managingEditor', channelEl),
    summary: text('description', channelEl),
    image:
      text('image > url', channelEl) ||
      attr('itunes\\:image', 'href', channelEl) ||
      '',
    link: text('link', channelEl),
    explicit: text('itunes\\:explicit', channelEl).toLowerCase() === 'true',
    type: text('itunes\\:type', channelEl),
    categories: Array.from(channelEl.querySelectorAll('itunes\\:category'))
      .map(el => el.getAttribute('text') ?? '')
      .filter(Boolean),
    owner: {
      name: text('itunes\\:owner > itunes\\:name', channelEl),
      author: text('itunes\\:author', channelEl)
    }
  }

  // ---- Items ----
  const items: FeedItem[] = Array.from(doc.querySelectorAll('item')).map(
    itemEl => {
      const pubDate = new Date(text('pubDate', itemEl))

      const enclosureEl = itemEl.querySelector('enclosure')
      const enclosure: FeedEnclosure = {
        url: enclosureEl?.getAttribute('url') ?? '',
        length: enclosureEl?.getAttribute('length')
          ? Number(enclosureEl.getAttribute('length'))
          : undefined,
        type: enclosureEl?.getAttribute('type') ?? undefined
      }

      const alternateEnclosures = Array.from(
        itemEl.getElementsByTagNameNS(
          'https://podcastindex.org/namespace/1.0',
          'alternateEnclosure'
        )
      ).reduce((acc, alt) => {
        const type = alt.getAttribute('type') ?? ''
        const title = alt.getAttribute('title') ?? ''
        console.log('fuck me', alt)
        const source =
          alt
            .getElementsByTagNameNS(
              'https://podcastindex.org/namespace/1.0',
              'source'
            )?.[0]
            ?.getAttribute('uri') ?? ''

        if (type) {
          acc[type] = { type, title, source }
        }

        return acc
      }, {} as Record<string, FeedAlternateEnclosure>)

      const descriptionContent = text('description', itemEl)

      // Extract first <p> tag content for short description
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = descriptionContent
      const firstPTag = tempDiv.querySelector('p')
      const shortDescription = firstPTag?.textContent?.trim() ?? ''

      return {
        title: text('title', itemEl),
        shortDescription,
        description: descriptionContent,
        content: text('content\\:encoded', itemEl),
        link: text('link', itemEl),
        guid: text('guid', itemEl),
        pubDate,
        itunes: {
          title: text('itunes\\:title', itemEl) || text('title', itemEl),
          image: attr('itunes\\:image', 'href', itemEl),
          duration: text('itunes\\:duration', itemEl),
          explicit: text('itunes\\:explicit', itemEl).toLowerCase() === 'true',
          episodeType: text('itunes\\:episodeType', itemEl)
        },
        enclosure,
        alternateEnclosures
      }
    }
  )

  return { channel, items }
}
const useFetchRSSFeed = () => {
  const setFeedItems = useGlobalStore(state => state.setFeedItems)
  const setFeedChannel = useGlobalStore(state => state.setFeedChannel)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const fetchFeedItems = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(RSS_FEED, {
          headers: { Accept: 'application/rss+xml,text/xml' }
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const xml = await res.text()
        console.log(xml)

        if (cancelled) return
        const feed = parseRSS(xml)
        setFeedItems(feed.items)
        console.log('feed ruda', feed)
        setFeedChannel(feed.channel)
      } catch (e: unknown) {
        const errorMessage =
          e instanceof Error ? e.message : 'Failed to load feed (CORS?)'
        setError(errorMessage)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }
    fetchFeedItems()

    return () => {
      cancelled = true
    }
  }, [])

  return { error, loading }
}

export default useFetchRSSFeed
