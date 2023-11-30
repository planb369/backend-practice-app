import { FindNoteInput } from "../input/FindNoteInput";
import { FindNoteOutput } from "../output/FindNoteOutput";
import { NoteRepository } from "../../infrastructure/repository/NoteRepository";
import { Note } from "../../domain/entity/Note";
import { NoteId } from "../../domain/object/NoteId";

export class FindNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async handle(input: FindNoteInput) {
    const note = input.getNote();
    const result = await this.noteRepository.find(note);
    return new FindNoteOutput(result);
  }
}
