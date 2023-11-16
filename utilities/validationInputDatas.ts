export function validationInputDatas(
  title: string,
  content: string
): string | null {
  if (!title || !content) {
    return "titleとcontentは必須です";
  }

  if (title.length > 120 || content.length > 100000) {
    return "titleは120文字以内,contentは100000文字以内で入力してください";
  }
  //バリデーションに引っ掛からなかったら
  return null;
}
