import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../lib/axios-instance'
import { toast } from 'react-toastify';

interface IStudent {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string
}

const initialState:IStudent = {
    id: '',
    email: '',
    username: '',
    firstName: '',
    lastName: ''
}

const Profile = () => {
    const [student, setStudent] = useState<IStudent>(initialState)
    const [show, setShow] = useState(false)
    const getProfile = async () => {
        await axiosInstance.get('/student/profile')
        .then((res) => {
            const result = res.data.data;
            setStudent(result)
        })
    }

    useEffect(()=> {
        getProfile()
    }, [])

    const initialStates = {
        firstName: '',
        lastName: ''
    }
    const [form, setForm ] = useState(initialStates);
    const [loading, setLoading] = useState(false)
    const changeHandler = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    } 

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setLoading(true)
        await axiosInstance.put('/student/update-profile', form)
        .then((res) => {
            setShow(false)
            setLoading(false);
            getProfile()
        })
        .catch((err: any) => {
            setLoading(false)
            const error = err.response.data.error
            toast.error(error)
        })
    }

  return (
    <div>
        <div  className="background">
            <h1 className='text-white font-[500]  font-poppins text-[48px]'>Stuent Profile</h1>
        </div>
        <div className='min-h-[400px] flex flex-col p-8 gap-y-4'>
            <span className='text-[18px] text-gray-800 font-poppins mr-2 '>Student Id: <b>{student.id}</b></span>
            <span className='text-[18px] text-gray-800 font-poppins mr-2 '>Email: <b>{student.email}</b></span>
            <span className='text-[18px] text-gray-800 font-poppins mr-2 '>Username: <b>@{student.username}</b></span>
            {
                student.firstName && 
                <span className='text-[18px] text-gray-800 font-poppins mr-2 '>FirstName: <b>{student.firstName}</b></span>
            }
            {
                student.lastName && 
                <span className='text-[18px] text-gray-800 font-poppins mr-2 '>lastName: <b>{student.lastName}</b></span>
            }
        
        {
            show ? <form className='w-[300px]' onSubmit={submitHandler}>
            <input onChange={changeHandler} name="firstName" type="text" placeholder="enter firstname" className="outline-none font-poppins mb-4 text-gray-800 rouded-[5px] w-full border-gray-500 border text-[13px] px-3 py-4" />
            <input onChange={changeHandler} name="lastName" type="text" placeholder="enter lastname" className="outline-none font-poppins mb-4 text-gray-800 rouded-[5px] w-full border-gray-500 border text-[13px] px-3 py-4" />
            <div className='flex gap-4'>
                <button className="outline-none bg-4 w-[200px] text-white bg-gray-800 flex mt-2 items-center justify-center h-[60px]">{loading ? 'Updating...' : 'Update'}</button>
                <button className="outline-none bg-4 w-[200px] border boder-gray-900 text-gray-800 flex mt-2 items-center justify-center h-[60px]" onClick={() => setShow(false)}>Cancel</button>
            </div>
        </form>: 
        <button className="outline-none bg-4 w-[200px] text-white bg-gray-800 flex mt-2 items-center justify-center h-[60px]" onClick={()=> setShow(true)}>Update Profile</button>


        }
        </div>
    </div>
  )
}

export default Profile