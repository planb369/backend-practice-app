import { Note } from "./Note";

export class Notes {
  items?: Note[] = [];
  total? = 0;
  limit?: number;
  offset?: number;

  constructor(items?: Note[], total?: number) {
    this.items = items;
    this.total = total;
  }
}
