import ReportModel from "../Models/ReportModel.js";

// Create a new report
export const createReport = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newReport = new ReportModel({
      title,
      description,
      createdBy: req.user._id, // Assuming user is authenticated
    });

    await newReport.save();

    res.status(201).send({
      success: true,
      message: "Report created successfully",
      report: newReport,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error creating report",
      error: err.message,
    });
  }
};

// Get all reports
export const getAllReports = async (req, res) => {
  try {
    const reports = await ReportModel.find().populate("createdBy", "name email");
    res.status(200).send({
      success: true,
      reports,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error fetching reports",
      error: err.message,
    });
  }
};

// Update a report
export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedReport = await ReportModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedReport) {
      return res.status(404).send({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Report updated successfully",
      report: updatedReport,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error updating report",
      error: err.message,
    });
  }
};

// Delete a report
export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReport = await ReportModel.findByIdAndDelete(id);

    if (!deletedReport) {
      return res.status(404).send({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error deleting report",
      error: err.message,
    });
  }
};
