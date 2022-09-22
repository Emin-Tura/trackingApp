import tryCatch from "./utils/tryCatch.js";
import Task from "../models/Task.js";

export const createTask = tryCatch(async (req, res) => {
  const newTask = new Task({ ...req.body });
  await newTask.save();
  res.status(201).json({ success: true, result: newTask });
});

export const getTasks = tryCatch(async (req, res) => {
  const task = await Task.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: task });
});
export const updateTask = tryCatch(async (req, res) => {
  const { completed } = req.body;
  await Task.findByIdAndUpdate(req.params.taskId, { completed });
  res.status(200).json({ success: true, result: { _id: req.params.taskId } });
});
