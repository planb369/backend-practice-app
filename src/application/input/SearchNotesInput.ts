import { Notes } from "../../domain/entity/Notes";

//useCaseで受け付けるものを定義する
export class SearchNotesInput {
  private readonly limit: number;
  private readonly offset: number;

  constructor(limit: number, offset: number) {
    this.limit = limit;
    this.offset = offset;
  }

  //repositoryに渡すときの形に整える
  getNotes() {
    const note = new Notes();
    note.limit = this.limit;
    note.offset = this.offset;
    return note;
  }
}
