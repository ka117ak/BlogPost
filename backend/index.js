const express=require('express')
const { mongoose } = require('mongoose')
const app=express()
const dotenv=require('dotenv')
const cors=require('cors')
const multer = require('multer')
const path = require('path')
const cookieParser=require('cookie-parser')//middleware
const authRouter=require('./routes/auth')
const usersRouter=require('./routes/users')
const postsRouter=require('./routes/posts')
const commentsRouter=require('./routes/comments')

//database
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database have connected sucessfully")
    }
    catch(e){
        console.log(e)
    }
}

//middlewares
dotenv.config()
app.use(express.json())
app.use("/image",express.static(path.join(__dirname,"/image")))
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/users",usersRouter)
app.use("/api/posts",postsRouter)
app.use("/api/comments",commentsRouter)

//image upload 
const storage = multer.diskStorage({
    destination:(req, file, fn)=>{
        fn(null, "image")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
    }
})

const upload = multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})

app.listen(process.env.PORT, ()=>{
    connectDB()
    console.log("app is running "+process.env.PORT)
})