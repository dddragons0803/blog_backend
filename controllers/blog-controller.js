const Blog = require("../model/Blog")
const User = require("../model/User")
const mongoose = require("mongoose")
const asyncHandler= require("express-async-handler")
const { constants } = require("../constants");

const getAllBlogs = asyncHandler(async(req,res)=>{
    console.log("1")
    const blogs = await Blog.find();
    console.log("1")
    if(!blogs)
    {
        console.log("2")
       return res.status(404).json({message:"No Blog Found"})
    }
    console.log("1")
    return res.status(200).json({blogs})
})
const addBlog = asyncHandler(async(req,res)=>{
    console.log("3")
   const {title,description,image,user}=req.body;
   console.log("3")
   const existingUser = await User.findById(user);
   console.log("3")
   if(!existingUser)
   {
    res.status(400).json({message:"unable to find user"})
   }
   console.log("3")
   const blog = new Blog({
    title,
    description,
    image,
    user,
   })
   console.log("3")
//    await blog.save()
const session = await mongoose.startSession();
console.log("3")
session.startTransaction();
console.log("3")
await blog.save({session});
console.log("3")
existingUser.blogs.push(blog);
console.log("3")
await existingUser.save({ session })
console.log("3")
await session.commitTransaction();
console.log("3")
 return res.status(200).json({blog})
})

const updateBlog = asyncHandler(async(req,res)=>{
    const {title,description}=req.body;
    const blogId = req.params.id;
    const blog = await Blog.findByIdAndUpdate(blogId,{
        title,description,
    })
    if(!blog){
        res.status(500).json({message:"unable to update blog"})
    }
    res.status(200).json({blog})
})

const getById= asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const blog = await Blog.findById(id)
    
    if(!blog){
        res.status(400).json({message:"no blog found"})
    }
    res.status(200).json({blog})
})

const deleteBlog = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const blog=await Blog.findByIdAndRemove(id).populate('user');
    await blog.user.blogs.pull(blog)
    await blog.user.save()
    if(!blog){
        res.status(400).json({message:"unable to delete"})
    }
    res.status(200).json({message:"successfully deleted"})
})

const getByUserId = asyncHandler(async(req,res)=>{
   const userId = req.params.id;
   const userBlogs = await User.findById(userId).populate('blog')
   if(!userBlogs)
   {
    res.status(404).json({message:"no blog found"})
   }
   res.status(200).json({blogs:userBlogs})
})


module.exports= {getAllBlogs,addBlog,updateBlog,getById,deleteBlog,getByUserId}