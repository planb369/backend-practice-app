import { NoteId } from "../../domain/object/NoteId";
import { Note } from "../../domain/entity/Note";

export class FindNoteInput {
  constructor(private readonly noteId: NoteId) {}

  // Repositoryに渡す用のNoteEntityを生成する
  getNote() {
    const note = new Note();
    note.id = this.noteId;
    return note;
  }
}
