import { Note } from "../../domain/entity/Note";
import DB from "../../config/DB";
import { RowDataPacket } from "mysql2";

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
}
