import { Request } from "express";
import { BadRequestError } from "../../controller/errors/BadRequestError";
import { validationInputDatas } from "../validation/validationInputData";
import { htmlEscape } from "../../../utilities/htmlEscape";
import { Title } from "../../../domain/object/Title";
import { Content } from "../../../domain/object/Content";

export class CreateNoteRequest {
  readonly title: Title;
  readonly content: Content;

  constructor(req: Request) {
    if (!req.is("json")) {
      throw new BadRequestError("json形式ではありません");
    }

    // titleとcontentのバリデーション
    const validationError = validationInputDatas(
      req.body.title,
      req.body.content
    );
    if (validationError) {
      throw new BadRequestError(validationError);
    }

    // エスケープ処理
    const escapedTitle = htmlEscape(req.body.title);
    const escapedContent = htmlEscape(req.body.content);

    this.title = new Title(escapedTitle);
    this.content = new Content(escapedContent);
  }
}
