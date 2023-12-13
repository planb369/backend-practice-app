import { FindNoteInput } from "../input/FindNoteInput";
import { FindNoteOutput } from "../output/FindNoteOutput";
import { NoteRepository } from "../../infrastructure/repository/NoteRepository";
import { NotFoundError } from "../../adapter/controller/errors/NotFoundError";

export class FindNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  //関数は基本一つだけ
  async handle(input: FindNoteInput) {
    const note = input.getNote();
    const result = await this.noteRepository.find(note);
    if (!result) {
      throw new NotFoundError("データが存在しません");
    }
    return new FindNoteOutput(result);
  }
}
