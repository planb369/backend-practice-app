import { BadRequestError } from "../../controller/errors/BadRequestError";
import { Request } from "express"; // express の Request 型をインポート
import { validationInputDatas } from "../validation/validationInputData";

export class CreateNoteRequest {
  constructor(public req: Request) {}

  async validate(): Promise<null> {
    if (!this.req.is("json")) {
      throw new BadRequestError("json形式ではありません");
    }

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
