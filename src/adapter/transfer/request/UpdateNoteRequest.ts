import { Request } from "express";
import { BadRequestError } from "../../controller/errors/BadRequestError";
import { validationInputDatas } from "../validation/validationInputData";
import { validationId } from "../validation/validationId";
import { Note } from "../../../domain/entity/Note";
import { htmlEscape } from "../../../utilities/htmlEscape";
import { NoteId } from "../../../domain/object/NoteId";
import { Title } from "../../../domain/object/Title";
import { Content } from "../../../domain/object/Content";

export class UpdateNoteRequest {
  readonly inputDatas: Note;

  constructor(req: Request) {
    if (!req.is("json")) {
      throw new BadRequestError("json形式ではありません");
    }

    const id = req.params.id;
    if (!validationId(id)) {
      throw new BadRequestError("idの値が不正です");
    }

    //titleとcontentのバリデーション
    const validationError = validationInputDatas(
      req.body.title,
      req.body.content
    );
    if (validationError) {
      throw new BadRequestError(validationError);
    }

    const escapedTitle = htmlEscape(req.body.title);
    const escapedContent = htmlEscape(req.body.content);

    this.inputDatas = new Note(
      new NoteId(id),
      new Title(escapedTitle),
      new Content(escapedContent),
      undefined,
      undefined
    );
  }
}
