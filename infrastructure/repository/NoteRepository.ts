import { Note } from "../../domain/entity/Note";
import DB from "../../config/DB";
import { RowDataPacket } from "mysql2";

export class NoteRepository {
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
          //const rows = results as RowDataPacket[];
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
          resolve(notes);
        }
      );
    });
  }
}
