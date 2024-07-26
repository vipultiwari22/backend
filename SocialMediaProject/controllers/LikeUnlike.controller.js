import likeUnlike from "../models/LikeUnlike.model.js";

export const likeOrUnlike = async (req, res) => {
  const likeId = req.user._id;
  const targetPost = req.params.id;

  const existingLikeUnlike = await likeUnlike.findOne({
    LikedBy: likeId,
    LikeOnPost: targetPost,
  });

  if (existingLikeUnlike) {
    await likeUnlike.deleteOne({ _id: existingLikeUnlike._id });

    return res.redirect(`/`);
  } else {
    const newLike = new likeUnlike({
      LikedBy: likeId,
      LikeOnPost: targetPost,
    });

    await newLike.save();

    return res.redirect(`/`);
  }
};
