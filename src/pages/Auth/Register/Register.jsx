import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Button, Stack, TextField, Container, Snackbar, Alert } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../../firebase'
import loginImage from '../../../assets/img/loginImage.jpg'
import { validateEmail } from '../../../utils/email'


function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const onFinish = () => {
    if (!validateEmail(email) && password !== repeatPassword) {
      setShowAlertFail(true)
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
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
      setShowAlert(true)
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
          <h2 style={{ textAlign: 'center', color: 'white' }}> Đăng ký</h2>
          <Stack
            component="form"
            sx={{ m: 3 }}
            spacing={4}
          >
            <TextField
              id="input-email"
              variant="filled"
              size="small"
              placeholder='Input email'
              sx={{ bgcolor: 'white', borderRadius: 3 }}
              onChange={e => setEmail(e.target.value)}
              error={!validateEmail(email)}
              helperText={validateEmail(email) ? '' : 'Không đúng định dạng Email'}
            />
            <TextField
              id="input-password"
              placeholder='Input password'
              variant="filled"
              size="small"
              type='password'
              sx={{ bgcolor: 'white', borderRadius: 3 }}
              onChange={e => setPassword(e.target.value)}
            />
            <TextField
              id="input-repeatpassword"
              placeholder="Input repeat password"
              variant="filled"
              size="small"
              type='password'
              sx={{ bgcolor: 'white', borderRadius: 3 }}
              onChange={e => setRepeatPassword(e.target.value)}
              error={password !== repeatPassword}
              helperText={password !== repeatPassword ? 'Password không trùng khớp' : ''}
            />
            <Button sx={{ bgcolor: 'red', borderRadius: '5px', color: 'white', fontWeight: 'bold', ':hover': { bgcolor: 'brown' } }}
              onClick={onFinish}>Đăng ký
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link to={'/'} style={{ color: 'white' }}>Đăng nhập?</Link>
            </Box>
          </Stack>
        </Box>
      </Box>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlert} autoHideDuration={1000} onClose={() => setShowAlert(false)}>
        <Alert severity="success" variant='filled' onClose={() => setShowAlert(false)}>
          Đăng ký thành công!
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlertFail} onClose={() => setShowAlertFail(false)}>
        <Alert severity="error" variant='filled' onClose={() => setShowAlertFail(false)}>
          Vui lòng kiểm tra lại email hoặc mật khẩu!
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Register