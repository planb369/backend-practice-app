import { SearchNotesInput } from "../input/SearchNotesInput";
import { SearchNotesOutput } from "../output/SearchNotesOutput";
import { NoteRepository } from "../../infrastructure/repository/NoteRepository";

export class SearchNotesUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  //関数は基本一つだけ
  async handle(input: SearchNotesInput) {
    const note = input.searchNotes();

    //searchはParam型のものを受け取りたい
    const allNotes = await this.noteRepository.search(note);
    const total = await NoteRepository.getTotalCount();

    return new SearchNotesOutput(allNotes, total);
  }
}
