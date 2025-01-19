import JWT from "jsonwebtoken";
import EmployeeModel from "../Models/EmployeeModel.js";

// Middleware to verify JWT token
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header is present and well-formed
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing or malformed",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user data to the request object for downstream use
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Middleware to check if the user is an Admin
export const isAdmin = async (req, res, next) => {
  try {
    // Ensure `req.user` is populated by the `verifyToken` middleware
    if (!req.user || !req.user._id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: User data missing",
      });
    }

    // Find user in the database
    const user = await EmployeeModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check user role
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin access required",
      });
    }

    next(); // User is authorized
  } catch (error) {
    console.error("Error in admin middleware:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
