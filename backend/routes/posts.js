const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const User=require('../models/User')
const Post=require("../models/Post")
const Comment=require("../models/Comment")
const verifyToken=require('../verifyToken')

//create 
router.post("/create",verifyToken, async(req,res)=>{
    try {
        const newPost=new Post(req.body)
        // console.log(res.body)
        const savedPost=await newPost.save()
        res.status(200).json(savedPost)
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

//delete post
router.delete("/:id",verifyToken, async(req,res)=>{
    try {
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("post has been deleted from database")
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

//update post
router.put("/:id", verifyToken, async(req,res)=>{
    try {
        const updatedUser=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

//GET post details
router.get("/:id", async(req, res)=>{
    try {
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

//GET All post 
router.get("/", async(req, res)=>{
    const query=req.query
    
    try {
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const postS=await Post.find(query.search?searchFilter:null)
        res.status(200).json(postS)
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

//GET post of particular user
router.get("/user/:userId", async(req, res)=>{
    try {
        const post=await Post.find({userId:req.params.userId})
        res.status(200).json(post)
    } 
    catch (error) {
        res.status(500).json(error)
    }
})


module.exports=router