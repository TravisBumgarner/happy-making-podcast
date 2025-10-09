type Route = {
  key: string
  href: (arg?: string) => string
  label: string
}

export const ROUTES: Record<string, Route> = {
  feed: {
    key: 'feed',
    href: () => '/',
    label: 'Episodes'
  },
  about: {
    key: 'about',
    href: () => '/about',
    label: 'About'
  },
  contact: {
    key: 'contact',
    href: () => '/contact',
    label: 'Contact'
  },
  episode: {
    key: 'episode',
    href: (guid?: string) => (guid ? `/episode/${guid}` : '/episode/:guid'),
    label: ''
  },
  recommend: {
    key: 'recommend',
    href: () => '/recommend',
    label: 'Recommend a Guest'
  },
  apple: {
    key: 'apple',
    href: () => 'foo',
    label: 'Apple Podcasts'
  },
  spotify: {
    key: 'spotify',
    href: () => 'foo',
    label: 'Spotify'
  },
  amazon: {
    key: 'amazon',
    href: () => 'foo',
    label: 'Amazon Music'
  },
  discord: {
    key: 'discord',
    href: () => 'foo',
    label: 'Discord'
  }
} as const
