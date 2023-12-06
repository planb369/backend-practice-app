import { InputDatas } from "../../domain/entity/InputDatas";
//ここで入力ように用意した専用の方を使う

//useCaseで受け付けるものを定義するため
export class CreateNoteInput {
  constructor(private readonly inputDatas: InputDatas) {}

  // Repositoryに渡す用のNoteEntityを生成する
  createNote() {
    const inputDatas = new InputDatas(
      this.inputDatas.title,
      this.inputDatas.content
    );
    return inputDatas;
  }
}
