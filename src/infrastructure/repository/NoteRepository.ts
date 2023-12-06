import { NoteId } from "../../domain/object/NoteId";
import { Note } from "../../domain/entity/Note";
import { QueryParams } from "../../domain/entity/QueryParams";
import { NotFoundError } from "../../adapter/controller/errors/NotFoundError";
import DB from "../../config/DB";
import { RowDataPacket } from "mysql2";
import * as mysql from "mysql2";
import { v4 as uuidv4 } from "uuid";

export class NoteRepository {
  find(note: Note): Promise<Note | null> {
    return new Promise((resolve, reject) => {
      DB.query(
        `
          SELECT
            id
            ,title
            ,content
            ,createdAt
            ,updatedAt
          FROM notes
          WHERE id = ?
          LIMIT 1
        `,
        [note.id?.value],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          if (results.length < 1) return resolve(null);

          const row = results[0];
          const note = new Note(
            new NoteId(row.id),
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

  // データの個数を数える
  static getTotalCount(): Promise<number> {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT
        COUNT(id) as count
        FROM notes`,
        (error, results: mysql.RowDataPacket[]) => {
          if (error) {
            return reject(error); //returnで処理中断させる
          }
          return resolve(results[0]["count"]);
        }
      );
    });
  }

  //一覧取得 entityのNotesを引数に持たせる
  search(queryParams: QueryParams): Promise<Note[]> {
    return new Promise((resolve, reject) => {
      DB.query(
        `
        SELECT
          id
          ,title
          ,content
          ,createdAt
          ,updatedAt
        FROM notes
        LIMIT ? 
        OFFSET ?
        `,
        [queryParams.limit.value, queryParams.offset.value],
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

  save(note: Note): Promise<NoteId> {
    return new Promise((resolve, reject) => {
      const uuid = uuidv4().replace(/-/g, "").toUpperCase();

      DB.query(
        `
        INSERT
        INTO notes
        (id, title, content, createdAt, updatedAt)
        VALUES (?, ?, ?, NOW(), NOW())
        `,
        [uuid, note.title?.value, note.content?.value],
        (error) => {
          if (error) {
            return reject(error);
          }
          //NoteIdでマッピング
          return resolve(new NoteId(uuid));
        }
      );
    });
  }

  //編集
  update(note: Note): Promise<NoteId | null> {
    return new Promise((resolve, reject) => {
      DB.query(
        `
        UPDATE notes
        SET title = ?, content = ?, updatedAt = NOW()
        WHERE id = ?`,
        [note.title?.value, note.content?.value, note.id?.value],
        (error) => {
          if (error) return reject(error);
          console.log(note.id?.value);
          if (!note.id) return reject(error);
          return resolve(note.id);
        }
      );
    });
  }

  //削除
  delete(note: Note): Promise<NoteId> {
    //console.log(note);
    return new Promise((resolve, reject) => {
      DB.query(
        `
        DELETE
        FROM notes
        WHERE id = ?
        `,
        [note.id?.value],
        (error) => {
          if (error) return reject(error);
          if (!note.id) throw new NotFoundError("IDが見つかりません");
          return resolve(note.id);
        }
      );
    });
  }
}
