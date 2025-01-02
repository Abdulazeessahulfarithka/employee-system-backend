import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: { 
  type: String, 
  enum: ['User', 'Admin', 'Editor'], 
  default: 'User' 
},

    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("employee",EmployeeSchema)