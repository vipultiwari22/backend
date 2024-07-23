import express from "express";
import { authenticate } from "../middleware/Auth.middlware.js";
import User from "../models/User.model.js";
import PostArtical from "../models/Post.model.js";

const StaticRoute = express.Router();

StaticRoute.get("/", async (req, res) => {
  const AllPost = await PostArtical.find({})
    .populate({
      path: "createdBy",
      select: "FullName profileImage email", // Specify fields you want from the User
    })
    .select("postBio postImage") // Specify fields you want from the PostArtical
    .exec();

  if (!AllPost || AllPost.length === 0) {
    return res.status(400).json({ message: "Post is Not Available!" });
  }

  res.render("Home", {
    user: req.user,
    AllPost,
  });
});

StaticRoute.get("/Singup", (req, res) => {
  res.render("Singup", {
    user: req.user,
  });
});

StaticRoute.get("/login", (req, res) => {
  res.render("login", {
    user: req.user,
  });
});

StaticRoute.get("/Profile", authenticate, async (req, res) => {
  const email = req.user.email;

  const userData = await User.findOne({ email });

  if (!userData) return res.status(400).json({ message: "User not found" });

  res.render("Profile", {
    user: req.user,
    userData,
  });
});

StaticRoute.get("/edit-profile", authenticate, async (req, res) => {
  const email = req.user.email;

  const userData = await User.findOne({ email });

  if (!userData) return res.status(400).json({ message: "User not found" });

  res.render("Edit-Profile", {
    user: req.user,
    userData,
  });
});

export default StaticRoute;
