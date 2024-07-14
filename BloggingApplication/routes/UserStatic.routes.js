import express from "express";
import BLOG from "../models/BlogContent.model.js";
import { AuthUser } from "../middleware/authentication.middleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Find all blogs and populate the createdBy field with user details
    const allBlogs = await BLOG.find({}).populate("createdBy");

    if (!allBlogs) return res.status(400).json({ message: "No blogs found!" });

    res.render("Home", {
      user: req.user,
      blogs: allBlogs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/profile", AuthUser, (req, res) => {
  return res.render("Profile", {
    user: req.user,
  });
});

router.get("/edit-profile", AuthUser, (req, res) => {
  return res.render("ProfileEdit", {
    user: req.user,
  });
});

router.get("/singin", (req, res) => {
  return res.render("singin");
});

router.get("/singup", (req, res) => {
  return res.render("singup");
});

export default router;
