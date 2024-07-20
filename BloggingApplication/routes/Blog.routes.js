import express from "express";
import {
  commentByUser,
  DeleteBlog,
  EditBlog,
  getAllBlog,
  newBlogCreate,
  ViewBlog,
} from "../controllers/BlogContent.controller.js";
import upload from "../utils/multer.utils.js";
import { AuthUser } from "../middleware/authentication.middleware.js";

const BlogRoute = express.Router();

BlogRoute.post(
  "/add-new",
  AuthUser,
  upload.single("coverImage"),
  newBlogCreate
);
BlogRoute.post(
  "/update-blog/:id",
  AuthUser,
  upload.single("coverImage"),
  EditBlog
);
BlogRoute.get("/view-Blog/:id", ViewBlog);
BlogRoute.delete("/del-Blog/:id", AuthUser, DeleteBlog);
BlogRoute.post("/comment/:id", AuthUser, commentByUser);
BlogRoute.get("/getAllblog", AuthUser, getAllBlog);

export default BlogRoute;
