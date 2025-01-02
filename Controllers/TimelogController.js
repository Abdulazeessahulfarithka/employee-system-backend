import TimeLogModel from "../Models/TimelogModel.js";

// Create a new time log
export const createTimeLog = async (req, res) => {
  try {
    const { taskId, employeeId, startTime, endTime } = req.body;

    const timeLog = new TimeLogModel({
      taskId,
      employeeId,
      startTime,
      endTime,
      duration: endTime ? new Date(endTime) - new Date(startTime) : 0,
    });

    await timeLog.save();

    res.status(201).send({
      success: true,
      message: "Time log created successfully",
      timeLog,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error creating time log",
      error: err.message,
    });
  }
};

// Get all time logs
export const getAllTimeLogs = async (req, res) => {
  try {
    const timeLogs = await TimeLogModel.find().populate("taskId employeeId");

    res.status(200).send({
      success: true,
      timeLogs,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error fetching time logs",
      error: err.message,
    });
  }
};

// Get time logs by employee
export const getTimeLogsByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const timeLogs = await TimeLogModel.find({ employeeId }).populate("taskId");

    res.status(200).send({
      success: true,
      timeLogs,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error fetching time logs for employee",
      error: err.message,
    });
  }
};

// Get time logs by task
export const getTimeLogsByTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const timeLogs = await TimeLogModel.find({ taskId }).populate("employeeId");

    res.status(200).send({
      success: true,
      timeLogs,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error fetching time logs for task",
      error: err.message,
    });
  }
};
