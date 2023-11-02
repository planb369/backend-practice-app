import { Request, Response } from "express";
import { Note } from "../models/noteModel";

export class NoteController {
  // データ一覧の取得
  async getNotes(req: Request, res: Response) {
    try {
      // モデルからデータを取得
      const results = await Note.search();
      // JSONでデータを返す
      res.json(results);
    } catch (error) {
      console.error("データを取得できませんでした");
    }
  }
}
