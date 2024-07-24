import express from "express";
import {
  CreatePost,
  DeletePost,
  EditPosts,
} from "../controllers/post.controller.js";
import upload from "../utils/multer.utils.js";

const POSTRoute = express.Router();

POSTRoute.post("/create-post", upload.single("postImage"), CreatePost);
POSTRoute.post("/update-post/:id", upload.single("postImage"), EditPosts);
POSTRoute.get("/delete-post/:id", DeletePost);

export default POSTRoute;
