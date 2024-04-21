import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../lib/axios-instance';
import { IoMdCopy } from "react-icons/io";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { TiTick } from "react-icons/ti";

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

const HomeDashboard = () => {
    const [state, setState] = useState({
        value: '',
        copied: false
      })
    const [student, setStudent] = useState<IStudent>(initialState)
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
  return (
    <div>
        <div  className="background">
      <h1 className='text-white font-[500] font-poppins text-[48px]'>My Portal</h1>
    </div>
    <div className='min-h-[400px] p-16'>
        <h2 className='text-3xl flex items-center font-poppins'>Welcome {student.username} your student Id is  <b className='ml-2'>{student.id}</b>
        <CopyToClipboard text={student.id ?? ''}
          onCopy={() => setState({...state, copied: true})}>
          
          {
            state.copied ? 
            <TiTick size={'20'} className="ml-[4px] text-green-500"  />
            : 
          <IoMdCopy size={'20'} className="ml-[4px] cursor-pointer" />

            }
          
        </CopyToClipboard>
        </h2>
    </div>
    </div>
  )
}

export default HomeDashboard