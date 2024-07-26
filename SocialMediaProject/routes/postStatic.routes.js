import express from "express";
import { authenticate } from "../middleware/Auth.middlware.js";
import PostArtical from "../models/Post.model.js";
import Comments from "../models/comment.model.js";
import mongoose from "mongoose";

const PostStaticRoute = express.Router();

PostStaticRoute.get("/editpost/:id", authenticate, async (req, res) => {
  try {
    // Fetch the post by its ID
    const post = await PostArtical.findById(req.params.id)
      .populate({
        path: "createdBy",
        select: "FullName profileImage email", // Specify fields you want from the User
      })
      .select("postBio postImage") // Specify fields you want from the PostArtical
      .exec();

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    // Render the EditPost page with the fetched post and user details
    res.render("EditPost", {
      user: req.user,
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
});

PostStaticRoute.get("/view-post/:id", authenticate, async (req, res) => {
  try {
    const postId = req.params.id;

    // Ensure postId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid Post ID" });
    }

    // Fetch the specific post by ID
    const post = await PostArtical.findById(postId).populate(
      "createdBy",
      "FullName profileImage email"
    );

    // Fetch comments related to the specific post
    const comments = await Comments.find({ postId }).populate(
      "createdby",
      "FullName profileImage"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.render("viewPost", {
      user: req.user,
      post,
      comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default PostStaticRoute;
