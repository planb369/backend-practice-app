import { Request } from "express";
import { BadRequestError } from "../../controller/errors/BadRequestError";
import { Notes } from "../../../domain/entity/Notes";

export class SearchNoteRequest {
  readonly limit: number;
  readonly offset: number;

  constructor(req: Request) {
    // クエリパラメータから数値に変換
    const limitStr = req.query.limit as string;
    const offsetStr = req.query.offset as string;

    let limitValue = limitStr ? parseInt(limitStr) : 50;
    let offsetValue = offsetStr ? parseInt(offsetStr) : 0;

    // バリデーション
    if (
      isNaN(limitValue) ||
      limitValue < 0 ||
      isNaN(offsetValue) ||
      offsetValue < 0
    ) {
      throw new BadRequestError("リクエストパラメータの値が不正です");
    }
    if (limitValue > 50) limitValue = 50;

    this.limit = limitValue;
    this.offset = offsetValue;
  }
}
