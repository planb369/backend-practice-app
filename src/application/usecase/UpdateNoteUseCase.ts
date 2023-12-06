import { UpdateNoteInput } from "../input/UpdateNoteInput";
import { UpdateNoteOutput } from "../output/UpdateNoteOutput";
import { NoteRepository } from "../../infrastructure/repository/NoteRepository";

export class UpdateNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async handle(input: UpdateNoteInput): Promise<UpdateNoteOutput> {
    const note = input.updateNote();
    const result = await this.noteRepository.update(note);

    return new UpdateNoteOutput(result);
  }
}
