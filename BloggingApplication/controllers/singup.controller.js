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
    // Await the promise returned by the static method
    const token = await User.matchPasswordAndGenrateToken(email, password);
    // Send the token as a response (or handle it according to your needs)
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    // Handle errors and send proper response
    return res.render("singin", {
      error: "Incorrect Email or Password",
    });
  }
}

export async function getAllUser(req, res) {
  const users = await User.find({}, "-password");

  if (!users) return "User not found!";

  return res.status(200).json({
    users,
  });
}
