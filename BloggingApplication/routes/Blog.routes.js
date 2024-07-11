import express from "express";
import { newBlogCreate } from "../controllers/BlogContent.controller.js";

const BlogRoute = express.Router();

BlogRoute.post("/add-new", newBlogCreate);

export default BlogRoute;
