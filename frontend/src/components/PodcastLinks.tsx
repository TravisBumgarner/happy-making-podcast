import { Box, Link } from '@mui/material'
import React from 'react'
import { FaAmazon, FaApple, FaDiscord, FaSpotify } from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'
import { ROUTES } from '../consts'
import { FONT_SIZES, SPACING } from '../styles/consts'

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
          key={link}
          sx={{ display: 'block' }}
          component={RouterLink}
          to={ROUTES[link].href()}
          target={ROUTES[link].target}
        >
          {iconMap[link]
            ? React.createElement(iconMap[link], { size: 24 })
            : ROUTES[link].label}
        </Link>
      ))}
    </Box>
  )
}

export default PodcastLinks
