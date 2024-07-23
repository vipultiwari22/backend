import express from "express";
import {
  EditProfile,
  login,
  logout,
  Singup,
} from "../controllers/user.controller.js";
import upload from "../utils/multer.utils.js";

const router = express.Router();

router.post("/Singup", Singup);
router.post("/login", login);
router.get("/Logout", logout);
router.post("/update-profile/:id", upload.single("profileImage"), EditProfile);

export default router;
