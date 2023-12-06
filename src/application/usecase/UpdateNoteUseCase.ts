import { UpdateNoteInput } from "../input/UpdateNoteInput";
import { UpdateNoteOutput } from "../output/UpdateNoteOutput";
import { NoteRepository } from "../../infrastructure/repository/NoteRepository";
import { NotFoundError } from "../../adapter/controller/errors/NotFoundError";

export class UpdateNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async handle(input: UpdateNoteInput): Promise<UpdateNoteOutput> {
    const note = input.updateNote();
    const result = await this.noteRepository.update(note);
    if (!result) {
      throw new NotFoundError("データが存在しません");
    }
    return new UpdateNoteOutput(result);
  }
}
