import { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Alert, Snackbar } from '@mui/material'
import { NavigateNext } from '@mui/icons-material'
import { child, set } from 'firebase/database'

function EditHour({ year, month, time, dbRef, userId, total }) {
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
        if (hour >= time) {
            set(child(dbRef, `users/${userId}/total`), {
                time: total + (hour - time)
              })
        }
        else {
            set(child(dbRef, `users/${userId}/total`), {
                time: total - (time - hour)
              })
        }
        set(child(dbRef, `users/${userId}/years/${year}/${month}`), {
            time: hour
        })
        handleClose()
        window.location.reload()
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
            <Button endIcon={<NavigateNext />} sx={{ bgcolor: 'inherit', fontSize: '18px', fontWeight: 'bold', color: '#696969' }}
                aria-controls={open ? 'basic-menu' : undefined} onClick={handleClickOpen}>
                Tháng {month}: {time} giờ
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Sửa giờ dạy tháng {month}</DialogTitle>
                <DialogContent >
                    <TextField fullWidth size='small' label="Giờ" type='number' value={hour} sx={{ mt: 2 }} onFocus={(e) => e.target.select()}
                        onChange={(e) => setHour(parseInt(e.target.value))} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: 'gray' }}>Hủy</Button>
                    <Button onClick={handleClickAdd}>Nhập</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default EditHour