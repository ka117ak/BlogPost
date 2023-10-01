import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../url'

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassoword] = useState("")
  const [error, setError]=useState(false)
  const navigate=useNavigate()
 
  // console.log(username)
  // console.log(email)
  // console.log(password)

  const handelRegister = async() => {
    try{
      const res =  await axios.post(URL+"/api/auth/register",{username,email,password})
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassoword(res.data.password)
      setError(false)
      navigate("/login")
    }
    catch(err){
      setError(true)
      console.log(err)
    }
  }

  return (
    <div className="w-full flex justify-center items-center h-[70vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[400px] mt-[10%]">
            <h1 className="text-3xl text-left font-thin">Create an account </h1>
            <input onChange={(e)=>setUsername(e.target.value)} className="w-full px-4 py-2 border-2 border-Rose-300" type="text" placeholder="Enter your username"/>
            <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-Rose-300" type="email" placeholder="Enter your email"/>
            <input onChange={(e)=>setPassoword(e.target.value)} className="w-full px-4 py-2 border-2 border-Rose-300" type="password" placeholder="Enter your password"/>
            <button onClick={handelRegister} className="w-full px-4 py-4 text-lg font-bold text-Rose-50 bg-Rose-900 rounded-lg hover:bg-Rose-700 hover:text-Rose-100">Continue</button>
            {error && <h3 className='text-Rose-950 text-xs font-extrathin'>You have already been registered please login</h3>}
            <p className="font-extrathin text-xs">By continuing with any of the options below, you agree to our Terms of Service and have read our Privacy Policy.</p>
            <div className="flex justify-center items-center space-x-3">
                <p>Already have an account?</p>
                <p className="text-Grey-500 hover:text-Rose-950"><Link to = "/login">LogIn</Link></p>
            </div>
        </div>
      
    </div>
  )
}

export default Register
