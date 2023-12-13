import { UpdateNoteInput } from "../input/UpdateNoteInput";
import { UpdateNoteOutput } from "../output/UpdateNoteOutput";
import { NoteRepository } from "../../infrastructure/repository/NoteRepository";
import { NotFoundError } from "../../adapter/controller/errors/NotFoundError";

export class UpdateNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async handle(input: UpdateNoteInput) {
    const note = input.getNote();

    const targetNote = await this.noteRepository.find(note);
    if (!targetNote) {
      throw new NotFoundError("データが存在しません");
    }

    const result = await this.noteRepository.update(note);

    return new UpdateNoteOutput(result);
  }
}
