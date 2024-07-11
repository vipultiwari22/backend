import BLOG from "../models/BlogContent.model.js";

export async function newBlogCreate(req, res) {
  // const { title, body, coverImage } = req.body;

  // if (!title || !body) {
  //   return res.status(400).json({ message: "Fields are required!" });
  // }

  // const Blog = await BLOG.create({});
  console.log(req.body);
  res.redirect("/");
}
