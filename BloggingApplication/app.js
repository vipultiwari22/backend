import express from "express";
import dotenv from "dotenv";
import path from "path";
import router from "./routes/UserStatic.routes.js";
import userRouter from "./routes/user.routes.js";
import { connectToDB } from "./config/DB.js";
import cookieParser from "cookie-parser";
import checkCookieForAuthentication, {
  AuthUser,
} from "./middleware/authentication.middleware.js";
import BlogRouter from "./routes/BlogStatic.routes.js";
import BlogRoute from "./routes/Blog.routes.js";
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
app.use(express.static(path.resolve("./public")));

// Routes

app.use("/", router);
app.use("/register", userRouter);
app.use("/Blog", AuthUser, BlogRouter);
app.use("/BlogRoute", AuthUser, BlogRoute);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
