import express from "express";

import { AuthUser } from "../middleware/authentication.middleware.js";
import {
  createuser,
  EditUserProfile,
  loginUser,
  logout,
} from "../controllers/User.controller.js";
import upload from "../utils/multer.utils.js";

const userRouter = express.Router();

userRouter.post("/", createuser);
userRouter.post("/singin", loginUser);
userRouter.get("/logout", AuthUser, logout);
userRouter.post(
  "/edit/:id",
  upload.single("profileImage"),
  AuthUser,
  EditUserProfile
);

export default userRouter;
