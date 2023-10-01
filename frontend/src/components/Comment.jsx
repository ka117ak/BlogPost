import { AiOutlineDelete} from "react-icons/ai"
import { URL } from "../url"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"

const Comment = ({c}) => {
  const {user}=useContext(UserContext)
  const deleteComment=async(id)=>{
    try{
      await axios.delete(URL+"/api/comments/"+id,{withCredentials:true})
      window.location.reload(true)
    }
    catch(err){
      console.log(err)
    }
  }
  // console.log(post.userId)
  // console.log(user._id)
  // console.log(post)
  // console.log(user)
  return (
    <div>
      <div className='px-2 py-2 bg-Rose-300 rounded-lg mt-2 mb-2'>
            <div className='flex items-center justify-between'>
                <h3 className='font-bold text-Rose-700'>@{c.autor}</h3>
                <div className="flex justify-center items-center space-x-4">
                    <p className=' text-Rose-500 text-sm'>{new Date(c.updatedAt).toString().slice(0,15)}</p>
                    <p className=' text-Rose-500 text-sm'>{new Date(c.updatedAt).toString().slice(16,24)}</p>
                    {user?._id===c?.userId ?
                      <div className="flex items-center justify-center space-x-2 text-Rose-800">
                        <p className="cursor-pointer" onClick={()=>deleteComment(c._id)}><AiOutlineDelete/></p>
                      </div>:""}
                </div>
            </div>
            <p className='px-4 mt-4 text-Rose-950'>{c.comment}</p>
        </div>
    </div>
  )
}

export default Comment
