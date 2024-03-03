import { useState } from 'react'
import { Menu, Box, MenuItem, IconButton, Tooltip, Snackbar, Alert } from '@mui/material'
import { Settings, PersonAdd, ManageAccounts } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { child, get, ref, set } from 'firebase/database'
import { database } from '../../../../firebase'
import { auth } from '../../../../firebase'

function Account() {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)
    const userId = localStorage.getItem('userId')
    const dbRef = ref(database)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleLogout = () => {
        signOut(auth).then(() => {
            localStorage.removeItem('userId')
            setShowAlert(true)
            setTimeout(() => {
                navigate('/')
            }, 1000)
        })
            .catch((error) => [
                console.log(error)

            ])
    }
    const handleReset = () => {
        set(child(dbRef, `users/${userId}/hour`), {
            time: 0
        })
        set(child(dbRef, `users/${userId}/total`), {
            time: 0
        })
        window.location.reload()
    }
    return (
        <Box>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ padding: 0, marginRight: '10px', color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <ManageAccounts sx={{ fontSize: 40, color: 'white' }} />
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu-account"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                {!userId && <MenuItem onClick={handleClose}>
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <PersonAdd fontSize="small" />
                        Đăng nhập
                    </Link>
                </MenuItem>}
                {userId && <MenuItem onClick={handleReset}>
                    <Settings fontSize="small" />
                    Đặt lại
                </MenuItem>}
                {userId && <MenuItem onClick={handleLogout}>
                    <Settings fontSize="small" />
                    Đăng xuất
                </MenuItem>}
            </Menu>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showAlert} autoHideDuration={1000} onClose={() => setShowAlert(false)}>
                <Alert severity="success" variant='filled' onClose={() => setShowAlert(false)}>
                    Đăng xuất thành công!
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showAlertFail} onClose={() => setShowAlertFail(false)}>
                <Alert severity="error" variant='filled' onClose={() => setShowAlertFail(false)}>
                    Đăng xuất thất bại
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Account