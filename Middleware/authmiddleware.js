import JWT from "jsonwebtoken";
import EmployeeModel from "../Models/EmployeeModel.js";

// Verify JWT Token
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.authorization

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ") [1];
// console.log(token)
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    try {
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      // console.log("the decoded user",req.user)
      next();
    } catch (error) {
      console.error("JWT verification failed:", error.message);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Authorization header missing or malformed",
    });
  }
};

// Check if the user is an Admin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await EmployeeModel.findById(req.user._id);
   
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    next();
  } catch (error) {
    // console.error("Error in admin middleware:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
