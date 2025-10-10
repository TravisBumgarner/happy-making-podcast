import { Box, Link, List, ListItem } from '@mui/material'
import { FONT_SIZES, SPACING } from '../styles/consts'
import { FaApple, FaDiscord, FaSpotify, FaAmazon } from 'react-icons/fa'
import { ROUTES } from '../consts'
import { Link as RouterLink } from 'react-router-dom'
import React from 'react'

const iconMap: Record<Partial<keyof typeof ROUTES>, React.ElementType> = {
  discord: FaDiscord,
  apple: FaApple,
  spotify: FaSpotify,
  amazon: FaAmazon
}

const LINKS = ['apple', 'spotify', 'amazon']

const PodcastLinks = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: SPACING.SMALL.PX,
        fontSize: FONT_SIZES.LARGE.PX
      }}
    >
      {LINKS.map(link => (
        <Link
          sx={{ display: 'block' }}
          component={RouterLink}
          to={ROUTES[link].href()}
          target={ROUTES[link].target}
        >
          {iconMap[link]
            ? React.createElement(iconMap[link]!, { size: 24 })
            : ROUTES[link].label}
        </Link>
      ))}
    </Box>
  )
}

export default PodcastLinks
