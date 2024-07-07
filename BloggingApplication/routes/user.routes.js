import express from "express";
import { createuser } from "../controllers/singup.controller.js";

const userRouter = express.Router();

userRouter.post("/", createuser);

export default userRouter;
