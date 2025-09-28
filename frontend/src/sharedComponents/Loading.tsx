import { Typography, Box } from '@mui/material'

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flexGrow: 1
      }}
    >
      <Typography>Fetching...</Typography>
    </Box>
  )
}

export default Loading
