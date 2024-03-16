/* eslint-disable react/no-unknown-property */
import { Box, Typography } from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

export default function Notifications() {

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: 5, pl: 1, mr: 1, gap: 1, bgcolor: '#B0E0E6' }}>
      <FiberManualRecordIcon sx={{ color: '#696969', fontSize: '10px' }} />
      <Typography sx={{ textAlign:'center', fontFamily: '"Crimson Text", serif', fontSize: '18px', fontWeight: 600, color:'#555555', mt: 1 }}>
        <marquee scrollamount="3">Cập nhật tính năng mới: Theo dõi giờ theo ngày.</marquee>
      </Typography>
    </Box>
  )
}