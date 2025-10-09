import Typography from '@mui/material/Typography'

import PageWrapper from '../sharedComponents/PageWrapper'
import ContactForm from '../sharedComponents/ContactForm'

const Error404 = () => {
  return (
    <PageWrapper width="small" minHeight staticContent>
      <Typography variant="h2">Something went wrong.</Typography>
      <Typography>The page you were looking for could not be found.</Typography>
      <Typography>What were you trying to do?</Typography>
      <ContactForm fieldsToHide={['name', 'email']} formSuffix="error-404" />
    </PageWrapper>
  )
}

export default Error404
