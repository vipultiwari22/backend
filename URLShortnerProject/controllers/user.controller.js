import User from "../model/user.model.js";
import { v4 } from "uuid";
import { setUser } from "../utils/authSession.util.js";

export async function createUser(req, res) {
  const { Name, email, password } = req.body;

  if (!Name || !email || !password) {
    return res.status(400).json({ error: "Fields are required!" });
  }

  await User.create({
    Name,
    email,
    password,
  });
  return res.redirect("/");
}

export async function LoginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Fields are required!" });
  }

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.render("login", {
      error: "invalid Username or password",
    });
  }
  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
}

export async function getAllUser(req, res) {
  const result = await User.find({});
  return res.status(200).json({
    message: "success",
    result,
  });
}
