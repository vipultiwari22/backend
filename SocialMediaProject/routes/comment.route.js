import express from "express";
import { commentOnPost } from "../controllers/comment.controller.js";
const commentRoute = express.Router();

commentRoute.post("/:id", commentOnPost);

export default commentRoute;
