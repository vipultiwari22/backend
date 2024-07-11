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

export async function getAllUser(req, res) {
  const users = await User.find({}, "-password");

  if (!users) return "User not found!";

  return res.status(200).json({
    users,
  });
}
