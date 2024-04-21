import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../lib/axios-instance';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

interface ICourse {
    imgUrl : string;
    name: string;
    description: string,
    isEnrolled: boolean
}

const Courses = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    console.log(id)
    const [course, setCourse] = useState<ICourse>()

    const getAllCourse = async () => {
        await axiosInstance.get(`/courses/${id}`)
        .then(res => {
            setCourse({...res.data.data})
        }).catch((err:any) => {
            const error = err.response.data.error
            toast.error(error)
        })
    }

    const enrollCourse = async () => {
        setLoading(true);
        await axiosInstance.post(`/student/enroll-course/${id}`).then((res) => {
            toast.success('Course enrolled successfully')
            navigate('/dashboard/enrolled-courses')
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            toast.error(err.response.data.error)
        })
    }

    
    useEffect(() => {
        getAllCourse()
    }, [])

  return (
    <>
         <div  className="background">
      <h1 className='text-white font-[500] font-poppins text-[48px]'>Course Details</h1>
    </div>
    <div className='max-w-[1200px] py-16 mx-auto flex '>
       <div className='mr-6 h-[500px] w-[40%]'>
            <img src={course?.imgUrl} alt="img-url" className=' h-[500px] w-full' />
       </div>
       <div className='flex w-[60%] justify-center flex-col p-6'>
            <h1 className='text-[30px] font-poppins'>{course?.name}</h1>
            <p className='text-gray-400 text-[14px] font-poppins italic'>{'white anderson'}</p>
            <span className='text-[16px] py-3 w-[95%] font-poppins text-gray-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis similique nihil, odit tempora, fuga facere accusantium repellat deleniti, numquam earum sed. Sit, animi. Quae, possimus pariatur totam accusamus animi quisquam tenetur vero consectetur ut repellendus quos, praesentium ex ea beatae.</span>
       <button className="outline-none bg-4 w-[180px] text-white bg-gray-800 flex mt-4 items-center justify-center h-[60px]"  onClick={enrollCourse}>{loading ? 'Loading...' : 'Enroll'}</button>

       </div>

    </div>
    </>
    
  )
}

export default Courses