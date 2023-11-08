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
    } catch (err) {
      if (err instanceof Error) {
        console.error("データを取得できませんでした:", err.message);
        return res.status(500).json({
          error: "データを取得できませんでした",
          details: err.message,
        });
      }
    }
  }

  //詳細情報の取得
  async getNoteDetails(req: Request, res: Response, idParam: string) {
    try {
      // idParamをIntに変換
      const id = parseInt(idParam);

      const result = await Note.find(id);
      return res.json(result);
    } catch (err) {
      if (err instanceof Error) {
        console.error("データを取得できませんでした:", err.message);
        return res.status(500).json({
          error: "データを取得できませんでした",
          details: err.message,
        });
      }
    }
  }
}
