import Comments from "../models/comment.model.js";

export const commentContent = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;

    if (!content)
      return res.status(400).json({ message: "fields are required!" });

    const comment = await Comments.create({
      content,
      postId,
      createdby: req.user._id,
    });

    await comment.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
