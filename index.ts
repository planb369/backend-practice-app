import express from "express";
import dotenv from "dotenv";
import routes from "./routes/router";

dotenv.config();

const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use("/", routes);
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
