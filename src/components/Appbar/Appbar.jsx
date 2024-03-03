import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Account from './Account/Account'
import ReadBookLogo from '../../assets/img/ReadBookLogo.png'

function AppBar() {

  return (
    <Box sx={{
      height: (theme) => theme.webCustom.appBarHeight, display: 'flex',
      alignItems: 'center', justifyContent: 'space-between', border: 'none',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1C1C1C' : '#1874CD')
    }} paddingX={{ xs: 0, md: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Link to={'/home'} style={{ textDecoration: 'none' }}><img src={ReadBookLogo} style={{ height: '50px', width: '50px' }} /> </Link>
        <Typography variant="h5" fontWeight="bold" color={'#E8E8E8'} >Yoga Hour</Typography>
      </Box>
      <Box sx={{ alignItems: 'center', gap: 2, paddingX: 2 }}>
        <Account/>
      </Box>
    </Box>
  )
}

export default AppBar