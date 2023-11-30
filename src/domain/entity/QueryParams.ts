import { Limit } from "../object/Limit";
import { Offset } from "../object/Offset";

// 一覧を返すときのノート一覧の形
export class QueryParams {
  readonly limit: Limit;
  readonly offset: Offset;

  constructor(limit: Limit, offset: Offset) {
    this.limit = limit;
    this.offset = offset;
  }
}
