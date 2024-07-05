import express from "express";
import URL from "../model/url.model.js";

const routes = express.Router();

routes.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  try {
    const allurls = await URL.find({ createdBy: req.user._id });

    res.render("Home", {
      urls: allurls,
    });
  } catch (error) {
    return error;
  }
});

routes.get("/singup", (req, res) => {
  return res.render("Singup");
});

routes.get("/login", (req, res) => {
  return res.render("login");
});

export default routes;
