import Follow from "../models/Follow.model.js";

// Controller to handle follow/unfollow toggle
export const toggleFollowUser = async (req, res) => {
  const userId = req.user._id; // Authenticated user's ID
  const targetUserId = req.params.id; // The ID of the user to follow/unfollow

  try {
    // Check if the follow relationship already exists
    const existingFollow = await Follow.findOne({
      FollwedBy: userId,
      following: targetUserId,
    });

    if (existingFollow) {
      // If relationship exists, unfollow
      await Follow.deleteOne({ _id: existingFollow._id });

      return res.redirect(`/Profile/${targetUserId}`);
    } else {
      // If no relationship, follow
      const newFollow = new Follow({
        FollwedBy: userId,
        following: targetUserId,
      });

      await newFollow.save();

      return res.redirect(`/Profile/${targetUserId}`);
    }
  } catch (error) {
    console.error("Error toggling follow/unfollow:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};


