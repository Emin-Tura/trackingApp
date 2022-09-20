import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    task: { type: String, max: 250, required: true },
    assigned: { type: [String] },
  },
  { timestamps: true }
);

const Task = mongoose.model("tasks", taskSchema);
export default Task;
