import { Box, Link, List, ListItem, Typography, useTheme } from '@mui/material'
import useGlobalStore from '../store'

import { ROUTES } from '../consts'
import { SPACING, subtleBackground } from '../styles/consts'
import PageWrapper from '../sharedComponents/PageWrapper'

const Feed = () => {
  const feedItems = useGlobalStore(state => state.feedItems)
  const theme = useTheme()

  return (
    <PageWrapper width="medium">
      <List>
        {feedItems.map(feedItem => (
          <Link key={feedItem.guid} href={ROUTES.feedItem.href(feedItem.guid)}>
            <ListItem
              sx={{
                backgroundColor: subtleBackground(theme.palette.mode),
                '&:hover': {
                  backgroundColor: subtleBackground(
                    theme.palette.mode,
                    'slightly'
                  )
                }
              }}
            >
              {' '}
              <Box
                sx={{
                  padding: SPACING.MEDIUM.PX,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: SPACING.SMALL.PX
                }}
              >
                <Typography variant="h6">{feedItem.title}</Typography>

                <Typography>{feedItem.pubDate.toLocaleDateString()}</Typography>
                <Typography>{feedItem.shortDescription}</Typography>
              </Box>
            </ListItem>
          </Link>
        ))}
      </List>
    </PageWrapper>
  )
}

export default Feed
