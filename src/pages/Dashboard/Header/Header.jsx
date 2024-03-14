import { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Alert, Snackbar, Typography, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/DriveFileRenameOutline'
import { child, set } from 'firebase/database'

function Header({ userId, dbRef, targetName, setTargetName }) {
    const [open, setOpen] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)
    const [name, setName] = useState('')
    const handleClickOpen = () => {
        setOpen(true)
        setName(targetName)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickEdit = async () => {
        setTargetName(name)
        set(child(dbRef, `users/${userId}/targetName`), {
            name
        })
        handleClose()
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#FF6A6A', textAlign: 'center', mt: 2, fontFamily: 'Merriweather", serif' }} >MỤC TIÊU 10.000 GIỜ</Typography>
            <Button endIcon={<EditIcon sx={{ fontSize: '30px', color: '#FF6A6A' }} />} sx={{ bgcolor: 'inherit', fontSize: '18px', fontWeight: 'bold', color: '#696969' }}
                onClick={handleClickOpen}>
                <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#FF6A6A', textAlign: 'center', fontFamily: 'Merriweather", serif' }} textTransform={'uppercase'}>{targetName}</Typography>
            </Button>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showAlert} autoHideDuration={1000} onClose={() => setShowAlert(false)}>
                <Alert severity="success" variant='filled' onClose={() => setShowAlert(false)}>
                    Sửa thành công!
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showAlertFail} autoHideDuration={1000} onClose={() => setShowAlertFail(false)}>
                <Alert severity="error" variant='filled' onClose={() => setShowAlertFail(false)}>
                    Sửa thất bại!
                </Alert>
            </Snackbar>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle sx={{ color: '#4F4F4F', fontWeight: 'bold' }} >Nhập tên mục tiêu</DialogTitle>
                <DialogContent >
                    <TextField fullWidth size='small' label="Tên mục tiêu" sx={{ mt: 2 }} onFocus={(e) => e.target.select()} value={name}
                        onChange={(e) => setName(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: '#4F4F4F', fontWeight: 'bold' }}>Hủy</Button>
                    <Button onClick={handleClickEdit} sx={{ fontWeight: 'bold' }}>Sửa</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Header