import express from "express";
import BLOG from "../models/BlogContent.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const allBlogs = await BLOG.find({});
  res.render("Home", {
    user: req.user,
    blogs: allBlogs,
  });
});

router.get("/singin", (req, res) => {
  return res.render("singin");
});

router.get("/singup", (req, res) => {
  return res.render("singup");
});

export default router;
