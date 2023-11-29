import { BadRequestError } from "../../controller/errors/BadRequestError";
import { NoteRepository } from "../../../infrastructure/repository/NoteRepository";
import { NotFoundError } from "../../controller/errors/NotFoundError";
import { validationId } from "../validation/validationId";

export class FindNoteRequest {
  constructor(public id: string) {}

  async validate(): Promise<null> {
    if (!validationId(this.id)) {
      throw new BadRequestError("idの値が不正です");
    }

    // 非同期処理のため await を使用
    const result = await NoteRepository.findNote(this.id);

    if (!result) {
      throw new NotFoundError(`idが${this.id}のデータは存在しません`);
    }
    return null;
  }
}