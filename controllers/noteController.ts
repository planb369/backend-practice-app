import { Request, Response } from "express";
import db from "../models/noteModel";

// データ一覧の取得
export const getNotes = (req: Request, res: Response) => {
  db.query("SELECT * FROM notes", (error, results) => {
    if (error) {
      console.error("データを取得できませんでした: " + error.message);
    } else {
      res.json(results);
    }
  });
};
