import express from "express";
import { commentContent } from "../controllers/comment.controller.js";

const commentRoute = express.Router();

commentRoute.post("/:id", commentContent);

export default commentRoute;
