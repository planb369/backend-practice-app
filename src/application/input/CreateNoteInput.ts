import { Note } from "../../domain/entity/Note";

export class CreateNoteInput {
  constructor(private readonly note: Note) {}

  createNote() {
    const inputDatas = new Note();
    inputDatas.title = this.note.title;
    inputDatas.content = this.note.content;
    return inputDatas;
  }
}
