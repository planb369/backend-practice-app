import { Note } from "../../../domain/entity/Note";

export class GetNotesResponse {
  constructor(public notes: Note[]) {}
  convertToJson() {
    return {
      items: this.notes,
    };
  }
}
