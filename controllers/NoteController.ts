import { Request, Response } from "express";
import { NoteModel } from "../models/NoteModel";
import { HTTP_STATUS_CODES } from "../httpStatus/HTTP_STATUS_CODES";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";
import { handleErrors } from "../errors/handleErrors";
import { htmlEscape } from "../utilities/htmlEscape";
import { validationId } from "../utilities/validation/validationId";
import { validationInputDatas } from "../utilities/validation/validationInputDatas";

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
      const results = await NoteModel.searchNotes(limit, offset);
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
    const id = req.params.id;

    try {
      if (!validationId(id)) {
        throw new BadRequestError("idの値が不正です");
      }

      const result = await NoteModel.findNote(id);
      if (!result) {
        throw new NotFoundError(`idが${id}のデータは存在しません`);
      }

      return res.status(HTTP_STATUS_CODES.OK).json(result);
    } catch (err) {
      if (err instanceof Error) {
        handleErrors(err, res);
      }
    }
  }

  //データ投稿
  async createNote(req: Request, res: Response) {
    try {
      if (!req.is("json")) {
        throw new BadRequestError("json形式ではありません");
      }

      //titleとcontentのバリデーション
      const validationError = validationInputDatas(
        req.body.title,
        req.body.content
      );
      if (validationError) {
        throw new BadRequestError(validationError);
      }

      //エスケープ処理
      const escapedTitle = htmlEscape(req.body.title);
      const escapedContent = htmlEscape(req.body.content);

      //NoteModelオブジェクトの作成
      const note = new NoteModel();
      note.title = escapedTitle;
      note.content = escapedContent;

      //投稿処理
      const postResult = await NoteModel.saveNote(note);

      //データを見つけて返却する
      if (postResult.id) {
        const responseData = await NoteModel.findNote(postResult.id);
        return res.status(HTTP_STATUS_CODES.CREATED).json(responseData);
      } else {
        throw new Error("データが追加できませんでした");
      }
    } catch (err) {
      if (err instanceof Error) {
        handleErrors(err, res);
      }
    }
  }

  //編集
  async updateNote(req: Request, res: Response) {
    //クエリパラメータから取得
    const id = req.params.id;

    try {
      if (!req.is("json")) {
        throw new BadRequestError("json形式ではありません");
      }

      //idのバリデーション
      if (!validationId(id)) {
        throw new BadRequestError("idの値が不正です");
      }

      const note = await NoteModel.findNote(id);
      if (note === null) {
        throw new BadRequestError("存在しないidです");
      }

      //titleとcontentのバリデーション
      const validationError = validationInputDatas(
        req.body.title,
        req.body.content
      );
      if (validationError) {
        throw new BadRequestError(validationError);
      }

      //エスケープ処理
      const escapedTitle = htmlEscape(req.body.title);
      const escapedContent = htmlEscape(req.body.content);

      //NoteModelオブジェクトのプロパティを変える
      note.title = escapedTitle;
      note.content = escapedContent;

      //更新
      const result = await NoteModel.updateNote(note);
      return res.status(HTTP_STATUS_CODES.OK).json(result);
    } catch (err) {
      if (err instanceof Error) {
        handleErrors(err, res);
      }
    }
  }
}
