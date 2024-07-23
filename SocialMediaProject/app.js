import express from "express";
import connectToDataBase from "./config/DB.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import router from "./routes/user.routes.js";
import StaticRoute from "./routes/userStatic.route.js";
import { v2 as cloudinary } from "cloudinary";
import {
  authenticate,
  authorize,
  checkCookieForSettingUserGlobally,
} from "./middleware/Auth.middlware.js";
import POSTRoute from "./routes/post.routes.js";
dotenv.config();

connectToDataBase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLUOD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT;

//ejs for frontend
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cookieParser());
app.use(checkCookieForSettingUserGlobally("token"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.resolve("./public")));
app.use("/uploads", express.static(path.join("./public", "uploads")));

// routes

app.use("/api/v1/user", router);
app.use("/", StaticRoute);
app.use("/post", authenticate, POSTRoute);

app.listen(PORT, () => console.log(`Server is Running At PORT ${PORT}`));
