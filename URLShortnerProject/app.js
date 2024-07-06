// Import all importent file and Moudules

import dotenv from "dotenv";
import path from "path";
import express from "express";
import { connectDB } from "./Config/connectDB.js";
import urlRouter from "./routes/url.route.js"; // Ensure the correct path
import URL from "./model/url.model.js";
import StaticRoute from "./routes/static.route.js";
import UserRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import {
  CheckForAuthentication,
  restrictTo,
} from "./middleware/auth.middleware.js";
// use Dotenv and execute

dotenv.config();

// PORT and express instance

const app = express();
const PORT = 8001;

// connection Establish with DB

connectDB();

// setup EJS

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// use json and form data Parser
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(CheckForAuthentication);

// Urls for the APIs

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRouter);
app.use("/", StaticRoute);
app.use("/user", UserRouter);

// redirect to the url Function

app.get("/urls/:shortId", async (req, res) => {
  const shortID = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortID,
    },
    {
      $push: {
        visitHistory: {
          timestamps: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

// listing to the port to run server
app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
