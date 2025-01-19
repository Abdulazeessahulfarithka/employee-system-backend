import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['To-Do', 'In Progress', 'Done'],
    default: 'To-Do',
  },
  deadline: { type: Date },
  assignedTo: {
    type: mongoose.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  project: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Task", TaskSchema);
