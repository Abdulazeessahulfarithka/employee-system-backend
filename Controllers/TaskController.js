import TaskModel from "../Models/TaskModel.js";

export const createTask =async(req,res)=>{
    try{
    const {title,description,assignedTo,status,deadline}=req.body

    const task = new TaskModel({
        title,
        description,
        assignedTo,
        status: status || "To-Do",
        deadline,
      });
  
      await task.save();
  
      res.status(201).send({
        success: true,
        message: "Task created successfully",
        task,
      });
   

    }catch(error){
        console.log("error")

    }
}
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
