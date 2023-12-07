import { Notes } from "../../domain/entity/Notes";

//useCaseで受け付けるものを定義する
export class SearchNotesInput {
  constructor(private notes: Notes) {}

  //repositoryに渡すときの形に整える
  getNotes() {
    const note = new Notes();
    note.limit = this.notes.limit;
    note.offset = this.notes.offset;
    return note;
  }
}
