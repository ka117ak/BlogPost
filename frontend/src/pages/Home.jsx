import React, { useContext, useEffect, useState } from 'react'
import HomePost from '../components/HomePost'
import axios from 'axios'
import { URL } from '../url'
import { Link, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import {UserContext} from "../context/UserContext"

const Home = () => {

  const {search} =  useLocation()
  // console. log(search)

  const [posts, setPosts] = useState([])
  const [noResult, setNoResult] = useState(false)
  const [loader, setLoader] = useState(false)
  const {user}=useContext(UserContext)
  // console.log(user)

  const fetchPosts=async()=>{
    setLoader(true)
    try {
      const res=await axios.get(URL+"/api/posts/"+search)
      // console.log(res.data)
      setPosts(res.data)
      if(res.data.length === 0){
        setNoResult(true)
      }
      else{
        setNoResult(false)
      }
      setLoader(false)
    } 
    catch (error) {
      console.log(error)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPosts()
  },[search])


  return (
    <div className='px-8 md:px-[200px]'>
      {loader?<div className='h-[40vh] flex justify-center items-center'><Loader/></div>:!noResult? posts.map((post)=>(
        <>
        <Link to={user?`/posts/post/${post._id}` : "/login"}>
          <HomePost key={post._id} post={post}/>
        </Link>
        </>
      )) : <h3 className='text-Rose-900 text-center font-bold mt-16'> No post Available!</h3> }
    </div>
  )
}

export default Home

