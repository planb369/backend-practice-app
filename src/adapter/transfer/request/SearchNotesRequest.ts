import { Request } from "express";
import { BadRequestError } from "../../controller/errors/BadRequestError";
import { Limit } from "../../../domain/object/Limit";
import { Offset } from "../../../domain/object/Offset";
import { QueryParams } from "../../../domain/entity/QueryParams";

export class SearchNoteRequest {
  readonly limit: Limit;
  readonly offset: Offset;

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
      throw new BadRequestError("Limitの値が不正です");
    }

    if (limitValue > 50) limitValue = 50;

    //定義されていなければデフォルトの値を入れる
    if (!limitValue) limitValue = 50;
    if (!offsetValue) offsetValue = 0;

    this.limit = new Limit(limitValue);
    this.offset = new Offset(offsetValue);
  }
}
