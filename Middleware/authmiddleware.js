import jwt from "jsonwebtoken";
import EmployeeModel from "../Models/EmployeeModel.js";

// Verify JWT Token
export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).send({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ message: "Invalid or expired token." });
  }
};

// Check if the user is an Admin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await EmployeeModel.findById(req.user._id);
    if (user.role !== "admin") {
      return res.status(403).send({ message: "Access denied. Admins only." });
    }
    next();
  } catch (err) {
    res.status(500).send({ message: "Server error.", error: err.message });
  }
};
