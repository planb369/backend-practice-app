import { NoteRepository } from "../../infrastructure/repository/NoteRepository";
import { Note } from "../../domain/entity/Note";

export class FindNoteUseCase {
  async findNote(id: string): Promise<{ note: Note | null }> {
    const note = await NoteRepository.findNote(id);
    return { note };
  }
}
