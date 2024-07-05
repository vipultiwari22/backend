import { nanoid } from "nanoid";
import URL from "../model/url.model.js";

export async function HandleGenrateNewShrotURL(req, res) {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const shortID = nanoid(8);

  await URL.create({
    shortID: shortID,
    redirectURL: url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("Home", {
    id: shortID,
  });
}

export async function analyitics(req, res) {
  const shortID = req.params.shortID;
  const result = await URL.findOne({ shortID });
  return res.json({
    totalClicks: result.visitHistory.length,
    analyitics: result.visitHistory,
  });
}
