const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const blogSchema =  new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    // each blog has ha single user(author)
})

module.exports = mongoose.model("Blog",blogSchema)