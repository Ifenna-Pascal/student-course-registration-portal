import { useEffect, useState } from 'react'
import { axiosInstance } from '../lib/axios-instance'

const Eligibility = () => {
    const [outStanding, setOutStanding] = useState(false)
    const getEligibility = async() => {
        await axiosInstance.get('/student/can-graduate')
        .then((res) => {
            const result = res.data.data.hasOutStanding;
            setOutStanding(result)
        })
    }

    useEffect(()=>{
        getEligibility()
    }, [])
  return (
    <>
    <div  className="background">
      <h1 className='text-white font-[500]  font-poppins text-[48px]'>Eligibility Status</h1>
    </div>
    <div className='min-h-[400px] text-2xl p-12'>
        {
            outStanding ? 'You are not eligible to graduate, you have to clear your fees' : 'You have no outstanding fees you can graduate'
        }
    </div>
    </>
  )
}

export default Eligibility