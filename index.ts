import express from "express";
import dotenv from "dotenv";
import routes from "./routes/router";

dotenv.config();

const app = express();
const port = 3000;

app.use("/", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
