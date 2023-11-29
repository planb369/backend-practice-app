import { BadRequestError } from "../../../errors/BadRequestError";

export class GetNotesRequest {
  constructor(public limit: number, public offset: number) {}

  validate(): string | null {
    if (
      isNaN(this.limit) ||
      isNaN(this.offset) ||
      this.limit < 0 ||
      this.offset < 0
    ) {
      throw new BadRequestError("クエリパラメータの値が不正です");
    }
    if (this.limit > 50) this.limit = 50;
    return null;
  }
}
