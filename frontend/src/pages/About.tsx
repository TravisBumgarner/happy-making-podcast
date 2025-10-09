import Typography from '@mui/material/Typography'

import PageWrapper from '../sharedComponents/PageWrapper'
import useGlobalStore from '../store'

const Contact = () => {
  const podcast = useGlobalStore(state => state.podcast)
  if (!podcast) return null

  return (
    <PageWrapper width="medium" minHeight staticContent>
      <Typography variant="h2">About</Typography>
      {podcast.description.split('\n').map((line, index) => (
        <Typography key={index}>{line}</Typography>
      ))}
    </PageWrapper>
  )
}

export default Contact
