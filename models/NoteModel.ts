import DB from "../config/DB";
import * as mysql from "mysql2";

export class NoteModel {
  //プロパティ
  id?: string;
  title?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;

  // データ一覧取得
  static search(limit: number = 50, offset: number = 0): Promise<NoteModel[]> {
    return new Promise((resolve, reject) => {
      //return reject(new Error("test")); //テスト用
      DB.query(
        "SELECT * FROM notes LIMIT ? OFFSET ?",
        [limit, offset],
        (error, results: mysql.RowDataPacket[]) => {
          if (error) {
            return reject(error); //returnで処理中断させる
          }
          //一行ずつインスタンスにマッピング
          const notes: NoteModel[] = results.map((row: mysql.RowDataPacket) => {
            const note = new NoteModel();
            note.id = row.id;
            note.title = row.title;
            note.content = row.content;
            note.createdAt = row.createdAt;
            note.updatedAt = row.updatedAt;
            return note;
          });

          return resolve(notes); //配列で返す
        }
      );
    });
  }

  // データの個数を数える
  static getTotalCount(): Promise<NoteModel[]> {
    return new Promise((resolve, reject) => {
      DB.query(
        "SELECT COUNT(id) as count FROM notes",
        (error, results: mysql.RowDataPacket[]) => {
          if (error) {
            return reject(error); //returnで処理中断させる
          }
          return resolve(results[0]["count"]);
        }
      );
    });
  }

  //詳細情報の取得
  static find(id: number): Promise<NoteModel | null> {
    return new Promise((resolve, reject) => {
      DB.query(
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
          const note = new NoteModel();
          note.id = row.id;
          note.title = row.title;
          note.content = row.content;
          note.createdAt = row.createdAt;
          note.updatedAt = row.updatedAt;

          return resolve(note);
        }
      );
    });
  }

  // データ送信
  static postNote(title: string, content: string): Promise<string> {
    return new Promise((resolve, reject) => {
      //マッピング
      const note = new NoteModel();
      note.title = title;
      note.content = content;

      DB.query(
        "INSERT INTO notes (id, title, content, createdAt, updatedAt) VALUES (UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 32)), ?, ?, NOW(), NOW())",
        [note.title, note.content],
        (error, results: mysql.RowDataPacket[]) => {
          if (error) {
            return reject(error); //returnで処理中断させる
          }
          return resolve("データ挿入できた");
        }
      );
    });
  }
}
