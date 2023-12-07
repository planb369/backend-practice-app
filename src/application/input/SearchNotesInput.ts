import { Notes } from "../../domain/entity/Notes";

//useCaseで受け付けるものを定義する
export class SearchNotesInput {
  constructor(private notes: Notes) {}

  //repositoryに渡すときの形に整える
  getNotes() {
    const notes = new Notes();
    notes.limit = this.notes.limit;
    notes.offset = this.notes.offset;
    return notes;
  }
}
