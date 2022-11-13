import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  login,
  updateStatus,
  updatePassword,
} from "../controllers/user.js";

const userRouter = Router();
userRouter.post("/login", login);
userRouter.get("/", getUsers);
userRouter.patch("/updateStatus/:userId", updateStatus);
userRouter.patch("/updatePassword/:userId", updatePassword);
userRouter.post("/createuser", createUser);
userRouter.delete("/:userId", deleteUser);

export default userRouter;
