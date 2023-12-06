import { Request } from "express";
import { BadRequestError } from "../../controller/errors/BadRequestError";
import { NoteRepository } from "../../../infrastructure/repository/NoteRepository";
import { NotFoundError } from "../../controller/errors/NotFoundError";
import { validationId } from "../validation/validationId";
import { NoteId } from "../../../domain/object/NoteId";

export class DeleteNoteRequest {
  readonly id: NoteId;

  constructor(req: Request) {
    if (!req.params.id) throw new BadRequestError("id is required");
    if (!validationId(req.params.id)) {
      throw new BadRequestError("idの値が不正です");
    }
    const result = NoteRepository.getTotalCount();
    if (!result) {
      throw new NotFoundError(`idが${req.params.id}のデータは存在しません`);
    }

    this.id = new NoteId(req.params.id);
  }
}
