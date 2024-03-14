import { useEffect, useState } from 'react'
import { Box, Button, Typography, Alert, Snackbar, Backdrop, CircularProgress } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useNavigate } from 'react-router-dom'
import { child, set, get } from 'firebase/database'
import AddHour from '../../components/AddHour/AddHour'
import Header from './Header/Header'
import TotalTime from './TotalTime/TotalTime'
import BoardBar from '../../components/BoardBar/BoardBar'
import Fee from './Fee/Fee'

function Dashboard({ dbRef, userId }) {
  const navigate = useNavigate()
  const d = new Date()
  const currentDay = d.getDate()
  const currentYear = d.getFullYear()
  const currentMonth = d.getMonth() + 1
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [years, setYears] = useState([])
  const [time, setTime] = useState(0)
  const [total, setTotal] = useState(0)
  const [isPayed, setIsPayed] = useState(false)
  const [targetName, setTargetName] = useState('')
  let progress = total / 100

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setShowAlert(false)
  }
  const updateYogaTimeInFirebase = (time) => {
    set(child(dbRef, `users/${userId}/years/${currentYear}/${currentMonth}`), {
      time: time
    })
  }
  const updateTotalInFirebase = (time) => {
    set(child(dbRef, `users/${userId}/total`), {
      time: time
    })
  }

  const handleAddTime = async () => {
    setShowAlert(true)
    const newTime = time + 1
    setTime(newTime)
    updateYogaTimeInFirebase(newTime)
    const newTotal = total + 1
    setTotal(newTotal)
    updateTotalInFirebase(newTotal)
    const newProgress = progress + 0.01
    progress = newProgress > 100 ? 100 : newProgress
  }

  const handleSubtractTime = async () => {
    if (time > 0) {
      const newTime = time - 1
      setTime(newTime)
      updateYogaTimeInFirebase(newTime)
      const newTotal = total - 1
      setTotal(newTotal < 0 ? 0 : newTotal)
      updateTotalInFirebase(newTotal)
      const newProgress = progress - 0.01
      progress = newProgress > 100 ? 100 : newProgress
    }
  }
  const getData = async () => {
    setLoading(true)
    get(child(dbRef, `users/${userId}/years/${currentYear}/${currentMonth}/time`)).then((snapshot) => {
      if (snapshot.exists()) {
        setTime(snapshot.val())
      } else {
        setTime(0)
      }
    }).catch((error) => {
      console.error(error)
    })
    get(child(dbRef, `users/${userId}/total/time`)).then((snapshot) => {
      if (snapshot.exists()) {
        setTotal(snapshot.val())
      } else {
        setTotal(0)
      }
    }).catch((error) => {
      console.error(error)
    })
    get(child(dbRef, `users/${userId}/isPayed`)).then((snapshot) => {
      if (snapshot.exists()) {
        setIsPayed(snapshot.val())
      } else {
        setIsPayed(0)
      }
    }).catch((error) => {
      console.error(error)
    })
    get(child(dbRef, `users/${userId}/targetName/name`)).then((snapshot) => {
      if (snapshot.exists()) {
        setTargetName(snapshot.val())
      } else {
        setTargetName('Dạy Yoga')
      }
    }).catch((error) => {
      console.error(error)
    }).finally(() => {
      setLoading(false)
    })
  }
  useEffect(() => {
    if (!userId) {
      navigate('/')
    }
    else {
      getData()
    }
  }, [])
  useEffect(() => {
    get(child(dbRef, `users/${userId}/years`)).then((snapshot) => {
      if (snapshot.exists()) {
        const yearsData = snapshot.val()
        const yearsArray = Object.keys(yearsData)
        const yearsDataArray = yearsArray.map((year) => ({
          year: year,
          data: yearsData[year]
        }))
        setYears(yearsDataArray)
      } else {
        setYears([])
      }
    })
      .catch((error) => {
        console.error(error)
      })
  }, [time])
  return (
    <Box>
      {/* <Fee isPayed={isPayed}/> */}
      <BoardBar dbRef={dbRef} userId={userId} years={years} total={total} />
      <Box sx={{ backgroundColor: '#F5F5F5', height: (theme) => theme.webCustom.boardContentHeight }}>
        <Header userId={userId} dbRef={dbRef} targetName={targetName} setTargetName={setTargetName} />
        <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            {/* Month Time */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{
                width: '160px', height: '160px', backgroundColor: '#1874CD', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', borderRadius: 100, boxShadow: '0 0 0 2px #00B2EE'
              }} >
                <AddHour time={time} total={total}
                  updateYogaTimeInFirebase={updateYogaTimeInFirebase} updateTotalInFirebase={updateTotalInFirebase}
                  setTime={setTime} setTotal={setTotal} />
              </Box>
              <Typography sx={{ color: 'gray', textAlign: 'center', mt: 1, fontWeight: 'bold', fontSize: '18px' }} lineHeight={1}>
                Thời gian dạy tháng {currentMonth}</Typography>
            </Box>
            {/* Total Time */}
            <TotalTime progress={progress} />
          </Box>
          {/* Add and subtract*/}
          <Box sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2, display: 'flex', width: '100%' }} >
            <Button onClick={handleSubtractTime}
              sx={{ backgroundColor: '#1C86EE', color: 'white', ':hover': { backgroundColor: '#1874CD' }, width: { xs: 'auto', md: 100 }, fontWeight: 'bold' }}>
              -   1 giờ
            </Button>
            <Button onClick={handleAddTime}
              sx={{ backgroundColor: '#1C86EE', color: 'white', ':hover': { backgroundColor: '#1874CD' }, width: { xs: 'auto', md: 100 }, fontWeight: 'bold' }}>
              +   1 Giờ
            </Button>
          </Box>
          <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', pt: 3 }}>
            <Typography sx={{ color: 'gray', textAlign: 'center', fontFamily: 'Merriweather", serif' }} variant='h6' fontSize={{ xs: '14px', sm: '16px', md: '18px' }}>
              <i>"Tôi không sợ người luyện tập 10.000 cú đá chỉ một lần,<br />mà chỉ sợ người thực hành một cú đá 10.000 lần"</i>
            </Typography>
          </Box>
          <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={500}
            open={showAlert} onClose={handleSnackbarClose} onClick={() => setShowAlert(true)}>
            <Alert icon={<FavoriteIcon sx={{ color: '#FF4040' }} />} severity="info" variant="filled" >+1</Alert>
          </Snackbar>
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Box >
    </Box>
  )
}

export default Dashboard
