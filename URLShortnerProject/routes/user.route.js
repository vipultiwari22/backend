import express from "express";
import { LoginUser, createUser, getAllUser } from "../controllers/user.controller.js";

const Router = express.Router();

Router.post("/", createUser);
Router.post("/login", LoginUser);
Router.get("/AllUser", getAllUser);

export default Router;
