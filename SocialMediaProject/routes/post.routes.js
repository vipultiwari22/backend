import express from "express";
import { CreatePost } from "../controllers/post.controller.js";
import upload from "../utils/multer.utils.js";

const POSTRoute = express.Router();

POSTRoute.post("/create-post", upload.single("postImage"), CreatePost);

export default POSTRoute;
