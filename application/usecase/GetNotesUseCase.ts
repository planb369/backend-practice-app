import { NoteRepository } from "../../infrastructure/repository/NoteRepository";
import { Note } from "../../domain/entity/Note";

export class GetNotesUseCase {
  async getNotes(limit: number, offset: number): Promise<Note[]> {
    //一覧取得のsql実行
    const notes = await NoteRepository.searchNotes(limit, offset);
    return notes;
  }
}
