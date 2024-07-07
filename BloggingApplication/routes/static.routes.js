import express from "express";

const router = express.Router();

router.get("/signin", (req, res) => {
  return res.render("singnin");
});

router.get("/singup", (req, res) => {
  return res.render("singup");
});

export default router;
