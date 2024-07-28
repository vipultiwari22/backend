import Notification from "../models/Notification.model.js";

const getNotifications = async (req, res) => {
  const userId = req.user._id;

  const notifications = await Notification.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("targetUser", "FullName profileImage")
    .populate("targetPost", "postBio postImage")
    .populate("targetComment", "content");

  res.json(notifications);
};
