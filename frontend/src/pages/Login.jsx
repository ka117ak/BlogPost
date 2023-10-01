import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { URL } from '../url'
import { UserContext } from "../context/UserContext"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError]=useState(false)
  const {setUser}=useContext(UserContext)
  const navigate=useNavigate()

  // console.log(email)
  // console.log(password)

  const handelLogin = async() => {
    try {
      const res =  await axios.post(URL+"/api/auth/login",{email,password},{withCredentials:true})
      // setEmail(res.data.email)
      // setPassword(res.data.password)
      setUser(res.data)
      setError(false)
      navigate("/")
    } 
    catch (error) {
      setError(true)
      console.log(error)
    }
  }

  return (
    <div className="w-full flex justify-center items-center h-[70vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[400px] mt-[10%]">
            <h1 className="text-3xl text-left font-thin">Log In to your account </h1>
            <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-Rose-300" type="email" placeholder="Enter your email"/>
            <input onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-Rose-300" type="password" placeholder="Enter your password"/>
            <button onClick={handelLogin} className="w-full px-4 py-4 text-lg font-bold text-Rose-50 bg-Rose-900 rounded-lg hover:bg-Rose-700 hover:text-Rose-100">Continue</button>
            {error && <h3 className='text-Rose-950 text-xs font-extrathin'>Something went wrong</h3>}
            <p className="font-extrathin text-xs">By continuing with any of the options below, you agree to our Terms of Service and have read our Privacy Policy.</p>
            <div className="flex justify-center items-center space-x-3">
                <p>New here?</p>
                <p className="text-Grey-500 hover:text-Rose-950"><Link to = "/register">Register Now</Link></p>
            </div>
        </div>
      
    </div>
  )
}

export default Login
