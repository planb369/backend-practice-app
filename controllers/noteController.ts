import { Request, Response } from "express";
import { Note } from "../models/noteModel";

export class NoteController {
  // データ一覧の取得
  static async getNotes(req: Request, res: Response) {
    try {
      //モデルからデータもらう
      const results = await Note.search();
      // JSONでデータを返す
      res.json(results);
    } catch {
      console.error("データを取得できませんでした");
    }
  }
}
