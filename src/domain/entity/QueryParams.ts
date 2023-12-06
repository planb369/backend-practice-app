import { Limit } from "../object/Limit";
import { Offset } from "../object/Offset";

//一覧を返す検索するときの型
export class QueryParams {
  readonly limit: Limit;
  readonly offset: Offset;

  constructor(limit: Limit, offset: Offset) {
    this.limit = limit;
    this.offset = offset;
  }
}
