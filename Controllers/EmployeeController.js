import EmployeeModel from "../Models/EmployeeModel.js";
import jwt from "jsonwebtoken"

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
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the employee exists
    const employee = await EmployeeModel.findOne({ email });
    if (!employee) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Validate password
    // const isPasswordValid = await bcrypt.compare(password, employee.password);
    // if (!isPasswordValid) {
    //   return res.status(401).send({
    //     success: false,
    //     message: "Invalid password",
    //   });
    // }

    // Generate JWT token
    const token = jwt.sign({ _id: employee._id, role: employee.role }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    // Respond with employee data (excluding sensitive information)
    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: employee._id,
        email: employee.email,
        role: employee.role,
      },
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

 // Get All Employees (Admin only)
export const getAllEmployees = async (req, res) => {
    try {
      const employees = await EmployeeModel.find().populate('tasks');
      res.status(200).json(employees);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };