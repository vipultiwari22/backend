import User from "../models/user.model.js";
export async function createuser(req, res) {
  const { fullName, email, password, profileImage } = req.body;

  if (!fullName || !email || password) {
    return "All fields are Mandatory!";
  }

  const result = await User.create({
    fullName,
    email,
    password,
  });

  return res.redirect("/");
}
