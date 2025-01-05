import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String ,required:true},
  status: { type: String, enum: ['To-Do', 'In Progress', 'Done'], default: 'To-Do' },
  deadline: { type: Date },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  project: { type: String},
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Task",TaskSchema)
