export class MthodNotAllowedError extends Error {
  constructor(message: string) {
    //親クラスErrorのメソッドを呼び出し
    super(message);
    this.name = "MthodNotAllowedError";
  }
}
