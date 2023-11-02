import { Request, Response } from "express";
import { Note } from "../models/noteModel";

export class NoteController {
  // データ一覧の取得
  async getNotes(req: Request, res: Response) {
    try {
      // モデルからデータを取得
      const results = await Note.search();
      // JSONでデータを返す
      return res.json(results);
    } catch (err: any) {
      console.error("データを取得できませんでした:", err.message);
      return res.status(500).json({
        error: "データを取得できませんでした",
        details: err.message,
      });
    }
  }
}
