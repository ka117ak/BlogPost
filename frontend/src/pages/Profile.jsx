import ProfilePost from "../components/ProfilePost"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { IF, URL } from "../url"
import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from "react-router-dom"

const Profile = () => {
  const param=useParams().id
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {user,setUser}=useContext(UserContext)
  const navigate=useNavigate()
  const [posts,setPosts]=useState([])
  const [updated,setUpdated]=useState(false)
  // console.log(user)

  const fetchProfile=async ()=>{
    try{
       const res=await axios.get(URL+"/api/users/"+user._id)
       setUsername(res.data.username)
       setEmail(res.data.email)
       setPassword(res.data.password)
    }
    catch(err){
       console.log(err)
    }
  }
  
  const handleUserUpdate=async ()=>{
    setUpdated(false)
    try{
      const res=await axios.put(URL+"/api/users/"+user._id,{username,email,password},{withCredentials:true})
      // console.log(res.data)
      setUpdated(true)
  
    }
    catch(err){
      console.log(err)
      setUpdated(false)
    }
  
  }

  const handleUserDelete=async()=>{
    try{
      const res=await axios.delete(URL+"/api/users/"+user._id,{withCredentials:true})
      setUser(null)
      navigate("/")
      // console.log(res.data)
    }
    catch(err){
      console.log(err)
    }
  }

  const fetchUserPosts=async ()=>{
    try{
      const res=await axios.get(URL+"/api/posts/user/"+user._id)
      // console.log(res.data)
      setPosts(res.data)
    }
    catch(err){
      console.log(err)
    }
  }
  
  useEffect(()=>{
    fetchProfile()
  
  },[param])

  useEffect(()=>{
    fetchUserPosts()
  
  },[param])

  return (
    <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start">
      <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
        <h1 className="text-xl font-bold mb-4">Your Post:</h1>
        {posts?.map((p)=>(
            <ProfilePost key={p._id} p={p}/>
          ))}
      </div>
      <div className="md:sticky md:top-16 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
        <div className="flex flex-col space-y-4 item-start">
          <h1 className="text-xl font-bold mb-4">Profile</h1>
          <input onChange={(e)=>setUsername(e.target.value)} value={username} className="outline-none px-4 py-2 text-Rose-300" placeholder="your username" type="text"/>
          <input className="outline-none px-4 py-2 text-Rose-300" placeholder="your email" type="email"/>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} className="outline-none px-4 py-2 text-Rose-300" placeholder="your password" type="password"/>
          <div className="flex items-center space-x-4 mt-8">
            <button onClick={handleUserUpdate} className="text-Rose-50 font-semibold px-4 py-2 bg-Rose-900 hover:text-Rose-100 hover:bg-Rose-700 cursor-pointer">Update</button>
            <button onClick={handleUserDelete} className="text-Rose-50 font-semibold px-4 py-2 bg-Rose-900 hover:text-Rose-100 hover:bg-Rose-700 cursor-pointer">Delete</button>
          </div>
          {updated && <h3 className="text-green-500 text-sm text-center mt-4">user updated successfully!</h3>}
        </div>
      </div>
    </div>
  )
}

export default Profile
