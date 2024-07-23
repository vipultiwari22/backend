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
  try {
    const { id } = req.params;
    const { fullName, email, phoneNo, facebook, instagram, linkedin, bio } =
      req.body;

    const profileImage = req.file ? req.file.path : req.user.profileImage;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        fullName,
        email,
        phoneNo,
        socialLinks: {
          facebook,
          instagram,
          linkedin,
        },
        bio,
        profileImage,
      },
      { new: true }
    );

    req.user = updatedUser;

    return res.redirect("/Profile");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
