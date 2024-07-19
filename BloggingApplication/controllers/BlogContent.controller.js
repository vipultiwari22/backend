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
    if (!blog) return res.status(400).json({ message: "Blog Not Found!" });
    return res.render("view-Blog", {
      blog,
      user: req.user,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Server Error", error });
  }
};

export const DeleteBlog = async (req, res) => {
  try {
    const BlogId = req.params.id;
    const del = await BLOG.findByIdAndDelete(BlogId);
    if (!del) return res.status(400).json({ message: "Blog Not Found!" });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

export const getAllBlog = async (req, res) => {
  const blog = await BLOG.find({});
  return res.status(200).json({ message: "All Blogs" + blog });
};
