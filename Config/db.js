import mongoose from "mongoose";

const db =async()=>{
try{
     const connection= await mongoose.connect(process.env.MONGO_URL)
     console.log("mongodb is connected")

}catch(error){
    console.log("error")

}
}