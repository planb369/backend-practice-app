import { BadRequestError } from "../../controller/errors/BadRequestError";
import { NoteRepository } from "../../../infrastructure/repository/NoteRepository";
import { NotFoundError } from "../../controller/errors/NotFoundError";
import { validationId } from "../validation/validationId";

export class FindNoteRequest {
  //受け取るデータをクラスのプロパティとして初期化
  constructor(public id: string) {}

  validate(): string | null {
    if (!validationId(this.id)) {
      throw new BadRequestError("idの値が不正です");
    }
    const result = NoteRepository.findNote(this.id);
    if (!result) {
      throw new NotFoundError(`idが${this.id}のデータは存在しません`);
    }
    return null;
  }
}
