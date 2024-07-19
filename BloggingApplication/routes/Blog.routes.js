import express from "express";
import {
  DeleteBlog,
  EditBlog,
  getAllBlog,
  newBlogCreate,
  ViewBlog,
} from "../controllers/BlogContent.controller.js";
import upload from "../utils/multer.utils.js";

const BlogRoute = express.Router();

BlogRoute.post("/add-new", upload.single("coverImage"), newBlogCreate);
BlogRoute.post("/update-blog/:id", upload.single("coverImage"), EditBlog);
BlogRoute.get("/view-Blog/:id", ViewBlog);
BlogRoute.get("/del-Blog/:id", DeleteBlog);
BlogRoute.get("/getAllblog", getAllBlog);

export default BlogRoute;
