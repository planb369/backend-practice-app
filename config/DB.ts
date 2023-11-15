import * as mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const DB = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

DB.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.message);
  } else {
    console.log("Connected to database");
  }
});

export default DB;
