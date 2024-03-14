import { ref } from 'firebase/database'
import { database } from '../../../firebase'
import AppBar from '../../components/Appbar/Appbar'
import Footer from '../../components/Footer/Footer'
import Dashboard from '../../pages/Dashboard/Dashboard'

function Home() {
  const dbRef = ref(database)
  const userId = localStorage.getItem('userId')
  return (
    <div >
      <AppBar />
      <Dashboard dbRef={dbRef} userId={userId} />
      <Footer />
    </div>
  )
}

export default Home