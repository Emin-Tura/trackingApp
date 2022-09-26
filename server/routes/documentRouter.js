import { Router } from "express";
import { createDocument } from "../controllers/document.js";

const documentRouter = Router();
documentRouter.post("/", createDocument);
export default documentRouter;
