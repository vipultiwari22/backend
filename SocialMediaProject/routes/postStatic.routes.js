import express from "express";
import { authenticate } from "../middleware/Auth.middlware.js";
import PostArtical from "../models/Post.model.js";

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

export default PostStaticRoute;
