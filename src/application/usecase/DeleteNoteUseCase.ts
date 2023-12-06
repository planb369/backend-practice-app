import { DeleteNoteInput } from "../input/DeleteNoteInput";
import { DeleteNoteOutput } from "../output/DeleteNoteOutput";
import { NoteRepository } from "../../infrastructure/repository/NoteRepository";

export class DeleteNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  //関数は基本一つだけ
  async handle(input: DeleteNoteInput) {
    const note = input.deleteNote();
    const result = await this.noteRepository.delete(note);
    return new DeleteNoteOutput(result);
  }
}
