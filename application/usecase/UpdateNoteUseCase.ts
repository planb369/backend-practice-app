import { NoteRepository } from "../../infrastructure/repository/NoteRepository";
import { Note } from "../../domain/entity/Note";

export class UpdateNoteUseCase {
  async UpdateNote(
    id: string,
    title: string,
    content: string
  ): Promise<Note | null> {
    //更新
    const note = new Note(id, title, content);

    return await NoteRepository.updateNote(note);
  }
}
