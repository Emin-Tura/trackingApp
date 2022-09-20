import { Router } from "express";

import { createTask } from "../controllers/task.js";

const taskRouter = Router();

taskRouter.post("/", createTask);
export default taskRouter;
