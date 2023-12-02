const User = require("../model/User")
const { constants } = require("../constants");
const asyncHandler = require("express-async-handler")
// With express-async-handler, you don't need to manually wrap your try/catch blocks around asynchronous code. It automatically catches any errors that occur and passes them to the Express error-handling middleware, making your code cleaner and less error-prone.
const bcryptjs= require("bcryptjs")

// bcrypt:

// bcrypt is a Node.js binding for the popular bcrypt hashing library, which is written in C/C++. It is a native add-on for Node.js.
// it's generally faster than bcryptjs
// bcryptjs:

// bcryptjs is a pure JavaScript implementation of the bcrypt algorithm. It's written entirely in JavaScript, which means it doesn't have any dependencies on native code or C/C++ libraries.
// Because bcryptjs is pure JavaScript, it's often easier to use and doesn't require additional compilation, making it more compatible with different Node.js


const getAllUser = asyncHandler(async (req, res) => {
   
      const users = await User.find();    
        res.status(200).json(users);
  });
  


// res.status(200).json({ users });:
//  In this form, you are sending a JSON response where the "users" key is explicitly defined, and the value is the users variable. This will result in a response with a JSON object containing a single key "users" pointing to the users variable.
// Example response:
// {
//   "users": [/* Array of user data here */]
// }

// res.status(200).json(users);: In this form, you are sending a JSON response with the users variable directly. This will result in a response containing the content of the users variable as the top-level JSON data.
// Example response:
// [/* Array of user data here */]

const signup = asyncHandler(async(req,res)=>{
    console.log("1")
    const {name,email,password}=req.body;
    if(!name || !email || !password)
    {
        console.log("2")
        return res.status(400).json({
            error: "All fields are mandatory"
        });
        console.log("2")
    }
    console.log("1")
    const existingUser = await User.findOne({email});
    if(existingUser)
    {
        return res.status(400).json({message:"user already exists"})
    }
    console.log("1")
    const hashedPassword =  bcryptjs.hashSync(password)
    const user =  new User({
        name,
        email,
        password:hashedPassword,
        blogs:[]
    })
    console.log("1")
    await user.save();
    console.log("1")
     return res.status(201).json({user})

})

const login = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password)
    {
        res.status(400)
        throw new Error("all feild are mandatory")
    }
    const existingUser = await User.findOne({email})
    if(!existingUser)
    {
        return res.status(404).json({message:"couldn't find user by this email"})
    }
    const isPasswordCorrect = bcryptjs.compareSync(password,existingUser.password)
    if(!isPasswordCorrect)
    {
        return res.status(400).json({message:"incorrect password"})
    }
    return res.status(200).json({message:"Login Successful"})
})



module.exports = { getAllUser, signup ,login}
