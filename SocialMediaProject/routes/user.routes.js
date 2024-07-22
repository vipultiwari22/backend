import express from "express";
import { login, logout, Singup } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/Singup", Singup);
router.post("/login", login);
router.get("/Logout", logout);

export default router;
