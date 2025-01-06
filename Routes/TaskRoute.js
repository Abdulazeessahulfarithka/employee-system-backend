import express from "express";
import {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTasksByEmployee,
  getTaskById,
} from "../Controllers/TaskController.js";
import { verifyToken, isAdmin } from "../Middleware/authmiddleware.js";

const router = express.Router();

// Create a new task (Admin only)
router.post("/",verifyToken,createTask);

// Update a task by ID (Admin only)
router.put("/:id", verifyToken, isAdmin, updateTask);

// Delete a task by ID (Admin only)
router.delete("/:id", verifyToken, isAdmin, deleteTask);

// Get all tasks (Admin only)
router.get("/", verifyToken, isAdmin, getAllTasks);
router.get("/:id", verifyToken, getTaskById);

// Get tasks assigned to a specific employee
router.get("/employee/:employeeId", verifyToken, getTasksByEmployee);

export default router;
