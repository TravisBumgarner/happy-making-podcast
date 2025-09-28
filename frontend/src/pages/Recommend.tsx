import Typography from '@mui/material/Typography'

import PageWrapper from '../sharedComponents/PageWrapper'
import ContactForm from '../sharedComponents/ContactForm'

const Contact = () => {
  return (
    <PageWrapper width="small" minHeight staticContent>
      <Typography variant="h2">Recommend a guest!</Typography>
      <Typography variant="body1">
        Please nominate a person or organization that you think would make a
        great guest for the podcast. We'd love to hear your suggestions!
      </Typography>
      <ContactForm formSuffix="recommend" />
    </PageWrapper>
  )
}

export default Contact
