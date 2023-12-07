import { Note } from "./Note";

export class Notes {
  items: Note[] = [];
  total = 0;
  limit?: number;
  offset?: number;

  constructor(limit?: number, offset?: number) {
    this.limit = limit;
    this.offset = offset;
  }
}
