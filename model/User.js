const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const userSchema = new Schema({
// const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"please add user name"],
    },
    email:{
        type: String,
        required: [true,"please add user email"],
        unique: [true,"email adress already takken"],
    },
    password:{
        type: String,
        required: [true,"please add the user password"],
        minlength: 6
    },
    blogs:[{type:mongoose.Types.ObjectId,ref:"Blog",required:true}]
//  1 user can have may blogs , so we make array
},{
    timestamps: true,
})

module.exports = mongoose.model("User",userSchema)
// so it will create model for us like collection and we name collection as User , so in mondo db according to convention , users (in sammm letter and in plural form)named collection would be stored