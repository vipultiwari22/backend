import dotenv from "dotenv";
import path from "path";
import express from "express";
import { connectDB } from "./Config/connectDB.js";
import urlRouter from "./routes/url.route.js"; // Ensure the correct path
import URL from "./model/url.model.js";
import StaticRoute from "./routes/static.route.js";

dotenv.config();

const app = express();
const PORT = 8001;

connectDB();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRouter);
app.use("/", StaticRoute);

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

app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
