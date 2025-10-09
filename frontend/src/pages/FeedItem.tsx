import { useParams } from 'react-router-dom'
import useGlobalStore from '../store'
import { useTheme } from '@mui/material/styles'
import Error404 from './Error404'
import { Box, Typography } from '@mui/material'
import { convertCloudinaryUrlsToImages } from '../utils/imageParser'
import PageWrapper from '../sharedComponents/PageWrapper'
import { BORDER_RADIUS, SPACING, subtleBackground } from '../styles/consts'
import YouTubeEmbed from '../sharedComponents/Youtube'

const FeedItem = () => {
  const { guid } = useParams<{ guid: string }>()
  const getFeedItemByGuid = useGlobalStore(state => state.getFeedItemByGuid)
  const feedItem = getFeedItemByGuid(guid ?? '')
  const theme = useTheme()

  console.log('guid', guid, feedItem)
  if (!guid || !feedItem) {
    return <Error404 />
  }

  // Process the description to convert Cloudinary URLs to images
  const processedDescription = convertCloudinaryUrlsToImages(feedItem.content)
  console.log('foo', feedItem)
  return (
    <PageWrapper width="medium">
      <Box
        sx={{
          padding: SPACING.LARGE.PX,
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING.MEDIUM.PX,
          backgroundColor: subtleBackground(theme.palette.mode)
        }}
      >
        <Box>
          <Typography variant="h2">{feedItem.title}</Typography>
          <Typography variant="body2">{feedItem.pubDate}</Typography>
        </Box>
        <audio
          controls
          src={feedItem.enclosure.url}
          style={{
            width: '100%',
            borderRadius: BORDER_RADIUS.ZERO.PX
          }}
        />
        {feedItem.youtube?.url && (
          <YouTubeEmbed videoUrl={feedItem.youtube.url} />
        )}
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
    </PageWrapper>
  )
}

export default FeedItem
