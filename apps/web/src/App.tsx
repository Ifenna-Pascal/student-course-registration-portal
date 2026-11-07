import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/SignUp'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/dashboard'
import DashboardOverview from './pages/overview'
import Courses from './pages/courses'
import EnrolledCourses from './pages/enrolled-courses'
import Eligibility from './pages/eligibility'
import Profile from './pages/profile'
import HomeDashboard from './pages/homes'

function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} >
          <Route path='overview' element={<HomeDashboard />} />
            <Route path='courses' element={<DashboardOverview />} />
            <Route path='course/:id' element={<Courses />} />
            <Route path='enrolled-courses' element={<EnrolledCourses />} />
            <Route path='eligibility' element={<Eligibility />} />
            <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
 