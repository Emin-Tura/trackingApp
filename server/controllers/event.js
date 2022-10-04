import tryCatch from "./utils/tryCatch.js";
import Event from "../models/Event.js";

export const createEvent = tryCatch(async (req, res) => {
  const newEvent = new Event({ ...req.body });
  await newEvent.save();
  res.status(201).json({ success: true, result: newEvent });
});

export const getEvents = tryCatch(async (req, res) => {
  const event = await Event.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: event });
});
