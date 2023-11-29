import { Note } from "../../domain/entity/Note";
import DB from "../../config/DB";
import { RowDataPacket } from "mysql2";
import * as mysql from "mysql2";
import { v4 as uuidv4 } from "uuid";

export class NoteRepository {
  //一覧取得
  static async searchNotes(
    limit: number = 50,
    offset: number = 0
  ): Promise<Note[]> {
    return new Promise((resolve, reject) => {
      DB.query(
        "SELECT * FROM notes LIMIT ? OFFSET ?",
        [limit, offset],
        (error, results: RowDataPacket[]) => {
          if (error) {
            return reject(error);
          }
          //Noteをインスタンス化してマッピング
          const notes = results.map(
            (row) =>
              new Note(
                row.id,
                row.title,
                row.content,
                row.createdAt,
                row.updatedAt
              )
          );
          resolve(notes); //配列で返す
        }
      );
    });
  }

  // データの個数を数える
  static getTotalCount(): Promise<number> {
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
  static findNote(id: string): Promise<Note | null> {
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
          const note = new Note(
            row.id,
            row.title,
            row.content,
            row.createdAt,
            row.updatedAt
          );

          return resolve(note);
        }
      );
    });
  }

  // データ送信
  static saveNote(note: Note): Promise<string> {
    return new Promise((resolve, reject) => {
      //UUID生成
      const uuid = uuidv4().replace(/-/g, "").toUpperCase();

      DB.query(
        "INSERT INTO notes (id, title, content, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())",
        [uuid, note.title, note.content],
        (error) => {
          if (error) {
            return reject(error); //returnで処理中断させる
          }
          return resolve(uuid);
        }
      );
    });
  }
}
