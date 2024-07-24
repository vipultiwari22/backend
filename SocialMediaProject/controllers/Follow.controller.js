import Follow from "../models/Follow.model";

export const toggleFollowUser = async (req, res) => {
  const userId = req.user._id; // Assuming the authenticated user's ID is in req.user
  const targetUserId = req.params.id; // The user to follow/unfollow

  try {
    // Check if the follow relationship already exists
    const existingFollow = await Follow.findOne({
      followedBy: userId,
      following: targetUserId,
    });

    if (existingFollow) {
      // Unfollow the user if the relationship exists
      await Follow.deleteOne({ _id: existingFollow._id });
      return res.status(200).json({ message: "User unfollowed successfully." });
    } else {
      // Follow the user if the relationship does not exist
      const newFollow = new Follow({
        followedBy: userId,
        following: targetUserId,
      });

      await newFollow.save();
      return res.status(200).json({ message: "User followed successfully." });
    }
  } catch (error) {
    console.error("Error toggling follow/unfollow:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
