import EmployeeModel from "../Models/EmployeeModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

//register employee

export const registercontrol = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Validate role
    const allowedRoles = ['User', 'Admin', 'Editor'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role selected',
      });
    }

    // Check if the user already exists
    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email is already registered. Please login.',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new employee
    const employee = await new EmployeeModel({
      name,
      email,
      password: hashedPassword,
      role,
    }).save();

    res.status(201).json({
      success: true,
      message: 'Employee registered successfully',
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};


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