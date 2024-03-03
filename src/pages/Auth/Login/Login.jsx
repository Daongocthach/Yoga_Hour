import { useState } from 'react'
import { Container, TextField, Stack, Button, Box, Alert, Snackbar } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../../firebase'
import loginImage from '../../../assets/img/loginImage.jpg'
import { validateEmail } from '../../../utils/email'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)

  const onFinish = () => {
    if (email && password !== '') {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          localStorage.setItem('userId', userCredential.user.uid)
          setShowAlert(true)
          setTimeout(() => {
            navigate('/home')
          }, 1000)
        })
        .catch((error) => {
          console.log(error)
          setShowAlertFail(true)
        })
    }
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Box sx={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'black'
      }}>
        <img src={loginImage} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
        <Box sx={{
          position: 'absolute',
          width: { xs: '90%', sm: '70%', md: '30%' },
          height: 'auto',
          borderRadius: '5px',
          top: '30%',
          left: '50%',
          bgcolor: 'black',
          opacity: 0.8,
          transform: 'translate(-50%, -30%)'
        }}>
          <h2 style={{ textAlign: 'center', color: 'white' }}>Đăng nhập</h2>
          <Stack
            component="form"
            sx={{ m: 3 }}
            spacing={4}
          >
            <TextField
              id="filled-hidden-label-small"
              placeholder='Nhập Email'
              variant="filled"
              size="small"
              sx={{ bgcolor: 'white', borderRadius: 3 }}
              onChange={e => setEmail(e.target.value)}
              helperText={validateEmail(email) ? '' : 'Không đúng định dạng Email'}
            />
            <TextField
              id="filled-hidden-label-normal"
              placeholder='Nhập mật khẩu'
              variant="filled"
              size="small"
              sx={{ bgcolor: 'white', borderRadius: 3 }}
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              sx={{ bgcolor: 'red', color: 'white', fontWeight: 'bold' }}
              onClick={() => onFinish()}
            >Đăng nhập</Button>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link to={'/reset-password'} style={{ color: 'white' }}>Quên mật khẩu?</Link>
              <Link to={'/register'} style={{ color: 'white' }}>Đăng ký?</Link>
            </Box>
          </Stack>
        </Box>
      </Box>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlert} autoHideDuration={1000} onClose={() => setShowAlert(false)}>
        <Alert severity="success" variant='filled' onClose={() => setShowAlert(false)}>
          Đăng nhập thành công
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlertFail} onClose={() => setShowAlertFail(false)}>
        <Alert severity="error" variant='filled' onClose={() => setShowAlertFail(false)}>
          Đăng nhập thất bại
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Login