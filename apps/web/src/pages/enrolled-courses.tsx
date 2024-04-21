import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../lib/axios-instance';
import { toast } from 'react-toastify';
import Book from '../components/Book';


const EnrolledCourses = () => {
    
interface ICourse {
    _id: string;
    paymentReference: string,
    courseId: {
        imgUrl : string;
        name: string;
        description: string;
        price: number;
        _id: string;
        isEnrolled: boolean
    }
  }
const [courses, setCourses] = useState<ICourse[]>([]);
  const getAllCourse = async () => {
      await axiosInstance.get(`/student/enrolled-courses`)
      .then(res => {
          console.log(res);
          setCourses(res.data.data)
      }).catch((err:any) => {
          const error = err.response.data.error
          toast.error(error)
      })
  }

  console.log(courses, "course")

  useEffect(() => {
      getAllCourse()
  }, [])
  return (
    <>
    <div  className="background">
      <h1 className='text-white font-[500] font-poppins text-[48px]'>Enrolled Courses</h1>
    </div>
    {courses.length === 0 && (
    <div className='h-[250px]  w-full flex items-center justify-center'>
      <h2 className='text-center font-poppins text-[25px]'>No Course Found</h2>
    </div>
  )} 
        <div className=' grid grid-cols-3 w-full max-w-[1200px] py-20 gap-6 mx-auto'>
    
 {
       courses.map((course, index) => (
         <Book key={index} id={course.courseId._id} name={course.courseId.name} paymentRef={course.paymentReference} img={course.courseId.imgUrl} author='Bisi Akambi' price={course.courseId.price} isEnrolled />
       ))
   }
 </div>
    </>
  )
}

export default EnrolledCourses