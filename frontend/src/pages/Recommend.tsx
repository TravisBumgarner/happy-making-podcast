import Typography from '@mui/material/Typography'

import PageWrapper from '../sharedComponents/PageWrapper'
import ContactForm from '../sharedComponents/ContactForm'

const Contact = () => {
  return (
    <PageWrapper width="small" minHeight staticContent>
      <Typography variant="h2">Recommend a guest!</Typography>
      <Typography variant="body1">
        Know someone with a great story about creativity, making, or chasing
        ideas? Nominate them (or yourself!) to be featured on the podcast. We
        would love to hear your suggestions.
      </Typography>
      <ContactForm formSuffix="recommend" />
    </PageWrapper>
  )
}

export default Contact
