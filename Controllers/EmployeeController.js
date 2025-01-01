import EmployeeModel from "../Models/EmployeeModel.js";
import JWT from "jsonwebtoken"

//register employee
export const registercontrol = async(req,res)=>{
    try{
  const {name,email,password,role}=req.body
 
  if(!name){
    return res.send({message:"name is required"})
  }
  if(!email){
    return res.send({message:"email is required"})
  }
  if(!password){
    return res.send({message:"password is required"})
  }
  if(!role){
    return res.send({message:"role is required"})
  }
// check user
const exisitingUser = await EmployeeModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please login",
      });
    }

    const Employee = await new EmployeeModel({
        name,
        email,
        password,
        role
      }).save();
  
      res.status(201).send({
        success: true,
        message: "Employee Register Successfully",
        Employee,
      });
    }catch(error){
        console.log("error")
    }

}

// login employee
 export const LoginControll=async (req,res)=>{
    try {
        const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const Employee = await EmployeeModel.findOne({ email });
    if (!Employee) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          email: user.email,
          password:user.password,
          role: user.role,
        },
        token,
      });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
 }
 // Get All Employees (Admin only)
export const getAllEmployees = async (req, res) => {
    try {
      const employees = await EmployeeModel.find().populate('tasks');
      res.status(200).json(employees);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };