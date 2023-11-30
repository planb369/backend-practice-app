import { Note } from "../../domain/entity/Note";

export class SearchNotesOutput {
  constructor(readonly allNotes: Note[], readonly total: number) {}
}
