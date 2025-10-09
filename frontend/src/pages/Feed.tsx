import { Box, List, ListItem, Typography, useTheme } from '@mui/material'
import useGlobalStore from '../store'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'

import { ROUTES } from '../consts'
import { SPACING, subtleBackground } from '../styles/consts'
import PageWrapper from '../sharedComponents/PageWrapper'

const getFirstParagraph = (html: string) => {
  const div = document.createElement('div')
  div.innerHTML = html
  const p = div.querySelector('p')
  return p ? p.innerHTML : ''
}

const Feed = () => {
  const feedItems = useGlobalStore(state => state.podcast?.items)
  const theme = useTheme()

  return (
    <PageWrapper width="medium">
      <List>
        {feedItems &&
          feedItems.map(feedItem => (
            <Link
              component={RouterLink}
              key={feedItem.guid}
              to={ROUTES.feedItem.href(feedItem.guid)}
            >
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
                  <Typography variant="h2">{feedItem.title}</Typography>

                  <Typography variant="body2">
                    {new Date(feedItem.pubDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: getFirstParagraph(feedItem.content)
                      }}
                    />
                  </Typography>
                </Box>
              </ListItem>
            </Link>
          ))}
      </List>
    </PageWrapper>
  )
}

export default Feed
