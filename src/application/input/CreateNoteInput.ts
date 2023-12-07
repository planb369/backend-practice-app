import { Note } from "../../domain/entity/Note";

export class CreateNoteInput {
  constructor(private readonly note: Note) {}

  getNote() {
    const note = new Note();
    note.title = this.note.title;
    note.content = this.note.content;
    return note;
  }
}
