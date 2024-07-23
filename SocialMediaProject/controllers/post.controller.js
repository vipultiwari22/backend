import PostArtical from "../models/Post.model.js";

export const CreatePost = async (req, res) => {
  const { postBio } = req.body;

  if (!postBio) return res.status(400).json({ message: "fields are require" });

  try {
    const postImage = req.file ? req.file.path : req.user.postImage;

    if (!postImage)
      return res.status(400).json({ message: "Post image is required" });

    const post = await PostArtical.create({
      postBio,
      postImage,
      createdBy: req.user._id,
    });

    await post.save();

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
