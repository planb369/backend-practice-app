import db from "../db";
import * as mysql from "mysql2/";

export class Note {
  //プロパティ
  id?: number;
  title?: string;
  content?: string;

  // データ一覧取得
  static search(): Promise<Note[]> {
    return new Promise((resolve, reject) => {
      //return reject(new Error("test")); //テスト用
      db.query(
        "SELECT * FROM notes",
        (error, results: mysql.RowDataPacket[]) => {
          if (error) {
            return reject(error); //returnで処理中断させる
          }
          //一行ずつインスタンスにマッピング
          const notes: Note[] = results.map((row: mysql.RowDataPacket) => {
            const note = new Note();
            note.id = row.id;
            note.title = row.title;
            note.content = row.content;
            return note;
          });

          return resolve(notes); //配列で返す
        }
      );
    });
  }

  //詳細情報の取得
  static find(id: number): Promise<Note | null> {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM notes WHERE id = ?",
        [id],
        (error, results: mysql.RowDataPacket[]) => {
          //該当データがデータベースにないとき
          if (results.length === 0) {
            return resolve(null);
          }
          if (error) {
            return reject(error);
          }

          //データベースに対象データがあったとき
          const row = results[0];
          //マッピングするためにNodeをインスタンス化
          const note = new Note();
          note.id = row.id;
          note.title = row.title;
          note.content = row.content;

          return resolve(note);
        }
      );
    });
  }
}
