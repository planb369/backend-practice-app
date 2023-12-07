import { Note } from "../../domain/entity/Note";

export class UpdateNoteInput {
  constructor(private readonly note: Note) {}

  // Repositoryに渡す用のNoteEntityを生成する
  getNote() {
    const inputDatas = new Note();
    inputDatas.id = this.note.id;
    inputDatas.title = this.note.title;
    inputDatas.content = this.note.content;
    return inputDatas;
  }
}
