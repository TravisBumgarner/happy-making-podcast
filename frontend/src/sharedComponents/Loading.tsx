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
      <Typography>Loading happiness...</Typography>
    </Box>
  )
}

export default Loading
