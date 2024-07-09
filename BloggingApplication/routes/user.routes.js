import express from "express";
import {
  createuser,
  getAllUser,
  loginUser,
} from "../controllers/singup.controller.js";

const userRouter = express.Router();

userRouter.post("/", createuser);
userRouter.post("/singin", loginUser);
userRouter.get("/AllUsers", getAllUser);

export default userRouter;
