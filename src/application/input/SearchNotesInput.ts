import { Notes } from "../../domain/entity/Notes";

//useCaseで受け付けるものを定義する
export class SearchNotesInput {
  constructor(private notes: Notes) {}

  //repositoryに渡すときの形に整える
  getNotes() {
    const notes = new Notes(this.notes.limit, this.notes.offset);
    return notes;
  }
}
