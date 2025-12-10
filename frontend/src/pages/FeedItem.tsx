import { useParams } from 'react-router-dom'
import useGlobalStore from '../store'
import { useTheme } from '@mui/material/styles'
import Error404 from './Error404'
import { Box, Typography } from '@mui/material'
import { convertCloudinaryUrlsToImages } from '../utils/imageParser'
import PageWrapper from '../sharedComponents/PageWrapper'
import { BORDER_RADIUS, SPACING, subtleBackground } from '../styles/consts'

const FeedItem = () => {
  const { guid } = useParams<{ guid: string }>()
  const getFeedItemByGuid = useGlobalStore(state => state.getFeedItemByGuid)
  const feedItem = getFeedItemByGuid(guid ?? '')
  const theme = useTheme()

  if (!guid || !feedItem) {
    return <Error404 />
  }

  const processedDescription = convertCloudinaryUrlsToImages(feedItem.content)

  return (
    <PageWrapper width="medium">
      <Box
        sx={{
          padding: { sm: SPACING.MEDIUM.PX, xs: SPACING.SMALL.PX },
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING.SMALL.PX,
          backgroundColor: subtleBackground(theme.palette.mode),
        }}
      >
        <Typography variant="h2">{feedItem.title}</Typography>

        <Typography variant="body2">
          {new Date(feedItem.pubDate).toLocaleDateString()}
        </Typography>
        <audio
          controls
          src={feedItem.enclosure.url}
          style={{
            width: '100%',
            borderRadius: BORDER_RADIUS.ZERO.PX
          }}
        />
        <img src={feedItem.itunes.image} alt={feedItem.title} style={{ width: '100%' }} />
        <Box
          sx={{
            // Text styles
            '& b, & strong': { fontWeight: 'bold' },
            '& i, & em': { fontStyle: 'italic' },
            '& u': { textDecoration: 'underline' },
            '& s, & strike, & del': { textDecoration: 'line-through' },
            '& blockquote': {
              borderLeft: '4px solid',
              borderColor: 'divider',
              pl: 2,
              color: 'text.secondary',
              fontStyle: 'italic'
            },

            // Headings
            '& h1': { typography: 'h4', mt: 2, mb: 1 },
            '& h2': { typography: 'h5', mt: 2, mb: 1 },

            // Paragraphs
            '& p': { typography: 'body1', mb: 1.5 },

            // Lists
            '& ul, & ol': { pl: 3, mb: 2 },
            '& li': { mb: 0.5 },

            // Links
            '& a': {
              color: 'primary.main',
              textDecoration: 'underline',
              '&:hover': { color: 'primary.dark' }
            },

            // Alignment (injected via inline styles in RSS)
            '& div[style*="text-align:center"]': { textAlign: 'center' },
            '& div[style*="text-align:right"]': { textAlign: 'right' },
            '& div[style*="text-align:justify"]': { textAlign: 'justify' }
          }}
          dangerouslySetInnerHTML={{ __html: processedDescription }}
        />
      </Box>
    </PageWrapper >
  )
}

export default FeedItem
