import DashBoard from '../pages/Dashboard/Dashboard'
import Login from '../pages/Auth/Login/Login'
import Register from '../pages/Auth/Register/Register'
import ResetPassword from '../pages/Auth/ResetPassword/ResetPassword'
import NotFound from '../pages/NotFound/NotFound'
import AuthLayout from '../layouts/AuthLayout'
const publicRoutes = [
    { path:'/', component: Login, layout: AuthLayout },
    { path:'/register', component: Register, layout: AuthLayout },
    { path:'/reset-password', component: ResetPassword, layout: AuthLayout },
    { path:'/home', component: DashBoard },
    { path:'*', component: NotFound }
]

const privateRoutes = [
]

export { publicRoutes, privateRoutes }