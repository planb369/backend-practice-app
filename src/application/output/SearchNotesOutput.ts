import { Notes } from "../../domain/entity/Notes";

export class SearchNotesOutput {
  constructor(readonly notes: Notes) {}
}
