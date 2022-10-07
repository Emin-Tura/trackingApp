import tryCatch from "./utils/tryCatch.js";
import Event from "../models/Event.js";

export const createEvent = tryCatch(async (req, res) => {
  const { added, id } = req.body;
  const newEvent = new Event({ ...added, id });
  await newEvent.save();
  res.status(201).json({ success: true, result: newEvent });
});

export const getEvents = tryCatch(async (req, res) => {
  const event = await Event.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: event });
});

export const deleteEvent = tryCatch(async (req, res) => {
  const { eventId } = req.params;
  const event = await Event.deleteOne({ id: eventId });
  res.status(200).json({ success: true, result: event });
});

export const updateEvent = tryCatch(async (req, res) => {
  await Event.findOneAndUpdate(req.params.eventId, { ...req.body });
  res.status(200).json({ success: true, result: { id: req.params.eventId } });
});
