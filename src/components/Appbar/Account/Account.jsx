import { useState } from 'react'
import { Menu, Box, MenuItem, IconButton, Tooltip, Snackbar, Alert, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { Settings, Logout, ManageAccounts } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { child, ref, set } from 'firebase/database'
import { database } from '../../../../firebase'
import { auth } from '../../../../firebase'

function Account() {
    const navigate = useNavigate()
    const d = new Date()
    const currentYear = d.getFullYear()
    const currentMonth = d.getMonth() + 1
    const [anchorEl, setAnchorEl] = useState(null)
    const userId = localStorage.getItem('userId')
    const email = localStorage.getItem('email')
    const dbRef = ref(database)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)
    const open = Boolean(anchorEl)
    const [openDialogLogout, setOpenDialogLogout] = useState(false)
    const [openDialogReset, setOpenDialogReset] = useState(false)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleLogout = () => {
        signOut(auth).then(() => {
            setShowAlert(true)
            localStorage.removeItem('email')
            localStorage.removeItem('userId')
            setTimeout(() => {
                navigate('/')
            }, 1000)
        })
            .catch((error) => [
                console.log(error)

            ])
    }
    const handleClickReset = () => {
        setOpenDialogReset(true)
        handleClose()
    }
    const handleClickLogout = () => {
        setOpenDialogLogout(true)
        handleClose()
    }
    const handleReset = () => {
        set(child(dbRef, `users/${userId}/years/${currentYear}/${currentMonth}`), {
            time: 0
        })
        set(child(dbRef, `users/${userId}/total`), {
            time: 0
        })
        set(child(dbRef, `users/${userId}/targetName`), {
            name: 'Dạy Yoga'
        })
        set(child(dbRef, `users/${userId}/date`), {
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
                {email && <MenuItem sx={{ color: '#4F4F4F' }}>
                    <b>{email}</b>
                </MenuItem>}
                {userId && <MenuItem onClick={handleClickReset} sx={{ gap: 2, color: '#4F4F4F' }}>
                    <Settings fontSize="small" />
                    <b>Xóa dữ liệu</b>
                </MenuItem>}
                {userId && <MenuItem onClick={handleClickLogout} sx={{ gap: 2, color: '#4F4F4F' }}>
                    <Logout fontSize="small" />
                    <b>Đăng xuất</b>
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
            <Dialog open={openDialogLogout} keepMounted onClose={() => {setOpenDialogLogout(false)}} >
                <DialogTitle>Bạn có muốn đăng xuất</DialogTitle>
                <DialogContent>
                    Nhấn "Ok" để đăng xuất, "Hủy" để thoát.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpenDialogLogout(false)}} sx={{ fontWeight: 'bold', color:'gray' }}>Hủy</Button>
                    <Button onClick={handleLogout} sx={{ fontWeight: 'bold' }}>Ok</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDialogReset} keepMounted onClose={() => {setOpenDialogReset(false)}} >
                <DialogTitle>Bạn có muốn xóa toàn bộ dữ liệu</DialogTitle>
                <DialogContent>
                    Toàn bộ dữ liệu của bạn sẽ được đặt lại.
                    Nhấn "Ok" để xóa dữ liệu, "Hủy" để thoát.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpenDialogReset(false)}} sx={{ fontWeight: 'bold', color:'gray' }}>Hủy</Button>
                    <Button onClick={handleReset} sx={{ fontWeight: 'bold' }}>Ok</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Account