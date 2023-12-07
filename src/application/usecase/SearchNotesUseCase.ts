import { SearchNotesInput } from "../input/SearchNotesInput";
import { SearchNotesOutput } from "../output/SearchNotesOutput";
import { NoteRepository } from "../../infrastructure/repository/NoteRepository";

export class SearchNotesUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  //関数は基本一つだけ
  async handle(input: SearchNotesInput) {
    const note = input.getNotes();

    const items = await this.noteRepository.search(note);
    const total = await NoteRepository.getTotalCount();

    return new SearchNotesOutput(items, total);
  }
}
