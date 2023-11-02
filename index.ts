import "dotenv/config";
import express, { Request, Response } from "express";
import * as mysql from "mysql"; // MySQLの型定義をインポート
import axios from "axios";

const app = express();
app.set("view engine", "ejs");
const port = 3001;

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

// APIのエンドポイントを追加
app.get("/api/notes", (req, res) => {
  db.query("SELECT * FROM notes", (error, results) => {
    if (error) {
      console.error("Error querying the database: " + error.message);
      res.status(500).json({
        error: "An error occurred while fetching data from the database.",
      });
    } else {
      res.json(results);
    }
  });
});

//indexへ一覧データを渡す
app.get("/", (req, res) => {
  axios
    .get("http://localhost:3001/api/notes")
    .then((response) => {
      const notes = response.data;
      res.render("index", { notes });
    })
    .catch((err) => {
      console.log("エラーです", err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
