const express = require("express")
const connectDb= require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler")
// When you use import, you are using ESModules, and you need to set "type": "module" in your package.json to indicate that your project uses ESModules otherwise -- const express = require("express"); is the traditional way to import modules in Node.js using CommonJS. It is supported in all versions of Node.js, 
//nodemon --experimental-modules-es-module-specifier-resolution-node app.js ----> nodemon to run your application with experimental modules enabled, allowing you to use the import and export syntax for modules.


const dotenv = require("dotenv").config();

//  for using es6 import , export modules in nodejs , we need to add "type":"module"  in package.json ans also change start script in package.json

connectDb()

const app = express();
const router = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes")
// console.log("1")
app.use(express.json()); 
app.use("/api/user",router)
app.use("/api/blog",blogRouter)
const port = process.env.PORT || 5000;
 

app.use(errorHandler); 
app.listen(port,() =>{  console.log(`hii hii ${port}`) });