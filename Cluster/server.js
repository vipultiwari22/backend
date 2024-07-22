import express from "express";
import cluster from "cluster";
import os from "os";

const Totalcpus = os.cpus().length;
if (cluster.isPrimary) {
  for (let index = 0; index < Totalcpus; index++) {
    cluster.fork();
  }
} else {
  const app = express();
  const PORT = 3000;
  app.get("/", (req, res) => {
    return res.json({
      message: `Hello from Server ${process.pid} 🚀`,
    });
  });
  app.listen(PORT, () => console.log(`Server started At Port ${PORT}`));
}
