import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { useState } from 'react'

function AlertAccept({ buttonName, title, content, setAccept }) {
    const [openDialog, setOpenDialog] = useState(false)
    const handleClickOpen = () => {
      setOpenDialog(true)
    }
    const handleClose = () => {
      setOpenDialog(false)
    }
    const handleAccept = () => {
        setAccept(true)
        handleClose()
    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                {buttonName}
            </Button>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ fontWeight: 'bold' }}>Hủy</Button>
                    <Button onClick={handleAccept} sx={{ fontWeight: 'bold' }}>{buttonName}</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AlertAccept