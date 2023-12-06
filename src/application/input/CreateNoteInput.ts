import { Note } from "../../domain/entity/Note";
//ここで入力ように用意した専用の方を使う

//useCaseで受け付けるものを定義するため
export class CreateNoteInput {
  constructor(private readonly note: Note) {}

  // Repositoryに渡す用のNoteEntityを生成する
  createNote() {
    const inputDatas = new Note(this.note.title, this.note.content);
    return inputDatas;
  }
}
