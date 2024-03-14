import { Box, Typography } from '@mui/material'
import './index.css'

function TotalTime({ progress }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ position: 'relative', width: 160, height: 160 }}>
                <div className="circle">
                    <div className="wave" style={{ '--progress': (44 - progress) + '%' }}></div>
                </div>
                <Typography variant='h4'
                    sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2, color: 'white', fontWeight: 'bold' }}>
                    {(progress * 100).toFixed(0)}
                </Typography>
            </Box>
            <Typography
                sx={{ color: 'gray', textAlign: 'center', mt: 1, fontWeight: 'bold', fontSize: '18px' }}>Tổng thời gian</Typography>
        </Box>
    )
}

export default TotalTime
