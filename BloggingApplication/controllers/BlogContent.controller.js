import BLOG from "../models/BlogContent.model.js";

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

    return res.redirect(`/blog/${Blog._id}`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getAllBlog = async (req, res) => {
  const blog = await BLOG.find({});
  return res.status(200).json({ message: "All Blogs" + blog });
};
