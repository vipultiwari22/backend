import express from "express";
import { authenticate } from "../middleware/Auth.middlware.js";

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

StaticRoute.get("/Profile", authenticate, (req, res) => {
  res.render("Profile", {
    user: req.user,
  });
});

export default StaticRoute;
