const mongoose = require("mongoose");
require("dotenv").config();

console.log(process.env.MONGO_URI); // temporary

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected ✅");
})
.catch((err)=>{
    console.log(err);
});