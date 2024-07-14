import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export async function createuser(req, res, next) {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return "All fields are Mandatory!";
    }

    await User.create({
      fullName,
      email,
      password,
    });

    return res.redirect("/");
  } catch (error) {
    console.log(error.message);
    res.end(error.message);
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are mandatory!" });
  }

  try {
    const token = await User.matchPasswordAndGenrateToken(email, password);

    res.cookie("token", token, { httpOnly: true });

    return res.redirect("/");
  } catch (error) {
    console.error(error.message);

    return res.status(401).render("singin", {
      error: "Incorrect Email or Password",
    });
  }
}

export async function logout(req, res) {
  res.clearCookie("token").redirect("/");
}

export const EditUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const { fullName, email, role, recent, mostViewed } = req.body;

    const profileImage = req.file
      ? `/uploads/${req.file.filename}`
      : req.user.profileImage;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        email,
        role,
        recent,
        mostViewed,
        profileImage,
      },
      { new: true }
    );

    req.user = updatedUser;

    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
