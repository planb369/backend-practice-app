import { Request } from "express";
import { BadRequestError } from "../../controller/errors/BadRequestError";
import { NoteRepository } from "../../../infrastructure/repository/NoteRepository";
import { NotFoundError } from "../../controller/errors/NotFoundError";
import { validationId } from "../validation/validationId";
import { NoteId } from "../../../domain/object/NoteId";

export class FindNoteRequest {
  readonly id: NoteId;

  constructor(req: Request) {
    if (!req.params.id) throw new BadRequestError("id is required");

    this.id = new NoteId(req.params.id);
  }
}
