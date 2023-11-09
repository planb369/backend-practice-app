import { Request, Response } from "express";
import { NoteModel } from "../models/NoteModel";
import { HTTP_STATUS_CODES } from "../httpStatus/HTTP_STATUS_CODES";
import { HTTP_STATUS_MESSAGE } from "../httpStatus/HTTP_STATUS_MESSAGE";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";
import { MethodNotAllowedError } from "../errors/MethodNotAllowedError";

export class NoteController {
  // データ一覧の取得
  async getNotes(req: Request, res: Response) {
    try {
      //getメソッドでないなら405エラーをスロー
      if (req.method !== "GET") {
        throw new MethodNotAllowedError("許可されていないHTTPメソッドです");
      }

      //クエリパラメータから取得する
      //limit取得件数 デフォルト50個
      let limit = parseInt(req.query.limit as string) || 50;
      //offset開始ページ デフォルト0
      let offset = parseInt(req.query.offset as string) || 0;

      //limitとoffsetの値でエラーハンドリング
      if (limit < 0 || offset < 0) {
        throw new BadRequestError("クエリパラメータの値が不正です");
      }
      console.log(limit);
      console.log(typeof limit);

      // モデルからデータを取得
      const results = await NoteModel.search();

      //limitとoffsetでデータを絞り込み
      const slicedResults = results.slice(offset, offset + limit);

      // レスポンスデータを整形
      const allNoteData = {
        items: slicedResults,
        total: slicedResults.length,
      };

      console.log(limit);
      console.log(offset);

      return res.status(HTTP_STATUS_CODES.OK).json(allNoteData);
    } catch (err) {
      if (err instanceof MethodNotAllowedError) {
        console.error(`${HTTP_STATUS_MESSAGE[405]} : `, err.message);
        return res.status(HTTP_STATUS_CODES.METHOD_NOT_ALLOWED).json({
          error: HTTP_STATUS_MESSAGE[405],
          details: err.message,
        });
      }
      if (err instanceof BadRequestError) {
        console.error(`${HTTP_STATUS_MESSAGE[400]} : `, err.message);
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
          error: HTTP_STATUS_MESSAGE[400],
          details: err.message,
        });
      }
      if (err instanceof Error) {
        console.error(`${HTTP_STATUS_MESSAGE[500]} : `, err.message);
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
          error: HTTP_STATUS_MESSAGE[500],
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

    try {
      //クエリパラメータが数値でない場合のエラーハンドリング
      if (isNaN(id) || id <= 0) {
        throw new BadRequestError("URLが不正です");
      }
      //getメソッドでないなら405エラーをスロー
      if (req.method !== "GET") {
        throw new MethodNotAllowedError("許可されていないHTTPメソッドです");
      }

      const result = await NoteModel.find(id);

      if (!result) {
        //対象のデータがない場合NotFoundErrorをthrow
        throw new NotFoundError(`${id}番のデータは存在しません`);
      }

      return res.status(HTTP_STATUS_CODES.OK).json(result);
    } catch (err) {
      if (err instanceof BadRequestError) {
        console.error(`${HTTP_STATUS_MESSAGE[400]} : `, err.message);
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
          error: HTTP_STATUS_MESSAGE[400],
          details: err.message,
        });
      }
      if (err instanceof MethodNotAllowedError) {
        console.error(`${HTTP_STATUS_MESSAGE[405]} : `, err.message);
        return res.status(HTTP_STATUS_CODES.METHOD_NOT_ALLOWED).json({
          error: HTTP_STATUS_MESSAGE[405],
          details: err.message,
        });
      }
      if (err instanceof NotFoundError) {
        console.error(`${HTTP_STATUS_MESSAGE[404]} : `, err.message);
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
          error: HTTP_STATUS_MESSAGE[404],
          details: err.message,
        });
      }
      if (err instanceof Error) {
        console.error(`${HTTP_STATUS_MESSAGE[500]} : `, err.message);
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
          error: HTTP_STATUS_MESSAGE[500],
          details: err.message,
        });
      }
    }
  }
}
