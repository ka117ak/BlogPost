import Home from "./pages/Home"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import {Route, Routes} from 'react-router-dom'
import Login from "./pages/Login"
import Register from "./pages/Register"
import PostDetails from "./pages/PostDetails"
import CreatePost from "./pages/CreatePost"
import EditPost from "./pages/EditPost"
import Profile from "./pages/Profile"
import { UserContextProvider } from "./context/UserContext"
import MyBlogs from "./pages/MyBlogs"


const App = () => {
  return (
    <UserContextProvider>
      <Routes>
      <Route exact path="/" element={<><Navbar/><Home/><Footer/></>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/posts/post/:id" element={<><Navbar/><PostDetails/><Footer/></>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/write" element={<><Navbar/><CreatePost/><Footer/></>}/>
      <Route exact path="/edit/:id" element={<><Navbar/><EditPost/><Footer/></>}/>
      <Route exact path="/myblogs/:id" element={<><Navbar/><MyBlogs/><Footer/></>}/>
      <Route exact path="/profile/:id" element={<><Navbar/><Profile/><Footer/></>}/>
      </Routes>
    </UserContextProvider>
  )
}

export default App

