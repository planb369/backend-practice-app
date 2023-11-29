import { NoteRepository } from "../../infrastructure/repository/NoteRepository";
import { Note } from "../../domain/entity/Note";

export class CreateNoteUseCase {
  async createNote(title: string, content: string): Promise<string> {
    const note = new Note("", title, content);
    return await NoteRepository.saveNote(note);
  }
}
