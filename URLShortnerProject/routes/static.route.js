import express from "express";
import URL from "../model/url.model.js";

const routes = express.Router();

routes.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("Home", {
    urls: allUrls,
  });
});

routes.get("/singup", (req, res) => {
  return res.render("Singup");
});

routes.get("/login", (req, res) => {
  return res.render("login");
});

export default routes;
