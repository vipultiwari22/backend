import express from "express";
import dotenv from "dotenv";
import path from "path";
import router from "./routes/static.routes.js";
import userRouter from "./routes/user.routes.js";
import { connectToDB } from "./config/DB.js";
import cookieParser from "cookie-parser";
import checkCookieForAuthentication from "./middleware/authentication.middleware.js";
dotenv.config();

// DB connection
connectToDB();

const app = express();
const PORT = process.env.port;

// views

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// encoded
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(checkCookieForAuthentication("token"));

// Routes

app.use("/", router);
app.use("/register", userRouter);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
