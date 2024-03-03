import { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Alert, Snackbar } from '@mui/material'
import AddCircle from '@mui/icons-material/AddCircle'

function AddHour({ updateYogaTimeInFirebase, updateTotalInFirebase, time, setTime, total, setTotal }) {
    const [open, setOpen] = useState(false)
    const [hour, setHour] = useState(time || 0)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
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
        <div>
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
            <Button sx={{ backgroundColor: '#1C86EE', color: 'white', ':hover': { backgroundColor: '#1C86EE' }, width: { xs: 'auto', md: 100 } }}
                startIcon={<AddCircle />} variant="outlined" onClick={handleClickOpen}>
                Nhập
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Nhập giờ dạy trong tháng</DialogTitle>
                <DialogContent >
                    <TextField fullWidth size='small' label="Giờ" type='number' defaultValue={0} sx={{ mt: 2 }} onFocus={(e) => e.target.select()}
                        onChange={(e) => setHour(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: 'gray' }}>Hủy</Button>
                    <Button onClick={handleClickAdd}>Nhập</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default AddHour