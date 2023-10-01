import { useContext, useEffect, useState } from "react"
import { AiOutlineDelete } from "react-icons/ai"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"


const EditPost = () => {

    const [cat, setCat] = useState("")
    const [cats, setCats] = useState([])
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const {user}=useContext(UserContext)
    const postId = useParams().id
    const navigate=useNavigate()

    const fetchPost = async() =>{
        try {
            const res = await axios.get(URL+"/api/posts/"+postId)
            setTitle(res.data.title)
            setDesc(res.data.desc)
            setFile(res.data.photo)
            setCats(res.data.catagories)
        } 
        catch (error) {
            console.log(error)
        }
    }

    const handleUpdate=async(e)=>{
        e.preventDefault()
        const post={
          title,
          desc,
          username:user.username,
          userId:user._id,
          categories:cats
        }
  
        if(file){
          const data=new FormData()
          const filename=Date.now()+file.name
          data.append("img",filename)
          data.append("file",file)
          post.photo=filename

          try{
            const imgUpload=await axios.post(URL+"/api/upload",data)

          }
          catch(err){
            console.log(err)
          }
        }
       
        try{
          const res=await axios.put(URL+"/api/posts/"+postId,post,{withCredentials:true})
          navigate("/posts/post/"+res.data._id)
  
        }
        catch(err){
          console.log(err)
        }
      }

    useEffect(()=>{
        fetchPost()
    },[postId])

    const addCategory = () => {
        let updateCats=[...cats]
        updateCats.push(cat)
        setCat("")
        setCats(updateCats)
    }

    const deleteCategory = (i) => {
        let updatesCats=[...cats]
        updatesCats.splice(i)
        setCats(updatesCats)
    }

  return (
    <div className="p-x-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl mt-8">Update the Post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
            <input onChange={(e)=>setText(e.target.value)} value={title} type="text" placeholder="Enter your title" className="px-4 py-2 outline-none"/>
            <input onChange={(e)=>setFile(e.target.files[0])} type="file" className="px-4 py-2 outline-none"/>
            <div className="flex flex-col">
                <div className="flex items-center space-x-4 md:space-x-8">
                    <input value={cat} onChange={(e)=>setCat(e.target.value)} className="px-4 py-2 outline-none" placeholder="Enter post Catagory" type="text"/>
                    <div onClick={addCategory} className="px-4 py-2 font-semibold text-Rose-50 bg-Rose-900 rounded-lg hover:bg-Rose-700 hover:text-Rose-100 cursor-pointer">Add</div>
                </div>
                <div className="flex px-4 mt-3">
                    {cats?.map((c,i) => (
                        <div key={i} className="flex justify-center items-center space-x-2 text-Rose-50 bg-Rose-600 px-4 py-1 rounded-md mx-2  hover:bg-Rose-700 hover:text-Rose-100 cursor-pointer">
                          <p>{c}</p>
                          <p onClick={()=>deleteCategory(i)} className="text-Rose-50 cursor-pointer"><AiOutlineDelete/></p>
                        </div>
                    ))}
                </div>
            </div>
            <textarea onChange={(e)=>setDesc(e.target.value)} value={desc} type="text" rows={20} cols={30} className="px-4 py-2 outline-none" placeholder="enter post description"/>
            <button onClick={handleUpdate} className="w-full md:w-[20%] mx-auto px-4 py-4 text-lg font-semibold text-Rose-50 bg-Rose-900 rounded-lg hover:bg-Rose-700 hover:text-Rose-100">Update</button>
        </form>
    </div>
  )
}

export default EditPost
