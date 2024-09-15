import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: null,
  },
  category: {
    type: String,
    default: null,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: null,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
