import { Note } from "../../domain/entity/Note";

export class UpdateNoteInput {
  constructor(private readonly note: Note) {}

  // Repositoryに渡す用のNoteEntityを生成する
  updateNote() {
    const inputDatas = new Note(
      this.note.id,
      this.note.title,
      this.note.content
    );
    return inputDatas;
  }
}
