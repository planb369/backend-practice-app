import { Notes } from "../../domain/entity/Notes";

export class SearchNotesOutput {
  constructor(readonly item: Notes) {}
}
