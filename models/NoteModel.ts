import DB from "../config/DB";
import * as mysql from "mysql2";
import { v4 as uuidv4 } from "uuid";

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
  static find(id: string): Promise<NoteModel | null> {
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
  static postNote(title: string, content: string): Promise<NoteModel> {
    return new Promise((resolve, reject) => {
      //UUID生成
      const uuid = uuidv4().replace(/-/g, "").toUpperCase();
      //現在時刻生成
      const isoTimestamp = new Date().toISOString();
      //mysqlの形式にする
      const mysqlTimestamp = isoTimestamp.replace("T", " ").slice(0, 19);

      //マッピング
      const note = new NoteModel();
      note.id = uuid;
      note.title = title;
      note.content = content;
      note.createdAt = mysqlTimestamp;
      note.updatedAt = mysqlTimestamp;

      DB.query(
        "INSERT INTO notes (id, title, content, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)",
        [note.id, note.title, note.content, note.createdAt, note.updatedAt],
        (error) => {
          if (error) {
            return reject(error); //returnで処理中断させる
          }

          //整形
          const response = {
            id: note.id,
            title: note.title,
            content: note.content,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
          };
          return resolve(response);
        }
      );
    });
  }

  //存在チェック
  static checkNoteExists(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      DB.query(
        "SELECT COUNT(*) AS count FROM notes WHERE id = ? LIMIT 1",
        [id],
        (error, results: mysql.RowDataPacket[]) => {
          if (error) {
            return reject(error); //returnで処理中断させる
          }
          if (results[0]["count"] === 0) {
            return resolve(false);
          } else {
            return resolve(true);
          }
        }
      );
    });
  }

  //編集
  static putNote(
    id: string,
    title: string,
    content: string
  ): Promise<NoteModel> {
    return new Promise((resolve, reject) => {
      //マッピング
      const note = new NoteModel();
      note.id = id;
      note.title = title;
      note.content = content;

      DB.query(
        "UPDATE notes SET title = ?, content = ?, updatedAt = NOW() WHERE id = ?",
        [note.title, note.content, note.id],
        (error) => {
          if (error) {
            return reject(error); //returnで処理中断させる
          }
          return resolve({
            id: note.id,
          });
        }
      );
    });
  }
}
