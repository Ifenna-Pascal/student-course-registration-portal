import { useEffect, useState } from "react"
import { axiosInstance } from "../lib/axios-instance";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

    const token = localStorage.getItem('token');
    console.log(token)
    useEffect(() => {
      if(token){
        navigate('/dashboard/overview')
      }
    }, [token])

    const initialState = {
        email: '',
        password: ''
    }
    const [form, setForm ] = useState(initialState);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const changeHandler = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    } 

    const submitHandler = async (e:React.SyntheticEvent) => {
        e.preventDefault(); 
        setLoading(true)
        console.log(form, "form state")
        await axiosInstance.post('/auth/login', form)
        .then((res: any) => {
            setLoading(false)
            localStorage.setItem('token', res.data.access_token )
            navigate('/dashboard/overview')
        }).catch((err: any) => {
            setLoading(false)
            const error = err.response.data.error
            toast.error(error)
        })
    }
    return (
        <div>
            <form onSubmit={submitHandler} className="max-w-[600px] pt-8 pb-5 mx-auto bg-gray-200 px-8 min-h-[400px] flex  flex-col  my-12">
                <h1 className="text-[33px] text-center pt-3 font-poppins">User Login</h1>
                <p className="text-[13px]  text-center font-poppins mb-6">Please login using account detail below</p>
                <input onChange={changeHandler} name="email" type="email" placeholder="enter email" className="outline-none font-poppins mb-4 text-gray-800 rouded-[5px] w-full text-[13px] px-3 py-4" />
                <input onChange={changeHandler} name="password" type="password" placeholder="enter password" className="outline-none font-poppins text-gray-800 mb-4 rouded-[5px] w-full text-[13pxc] px-3 py-4" />
                <button className="outline-none bg-4 w-[200px] text-white bg-gray-800 flex mt-2 items-center justify-center h-[60px]">{loading ? "Loading..." : "Login"}</button>
                <p className="pt-8 text-center">No account Yet? <Link to={'/sign-up'} className="font-semibold underline">Create Account</Link></p>
            </form>
        </div>
    )
}

export default Login