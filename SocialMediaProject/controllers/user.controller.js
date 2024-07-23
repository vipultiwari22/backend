import { createToken } from "../middleware/Auth.middlware.js";
import User from "../models/User.model.js";

export const Singup = async (req, res) => {
  try {
    const {
      FullName,
      email,
      password,
      role,
      profileImage,
      designation,
      bio,
      phoneNo,
      facebook,
      instagram,
      linkdin,
    } = req.body;

    if (!FullName || !email || !password || !phoneNo)
      return res.status(400).json({ message: "Fileds are required" });

    const existUser = await User.findOne({ email });

    if (existUser)
      return res.status(200).json({ message: "User Alredy Exist!" });

    const newUser = await User.create({
      FullName,
      email,
      password,
      role,
      profileImage,
      designation,
      bio,
      phoneNo,
      facebook,
      instagram,
      linkdin,
    });

    await newUser.save();

    return res.redirect("/");

    // return res.status(200).json({
    //   message: "User created Successfully!",
    //   newUser,
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      message: "Fields are require",
    });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatched = await user.comparePassword(password);

    if (!isMatched)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = createToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    // res.status(200).json({ message: "Login successful", token, user });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export async function logout(req, res) {
  res.clearCookie("token").redirect("/");
}

export const EditProfile = async (req, res) => {
  const {
    FullName,
    email,
    bio,
    instagram,
    facebook,
    linkdin,
    phoneNo,
    designation,
    role,
  } = req.body;

  // if (
  //   !FullName ||
  //   !email ||
  //   !phoneNo ||
  //   !profileImage ||
  //   !bio ||
  //   !linkdin ||
  //   !instagram ||
  //   !designation ||
  //   !facebook
  // )
  //   return res.status(400).json({ message: "Fileds are required" });

  const userId = req.params.id;

  if (!userId) return res.status(400).json({ message: "User not found!" });

  const profileImage = req.file
    ? `/uploads/${req.file.filename}`
    : req.user.profileImage;

  const update = await User.findByIdAndUpdate(
    userId,
    {
      profileImage,
      FullName,
      email,
      bio,
      instagram,
      facebook,
      linkdin,
      phoneNo,
      designation,
      role,
    },
    { new: true }
  );

  req.user = update;

  return res.redirect("/profile");
};
