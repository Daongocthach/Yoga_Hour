import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box, Snackbar, Alert } from '@mui/material'
import feeImage from '../../../../assets/img/fee.png'
import { filterEmail } from '../../../../utils/email'

function RegisterExtend() {
    const [open, setOpen] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    let email = localStorage.getItem('email')
    if (email) {
        email = filterEmail(email)
    }
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    function copy(input) {
        navigator.clipboard.writeText(input)
            .then(() => {
                setShowAlert(true)
            })
            .catch((error) => {
                console.error('Lỗi khi sao chép', error)
            })
    }
    return (
        <Box>
            <Button sx={{
                bgcolor: '#1a73e8', minWidth: 100, borderRadius: 5, color: 'white', fontFamily: '"Roboto", sans-serif',
                fontWeight: 600, ':hover': { bgcolor: '#87CEFF' }
            }} onClick={handleClickOpen}>
                Đăng ký</Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle sx={{ color: '#4F4F4F', fontWeight: 'bold', textAlign: 'center' }}>Thanh toán</DialogTitle>
                <DialogContent >
                    <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant='h7' sx={{ fontWeight: 'bold', color: '#333333', fontFamily: 'Merriweather", serif' }}>Ngân hàng Quân đội MB Bank</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                <Typography variant='h8' sx={{ fontWeight: 'bold', color: '#666666', fontFamily: 'Merriweather", serif', width: '120px' }}>Người nhận:</Typography>
                                <Typography id='myInput' variant='h8' sx={{ fontWeight: 'bold', color: '#333333', fontFamily: 'Merriweather", serif' }}>DAO NGOC THACH</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                <Typography variant='h8' sx={{ fontWeight: 'bold', color: '#666666', fontFamily: 'Merriweather", serif', width: '120px' }}>Số tài khoản:</Typography>
                                <Typography variant='h8' sx={{ fontWeight: 'bold', color: '#333333', fontFamily: 'Merriweather", serif' }}>0373060206</Typography>
                                <Button sx={{ bgcolor: '#1a73e8', borderRadius: 5, color: 'white', fontWeight: 'bold', ':hover': { bgcolor: '#87CEFF' } }}
                                    onClick={() => { copy('0373060206') }}>Sao chép</Button>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                <Typography variant='h8' sx={{ fontWeight: 'bold', color: '#666666', fontFamily: 'Merriweather", serif', width: '120px' }}>Nội dung:</Typography>
                                <Typography variant='h8' sx={{ fontWeight: 'bold', color: '#333333', fontFamily: 'Merriweather", serif' }}>{email}</Typography>
                                <Button sx={{ bgcolor: '#1a73e8', borderRadius: 5, color: 'white', fontWeight: 'bold', ':hover': { bgcolor: '#87CEFF' } }}
                                    onClick={() => { copy(email) }}>Sao chép</Button>
                            </Box>
                        </Box>
                        <img src={feeImage} style={{ width: 300, height: 300, objectFit: 'contain', borderRadius: 10 }} />
                        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={1000}
                            open={showAlert} onClose={() => setShowAlert(false)} onClick={() => setShowAlert(true)}>
                            <Alert severity="success" variant="filled" >Sao chép thành công!</Alert>
                        </Snackbar>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ fontWeight: 'bold' }}>OK</Button>
                </DialogActions>
            </Dialog>

        </Box>
    )
}

export default RegisterExtend