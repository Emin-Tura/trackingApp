import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  login,
  updateStatus,
} from "../controllers/user.js";

const userRouter = Router();
userRouter.post("/login", login);
userRouter.get("/", getUsers);
userRouter.patch("/updateStatus/:userId", updateStatus);
userRouter.post("/createuser", createUser);
userRouter.delete("/:userId", deleteUser);

export default userRouter;
