import { Router } from "express";

import { createTask, getTasks, updateTask } from "../controllers/task.js";

const taskRouter = Router();

taskRouter.post("/", createTask);
taskRouter.get("/", getTasks);
taskRouter.patch("/updateTask/:taskId", updateTask);

export default taskRouter;
