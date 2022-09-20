import tryCatch from "./utils/tryCatch.js";
import Task from "../models/Task.js";

export const createTask = tryCatch(async (req, res) => {
  const newTask = new Task({ ...req.body });
  await newTask.save();
  res.status(201).json({ success: true, result: newTask });
});
