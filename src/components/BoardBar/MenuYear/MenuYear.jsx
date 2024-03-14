import { useState } from 'react'
import { KeyboardArrowDown } from '@mui/icons-material'
import { Button, Menu } from '@mui/material'
import EditHour from './EditHour/EditHour'

export default function MenuYear({ year, dbRef, userId, total }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <div>
            <Button endIcon={<KeyboardArrowDown />} sx={{ bgcolor: 'inherit', fontSize: '18px', fontWeight: 'bold', color: '#696969' }}
                aria-controls={open ? 'basic-menu' : undefined} onClick={handleClick}>
                {year?.year}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                {year?.data && Object.keys(year.data).map((month, index) => (
                    <EditHour key={index} year={year?.year} month={month} time={year.data[month]?.time} dbRef={dbRef} userId={userId} total={total}/>
                ))}
            </Menu>
        </div>
    )
}