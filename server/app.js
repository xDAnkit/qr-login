import express from "express";
import "dotenv/config";

import { initDB } from "./services/database/database.service.js";
import usersRouter from "./src/account/users/users.routes.js";
import { APP_PORT } from "./config.js";
const app = express();

// Connect with MongoDD using Mongoose
initDB();

app.use(express.json());
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Profiler" });
});

app.listen(APP_PORT, () => {
  console.log(`The server is running at http://localhost:${APP_PORT}`);
});
