import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Closed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", ReportSchema);
