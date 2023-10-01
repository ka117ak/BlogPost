const jwt=require('jsonwebtoken') ///verfies the user before any action

const verifyToken=(req,res,next)=>{
    const token=req.cookies.token
    // console.log(token)
    if(!token){
        return res.status(401).json("Your are not authenticated!")
    }
    jwt.verify(token,process.env.SECRET, async(err, data)=>{
        if(err){
            return res.status(403).json("token is not valid!")
        }
        req.userId=data._id
        // console.log("passed")
        next()
    })
}

module.exports=verifyToken