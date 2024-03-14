import { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Alert, Snackbar, Typography, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/DriveFileRenameOutline'

function AddHour({ updateYogaTimeInFirebase, updateTotalInFirebase, time, setTime, total, setTotal }) {
    const [open, setOpen] = useState(false)
    const [hour, setHour] = useState(0)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
        setHour(time)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickAdd = () => {
        const newHour = parseInt(hour)
        updateYogaTimeInFirebase(newHour)
        setTime(newHour)
        if (newHour >= time) {
            const newTotal = total + (newHour - time)
            setTotal(newTotal)
            updateTotalInFirebase(newTotal)
        } else {
            let newTotal = total - (time - newHour)
            if (newTotal < 0)
                newTotal = 0
            setTotal(newTotal)
            updateTotalInFirebase(newTotal)
        }
        handleClose()
    }
    return (
        <Box sx={{ display:'flex', flexDirection:'column', pt: 4 }}>
            <Button endIcon={<EditIcon sx={{ fontSize: '30px', color: 'white' }} />} sx={{ bgcolor: 'inherit', fontSize: '18px', fontWeight: 'bold', color: '#696969', flex: 1 }}
                onClick={handleClickOpen}>
                <Typography variant='h4' sx={{ color: 'white', fontWeight: 'bold' }}>{time}</Typography>
            </Button>
            <Typography variant='subtitle1' sx={{ color: 'white', fontWeight: 'bold', textAlign:'center' }}>Hôm nay</Typography>
            <Typography variant='body2' sx={{ color: 'white', fontWeight: 'bold', textAlign:'center' }}>+8 giờ</Typography>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle sx={{ color: '#4F4F4F', fontWeight: 'bold' }} >Nhập giờ dạy trong tháng</DialogTitle>
                <DialogContent >
                    <TextField fullWidth size='small' label="Giờ" type='number' value={hour} sx={{ mt: 2 }} onFocus={(e) => e.target.select()}
                        onChange={(e) => setHour(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: '#4F4F4F', fontWeight: 'bold' }}>Hủy</Button>
                    <Button onClick={handleClickAdd} sx={{ fontWeight: 'bold' }}>Sửa</Button>
                </DialogActions>
            </Dialog>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showAlert} autoHideDuration={1000} onClose={() => setShowAlert(false)}>
                <Alert severity="success" variant='filled' onClose={() => setShowAlert(false)}>
                    Nhập thành công!
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showAlertFail} autoHideDuration={1000} onClose={() => setShowAlertFail(false)}>
                <Alert severity="error" variant='filled' onClose={() => setShowAlertFail(false)}>
                    Nhập thất bại!
                </Alert>
            </Snackbar>
        </Box>
    )
}
export default AddHour