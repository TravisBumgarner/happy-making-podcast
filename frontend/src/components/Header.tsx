import { Box, Link, Typography } from '@mui/material'
import useGlobalStore from '../store'
import { ROUTES } from '../consts'
import { SPACING } from '../styles/consts'
import Navigation from './Navigation'
import PageWrapper from '../sharedComponents/PageWrapper'

const Header = () => {
  const feedChannel = useGlobalStore(state => state.feedChannel)

  if (!feedChannel) return null
  return (
    <header style={{ padding: SPACING.LARGE.PX }}>
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
                src={feedChannel.image}
                alt={feedChannel.title}
                style={{ width: '50px' }}
              />
            </Box>
            <Link href={ROUTES.feed.href()} style={{ textDecoration: 'none' }}>
              <Typography variant="h1" style={{ whiteSpace: 'pre-wrap' }}>
                {feedChannel.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {feedChannel.summary}
              </Typography>
            </Link>
          </Box>
          <Box>
            <Navigation />
          </Box>
        </Box>
      </PageWrapper>
    </header>
  )
}

export default Header
