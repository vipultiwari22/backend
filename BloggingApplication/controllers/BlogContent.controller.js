import BLOG from "../models/BlogContent.model.js";
import Comment from "../models/comment.model.js";

export async function newBlogCreate(req, res) {
  const { title, body, coverImage } = req.body;

  if (!title || !body) {
    return res.status(400).json({ message: "Fields are required!" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Cover image is required!" });
  }
  try {
    const Blog = await BLOG.create({
      title,
      body,
      createdBy: req.user._id,
      coverImage: `./uploads/${req.file.filename}`,
    });

    return res.redirect(`/`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const EditBlog = async (req, res) => {
  try {
    const userId = req.params.id;

    const { body, title } = req.body;

    const coverImage = req.file
      ? `/uploads/${req.file.filename}`
      : req.user.coverImage;

    const updatedBlog = await BLOG.findByIdAndUpdate(
      userId,
      {
        body,
        title,
        coverImage,
      },
      { new: true }
    );

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const ViewBlog = async (req, res) => {
  try {
    const BlogId = req.params.id;
    const blog = await BLOG.findById(BlogId).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.id }).populate(
      "createdBy"
    );

    if (!blog) return res.status(400).json({ message: "Blog Not Found!" });

    return res.render("view-Blog", {
      blog,
      user: req.user,
      comments,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Server Error", error });
  }
};

export const DeleteBlog = async (req, res) => {
  try {
    const BlogId = req.params.id;
    const userId = req.user._id; // Assuming `req.user` is set by authentication middleware

    // Find the blog by ID
    const blog = await BLOG.findById(BlogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog Not Found!" });
    }

    // Check if the blog belongs to the logged-in user
    if (blog.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this blog!" });
    }

    // Delete the blog
    await BLOG.findByIdAndDelete(BlogId);

    return res.status(200).json({ message: "Blog deleted successfully!" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const commentByUser = async (req, res) => {
  try {
    const { content } = req.body;
    const blogId = req.params.id;

    if (!content) {
      return res.status(400).json({ message: "Content field is required!" });
    }

    const comment = await Comment.create({
      content,
      blogId,
      createdBy: req.user._id,
    });

    return res.redirect(`/BlogRoute/view-Blog/${blogId}`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllBlog = async (req, res) => {
  const blog = await BLOG.find({});
  return res.status(200).json({ message: "All Blogs" + blog });
};
