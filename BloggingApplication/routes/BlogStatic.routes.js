import express from "express";

const BlogRouter = express.Router();

BlogRouter.get("/addBlog", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

export default BlogRouter;
