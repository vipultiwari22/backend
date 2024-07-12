import express from "express";
import {
  getAllBlog,
  newBlogCreate,
} from "../controllers/BlogContent.controller.js";
import upload from "../utils/multer.utils.js";

const BlogRoute = express.Router();

BlogRoute.post("/add-new", upload.single("coverImage"), newBlogCreate);
BlogRoute.get("/getAllblog", getAllBlog);

export default BlogRoute;
