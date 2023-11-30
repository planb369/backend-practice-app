import { BadRequestError } from "../../controller/errors/BadRequestError";
import { Request } from "express";
import { validationId } from "../validation/validationId";
import { validationInputDatas } from "../validation/validationInputData";

export class UpdateNoteRequest {
  constructor(public req: Request) {}

  async validate(): Promise<null> {
    if (!this.req.is("json")) {
      throw new BadRequestError("json形式ではありません");
    }

    //idのバリデーション
    if (!validationId(this.req.params.id)) {
      throw new BadRequestError("idの値が不正です");
    }

    //中身のバリデーション
    const validationError = validationInputDatas(
      this.req.body.title,
      this.req.body.content
    );
    if (validationError) {
      throw new BadRequestError(validationError);
    }

    return null;
  }
}
