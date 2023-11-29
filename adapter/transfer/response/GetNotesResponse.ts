import { Note } from "../../../domain/entity/Note";

export class GetNotesResponse {
  constructor(
    public notes: Note[],
    public status: number,
    public message: string
  ) {}
  convertToJson() {
    return {
      status: this.status,
      message: this.message,
      items: this.notes,
    };
  }
}
