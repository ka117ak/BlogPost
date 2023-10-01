import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'
import Comment from '../components/Comment'
import { useNavigate, useParams } from 'react-router-dom'
import { URL, IF } from '../url'
import { useContext, useEffect, useState } from 'react'
import axios from "axios"
import {UserContext} from "../context/UserContext"
import Loader from "../components/Loader"

const PostDetails = () => {

  const postId = useParams().id
  const [post, setPost] = useState({})
  const {user}=useContext(UserContext)
  const [comments,setComments]=useState([])
  const [comment,setComment]=useState("")
  const [loader, setLoader] = useState(false)
  const navigate =  useNavigate()

  const handelDelete = async() => {
    try {
      const res = await axios.delete(URL+"/api/posts/"+postId,{withCredentials:true})
      navigate("/")
    }
    catch (error) {
      console.log(error)
    }
  }

  const fetchPosts = async()=>{
    setLoader(true)
    try {
      const res = await axios.get(URL+"/api/posts/"+postId)
      setPost(res.data)
      setLoader(false)
    } 
    catch (error) {
      console.log(error)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPosts()
  },[postId])

  const fetchPostComments=async()=>{
    setLoader(true)
    try{
      const res = await axios.get(URL+"/api/comments/post/"+postId)
      setComments(res.data)
      setLoader(false)
    }
    catch(error){
      console.log(error)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPostComments()
  },[postId])

  // console.log(comment)
  // console.log(user.username)
  // console.log(postId)
  // console.log(user._id)

  const postComment = async(e)=>{
    e.preventDefault()
    try{
      const res=await axios.post(URL+"/api/comments/create",{comment:comment,autor:user.username,postId:postId,userId:user._id},{withCredentials:true})
      // console.log(res.data)
      setComment(res.data)
      // comment=""
      window.location.reload(true)
    }
    catch(err)
    {
      console.log(err)
    }

  }

  return (
    <div>
      {loader? <div className='h-[40vh] flex justify-center items-center'><Loader/></div>: <div className="p-x-8 md:px-[200px] mt-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-Rose-950 md:text-3xl">{post.title}</h1>
        {user?._id === post?.userId && <div className="flex items-center justify-center space-x-2">
            <p className='cursor-pointer' onClick={()=>navigate("/edit/"+postId)}><AiOutlineEdit/></p>
            <p className='cursor-pointer' onClick={handelDelete}><AiOutlineDelete/></p>
        </div>}
      </div>
      <div className='flex items-center justify-between mt-2 md:mt-4'>
        <p>@{post.username}</p>
        <div className="flex space-x-2 text-Grey-500">
          <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
          <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
        </div>
      </div>
      <img src={IF+post.photo} alt="" className='mx-auto w-100 md-8'/>
      <p className='mx-auto mt-8'>{post.desc}</p>
      <div className='flex items-center mt-8 space-x-4 font-semibold'>
        <p>Catagories:</p>
        <div className='flex justify-center items-center space-x-2'>
          {post.catagories?.map((c,i)=>(
            <div key={i} className='bg-Rose-300 rounded-lg px-3 py-1 text-Rose-900'>{c}</div>
          ))}
        </div>
      </div>
      <div className='flex flex-col mt-4'>
        <h3 className='mt-8 mb-4 font-semibold'>Comments:</h3>
        {comments?.map((c)=>(
          <Comment key={c._id} c={c}/>
         ))}
      </div>
      <div className='flex flex-col mt-4 md:flex-row'>
        <input onChange={(e)=>setComment(e.target.value)} value={comment} type = "text" placeholder="Add your Comment" className='md:w-[90%] outline-Rose-200 px-4 mt-4 md:mt-0'/>
        <button onClick={postComment} className='font-bold text-Rose-50 bg-Rose-900 rounded-lg hover:bg-Rose-700 hover:text-Rose-100 px-4 py-4 w-[200px]'>Add Comment</button>
      </div>
    </div>}
    </div>
  )
}

export default PostDetails
