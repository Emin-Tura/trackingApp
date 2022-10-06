import { Router } from "express";

import { createEvent, deleteEvent, getEvents } from "../controllers/event.js";

const eventRouter = Router();

eventRouter.post("/", createEvent);
eventRouter.get("/", getEvents);
eventRouter.delete("/:eventId", deleteEvent);

export default eventRouter;
