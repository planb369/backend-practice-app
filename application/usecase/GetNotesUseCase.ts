import { NoteRepository } from "../../infrastructure/repository/NoteRepository";
import { Note } from "../../domain/entity/Note";

export class GetNotesUseCase {
  async getNotes(
    limit: number,
    offset: number
  ): Promise<{ notes: Note[]; total: number }> {
    // 一覧取得のSQL実行
    const notes = await NoteRepository.searchNotes(limit, offset);
    // total取得
    const total = await NoteRepository.getTotalCount();

    // notes と total を含むオブジェクトを返す
    return { notes: notes, total: total };
  }
}
