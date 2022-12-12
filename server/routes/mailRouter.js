import { Router } from "express";

import { createMail } from "../controllers/mail.js";

const mailRouter = Router();

mailRouter.post("/", createMail);

export default mailRouter;
