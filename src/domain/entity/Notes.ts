import { Note } from "./Note";

//一覧を返すときのノート一覧の形
export class Notes {
  limit?: string;
  offset?: string;

  constructor(items: Note[], total: number) {}
}
