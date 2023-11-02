import "dotenv/config";
import express, { Request, Response } from "express";
import * as mysql from "mysql"; // MySQLの型定義をインポート

const app = express();
const port = 3000;

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const db = mysql.createConnection({
  host: dbHost,
  port: Number(dbPort),
  user: dbUser,
  password: dbPassword,
  database: dbName,
});

// DB接続
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.message);
  } else {
    console.log("Connected to database");
  }
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
