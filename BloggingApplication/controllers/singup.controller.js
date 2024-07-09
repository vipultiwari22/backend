import User from "../models/user.model.js";

export async function createuser(req, res, next) {
  try {
    const { fullName, email, password, profileImage } = req.body;

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

  if (!email || !password) return "All fields are Mendatory!";

  const user = User.matchPassword(email, password);

  if (user) {
    res.cookie("message", "Login successful!", { httpOnly: true });
    // Set user session or token here if using session or JWT
    return res.redirect("/");
  }
}

export async function getAllUser(req, res) {
  const users = await User.find({}, "-password");

  if (!users) return "User not found!";

  return res.status(200).json({
    users,
  });
}
