import { Grid, Backdrop, Box, Typography, Divider, Button } from '@mui/material'
import RegisterForever from './RegisterForever/RegisterForever'

function Fee({ isPayed }) {
    let open = true
    if (isPayed == true) {
        open = false
    }
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} >
            <Box sx={{ width: '90%', height: '90%', borderRadius: 10, bgcolor: '#999999', opacity: 0.85, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography fontSize={{ xs: '25px', md: '40px' }}
                    sx={{ color: '#0000CD', textAlign: 'center', m: 2, fontFamily: '"Roboto", sans-serif', fontWeight: 700, fontStyle: 'normal' }}
                >Xin chào, bạn cần đăng ký gói để mở khóa chức năng !</Typography>
                <Divider />
                <Grid container spacing={2} width={'80%'}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            bgcolor: 'white', borderRadius: 5, p: 2, display: 'flex', flexDirection: 'column',
                            alignItems: 'center', gap: 1
                        }}>
                            <Typography variant='h5' fontSize={'28px'}
                                sx={{ color: '#202124', textAlign: 'center', fontFamily: '"Roboto", sans-serif', fontWeight: 550, fontStyle: 'normal' }}>
                                Gói tiêu chuẩn
                            </Typography>
                            <Typography variant='h5'
                                sx={{ color: '#363636', textAlign: 'center', fontFamily: '"Roboto", sans-serif', fontWeight: 500, fontStyle: 'normal' }}>
                                Gia hạn
                            </Typography>
                            <Typography variant='h5' mt={2}
                                sx={{ color: '#202124', textAlign: 'center', fontFamily: '"Roboto", sans-serif', fontWeight: 550, fontStyle: 'normal' }}>
                                10.000 vnđ/năm
                            </Typography>
                            <Button sx={{
                                bgcolor: '#1a73e8', minWidth: 100, borderRadius: 5, color: 'white', fontFamily: '"Roboto", sans-serif',
                                fontWeight: 600, ':hover': { bgcolor: '#87CEFF' }
                            }}>
                                Đăng ký</Button>
                            <Typography variant='subtitle1'
                                sx={{ color: 'inherit', textAlign: 'center', fontFamily: '"Roboto", sans-serif', fontWeight: 400, fontStyle: 'normal' }}>
                                a
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ bgcolor: 'white', borderRadius: 5, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            <Typography variant='h5' fontSize={'28px'}
                                sx={{ color: '#202124', textAlign: 'center', fontFamily: '"Roboto", sans-serif', fontWeight: 550, fontStyle: 'normal' }}>
                                Phổ biến nhất
                            </Typography>
                            <Typography variant='h5'
                                sx={{ color: '#363636', textAlign: 'center', fontFamily: '"Roboto", sans-serif', fontWeight: 500, fontStyle: 'normal' }}>
                                Tài khoản vĩnh viễn
                            </Typography>
                            <Typography variant='h5' mt={2}
                                sx={{ color: '#202124', textAlign: 'center', fontFamily: '"Roboto", sans-serif', fontWeight: 550, fontStyle: 'normal' }}>
                                22.000 vnđ
                            </Typography>
                            <RegisterForever />
                            <Typography variant='subtitle1'
                                sx={{ color: '#828282', textAlign: 'center', fontFamily: '"Roboto", sans-serif', fontWeight: 550, fontStyle: 'normal' }}>
                                100 người đầu tiên
                            </Typography>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </Backdrop>
    )
}

export default Fee