import { Router } from "express";

import { createProduct } from "../controllers/product.js";

const productRouter = Router();
productRouter.post("/", createProduct);
export default productRouter;
