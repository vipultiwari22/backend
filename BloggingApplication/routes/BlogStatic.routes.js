import express from "express";
import BLOG from "../models/BlogContent.model.js";
import { AuthUser } from "../middleware/authentication.middleware.js";

const BlogRouter = express.Router();

BlogRouter.get("/addBlog", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

BlogRouter.get("/editBlog/:id", AuthUser, async (req, res) => {
  try {
    const BlogId = req.params.id;
    const allblog = await BLOG.findById(BlogId);
    console.log("blogById", allblog.coverImage);

    if (!allblog) {
      return res.status(404).send("Blog not found");
    }

    return res.render("EditBlog", {
      allblog,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

export default BlogRouter;
