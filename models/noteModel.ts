import db from "../db";

//データベースの一行分の定義
type Row = {
  id: number;
  title: string;
  content: string;
};

export class Note {
  //プロパティ
  id?: number;
  title?: string;
  content?: string;

  // データ一覧取得
  static search(): Promise<Note[]> {
    return new Promise((resolve, reject) => {
      //return reject(new Error("test"));//テスト用
      db.query("SELECT * FROM notes", (error, results) => {
        if (error) {
          return reject(error); //returnで処理中断させる
        }
        //一行ずつインスタンスにマッピング
        const notes: Note[] = results.map((row: Row) => {
          const note = new Note();
          note.id = row.id;
          note.title = row.title;
          note.content = row.content;
          return note;
        });
        return resolve(notes); //配列で返す
      });
    });
  }
}
