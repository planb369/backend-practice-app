import { BadRequestError } from "../errors/BadRequestError";

export function validationInputDatas(title: string, content: string): void {
  if (!title || !content) {
    throw new BadRequestError("titleとcontentは必須です");
  }

  if (title.length > 120 || content.length > 100000) {
    throw new BadRequestError(
      "titleは120文字以内,contentは100000文字以内で入力してください"
    );
  }
}
