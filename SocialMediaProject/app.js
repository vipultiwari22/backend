import express from "express";
import connectToDataBase from "./config/DB.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import router from "./routes/user.routes.js";
import StaticRoute from "./routes/userStatic.route.js";
import {
  authenticate,
  authorize,
  checkCookieForSettingUserGlobally,
} from "./middleware/Auth.middlware.js";
dotenv.config();

connectToDataBase();

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

app.listen(PORT, () => console.log(`Server is Running At PORT ${PORT}`));
