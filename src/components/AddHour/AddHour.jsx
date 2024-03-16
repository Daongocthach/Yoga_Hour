import { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Alert, Snackbar, Typography, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/DriveFileRenameOutline'

function AddHour({ updateYogaTimeInFirebase, updateTotalInFirebase, updateTimeDateInFirebase, time, setTime, total, setTotal, timeOfDate, setTimeOfDate }) {
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
    const handleClickAdd = async () => {
        const newHour = parseInt(hour)
        updateYogaTimeInFirebase(newHour)
        setTime(newHour)
        if (newHour >= time) {
            const newTotal = total + (newHour - time)
            setTotal(newTotal)
            updateTotalInFirebase(newTotal)

            const newTimeOfDate = timeOfDate + (newHour - time)
            setTimeOfDate(newTimeOfDate)
            updateTimeDateInFirebase(newTimeOfDate)
        } else {
            let newTotal = total - (time - newHour)
            if (newTotal < 0)
                newTotal = 0
            setTotal(newTotal)
            updateTotalInFirebase(newTotal)
            let newTimeOfDate = timeOfDate - (time - newHour)
            if (newTimeOfDate < 0)
                newTimeOfDate = 0
            setTimeOfDate(newTimeOfDate)
            updateTimeDateInFirebase(newTimeOfDate)
        }
        handleClose()
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 6 }}>
                <Button endIcon={<EditIcon sx={{ fontSize: '30px', color: 'white' }} />} sx={{ fontWeight: 'bold', color: '#696969', height: 40 }}
                    onClick={handleClickOpen}>
                    <Typography variant='h3' sx={{ color: 'white', fontWeight: 'bold', fontFamily: '"Crimson Text", serif' }}>{time}</Typography>
                </Button>
                <Typography variant='body2' sx={{ color: '#FFE500', fontWeight: 500, textAlign: 'center', fontFamily: '"Crimson Text", serif', height: 15 }}>Hôm nay:</Typography>
                <Typography variant='h6' sx={{ color: '#FFE500', fontWeight: 700, textAlign: 'center', fontFamily: '"Crimson Text", serif', height: 25 }}>+ {timeOfDate} </Typography>
                <Typography variant='body2' sx={{ color: '#FFE500', fontWeight: 500, textAlign: 'center', fontFamily: '"Crimson Text", serif' }}>Giờ</Typography>
            </Box>
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