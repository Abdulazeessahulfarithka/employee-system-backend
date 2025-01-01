const mongoose = require('mongoose');

const TimeLogSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  totalHours: { type: Number },
  approved: { type: Boolean, default: false },
});

TimeLogSchema.pre('save', function (next) {
  if (this.startTime && this.endTime) {
    this.totalHours = Math.abs((this.endTime - this.startTime) / (1000 * 60 * 60));
  }
  next();
});

module.exports = mongoose.model('TimeLog', TimeLogSchema);
