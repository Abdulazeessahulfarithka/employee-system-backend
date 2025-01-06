import TaskModel from "../Models/TaskModel.js";


export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, status, deadline } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }
    
    // Create a new task
    const task = new TaskModel({
      title,
      description,
      assignedTo,
      status: status || "To-Do", // Default status if not provided
      deadline,
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
    console.error("Error creating task:", error); // Log the error for debugging

    res.status(500).json({
      success: false,
      message: "Failed to create task",
      error: error.message, // Include error details for debugging
    });
  }
};

// Update a task
export const updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      const updatedTask = await TaskModel.findByIdAndUpdate(id, updates, {
        new: true,
      });
  
      if (!updatedTask) {
        return res.status(404).send({
          success: false,
          message: "Task not found",
        });
      }
  
      res.status(200).send({
        success: true,
        message: "Task updated successfully",
        task: updatedTask,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Error updating task",
        error: err.message,
      });
    }
  };
  
  // Delete a task
  export const deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedTask = await TaskModel.findByIdAndDelete(id);
  
      if (!deletedTask) {
        return res.status(404).send({
          success: false,
          message: "Task not found",
        });
      }
  
      res.status(200).send({
        success: true,
        message: "Task deleted successfully",
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Error deleting task",
        error: err.message,
      });
    }
  };
  
  // Get all tasks
  export const getAllTasks = async (req, res) => {
    try {
      const tasks = await TaskModel.find();
      res.status(200).send({
        success: true,
        tasks,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Error fetching tasks",
        error: err.message,
      });
    }
  };
  
  // Get tasks by assigned employee
  export const getTasksByEmployee = async (req, res) => {
    try {
      const { employeeId } = req.params;
  
      const tasks = await TaskModel.find({ assignedTo: employeeId });
  
      res.status(200).send({
        success: true,
        tasks,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Error fetching tasks for employee",
        error: err.message,
      });
    }
  };
// In TaskController.js
export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await TaskModel.findById(taskId); // Replace TaskModel with your Mongoose model
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
