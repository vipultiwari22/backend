import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("Home", {
    user: req.user,
  });
});

router.get("/singin", (req, res) => {
  return res.render("singin");
});

router.get("/singup", (req, res) => {
  return res.render("singup");
});

export default router;
