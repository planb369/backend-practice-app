import { Request, Response } from "express";
import { getNotesModel } from "../models/noteModel";

// データ一覧の取得
export const getNotes = (req: Request, res: Response) => {
  getNotesModel()
    .then((results) => {
      //jsonで返す
      res.json(results);
    })
    .catch((error) => {
      console.error("データを取得できませんでした: " + error.message);
    });
};
