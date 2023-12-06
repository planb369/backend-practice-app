import { Request } from "express";
import { BadRequestError } from "../../controller/errors/BadRequestError";
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

    this.id = new NoteId(id);
  }
}
