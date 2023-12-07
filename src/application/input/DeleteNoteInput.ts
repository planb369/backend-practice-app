import { Note } from "../../domain/entity/Note";
import { NoteId } from "../../domain/object/NoteId";

//useCaseで受け付けるものを定義するため
export class DeleteNoteInput {
  constructor(private readonly noteId: NoteId) {}

  // Repositoryに渡す用のNoteEntityを生成する
  getNote() {
    const note = new Note();
    note.id = this.noteId;
    return note;
  }
}
