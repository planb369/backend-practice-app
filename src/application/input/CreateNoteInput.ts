import { Note } from "../../domain/entity/Note";

export class CreateNoteInput {
  constructor(private readonly note: Note) {}

  getNote() {
    const notes = new Note();
    notes.title = this.note.title;
    notes.content = this.note.content;
    return notes;
  }
}
