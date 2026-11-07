import { useEffect, useState } from "react"
import { axiosInstance } from "../lib/axios-instance";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {

    const token = localStorage.getItem('token');
    console.log(token)
    useEffect(() => {
      if(token){
        navigate('/dashboard/overview')
      }
    }, [token])

    const initialState = {
        username: '',
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
        });
    } 

    const submitHandler = async (e:React.SyntheticEvent) => {
        e.preventDefault(); 
        setLoading(true)
        console.log(form, "form state")
        await axiosInstance.post('/auth/create-user', form)
        .then((response) => {
            setLoading(false)
            console.log(response, "response")
            navigate('/login')
        }).catch((err: any) => {
            setLoading(false)
            const error = err.response.data.error
            toast.error(error)
        })
    }
    return (
        <div>
            <form onSubmit={submitHandler} className="max-w-[600px] py-8  mx-auto bg-gray-200 px-8 min-h-[400px] flex  flex-col  my-12">
                <h1 className="text-[33px] text-center pt-3 font-poppins">User Registration</h1>
                <p className="text-[13px]  text-center font-poppins mb-6">Create Student Portal Account</p>
                <input onChange={changeHandler}  name="username" type="text" placeholder="enter username" className="outline-none font-poppins text-gray-800 mb-4 rouded-[5px] w-full text-[13pxc] px-3 py-4"  required/>
                <input onChange={changeHandler} name="email" type="email" placeholder="enter email" className="outline-none font-poppins text-gray-800 mb-4 rouded-[5px] w-full text-[13pxc] px-3 py-4" required/>
                <input onChange={changeHandler} name="password" type="password" placeholder="*********" className="outline-none font-poppins text-gray-800 mb-4 rouded-[5px] w-full text-[13pxc] px-3 py-4"  required/>
                <button className="outline-none bg-4 w-[200px] text-white bg-gray-800 flex mt-4 items-center justify-center h-[60px]">{loading ? "Loading..." : "Create Account"}</button>
                <p className="pt-8 text-center">Already have an account? <Link to={'/login'} className="font-semibold underline">Login</Link></p>

            </form>

        </div>
    )
}

export default Signup