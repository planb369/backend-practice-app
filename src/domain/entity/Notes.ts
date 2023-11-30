import { Note } from "./Note";
import { Limit } from "../object/Limit";
import { Offset } from "../object/Offset";

//一覧を返すときのノート一覧の形
export class Notes {
  limit?: Limit;
  offset?: Offset;

  constructor(items: Note[], total: number) {}
}
