export class MthodNotAllowed extends Error {
  constructor(message: string) {
    //親クラスErrorのメソッドを呼び出し
    super(message);
    this.name = "MthodNotAllowed";
  }
}
