import { Note } from "../../domain/entity/Note";

export class UpdateNoteInput {
  constructor(private readonly note: Note) {}

  // Repositoryに渡す用のNoteEntityを生成する
  getNote() {
    const note = new Note();
    note.id = this.note.id;
    note.title = this.note.title;
    note.content = this.note.content;
    return note;
  }
}
