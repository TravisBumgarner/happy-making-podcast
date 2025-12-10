import { Box, Button, List, ListItem, Typography, useTheme } from '@mui/material'
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
      <List sx={{ gap: SPACING.MEDIUM.PX, display: 'flex', flexDirection: 'column' }}>
        {feedItems &&
          feedItems.map(feedItem => (
            <ListItem
              key={feedItem.guid}
              sx={{
                backgroundColor: subtleBackground(theme.palette.mode),
              }}
            >
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
                <img src={feedItem.itunes.image} alt={feedItem.title} style={{ width: '100%' }} />
                <Typography variant="body1" color="textSecondary">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: getFirstParagraph(feedItem.content)
                    }}
                  />
                </Typography>
                <Button component={RouterLink} to={ROUTES.episode.href(feedItem.guid)} variant='contained' fullWidth>Listen!</Button>
              </Box>
            </ListItem>
          ))}
      </List>
    </PageWrapper >
  )
}

export default Feed
