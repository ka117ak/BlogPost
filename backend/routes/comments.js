const express=require('express')
const router=express.Router()
// const bcrypt=require('bcrypt')
// const User=require('../models/User')
// const Post=require("../models/Post")
const Comment=require("../models/Comment")
const verifyToken=require('../verifyToken')

//create 
router.post("/create", verifyToken, async(req,res)=>{
    try {
        const newcomment=new Comment(req.body)
        // console.log(res.body)
        const savedcomment=await newcomment.save()
        res.status(200).json(savedcomment)
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

//delete post
router.delete("/:id", async(req,res)=>{
    try {
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json("comment has been deleted from database")
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

//update post
router.put("/:id", verifyToken, async(req,res)=>{
    try {
        const updatedComment=await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedComment)
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

router.get("/post/:postId", async(req, res)=>{
    try {
        const comment=await Comment.find({postId:req.params.postId})
        res.status(200).json(comment)
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

module.exports=router