import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../lib/axios-instance';
import { toast } from 'react-toastify';
import Book from '../components/Book';
import useDebounce from '../lib/useDebounce';

interface ICourse {
  imgUrl : string;
  name: string;
  description: string;
  price: number;
  _id: string;
  isEnrolled: boolean
}

const DashboardOverview = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [search, setSearch] = useState('')
  const debouncedValue = useDebounce(search, 500)


  const getAllCourse = async (search?: string) => {
      console.log(search, "ss")
      await axiosInstance.get(`/courses?search=${search}`)
      .then(res => {
          console.log(res);
          setCourses(res.data.data)
      }).catch((err:any) => {
          const error = err.response.data.error
          toast.error(error)
      })
  }

  
  const  onChangeHandler = (e:any) => {
    setSearch(e.target.value)
    getAllCourse(search)
  }

  useEffect(() => {
      getAllCourse()
  }, [])


  console.log(courses, "fff")

  return (
    <>

      <div  className="background">
      <h1 className='text-white font-[500] font-poppins text-[48px]'>Browse Courses</h1>
    </div>
    <div className="py-10  w-full max-w-[1200px] mx-auto ">
    <input onChange={onChangeHandler}  name="search" type="text" placeholder="search..." className="outline-none  font-poppins text-gray-800 mb-12 border w-[90%] border-gray-300 rouded-[5px] text-[13pxc] rounded-[32px] px-8 py-4"  required/>
    {courses.length === 0 && (
    <div className='h-[250px]  w-full flex items-center justify-center'>
      <h2 className='text-center font-poppins text-[25px]'>No Course Found</h2>
    </div>
  )} 
<div className=' grid grid-cols-3 w-full  gap-6 mx-auto'>
 
{
      courses.map((course, index) => (
        <Book key={index} id={course._id} name={course.name} img={course.imgUrl}  author='Bisi Akambi' price={course.price} />
      ))
  }
</div>
    </div>
    </>
  )
}

export default DashboardOverview