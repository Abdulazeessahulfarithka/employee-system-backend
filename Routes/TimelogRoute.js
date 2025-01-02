import express from "express";
import {
  createTimeLog,
  getAllTimeLogs,
  getTimeLogsByEmployee,
  getTimeLogsByTask,
} from "../Controllers/TimelogController.js";
import { verifyToken } from "../Middleware/authmiddleware.js";

const router = express.Router();

// Create a new time log
router.post("/", verifyToken, createTimeLog);

// Get all time logs (Admin only)
router.get("/", verifyToken, getAllTimeLogs);

// Get time logs by employee ID
router.get("/employee/:employeeId", verifyToken, getTimeLogsByEmployee);

// Get time logs by task ID
router.get("/task/:taskId", verifyToken, getTimeLogsByTask);

export default router;
