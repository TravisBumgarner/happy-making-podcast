type Route = {
  key: string
  href: (arg?: string) => string
  label: string
  target?: string
}

export const ROUTES: Record<string, Route> = {
  feed: {
    key: 'feed',
    href: () => '/',
    label: 'Episodes',
    target: undefined
  },
  about: {
    key: 'about',
    href: () => '/about',
    label: 'About the Show',
    target: undefined
  },
  aboutAuthor: {
    key: 'aboutAuthor',
    href: () => 'https://travisbumgarner.dev/',
    label: 'About the Author',
    target: '_blank'
  },
  contact: {
    key: 'contact',
    href: () => '/contact',
    label: 'Contact',
    target: undefined
  },
  episode: {
    key: 'episode',
    href: (guid?: string) => (guid ? `/episode/${guid}` : '/episode/:guid'),
    label: '',
    target: undefined
  },
  recommend: {
    key: 'recommend',
    href: () => '/recommend',
    label: 'Recommend a Guest',
    target: undefined
  },
  apple: {
    key: 'apple',
    href: () =>
      'https://podcasts.apple.com/us/podcast/happy-making/id1845205060',
    label: 'Apple Podcasts',
    target: '_blank'
  },
  spotify: {
    key: 'spotify',
    href: () => 'https://open.spotify.com/show/1PFV2txwNsUZ801wo08ucC',
    label: 'Spotify',
    target: '_blank'
  },
  amazon: {
    key: 'amazon',
    href: () =>
      'https://music.amazon.com/podcasts/3b4cd969-0e3c-4508-bc86-4c3a98121d8c/happy-making',
    label: 'Amazon Music',
    target: '_blank'
  },
  discord: {
    key: 'discord',
    href: () => 'foo',
    label: 'Discord',
    target: undefined
  }
} as const
