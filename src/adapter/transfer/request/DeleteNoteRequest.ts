import { Request } from "express";
import { BadRequestError } from "../../controller/errors/BadRequestError";
import { validationId } from "../validation/validationId";
import { NoteId } from "../../../domain/object/NoteId";

export class DeleteNoteRequest {
  readonly id: NoteId;

  constructor(req: Request) {
    if (!req.params.id) throw new BadRequestError("id is required");
    if (!validationId(req.params.id)) {
      throw new BadRequestError("idの値が不正です");
    }
    this.id = new NoteId(req.params.id);
  }
}
