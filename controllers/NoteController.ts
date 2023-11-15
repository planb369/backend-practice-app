import { Request, Response } from "express";
import { NoteModel } from "../models/NoteModel";
import { HTTP_STATUS_CODES } from "../httpStatus/HTTP_STATUS_CODES";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";
import { handleErrors } from "../errors/handleErrors";

export class NoteController {
  // データ一覧の取得
  async getNotes(req: Request, res: Response) {
    try {
      // クエリパラメータから取得する
      const limitStr = req.query.limit as string;
      const offsetStr = req.query.offset as string;

      // 数値にする
      let limit = limitStr ? parseInt(limitStr) : 50;
      const offset = offsetStr ? parseInt(offsetStr) : 0;

      if (isNaN(limit) || isNaN(offset) || limit < 0 || offset < 0) {
        throw new BadRequestError("クエリパラメータの値が不正です");
      }
      if (limit > 50) limit = 50;

      // モデルからデータを取得
      const results = await NoteModel.search(limit, offset);
      //totalを取得
      const total = await NoteModel.getTotalCount();

      // レスポンスデータを整形
      const allNoteData = {
        items: results,
        total: total,
      };

      return res.status(HTTP_STATUS_CODES.OK).json(allNoteData);
    } catch (err) {
      if (err instanceof Error) {
        handleErrors(err, res);
      }
    }
  }

  //詳細情報の取得
  async getNoteDetails(req: Request, res: Response) {
    //クエリパラメータから取得
    const idParam = req.params.id;
    // idParamをIntに変換
    const id = parseInt(idParam);

    try {
      //クエリパラメータが数値でない場合のエラーハンドリング
      if (isNaN(id) || id <= 0) {
        throw new BadRequestError("URLが不正です");
      }

      const result = await NoteModel.find(id);

      //対象のデータがない場合NotFoundErrorをthrow
      if (!result) {
        throw new NotFoundError(`${id}番のデータは存在しません`);
      }

      return res.status(HTTP_STATUS_CODES.OK).json(result);
    } catch (err) {
      if (err instanceof Error) {
        handleErrors(err, res);
      }
    }
  }

  //データ投稿
  async postNote(req: Request, res: Response) {
    try {
      const result = await NoteModel.postNote(req.body.title, req.body.content);
      return res.status(HTTP_STATUS_CODES.CREATED).json(result);
    } catch (err) {
      if (err instanceof Error) {
        handleErrors(err, res);
      }
    }
  }
}
