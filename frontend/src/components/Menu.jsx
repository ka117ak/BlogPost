import { useContext } from "react"
import { Link, useNavigate} from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { URL } from "../url"
import axios from "axios"


const Menu = () => {
  const {user}=useContext(UserContext)
  const {setUser}=useContext(UserContext)
  const navigate=useNavigate()

  const logout = async() => {
    try {
      const res = await axios.get(URL+"/api/auth/logout",{withCredentials:true})
      // console.log(res)
      setUser(null)
      navigate("/login")
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div className=" cursor-pointer bg-Rose-700 w-[200px] flex flex-col items-start absolute top-8 right-4 rounded-md p-4 space=y=3">
      {!user && <h3 className="text-Rose-50 lext-sm hover:text-Rose-100 cursor-pointer "><Link to ="/login">Login</Link></h3>}
      {!user && <h3 className="text-Rose-50 lext-sm hover:text-Rose-100 cursor-pointer"><Link to ="/register">Register</Link></h3>}
      {user && <h3 className="text-Rose-50 lext-sm hover:text-Rose-100 cursor-pointer "><Link to ={"/profile/"+user._id}>Profile</Link></h3>}
      {user && <h3 className="text-Rose-50 lext-sm hover:text-Rose-100 cursor-pointer"><Link to={"/myblogs/"+user._id}>My blogs</Link></h3>}
      {user && <h3 onClick={logout} className="text-Rose-50 lext-sm hover:text-Rose-100 cursor-pointer">Logout</h3>}
    </div>
  )
}

export default Menu
