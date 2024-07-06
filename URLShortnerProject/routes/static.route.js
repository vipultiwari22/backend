import express from "express";
import URL from "../model/url.model.js";
import { restrictTo } from "../middleware/auth.middleware.js";

const routes = express.Router();

routes.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  try {
    const allurls = await URL.find({});

    res.render("Home", {
      urls: allurls,
    });
  } catch (error) {
    return error.message;
  }
});

routes.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  try {
    const allurls = await URL.find({ createdBy: req.user._id });

    res.render("Home", {
      urls: allurls,
    });
  } catch (error) {
    return error.message;
  }
});

routes.get("/singup", (req, res) => {
  return res.render("Singup");
});

routes.get("/login", (req, res) => {
  return res.render("login");
});

export default routes;
