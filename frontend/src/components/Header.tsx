import { Box, Link, List, ListItem, Typography } from '@mui/material'
import useGlobalStore from '../store'
import { ROUTES } from '../consts'
import { SPACING } from '../styles/consts'
import Navigation from './Navigation'
import PageWrapper from '../sharedComponents/PageWrapper'
import { Link as RouterLink } from 'react-router-dom'
import PodcastLinks from './PodcastLinks'

const Header = () => {
  const podcast = useGlobalStore(state => state.podcast)

  if (!podcast) return null
  return (
    <header>
      <PageWrapper width="medium">
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: SPACING.MEDIUM.PX
            }}
          >
            <Box>
              <img
                src={podcast.image.url}
                alt={podcast.title}
                style={{ width: '50px' }}
              />
            </Box>
            <Link
              component={RouterLink}
              to={ROUTES.feed.href()}
              style={{ textDecoration: 'none' }}
            >
              <Typography variant="h1" style={{ whiteSpace: 'pre-wrap' }}>
                {podcast.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {podcast.itunes.subtitle}
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: SPACING.MEDIUM.PX,
              justifyContent: 'flex-end'
            }}
          >
            <PodcastLinks />
            <Navigation />
          </Box>
        </Box>
      </PageWrapper>
    </header>
  )
}

export default Header
