import { useState, useEffect } from 'react'
import { Box, Button, Typography, LinearProgress } from '@mui/material'
import { child, get, ref, set } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import { database } from '../../../firebase'
import AddHour from '../../components/AddHour/AddHour'

function Dashboard() {
  const navigate = useNavigate()
  const dbRef = ref(database)
  const userId = localStorage.getItem('userId')
  const d = new Date()
  const month = d.getMonth() + 1
  const [isUpdate, setIsUpdate] = useState(true)
  const date = d.getDate()
  const minute = d.getMinutes()
  const [time, setTime] = useState(0)
  const [total, setTotal] = useState(0)
  let progress = total / 100

  const updateYogaTimeInFirebase = (time) => {
    set(child(dbRef, `users/${userId}/hour`), {
      time: time
    })
  }
  const updateTotalInFirebase = (time) => {
    set(child(dbRef, `users/${userId}/total`), {
      time: time
    })
  }
  const handleAddTime = () => {
    setTime(time + 1.0)
    updateYogaTimeInFirebase(time + 1.0)
    const newTotal = total + 1
    setTotal(newTotal)
    updateTotalInFirebase(newTotal)
    const newProgress = progress + 0.01
    progress = newProgress > 100 ? 100 : newProgress
   // console.log(minute, progress)
  }

  const handleSubtractTime = () => {
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
  useEffect(() => {
    if (!userId) {
      navigate('/')
    }
    else {
      get(child(dbRef, `users/${userId}/hour/time`)).then((snapshot) => {
        if (snapshot.exists()) {
          setTime(snapshot.val())
        }
        else {
          setTime(0)
        }
      }).catch((error) => {
        console.error(error)
      })
      get(child(dbRef, `users/${userId}/total/time`)).then((snapshot) => {
        if (snapshot.exists()) {
          setTotal(snapshot.val())
        }
        else {
          setTotal(0)
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  }, [])
  return (
    <Box sx={{ height: window.innerHeight, backgroundColor: '#F5F5F5' }}>
      <Typography variant='h5' fontWeight={'bold'} color={'#FF6A6A'} textAlign={'center'} mt={2}>Mục tiêu <br />Dạy Yoga 10.000 giờ</Typography>
      <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box
              sx={{
                width: { xs: 160 }, height: { xs: 160 },
                backgroundColor: '#1C86EE', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 100
              }}>
              <Typography color={'white'} variant='h5' fontWeight={'bold'}>{time} giờ</Typography>
            </Box>
            <Typography variant='body2' color={'gray'} textAlign={'center'} mt={1}>Thời gian dạy tháng {month}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ position: 'relative', width: 160, height: 160, borderWidth: 1, borderRadius: 100, borderColor: 'gray' }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  zIndex: 1,
                  borderRadius: '50%',
                  width: 160,
                  height: 160,
                  backgroundColor: '#B5B5B5',
                  transform: 'translate(-50%, -50%) rotate(-90deg)'
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                {progress.toFixed(2)}%
              </Typography>
            </Box>
            <Typography variant='body2' color={'gray'} textAlign={'center'} mt={1}>Tổng thời gian: {total} giờ</Typography>
          </Box>
        </Box>
        <Box sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2, display: 'flex', width: '100%' }} >
          <Button onClick={handleSubtractTime}
            sx={{ backgroundColor: '#1C86EE', color: 'white', ':hover': { backgroundColor: '#1C86EE' }, width: { xs: 'auto', md: 100 } }}>-   1 giờ</Button>
          <Button onClick={handleAddTime}
            sx={{ backgroundColor: '#1C86EE', color: 'white', ':hover': { backgroundColor: '#1C86EE' }, width: { xs: 'auto', md: 100 } }}>+   1 Giờ</Button>
          <AddHour time={time} total={total}
            updateYogaTimeInFirebase={updateYogaTimeInFirebase} updateTotalInFirebase={updateTotalInFirebase}
            setTime={setTime} setTotal={setTotal} />
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
