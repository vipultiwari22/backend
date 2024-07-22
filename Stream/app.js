import express from "express";
import fs from "fs";
import status from "express-status-monitor";
import zlib from "zlib";

const app = express();
const PORT = 9000;

app.use(status());
app.get("/", (req, res) => {
  const stream = fs.createReadStream("./sample.txt", "utf-8");
  const writeSteam = zlib.createGzip();
  const strams = fs.createWriteStream("./sample.txt.gz");

  stream.on("open", () => {
    stream.pipe(res);
  });

  writeSteam.on("finish", () => {
    res.send(strams);
  });

  writeSteam.on("error", () => {
    res.status(500).send("Error to Creating Zip File");
  });

  stream.on("error", (err) => {
    res.status(500).send("Error reading file");
  });
});

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
