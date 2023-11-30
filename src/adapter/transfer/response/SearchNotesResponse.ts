import { SearchNotesOutput } from "../../../application/output/SearchNotesOutput";
import { Note } from "../../../domain/entity/Note";

export class SearchNotesResponse {
  readonly items?: Note[];
  readonly total?: number;

  constructor(output: SearchNotesOutput) {
    this.items = output.allNotes;
    this.total = output.total;
  }
}
