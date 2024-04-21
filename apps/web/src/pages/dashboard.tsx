import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  console.log(token)
  useEffect(() => {
    if(token === null){
      navigate('/login')
    }6
  }, [token])
  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }
  return (
    <div>
      <nav className='py-[35px] px-[60px] shadow-sm flex items-center justify-between '>
        <Link to={'/dashboard/overview'}>
        <span className='font-poppins text-[23px] font-[500]'>Student Portal</span>
        </Link>
        <ul className='flex items-center gap-6 justify-between'>
        <li className='font-poppins hover:font-semibold text-[15px]'>
            <Link to={'/dashboard/courses'} > Browse Courses  </Link>
          </li>
          <li className='font-poppins hover:font-semibold text-[15px]'>
            <Link to={'/dashboard/eligibility'} > Eligibity  </Link>
          </li>
          <li className='font-poppins hover:font-semibold text-[15px]'>
            <Link to={'/dashboard/enrolled-courses'} > Enrolled Courses </Link>
          </li>
          <li className='font-poppins hover:font-semibold text-[15px]'>
            <Link to={'/dashboard/profile'} > Student Profile </Link>
          </li>
        </ul>
        <button className='flex items-center justify-center py-3 px-6  text-[17px] font-semibold bg-white text-red-500 rounded-[10px]' onClick={logout}>Logout</button>
      </nav>
      <Outlet />
      <footer className='w-full flex items-center justify-center bg-gray-800 h-[60px]'>
          <span className='text-white font-poppins'>@2024</span>
      </footer>
    </div>
  )
}

export default Dashboard