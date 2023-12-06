import { Request } from "express";
import { BadRequestError } from "../../controller/errors/BadRequestError";
import { validationInputDatas } from "../validation/validationInputData";
import { InputDatas } from "../../../domain/entity/InputDatas";
import { htmlEscape } from "../../../utilities/htmlEscape";
import { Title } from "../../../domain/object/Title";
import { Content } from "../../../domain/object/Content";

export class CreateNoteRequest {
  readonly inputDatas: InputDatas;

  constructor(req: Request) {
    if (!req.is("json")) {
      throw new BadRequestError("json形式ではありません");
    }

    //titleとcontentのバリデーション
    const validationError = validationInputDatas(
      req.body.title,
      req.body.content
    );
    if (validationError) {
      throw new BadRequestError(validationError);
    }

    //エスケープ処理
    const escapedTitle = htmlEscape(req.body.title);
    const escapedContent = htmlEscape(req.body.content);

    this.inputDatas = new InputDatas(
      new Title(escapedTitle),
      new Content(escapedContent)
    );
  }
}
