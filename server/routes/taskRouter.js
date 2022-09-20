import { Router } from "express";

import { createTask, getTasks } from "../controllers/task.js";

const taskRouter = Router();

taskRouter.post("/", createTask);
taskRouter.get("/", getTasks);

export default taskRouter;
