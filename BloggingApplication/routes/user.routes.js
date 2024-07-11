import express from "express";
import {
  createuser,
  getAllUser,
  loginUser,
  logout,
} from "../controllers/singup.controller.js";

const userRouter = express.Router();

userRouter.post("/", createuser);
userRouter.post("/singin", loginUser);
userRouter.get("/logout", logout);
userRouter.get("/AllUsers", getAllUser);

export default userRouter;
