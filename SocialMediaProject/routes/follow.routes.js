import express from "express";
import { toggleFollowUser } from "../controllers/Follow.controller.js";
import { likeOrUnlike } from "../controllers/LikeUnlike.controller.js";

const followRoutes = express.Router();

followRoutes.post("/:id", toggleFollowUser);
followRoutes.post("/like/:id", likeOrUnlike);

export default followRoutes;
