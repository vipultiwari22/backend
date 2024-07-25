import express from "express";
import { toggleFollowUser } from "../controllers/Follow.controller.js";

const followRoutes = express.Router();

followRoutes.post("/:id", toggleFollowUser);

export default followRoutes;
