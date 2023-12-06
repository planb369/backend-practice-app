import { DeleteNoteInput } from "../input/DeleteNoteInput";
import { DeleteNoteOutput } from "../output/DeleteNoteOutput";
import { NoteRepository } from "../../infrastructure/repository/NoteRepository";
import { NotFoundError } from "../../adapter/controller/errors/NotFoundError";

export class DeleteNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  //関数は基本一つだけ
  async handle(input: DeleteNoteInput) {
    const note = input.deleteNote();
    const result = await this.noteRepository.delete(note);
    if (!result) {
      throw new NotFoundError("データが存在しません");
    }
    return new DeleteNoteOutput(result);
  }
}
