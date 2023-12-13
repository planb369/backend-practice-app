import { SearchNotesOutput } from "../../../application/output/SearchNotesOutput";
import { Note } from "../../../domain/entity/Note";

export class SearchNotesResponse {
  readonly items?: Note[];
  readonly total?: number;

  constructor(output: SearchNotesOutput) {
    // output.notes から items と total を取得
    this.items = output.item.items;
    this.total = output.item.total;
  }
}
