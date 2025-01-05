import express from "express";
import {
  createReport,
  getAllReports,
  updateReport,
  deleteReport,
} from "../Controllers/ReportController.js";
import { verifyToken } from "../Middleware/authmiddleware.js"; // Middleware for authentication

const router = express.Router();

// Routes for report management
router.post("/", verifyToken, createReport);
router.get("/", verifyToken, getAllReports);
router.put("/:id", verifyToken, updateReport);
router.delete("/:id", verifyToken, deleteReport);

export default router;
