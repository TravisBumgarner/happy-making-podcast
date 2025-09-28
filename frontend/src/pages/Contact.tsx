import Typography from '@mui/material/Typography'

import PageWrapper from '../sharedComponents/PageWrapper'
import ContactForm from '../sharedComponents/ContactForm'

const Contact = () => {
  return (
    <PageWrapper width="small" minHeight staticContent>
      <Typography variant="h2">Contact Us</Typography>
      <Typography variant="body1">
        We'd love to hear from you! Whether you have questions, feedback, or
        suggestions, please don't hesitate to reach out using the form below.
      </Typography>
      <ContactForm formSuffix="contact" />
    </PageWrapper>
  )
}

export default Contact
