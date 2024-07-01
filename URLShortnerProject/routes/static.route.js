import express from "express";
import URL from "../model/url.model.js";

const routes = express.Router();

routes.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("Home", {
    urls: allUrls,
  });
});

export default routes;
