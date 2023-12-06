import { Request } from "express";
import { BadRequestError } from "../../controller/errors/BadRequestError";
import { Limit } from "../../../domain/object/Limit";
import { Offset } from "../../../domain/object/Offset";
import { QueryParams } from "../../../domain/entity/QueryParams";

export class SearchNoteRequest {
  readonly queryParam: QueryParams;

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

    this.queryParam = new QueryParams(
      new Limit(limitValue),
      new Offset(offsetValue)
    );
  }
}
