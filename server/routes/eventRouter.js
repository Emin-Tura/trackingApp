import { Router } from "express";

import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/event.js";

const eventRouter = Router();

eventRouter.post("/", createEvent);
eventRouter.get("/", getEvents);
eventRouter.delete("/:eventId", deleteEvent);
eventRouter.patch("/updateEvent/:eventId", updateEvent);

export default eventRouter;
