import { SearchNotesInput } from "../input/SearchNotesInput";
import { SearchNotesOutput } from "../output/SearchNotesOutput";
import { NoteRepository } from "../../infrastructure/repository/NoteRepository";
export class SearchNotesUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async handle(input: SearchNotesInput): Promise<SearchNotesOutput> {
    const notes = input.getNotes();

    const searchResult = await this.noteRepository.search(notes);
    const totalResults = await this.noteRepository.getTotalCount(notes);

    notes.items = searchResult.items;
    notes.total = totalResults.total;

    return new SearchNotesOutput(notes);
  }
}
