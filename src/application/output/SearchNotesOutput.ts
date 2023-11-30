import { Note } from "../../domain/entity/Note";

export class SearchNotesOutput {
  constructor(readonly items: Note[], readonly total: number) {}
}
