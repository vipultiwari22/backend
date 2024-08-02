import Notification from "../models/Notification.model.js";
import PostArtical from "../models/Post.model.js";

export const commentOnPost = async (req, res) => {
	const { postId, content } = req.body; // Assuming you're sending the post ID and comment content
	const currentUserId = req.user._id;

	const post = await PostArtical.findById(postId).populate("createdBy");

	if (post) {
		// Save the comment in your database
		const newComment = await Comments.create({
			createdby: currentUserId,
			content,
			postId,
		});

		// Trigger notification
		const triger = await Notification.create({
			user: post.createdBy._id, // User receiving the notification
			type: "comment",
			targetUser: currentUserId,
			targetPost: postId,
			targetComment: newComment._id,
		});
		if (!triger)
			return res
				.status(400)
				.json({ message: "notification not save into db and sent " });

		res.redirect(`/view-post/${postId}`);
	} else {
		res.status(404).json({ message: "Post not found" });
	}
};
