import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProducts,
} from "../controllers/product.js";

const productRouter = Router();
productRouter.post("/", createProduct);
productRouter.get("/", getProducts);
productRouter.delete("/:productId", deleteProduct);
export default productRouter;
