import { FindNoteInput } from "../input/FindNoteInput";
import { FindNoteOutput } from "../output/FindNoteOutput";
import { NoteRepository } from "../../infrastructure/repository/NoteRepository";

export class FindNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  //関数は基本一つだけ
  async handle(input: FindNoteInput) {
    const note = input.getNote();
    const result = await this.noteRepository.find(note);
    return new FindNoteOutput(result);
  }
}
