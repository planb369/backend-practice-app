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
      db.query("SELECT * FROM notes", (error, results) => {
        if (error) {
          reject(error);
        } else {
          //一行ずつインスタンスにマッピング
          const notes: Note[] = results.map((row: Row) => {
            const note = new Note();
            note.id = row.id;
            note.title = row.title;
            note.content = row.content;
            return note;
          });
          resolve(notes); //配列で返す
        }
      });
    });
  }
}
