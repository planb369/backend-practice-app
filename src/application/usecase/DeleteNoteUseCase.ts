import { DeleteNoteInput } from "../input/DeleteNoteInput";
import { DeleteNoteOutput } from "../output/DeleteNoteOutput";
import { NoteRepository } from "../../infrastructure/repository/NoteRepository";
import { NotFoundError } from "../../adapter/controller/errors/NotFoundError";

export class DeleteNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  //関数は基本一つだけ
  async handle(input: DeleteNoteInput) {
    const note = input.getNote();

    const targetNote = await this.noteRepository.find(note);
    if (!targetNote) {
      throw new NotFoundError("データが存在しません");
    }

    const result = await this.noteRepository.delete(note);
    return new DeleteNoteOutput(result);
  }
}
