import { Note } from "../../../domain/entity/Note";

export class SearchNotesResponse {
  constructor(public notes: Note[], public total: number) {}
  convertToJson() {
    return {
      items: this.notes,
      total: this.total,
    };
  }
}