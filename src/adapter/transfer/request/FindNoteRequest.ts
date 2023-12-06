import { Request } from "express";
import { BadRequestError } from "../../controller/errors/BadRequestError";
import { NoteRepository } from "../../../infrastructure/repository/NoteRepository";
import { NotFoundError } from "../../controller/errors/NotFoundError";
import { validationId } from "../validation/validationId";
import { NoteId } from "../../../domain/object/NoteId";

export class FindNoteRequest {
  readonly id: NoteId;

  constructor(req: Request) {
    const id = req.params.id;

    if (!id) throw new BadRequestError("id is required");
    if (!validationId(id)) {
      throw new BadRequestError("idの値が不正です");
    }
    const result = NoteRepository.getTotalCount();
    if (!result) {
      throw new NotFoundError(`idが${id}のデータは存在しません`);
    }

    this.id = new NoteId(id);
  }
}
