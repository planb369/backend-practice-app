import { Request, Response } from "express";
import { Note } from "../models/noteModel";
import { NotFoundError } from "../errors/NotFoundError";
import { HTTP_STATUS } from "../httpStatus";

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
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          error: "データを取得できませんでした",
          details: err.message,
        });
      }
    }
  }

  //詳細情報の取得
  async getNoteDetails(req: Request, res: Response) {
    //クエリパラメータから取得
    const idParam = req.params.id;
    // idParamをIntに変換
    const id = parseInt(idParam);

    //クエリパラメータが数値でない場合のエラーハンドリング
    if (isNaN(id) || id <= 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "400 Bad Request",
        details: "idが不正な値です",
      });
    }

    try {
      const result = await Note.find(id);

      if (!result) {
        //対象のデータがない場合NotFoundErrorをthrow
        throw new NotFoundError(`${id}番のデータは存在しません`);
      }

      return res.json(result);
    } catch (err) {
      if (err instanceof NotFoundError) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          error: "404 Not Found",
          details: err.message,
        });
      }
      if (err instanceof Error) {
        console.error("データを取得できませんでした:", err.message);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          error: "500 Internal Server Error",
          details: err.message,
        });
      }
    }
  }
}
