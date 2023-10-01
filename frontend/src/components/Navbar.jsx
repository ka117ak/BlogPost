import { Link, useLocation, useNavigate } from "react-router-dom"
import {BiSearchAlt} from 'react-icons/bi'
import {FaBars} from 'react-icons/fa'
import { useContext, useState } from "react"
import Menu from "./Menu"
import { UserContext } from "../context/UserContext"

const Navbar = () => {
  const [promt, setPrompt]=useState("")
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()
  const path=useLocation().pathname

  // console.log(path)

  const showmenu = () =>{
    setMenu(!menu)
  }

  const {user}=useContext(UserContext)
  // console.log(user)
  return (
    <div className="flex items-center justify-between px-4 md:px-[20px] py-4 bg-Rose-800">
      <h1 className=" text-lg md:text-xl font-extrabold text-Rose-50"><Link to="/">BlogPost</Link></h1>
      {path === "/" && <div className="flex justify-center items-center px-5 space-x-0 h-7 flex-1 w-fit">
        <p onClick={()=>navigate(promt?"?search="+promt:navigate("/"))} className="cursor-pointer px-3 py-1.5 bg-Rose-900 text-Rose-50 md:text-xl ">< BiSearchAlt/></p>
        <input onChange={(e)=>setPrompt(e.target.value)} className="outline-none px-3 py-1 flex-1 w-fit" placeholder="search here:)" type="text"/>
      </div>}
      <div className="hidden md:flex item-center justify-center space-x-4 md:space-x-4  text-Rose-100 text-lg">
        {user? <h3><Link to ="/write">Write</Link></h3> : <h3><Link to = "/login">Login</Link></h3>}
        {user? < div onClick={showmenu} className="text-lg text-Rose-50 cursor-pointer py-1.5 relative"><FaBars/>{menu && <Menu/>}</div> : <h3><Link to = "/register">Register</Link></h3>}
      </div>
      <div onClick={showmenu} className="md:hidden text-lg text-Rose-50 cursor-pointer relative">
        <FaBars/>
        {menu && <Menu/>}
      </div>
    </div>
  )
}

export default Navbar

