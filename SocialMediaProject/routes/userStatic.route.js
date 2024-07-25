import express from "express";
import { authenticate } from "../middleware/Auth.middlware.js";
import User from "../models/User.model.js";
import PostArtical from "../models/Post.model.js";
import Follow from "../models/Follow.model.js";

const StaticRoute = express.Router();

StaticRoute.get("/", async (req, res) => {
  try {
    const AllUsers = await User.find(); // Fetch all users (if needed for suggestions or other parts of the page)

    if (!AllUsers) return res.status(400).json({ message: "User Not Found!" });

    const AllPost = await PostArtical.find({})
      .populate({
        path: "createdBy",
        select: "FullName profileImage email bio", // Ensure 'bio' is included here
      })
      .select("postBio postImage") // Specify fields you want from the PostArtical
      .exec();

    if (!AllPost || AllPost.length === 0) {
      return res.status(400).json({ message: "Post is Not Available!" });
    }

    res.render("Home", {
      user: req.user, // req.user should already contain the bio if it’s populated correctly
      AllUsers,
      AllPost,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server Error" });
  }
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

StaticRoute.get("/profile/:id", authenticate, async (req, res) => {
  try {
    const userId = req.params.id;

    const userData = await User.findById(userId).select(
      "FullName profileImage bio email designation socialLinks"
    );

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Assuming you want to check if the logged-in user follows this user
    const isFollowing = await Follow.findOne({
      FollwedBy: req.user._id,
      following: userId,
    }).populate("FollwedBy following");

    res.render("Profile", {
      user: req.user, // The logged-in user
      userData, // The profile data of the user being viewed
      isFollowing: Boolean(isFollowing), // Whether the logged-in user follows this user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

StaticRoute.get("/edit-profile/:id", authenticate, async (req, res) => {
  const loggedInUserId = req.user._id; // The logged-in user's ID from the middleware
  const profileUserId = req.params.id;

  // Check if the logged-in user is the same as the profile user

  if (loggedInUserId.toString() !== profileUserId) {
    return res
      .status(403)
      .send("Access denied. You can only edit your own profile.");
  }

  const userData = await User.findById(profileUserId);

  if (!userData) return res.status(400).json({ message: "User not found" });

  res.render("Edit-Profile", {
    user: req.user,
    userData,
  });
});

export default StaticRoute;
