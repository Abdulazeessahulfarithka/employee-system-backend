import TaskModel from "../Models/TaskModel.js";
import mongoose from "mongoose";

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, status, deadline, project } = req.body;

    // Validate required fields
    if (!title || !description || !assignedTo) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and assignedTo are required fields",
      });
    }

    // Create a new task
    const task = new TaskModel({
      title,
      description,
      assignedTo,
      status: status || "To-Do", // Default to "To-Do" if not provided
      deadline,
      project,
    });

    // Save the task to the database
    await task.save();

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Error creating task:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create task",
      error: error.message,
    });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating task",
      error: error.message,
    });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const deletedTask = await TaskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting task",
      error: error.message,
    });
  }
};

// Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};

// Get tasks by assigned employee
export const getTasksByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID",
      });
    }

    const tasks = await TaskModel.find({ assignedTo: employeeId });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching tasks for employee",
      error: error.message,
    });
  }
};

// Get task by ID
export const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetched task successfully",
      task,
    });
  } catch (error) {
    console.error("Error while fetching task:", error.message);
    res.status(500).json({
      success: false,
      message: "Error while fetching task",
      error: error.message,
    });
  }
};
