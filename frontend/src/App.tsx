import Header from './components/Header'
import useFetchRSSFeed from './hooks/useFetchRSSFeed'
import Router from './components/Router'
import { Box } from '@mui/material'
import { Z_INDICES } from './styles/consts'
import Loading from './sharedComponents/Loading'
import { BrowserRouter } from 'react-router-dom'
import AppThemeProvider from './styles/Theme'

function App() {
  const { error, loading } = useFetchRSSFeed()
  console.log('loading', loading, 'error', error)
  if (loading) {
    return (
      <Box
        sx={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          position: 'fixed',
          zIndex: Z_INDICES.APP_LOADING,
          backgroundColor: 'background.paper'
        }}
      >
        <Loading />
      </Box>
    )
  }

  return (
    <>
      <Header />
      <Router />
    </>
  )
}

const WrappedApp = () => {
  return (
    <BrowserRouter>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </BrowserRouter>
  )
}

export default WrappedApp
