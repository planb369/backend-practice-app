import { Note } from "../../domain/entity/Note";

export class UpdateNoteInput {
  constructor(private readonly note: Note) {}

  // Repositoryに渡す用のNoteEntityを生成する
  getNote() {
    const notes = new Note();
    notes.id = this.note.id;
    notes.title = this.note.title;
    notes.content = this.note.content;
    return notes;
  }
}
