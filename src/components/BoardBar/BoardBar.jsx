import { Box, Button, Menu } from '@mui/material'
import { History, KeyboardArrowDown } from '@mui/icons-material'
import { useState } from 'react'
import MenuYear from './MenuYear/MenuYear'
import Notifications from './Notifications/Notifications'

function BoardBar({ dbRef, userId, years, total }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <Box sx={{
            height: (theme) => theme.webCustom.boardBarHeight, display: 'flex', alignItems: 'center', borderTop: '1px solid #D3D3D3',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#363636' : '#E6E6FA')
        }} paddingX={{ xs: 0, md: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Button startIcon={<History />} endIcon={<KeyboardArrowDown />} sx={{ minWidth: 140, bgcolor: 'inherit', fontSize: '18px', fontWeight: 'bold', color: '#696969' }}
                    aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                    Lịch sử
                </Button>
                <Notifications />
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button'
                    }}
                >
                    {years?.map((year, index) => (
                        <MenuYear key={index} year={year} dbRef={dbRef} userId={userId} total={total} />
                    ))}
                </Menu>
            </Box>
        </Box>
    )
}

export default BoardBar