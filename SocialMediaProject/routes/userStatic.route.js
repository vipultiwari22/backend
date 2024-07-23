import express from "express";
import { authenticate } from "../middleware/Auth.middlware.js";
import User from "../models/User.model.js";

const StaticRoute = express.Router();

StaticRoute.get("/", (req, res) => {
  res.render("Home", {
    user: req.user,
  });
});

StaticRoute.get("/Singup", (req, res) => {
  res.render("Singup", {
    user: req.user,
  });
});

StaticRoute.get("/login", (req, res) => {
  res.render("login", {
    user: req.user,
  });
});

StaticRoute.get("/Profile", authenticate, async (req, res) => {
  const email = req.user.email;

  const userData = await User.findOne({ email });

  if (!userData) return res.status(400).json({ message: "User not found" });

  res.render("Profile", {
    user: req.user,
    userData,
  });
});

StaticRoute.get("/edit-profile", authenticate, async (req, res) => {
  const email = req.user.email;

  const userData = await User.findOne({ email });

  if (!userData) return res.status(400).json({ message: "User not found" });

  res.render("Edit-Profile", {
    user: req.user,
    userData,
  });
});

export default StaticRoute;
